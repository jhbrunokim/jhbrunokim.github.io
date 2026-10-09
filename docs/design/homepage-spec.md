# Homepage structure and component spec — gmmaritime.com

> Stage 2 Task 4 · 2026-10-09 · Audience: the Task 5 implementer and the finish-gate reviewer.
> Inputs: `docs/brand/positioning.md` ("positioning"), `docs/brand/homepage-copy.md` ("copy deck", section numbers like *CD 2.2*), `docs/research/persona-walkthrough-2026-10-09.md` ("persona report").
> Baseline code: the `fix/site-audit-stage1` versions of `index.html`, `components/*.html`, `assets/js/*.js`, `assets/css/styles.css` (this branch is rebased onto it before Task 5).
> Rule: every copy-deck string has a slot below, and every slot names its key. The only strings not in the copy deck are the five hero-diagram keys in §3.4 (supplied here, four locales) and the existing `footer.businessNumberLabel` reused in Contact.

---

## Stage 4 revision (2026-10-10) — read this first

The owner chose a separate About page. Where this section and anything below disagree (including the Stage 3 revision), this section wins.

- **`about.html` (new)**: dark `bg-ocean-900` band `#overview` (`<h1>` 회사 소개, the broad definition sentence, a facts list: 회사명, 출범 2025년, 소재지, 사업자등록번호, 이메일), then light sections `#values` (핵심 가치: 신뢰 · 실행 · 책임 · 협력, Korean word first, English word on a secondary line, two-column ruled list, no icon tiles), `#journey` (the timeline moved verbatim from the homepage; the page's one centred head), `#scope` (대응 가능한 선급 · 참조 표준: the class-society marquee, no-affiliation note, standards chips and guidance-body line, same markup and keys as `services.html#why`), `#location` (오시는 길 · 연락처: address, email, "지도에서 보기" link, and the page's only `signal` element, the 문의하기 button that opens the contact modal). Keys: `about.overview.*`, `about.facts.*`, `about.values.*`, `about.scope.title`, `about.location.*`; the timeline keeps `expertise.timeline*` and `home.journey.goalLabel`.
- **`index.html`**: `home` → `business` → `insights` → `contact` (+ the mobile mid-page CTA in `business`). The 걸어온 길 section and the `#about` alias are gone; `#business` turns white so the bands still alternate. Business-row link labels: 문의하기 (`#contact`), 서비스 보기 (`services.html`), AI 컨설팅 보기 (`ai-cybersecurity-consulting.html`).
- **Class-society band (later Stage 4 change)**: `index.html` gets a slim `#classes` band (대응 가능한 선급: heading, one-line lede `home.classes.lede`, the logo marquee, abbreviation line, no-affiliation note) between 사업 영역 and 인사이트, in `bg-slate-50` so the bands alternate (`business` white → `classes` slate → `insights` white → `contact` slate). 홈 stays lit over `classes`. `about.html#scope` keeps the scope text (heading, class abbreviations, note, standards chips, guidance bodies) without the marquee; `services.html#why` keeps the full block.
- **Navigation**: 홈 (`index.html`) · 서비스 (`services.html` + four-page dropdown) · 회사 소개 (`about.html`) · 인사이트 (`articles.html`) · 문의 (`index.html#contact`, opens the modal) · language. `initActiveState`: sub-pages light the link matching the filename (`article.html` lights 인사이트; `services.html` and the four service pages light the Services toggle); on the index page 홈 is lit over `home`, `business`, `insights` and 문의 over `contact`. `initHashAnchor` redirects index `#about` / `#journey` → `about.html#journey`, `#articles` → `articles.html`, `#services` / `#why` → `services.html`.
- **Footer**: the bottom row links 회사 소개, 인사이트, 개인정보처리방침. `nav.backToOverview` reads "서비스 개요로 돌아가기".

---

## Stage 3 revision (2026-10-09)

The owner split the page in two. Where this section and the rest of the spec disagree, this section wins.

- **`index.html` (broad homepage)**: `home` → `business` → `journey` → `insights` → `contact`, plus the zero-height aliases `#about` (now directly before `#journey`) and `#articles` (before `#insights`).
  - `home` is the former broad hero from `5d64ea9` (`hero.title`, `hero.description`, `hero.ctaSecondary`, grid background, five-photo collage), without the badge and without `min-h-screen`. The collage shows from 1280 px (`hidden xl:flex`; at 1024 px its three 192 px columns overlapped the headline and description), and the text block carries `xl:min-h-[47rem]` so the section contains the absolutely positioned collage. Collage files: `hero-drydock-hull.jpg`, `hero-bridge-night.jpg`, `hero-tanker-dawn.jpg`, `hero-ship-wake.jpg`, `hero-hull-welding.jpg`; the first two are preloaded at ≥1280 px.
  - `business` (사업 영역, `home.business.*`): left-aligned head, then three ruled rows in the §5 stakeholder-row style (title · body · link): 플랫폼 개발 · 구축 → `#contact`, 해양 사이버 보안 · 컴플라이언스 → `services.html`, 데이터 · AI 기반 운영 → `ai-cybersecurity-consulting.html`. The mobile mid-page CTA (formerly in `#why`) sits after the rows.
  - `journey`, `insights`, `contact` are unchanged.
