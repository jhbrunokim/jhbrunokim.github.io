# 광명마리타임 (Gwangmyung Maritime)

선박 OT 및 사이버 보안 전문 기업 웹사이트

🌐 **Live Site**: [https://gmmaritime.com](https://gmmaritime.com)

## ✨ 기능

- 🎨 **반응형 디자인** - 모바일, 태블릿, 데스크톱 지원
- 🌙 **다크 모드** - 라이트/다크 테마 자동 저장
- 🌐 **다국어 지원** - 한국어/영어 전환
- 📧 **Contact 폼** - EmailJS 통합
- 🚀 **최적화된 성능** - Tailwind CSS 빌드 최적화
- 🤖 **SEO 최적화** - robots.txt, sitemap.xml, meta tags

## 📁 프로젝트 구조

```
jhbrunokim.github.io/
├── .github/
│   └── workflows/
│       └── static.yml           # GitHub Actions 자동 배포
├── assets/
│   ├── css/
│   │   ├── styles.css           # 소스 CSS (Tailwind directives)
│   │   └── output.css           # 빌드된 CSS (git ignored)
│   ├── js/
│   │   ├── main.js              # 네비게이션, 탭 로직
│   │   ├── theme.js             # 다크모드 토글
│   │   ├── i18n.js              # 다국어 처리
│   │   └── contact.js           # EmailJS 폼 핸들러
│   └── images/
│       ├── logo.svg             # SVG 로고
│       └── favicon.ico          # 파비콘
├── data/
│   └── translations.json        # 한/영 콘텐츠
├── resource/
│   └── gmmaritime.ico           # 기존 로고
├── index.html                   # 메인 HTML
├── robots.txt                   # SEO 크롤러 설정
├── sitemap.xml                  # 사이트맵
├── package.json                 # npm 설정
├── tailwind.config.js           # Tailwind 설정
├── .gitignore                   # Git ignore 설정
├── CNAME                        # 커스텀 도메인
└── README.md                    # 이 파일
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

## ⚙️ EmailJS 설정

Contact 폼을 사용하려면 EmailJS 설정이 필요합니다:

1. [EmailJS](https://www.emailjs.com/) 계정 생성 (무료)
2. 이메일 서비스 연동 (Gmail, Outlook 등)
3. 이메일 템플릿 생성
4. `index.html` 파일에서 다음 부분 수정:

```javascript
// Line 49
emailjs.init("YOUR_PUBLIC_KEY"); // 실제 Public Key로 교체
```

5. `assets/js/contact.js` 파일에서 다음 부분 수정:

```javascript
// Line 48-50
const serviceID = 'YOUR_SERVICE_ID';     // 실제 Service ID로 교체
const templateID = 'YOUR_TEMPLATE_ID';   // 실제 Template ID로 교체
const publicKey = 'YOUR_PUBLIC_KEY';     // 실제 Public Key로 교체
```

## 🎨 커스터마이징

### 색상 변경

`tailwind.config.js`에서 테마 색상을 변경할 수 있습니다.

### 콘텐츠 수정

#### 한국어/영어 텍스트 수정
`data/translations.json` 파일을 수정하세요.

#### 새로운 섹션 추가
1. `index.html`에 HTML 추가
2. `data-i18n` 속성으로 텍스트 연결
3. `translations.json`에 번역 추가
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

새로운 언어를 추가하려면:

1. `data/translations.json`에 새 언어 섹션 추가
2. `assets/js/i18n.js`에서 언어 옵션 추가
3. 모든 텍스트를 번역

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
