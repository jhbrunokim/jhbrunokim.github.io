# 광명마리타임 (Gwangmyung Maritime)

조선 · 해양 산업의 플랫폼 개발, 시스템 통합, IACS UR E26 / E27 컴플라이언스 대응을 소개하는 기업 웹사이트.

🌐 **Live Site**: [https://gmmaritime.com](https://gmmaritime.com)

## ✨ 기능

- 🎨 **반응형 디자인** — 모바일 / 태블릿 / 데스크톱
- 🌙 **OS 테마 자동 반영** — `prefers-color-scheme`을 그대로 따르고 OS 다크/라이트 전환 시 실시간 반영 (수동 토글 없음)
- 🌐 **4개 언어, 언어별 URL** — 한국어는 루트(`/about.html`), 영어 · 중국어(간체) · 일본어는 `/en/` · `/zh/` · `/ja/` 아래 정적 페이지. 빌드 때 `translations.json` 으로 생성하며 서로 `hreflang` 으로 연결
- 🗺️ **선호 언어 리다이렉트** — 저장된 선택(없으면 `navigator.languages`)이 페이지 언어와 다르면 렌더링 전에 해당 언어 페이지로 이동 (크롤러 제외, 외부 API 호출·자동 모달 없음). 네비 지구본 버튼으로 언어 변경
- 🧭 **스크롤 연동 네비게이션** — IntersectionObserver로 현재 섹션에 active-state 인디케이터, 서브페이지에서는 현재 페이지 하이라이트 + "← Overview" 링크
- 🗂️ **Competitiveness / Articles 프리뷰 섹션** — 인덱스에서 하위 페이지로 이어지는 진입점
- 📝 **아티클 시스템** — `articles/*.md` 마크다운 + `index.json`. 본문 페이지는 빌드 때 정적 HTML 로 생성 (검색엔진 · 링크 미리보기 대응)
- 📧 **Contact 폼** — EmailJS 통합
- 🤖 **SEO 최적화** — 페이지별 canonical, JSON-LD 구조화 데이터, Open Graph, robots.txt, sitemap.xml
- 📊 **Cloudflare Web Analytics** — 쿠키 없는 이용 통계 (Cloudflare 가 엣지에서 자동 삽입, 동의 배너 없음)
- 🚀 **최적화된 번들** — Tailwind CLI 프로덕션 빌드(CDN 미사용)
- ⌨️ **드롭다운 접근성** — 키보드 화살표 이동 + focus-within 오픈 + aria-expanded 동기화

## 📁 프로젝트 구조

```
jhbrunokim.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml                # Cloudflare Workers 자동 배포 (Node 22)
├── src/
│   └── worker.js                     # Worker: POST /api/contact (Turnstile 검증 → EmailJS 발송), 나머지는 정적 자산
├── assets/
│   ├── css/
│   │   ├── styles.css                # Tailwind directives + 커스텀 스타일
│   │   └── output.css                # 빌드된 CSS (커밋 안 함; CI에서 재빌드)
│   ├── fonts/                        # 자체 호스팅 웹 글꼴 (woff2 + base/ko/zh/ja/watermark.css; scripts/fetch-fonts.mjs 가 생성)
│   └── js/
│       ├── layout.js                 # navbar/footer/모달 로드, 스크롤·드롭다운·active-state
│       ├── theme.js                  # OS 테마 감지 (<head>에서 blocking 로드)
│       ├── i18n.js                   # 다국어 전환 + <html lang> 동기화
│       ├── country-detector.js       # 첫 방문 언어 적용 + 언어 선택 모달
│       ├── contact.js                # 문의 폼: Turnstile 위젯 렌더 + /api/contact 호출
│       └── articles.js               # 아티클 목록·프리뷰 렌더 (본문 페이지는 정적)
├── components/
│   ├── navbar.html                   # 상단 네비게이션 (동적 로드)
│   ├── footer.html                   # 푸터 (동적 로드)
│   └── country-modal.html            # 언어 선택 모달
├── data/
│   └── translations.json             # ko / en / zh / ja 번역
├── articles/
│   ├── index.json                    # 아티클 메타 목록 (slug/title/date/description/…)
│   ├── *.md                          # 아티클 본문 (마크다운; ko 는 <slug>.md, 번역은 <slug>.<lang>.md)
│   └── *.html                        # 빌드 산출물 (커밋 안 함; npm run build 가 생성)
├── en/ zh/ ja/                       # 빌드 산출물: 언어별 페이지 + articles/ (커밋 안 함)
├── templates/
│   └── article.html                  # 아티클 페이지 템플릿
├── scripts/
│   ├── lib/site.mjs                  # 빌드 공용 상수 (페이지 목록, 언어, 링크 접두사 규칙)
│   ├── build-pages.mjs               # 루트 페이지 → en/ zh/ ja/ (data-i18n 치환)
│   ├── build-articles.mjs            # 마크다운 → articles/*.html, <lang>/articles/*.html
│   ├── build-sitemap.mjs             # sitemap.xml 생성 (커밋 안 함)
│   ├── fetch-fonts.mjs               # Google Fonts → assets/fonts/ 다운로드 (수동 실행, 빌드 미포함)
│   └── csp-hashes.mjs                # CSP 인라인 스크립트 해시 관리
├── resource/
│   ├── gmmaritime.ico                # 파비콘
│   ├── gmmaritime-logo.jpg           # 로고
│   ├── images/                       # 히어로·콘텐츠 이미지
│   └── logos/                        # 선급·기관 로고
├── index.html                        # 랜딩 (원페이지)
├── system-integration.html           # Competitiveness ▸ System Integration
├── maritime-cybersecurity.html       # Competitiveness ▸ Maritime Cybersecurity
├── compliance.html                   # Competitiveness ▸ Compliance
├── ai-cybersecurity-consulting.html  # Competitiveness ▸ AI × Cybersecurity Consulting
├── articles.html                     # 아티클 목록
├── privacy-policy.html               # 개인정보 처리방침
├── 404.html                          # 사용자 정의 404
├── robots.txt
├── sitemap.xml
├── wrangler.jsonc                    # Cloudflare Workers 설정 (정적 자산 + Worker + 공개 vars)
├── .dev.vars.example                 # 로컬 Worker 비밀값 예시 (.dev.vars 로 복사)
├── .assetsignore                     # Workers 에 올리지 않을 파일 목록
├── _headers                          # 응답 보안 헤더
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ 로컬 개발

### 1. 의존성 설치

```bash
npm install
```

### 2. CSS 빌드

**Watch 모드 (개발):**
```bash
npm run dev
```

**프로덕션 빌드:**
```bash
npm run build
```

### 3. 로컬 서버

정적 사이트지만 컴포넌트/번역 fetch를 위해 HTTP 서버가 필요합니다.

```bash
cp .dev.vars.example .dev.vars   # 최초 1회. Turnstile 테스트 키 + 가짜 메일 엔드포인트
npx wrangler dev
```

브라우저에서 `http://localhost:8787` 접속. 운영과 같은 라우팅 · 헤더 · 404 처리 · `/api/contact` 로 동작합니다.
`.dev.vars` 기본값은 Cloudflare 의 Turnstile 테스트 키(항상 통과)를 쓰고, 메일은 `127.0.0.1:8790` 의
가짜 엔드포인트로 보내므로 실제 메일이 나가지 않습니다 (엔드포인트가 없으면 폼은 502 로 실패 메시지를 보여 줍니다).
단순 정적 서버가 필요하면 `python3 -m http.server 8080` 도 되지만 문의 폼은 동작하지 않습니다.

## 🚀 배포

`main` 브랜치에 push하면 GitHub Actions가 Cloudflare Workers 에 자동 배포합니다:

```bash
git push origin main
```

`.github/workflows/deploy.yml`이 다음을 수행:
1. `actions/checkout@v7`
2. `actions/setup-node@v6` (Node 22 LTS)
3. `npm ci`
4. `npm run build` (Tailwind CSS 빌드 → 언어별 페이지 → 아티클 페이지 → sitemap.xml)
5. `cloudflare/wrangler-action@v4` → `wrangler deploy` (정적 자산 업로드)

필요한 GitHub Secrets (Settings → Secrets and variables → Actions):
- `CLOUDFLARE_API_TOKEN` — "Edit Cloudflare Workers" 템플릿으로 만든 API 토큰
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare 대시보드 Workers & Pages 우측의 Account ID
- `TURNSTILE_SECRET_KEY` — Turnstile 위젯의 비밀 키 (배포 때 `--secrets-file` 로 Worker secret 에 함께 올라감)
- `EMAILJS_PRIVATE_KEY` — EmailJS 계정의 Private Key (배포 때 `--secrets-file` 로 Worker secret 에 함께 올라감)

배포 상태는 [Actions 탭](https://github.com/jhbrunokim/jhbrunokim.github.io/actions)에서 확인.
도메인 연결은 `wrangler.jsonc` 의 `routes` 주석을 참고.

### Content-Security-Policy

`_headers` 의 CSP 는 `'unsafe-inline'` 없이 스크립트 출처를 잠급니다. 루트 `*.html` 의 인라인 `<script>` 는
sha256 해시로만 허용되므로, 인라인 스크립트를 고치면 반드시 아래를 실행해 `_headers` 를 갱신하십시오.
CI 는 `npm run check:csp` 로 검사하고, 어긋나면 배포가 실패합니다.

```bash
npm run csp:update   # 인라인 <script> 해시를 _headers 에 다시 씀
npm run check:csp    # 일치 여부 확인 (CI 와 동일)
```

규칙: 인라인 `onclick=` 같은 이벤트 핸들러 속성과 `javascript:` URL 은 쓰지 마십시오 (해시로 허용할 수 없고 `check:csp` 가 잡아냅니다).
외부 스크립트 · 스타일 · 폰트 · 이미지 · fetch 출처를 새로 추가하면 `_headers` 의 해당 directive 에 호스트를 더해야 합니다.

## 🔧 기술 스택

- **CSS**: Tailwind CSS 3.4+ (CLI 빌드, CDN 미사용)
- **JS**: Vanilla ES6+ (프레임워크 없음)
- **폰트**: 자체 호스팅(`assets/fonts/`) — Space Grotesk(디스플레이), Inter, Noto Sans KR / SC / JP. Google Fonts 서버에는 요청하지 않습니다
- **아이콘**: Lucide Icons 1.53.0 (jsDelivr CDN, 버전 고정)
- **마크다운**: marked 15.0.12 (빌드 시 Node 에서 렌더; 브라우저에는 로드하지 않음)
- **문의 폼**: Cloudflare Turnstile + Worker(`src/worker.js`) → EmailJS REST API
- **배포**: Cloudflare Workers (Static Assets) + GitHub Actions

## ⚙️ 문의 폼 (Turnstile + EmailJS)

브라우저는 `POST /api/contact` 만 호출하고, `src/worker.js` 가 Turnstile 토큰을 검증한 뒤 EmailJS REST API 로 메일을 보냅니다.
EmailJS 비공개 키와 Turnstile 비밀 키는 Worker secret 에만 있고 브라우저에 노출되지 않습니다.

**Turnstile**
1. Cloudflare 대시보드 → Turnstile → Add widget. 호스트명 `gmmaritime.com` (로컬 테스트용으로 `localhost` 도 추가 가능), 모드 Managed
2. Site Key → `assets/js/contact.js` 의 `TURNSTILE_SITE_KEY`
3. Secret Key → GitHub Secret `TURNSTILE_SECRET_KEY`
4. 위젯 action 은 `contact` 로 고정되어 있으며 Worker 가 action 과 hostname(`wrangler.jsonc` 의 `TURNSTILE_HOSTNAMES`)을 검증합니다

**EmailJS**
1. [EmailJS](https://www.emailjs.com/) 계정 → Account → API Keys 의 Private Key → GitHub Secret `EMAILJS_PRIVATE_KEY`
2. Account → Security 에서 "Allow EmailJS API for non-browser applications" 를 켭니다 (Worker 는 브라우저가 아닙니다)
3. Public Key · Service ID · Template ID 는 `wrangler.jsonc` 의 `vars` 에 있습니다

## 🎨 커스터마이징

### 색상 · 폰트 · 애니메이션

`tailwind.config.js`의 `theme.extend`에서 수정.

웹 글꼴은 `assets/fonts/` 에 자체 호스팅합니다 (`base.css` = Inter · Space Grotesk, `ko.css` · `zh.css` · `ja.css` = 언어별 Noto Sans, `watermark.css` = 홈 워터마크 전용 서체). 각 페이지 `<head>` 는 `base.css` 와 `ko.css` 를 링크하고, 빌드 스크립트가 언어 페이지에서 `ko.css` 를 해당 언어 시트로 바꿉니다(영어는 `base.css` 만). 글꼴 종류나 굵기를 바꾸려면 `scripts/fetch-fonts.mjs` 의 `SHEETS` 를 고친 뒤 아래를 실행하고 결과(woff2 + CSS)를 커밋합니다. `npm run build` 에는 포함되지 않습니다.

```bash
node scripts/fetch-fonts.mjs   # Google Fonts 에서 woff2 + unicode-range 서브셋을 받아 assets/fonts/ 를 다시 만듦
```

### 다국어 텍스트

`data/translations.json`을 수정합니다. 4개 로케일 (`ko` / `en` / `zh` / `ja`) 모두 동일 구조를 유지해야 합니다.

**일본어 표기 팁**: 웹에서 자연스러운 줄바꿈을 위해 의미 단위 띄어쓰기를 추가한 상태입니다.
```json
"service1Title": "船舶OT セキュリティ アーキテクチャ"
```

### 새 섹션 추가

1. `index.html`에 HTML 추가 (`id`를 지정하면 네비 active-state에 자동 반영 가능)
2. 텍스트는 `data-i18n="section.key"` 로 연결
3. `translations.json` 4개 언어에 키 추가
4. 다크모드 스타일은 `dark:` 접두사 사용
5. 필요 시 `assets/js/layout.js`의 `initActiveState()` 섹션 배열에 새 id 추가

### 새 아티클 추가

1. `articles/<slug>.md` (한국어 원문) 과 번역본 `articles/<slug>.en.md` · `.zh.md` · `.ja.md` 작성. 첫 줄의 `# 제목` 은 히어로가 대신 보여 주므로 본문에서는 빠집니다
2. `articles/index.json`에 메타(`slug`, `title`, `date`, `description`, `category`, `author`; 각 4개 언어) 추가
3. `npm run build` 로 `articles/<slug>.html` (ko) 과 `en/articles/<slug>.html` 등이 만들어지는지 확인. 서로 `hreflang` 으로 연결되며 sitemap 에도 자동으로 들어갑니다

옛 주소 `article.html?slug=xxx` 는 Worker 가 새 주소로 301 리다이렉트합니다.

## 🌙 다크 모드

Tailwind `dark:` 클래스를 사용하며, 다음 규칙으로 자동 적용됩니다:

- 사용자 OS의 `prefers-color-scheme`를 감지
- OS 다크 모드 → `<html class="dark">` 자동 부착
- OS가 실시간으로 라이트/다크 전환되면 즉시 반영
- **수동 토글이나 localStorage 사용 안 함** — 사이트 어디서든 OS 설정과 일치

FOUC 방지를 위해 `theme.js`는 각 페이지의 `<head>`에서 blocking 로드됩니다.

## 🌐 다국어

### 언어 결정 방식

URL 이 언어입니다. 각 페이지는 `<html data-page-lang>` 의 언어로 렌더링되고, 내비 · 푸터 같은 공용 컴포넌트는 `layout.js` 가 같은 언어로 맞춥니다(링크에 `en/` 접두사 포함).

`<head>` 의 인라인 부트스트랩 스크립트가 `localStorage.preferredLanguage`(없으면 브라우저 언어)와 페이지 언어를 비교해, 다르면 `hreflang` 대체 페이지로 `location.replace` 합니다. 크롤러(UA 에 bot · crawl · spider 등)는 리다이렉트하지 않아 모든 언어 페이지가 색인됩니다. 선호 언어는 방문자가 지구본에서 직접 고를 때만 저장됩니다. 외부 서비스 호출이나 IP 기반 위치 조회는 하지 않고, 모달도 자동으로 띄우지 않습니다.

새 루트 페이지를 추가할 때는 `scripts/lib/site.mjs` 의 `PAGES` 에 넣고, `<html lang="ko" data-page-lang="ko">` 와 `hreflang` 대체 링크, `translations.json` 의 `pageMeta.<page>` (title · description, 4개 언어) 를 함께 추가하십시오. 인라인 부트스트랩 스크립트는 다른 페이지에서 그대로 복사해야 CSP 해시가 하나로 유지됩니다.

- `navigator.languages`(없으면 `navigator.language`)를 순서대로 확인해 기본 언어 태그가 `ko` / `zh` / `ja`인 첫 항목을 사용 (예: `ko-KR` → 한국어, `zh-TW` → 중국어)
- 일치하는 항목이 없으면 영어

이 규칙은 `assets/js/i18n.js`의 `detectBrowserLanguage()` 한 곳에 정의되어 `I18nManager`와 `country-detector.js`가 함께 사용합니다. 각 페이지 `<head>`의 인라인 부트스트랩 스크립트는 스크립트 파일보다 먼저 실행되므로 같은 규칙의 짧은 사본을 갖고 있습니다. 페이지 언어의 Noto CJK 글꼴은 `<head>` 의 정적 `<link>`(`assets/fonts/<lang>.css`)가 불러오므로 스크립트가 글꼴을 다루지는 않습니다.

적용된 언어는 `localStorage.preferredLanguage`에 저장되어 재방문 시 유지되며, `<html lang>` 속성도 로케일에 맞춰 갱신됩니다. 언어 변경은 네비게이션의 지구본 버튼(모바일 메뉴의 "언어 변경")에서 여는 언어 선택 모달로 합니다. 모달은 Esc 키, 배경 클릭, 닫기 버튼으로 닫힙니다.

### 새 언어 추가

1. `data/translations.json`에 새 로케일 최상위 키 추가 (기존 구조 미러링)
2. `assets/js/i18n.js`의 `detectBrowserLanguage()` · `ensureFontForLocale()`와 각 페이지 `<head>` 인라인 부트스트랩 스크립트의 지원 언어 목록 확장 (CJK 글꼴이 필요하면 `scripts/fetch-fonts.mjs` 의 `SHEETS` 에 시트를 추가하고 `scripts/build-pages.mjs` · `build-articles.mjs` 가 그 시트를 링크하도록 확장)
3. `assets/js/country-detector.js`의 `SUPPORTED_LANGUAGES`와 `components/country-modal.html`의 언어 옵션(해당 언어의 자국어 표기, `value` = 언어 코드) 추가
4. 모든 텍스트 번역

## 🧭 네비게이션 동작

- **인덱스 페이지**: IntersectionObserver가 현재 뷰포트에 걸린 섹션을 감지 → 네비바의 해당 링크 아래 언더바 인디케이터 표시
- **서브 페이지**: URL의 파일명으로 현재 페이지 링크 자동 하이라이트, 히어로 위에 "← Overview로 돌아가기" 링크 자동 노출
- **Competitiveness 드롭다운**: hover / focus-within으로 열림, 키보드 ArrowUp/Down으로 메뉴 이동, Escape로 닫기
- **스크롤**: `scroll-behavior: smooth` + `scroll-padding-top: 5rem` (fixed nav 높이 보정)

## 📱 브라우저 지원

- Chrome / Firefox / Safari / Edge — 각 최신 2개 버전

## 📄 라이선스

© 2025 Gwangmyung Maritime. All rights reserved.

## 📞 문의

- **이메일**: info@gmmaritime.com
- **주소**: 전라북도 군산시 상신6길 12
- **사업자 등록번호**: 391-81-02164
