#!/usr/bin/env node
// 아티클 정적 페이지 빌드.
//
// articles/index.json 의 각 항목과 articles/<slug>.md (ko) · <slug>.<lang>.md (en · zh · ja) 를
// templates/article.html 에 넣어 articles/<slug>.html (ko) · <lang>/articles/<slug>.html 을 만듭니다.
// 본문 · 제목 · 설명 · hreflang · JSON-LD 가 HTML 에 들어 있어 검색엔진과 링크 미리보기가 그대로 봅니다.
// 생성 파일은 git 에 올리지 않습니다 (npm run build 가 만듭니다).
// 설계: docs/design/2026-10-17-language-urls-design.md
//
//   node scripts/build-articles.mjs

import { marked } from 'marked';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LANGS, LOCALE, OG_LOCALE, ROOT, SITE, TRANSLATIONS, escapeHtml, localizeHref, prefix } from './lib/site.mjs';

const ARTICLES_DIR = join(ROOT, 'articles');
const TEMPLATE = readFileSync(join(ROOT, 'templates', 'article.html'), 'utf8');
const INDEX = JSON.parse(readFileSync(join(ARTICLES_DIR, 'index.json'), 'utf8'));

// 출력 경로: ko → articles/<slug>.html, 그 외 → <lang>/articles/<slug>.html
const pagePath = (slug, lang) => `${prefix(lang)}articles/${slug}.html`;
// 카테고리 → 관련 서비스 페이지
const SERVICE_PAGE = {
  Regulation: 'compliance.html',
  Compliance: 'compliance.html',
  'Threat Intelligence': 'maritime-cybersecurity.html',
};

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
  const p = join(ARTICLES_DIR, lang === 'ko' ? `${slug}.md` : `${slug}.${lang}.md`);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

// 본문 첫 줄의 "# 제목" 은 히어로가 이미 보여 주므로 뺍니다 (h1 중복 방지).
const stripLeadingH1 = (md) => md.replace(/^\s*# [^\n]*\n+/, '');

// 이전 빌드 결과 정리 (md · json 은 남김)
for (const lang of LANGS) {
  const dir = join(ROOT, prefix(lang), 'articles');
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.html')) rmSync(join(dir, f));
  }
}

let count = 0;

for (const meta of INDEX) {
  const available = LANGS.filter((lang) => markdownFor(meta.slug, lang) !== null);
  if (!available.includes('ko')) {
    console.warn(`skip ${meta.slug}: articles/${meta.slug}.md (ko) missing`);
    continue;
  }

  const alternates = available
    .map((l) => `    <link rel="alternate" hreflang="${l}" href="${SITE}/${pagePath(meta.slug, l)}" />`)
    .concat(`    <link rel="alternate" hreflang="x-default" href="${SITE}/${pagePath(meta.slug, 'ko')}" />`)
    .join('\n');

  for (const lang of available) {
    const title = localize(meta.title, lang);
    const description = localize(meta.description, lang);
    const author = localize(meta.author, lang);
    const canonical = `${SITE}/${pagePath(meta.slug, lang)}`;
    const dateText = new Intl.DateTimeFormat(LOCALE[lang], { year: 'numeric', month: 'long', day: 'numeric' }).format(
      new Date(meta.date),
    );
    const servicePage = SERVICE_PAGE[meta.category];
    const siteName = ui(lang, 'articlesUi', 'siteName', '광명마리타임');

    const jsonLd = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: meta.date,
        inLanguage: lang,
        author: { '@type': 'Organization', name: siteName, url: SITE },
        publisher: { '@type': 'Organization', name: 'Gwangmyung Maritime', url: SITE },
        image: `${SITE}/resource/og-image.png`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      },
      null,
      2,
    );

    const html = render(TEMPLATE, {
      lang,
      prefix: prefix(lang),
      siteName,
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
        ? `            <a href="${localizeHref(servicePage, lang)}" class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-ocean-700 hover:text-ocean-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500">
              <span data-i18n="articleCta.service">${escapeHtml(ui(lang, 'articleCta', 'service', ''))}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>`
        : '',
    });

    const out = join(ROOT, pagePath(meta.slug, lang));
    mkdirSync(join(out, '..'), { recursive: true });
    writeFileSync(out, html);
    count += 1;
  }
}

console.log(`Built ${count} article page(s).`);
