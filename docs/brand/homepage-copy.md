# 광명마리타임 홈페이지 카피 덱 (ko / en / zh / ja)

> Gwangmyung Maritime — Homepage copy deck · Stage 2 Task 3
> 작성일: 2026-10-09 · 기준 문서: `docs/brand/positioning.md`(이하 "포지셔닝"), `docs/research/persona-walkthrough-2026-10-09.md`(이하 "페르소나 보고서"), `data/translations.json`
> 이 문서는 구현(Task 5)에서 그대로 옮겨 쓰는 최종 문구입니다. `[OWNER: …]` 항목은 대표 확인 전까지 표시된 기본값을 씁니다.

## 0. 읽는 법과 공통 규칙

- 각 문구 블록은 ko / en / zh / ja 네 행의 표입니다. 여러 필드가 있는 블록(카드 등)은 열을 필드로 나눕니다.
- 회사명: ko **광명마리타임**, en **Gwangmyung Maritime**, zh **光明海事**, ja **光明マリタイム**. 법인 표기 "㈜"는 연혁 2021 · 2025 항목에서만 씁니다.
- 규정 표기: 화면 첫 언급은 **IACS UR E26 / E27**(슬래시 앞뒤 한 칸), 이후 "E26 / E27", "UR E26", "UR E27".
- zh · ja는 전각 문장부호(，。：（）、) 뒤에 띄어쓰기를 두지 않습니다. 이 문서에서 새로 쓴 ja 문자열에는 구절 단위 띄어쓰기를 넣지 않았습니다. 값이 바뀌지 않고 재사용되는 기존 ja 문자열(예: 연혁 2021 · 2022 · 2023 설명)은 현재 띄어쓰기를 그대로 둡니다.
- 길이 기준(ko): 히어로 제목 줄당 20자 이하 · 최대 2줄, 서브라인 90자 이하, 카드 설명 60자 이하, CTA 라벨 8자 이하. 괄호 안 숫자는 공백 포함 글자 수입니다.
- "키" 열의 표기: **재사용** = 기존 키 · 기존 값 그대로, **재사용(값 수정)** = 같은 자리 · 같은 의미의 기존 키에 새 값, **신규** = `home.*`(내비 1개만 `nav.*`) 새 키. 전체 대응표는 8절에 있습니다.

---

## 1. 히어로 (Hero)

### 1.1 배지

**결정: 배지를 없앱니다.** 서브라인이 화면의 첫 "IACS UR E26 / E27" 언급을 맡기 때문에, 같은 문구를 배지로 한 번 더 쓰면 첫 화면에 규정명이 두 번 나옵니다. "Ship OT & Cyber Security Specialist"는 폐기합니다(포지셔닝 1.3, 6.4). `hero.badge`는 미사용 키가 됩니다.

### 1.2 제목 후보 두 개

**후보 A — 권장**

| 로케일 | 제목 (`<br/>` 위치 포함) | 줄 길이 |
|---|---|---|
| ko | 선박 사이버 보안,<br/>설계부터 선급 검사까지. | 1줄 10자 / 2줄 13자 |
| en | Ship cybersecurity,<br/>from design to class survey. | 7 words |
| zh | 船舶网络安全，<br/>从设计到船级检验。 | |
| ja | 船舶サイバーセキュリティ、<br/>設計から船級検査まで。 | |

**후보 B**

| 로케일 | 제목 | 줄 길이 |
|---|---|---|
| ko | E26 / E27 대응을<br/>늦게 시작하면 일정이 밀립니다. | 1줄 14자 / 2줄 17자 |
| en | Start E26 / E27 late,<br/>and the schedule slips. | 8 words |
| zh | E26 / E27 应对起步晚，<br/>进度就会延误。 | |
| ja | E26 / E27対応の着手が遅れると、<br/>工程が遅れます。 | |

**권장: 후보 A.** 이유(한 줄): 두 페르소나의 관련성 조건(조선소 "E26/E27 · 설계 · 선급", 선주 "선박 사이버 보안")을 제목 + 서브라인 한 화면에서 모두 채우고, B는 `compliance.html`의 `<h1>`과 아래 Compliance 카드 문구를 그대로 반복하기 때문입니다.

- A의 "선급 승인"은 포지셔닝 1.3에 따라 "선급 검사"로 바꿨습니다(하위 페이지의 마지막 단계 Survey와 일치).
- 구현 메모: `<br/>`은 모든 화면 폭에서 줄을 바꾸는 일반 `<br/>`로 둡니다. `hidden md:block`을 붙이면 모바일에서 "보안,설계"처럼 붙어 보입니다(페르소나 보고서 6절). 값에 HTML이 있으므로 `data-i18n-html="true"`가 필요합니다.
- B를 고르면 What we do의 Compliance 카드 설명(2.2)을 2.4절의 대체 문구로 바꿔 같은 말이 두 번 나오지 않게 합니다.

### 1.3 서브라인 (포지셔닝 1.3 확정 문구)

| 로케일 | 서브라인 |
|---|---|
| ko | IACS UR E26 / E27 대응과 IT / OT 시스템 통합을, 메이커 선정부터 선급 검사까지 같은 팀이 이어서 맡습니다. (71자) |
| en | IACS UR E26 / E27 compliance and IT / OT system integration — carried by the same team from maker selection to class survey. |
| zh | IACS UR E26 / E27 应对与 IT / OT 系统集成，从选型到船级检验，由同一团队持续负责。 |
| ja | IACS UR E26 / E27対応とIT / OTシステム統合を、メーカー選定から船級検査まで同じチームが一貫して担います。 |

### 1.4 CTA

| 로케일 | 1차 CTA (주황 `signal`, → `#contact`) | 2차 텍스트 링크 (→ `compliance.html`) |
|---|---|---|
| ko | 문의하기 (4자) | E26 / E27 대응 방식 보기 |
| en | Contact us | How we handle E26 / E27 |
| zh | 联系我们 | 查看 E26 / E27 应对方式 |
| ja | お問い合わせ | E26 / E27対応の進め方を見る |

- 2차는 버튼이 아니라 텍스트 링크이므로 8자 제한 대상이 아닙니다(포지셔닝 1.3 문구). 디자인에서 버튼으로 바꾸게 되면 ko "대응 방식 보기"(8자) / en "Our approach" / zh "应对方式" / ja "対応の進め方"로 줄입니다.

---

## 2. 하는 일 (What we do)

### 2.1 섹션 제목 · 서브라인

| 로케일 | 제목 | 서브라인 |
|---|---|---|
| ko | 하는 일 | 네 가지 일은 하나로 이어집니다. 중심은 IACS UR E26 / E27 대응입니다. |
| en | What we do | Four services, one thread: IACS UR E26 / E27 compliance. |
| zh | 业务内容 | 四项服务环环相扣，核心是 IACS UR E26 / E27 应对。 |
| ja | 事業内容 | 4つのサービスは一つにつながっています。中心はIACS UR E26 / E27への対応です。 |

### 2.2 카드 네 장 (순서 = 화면 순서, 1번 카드를 시각적으로 크게)