- **`services.html` (services root)**: the former §3 hero (text + flow diagram, no `#home` id), §4 `#services` cards and §5 `#why` (stakeholder rows, class-society marquee, standards lines; no mid-page CTA), then a closing CTA band (`systemIntegration.ctaTitle` / `ctaDesc`, orange `hero.ctaSecondary` button) and the footer. Keys stay `home.hero.*`, `home.services.*`, `home.why.*`.
- **Navigation**: the Services toggle (desktop) and the Services link (mobile) go to `services.html`; the dropdown keeps the four service pages; About goes to `index.html#journey`. `initActiveState` tracks `home, business, journey, insights, contact`, maps `about` → `journey` and `articles` → `insights`, and lights the Services toggle on `services.html` and the four service pages (`isServicesPage`).
- Home `<title>`: `광명마리타임 | 조선 · 해양 플랫폼 개발, 시스템 통합, 글로벌 규제 대응`; `description` / `og:description` / `twitter:description` / JSON-LD `description` repeat `hero.description` (ko).

---

## 1. Decisions at a glance

| Topic | Decision |
|---|---|
| Section order / ids | `home` → `services` → `why` → `journey` → `insights` → `contact` |
| Hero headline | Option A (CD 1.2), `<br/>` at every width |
| Hero media | **Inline SVG flow diagram**, no photos. All five hero photos and the grid-pattern SVG are removed. |
| Hero badge | Removed (CD 1.1) |
| Centred section heads | **One**: `journey` (its rail is centred from `md`). All others are left-aligned. |
| `signal` orange | Primary action only (hero CTA, mobile mid-page CTA, form submit, modal submit; never two on one screen). The Compliance card's 2 px top rule is `ocean-300`, not `signal` |
| Navbar | Home · Services ▾ (4) · Insights · About · Contact · language |
| About target | `index.html#why`. A zero-height alias `#about` sits directly before `#why`. |
| Agency logos | Removed; replaced by a text list (CD 3.4). IACS logo leaves the class marquee. |
| Timeline | Kept (`.tl-*` + `timeline-reveal.js`); 2026 is a hollow dot, dashed card, "목표" pill; the progress fill stops at 2025 |
| Contact | Inline form keeps Stage 1 markup + optional `company` / `role`; details block beside it; "Trust Execution…" display removed. The same two fields are added to the contact modal. |
| New dependencies / build steps | None. Tailwind CLI v3 + existing tokens only. Lucide icons already loaded. |

---

## 2. Global layout rules (apply to every section)

- Container: `max-w-7xl mx-auto px-6` (16 px gutter is not used; 24 px matches every existing page).
- Section padding: `py-20 md:py-24`. Hero is the exception (§3.2).
- Section backgrounds, light / dark, in order: `home` `bg-ocean-900` / `dark:bg-ocean-950` · `services` `bg-white` / `dark:bg-slate-900` · `why` `bg-slate-50` / `dark:bg-slate-800` · `journey` `bg-white` / `dark:bg-slate-900` · `insights` `bg-slate-50` / `dark:bg-slate-800` · `contact` `bg-white` / `dark:bg-slate-900`.
- **Left-aligned section head** (services, why, insights), taken from `compliance.html`:
  `<div class="grid gap-4 lg:grid-cols-2 lg:gap-16 lg:items-end mb-10 md:mb-12">` → `<h2>` left, lede `<p>` right.
  - `h2`: `font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white`
  - lede: `text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400`
- Heading outline: one `h1` (hero); one `h2` per section; `h3` for cards, stakeholder roles, the three sub-blocks of `why`, timeline entry titles and article cards (already `h3` in `articles.js`). No `h4` on the page.
- Every `data-i18n` element carries the Korean fallback text. Elements whose value contains HTML carry `data-i18n-html="true"` (hero title, contact description).
- Card hover: border or background colour change with `transition-colors`. Never `hover:-translate-y-*`, `hover:shadow-*` lift, or `transition-all` on a card.
- Icons: Lucide, `w-6 h-6`, default stroke width, `text-ocean-700 dark:text-ocean-300` (white on the dark Compliance card). Only the four service cards carry icons; the rest of the page uses none apart from inline arrows (`arrow-right`, `w-4 h-4`) and the existing marquee pause/play icon.

---

## 3. Hero — `<section id="home">`

### 3.1 Message and slots

| Slot | Element | Key |
|---|---|---|
| Headline | `h1`, `data-i18n-html="true"` | `home.hero.title` (CD 1.2 A) |
| Subline | `p` | `home.hero.subtitle` |
| Primary CTA | `a href="#contact"` (opens the Stage 1 contact modal via `layout.js`) | `hero.ctaSecondary` |
| Secondary link | `a href="compliance.html"` | `home.hero.secondaryLink` |
| Diagram caption | `figcaption.sr-only` | `home.hero.flowCaption` (§3.4) |
| Diagram stages 1–4 | visible `span` per stage | `home.hero.flow1` … `flow4` (§3.4) |

### 3.2 Layout

