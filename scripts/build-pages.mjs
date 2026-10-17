#!/usr/bin/env node
// 루트 페이지의 언어 변형 빌드.
//
// 한국어 루트 페이지(원본)의 data-i18n* 요소를 data/translations.json 값으로 치환해
// en/<page>.html · zh/<page>.html · ja/<page>.html 을 만듭니다. 브라우저에서 i18n.js 가 하던 일을
// 빌드 때 미리 해 두는 것이라, 검색엔진과 링크 미리보기가 각 언어의 본문을 그대로 봅니다.
// 설계: docs/design/2026-10-17-language-urls-design.md
//
//   node scripts/build-pages.mjs

import { load } from 'cheerio';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LANGS, OG_LOCALE, PAGES, ROOT, SITE, TRANSLATIONS, getNested, localizeHref, prefix } from './lib/site.mjs';

const TARGET_LANGS = LANGS.filter((l) => l !== 'ko');

// 이전 빌드 결과 정리
for (const lang of TARGET_LANGS) {
  const dir = join(ROOT, lang);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.html')) rmSync(join(dir, f));
  }
}

let built = 0;
const warnings = [];

for (const page of PAGES) {
  const src = join(ROOT, `${page}.html`);
  if (!existsSync(src)) {
    warnings.push(`${page}.html not found`);
    continue;
  }
  const html = readFileSync(src, 'utf8');

  if (!html.includes('data-page-lang="ko"')) warnings.push(`${page}.html: <html> lacks data-page-lang="ko"`);
  if (!html.includes('hreflang=')) warnings.push(`${page}.html: no hreflang alternates in <head>`);

  for (const lang of TARGET_LANGS) {
    const dict = TRANSLATIONS[lang];
    const $ = load(html);

    // <html lang>, 페이지 언어
    $('html').attr('lang', lang).attr('data-page-lang', lang);

    // 언어 디렉터리에서 상대 경로(assets · components · data)가 루트를 가리키도록
    if (!$('base').length) {
      $('meta[name="viewport"]').after('\n    <base href="/" />');
    }

    // data-i18n* 치환 (assets/js/i18n.js applyTranslations 와 같은 규칙)
    $('[data-i18n]').each((_, el) => {
      const value = getNested(dict, $(el).attr('data-i18n'));
      if (typeof value !== 'string') return;
      if ($(el).is('[data-i18n-html]')) $(el).html(value);
      else $(el).text(value);
    });
    $('[data-i18n-placeholder]').each((_, el) => {
      const value = getNested(dict, $(el).attr('data-i18n-placeholder'));
      if (value) $(el).attr('placeholder', value);
    });
    $('[data-i18n-aria-label]').each((_, el) => {
      const value = getNested(dict, $(el).attr('data-i18n-aria-label'));
      if (value) $(el).attr('aria-label', value);
    });

    // 제목 · 설명 · OG (pageMeta 가 있을 때만; 없으면 한국어 유지 + 경고)
    const meta = getNested(dict, `pageMeta.${page}`);
    if (meta?.title) {
      $('title').text(meta.title);
      $('meta[property="og:title"]').attr('content', meta.title);
      $('meta[name="twitter:title"]').attr('content', meta.title);
    } else {
      warnings.push(`${page}.html [${lang}]: pageMeta.${page}.title missing, Korean title kept`);
    }
    if (meta?.description) {
      $('meta[name="description"]').attr('content', meta.description);
      $('meta[property="og:description"]').attr('content', meta.description);
      $('meta[name="twitter:description"]').attr('content', meta.description);
    }

    const url = `${SITE}/${prefix(lang)}${page === 'index' ? '' : `${page}.html`}`;
    $('link[rel="canonical"]').attr('href', url);
    $('meta[property="og:url"]').attr('content', url);
    $('meta[property="og:locale"]').attr('content', OG_LOCALE[lang]);

    // 같은 사이트 안의 페이지 링크에 언어 접두사
    $('a[href]').each((_, el) => {
      $(el).attr('href', localizeHref($(el).attr('href'), lang));
    });

    const outDir = join(ROOT, lang);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, `${page}.html`), $.html());
    built += 1;
  }
}

console.log(`Built ${built} language page(s) in en/ zh/ ja/.`);
for (const w of warnings) console.warn('warning:', w);