카드 설명은 각 하위 페이지의 `<h1>` 논지와 첫 문단에서 가져온 포지셔닝 5절 확정 문구입니다. "보조 줄"은 ko · zh · ja에서 제목 아래 작게 쓰는 영문 서비스명이며, en에서는 제목과 같아 빈 문자열로 두고 숨깁니다(예: `:empty { display: none }`).

**카드 1 — Compliance → `compliance.html`** (근거 `<h1>` "유형을 늦게 정하면, 일정이 밀립니다." / 첫 문단 "…메이커 선정 단계에서 유형을 정하고, 단계마다 위험을 다시 평가합니다.")

| 로케일 | 제목 | 보조 줄 | 설명 |
|---|---|---|---|
| ko | IACS UR E26 / E27 대응 | Compliance | 메이커 선정 단계에서 시스템 유형을 정해 제출 범위를 일찍 고정합니다. (39자) |
| en | Compliance | (빈 문자열) | We settle system types at maker selection, so the submission scope is fixed early. |
| zh | IACS UR E26 / E27 应对 | Compliance | 在选型阶段确定系统类型，尽早固定提交范围。 |
| ja | IACS UR E26 / E27対応 | Compliance | メーカー選定の段階でシステム種別を確定し、提出範囲を早期に固定します。 |

**카드 2 — Maritime Cybersecurity → `maritime-cybersecurity.html`** (근거 `<h1>` "사후 대응이 아닌, 설계 단계부터 심는 보안" / 첫 문단 "…Design · Build · Operate 전 주기에 걸쳐 검증 가능한 보안 구조를 함께 설계하고 운영합니다.")

| 로케일 | 제목 | 보조 줄 | 설명 |
|---|---|---|---|
| ko | 선박 사이버 보안 | Maritime Cybersecurity | 설계 · 건조 · 운항 전 주기에 걸쳐 검증 가능한 보안 구조를 설계하고 운영합니다. (47자) |
| en | Maritime Cybersecurity | (빈 문자열) | We design and operate a verifiable security architecture across design, build and operation. |
| zh | 船舶网络安全 | Maritime Cybersecurity | 在设计、建造、运营全周期，设计并运营可验证的安全架构。 |
| ja | 船舶サイバーセキュリティ | Maritime Cybersecurity | 設計・建造・運航の全周期にわたり、検証可能なセキュリティ構造を設計・運用します。 |

**카드 3 — System Integration → `system-integration.html`** (근거 `<h1>` "사고를 막는 보안이 아니라, 버티는 구조를 만듭니다." / 첫 문단 "…운영 목표에서 표준까지 네 개의 층을 먼저 세우고, 그 위에 IT · OT 시스템을 통합합니다.")

| 로케일 | 제목 | 보조 줄 | 설명 |
|---|---|---|---|
| ko | IT / OT 시스템 통합 | System Integration | 운영 목표에서 표준까지 구조를 먼저 세우고, 그 위에 IT / OT 시스템을 통합합니다. (49자) |
| en | System Integration | (빈 문자열) | We set the structure first — from operating goals to standards — then integrate IT / OT systems on top. |
| zh | IT / OT 系统集成 | System Integration | 先搭建从运营目标到标准的结构，再在其上集成 IT / OT 系统。 |
| ja | IT / OTシステム統合 | System Integration | 運用目標から標準まで構造を先に固め、その上にIT / OTシステムを統合します。 |

**카드 4 — AI × Cybersecurity Consulting → `ai-cybersecurity-consulting.html`** (근거 `<h1>` "설계에서 끝나지 않습니다. Survey까지 같은 팀이 갑니다." / 첫 문단 "…FAT·인도·Survey까지 책임집니다.")

| 로케일 | 제목 | 보조 줄 | 설명 |
|---|---|---|---|
| ko | AI 기반 사이버 보안 컨설팅 | AI × Cybersecurity Consulting | AI 기반 관제와 대응을 포함해, FAT · 인도 · 선급 검사까지 같은 팀이 책임집니다. (50자) |
| en | AI × Cybersecurity Consulting | (빈 문자열) | Including AI-based monitoring and response, the same team stays through FAT, delivery and class survey. |
| zh | AI 网络安全咨询 | AI × Cybersecurity Consulting | 涵盖基于 AI 的监控与响应，同一团队负责到 FAT、交付与船级检验。 |
| ja | AIサイバーセキュリティコンサルティング | AI × Cybersecurity Consulting | AIによる監視と対応を含め、FAT・引き渡し・船級検査まで同じチームが責任を持ちます。 |

- "Structure-first", "Agentic AI SecOps"는 홈페이지에서 쓰지 않습니다(포지셔닝 4.2). "×"는 U+00D7입니다.

### 2.3 카드 링크 라벨 (네 장 공통, 기존 키 재사용)

| 로케일 | 라벨 |
|---|---|
| ko | 자세히 보기 (6자) |
| en | Learn more |
| zh | 了解详情 |
| ja | 詳しく 見る |

### 2.4 (후보 B를 고를 때만) Compliance 카드 대체 설명

| 로케일 | 설명 |
|---|---|
| ko | UR E26(선박 전체)과 UR E27(시스템 · 장비)에 필요한 제출 문서와 실증을 함께 준비합니다. (57자) |
| en | We prepare the submissions and evidence for UR E26 (ship-wide) and UR E27 (systems and equipment). |
| zh | 共同准备 UR E26（船舶整体）与 UR E27（系统 · 设备）所需的提交文件与验证材料。 |
| ja | UR E26（船舶全体）とUR E27（システム・機器）に必要な提出文書と実証をともに準備します。 |

---

## 3. 왜 광명마리타임인가 (Why Gwangmyung Maritime)

### 3.1 섹션 제목 · 서브라인

| 로케일 | 제목 | 서브라인 |
|---|---|---|
| ko | 왜 광명마리타임인가 | 선주 · 조선소 · 기자재 공급사는 E26 / E27에서 부딪히는 문제가 서로 다릅니다. |
| en | Why Gwangmyung Maritime | Shipowners, shipyards and equipment suppliers each hit different E26 / E27 problems. |
| zh | 为什么选择光明海事 | 船东、船厂和设备供应商在 E26 / E27 上遇到的问题各不相同。 |
| ja | なぜ光明マリタイムか | 船主・造船所・機器サプライヤーでは、E26 / E27で直面する課題がそれぞれ異なります。 |

### 3.2 이해관계자 블록 세 개

페르소나 보고서 4절 2위 권고 형식입니다: 형용사 대신 그 역할이 **받는 것**(단계 · 규제 · 산출물)을 쓰고, 각 블록을 `compliance.html#deliverables`로 연결합니다. 블록 구성은 역할명 → 첫 문장 → 상세 한 줄 → 산출물 줄(기존 `compliance.deliv*Summary` 키 재사용, 사이트에 이미 있는 수치) → 링크입니다.

**블록 1 — 선주** (페르소나 B: "선주 쪽 산출물", "선대 10년" 걱정에 답함)

