#!/usr/bin/env node
// sitemap.xml 생성: 루트 페이지 + 언어 변형 + 아티클.
// lastmod 는 원본 파일(루트 HTML · 마크다운)의 마지막 커밋 날짜입니다. git 이 없으면 오늘 날짜.
//
//   node scripts/build-sitemap.mjs

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LANGS, PAGES, ROOT, SITE, prefix } from './lib/site.mjs';

const today = new Date().toISOString().slice(0, 10);

function lastCommitDate(file) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    return out || today;
  } catch {
    return today;
  }
}

const PRIORITY = { index: '1.0', services: '0.9', maritime: '0.9', about: '0.8', articles: '0.8' };
const entries = [];

for (const page of PAGES) {
  const lastmod = lastCommitDate(`${page}.html`);
  for (const lang of LANGS) {
    const path = `${prefix(lang)}${page === 'index' ? '' : `${page}.html`}`;
    const base = PRIORITY[page] ?? '0.9';
    entries.push({
      loc: `${SITE}/${path}`,
      lastmod,
      changefreq: page === 'articles' ? 'weekly' : 'monthly',
      priority: lang === 'ko' ? base : (Number(base) - 0.1).toFixed(1),
    });
  }
}

entries.push({ loc: `${SITE}/privacy-policy.html`, lastmod: lastCommitDate('privacy-policy.html'), changefreq: 'yearly', priority: '0.3' });

const articles = JSON.parse(readFileSync(join(ROOT, 'articles', 'index.json'), 'utf8'));
for (const a of articles) {
  for (const lang of LANGS) {
    const md = lang === 'ko' ? `articles/${a.slug}.md` : `articles/${a.slug}.${lang}.md`;
    entries.push({
      loc: `${SITE}/${prefix(lang)}articles/${a.slug}.html`,
      lastmod: lastCommitDate(md),
      changefreq: 'monthly',
      priority: lang === 'ko' ? '0.7' : '0.6',
    });
  }
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`Wrote sitemap.xml with ${entries.length} URL(s).`);