- Section: `relative bg-ocean-900 dark:bg-ocean-950 pt-28 pb-16 md:pt-36 md:pb-24`. **No `min-h-screen`, no background pattern, no photos.**
- Text block: `max-w-4xl`, left-aligned at every width. Stack: `h1` → subline `mt-5 md:mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-300` → CTA row `mt-8 flex flex-wrap items-center gap-x-6 gap-y-4`.
- Primary CTA: the existing button classes unchanged (`rounded-md bg-signal-400 px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-signal-300 transition-colors focus-visible:outline …`) + `arrow-right` icon.
- Secondary link: a text link, not a button — `inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-200 hover:text-white underline-offset-4 hover:underline` + `arrow-right` `w-4 h-4`.
- Diagram `figure`: `mt-12 md:mt-16`, full container width, below the CTA row at every width.

### 3.3 Headline size (Korean must fit on exactly two lines)

Longest line "설계부터 선급 검사까지." ≈ 10.6 em in Noto Sans KR with `tracking-tight`.

| Width | Class | Size | Line 2 width | Available |
|---|---|---|---|---|
| 320 | `text-[clamp(1.5rem,7.6vw,1.875rem)]` | 24.3 px | 258 px | 272 px |
| 375 | (same) | 28.5 px | 302 px | 327 px |
| 640 `sm:` | `sm:text-5xl` | 48 px | 509 px | 592 px |
| 768 / 1024 `md:` | `md:text-6xl` | 60 px | 636 px | 720 / 896 px |
| 1280+ / 1440 `xl:` | `xl:text-7xl` | 72 px | 763 px | 896 px (`max-w-4xl`) |

Full class: `font-display font-bold tracking-tight leading-[1.15] text-white text-[clamp(1.5rem,7.6vw,1.875rem)] sm:text-5xl md:text-6xl xl:text-7xl`. Do not add `text-pretty`/`text-balance`. The `<br/>` is a plain `<br/>` (never `hidden md:block`, CD 1.2). en/zh/ja may wrap to 3–4 lines below `sm`; that is accepted.

**Mobile distance to the primary CTA (375×812):** pt 112 + h1 66 + gap 20 + subline 4 lines ≈ 104 + gap 32 ⇒ CTA top ≈ **334 px**, bottom ≈ 382 px. Budget: the CTA's top edge is **≤ 400 px** from the page top, in Korean, at 375 px.

### 3.4 Hero diagram — four-stage flow (inline SVG + HTML labels)

A horizontal flow "메이커 선정 → 설계 · 검증 → 문서 → 선급 검사", stroke-only, `currentColor`, in the `compliance.html` diagram language (thin 1.5 stroke, ocean tones, no fills). Labels are HTML so they translate and wrap; the SVG draws only nodes, connectors and arrowheads.

```
<figure class="mt-12 md:mt-16" aria-labelledby="hero-flow-caption">
  <figcaption id="hero-flow-caption" class="sr-only" data-i18n="home.hero.flowCaption">…</figcaption>
  <ol class="grid grid-cols-4">
    <li class="flex flex-col gap-3">                          ← stages 1–3
      <div class="flex items-center text-ocean-300" aria-hidden="true">
        <svg class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="8"/></svg>
        <svg class="h-2 flex-1" viewBox="0 0 100 8" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="0" y1="4" x2="100" y2="4" vector-effect="non-scaling-stroke"/></svg>
        <svg class="h-2 w-2 shrink-0 -ml-1 mr-1" viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 1l3 3-3 3"/></svg>
      </div>
      <span class="pr-3 text-sm md:text-base font-semibold leading-snug text-white" data-i18n="home.hero.flowN">…</span>
    </li>
    <li …>                                                    ← stage 4: node only, no connector/arrow;
                                                                 node is text-white and adds <path d="M6 10l3 3 5-6"/> inside the circle
  </ol>
</figure>
```

- Same layout at every width (4 equal columns; at 375 each column is ~82 px and Korean labels wrap at most once).
- No `signal` colour in the diagram. No animation.
- New keys (copy addendum — copywriter to confirm; if rejected, drop the `figure` and ship the hero text-only):

| Key | ko | en | zh | ja |
|---|---|---|---|---|
| `home.hero.flowCaption` | 광명마리타임이 맡는 네 단계: 메이커 선정, 설계 · 검증, 문서, 선급 검사 | The four stages we carry: maker selection, design and verification, documentation, class survey | 光明海事负责的四个阶段：选型、设计与验证、文件、船级检验 | 光明マリタイムが担う4つの段階：メーカー選定、設計・検証、文書、船級検査 |
| `home.hero.flow1` | 메이커 선정 | Maker selection | 选型 | メーカー選定 |
| `home.hero.flow2` | 설계 · 검증 | Design and verification | 设计与验证 | 設計・検証 |
| `home.hero.flow3` | 문서 | Documentation | 文件 | 文書 |
| `home.hero.flow4` | 선급 검사 | Class survey | 船级检验 | 船級検査 |

