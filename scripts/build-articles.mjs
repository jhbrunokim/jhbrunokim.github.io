#!/usr/bin/env node
// 아티클 정적 페이지 빌드.
//
// articles/index.json 의 각 항목과 articles/<slug>.md (ko) · <slug>.<lang>.md (en · zh · ja) 를
// templates/article.html 에 넣어 articles/<slug>.html · articles/<slug>.<lang>.html 을 만듭니다.
// 예전에는 article.html?slug=… 이 브라우저에서 마크다운을 그렸는데, 그러면 검색엔진과
// 링크 미리보기에 빈 페이지가 보였습니다. 이제 본문 · 제목 · 설명 · hreflang · JSON-LD 가
// HTML 에 들어 있습니다. 생성 파일은 git 에 올리지 않습니다 (npm run build 가 만듭니다).
//
//   node scripts/build-articles.mjs

import { marked } from 'marked';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES_DIR = join(ROOT, 'articles');
const TEMPLATE = readFileSync(join(ROOT, 'templates', 'article.html'), 'utf8');
const INDEX = JSON.parse(readFileSync(join(ARTICLES_DIR, 'index.json'), 'utf8'));
const TRANSLATIONS = JSON.parse(readFileSync(join(ROOT, 'data', 'translations.json'), 'utf8'));

const SITE = 'https://gmmaritime.com';
const LANGS = ['ko', 'en', 'zh', 'ja'];
const LOCALE = { ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP' };
const OG_LOCALE = { ko: 'ko_KR', en: 'en_US', zh: 'zh_CN', ja: 'ja_JP' };
// assets/js/articles.js 의 articleUrl() 과 같은 규칙이어야 합니다.
const pageName = (slug, lang) => (lang === 'ko' ? `${slug}.html` : `${slug}.${lang}.html`);
// 카테고리 → 관련 서비스 페이지 (예전 article.html 인라인 스크립트와 같은 매핑)
const SERVICE_PAGE = {
  Regulation: 'compliance.html',
  Compliance: 'compliance.html',
  'Threat Intelligence': 'maritime-cybersecurity.html',
};

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const localize = (field, lang) =>
  !field || typeof field === 'string' ? field || '' : field[lang] ?? field.en ?? field.ko ?? '';

const ui = (lang, section, key, fallback) => TRANSLATIONS[lang]?.[section]?.[key] || fallback;

function render(template, values) {
  // {{{raw}}} 먼저, 그다음 {{escaped}}
  return template
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, k) => values[k] ?? '')
    .replace(/\{\{(\w+)\}\}/g, (_, k) => escapeHtml(values[k] ?? ''));
}

function markdownFor(slug, lang) {
  const candidates = lang === 'ko' ? [`${slug}.md`] : [`${slug}.${lang}.md`];
  for (const name of candidates) {
    const p = join(ARTICLES_DIR, name);
    if (existsSync(p)) return readFileSync(p, 'utf8');
  }
  return null;
}

// 본문 첫 줄의 "# 제목" 은 히어로가 이미 보여 주므로 뺍니다 (h1 중복 방지).
function stripLeadingH1(md) {
  return md.replace(/^\s*# [^\n]*\n+/, '');
}

// 이전 빌드 결과 정리 (md · json 은 남김)
for (const f of readdirSync(ARTICLES_DIR)) {
  if (f.endsWith('.html')) rmSync(join(ARTICLES_DIR, f));
}
mkdirSync(ARTICLES_DIR, { recursive: true });

let count = 0;
const sitemapEntries = [];

for (const meta of INDEX) {
  const available = LANGS.filter((lang) => markdownFor(meta.slug, lang) !== null);
  if (!available.includes('ko')) {
    console.warn(`skip ${meta.slug}: articles/${meta.slug}.md (ko) missing`);
    continue;
  }

  const alternates = available
    .map((l) => `    <link rel="alternate" hreflang="${l}" href="${SITE}/articles/${pageName(meta.slug, l)}" />`)
    .concat(`    <link rel="alternate" hreflang="x-default" href="${SITE}/articles/${pageName(meta.slug, 'ko')}" />`)
    .join('\n');

  for (const lang of available) {
    const title = localize(meta.title, lang);
    const description = localize(meta.description, lang);
    const author = localize(meta.author, lang);
    const canonical = `${SITE}/articles/${pageName(meta.slug, lang)}`;
    const dateText = new Intl.DateTimeFormat(LOCALE[lang], { year: 'numeric', month: 'long', day: 'numeric' }).format(
      new Date(meta.date),
    );
    const servicePage = SERVICE_PAGE[meta.category];

    const jsonLd = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: meta.date,
        inLanguage: lang,
        author: { '@type': 'Organization', name: ui(lang, 'articlesUi', 'siteName', '광명마리타임'), url: SITE },
        publisher: { '@type': 'Organization', name: 'Gwangmyung Maritime', url: SITE },
        image: `${SITE}/resource/og-image.png`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      },
      null,
      2,
    );

    const html = render(TEMPLATE, {
      lang,
      siteName: ui(lang, 'articlesUi', 'siteName', '광명마리타임'),
      title,
      description,
      canonical,
      alternates,
      ogLocale: OG_LOCALE[lang],
      date: meta.date,
      dateText,
      jsonLd,
      uiBack: ui(lang, 'articlesUi', 'back', 'Back to Articles'),
      categoryBadge: meta.category
        ? `            <span class="inline-flex items-center rounded-full bg-ocean-50 dark:bg-ocean-900/30 px-2.5 py-0.5 text-xs font-medium text-ocean-700 dark:text-ocean-300">${escapeHtml(meta.category)}</span>`
        : '',
      authorLine: author
        ? `          <p class="mt-4 text-sm text-slate-300"><span data-i18n="articlesUi.by">${escapeHtml(ui(lang, 'articlesUi', 'by', 'By'))}</span> ${escapeHtml(author)}</p>`
        : '',
      content: marked.parse(stripLeadingH1(markdownFor(meta.slug, lang))),
      ctaTitle: ui(lang, 'articleCta', 'title', ''),
      ctaDesc: ui(lang, 'articleCta', 'desc', ''),
      ctaButton: ui(lang, 'articleCta', 'button', ''),
      ctaServiceLink: servicePage
        ? `            <a href="${servicePage}" class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-ocean-700 hover:text-ocean-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500">
              <span data-i18n="articleCta.service">${escapeHtml(ui(lang, 'articleCta', 'service', ''))}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>`
        : '',
    });

    writeFileSync(join(ARTICLES_DIR, pageName(meta.slug, lang)), html);
    sitemapEntries.push({ url: canonical, date: meta.date });
    count += 1;
  }
}

console.log(`Built ${count} article page(s) in articles/.`);
if (process.argv.includes('--print-sitemap')) {
  for (const e of sitemapEntries) console.log(`${e.url}\t${e.date}`);
}