| 로케일 | 역할명 | 첫 문장 | 상세 한 줄 | 산출물 줄 (재사용) |
|---|---|---|---|---|
| ko | 선주 | 인도로 끝나지 않습니다. 운항 단계 규제까지 같은 구조 위에서 관리합니다. | IMO MSC-FAL.1/Circ.3 Rev.3 · USCG · EU NIS2 요건까지 다룹니다. (51자) | UR E26 선주 대리 · 12개 실증 항목 + 사이버 선박 설계 |
| en | Shipowners | Delivery is not the end. We manage operation-stage regulation on the same structure. | Including IMO MSC-FAL.1/Circ.3 Rev.3 · USCG · EU NIS2 requirements. | UR E26 on the shipowner's behalf · 12 compliance items + cyber ship design |
| zh | 船东 | 交付并非终点。运营阶段的法规也在同一结构上管理。 | 涵盖 IMO MSC-FAL.1/Circ.3 Rev.3 · USCG · EU NIS2 要求。 | 代表船东执行 UR E26 · 12 项合规项目 + 网络安全船舶设计 |
| ja | 船主 | 引き渡しで終わりません。運航段階の規制まで同じ構造の上で管理します。 | IMO MSC-FAL.1/Circ.3 Rev.3 · USCG · EU NIS2の要件まで扱います。 | (기존 ja 값 그대로) |

**블록 2 — 조선소** (페르소나 A: "범위 불명확", "FAT 직전 결함으로 인도 지연" 걱정에 답함)

| 로케일 | 역할명 | 첫 문장 | 상세 한 줄 | 산출물 줄 (재사용) |
|---|---|---|---|---|
| ko | 조선소 | 제출 범위가 늦게 흔들리면 인도 일정이 밀립니다. 단계마다 위험을 다시 평가합니다. | 메이커 선정에서 유형, 승인도면에서 위협 노출 경로, FAT에서 통제 수준을 평가합니다. (50자) | UR E26 · 6개 실증 산출물 + 위험관리 · 보안 솔루션 · FAT 입회 |
| en | Shipyards | If the submission scope shifts late, delivery slips. We re-assess risk at every stage. | Types at maker selection, threat exposure paths at approval drawings, controls at FAT. | UR E26 · 6 compliance deliverables + risk management · security solutions · FAT attendance |
| zh | 船厂 | 提交范围若在后期变动，交付就会延误。我们在每个阶段重新评估风险。 | 选型阶段确定类型，认可图纸阶段评估威胁暴露路径，FAT 阶段评估控制水平。 | UR E26 · 6 项合规交付物 + 风险管理 · 安全解决方案 · FAT 见证 |
| ja | 造船所 | 提出範囲が後から揺らぐと、引き渡しが遅れます。段階ごとにリスクを再評価します。 | メーカー選定で種別を、承認図面で脅威の露出経路を、FATで統制水準を評価します。 | (기존 ja 값 그대로) |

- 포지셔닝 3.1의 조선소 첫 문장("유형을 메이커 선정 단계에서 정하면, 제출 범위가 일찍 고정됩니다.")은 Compliance 카드 설명(2.2)과 거의 같은 문장이라 Global Constraints 7(한 생각은 한 번)에 걸립니다. 그래서 카드에는 포지셔닝 확정 문구를 그대로 두고, 이 블록은 같은 근거(`compliance.thesisLede`, RA 1–3 단계)를 조선소의 걱정(제출 범위 · 인도 일정) 쪽에서 다시 썼습니다.
- 상세 한 줄의 세 단계는 `compliance.early1–3`(RA 1 · 2 · 3)과 같은 내용입니다.

**블록 3 — 기자재 공급사** (`compliance.readyLead`, `ready2–3Desc`의 걱정에 답함)

| 로케일 | 역할명 | 첫 문장 | 상세 한 줄 | 산출물 줄 (재사용) |
|---|---|---|---|---|
| ko | 기자재 공급사 | UR E27 적합성을 설명하고 입증할 수 있어야 조선소의 선택을 받습니다. | 보안 기능 · 외부 인터페이스 정의와 계정 관리 · 원격 접속 통제를 UR E27 기준으로 점검합니다. (57자) | UR E27 · 10개 산출물 · 41개 요구사항 |
| en | Equipment suppliers | To be chosen by shipyards, you must be able to explain and demonstrate UR E27 conformity. | We check security functions, external interfaces, account management and remote access controls against UR E27. | UR E27 · 10 deliverables · 41 requirements |
| zh | 设备供应商 | 能够说明并证明 UR E27 符合性，才会被船厂选用。 | 按 UR E27 要求检查安全功能、外部接口定义以及账户管理、远程访问控制。 | UR E27 · 10 项交付物 · 41 项要求 |
| ja | 機器サプライヤー | UR E27への適合性を説明・立証できてこそ、造船所に選ばれます。 | セキュリティ機能・外部インターフェースの定義、アカウント管理・リモートアクセス制御をUR E27基準で点検します。 | (기존 ja 값 그대로) |

- TA · SoC · SoF는 홈페이지에서 쓰지 않습니다(포지셔닝 4.2, SoC · SoF 정식 명칭 미확인). 공급사는 링크로 `compliance.html`의 해당 설명에 도달합니다.

**블록 공통 링크 라벨** (→ `compliance.html#deliverables`)

| 로케일 | 라벨 |
|---|---|
| ko | 산출물 보기 (6자) |
| en | See deliverables |
| zh | 查看交付物 |
| ja | 成果物を見る |

### 3.3 대응 가능한 선급 (선급 줄)

선급 로고 흐름(marquee)은 유지하고, 그 위 제목과 아래 텍스트 목록 · 고지 문구를 아래로 바꿉니다. IACS 로고는 로고 흐름에서 뺍니다(IACS는 선급이 아님, 포지셔닝 6.2).

| 로케일 | 제목 | 목록 (화면 표기, 순서 확정) | 고지 문구 (확정) |
|---|---|---|---|
| ko | 대응 가능한 선급 | ABS, DNV, LR, KR, BV, RINA, CCS, PRS, IRClass, ClassNK, CRS | 각 선급의 규칙과 가이드라인에 맞춰 대응할 수 있다는 뜻이며, 제휴 · 인증 · 승인 관계를 뜻하지 않습니다. |
| en | Class societies we can support | ABS, DNV, LR, KR, BV, RINA, CCS, PRS, IRClass, ClassNK, CRS | Listed for the class rules and guidance we can work to; this does not imply partnership, accreditation or approval. |
| zh | 可支持的船级社 | ABS, DNV, LR, KR, BV, RINA, CCS, PRS, IRClass, ClassNK, CRS | 表示我们能够按照各船级社的规则与指南开展工作，并不意味着合作、认可或批准关系。 |
| ja | 対応可能な船級協会 | ABS, DNV, LR, KR, BV, RINA, CCS, PRS, IRClass, ClassNK, CRS | 各船級協会の規則とガイドラインに沿って対応できることを示すもので、提携・認定・承認の関係を意味するものではありません。 |

- 한 줄로 쓸 때의 형태: "대응 가능한 선급: ABS, DNV, …, CRS". 목록 끝의 "등" / "etc." / "など"는 뺍니다.
- 로고 `alt`는 포지셔닝 2.4의 정식 영문명(예: "Lloyd's Register", "Indian Register of Shipping", "Nippon Kaiji Kyokai (ClassNK)")을 씁니다. 현재 `alt="IR Class"`, `alt="KR"`도 바꿉니다.

### 3.4 참조 표준 · 가이드라인 (표준 줄과 기관 줄)

