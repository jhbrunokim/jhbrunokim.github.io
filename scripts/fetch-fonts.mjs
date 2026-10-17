#!/usr/bin/env node
// 웹 글꼴 자체 호스팅용 다운로드.
//
// Google Fonts CSS2 엔드포인트가 돌려주는 @font-face 규칙(unicode-range 서브셋 분할 포함)을
// 그대로 받아, woff2 파일을 assets/fonts/<family-slug>/ 에 저장하고 url() 만 로컬 경로로 바꾼
// CSS 를 assets/fonts/*.css 로 씁니다. 브라우저는 페이지에 실제로 쓰인 유니코드 범위의 조각만
// 내려받으므로 CJK 글꼴도 Google Fonts 를 쓸 때와 같은 양만 전송됩니다.
//
// npm run build 에는 들어가지 않습니다. 글꼴 종류 · 굵기를 바꿀 때만 손으로 실행하고 결과를 커밋합니다.
//
//   node scripts/fetch-fonts.mjs             글꼴 받고 CSS 생성
//   node scripts/fetch-fonts.mjs --no-500    CJK 본문 글꼴의 500 굵기를 뺌 (용량이 클 때)
//
// 생성물:
//   assets/fonts/base.css       Inter · Space Grotesk (모든 페이지)
//   assets/fonts/ko.css         Noto Sans KR            (한국어 페이지)
//   assets/fonts/zh.css         Noto Sans SC            (중국어 페이지)
//   assets/fonts/ja.css         Noto Sans JP            (일본어 페이지)
//   assets/fonts/watermark.css  홈 문의 섹션 워터마크 전용 서체 (index.html, 비동기 로드)
//
// Google 은 가변 글꼴(Inter · Noto Sans 계열)이면 여러 굵기에 같은 woff2 를 돌려주므로 URL 기준으로 한 번만
// 받고, 파일 이름은 <family-slug>-<weight|var>[-italic]-<서브셋 번호>.woff2 로 결정적으로 붙입니다.
// 워터마크가 쓰는 Noto Sans SC · JP 700 은 zh.css · ja.css 와 같은 굵기 집합으로 요청해 같은 파일을 공유합니다
// (굵기 하나만 요청하면 Google 이 별도의 정적 인스턴스를 돌려줘 용량이 두 배가 됩니다).
// CSS 안의 url() 은 CSS 파일 기준 상대 경로(<family-slug>/<file>.woff2)이므로 <base href> 와 무관하게 풉니다.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets', 'fonts');
const DROP_500 = process.argv.includes('--no-500');

// Google 이 woff2 + unicode-range 분할을 돌려주도록 최신 Chrome UA 를 보냅니다.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const CONCURRENCY = 16;

const cjkWeights = DROP_500 ? '400;700' : '400;500;700';

