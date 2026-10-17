#!/usr/bin/env node
// Content-Security-Policy 의 인라인 스크립트 해시를 관리합니다.
//
// 사이트의 CSP(_headers) 는 'unsafe-inline' 없이 script-src 를 잠그고, 루트 *.html 의
// 인라인 <script> 블록은 sha256 해시로만 허용합니다. 인라인 스크립트를 고치면 해시가
// 바뀌어 브라우저가 그 스크립트를 막으므로, 이 스크립트로 _headers 를 맞춥니다.
//
//   node scripts/csp-hashes.mjs            현재 해시 목록 출력
//   node scripts/csp-hashes.mjs --write    _headers 의 script-src 해시를 현재 값으로 교체
//   node scripts/csp-hashes.mjs --check    _headers 와 다르면 종료 코드 1 (CI 에서 실행)
//
// JSON-LD(type="application/ld+json") 는 실행되지 않으므로 제외합니다.
// 인라인 이벤트 핸들러(onclick= 등)는 해시로 허용할 수 없으니 쓰지 마십시오. --check 가 잡아냅니다.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEADERS_PATH = join(ROOT, '_headers');
const mode = process.argv.includes('--write') ? 'write' : process.argv.includes('--check') ? 'check' : 'print';

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const HANDLER_RE = /\son[a-z]+\s*=\s*["']/gi;
const JS_URL_RE = /\b(?:href|src|action)\s*=\s*["']\s*javascript:/gi;

const pages = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
// components/*.html 은 innerHTML 로 삽입되므로 그 안의 <script> 는 실행되지 않지만
// 인라인 핸들러 속성은 동작하므로 검사 대상에 넣습니다.
const fragments = readdirSync(join(ROOT, 'components')).map((f) => join('components', f));

const hashes = new Map(); // hash -> [file:line]
const problems = [];

for (const file of [...pages, ...fragments]) {
  const html = readFileSync(join(ROOT, file), 'utf8');

  for (const m of html.matchAll(HANDLER_RE)) {
    problems.push(`${file}: inline event handler ${m[0].trim()} (move it into a JS file)`);
  }
  for (const m of html.matchAll(JS_URL_RE)) {
    problems.push(`${file}: javascript: URL`);
  }

  if (!pages.includes(file)) continue;
  for (const m of html.matchAll(SCRIPT_RE)) {
    const attrs = m[1];
    const body = m[2];
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    if (!body.trim()) continue;
    const hash = 'sha256-' + createHash('sha256').update(body, 'utf8').digest('base64');
    const line = html.slice(0, m.index).split('\n').length;
    if (!hashes.has(hash)) hashes.set(hash, []);
    hashes.get(hash).push(`${file}:${line}`);
  }
}

const current = [...hashes.keys()].sort();

if (mode === 'print') {
  for (const h of current) console.log(`'${h}'  ${hashes.get(h).join(', ')}`);
  if (problems.length) {
    console.log('\nProblems:');
    problems.forEach((p) => console.log('  ' + p));
  }
  process.exit(problems.length ? 1 : 0);
}

const headers = readFileSync(HEADERS_PATH, 'utf8');
const cspLine = headers.split('\n').find((l) => /^\s*Content-Security-Policy:/i.test(l));
if (!cspLine) {
  console.error('_headers has no Content-Security-Policy line');
  process.exit(1);
}
const scriptSrcMatch = cspLine.match(/script-src\s+([^;]*)/);
if (!scriptSrcMatch) {
  console.error('Content-Security-Policy has no script-src directive');
  process.exit(1);
}
const scriptSrc = scriptSrcMatch[1].trim().split(/\s+/);
const existing = scriptSrc.filter((t) => t.startsWith("'sha256-")).map((t) => t.slice(1, -1)).sort();
const others = scriptSrc.filter((t) => !t.startsWith("'sha256-"));

if (mode === 'check') {
  const missing = current.filter((h) => !existing.includes(h));
  const stale = existing.filter((h) => !current.includes(h));
  for (const h of missing) problems.push(`_headers is missing '${h}' (${hashes.get(h).join(', ')})`);
  for (const h of stale) problems.push(`_headers has stale hash '${h}' (no inline script matches)`);
  if (problems.length) {
    console.error('CSP check failed:');
    problems.forEach((p) => console.error('  ' + p));
    console.error('\nRun: node scripts/csp-hashes.mjs --write');
    process.exit(1);
  }
  console.log(`CSP check passed: ${current.length} inline script hash(es) match _headers.`);
  process.exit(0);
}

// write
const newScriptSrc = [...others, ...current.map((h) => `'${h}'`)].join(' ');
const newLine = cspLine.replace(/script-src\s+[^;]*/, `script-src ${newScriptSrc}`);
writeFileSync(HEADERS_PATH, headers.replace(cspLine, newLine));
console.log(`Wrote ${current.length} hash(es) into _headers script-src.`);
if (problems.length) {
  console.error('Problems that hashes cannot fix:');
  problems.forEach((p) => console.error('  ' + p));
  process.exit(1);
}