포지셔닝 6.2에 따라 표준과 기관을 두 줄로 나눕니다. 기관은 로고 없이 텍스트 목록으로만 씁니다(NSA · UK NCSC · USCG · CSA 로고 제거, `ncsc.jpg`는 `[OWNER]` 확인 전까지 뺌).

**표준 줄**

| 로케일 | 제목 | 목록 (모든 로케일 동일, 칩 또는 목록 항목 하나씩) |
|---|---|---|
| ko | 참조 표준 | IACS UR E26 / E27 · IMO MSC-FAL.1/Circ.3 Rev.3 · ISO 27001 · 27701 · 42001 · ISMS-P · Zero Trust |
| en | Standards we work to | (같음) |
| zh | 参考标准 | (같음) |
| ja | 参照する標準 | (같음) |

- 항목은 다섯 개입니다: "IACS UR E26 / E27", "IMO MSC-FAL.1/Circ.3 Rev.3", "ISO 27001 · 27701 · 42001", "ISMS-P", "Zero Trust". 항목 안에 가운뎃점이 있으므로 한 문자열로 잇지 말고 항목(칩)으로 나눠 렌더링합니다. 고유명사라 번역 키가 필요 없습니다(현재처럼 HTML에 둠).
- 빼는 항목: "IMO MSC Cyber"(위 IMO 문서 번호로 대체), "N2SF", "ISP · ISMP", "SC-100 · 200 · 300", "선급 Liaison".

**기관 줄**

| 로케일 | 제목 | 목록 |
|---|---|---|
| ko | 참조 표준 · 가이드라인 기관 | NSA (미국 국가안보국), UK NCSC (영국 국가사이버보안센터), USCG (미국 해안경비대), CSA Singapore (싱가포르 사이버보안청) |
| en | Reference standards and guidance bodies | NSA (US), UK NCSC, USCG, CSA Singapore |
| zh | 参考标准与指南发布机构 | NSA（美国国家安全局）、UK NCSC（英国国家网络安全中心）、USCG（美国海岸警卫队）、CSA Singapore（新加坡网络安全局） |
| ja | 参照する標準・ガイドラインの発行機関 | NSA（米国家安全保障局）、UK NCSC（英国国家サイバーセキュリティセンター）、USCG（米国沿岸警備隊）、CSA Singapore（シンガポールサイバーセキュリティ庁） |

---

## 4. 걸어온 길 (Our journey)

### 4.1 섹션 제목

| 로케일 | 제목 |
|---|---|
| ko | 광명마리타임이 걸어온 길 |
| en | Our journey |
| zh | 我们的历程 |
| ja | 私たちの歩み |

- 대문자 눈썹 라벨 "Our Journey"(`expertise.subtitle`)는 없앱니다(Global Constraints 10).

### 4.2 연혁 여섯 항목

연도 값(`expertise.timeline2021`–`2026`)은 그대로 재사용합니다. 제목 · 설명은 포지셔닝 6.3을 따릅니다.

**2021**

| 로케일 | 제목 | 한 줄 |
|---|---|---|
| ko | 기술 기반 사업의 출발 | ㈜끌밋 법인 설립 및 데이터 · 플랫폼 기반 시스템 개발 시작 |
| en | Foundation of a technology business | Geulmit founded, and data and platform system development begins |
| zh | 基于技术的业务起步 | 设立Geulmit法人及开始基于数据和平台的系统开发 |
| ja | 技術 ベース 事業の スタート | Geulmit 法人設立 及び データ・プラットフォーム ベース システム開発 開始 |

- `[OWNER: ㈜끌밋과 광명마리타임의 관계 — 전신 / 모회사 / 관계사 중 무엇입니까?]` 확인 전 기본값은 위 중립 문구이며(포지셔닝 6.3이 규정한 형태), HTML에 `<!-- [OWNER] 끌밋과 광명마리타임의 관계 확인 필요 -->` 주석을 남깁니다. 관계를 추측해 쓰지 않습니다.
- 확인되면 한 줄을 아래처럼 바꿉니다(X = 전신 / 모회사 / 관계사):
  - ko "㈜끌밋 법인 설립 — 광명마리타임의 X — 데이터 · 플랫폼 기반 시스템 개발 시작"
  - en "Geulmit founded — the X of Gwangmyung Maritime — and data and platform system development begins" (X = predecessor / parent company / affiliate)
  - zh "设立Geulmit法人（光明海事的X），开始基于数据和平台的系统开发"(X = 前身 / 母公司 / 关联公司)
  - ja "Geulmit法人設立（光明マリタイムのX）、データ・プラットフォーム基盤のシステム開発を開始"(X = 前身 / 親会社 / 関連会社)

**2022**

| 로케일 | 제목 | 한 줄 |
|---|---|---|
| ko | 산업 도메인 확장 | 해양 · 물류 · 운영 산업으로의 기술 적용 가능성 검증 |
| en | Expanding into new domains | Testing how the technology applies to maritime, logistics and operations |
| zh | 产业领域扩展 | 验证技术在海事、物流和运营产业的适用性 |
| ja | 産業ドメインの拡大 | 海事・物流・運営 産業への 技術適用 可能性 検証 |

**2023**

| 로케일 | 제목 | 한 줄 |
|---|---|---|
| ko | 고신뢰 · 고보안 시스템 경험 | 국방부 위성 영상 처리 시스템 구축 사업 참여 |
| en | High-assurance systems experience | Took part in a Ministry of National Defense satellite image processing system project |
| zh | 高可信 · 高安全系统经验 | 参与国防部卫星图像处理系统建设项目 |
| ja | 高信頼・高セキュリティシステムの経験 | 国防部 衛星画像 処理システム 構築 プロジェクト 参加 |

- "참여"를 "수행 · 주관 · 구축 완료"로 올리지 않습니다(포지셔닝 6.1).

**2024**

| 로케일 | 제목 | 한 줄 |
|---|---|---|
| ko | 해양 사이버 보안 · 스마트십 전문성 정립 | IACS UR E26 / E27 규제 대응 구조 연구 |
| en | Maritime cybersecurity and Smart Ship focus | Research into IACS UR E26 / E27 compliance structures |
| zh | 确立海事网络安全与智能船舶专业能力 | 研究IACS UR E26 / E27法规合规结构 |
| ja | 海事サイバーセキュリティ・スマートシップの専門性確立 | IACS UR E26 / E27規制対応構造の研究 |

**2025**

| 로케일 | 제목 | 한 줄 |
|---|---|---|
| ko | ㈜광명마리타임 출범 | 해양 전문 컨설팅 기업으로 출범 |
| en | Gwangmyung Maritime launched | Launched as a maritime consultancy |
| zh | 光明海事成立 | 作为海事专业咨询公司成立 |
| ja | 光明マリタイム発足 | 海事専門コンサルティング企業として発足 |

- 현재 ko "㈜광명 마리타임"(띄어씀), en "Gwangmyung Maritime Corporation", zh "光明海事公司成立", ja "光明 マリタイム 株式会社 設立"을 모두 고친 값입니다.

**2026 — 목표**