// 각 CSS 파일에 들어갈 family 쿼리 (Google Fonts CSS2 문법 그대로)
const SHEETS = {
  base: ['Inter:wght@400;500;600;700', 'Space+Grotesk:wght@500;600;700'],
  ko: [`Noto+Sans+KR:wght@${cjkWeights}`],
  zh: [`Noto+Sans+SC:wght@${cjkWeights}`],
  ja: [`Noto+Sans+JP:wght@${cjkWeights}`],
  watermark: [
    'Anton',
    'Playfair+Display:ital,wght@1,900',
    'Black+Han+Sans',
    'Noto+Serif+KR:wght@900',
    'Noto+Serif+SC:wght@900',
    'Noto+Serif+JP:wght@900',
    `Noto+Sans+SC:wght@${cjkWeights}`,
    `Noto+Sans+JP:wght@${cjkWeights}`,
    'ZCOOL+QingKe+HuangYou',
    'Dela+Gothic+One',
  ],
};

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function fetchCss(families) {
  const url = `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const css = await res.text();
  if (!/woff2/.test(css)) throw new Error(`Google did not return woff2 for ${url}`);
  return css;
}

// @font-face 블록을 하나씩 떼어 family · style · weight · url 을 읽습니다.
function parseFaces(css) {
  const faces = [];
  const re = /(\/\*\s*([^*]*?)\s*\*\/\s*)?@font-face\s*\{([\s\S]*?)\}/g;
  for (const m of css.matchAll(re)) {
    const body = m[3];
    const prop = (name) => body.match(new RegExp(`${name}\\s*:\\s*([^;]+);`))?.[1].trim();
    const family = prop('font-family')?.replace(/^['"]|['"]$/g, '');
    const style = prop('font-style') || 'normal';
    const weight = prop('font-weight') || '400';
    const url = body.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];
    if (!family || !url) throw new Error(`unparseable @font-face: ${body.slice(0, 120)}`);
    faces.push({ subset: m[2] || '', family, style, weight, url, body });
  }
  return faces;
}

const files = new Map(); // google url -> { rel (CSS 기준), abs, family }

// 모든 시트의 @font-face 를 다 읽은 뒤 URL 마다 로컬 이름을 정합니다. 한 URL 을 여러 굵기가 쓰면
// (가변 글꼴) 굵기 대신 'var' 를 붙입니다. 서브셋 번호는 같은 family · 이름 안에서 등장 순서입니다.
function assignNames(allFaces) {
  const weightsByUrl = new Map();
  for (const f of allFaces) {
    if (!weightsByUrl.has(f.url)) weightsByUrl.set(f.url, new Set());
    weightsByUrl.get(f.url).add(f.weight);
  }
  const counters = new Map();
  for (const f of allFaces) {
    if (files.has(f.url)) continue;
    const famSlug = slug(f.family);
    const weightTag = weightsByUrl.get(f.url).size > 1 ? 'var' : f.weight;
    const styleTag = f.style === 'normal' ? '' : `-${f.style}`;
    const stem = `${famSlug}-${weightTag}${styleTag}`;
    const idx = counters.get(stem) ?? 0;
    counters.set(stem, idx + 1);
    const rel = `${famSlug}/${stem}-${idx}.woff2`;
    files.set(f.url, { rel, abs: join(OUT, rel), family: f.family });
  }
}

function buildCss(name, faces) {
  const lines = [
    `/* ${name}.css — scripts/fetch-fonts.mjs 가 생성. 손으로 고치지 말고 스크립트를 다시 실행하십시오. */`,
    `/* 출처: Google Fonts (${SHEETS[name].join(', ')}), woff2 + unicode-range 서브셋 그대로 */`,
    '',
  ];
  for (const face of faces) {
    const { rel } = files.get(face.url);
    const body = face.body.replace(/url\(https:\/\/fonts\.gstatic\.com\/[^)]+\)/, `url(${rel})`);
    if (face.subset) lines.push(`/* ${face.subset} */`);
    lines.push(`@font-face {${body}}`);
  }
  return lines.join('\n') + '\n';
}

async function download(url, abs) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, buf);
  return buf.length;
}

async function runPool(items, worker) {
  let i = 0;
  const results = new Array(items.length);
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await worker(items[idx], idx);
      }
    }),
  );
  return results;
}

// 이전 결과 정리 (CSS · woff2 모두 다시 만듭니다)
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const sheetFaces = {};
for (const [name, families] of Object.entries(SHEETS)) {
  sheetFaces[name] = parseFaces(await fetchCss(families));
  console.log(`${name}.css: ${sheetFaces[name].length} @font-face`);
}
assignNames(Object.values(sheetFaces).flat());
const cssOut = Object.fromEntries(Object.entries(sheetFaces).map(([name, faces]) => [name, buildCss(name, faces)]));

const entries = [...files.entries()];
console.log(`downloading ${entries.length} woff2 file(s)...`);
const sizes = await runPool(entries, async ([url, { abs }], idx) => {
  const n = await download(url, abs);
  if ((idx + 1) % 200 === 0) console.log(`  ${idx + 1}/${entries.length}`);
  return n;
});

for (const [name, css] of Object.entries(cssOut)) writeFileSync(join(OUT, `${name}.css`), css);

// 집계: family 별 파일 수 · 용량 (PR 설명과 README 에 쓰기 위한 표)
const byFamily = new Map();
entries.forEach(([, { family }], i) => {
  const cur = byFamily.get(family) || { files: 0, bytes: 0 };
  cur.files += 1;
  cur.bytes += sizes[i];
  byFamily.set(family, cur);
});
const total = sizes.reduce((a, b) => a + b, 0);
console.log('\nfamily                      files      KB');
for (const [family, { files: n, bytes }] of [...byFamily].sort()) {
  console.log(`${family.padEnd(26)} ${String(n).padStart(5)} ${String(Math.round(bytes / 1024)).padStart(8)}`);
}
console.log(`${'TOTAL'.padEnd(26)} ${String(entries.length).padStart(5)} ${String(Math.round(total / 1024)).padStart(8)}`);
console.log(`\n${(total / 1024 / 1024).toFixed(1)} MB in ${entries.length} files -> ${OUT}`);
if (total > 40 * 1024 * 1024 && !DROP_500) {
  console.warn('warning: over 40 MB. Consider: node scripts/fetch-fonts.mjs --no-500');
}

// 무결성 확인용: 파일 목록 해시 (같은 입력이면 같은 값)
const manifest = createHash('sha256');
for (const f of readdirSync(OUT).sort()) manifest.update(f + ':' + statSync(join(OUT, f)).size + '\n');
console.log(`manifest sha256 ${manifest.digest('hex').slice(0, 16)}`);
