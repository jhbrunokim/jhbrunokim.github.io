# 광명마리타임 (Gwangmyung Maritime)

선박 OT 및 사이버 보안 전문 기업 웹사이트

🌐 **Live Site**: [https://gmmaritime.com](https://gmmaritime.com)

## ✨ 기능

- 🎨 **반응형 디자인** - 모바일, 태블릿, 데스크톱 지원
- 🌙 **다크 모드** - 라이트/다크 테마 자동 저장
- 🌐 **다국어 지원** - 4개 언어 (한국어, 영어, 중국어, 일본어)
- 🗺️ **자동 국가 감지** - IP 기반 국가/언어 자동 선택 모달
- 📧 **Contact 폼** - EmailJS 통합
- 🚀 **최적화된 성능** - Tailwind CSS 빌드 최적화
- 🤖 **SEO 최적화** - robots.txt, sitemap.xml, meta tags
- 🔤 **웹 폰트 최적화** - Google Fonts (Inter, Noto Sans 시리즈)

## 📁 프로젝트 구조

```
jhbrunokim.github.io/
├── .github/
│   └── workflows/
│       └── static.yml              # GitHub Actions 자동 배포
├── assets/
│   ├── css/
│   │   ├── styles.css              # 소스 CSS (Tailwind directives)
│   │   └── output.css              # 빌드된 CSS (git ignored)
│   ├── js/
│   │   ├── main.js                 # 네비게이션, 탭 로직
│   │   ├── theme.js                # 다크모드 토글
│   │   ├── i18n.js                 # 다국어 처리
│   │   ├── contact.js              # EmailJS 폼 핸들러
│   │   └── country-detector.js     # 국가 감지 및 언어 선택
│   └── images/
│       ├── logo.svg                # SVG 로고
│       └── favicon.ico             # 파비콘
├── data/
│   └── translations.json           # 4개 언어 콘텐츠 (ko/en/zh/ja)
├── resource/
│   └── gmmaritime.ico              # 기존 로고
├── index.html                      # 메인 HTML
├── robots.txt                      # SEO 크롤러 설정
├── sitemap.xml                     # 사이트맵
├── package.json                    # npm 설정
├── tailwind.config.js              # Tailwind 설정 (폰트 포함)
├── .gitignore                      # Git ignore 설정
├── CNAME                           # 커스텀 도메인
└── README.md                       # 이 파일
```

## 🛠️ 로컬 개발

### 1. 의존성 설치

```bash
npm install
```

### 2. CSS 빌드

**개발 모드 (watch mode):**
```bash
npm run dev
```

**프로덕션 빌드:**
```bash
npm run build
```

### 3. 로컬에서 확인

**방법 1: VS Code Live Server**
- VS Code에서 `index.html` 우클릭
- "Open with Live Server" 선택

**방법 2: Python 간이 서버**
```bash
python -m http.server 8000
```
그 후 브라우저에서 `http://localhost:8000` 접속

**방법 3: Node.js 간이 서버**
```bash
npx http-server -p 8000
```

## 🚀 배포

### 자동 배포 (GitHub Actions)

main 브랜치에 push하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update content"
git push origin main
```

**GitHub Actions가 자동으로:**
1. 코드 체크아웃
2. Node.js 20 설치
3. `npm ci` 실행 (의존성 설치)
4. `npm run build` 실행 (Tailwind CSS 빌드)
5. GitHub Pages 배포

배포 상태는 [Actions 탭](https://github.com/jhbrunokim/jhbrunokim.github.io/actions)에서 확인할 수 있습니다.

## 🔧 기술 스택

- **프레임워크**: Tailwind CSS 3.4+
- **빌드 도구**: Tailwind CLI
- **폰트**: Google Fonts (Inter, Noto Sans KR, Noto Sans SC, Noto Sans JP)
- **아이콘**: Lucide Icons
- **이메일**: EmailJS
- **배포**: GitHub Pages + GitHub Actions
- **국가 감지**: GeoJS API

## ⚙️ EmailJS 설정

Contact 폼을 사용하려면 EmailJS 설정이 필요합니다:

1. [EmailJS](https://www.emailjs.com/) 계정 생성 (무료)
2. 이메일 서비스 연동 (Gmail, Outlook 등)
3. 이메일 템플릿 생성
4. `index.html` 파일에서 다음 부분 수정:

```javascript
// Line 53
emailjs.init("YOUR_PUBLIC_KEY"); // 실제 Public Key로 교체
```

5. `assets/js/contact.js` 파일 확인 및 수정 (이미 설정되어 있음)

## 🎨 커스터마이징

### 색상 변경

`tailwind.config.js`에서 테마 색상을 변경할 수 있습니다.

### 콘텐츠 수정

#### 다국어 텍스트 수정
`data/translations.json` 파일을 수정하세요. 현재 지원 언어:
- `ko`: 한국어
- `en`: 영어
- `zh`: 중국어 (간체)
- `ja`: 일본어

**일본어 텍스트 작성 시 주의사항:**
일본어는 원래 띄어쓰기가 없지만, 웹에서 자연스러운 줄바꿈을 위해 의미 단위로 띄어쓰기를 추가했습니다.
```json
"service1Title": "船舶OT セキュリティ アーキテクチャ"
```

#### 새로운 섹션 추가
1. `index.html`에 HTML 추가
2. `data-i18n` 속성으로 텍스트 연결
3. `translations.json`에 4개 언어 번역 추가
4. 다크모드용 `dark:` 클래스 추가

## 🌙 다크 모드

다크 모드는 Tailwind의 `dark:` 클래스를 사용합니다:

```html
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  Content
</div>
```

사용자 설정은 localStorage에 저장되어 페이지 재방문 시 유지됩니다.

## 🌐 다국어 지원

### 자동 국가/언어 감지

첫 방문 시 [GeoJS API](https://get.geojs.io/)를 통해 사용자의 국가를 자동 감지하고 해당 언어를 제안합니다:
- 🇰🇷 한국 → 한국어
- 🇨🇳 중국 → 중국어
- 🇯🇵 일본 → 일본어
- 🇺🇸 미국 및 기타 → 영어

선택한 언어는 `localStorage`에 저장되어 재방문 시 유지됩니다.

### 새로운 언어 추가

1. `data/translations.json`에 새 언어 섹션 추가
2. `assets/js/country-detector.js`의 `countryToLanguage` 매핑에 국가 코드 추가
3. `index.html`의 국가 선택 드롭다운에 옵션 추가
4. 모든 텍스트를 번역

## 📱 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

## 📄 라이선스

© 2025 Gwangmyung Maritime. All rights reserved.

## 📞 문의

- **이메일**: info@gmmaritime.com
- **주소**: 전라북도 군산시 상신6길 12
- **사업자 등록번호**: 391-81-02164