| 로케일 | 라벨 (연도 옆) | 제목 | 한 줄 |
|---|---|---|---|
| ko | 목표 | E26 / E27 대응 중심으로 조직 개편 | 주요 선급의 IACS UR E27 형식 승인(TA) 취득 및 E26 산출물 제공 |
| en | Goal | Reorganising around E26 / E27 compliance | IACS UR E27 type approval (TA) with major class societies, and delivery of E26 deliverables |
| zh | 目标 | 围绕 E26 / E27 应对进行组织调整 | 在主要船级社取得 IACS UR E27 型式认可（TA），并提供 E26 交付物 |
| ja | 目標 | E26 / E27対応を中心に組織を再編 | 主要船級協会でのIACS UR E27型式承認（TA）取得およびE26成果物の提供 |

- 대표가 달성을 확인하기 전까지 "목표" 라벨을 반드시 붙이고, 시각적으로도 다른 연도와 구분합니다(점선 · 빈 원 등, Task 4 결정).
- `[OWNER: 2026 목표의 TA 취득 주체는 광명마리타임 자체 제품입니까, 고객 공급사의 TA 취득 지원입니까? 이미 달성된 부분이 있습니까?]` 지원이라면(기본 가정으로 권장) 한 줄을 이렇게 바꿉니다: ko "주요 선급의 IACS UR E27 형식 승인(TA) 취득 지원 및 E26 산출물 제공" / en "Supporting IACS UR E27 type approval (TA) with major class societies, and delivering E26 deliverables" / zh "支持在主要船级社取得 IACS UR E27 型式认可（TA），并提供 E26 交付物" / ja "主要船級協会でのIACS UR E27型式承認（TA）取得支援およびE26成果物の提供".

---

## 5. 인사이트 (Insights)

| 로케일 | 제목 | 서브라인 | 전체 보기 라벨 |
|---|---|---|---|
| ko | 인사이트 | 해양 사이버 규제와 사고 사례를 정리합니다. | 전체 보기 (5자) |
| en | Insights | Notes on maritime cyber regulation and incidents. | View all |
| zh | 洞察 | 梳理海事网络法规与事件案例。 | 查看全部 |
| ja | インサイト | 海事サイバー規制とインシデント事例をまとめています。 | すべて見る |

- 서브라인의 근거: `articles/index.json`의 세 글(규제 동향, 위협 사례, E26/E27 개요).
- 눈썹 라벨 "Articles"(`articlesSection.label`)는 없앱니다.

**(선택) 아티클 → 문의 연결 한 줄** — 페르소나 보고서 5절 Quick win. 카드 목록 아래, "전체 보기" 옆에 두고 `#contact`로 연결합니다. 링크 라벨은 히어로 1차 CTA 문구(`hero.ctaSecondary`)를 재사용합니다.

| 로케일 | 문장 |
|---|---|
| ko | 귀사 호선에 어떻게 적용되는지 궁금하시면 문의해 주십시오. |
| en | Want to know how this applies to your ship? Get in touch. |
| zh | 想了解这些如何适用于贵司船舶？欢迎联系我们。 |
| ja | 自社の船舶にどう適用されるか知りたい場合は、お問い合わせください。 |

---

## 6. 문의 (Contact)

"Trust Execution Responsibility Partnership" 대형 문구와 그 위 소개 문단(`contactSection.coreValuesDesc`)은 없앱니다. 그 자리에 이메일(mailto 링크)과 주소를 둡니다.

### 6.1 제목 · 설명

| 로케일 | 제목 (재사용) | 설명 |
|---|---|---|
| ko | 문의하기 | 프로젝트 상담과 기술 문의는 아래 양식이나 info@gmmaritime.com으로 보내 주십시오. |
| en | Contact Us | Send project or technical questions through the form below or to info@gmmaritime.com. |
| zh | 联系我们 | 项目咨询与技术问题，请通过下方表单提交，或发送至 info@gmmaritime.com。 |
| ja | お問い合わせ | プロジェクトのご相談や技術的なお問い合わせは、下記フォームまたはinfo@gmmaritime.comまでお送りください。 |

- 설명 안의 이메일은 `mailto:` 링크로 렌더링합니다(`data-i18n-html="true"` + `<a href="mailto:info@gmmaritime.com">`). 페르소나 B: "메일 주소 눌러서 메일 앱으로 보내고 싶은데 안 눌러지고".
- `[OWNER: 회신 시점(예: 영업일 기준 N일 이내)을 약속할 수 있습니까?]` 약속할 수 없으면 아무것도 쓰지 않습니다(기본값). 약속한다면 설명 아래 한 줄로 추가합니다.
- `[OWNER: 담당자 이름 · 전화번호를 공개하시겠습니까?]` 공개하지 않으면 이메일과 주소만 둡니다(기본값). 공개하면 사실 그대로만 씁니다.

### 6.2 연락처 블록 (양식 옆)

| 로케일 | 이메일 라벨 (재사용) | 이메일 값 (재사용) | 주소 라벨 | 주소 값 (재사용) |
|---|---|---|---|---|
| ko | 이메일 | info@gmmaritime.com | 주소 | 전라북도 군산시 상신6길 12 |
| en | Email | info@gmmaritime.com | Address | 12, Sangsin 6-gil, Gunsan-si, Jeollabuk-do, South Korea |
| zh | 电子邮件 | info@gmmaritime.com | 地址 | 韩国全罗北道群山市桑新6街12号 |
| ja | メールアドレス | info@gmmaritime.com | 所在地 | 韓国 全羅北道 群山市 桑新6ギル12 |

### 6.3 양식 필드 라벨

| 로케일 | 이름 (재사용) | 이메일 (재사용) | 소속(회사) | 역할 | 메시지 (재사용) |
|---|---|---|---|---|---|
| ko | 이름 | 이메일 | 소속(회사) | 역할 | 메시지 |
| en | Name | Email | Company | Your role | Message |
| zh | 姓名 | 电子邮件 | 所属公司 | 您的身份 | 信息 |
| ja | お名前 | メールアドレス | 会社名・所属 | ご立場 | メッセージ |

- 소속(회사)과 역할은 선택 항목으로 권장합니다(모바일 작성 부담, 페르소나 B). 이름 · 이메일 · 메시지 · 동의는 필수입니다.

**역할 선택지** (`<select>`, 첫 항목은 안내 문구)

| 로케일 | 안내 | 선택지 1 | 선택지 2 | 선택지 3 | 선택지 4 |
|---|---|---|---|---|---|
| ko | 역할을 선택해 주십시오 | 조선소 | 선주 · 선박관리회사 | 기자재 공급사 | 기타 |
| en | Select your role | Shipyard | Shipowner or ship manager | Equipment supplier | Other |
| zh | 请选择您的身份 | 船厂 | 船东 · 船舶管理公司 | 设备供应商 | 其他 |
| ja | ご立場を選択してください | 造船所 | 船主・船舶管理会社 | 機器サプライヤー | その他 |

### 6.4 메시지 안내 문구 (placeholder)

| 로케일 | 안내 문구 |
|---|---|
| ko | 예: 선종 · 건조 일정 · 적용 규칙 · 현재 단계(메이커 선정, 승인도면, FAT, 운항) |
| en | e.g. ship type · build schedule · applicable rules · current stage (maker selection, approval drawings, FAT, operation) |
| zh | 例如：船型 · 建造进度 · 适用规则 · 当前阶段（选型、认可图纸、FAT、运营） |
| ja | 例：船種・建造スケジュール・適用規則・現在の段階（メーカー選定、承認図面、FAT、運航） |

