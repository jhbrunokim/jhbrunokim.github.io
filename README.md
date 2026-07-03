# 광명마리타임 (Gwangmyung Maritime)

조선 · 해양 산업의 플랫폼 개발, 시스템 통합, IACS UR E26 / E27 컴플라이언스 대응을 소개하는 기업 웹사이트.

🌐 **Live Site**: [https://gmmaritime.com](https://gmmaritime.com)

## ✨ 기능

- 🎨 **반응형 디자인** — 모바일 / 태블릿 / 데스크톱
- 🌙 **OS 테마 자동 반영** — `prefers-color-scheme`을 그대로 따르고 OS 다크/라이트 전환 시 실시간 반영 (수동 토글 없음)
- 🌐 **4개 언어 i18n** — 한국어 / 영어 / 중국어(간체) / 일본어, `<html lang>`은 로케일에 맞춰 자동 갱신
- 🗺️ **자동 국가 감지** — GeoJS API로 IP 기반 국가·언어 추천 모달
- 🧭 **스크롤 연동 네비게이션** — IntersectionObserver로 현재 섹션에 active-state 인디케이터, 서브페이지에서는 현재 페이지 하이라이트 + "← Overview" 링크
- 🗂️ **Competitiveness / Articles 프리뷰 섹션** — 인덱스에서 하위 페이지로 이어지는 진입점
- 📝 **아티클 시스템** — `articles/*.md` 마크다운 + `index.json`으로 목록·본문 자동 렌더 (marked.js)
- 📧 **Contact 폼** — EmailJS 통합
- 🤖 **SEO 최적화** — 페이지별 canonical, JSON-LD 구조화 데이터, Open Graph, robots.txt, sitemap.xml
- 📊 **Google Analytics** — 모든 페이지에서 트래킹
- 🚀 **최적화된 번들** — Tailwind CLI 프로덕션 빌드(CDN 미사용)
- ⌨️ **드롭다운 접근성** — 키보드 화살표 이동 + focus-within 오픈 + aria-expanded 동기화

## 📁 프로젝트 구조

```
jhbrunokim.github.io/
├── .github/
│   └── workflows/
│       └── static.yml                # GitHub Pages 자동 배포 (Node 22)
├── assets/
│   ├── css/
│   │   ├── styles.css                # Tailwind directives + 커스텀 스타일
│   │   └── output.css                # 빌드된 CSS (커밋 안 함; CI에서 재빌드)
│   └── js/
│       ├── layout.js                 # navbar/footer/모달 로드, 스크롤·드롭다운·active-state
│       ├── theme.js                  # OS 테마 감지 (<head>에서 blocking 로드)
│       ├── i18n.js                   # 다국어 전환 + <html lang> 동기화
│       ├── country-detector.js       # 국가 감지 + 언어 모달
│       ├── contact.js                # EmailJS 핸들러
│       └── articles.js               # 마크다운 아티클 목록·본문·프리뷰 렌더
├── components/
│   ├── navbar.html                   # 상단 네비게이션 (동적 로드)
│   ├── footer.html                   # 푸터 (동적 로드)
│   └── country-modal.html            # 국가·언어 선택 모달
├── data/
│   └── translations.json             # ko / en / zh / ja 번역
├── articles/
│   ├── index.json                    # 아티클 메타 목록 (slug/title/date/description/…)
│   └── *.md                          # 아티클 본문 (마크다운)
├── resource/
│   ├── gmmaritime.ico                # 파비콘
│   ├── gmmaritime-logo.jpg           # 로고
│   ├── images/                       # 히어로·콘텐츠 이미지
│   └── logos/                        # 선급·기관 로고
├── index.html                        # 랜딩 (원페이지)
├── system-integration.html           # Competitiveness ▸ System Integration
├── maritime-cybersecurity.html       # Competitiveness ▸ Maritime Cybersecurity
├── compliance.html                   # Competitiveness ▸ Compliance
├── articles.html                     # 아티클 목록
├── article.html                      # 아티클 본문 뷰어 (hash로 slug 지정)
├── privacy-policy.html               # 개인정보 처리방침
├── 404.html                          # 사용자 정의 404
├── robots.txt
├── sitemap.xml
├── CNAME                             # 커스텀 도메인
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
python3 -m http.server 8080
# 또는
npx http-server -p 8080
```

브라우저에서 `http://localhost:8080` 접속.

## 🚀 배포

`main` 브랜치에 push하면 GitHub Actions가 자동 배포합니다:

```bash
git push origin main
```

`.github/workflows/static.yml`이 다음을 수행:
1. `actions/checkout@v7`
2. `actions/setup-node@v6` (Node 22 LTS)
3. `npm ci`
4. `npm run build` (Tailwind CSS 빌드)
5. `actions/configure-pages@v6` → `actions/upload-pages-artifact@v5` → `actions/deploy-pages@v5`

배포 상태는 [Actions 탭](https://github.com/jhbrunokim/jhbrunokim.github.io/actions)에서 확인.

## 🔧 기술 스택

- **CSS**: Tailwind CSS 3.4+ (CLI 빌드, CDN 미사용)
- **JS**: Vanilla ES6+ (프레임워크 없음)
- **폰트**: Google Fonts — Inter, Noto Sans KR / SC / JP
- **아이콘**: Lucide Icons (CDN)
- **마크다운**: marked.js (아티클 뷰어)
- **이메일**: EmailJS
- **국가 감지**: GeoJS API
- **배포**: GitHub Pages + Actions

## ⚙️ EmailJS 설정

Contact 폼에 사용됩니다.

1. [EmailJS](https://www.emailjs.com/) 계정 생성
2. 이메일 서비스 연동 + 템플릿 생성
3. `index.html`의 `emailjs.init(...)` 호출부(약 124번째 줄)의 public key 교체
4. `assets/js/contact.js`의 service ID / template ID도 함께 확인

## 🎨 커스터마이징

### 색상 · 폰트 · 애니메이션

`tailwind.config.js`의 `theme.extend`에서 수정.

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

1. `articles/<slug>.md` 마크다운 파일 생성
2. `articles/index.json`에 메타(`slug`, `title`, `date`, `description`, `category`, `author`) 추가
3. `article.html?slug=xxx` 또는 `article.html#xxx`로 접근

## 🌙 다크 모드

Tailwind `dark:` 클래스를 사용하며, 다음 규칙으로 자동 적용됩니다:

- 사용자 OS의 `prefers-color-scheme`를 감지
- OS 다크 모드 → `<html class="dark">` 자동 부착
- OS가 실시간으로 라이트/다크 전환되면 즉시 반영
- **수동 토글이나 localStorage 사용 안 함** — 사이트 어디서든 OS 설정과 일치

FOUC 방지를 위해 `theme.js`는 각 페이지의 `<head>`에서 blocking 로드됩니다.

## 🌐 다국어

### 자동 국가·언어 감지

첫 방문 시 [GeoJS API](https://get.geojs.io/)로 국가를 감지하고 언어 모달을 표시합니다:
- 🇰🇷 KR → 한국어
- 🇨🇳 CN → 중국어
- 🇯🇵 JP → 일본어
- 🇺🇸 US · 기타 → 영어

선택한 언어는 `localStorage.preferredLanguage`에 저장되어 재방문 시 유지됩니다. `<html lang>` 속성도 로케일에 맞춰 갱신됩니다.

### 새 언어 추가

1. `data/translations.json`에 새 로케일 최상위 키 추가 (기존 구조 미러링)
2. `assets/js/country-detector.js`의 `countryToLanguage` 매핑 확장
3. `components/country-modal.html`의 국가 옵션 확인
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
