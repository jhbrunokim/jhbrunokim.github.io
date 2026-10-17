# 언어별 URL 설계 (2026-10-17)

## 의도

지금은 한 URL(`/about.html`)에서 JS가 저장된 언어 설정에 따라 글자만 바꿉니다. 검색엔진은 한국어(또는 크롤러의
브라우저 언어로 바뀐 영어) 한 가지만 색인하고, 영문 · 중문 · 일문 페이지는 검색에 잡히지 않습니다. 아티클에 먼저
적용한 방식(페이지마다 언어가 정해진 정적 HTML + `hreflang`)을 사이트 전체로 넓힙니다.

## URL 규칙

| 언어 | 페이지 | 아티클 |
|---|---|---|
| ko (원문) | `/about.html` | `/articles/<slug>.html` |
| en · zh · ja | `/en/about.html` | `/en/articles/<slug>.html` |

- `privacy-policy.html` 은 한국어(루트)와 영어(`/en/privacy-policy.html`) 두 가지만 있습니다. 영문판은 `data-i18n` 치환이 아니라 완성된 소스 파일 `privacy-policy.en.html` 을 빌드가 `en/` 에 그대로 복사한 것이며, 루트의 소스는 `.assetsignore` 로 업로드에서 빠집니다. 중문 · 일문 페이지의 개인정보처리방침 링크는 영문판을 가리킵니다. 두 페이지는 `hreflang`(ko · en · x-default=ko)으로 서로 연결됩니다.
- `404.html` 은 한국어만 있으므로 언어 디렉터리를 만들지 않습니다.
- 이전에 잠깐 쓰인 `/articles/<slug>.en.html` 은 `_redirects` 로 새 주소에 301.
- `/en/`, `/zh/`, `/ja/` 는 `_redirects` 가 `index.html` 로 리라이트(루트의 `/` 와 같은 방식).

## 만드는 방법

- 한국어 루트 페이지가 원본(소스)입니다. 각 페이지는 `<html lang="ko" data-page-lang="ko">` 와 `hreflang` 대체 링크를 가집니다.
- `scripts/build-pages.mjs` 가 cheerio 로 원본을 읽어 `data-i18n` · `data-i18n-html` · `data-i18n-placeholder` · `data-i18n-aria-label` 을 `data/translations.json` 값으로 치환하고, `<title>` · description · OG 는 `pageMeta.<page>` 로 바꾸고, `canonical` · `og:locale` · `<html lang>` 을 맞추고, 같은 사이트 안의 `.html` 링크에 언어 접두사를 붙여 `<lang>/<page>.html` 로 씁니다. 생성 페이지는 `<base href="/">` 를 가집니다(아티클과 동일).
- `scripts/build-articles.mjs` 는 아티클을 같은 규칙으로 `<lang>/articles/` 에 씁니다.
- `scripts/build-sitemap.mjs` 가 `sitemap.xml` 을 생성합니다(루트 페이지 + 언어 변형 + 아티클, `lastmod` 는 원본 파일의 마지막 커밋 날짜).
- 생성물(`en/`, `zh/`, `ja/`, `articles/*.html`, `sitemap.xml`)은 git 에 올리지 않습니다. `npm run build` 가 만들고 CI 가 배포합니다.

## 런타임 규칙 (JS)

- **URL 이 언어다.** 페이지는 자기 언어로 렌더링되며, 저장된 선호 언어로 글자를 바꾸지 않습니다.
- **선호 언어 리다이렉트.** `<head>` 의 인라인 스크립트가 저장된 선호(없으면 브라우저 언어)와 페이지 언어가 다르면 `hreflang` 대체 페이지로 `location.replace` 합니다. 렌더링 전에 실행되므로 깜빡임이 없습니다. UA 가 크롤러(`bot|crawl|spider|...`)면 리다이렉트하지 않습니다. 선호 언어는 방문자가 직접 바꿀 때만 저장합니다.
- **언어 전환.** 지구본에서 고르면 `i18n.changeLanguage()` 가 선호를 저장하고 대체 페이지로 이동합니다.
- **컴포넌트 링크.** 내비 · 푸터 · 모달은 런타임에 삽입되므로 `layout.js` 가 페이지 언어에 맞춰 `.html` 링크에 접두사를 붙입니다(개인정보처리방침은 언어와 무관하게 `en/` 접두사). 활성 메뉴 판정은 접두사를 뗀 파일명으로 합니다.
- `articles.js` 의 목록 · 미리보기 링크도 같은 접두사 규칙을 씁니다.

## 하지 않는 것

- Worker 에서 요청 시점에 번역(HTMLRewriter)하지 않습니다. 무료 플랜 요청 한도와 봇 트래픽을 고려해 빌드 시 생성합니다.
- 개인정보처리방침의 중문 · 일문 번역, 404 번역은 범위 밖입니다. (영문판은 2026-10-18 에 별도 소스 파일로 추가.)
- 언어별 도메인/서브도메인은 쓰지 않습니다.

## 결정 사항 (제가 정함)

- 디렉터리 접두사(`/en/`) 방식. 서브도메인보다 설정이 적고 Cloudflare 설정 변경이 없습니다.
- `pageMeta` 번역은 translations.json 에 둡니다(다른 문자열과 같은 곳).
- 크롤러 판별은 UA 정규식 하나로 합니다. 완벽하지 않지만 `hreflang` 이 있어 검색엔진은 어차피 각 언어 페이지를 직접 찾습니다.
