// 빌드 스크립트 공용 상수 · 헬퍼.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SITE = 'https://gmmaritime.com';
export const LANGS = ['ko', 'en', 'zh', 'ja'];
export const LOCALE = { ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP' };
export const OG_LOCALE = { ko: 'ko_KR', en: 'en_US', zh: 'zh_CN', ja: 'ja_JP' };

// 언어 디렉터리를 만드는 루트 페이지. data-i18n 이 없는 privacy-policy.html(영문은 privacy-policy.en.html 을
// 그대로 복사) 과 한국어만 있는 404.html 은 뺍니다.
export const PAGES = [
  'index',
  'about',
  'services',
  'maritime',
  'system-integration',
  'maritime-cybersecurity',
  'compliance',
  'ai-cybersecurity-consulting',
  'articles',
  'zero-trust',
];
// 언어 접두사를 붙이지 않는 루트 페이지 (한국어만 존재)
export const KO_ONLY_PAGES = ['404.html'];
// 개인정보처리방침은 한국어 · 영어만 있습니다. 중문 · 일문 페이지도 영문판(en/)으로 링크합니다.
export const PRIVACY_PAGE = 'privacy-policy.html';

// ko → '' , en → 'en/' (assets/js/articles.js · layout.js 의 규칙과 같아야 합니다)
export const prefix = (lang) => (lang === 'ko' ? '' : `${lang}/`);

export const TRANSLATIONS = JSON.parse(readFileSync(join(ROOT, 'data', 'translations.json'), 'utf8'));

// 아티클 예약 발행. articles/index.json 의 date 가 오늘(한국 시간) 이하인 글만 사이트에 들어갑니다.
// deploy.yml 이 매주 월요일 아침에 한 번 더 빌드하므로, 미래 날짜를 적어 두면 그 주에 자동으로 나갑니다.
// 로컬 미리보기: ARTICLES_AS_OF=2026-12-31 npm run build 처럼 기준일을 바꿀 수 있습니다.
export function todayInSeoul() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(
    new Date(),
  );
}

export function loadArticles() {
  const all = JSON.parse(readFileSync(join(ROOT, 'articles', 'index.json'), 'utf8'));
  const asOf = process.env.ARTICLES_AS_OF || todayInSeoul();
  const published = all.filter((a) => a.date <= asOf).sort((x, y) => y.date.localeCompare(x.date));
  const scheduled = all.filter((a) => a.date > asOf).sort((x, y) => x.date.localeCompare(y.date));
  return { asOf, published, scheduled };
}

export const getNested = (obj, path) => path.split('.').reduce((cur, key) => cur?.[key], obj);

export const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// 같은 사이트 안의 페이지 링크에 언어 접두사를 붙입니다. 외부 · 절대 · 앵커 · mailto 는 그대로,
// 한국어 전용 페이지도 그대로 둡니다. 개인정보처리방침은 어떤 언어에서든 영문판(en/)으로 보냅니다.
export function localizeHref(href, lang) {
  if (!href || lang === 'ko') return href;
  if (/^(https?:|mailto:|tel:|\/|#|data:)/i.test(href)) return href;
  if (/^(en|zh|ja)\//.test(href)) return href;
  const file = href.split(/[?#]/)[0];
  if (!/\.html$/.test(file)) return href;
  if (KO_ONLY_PAGES.includes(file)) return href;
  if (file === PRIVACY_PAGE) return prefix('en') + href;
  return prefix(lang) + href;
}