- 지금은 textarea가 placeholder로 `contactSection.messageLabel`("메시지")을 쓰고 있습니다. 라벨은 그대로 두고 placeholder만 새 키로 바꿉니다. 시각적으로 숨긴 라벨(`sr-only`)이므로 placeholder가 작성 안내 역할을 합니다.

### 6.5 동의 문구 (변경 없음 — 기존 `contactSection.consentLabel` 그대로)

| 로케일 | 동의 문구 | 링크 (`consentLink`) |
|---|---|---|
| ko | 개인정보 수집 및 이용에 동의합니다. | (내용 보기) |
| en | I agree to the collection and use of my personal data. | (Details) |
| zh | 我同意收集和使用我的个人信息。 | （查看详情） |
| ja | 個人情報の収集および利用に同意します。 | （内容を見る） |

### 6.6 전송 버튼 · 상태 메시지

| 로케일 | 전송 (재사용) | 검증 오류 (값 수정) |
|---|---|---|
| ko | 전송하기 | 필수 항목을 입력해 주십시오. |
| en | Send Message | Please fill in the required fields. |
| zh | 发送消息 | 请填写必填项。 |
| ja | 送信 | 必須項目を入力してください。 |

- 소속 · 역할이 선택 항목이 되므로 "모든 필드를 입력해주세요"를 "필수 항목"으로 바꿉니다. `successMessage`, `errorMessage`, `sending`, `submitAgain`, `consentRequired`는 바꾸지 않습니다.

---

## 7. 내비게이션 라벨 · 푸터 소개 문구

### 7.1 상단 내비 (포지셔닝 2.6)

| 로케일 | Home | Services | Insights | About | Contact | 언어 변경 |
|---|---|---|---|---|---|---|
| ko | 홈 | 서비스 | 인사이트 | 회사 소개 | 문의 | 언어 변경 |
| en | Home | Services | Insights | About | Contact | Change language |
| zh | 首页 | 服务 | 洞察 | 关于我们 | 联系我们 | 更改语言 |
| ja | ホーム | サービス | インサイト | 会社概要 | お問い合わせ | 言語を変更 |

**Services 드롭다운 (네 하위 페이지, 홈 카드와 같은 순서)**

| 로케일 | compliance.html | maritime-cybersecurity.html | system-integration.html | ai-cybersecurity-consulting.html |
|---|---|---|---|---|
| ko | IACS UR E26 / E27 대응 | 선박 사이버 보안 | IT / OT 시스템 통합 | AI 기반 사이버 보안 컨설팅 |
| en | Compliance | Maritime Cybersecurity | System Integration | AI × Cybersecurity Consulting |
| zh | IACS UR E26 / E27 应对 | 船舶网络安全 | IT / OT 系统集成 | AI 网络安全咨询 |
| ja | IACS UR E26 / E27対応 | 船舶サイバーセキュリティ | IT / OTシステム統合 | AIサイバーセキュリティコンサルティング |

- "Expertise", "Vision", "Business", "Competitiveness", "Articles", "About Us"(ko UI의 영문 라벨)는 폐기합니다. "회사 소개"가 가리킬 섹션 id(예: `#journey` 또는 `#why`)는 Task 4 구조 명세가 정합니다.
- 언어 변경은 기존 `footer.changeLanguage` 키를 씁니다(모바일 메뉴가 이미 이 키를 씀).

### 7.2 푸터 소개 문구 (포지셔닝 1.4 확정)

| 로케일 | 소개 문구 |
|---|---|
| ko | IACS UR E26 / E27 대응과 IT / OT 시스템 통합을 설계부터 선급 검사까지 맡는 해양 사이버 보안 컨설팅 기업입니다. |
| en | A maritime cybersecurity consultancy handling IACS UR E26 / E27 compliance and IT / OT system integration from design to class survey. |
| zh | 从设计到船级检验，负责 IACS UR E26 / E27 应对与 IT / OT 系统集成的海事网络安全咨询公司。 |
| ja | 設計から船級検査まで、IACS UR E26 / E27対応とIT / OTシステム統合を担う海事サイバーセキュリティコンサルティング企業です。 |

---

## 8. 키 대응표

### 8.1 문구 → 키

