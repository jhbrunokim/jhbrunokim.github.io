// Cloudflare Worker for gmmaritime.com.
//
// 정적 파일은 Workers Static Assets 가 직접 서빙하고, 이 스크립트는
// /api/* 요청과 자산이 없는 경로(404)만 받습니다.
//
// POST /api/contact
//   문의 폼 제출을 받아 Turnstile 토큰을 검증한 뒤 EmailJS REST API 로 메일을 보냅니다.
//   EmailJS 비공개 키와 Turnstile 비밀 키는 브라우저에 노출되지 않습니다.
//
// 바인딩 (wrangler.jsonc 의 vars, 비밀 키는 wrangler secret / CI secrets):
//   TURNSTILE_SECRET_KEY  Turnstile 위젯 비밀 키 (secret)
//   TURNSTILE_HOSTNAMES   siteverify 가 돌려주는 hostname 허용 목록, 쉼표 구분
//   EMAILJS_PRIVATE_KEY   EmailJS 계정 비공개 키 (secret)
//   EMAILJS_PUBLIC_KEY    EmailJS 계정 공개 키 (user_id)
//   EMAILJS_SERVICE_ID    EmailJS 서비스 ID
//   EMAILJS_TEMPLATE_ID   EmailJS 템플릿 ID
//   EMAILJS_API_URL       (선택) 테스트용 엔드포인트 오버라이드

const TURNSTILE_SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const EMAILJS_SEND = 'https://api.emailjs.com/api/v1.0/email/send';
const TURNSTILE_ACTION = 'contact';
const UPSTREAM_TIMEOUT_MS = 10_000;

// 문의 폼 필드의 최대 길이. 넘어오면 400 으로 거절합니다.
const LIMITS = {
  name: 100,
  email: 254,
  company: 200,
  role: 50,
  subject: 200,
  message: 5000,
  token: 2048,
  source: 300,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }
    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, error: 'not_found' }, 404);
    }

    // 예전 아티클 주소 article.html?slug=… → 정적 페이지 articles/<slug>.html (301).
    // (slug 없는 옛 #slug 해시 링크는 서버에 오지 않으므로 목록으로 보냅니다.)
    if (url.pathname === '/article.html') {
      const slug = (url.searchParams.get('slug') || '').trim();
      const target = /^[a-z0-9-]+$/.test(slug) ? `/articles/${slug}.html` : '/articles.html';
      return Response.redirect(`${url.origin}${target}`, 301);
    }

    // 그 밖의 경로는 정적 자산 핸들러로 넘깁니다 (404.html 처리 포함).
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405, { Allow: 'POST' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'validation' }, 400);
  }
  if (!body || typeof body !== 'object') {
    return json({ ok: false, error: 'validation' }, 400);
  }

  // 허니팟: 봇이 채운 제출은 성공한 척하고 버립니다.
  if (str(body.honeypot)) {
    return json({ ok: true });
  }

  const fields = {
    name: str(body.name).trim(),
    email: str(body.email).trim(),
    company: str(body.company).trim(),
    role: str(body.role).trim(),
    subject: str(body.subject).trim(),
    message: str(body.message).trim(),
  };
  const source = {
    page: str(body.source?.page).trim(),
    entry: str(body.source?.entry).trim(),
    lang: str(body.source?.lang).trim(),
  };
  const token = str(body.turnstileToken);

  const validationError = validate(fields, source, token);
  if (validationError) {
    return json({ ok: false, error: 'validation', detail: validationError }, 400);
  }

  const verified = await verifyTurnstile(token, request, env);
  if (!verified) {
    return json({ ok: false, error: 'captcha' }, 403);
  }

  const sent = await sendEmail(fields, source, env);
  if (!sent) {
    return json({ ok: false, error: 'send' }, 502);
  }

  return json({ ok: true });
}

function validate(fields, source, token) {
  if (!fields.name || !fields.email || !fields.subject || !fields.message) return 'required';
  if (!EMAIL_RE.test(fields.email)) return 'email';
  for (const [key, max] of Object.entries(LIMITS)) {
    if (key === 'token' || key === 'source') continue;
    if (fields[key].length > max) return `too_long:${key}`;
  }
  for (const value of Object.values(source)) {
    if (value.length > LIMITS.source) return 'too_long:source';
  }
  if (!token || token.length > LIMITS.token) return 'token';
  return null;
}

async function verifyTurnstile(token, request, env) {
  const allowed = new Set(
    String(env.TURNSTILE_HOSTNAMES || '')
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean),
  );
  if (!env.TURNSTILE_SECRET_KEY || allowed.size === 0) {
    console.error('Turnstile is not configured (secret or hostnames missing)');
    return false;
  }

  const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.set('remoteip', ip);

  let result;
  try {
    const res = await fetch(TURNSTILE_SITEVERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`siteverify HTTP ${res.status}`);
    result = await res.json();
  } catch (err) {
    console.error('Turnstile siteverify failed:', err);
    return false;
  }

  // Cloudflare 의 테스트 키는 hostname 으로 example.com 을, action 은 비워서 돌려줍니다.
  // 운영 키에서는 둘 다 실제 값과 일치해야 합니다.
  const testing = result.metadata?.result_with_testing_key === true;
  const actionOk = testing ? true : result.action === TURNSTILE_ACTION;
  const hostOk = testing ? true : allowed.has(result.hostname);

  if (result.success !== true || !actionOk || !hostOk) {
    console.warn('Turnstile rejected:', result['error-codes'], result.action, result.hostname);
    return false;
  }
  return true;
}

async function sendEmail(fields, source, env) {
  const required = ['EMAILJS_PRIVATE_KEY', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID'];
  for (const key of required) {
    if (!env[key]) {
      console.error(`EmailJS is not configured (${key} missing)`);
      return false;
    }
  }

  // 기존 브라우저 구현과 같은 형태로 본문 끝에 출처 블록을 붙입니다.
  // 현재 EmailJS 템플릿에는 {{company}} / {{role}} 가 없어서 본문에도 넣습니다.
  const message =
    `${fields.message}\n\n──────────\n` +
    `[소속] ${fields.company || '-'} · [역할] ${fields.role || '-'}\n` +
    `[문의 출처] ${source.page || '-'}\n` +
    `[진입 지점] ${source.entry || '-'} · [언어] ${source.lang || '-'}`;

  const payload = {
    service_id: env.EMAILJS_SERVICE_ID,
    template_id: env.EMAILJS_TEMPLATE_ID,
    user_id: env.EMAILJS_PUBLIC_KEY,
    accessToken: env.EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: fields.name,
      from_email: fields.email,
      subject: fields.subject,
      message,
      company: fields.company,
      role: fields.role,
      source_page: source.page,
      source_entry: source.entry,
      source_lang: source.lang,
    },
  };

  try {
    const res = await fetch(env.EMAILJS_API_URL || EMAILJS_SEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error('EmailJS send failed:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('EmailJS request failed:', err);
    return false;
  }
}

function str(value) {
  return typeof value === 'string' ? value : '';
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}