New-key total becomes 50 (copy deck's 45 + these 5).

### 3.5 `<head>` changes on `index.html`

- Remove both `<link rel="preload" as="image" href="resource/images/hero-*.jpg">`.
- `<title>`: `광명마리타임 | 선박 사이버 보안, 설계부터 선급 검사까지`.
- `meta description`, `og:description`, `twitter:description`, JSON-LD `description`: the positioning 1.4 ko footer sentence ("IACS UR E26 / E27 대응과 IT / OT 시스템 통합을 설계부터 선급 검사까지 맡는 해양 사이버 보안 컨설팅 기업입니다.").

---

## 4. What we do — `<section id="services">`

### 4.1 Slots

| Slot | Key |
|---|---|
| `h2` / lede | `home.services.title` / `home.services.subtitle` |
| Card ×4: `h3` title / tag line / description | `home.services.{compliance,maritimeCyber,systemIntegration,aiConsulting}.{title,tag,desc}` |
| Card link label ×4 | `competitivenessSection.cta` |

### 4.2 Card markup (all four)

```
<a href="compliance.html" class="group flex flex-col rounded-2xl border … transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500">
  <i data-lucide="file-check" class="w-6 h-6 …"></i>
  <h3 data-i18n="home.services.compliance.title">IACS UR E26 / E27 대응</h3>
  <p class="text-xs font-medium … empty:hidden" data-i18n="home.services.compliance.tag">Compliance</p>
  <p data-i18n="home.services.compliance.desc">…</p>
  <span class="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold …"><span data-i18n="competitivenessSection.cta">자세히 보기</span><i data-lucide="arrow-right" class="w-4 h-4"></i></span>
</a>
```

- The whole card is the link; nothing interactive inside it. The tag line is hidden in en via `empty:hidden` (value is `""`).
- Order and icons (stroke-consistent, all `w-6 h-6`): 1 `compliance.html` `file-check` · 2 `maritime-cybersecurity.html` `shield-check` · 3 `system-integration.html` `network` · 4 `ai-cybersecurity-consulting.html` `radar`.

### 4.3 Variants

| | Compliance card (weighted) | Other three cards |
|---|---|---|
| Surface | `bg-ocean-900 dark:bg-ocean-950 border border-ocean-700 border-t-2 border-t-ocean-300` (the only `signal` elements on the page are the primary CTA(s)) | `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700` |
| Hover | `hover:bg-ocean-800` | `hover:border-ocean-500 dark:hover:border-ocean-400` |
| Padding | `p-6 md:p-8 lg:p-10` | `p-5 md:p-6` |
| Title | `font-display text-2xl md:text-3xl font-bold text-white` | `text-lg md:text-xl font-bold text-slate-900 dark:text-white` |
| Tag | `text-ocean-200` | `text-slate-500 dark:text-slate-400` |
| Desc | `mt-3 text-base md:text-lg leading-relaxed text-slate-200` | `mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400` |
| Icon / link colour | `text-ocean-200` / `text-white` | `text-ocean-700 dark:text-ocean-300` |

### 4.4 Grid

| Width | Layout |
|---|---|
| 375 | `grid gap-4`, one column; Compliance first. Other cards stack icon → title → tag → desc → link. |
| 768 | `md:gap-5`, one column. Other three cards become rows: `md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-5 md:items-start` (icon · text · link label right). |
| 1024 | `lg:grid-cols-12 lg:gap-6`. Compliance `lg:col-span-5 lg:row-span-3` (tall left card, link pinned by `mt-auto`); others `lg:col-span-7`, still in row layout. |
| 1440 | Same as 1024 with `xl:gap-8`. |

This replaces the repeated 4-up card grid with one weighted card + a three-row list.

---

## 5. Why Gwangmyung Maritime — `<section id="why">`

Directly before it: `<div id="about" aria-hidden="true"></div>` (zero height alias for old `#about` links).

### 5.1 Slots

| Slot | Key |
|---|---|
| `h2` / lede | `home.why.title` / `home.why.subtitle` |
| Role `h3` / lead / detail ×3 | `home.why.{owner,shipyard,supplier}.{title,lead,detail}` |
| Deliverable line ×3 | `compliance.delivOwnerSummary`, `compliance.delivIntegrationSummary`, `compliance.delivSupplierSummary` |
| Link label ×3 → `compliance.html#deliverables` | `home.why.linkLabel` |
| Mobile mid-page CTA → `#contact` | `hero.ctaSecondary` |
| Class block `h3` / list / note | `home.why.classTitle` / `about.supportScopeIACSList` / `home.why.classNote` |
| Marquee toggle aria-label | `about.marqueePause` / `about.marqueePlay` (existing behaviour) |
| Standards `h3` / five items | `home.why.standardsTitle` / literal HTML (no keys, CD 3.4) |
| Bodies `h3` / list | `home.why.bodiesTitle` / `about.supportScopeInternationalList` |

### 5.2 Stakeholder blocks — a left-aligned ruled list, not cards

Order: 선주 → 조선소 → 기자재 공급사 (copy-deck order).

```
<ul class="divide-y divide-slate-200 dark:divide-slate-700 border-y border-slate-200 dark:border-slate-700">
  <li class="grid gap-2 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-8 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,16rem)] lg:py-8">
    <h3 class="font-display text-xl font-bold text-slate-900 dark:text-white">선주</h3>
    <div>  lead: text-base md:text-lg font-semibold text-slate-900 dark:text-white
           detail: mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 </div>
    <div class="md:col-start-2 lg:col-start-3">
           deliverable: text-sm font-medium text-slate-700 dark:text-slate-300
           link: mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 dark:text-ocean-300 hover:underline underline-offset-4 + arrow-right </div>
  </li> ×3
</ul>
```

| Width | Layout |
|---|---|
| 375 | One column: role → lead → detail → deliverable → link. |
| 768 | Two columns: role in a 9 rem column; text, then deliverable + link below it in column 2. |
| 1024 / 1440 | Three columns: role · lead + detail · deliverable + link. |

No icons, no background panels. Add `<!-- [OWNER] … -->` from CD 9 #8 next to the shipyard deliverable line.

### 5.3 Mobile mid-page CTA (persona report rank 4 ⑤)

Right after the `</ul>`: `<div class="mt-8 lg:hidden">` holding an `a href="#contact"` with the hero primary-button classes and label `hero.ctaSecondary`. Shown below 1024 px only. `layout.js` already opens the modal for it and records the source as `page-cta#why`.

### 5.4 Class societies (`mt-16`)

- Header row: `flex items-center justify-between gap-4 mb-6`: `h3` (`text-lg font-semibold text-slate-900 dark:text-white`, no icon) + the existing pause/play toggle button, unchanged (`.logo-marquee__toggle`, `data-marquee-toggle`, `aria-pressed`, `data-i18n-aria-label="about.marqueePause"`).
- Marquee: the existing `.logo-marquee[data-marquee] > .logo-marquee__track > ul.logo-marquee__set ×2` structure and item classes unchanged. Changes:
  - Remove the `iacs.png` item from both sets (11 items remain).
  - Item order = `ABS, DNV, LR, KR, BV, RINA, CCS, PRS, IRClass, ClassNK, CRS`.
  - `alt` in the first set = the positioning 2.4 formal names: "American Bureau of Shipping", "DNV", "Lloyd's Register", "Korean Register", "Bureau Veritas", "RINA", "China Classification Society", "Polski Rejestr Statków", "Indian Register of Shipping", "Nippon Kaiji Kyokai (ClassNK)", "Croatian Register of Shipping". The second set stays `aria-hidden="true"` with `alt=""`.
- Below the marquee: `p.mt-4 text-sm text-slate-700 dark:text-slate-300` = `about.supportScopeIACSList`, then `p.mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400` = `home.why.classNote`.

### 5.5 Standards and guidance bodies (`mt-12`)

`grid gap-10 md:grid-cols-2 md:gap-12` (one column at 375, two from 768):
- Left: `h3` standards title + `ul.flex flex-wrap gap-2` of the existing chip style (`rounded-md border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm font-medium`), exactly five items: `IACS UR E26 / E27`, `IMO MSC-FAL.1/Circ.3 Rev.3`, `ISO 27001 · 27701 · 42001`, `ISMS-P`, `Zero Trust`.
- Right: `h3` bodies title + `p.text-sm leading-relaxed` = `about.supportScopeInternationalList`. **Text only — no agency logos.**

---

## 6. Our journey — `<section id="journey">`

### 6.1 Head (the page's only centred head)

`div.text-center mb-12 md:mb-16` → `h2` with `expertise.title`, same `h2` classes as §2. No eyebrow (the `expertise.subtitle` span goes).

### 6.2 Timeline

Keep the `.tl` / `.tl-line` / `.tl-fill` / `.tl-item` / `.tl-dot` / `.tl-card` markup and `data-timeline*` attributes **exactly as now**, including the left/right alternation (`data-side`) and the mobile left rail (CSS unchanged below `md`). Six entries 2021–2026; keys `expertise.timeline20XX`, `…Title`, `…Desc`.

Per-card changes (all six):
- Card surface: `bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800` (drop `shadow-lg`).
- Remove the Lucide icon from each year line.
- Year line becomes `<p class="text-2xl font-bold leading-8 text-ocean-700 dark:text-ocean-300">` (was `h3`, same size and line height, so `.tl-dot { top: 2.5rem }` stays aligned); entry title becomes `<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">` (was `h4`).
- 2021: add `<!-- [OWNER] 끌밋과 광명마리타임의 관계 확인 필요 -->` (CD 4.2).

2026 "목표" marker:
- `tl-item` gets `data-timeline-goal`.
- Dot: `tl-dot w-4 h-4 rounded-full border-2 border-ocean-700 dark:border-ocean-300 bg-white dark:bg-slate-900` (hollow). Remove `tl-dot--now` and the ring classes.
- Card: same surface as the others but `border-2 border-dashed border-ocean-400 dark:border-ocean-600` (replaces the filled `bg-ocean-800` card).
- Year line: `<p class="flex items-center gap-2 …">2026 <span class="rounded-full border border-dashed border-ocean-500 px-2 py-0.5 text-xs font-semibold leading-5 text-ocean-700 dark:text-ocean-300" data-i18n="home.journey.goalLabel">목표</span></p>` — the pill sits on the year line so the line height stays 2 rem.
- Add `<!-- [OWNER] 2026 목표의 TA 취득 주체 확인 필요 (CD 9 #2) -->`.
- `timeline-reveal.js`: the fill stops at the last revealed **non-goal** item, so the rail is not drawn "through" the goal:
  `const shown = items.filter(i => i.classList.contains('is-in') && !i.hasAttribute('data-timeline-goal'));`
  (The goal card itself still reveals.)

| Width | Layout |
|---|---|
| 375 | Left rail, cards hang to its right (existing CSS). |
| 768 / 1024 / 1440 | Centred zigzag (existing CSS), container `max-w-5xl` to keep cards ≤ 470 px. |

---

## 7. Insights — `<section id="insights">`

Directly before it: `<div id="articles" aria-hidden="true"></div>` (alias for old `#articles` links).

| Slot | Key |
|---|---|
| `h2` / lede | `articlesSection.title` / `articlesSection.subtitle` (left-aligned head, §2) |
| Article list | `<div id="articles-preview-list" class="grid gap-4 lg:grid-cols-3 lg:gap-6">` — kept id; filled by the existing inline script (`fetchArticleIndex()` → `renderArticlePreview('articles-preview-list', 3)`), unchanged |
| Contact prompt | `home.insights.contactPrompt` + link `hero.ctaSecondary` → `#contact` |
| View all → `articles.html` | `articlesSection.viewAll` |

- Grid: 375 / 768 one column; 1024 / 1440 three columns.
- Footer row under the list: `mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between`. Left: `p.text-sm text-slate-700 dark:text-slate-300` = prompt + inline text link (`font-semibold text-ocean-700 dark:text-ocean-300 underline-offset-4 hover:underline`). Right: view-all as a text link with `arrow-right` (the filled `bg-ocean-700` button goes).
- `assets/js/articles.js` `renderArticlePreview` card class: replace `shadow-sm … hover:shadow-md hover:-translate-y-0.5 transition-all` with `hover:border-ocean-500 dark:hover:border-ocean-400 transition-colors` (keep the rest). `renderArticleList` is not touched.

---

## 8. Contact — `<section id="contact">`

### 8.1 Slots

| Slot | Key |
|---|---|
| `h2` | `contactSection.title` (was `h3`) |
| Description, `data-i18n-html="true"`, contains `<a href="mailto:info@gmmaritime.com">` | `contactSection.description` |
| Details: email `dt` / `dd` (mailto link) | `contactSection.emailLabel` / `footer.email` |
| Details: address `dt` / `dd` | `home.contact.addressLabel` / `footer.address` |
| Details: business number | `footer.businessNumberLabel` + literal `391-81-02164` (same markup as the footer) |
| Name / email inputs (sr-only label + placeholder) | `contactSection.nameLabel` / `contactSection.emailLabel` |
| Company input (sr-only label + placeholder) | `home.contact.companyLabel` |
| Role select (sr-only label; first option) | `home.contact.roleLabel`; `home.contact.rolePlaceholder` |
| Role options | `home.contact.roleShipyard` / `roleOwner` / `roleSupplier` / `roleOther` |
| Message (sr-only label / placeholder) | `contactSection.messageLabel` / `home.contact.messagePlaceholder` |
| Consent | `contactSection.consentLabel`, `consentLink` (unchanged) |
| Submit / JS states | `contactSection.submitButton`, `sending`, `submitAgain`, `successMessage`, `errorMessage`, `consentRequired`, `validationError` (JS, unchanged code paths) |

### 8.2 Layout

`div.grid gap-10 lg:grid-cols-12 lg:gap-16` with three children in this DOM order:
1. Head — `lg:col-span-5`: `h2` (§2 classes) + description `mt-4 text-slate-600 dark:text-slate-400 leading-relaxed` (link `text-ocean-700 dark:text-ocean-300 underline`).
2. Form — `lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2`.
3. Details — `lg:col-span-5 lg:col-start-1 lg:row-start-2`: `dl.divide-y divide-slate-200 dark:divide-slate-700 border-y border-slate-200 dark:border-slate-700` rows `grid grid-cols-[6rem_minmax(0,1fr)] gap-4 py-3 text-sm`; business number as `p.mt-4 text-xs text-slate-500`.

At 375 / 768 that reads head → form → details (form comes before the details so it is reached sooner). At 1024 / 1440: head and details on the left, form on the right. Left-aligned throughout.

### 8.3 Form (Stage 1 markup preserved)

Keep, unchanged: `form#contact-form[data-contact-form]`, the sr-only `<label for>` per field, `autocomplete`, `required` on name / email / message, hidden `subject`, the consent checkbox (`#privacy-consent`, `name="privacyConsent"`, `aria-required="true"`) with its label and privacy link, `button#contact-submit[data-contact-submit]` (signal), `div#contact-status[data-contact-status][role=status]`. Card surface: `bg-slate-50 dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700` (drop `shadow-lg`).

Field order: row 1 name · email (`sm:grid-cols-2`) → row 2 company · role (`sm:grid-cols-2`) → message (`rows="5"`) → consent → submit → status.
- `input#company` `type="text" name="company" autocomplete="organization"` — optional (no `required`).
- `select#role` `name="role"` — optional. Options: `<option value="" data-i18n="home.contact.rolePlaceholder">`, then `value="Shipyard"`, `value="Shipowner or ship manager"`, `value="Equipment supplier"`, `value="Other"` (English values are what the email shows, whatever the UI language; visible text via `data-i18n`). Same input classes as the other fields.
- Message: `data-i18n-placeholder="home.contact.messagePlaceholder"` (the sr-only label keeps `contactSection.messageLabel`).

### 8.4 Same change in `components/contact-modal.html`

The hero CTA, mid-page CTA and prompt link all open this modal, so it gets the same two fields (ids `contact-modal-company`, `contact-modal-role`), the new message placeholder, and `data-i18n-html="true"` on its description `p` (the value now contains a link).

### 8.5 `assets/js/contact.js`

In `handleSubmit`, after building `data`:
```js
data.company = (formData.get('company') || '').trim();
data.role = formData.get('role') || '';
```
and append to the message alongside the source block, so it reaches the owner even if the EmailJS template has no `{{company}}` / `{{role}}`:
`[소속] ${data.company || '-'} · [역할] ${data.role || '-'}`.
`validateForm` is unchanged (both fields optional).

### 8.6 Removed here

`contactSection.coreValuesDesc` paragraph, the `contact-values-title` `h2` ("Trust Execution Responsibility Partnership") and the `max-content` two-column grid.

---

## 9. Navbar and mobile menu — `components/navbar.html`

Desktop (`hidden lg:flex items-center gap-6 xl:gap-8`), in order:

| Item | href | Key |
|---|---|---|
| Home | `index.html#home` | `nav.home` |
| Services ▾ (toggle `a.nav-link[data-dropdown-toggle][aria-haspopup="true"][aria-expanded]` inside `div.relative.group[data-dropdown]`) | `index.html#services` | `nav.services` (new) |
| ↳ menu `[data-dropdown-menu]`: four plain `a.nav-link` (no roles), in card order | `compliance.html`, `maritime-cybersecurity.html`, `system-integration.html`, `ai-cybersecurity-consulting.html` | `nav.compliance`, `nav.maritimeCybersecurity`, `nav.systemIntegration`, `nav.aiConsulting` |
| Insights | `index.html#insights` | `nav.articles` |
| About | `index.html#why` | `nav.aboutUs` |
| Contact | `index.html#contact` | `nav.contact` |
| Language button | — | add `aria-label` + `data-i18n-aria-label="footer.changeLanguage"` (icon-only today) |

Mobile menu (`#mobile-menu`): same order — Home, Services (`mobile-link` to `index.html#services`) with the four sub-links indented below it in the existing `border-l-2` block, Insights, About, Contact, then the existing language button (`footer.changeLanguage`).

Delete from both menus: Expertise, Vision, Business, Competitiveness. Keys left unused: `nav.expertise`, `nav.business`, `nav.vision`, `nav.competitiveness`.

### 9.1 `assets/js/layout.js`

- `initActiveState` (index branch):
  ```js
  const sections = ['home', 'services', 'why', 'journey', 'insights', 'contact'];
  const navFor = { home: 'home', services: 'services', why: 'why', journey: 'why',
                   insights: 'insights', contact: 'contact', about: 'why', articles: 'insights' };
  // highlight(id): targetHref = `index.html#${navFor[id] || id}`
  ```
  So About stays active over both `why` and `journey`, and the Services toggle is active over `services` (it is a `.nav-link` whose href matches). The initial `highlight(currentHash…)` goes through the same map, so `#about` / `#articles` arrivals light the right item.
- Sub-page branch: the articles/article highlight selector becomes `a[href="index.html#insights"]`. Rename `compBtn` → `servicesToggle`, `isCompetitivenessPage` → `isServicePage` (same regex).
- `initDropdown`: no functional change (selectors `[data-dropdown]`, `[data-dropdown-toggle]`, `[data-dropdown-menu] a` are preserved); update the comment "Competitiveness" → "Services".
- `initContactModal`, `initHashAnchor`, `contactSource`: unchanged.

### 9.2 Other pages

- `article.html` `#article-cta-service`: `href="index.html#competitiveness"` → `index.html#services`.
- `components/footer.html` (Task 5 decision delegated by CD 8.2): the Services list becomes four links to the sub-pages using the `nav.compliance` … `nav.aiConsulting` keys (same order as the cards); `footer.service1–4` become unused. The footer email becomes a `mailto:` link. No other footer change.

---

## 10. Removal list

**Markup (`index.html`)**
- Hero: badge; the five-photo collage and its wrapper; the `hero-pattern` grid SVG; `min-h-screen`; the two image preloads.
- `#expertise` eyebrow "Our Journey" (section becomes `#journey`).
- `#vision` entirely: four value cards (with `hover:-translate-y-1`) and the "Our Vision" quote panel with its two blurred `animate-blob` decorations.
- `#business` entirely (사업 범위 two boxes).
- `#competitiveness` entirely (replaced by `#services`).
- `#articles`: eyebrow "Articles", the filled view-all button (section becomes `#insights`).
- `#about` entirely: About title/subtitle, 핵심 역량 four cards, 핵심 가치 four icons, the "지원 범위" wrapper and heading, the IACS logo in the marquee, the five-logo agency grid, the chips `IMO MSC Cyber`, `N2SF`, `ISP · ISMP`, `SC-100 · 200 · 300`, `선급 Liaison`. (The marquee itself moves to `#why`.)
- `#contact`: the intro paragraph and the "Trust Execution Responsibility Partnership" display.
- All uppercase eyebrow labels (`tracking-widest uppercase` spans).

**CSS / config that becomes dead (delete)**
- `styles.css`: `.contact-values-title` (both rules); `.animate-blob`; `@keyframes blob`; `.animation-delay-2000`; `.tl-dot--now::after`, `.js-timeline .tl-item.is-in .tl-dot--now::after`, `@keyframes tl-ring` and the `.tl-dot--now::after` line in the reduced-motion block.
- `tailwind.config.js`: `animation.blob` and `keyframes.blob`. Keep `fadeIn` (the contact modal uses it).

**JS**: nothing is deleted. Changed: `layout.js` (§9.1), `timeline-reveal.js` (one filter, §6.2), `articles.js` (one class string, §7), `contact.js` (§8.5). `logo-marquee.js` is unchanged.

**Assets left unreferenced** (do not delete in Task 5; listed for cleanup once the owner answers CD 9 #6):
`resource/images/hero-port-night.jpg`, `hero-container-ship.jpg`, `hero-cargo-crane.jpg`, `hero-ship-wake.jpg`, `hero-container-yard.jpg`; `resource/logos/iacs.png`, `nsa.png`, `ncsc-uk.png`, `uscg.webp`, `csa-sg.png`, `ncsc.jpg`.

**Translation keys**: as CD 8.2, plus `footer.service1–4`, plus the four `nav.*` above. Search the repo before deleting each one; delete from all four locales.

---

## 11. Anti-pattern guardrails (Global Constraints 10)

1. No eyebrow labels: no `uppercase` + `tracking-widest` label above any heading.
2. At most two centred section heads — this spec uses one (`journey`). The hero is left-aligned.
3. No `hover:-translate-y-*`, `hover:scale-*`, hover shadow lift or `transition-all` on any card (service, stakeholder, article, timeline). Use border or background colour with `transition-colors`.
4. No blurred blobs, `animate-blob`, `blur-3xl` decorations or mesh backgrounds.
5. No `min-h-screen` (or `h-screen`) hero.
6. No repeated identical 4-up card grid: services is weighted card + list; why is a ruled list; insights is 3-up.
7. `signal-*` only on the primary-action buttons. No `signal` text, icons, pills, or highlights.
8. No stock photos on the homepage.
9. Tokens only: `ink` / `ocean` / `signal` / `slate`; fonts `font-sans` / `font-display`. No new colours, fonts, plugins, libraries or build steps.

---

## 12. Acceptance checklist (implementer and finish-gate reviewer)

1. `index.html` has exactly six `<section>`s with ids `home, services, why, journey, insights, contact` in that order, plus alias anchors `#about` and `#articles`; `initActiveState` lists those six; every navbar href resolves.
2. Desktop nav reads Home · Services ▾ (4, card order) · Insights · About · Contact · language; the mobile menu matches; the dropdown keyboard behaviour still works.
3. Korean hero headline renders on exactly two lines at 320, 375, 768, 1024, 1440 px; the primary CTA top is ≤ 400 px from the page top at 375×812.
4. The hero has no photos, no badge, no `min-h-screen`; the four-stage diagram has a caption and translates in all four locales.
5. The Compliance card is the visibly largest service card at every width; all four cards are single `<a>` elements linking to their sub-page.
6. `signal` appears only on primary-action buttons (the Compliance top rule is `ocean-300`); never two on one 375×812 screen.
7. Why shows three role rows linking to `compliance.html#deliverables`, the mobile mid-page CTA below 1024 px only, the 11-logo marquee (no IACS) with pause control, the class note, five standards chips, and agency names as text (no agency `<img>`).
8. Timeline: six entries; 2026 has the "목표" pill, a hollow dot, a dashed card; the fill stops at 2025; the mobile left rail is unchanged; reduced motion shows everything.
9. Insights renders three latest articles via `renderArticlePreview`; preview cards have no translate/shadow hover.
10. Contact: Stage 1 form markup intact; `company`/`role` optional and present in the inline form and the modal; a test send includes both in the email; the email in the description and details is a `mailto:` link; no "Trust Execution…" text.
11. One `h1`; one `h2` per section; no `h4` on the page; no uppercase eyebrow; only `journey`'s head is centred.
12. Every copy-deck key in CD 8.1 and the five §3.4 keys exist in all four locales with identical key sets; the page shows no raw keys in ko/en/zh/ja.
13. Dead CSS in §10 removed; `npm run build` succeeds; no console errors on index, a sub-page and article.html.
14. At 375×812 (ko) the `#contact` section starts above 7,000 px (was 11,597 px).