| 절 | 문구 | 키 | 처리 |
|---|---|---|---|
| 1.2 | 히어로 제목 (권장 A) | `home.hero.title` | 신규 (HTML 값) |
| 1.3 | 히어로 서브라인 | `home.hero.subtitle` | 신규 |
| 1.4 | 1차 CTA "문의하기" | `hero.ctaSecondary` | 재사용(값 수정: en "Contact Us" → "Contact us") |
| 1.4 | 2차 텍스트 링크 | `home.hero.secondaryLink` | 신규 |
| 2.1 | 섹션 제목 | `home.services.title` | 신규 |
| 2.1 | 섹션 서브라인 | `home.services.subtitle` | 신규 |
| 2.2 | 카드 1 제목 / 보조 줄 / 설명 | `home.services.compliance.title` / `.tag` / `.desc` | 신규 ×3 |
| 2.2 | 카드 2 제목 / 보조 줄 / 설명 | `home.services.maritimeCyber.title` / `.tag` / `.desc` | 신규 ×3 |
| 2.2 | 카드 3 제목 / 보조 줄 / 설명 | `home.services.systemIntegration.title` / `.tag` / `.desc` | 신규 ×3 |
| 2.2 | 카드 4 제목 / 보조 줄 / 설명 | `home.services.aiConsulting.title` / `.tag` / `.desc` | 신규 ×3 |
| 2.3 | 카드 링크 라벨 | `competitivenessSection.cta` | 재사용 |
| 2.4 | (B 선택 시) Compliance 대체 설명 | `home.services.compliance.desc`에 값 교체 | — (키 추가 없음) |
| 3.1 | 섹션 제목 / 서브라인 | `home.why.title` / `home.why.subtitle` | 신규 ×2 |
| 3.2 | 선주 역할명 / 첫 문장 / 상세 | `home.why.owner.title` / `.lead` / `.detail` | 신규 ×3 |
| 3.2 | 조선소 역할명 / 첫 문장 / 상세 | `home.why.shipyard.title` / `.lead` / `.detail` | 신규 ×3 |
| 3.2 | 공급사 역할명 / 첫 문장 / 상세 | `home.why.supplier.title` / `.lead` / `.detail` | 신규 ×3 |
| 3.2 | 선주 산출물 줄 | `compliance.delivOwnerSummary` | 재사용 |
| 3.2 | 조선소 산출물 줄 | `compliance.delivIntegrationSummary` | 재사용 |
| 3.2 | 공급사 산출물 줄 | `compliance.delivSupplierSummary` | 재사용 |
| 3.2 | 블록 링크 라벨 | `home.why.linkLabel` | 신규 |
| 3.3 | 선급 제목 | `home.why.classTitle` | 신규 |
| 3.3 | 선급 목록 | `about.supportScopeIACSList` | 재사용(값 수정: "등"/"etc."/"など" 삭제, IRClass · ClassNK 표기) |
| 3.3 | 선급 고지 문구 | `home.why.classNote` | 신규 |
| 3.3 | 로고 흐름 멈춤 / 재생 | `about.marqueePause` / `about.marqueePlay` | 재사용 ×2 |
| 3.4 | 표준 줄 제목 | `home.why.standardsTitle` | 신규 |
| 3.4 | 표준 항목 5개 | (HTML 고정, 키 없음) | — |
| 3.4 | 기관 줄 제목 | `home.why.bodiesTitle` | 신규 |
| 3.4 | 기관 목록 | `about.supportScopeInternationalList` | 재사용(값 수정: 로케일별 풀이 추가) |
| 4.1 | 연혁 제목 | `expertise.title` | 재사용(값 수정: ko 띄어쓰기, en sentence case, ja 띄어쓰기) |
| 4.2 | 연도 2021–2026 | `expertise.timeline2021` … `expertise.timeline2026` | 재사용 ×6 |
| 4.2 | 2021 제목 / 한 줄 | `expertise.timeline2021Title` / `…2021Desc` | 재사용(값 수정: en만) ×2 |
| 4.2 | 2022 제목 / 한 줄 | `expertise.timeline2022Title` / `…2022Desc` | 재사용(값 수정) ×2 |
| 4.2 | 2023 제목 / 한 줄 | `expertise.timeline2023Title` / `…2023Desc` | 재사용(값 수정) ×2 |
| 4.2 | 2024 제목 / 한 줄 | `expertise.timeline2024Title` / `…2024Desc` | 재사용(값 수정) ×2 |
| 4.2 | 2025 제목 / 한 줄 | `expertise.timeline2025Title` / `…2025Desc` | 재사용(값 수정) ×2 |
| 4.2 | 2026 제목 / 한 줄 | `expertise.timeline2026Title` / `…2026Desc` | 재사용(값 수정) ×2 |
| 4.2 | 2026 "목표" 라벨 | `home.journey.goalLabel` | 신규 |
| 5 | 인사이트 제목 | `articlesSection.title` | 재사용(값 수정) |
| 5 | 인사이트 서브라인 | `articlesSection.subtitle` | 재사용(값 수정) |
| 5 | 전체 보기 | `articlesSection.viewAll` | 재사용(값 수정) |
| 5 | (선택) 문의 연결 한 줄 | `home.insights.contactPrompt` | 신규 |
| 6.1 | 문의 제목 | `contactSection.title` | 재사용 |
| 6.1 | 문의 설명 | `contactSection.description` | 재사용(값 수정, HTML 값) |
| 6.2 | 이메일 라벨 / 값 | `contactSection.emailLabel` / `footer.email` | 재사용 ×2 (emailLabel은 6.3과 같은 키) |
| 6.2 | 주소 라벨 | `home.contact.addressLabel` | 신규 |
| 6.2 | 주소 값 | `footer.address` | 재사용 |
| 6.3 | 이름 / 메시지 라벨 | `contactSection.nameLabel` / `contactSection.messageLabel` | 재사용 ×2 |
| 6.3 | 소속(회사) 라벨 | `home.contact.companyLabel` | 신규 |
| 6.3 | 역할 라벨 / 안내 | `home.contact.roleLabel` / `home.contact.rolePlaceholder` | 신규 ×2 |
| 6.3 | 역할 선택지 4개 | `home.contact.roleShipyard` / `roleOwner` / `roleSupplier` / `roleOther` | 신규 ×4 |
| 6.4 | 메시지 안내 문구 | `home.contact.messagePlaceholder` | 신규 |
| 6.5 | 동의 문구 / 링크 / 미동의 오류 | `contactSection.consentLabel` / `consentLink` / `consentRequired` | 재사용 ×3 |
| 6.6 | 전송 / 전송 중 / 다시 전송 | `contactSection.submitButton` / `sending` / `submitAgain` | 재사용 ×3 |
| 6.6 | 성공 / 실패 / 닫기 | `contactSection.successMessage` / `errorMessage` / `close` | 재사용 ×3 |
| 6.6 | 검증 오류 | `contactSection.validationError` | 재사용(값 수정) |
| 7.1 | Home / Insights / About / Contact | `nav.home` / `nav.articles` / `nav.aboutUs` / `nav.contact` | 재사용(값 수정) ×4 |
| 7.1 | Services | `nav.services` | 신규 (내비는 전 페이지 공용이므로 `home.*`가 아닌 `nav.*`에 둠) |
| 7.1 | 드롭다운 4개 | `nav.compliance` / `nav.maritimeCybersecurity` / `nav.systemIntegration` / `nav.aiConsulting` | 재사용(값 수정) ×4 |
| 7.1 | 언어 변경 | `footer.changeLanguage` | 재사용(값 수정: en "Change Language" → "Change language") |
| 7.2 | 푸터 소개 문구 | `footer.description` | 재사용(값 수정) |

**합계**: 신규 키 45개(`home.*` 44개 + `nav.services` 1개, 선택 항목 `home.insights.contactPrompt` 포함) · 재사용 키 58개(값 그대로 27개, 값 수정 31개).

- 값 그대로 27개: `competitivenessSection.cta`, `compliance.delivOwnerSummary` · `delivIntegrationSummary` · `delivSupplierSummary`, `expertise.timeline2021`–`2026`(6), `contactSection.title` · `nameLabel` · `emailLabel` · `messageLabel` · `submitButton` · `sending` · `submitAgain` · `successMessage` · `errorMessage` · `close` · `consentLabel` · `consentLink` · `consentRequired`(13), `footer.email` · `footer.address`, `about.marqueePause` · `about.marqueePlay`.
- 값 수정 31개: `hero.ctaSecondary`, `expertise.title`, `expertise.timeline20xxTitle/Desc`(12), `articlesSection.title` · `subtitle` · `viewAll`, `contactSection.description` · `validationError`, `about.supportScopeIACSList` · `supportScopeInternationalList`, `footer.description` · `changeLanguage`, `nav.home` · `articles` · `aboutUs` · `contact` · `compliance` · `maritimeCybersecurity` · `systemIntegration` · `aiConsulting`.
- `nav.*` 드롭다운 라벨과 `footer.*` 값은 모든 페이지에 적용되므로, 하위 페이지에서도 바뀐 라벨이 보입니다(의도한 변경).
- 네 로케일의 키 집합은 같아야 합니다. en의 `home.services.*.tag`는 빈 문자열 `""`로 둡니다.

### 8.2 홈페이지 개편 후 쓰지 않게 되는 기존 키

아래는 현재 `index.html`과 `components/navbar.html`에서 쓰이며 새 홈페이지에서는 쓰이지 않는 키입니다. 다른 페이지 사용 여부는 이 작업에서 전수 검색하지 않았으므로, 삭제 전에 저장소 전체에서 키를 검색해 확인하십시오. 삭제할 때는 네 로케일 모두에서 지웁니다.

- `hero.badge`, `hero.title`, `hero.description`
- `expertise.subtitle`
- `vision.*` 전체 14개: `title`, `description`, `card1Title`–`card4Title`, `card1Desc`–`card4Desc`, `visionLabel`, `visionTitle`, `visionDesc`
- `systemIntegration.title`, `systemIntegration.subtitle`, `platformDevTitle`, `platformDevBoxTitle`, `platformDevBullet1`, `platformDevBullet2`, `maritimeConsultingTitle`, `maritimeConsultingBoxTitle`, `maritimeConsultingSubtitle`, `maritimeConsultingBullet1` (10개; 나머지 `systemIntegration.*`는 `system-integration.html`이 쓰는지 확인 후 판단)
- `competitivenessSection.label`, `title`, `subtitle`, `card1Title`–`card4Title`, `card1Desc`–`card4Desc` (11개; `cta`는 재사용)
- `articlesSection.label`
- `about.title`, `about.subtitle`, `about.coreCompetenciesTitle`, `about.service1Title`–`service4Title`, `about.service1Desc`–`service4Desc`, `about.supportScopeTitle`, `about.supportScopeIACS`, `about.supportScopeInternational`, `about.supportScopeStandards`, `about.supportScopeClassLiaison`, `about.coreValuesTitle`, `about.coreValue1`–`coreValue4`, `about.coreValue1Desc`–`coreValue4Desc` (25개; `supportScopeIACSList` · `supportScopeInternationalList` · `marqueePause` · `marqueePlay`는 재사용)
- `contactSection.coreValuesTitle`, `contactSection.coreValuesDesc`
- `nav.expertise`, `nav.business`, `nav.vision`, `nav.competitiveness`

이 덱의 범위 밖이지만 함께 볼 것: `footer.service1`–`service4`("OT Security Architecture" 등 영문 항목, 링크 아님)는 네 하위 페이지 이름 · 링크로 바꾸는 것이 자연스럽습니다(페르소나 보고서 5절). `nav.backToOverview` ko "Overview로 돌아가기"는 Global Constraints 3에 걸립니다(권장 "홈으로 돌아가기"). 둘 다 Task 4 / 5에서 결정합니다.

---

## 9. 열린 [OWNER] 항목

| # | 질문 | 확인 전 기본값 (답이 "아니오" / 미확인일 때 쓰는 문구) | 관련 절 |
|---|---|---|---|
| 1 | ㈜끌밋과 광명마리타임의 관계는 전신 / 모회사 / 관계사 중 무엇입니까? | "㈜끌밋 법인 설립 및 데이터 · 플랫폼 기반 시스템 개발 시작" + HTML 주석. 관계를 쓰지 않음 | 4.2 |
| 2 | 2026 목표의 TA 취득 주체는 자체 제품입니까, 고객 공급사 지원입니까? 이미 달성한 부분이 있습니까? | "목표" 라벨 유지. 한 줄은 현재 문구, 지원으로 확인되면 "…취득 지원…" 문구 | 4.2 |
| 3 | 등기상 정식 국문 · 영문 법인명은 무엇입니까? | 2025 ko "㈜광명마리타임 출범", en은 법인 형태 없이 "Gwangmyung Maritime launched" | 4.2 |
| 4 | 회신 시점을 약속할 수 있습니까? | 아무것도 쓰지 않음 | 6.1 |
| 5 | 담당자 이름 · 전화번호를 공개하시겠습니까? | 이메일과 주소만 표시 | 6.1, 6.2 |
| 6 | 로고 `ncsc.jpg`는 어느 기관입니까(한국 국가사이버안보센터?)? | 기관 목록에서 뺌 | 3.4 |
| 7 | 11개 외에 대응 가능한 선급(예: Türk Loydu)이 있습니까? | 11개만 표기, "등" 없음 | 3.3 |
| 8 | `compliance.html`의 "For System Integration" 산출물(UR E26 · 6개 실증 산출물 + FAT 입회)을 조선소 몫으로 소개해도 됩니까? | 조선소 블록의 산출물 줄로 사용(시스템 통합 주체 = 조선소로 해석). 아니라면 조선소 블록에서 산출물 줄을 빼고 상세 한 줄만 둠 | 3.2 |
| 9 | 히어로 제목 A / B 중 무엇을 쓰시겠습니까? | 권장안 A "선박 사이버 보안, 설계부터 선급 검사까지." | 1.2 |

---

## 10. 사업 영역 (Stage 3, `index.html#business`)

Stage 3에서 홈페이지 히어로 바로 아래에 추가한 섹션입니다. 키는 `home.business.*`이며 네 로케일 모두 있습니다. ko는 대표 확정 문구, en / zh / ja는 포지셔닝 2절 표기 규칙에 따른 번역입니다.

| 슬롯 | 키 | ko | en |
|---|---|---|---|
| 제목 | `home.business.title` | 사업 영역 | Business areas |
| 서브라인 | `home.business.subtitle` | 조선 · 해양 산업의 운영 현장에서 출발해, 플랫폼 구축부터 규제 대응까지 이어집니다. | We start from day-to-day operations in shipbuilding and maritime, and carry the work from platform builds through to regulatory compliance. |
| 1행 제목 | `home.business.platform.title` | 플랫폼 개발 · 구축 | Platform development and implementation |
| 1행 본문 | `home.business.platform.body` | 공공 · 민간 · 해양 분야의 IT / OT 플랫폼을 설계하고 구축합니다. 데이터 · AI 기반 운영 시스템과 글로벌 표준을 따르는 데이터 관리 체계를 포함합니다. | We design and build IT / OT platforms for the public, private and maritime sectors. This includes data- and AI-based operating systems and data management frameworks that follow global standards. |
| 1행 링크 (`#contact`, 문의 모달) | `home.business.platform.link` | 문의하기 | Contact us |
| 2행 제목 | `home.business.cyber.title` | 해양 사이버 보안 · 컴플라이언스 | Maritime cybersecurity and compliance |
| 2행 본문 | `home.business.cyber.body` | 선박 사이버 보안을 설계 단계부터 선급 검사까지 한 팀이 이어서 맡습니다. IACS UR E26 / E27 대응, OT 보안 구조, 선급 제출 문서 체계를 다룹니다. | One team carries ship cybersecurity from the design stage through to class survey. We cover IACS UR E26 / E27 compliance, OT security architecture and the document set for class submission. |
| 2행 링크 (`services.html`) | `home.business.cyber.link` | 서비스 보기 | View services |
| 3행 제목 | `home.business.data.title` | 데이터 · AI 기반 운영 | Data- and AI-based operations |
| 3행 본문 | `home.business.data.body` | AI 기반 보안 운영(SecOps)과 데이터 분석을 선박과 운영 시스템에 적용합니다. 설계 · 검증 · 운영 단계의 판단을 데이터로 뒷받침합니다. | We apply AI-based security operations (SecOps) and data analysis to ships and operating systems. Data backs the decisions made at the design, verification and operation stages. |
| 3행 링크 (`ai-cybersecurity-consulting.html`) | `home.business.data.link` | 자세히 보기 | Learn more |

zh · ja 문구는 `data/translations.json`의 같은 키를 보십시오.

같은 단계에서 히어로는 `hero.title` / `hero.description` / `hero.ctaSecondary`(5d64ea9 문구 복원, ko 설명은 "광명마리타임", "대응합니다"로 표기 수정)로 돌아갔고, 8.2절에 적힌 `hero.title` · `hero.description`은 다시 쓰입니다. 예전 홈페이지의 `home.hero.*` · `home.services.*` · `home.why.*`는 `services.html`이 그대로 씁니다.

