# 광명마리타임 홈페이지 카피 덱 (ko / en / zh / ja)

> Gwangmyung Maritime — Homepage copy deck · Stage 2 Task 3
> 작성일: 2026-10-09 · 기준 문서: `docs/brand/positioning.md`(이하 "포지셔닝"), `docs/research/persona-walkthrough-2026-10-09.md`(이하 "페르소나 보고서"), `data/translations.json`
> 이 문서는 구현(Task 5)에서 그대로 옮겨 쓰는 최종 문구입니다. `[OWNER: …]` 항목은 대표 확인 전까지 표시된 기본값을 씁니다. 2026-10-17 대표 회신으로 확정된 항목은 9절 "확정 사항"에 모았습니다.

## 0. 읽는 법과 공통 규칙

- 각 문구 블록은 ko / en / zh / ja 네 행의 표입니다. 여러 필드가 있는 블록(카드 등)은 열을 필드로 나눕니다.
- 회사명: ko **광명마리타임**, en **Gwangmyung Maritime**, zh **光明海事**, ja **光明マリタイム**. 법인 표기 "㈜"는 연혁 2021 · 2025 항목에서만 씁니다.
- 규정 표기: 화면 첫 언급은 **IACS UR E26 / E27**(슬래시 앞뒤 한 칸), 이후 "E26 / E27", "UR E26", "UR E27".
- zh · ja는 전각 문장부호(，。：（）、) 뒤에 띄어쓰기를 두지 않습니다. 이 문서에서 새로 쓴 ja 문자열에는 구절 단위 띄어쓰기를 넣지 않았습니다. 값이 바뀌지 않고 재사용되는 기존 ja 문자열(예: 연혁 2022 · 2023 설명)은 현재 띄어쓰기를 그대로 둡니다.
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

- TA · SoC · SoF는 홈페이지에서 쓰지 않습니다(포지셔닝 4.2. SoC · SoF 정식 명칭은 확인 불가 — 대표 회신 2026-10-17 — 미사용 유지). 공급사는 링크로 `compliance.html`의 해당 설명에 도달합니다.

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

- 한 줄로 쓸 때의 형태: "대응 가능한 선급: ABS, DNV, …, CRS". 목록 끝의 "등" / "etc." / "など"는 뺍니다(11개 외 대응 선급 없음 — 대표 확인 2026-10-17).
- 로고 `alt`는 포지셔닝 2.4의 정식 영문명(예: "Lloyd's Register", "Indian Register of Shipping", "Nippon Kaiji Kyokai (ClassNK)")을 씁니다. 현재 `alt="IR Class"`, `alt="KR"`도 바꿉니다.

### 3.4 참조 표준 · 가이드라인 (표준 줄과 기관 줄)

포지셔닝 6.2에 따라 표준과 기관을 두 줄로 나눕니다. 기관은 로고 없이 텍스트 목록으로만 씁니다(NSA · UK NCSC · USCG · CSA 로고 제거. 예전 `ncsc.jpg`는 영국 NCSC 로고였음이 확인되어 — 대표 회신 2026-10-17 — 아래 목록의 "UK NCSC"가 그 기관입니다. 목록 변경 없음, 이미지 복원 없음).

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
| ko | 기술 기반 사업의 출발 | ㈜끌밋 법인 설립 — 광명마리타임의 전신 — 데이터 · 플랫폼 기반 시스템 개발 시작 |
| en | Foundation of a technology business | Geulmit founded — the predecessor of Gwangmyung Maritime — and data and platform system development begins |
| zh | 基于技术的业务起步 | 设立Geulmit法人（光明海事的前身），开始基于数据和平台的系统开发 |
| ja | 技術 ベース 事業の スタート | Geulmit法人設立（光明マリタイムの前身）、データ・プラットフォーム基盤のシステム開発を開始 |

- ㈜끌밋은 광명마리타임의 **전신**입니다(대표 확인 2026-10-17). 위 한 줄은 포지셔닝 6.3이 규정한 형태에 "전신"을 넣어 확정한 값이며, `about.html`의 `<!-- [OWNER] 끌밋과 광명마리타임의 관계 확인 필요 -->` 주석은 지웠습니다.
- 확인 전 중립 문구 "㈜끌밋 법인 설립 및 데이터 · 플랫폼 기반 시스템 개발 시작"(en "Geulmit founded, and data and platform system development begins")은 더 쓰지 않습니다.

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
- 2026 목표의 TA 취득 주체는 광명마리타임 **자체 제품**입니다(대표 확인 2026-10-17). 위 한 줄("… 형식 승인(TA) 취득 …")을 그대로 쓰고, "취득 지원" 문구로 바꾸지 않습니다. 달성 여부는 확인되지 않았으므로 "목표" 라벨을 유지합니다. `about.html`의 `<!-- [OWNER] 2026 목표의 TA 취득 주체 확인 필요 (CD 9 #2) -->` 주석은 지웠습니다.

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
| 10 | `zeroTrust.experience.disclaimer`(수행 경험 고지)의 문구 — **문구 제안 대기** | 현재 문구 그대로. `zero-trust.html`의 `<!-- [OWNER] confirm the wording of this disclaimer -->` 주석 유지 | 12 |
| 4 | 회신 시점을 약속할 수 있습니까? (2026-10-17 회신에 없음) | 아무것도 쓰지 않음 | 6.1 |
| 5 | 담당자 이름 · 전화번호를 공개하시겠습니까? (2026-10-17 회신에 없음) | 이메일과 주소만 표시 | 6.1, 6.2 |
| 8 | `compliance.html`의 "For System Integration" 산출물(UR E26 · 6개 실증 산출물 + FAT 입회)을 조선소 몫으로 소개해도 됩니까? (2026-10-17 회신에 없음) | 조선소 블록의 산출물 줄로 사용(시스템 통합 주체 = 조선소로 해석). 아니라면 조선소 블록에서 산출물 줄을 빼고 상세 한 줄만 둠. `maritime.html`의 `[OWNER]` 주석 유지 | 3.2 |

### 확정 사항 (대표 회신 2026-10-17)

| # | 질문 | 답 | 반영 |
|---|---|---|---|
| 1 | ㈜끌밋과 광명마리타임의 관계 | **전신** | 4.2 2021 한 줄 확정(ko · en · zh · ja), `expertise.timeline2021Desc` 4개 로케일 반영, HTML 주석 제거 |
| 2 | 2026 목표의 TA 취득 주체 | **광명마리타임 자체 제품** | 4.2 2026 한 줄 현재 문구 유지, "취득 지원" 대안 폐기. 달성 여부 미확인 → "목표" 라벨 유지 |
| 3 | 등기상 영문 법인명 | 법인 형태 접미사 **미포함** — "Gwangmyung Maritime" | 11절. "Co., Ltd." · "Corporation" 금지. 국문은 연혁 · 법적 고지에서만 "㈜광명마리타임" |
| 6 | 로고 `ncsc.jpg`는 어느 기관인가 | **영국 NCSC(UK NCSC)** — 한국 국가사이버안보센터가 아님 | 3.4 기관 목록의 "UK NCSC"가 이미 그 기관이므로 목록 변경 없음(NCSC 계속 표기). 이미지 복원 없음, 파일 삭제 없음 |
| 7 | 11개 외 대응 가능한 선급 | **없음** | 3.3 11개 목록 확정, "등" / "etc." / "など" 없음 |
| 9 | 히어로 제목 A / B | Stage 3(2026-10-09) 대표 결정 — 홈페이지 히어로는 넓은 회사 정의 문구(`hero.title`) 사용 | 포지셔닝 1절 Stage 3 note, 10절 |
| — | SoC · SoF 정식 명칭 | **확인 불가** | 미사용 유지(3.2). 홈페이지에 쓰지 않음 |
| — | 개인정보 보호책임자 성명 · 직위 | 현재 이메일만 표기하는 형태 **유지** | `privacy-policy.html` 변경 없음 |
| — | privacy@gmmaritime.com | **실제 운영 중인 메일함** | 그대로 사용 |

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
| 3행 링크 (`ai-cybersecurity-consulting.html`) | `home.business.data.link` | AI 컨설팅 보기 (Stage 4) | View AI consulting |

zh · ja 문구는 `data/translations.json`의 같은 키를 보십시오.

같은 단계에서 히어로는 `hero.title` / `hero.description` / `hero.ctaSecondary`(5d64ea9 문구 복원, ko 설명은 "광명마리타임", "대응합니다"로 표기 수정)로 돌아갔고, 8.2절에 적힌 `hero.title` · `hero.description`은 다시 쓰입니다. 예전 홈페이지의 `home.hero.*` · `home.services.*` · `home.why.*`는 `services.html`이 그대로 씁니다.

---

## 11. 회사 소개 페이지 (Stage 4, `about.html`)

Stage 4에서 홈페이지의 걸어온 길을 옮겨 만든 하위 페이지입니다. 새 키는 `about.*`이며 네 로케일 모두 있습니다. 회사명은 포지셔닝 2.1절, 선급 · 표준 표기는 2.2 · 2.4절을 따릅니다. 핵심 가치 네 항목은 예전 사이트(`5d64ea9`의 `about.coreValue1`–`4`, `*Desc`) 문구를 다시 씁니다(ja는 단어 사이 공백을 지웠고, en 설명은 문장형 대소문자로 바꿨습니다).

- 회사명의 영문 법인 형태: 등기상 영문 법인명은 법인 형태 접미사 없이 "Gwangmyung Maritime"입니다(대표 확인 2026-10-17). 페이지에는 "Gwangmyung Maritime"만 쓰고 "Co., Ltd." · "Corporation"을 붙이지 않습니다.
- 영업시간은 확인된 정보가 없어 쓰지 않습니다.

### 11.1 개요 (`#overview`)

| 슬롯 | 키 | ko | en | zh | ja |
|---|---|---|---|---|---|
| `<h1>` | `about.overview.title` | 회사 소개 | About | 关于我们 | 会社概要 |
| 리드 | `about.overview.lede` | 광명마리타임은 조선 · 해양 산업의 플랫폼 개발, 시스템 통합, 글로벌 규제 대응을 맡는 기술 기업입니다. | Gwangmyung Maritime is a technology company handling platform development, system integration and global regulatory compliance for the shipbuilding and maritime industries. | 光明海事是一家承担造船 · 海事行业平台开发、系统集成与全球法规合规的技术企业。 | 光明マリタイムは、造船・海事産業のプラットフォーム開発、システム統合、グローバル規制対応を担う技術企業です。 |
| 회사명 라벨 | `about.facts.nameLabel` | 회사명 | Company name | 公司名称 | 会社名 |
| 회사명 값 | `about.facts.nameValue` | 주식회사 광명마리타임 / Gwangmyung Maritime | (같음) | 光明海事（주식회사 광명마리타임）/ Gwangmyung Maritime | 光明マリタイム（주식회사 광명마리타임）/ Gwangmyung Maritime |
| 출범 라벨 | `about.facts.launchLabel` | 출범 | Launched | 成立 | 発足 |
| 출범 값 | `about.facts.launchValue` | 2025년 | 2025 | 2025年 | 2025年 |
| 소재지 라벨 | `about.facts.addressLabel` | 소재지 | Address | 地址 | 所在地 |
| 소재지 값 | `footer.address` (재사용) | 전라북도 군산시 상신6길 12 | — | — | — |
| 사업자등록번호 라벨 | `about.facts.businessNumberLabel` | 사업자등록번호 | Business registration no. | 营业执照号码 | 事業者登録番号 |
| 사업자등록번호 값 | (번역 없음) | 391-81-02164 | — | — | — |
| 이메일 | `contactSection.emailLabel`, `footer.email` (재사용) | 이메일 · info@gmmaritime.com | — | — | — |

`footer.businessNumberLabel`("사업자 등록번호: ")은 끝에 쌍점이 붙어 있어 정의 목록 라벨로는 새 키를 씁니다.

### 11.2 핵심 가치 (`#values`)

ko UI는 한국어 낱말이 제목이고 영어 낱말이 보조 줄입니다. en UI는 보조 줄을 비웁니다(`empty:hidden`).

| 키 접두 | 제목 `.name` (ko / en / zh / ja) | 보조 줄 `.tag` (en은 빈 문자열) | 설명 `.desc` ko | en | zh | ja |
|---|---|---|---|---|---|---|
| `about.values.title` | 핵심 가치 / Core values / 核心价值 / コアバリュー | — | — | — | — | — |
| `about.values.trust` | 신뢰 / Trust / 信任 / 信頼 | Trust | 신뢰를 기반으로 한 파트너십 | Partnership based on trust | 基于信任的伙伴关系 | 信頼を基盤としたパートナーシップ |
| `about.values.execution` | 실행 / Execution / 执行 / 実行 | Execution | 실행력 있는 프로젝트 수행 | Project execution with excellence | 卓越的项目执行 | 実行力あるプロジェクト遂行 |
| `about.values.responsibility` | 책임 / Responsibility / 责任 / 責任 | Responsibility | 책임감 있는 기술 지원 | Responsible technical support | 负责任的技术支持 | 責任感ある技術サポート |
| `about.values.partnership` | 협력 / Partnership / 合作 / 協力 | Partnership | 상생하는 협력 관계 | Collaborative win-win relationships | 合作共赢的关系 | 共生する協力関係 |

### 11.3 걸어온 길 (`#journey`)

홈페이지에서 옮긴 그대로입니다. 키는 `expertise.title`, `expertise.timeline2021`–`2026`(`*Title`, `*Desc`), `home.journey.goalLabel`(4절과 같음).

### 11.4 대응 가능한 선급 · 참조 표준 (`#scope`)

| 슬롯 | 키 | ko | en | zh | ja |
|---|---|---|---|---|---|
| 섹션 제목 | `about.scope.title` | 대응 가능한 선급 · 참조 표준 | Class societies and reference standards | 可支持的船级社 · 参考标准 | 対応可能な船級協会・参照標準 |

그 아래 블록은 `services.html#why`와 같은 키를 씁니다: `home.why.classTitle`, `about.marqueePause` / `about.marqueePlay`, `about.supportScopeIACSList`, `home.why.classNote`, `home.why.standardsTitle`, `home.why.bodiesTitle`, `about.supportScopeInternationalList`.

### 11.4a 홈 · 대응 가능한 선급 (`#classes`)

홈페이지의 얇은 선급 띠입니다. 제목은 `home.why.classTitle`, 약어 줄은 `about.supportScopeIACSList`, 고지는 `home.why.classNote`를 그대로 씁니다. 참조 표준 칩과 가이드라인 기관 문구는 넣지 않습니다. `about.html#scope`는 같은 문구에서 로고 흐름만 뺍니다.

| 슬롯 | 키 | ko | en | zh | ja |
|---|---|---|---|---|---|
| 한 줄 설명 | `home.classes.lede` | IACS 선급의 사이버 복원력 규칙에 맞춰 설계부터 선급 검사까지 대응합니다. | We work to each IACS society's cyber-resilience rules, from design through class survey. | 按照各 IACS 船级社的网络韧性规范，从设计到船级检验全程对应。 | 各IACS船級協会のサイバーレジリエンス規則に沿って、設計から船級検査まで対応します。 |

### 11.5 오시는 길 · 연락처 (`#location`)

| 슬롯 | 키 | ko | en | zh | ja |
|---|---|---|---|---|---|
| 섹션 제목 | `about.location.title` | 오시는 길 · 연락처 | Location and contact | 位置与联系方式 | 所在地・連絡先 |
| 지도 링크 (Google 지도, 새 탭) | `about.location.mapLink` | 지도에서 보기 | View on map | 在地图上查看 | 地図で見る |
| 주소 · 이메일 | `home.contact.addressLabel`, `footer.address`, `contactSection.emailLabel`, `footer.email` (재사용) | | | | |
| 버튼 (문의 모달) | `hero.ctaSecondary` (재사용) | 문의하기 | Contact us | 联系我们 | お問い合わせ |

### 11.6 같은 단계에서 바뀐 기존 키

| 키 | ko | en | zh | ja |
|---|---|---|---|---|
| `home.business.data.link` | AI 컨설팅 보기 | View AI consulting | 查看 AI 咨询 | AIコンサルティングを見る |
| `nav.backToOverview` | 서비스 개요로 돌아가기 | Back to services overview | 返回服务概览 | サービス概要に戻る |

## 12. 제로 트러스트 전환 컨설팅 페이지 (Stage 7, `zero-trust.html`)

Stage 7에서 추가한 다섯 번째 서비스 페이지입니다. 원문은 대표 제공 자료이며, 자료에 없는 수치 · 고객명 · 성과는 쓰지 않습니다. 수행 경험은 회사가 아니라 구성원의 이전 소속 실적이며, 페이지가 그 사실을 먼저 밝힙니다. 새 키는 `zeroTrust.*`, `nav.zeroTrust`, `home.services.zeroTrust.*`이고, 바뀐 값은 `home.services.subtitle`, `home.business.platform.body` · `.link`입니다. Pillar 이름 · 역량 약어(IGA, MFA, ZTNA 등)는 번역하지 않는 고정 영문이며 HTML에만 있습니다.

- `[OWNER]` 수행 경험 고지 문장(`zeroTrust.experience.disclaimer`)의 문구 — 문구 제안 대기(2026-10-17). 제안 전까지 현재 문구를 그대로 둡니다.
- ja 페이지 본문은 문서 머리의 표기 규칙대로 구절 단위 띄어쓰기를 넣지 않았습니다. `nav.zeroTrust` ja만 계획서 지정값 "ゼロトラスト コンサルティング"을 씁니다.

| 키 | ko | en | zh | ja |
|---|---|---|---|---|
| `nav.zeroTrust` | 제로 트러스트 컨설팅 | Zero Trust Consulting | 零信任咨询 | ゼロトラスト コンサルティング |
| `zeroTrust.hero.kicker` | Zero Trust · 공공 · 민간 IT | Zero Trust · Public and private-sector IT | Zero Trust · 公共与民间 IT | Zero Trust · 公共・民間IT |
| `zeroTrust.hero.title` | 경계를 믿지 않습니다. 접근마다 다시 검증합니다. | We don't trust the perimeter. We re-verify every access. | 不信任边界。每一次访问都重新验证。 | 境界を信頼しません。アクセスのたびに検証し直します。 |
| `zeroTrust.hero.lede` | 경계 중심의 내부망 보안에서 벗어나 사용자 · 단말 · 접근 상황을 지속적으로 검증하고, 시스템 간 접근을 최소화하는 제로 트러스트 체계로 전환해 침해 발생 시 피해 확산을 조기에 차단합니다. | We move internal network security off the perimeter and onto a Zero Trust model that continuously verifies users, devices and access context and minimises access between systems, so a breach is contained early before it spreads. | 摆脱以边界为中心的内网安全，转向持续验证用户、终端与访问情境、并将系统间访问降至最低的零信任体系，在发生入侵时尽早阻断损害扩散。 | 境界中心の内部ネットワークセキュリティから脱却し、ユーザー・端末・アクセス状況を継続的に検証してシステム間のアクセスを最小化するゼロトラスト体制へ移行することで、侵害発生時の被害拡大を早期に遮断します。 |
| `zeroTrust.hero.ctaAssessment` | 진단 항목 보기 | See the assessment | 查看诊断项目 | 診断項目を見る |
| `zeroTrust.assessment.title` | 성숙도 진단 | Maturity assessment | 成熟度诊断 | 成熟度診断 |
| `zeroTrust.assessment.lead` | CISA 제로 트러스트 성숙도 모델(ZTMM)을 기반으로 개발한 진단 도구로 6개 Pillar, 총 45개 항목을 평가합니다. 성숙도는 영역별로 네 단계로 판정합니다. | Our assessment tool, built on the CISA Zero Trust Maturity Model (ZTMM), evaluates 45 items across six pillars. Maturity is rated in four stages for each area. | 以基于 CISA 零信任成熟度模型（ZTMM）开发的诊断工具，评估 6 个 Pillar 共 45 个项目。成熟度按领域分四个阶段判定。 | CISAゼロトラスト成熟度モデル（ZTMM）に基づいて開発した診断ツールで、6つのPillar、計45項目を評価します。成熟度は領域ごとに4段階で判定します。 |
| `zeroTrust.assessment.scaleAria` | 성숙도 네 단계 | Four maturity stages | 成熟度四个阶段 | 成熟度の4段階 |
| `zeroTrust.assessment.level1` | Traditional(기존) | Traditional | Traditional（传统） | Traditional（従来） |
| `zeroTrust.assessment.level2` | Developing(초기) | Developing | Developing（初始） | Developing（初期） |
| `zeroTrust.assessment.level3` | Enhancing(향상) | Enhancing | Enhancing（提升） | Enhancing（向上） |
| `zeroTrust.assessment.level4` | Optimal(최적화) | Optimal | Optimal（最优） | Optimal（最適化） |
| `zeroTrust.matrix.caption` | Zero Trust 기술 역량 | Zero Trust technical capabilities | Zero Trust 技术能力 | Zero Trust技術能力 |
| `zeroTrust.matrix.aria` | Zero Trust 기술 역량: Identity, Device, Application, Network & Infrastructure, Data의 5개 Pillar별 역량과 그 아래를 받치는 Telemetry & Analytics, Automation & Orchestration | Zero Trust technical capabilities: the capabilities of five pillars (Identity, Device, Application, Network & Infrastructure, Data), underpinned by Telemetry & Analytics and Automation & Orchestration | Zero Trust 技术能力：Identity、Device、Application、Network & Infrastructure、Data 五个 Pillar 的各项能力，以及支撑其下的 Telemetry & Analytics、Automation & Orchestration | Zero Trust技術能力：Identity、Device、Application、Network & Infrastructure、Dataの5つのPillarごとの能力と、それを下支えするTelemetry & Analytics、Automation & Orchestration |
| `zeroTrust.matrix.identityGloss` | 신원 | (빈 문자열) | 身份 | アイデンティティ |
| `zeroTrust.matrix.deviceGloss` | 단말 | (빈 문자열) | 终端 | 端末 |
| `zeroTrust.matrix.applicationGloss` | 애플리케이션 | (빈 문자열) | 应用 | アプリケーション |
| `zeroTrust.matrix.networkGloss` | 네트워크 · 인프라 | (빈 문자열) | 网络与基础设施 | ネットワーク・インフラ |
| `zeroTrust.matrix.dataGloss` | 데이터 | (빈 문자열) | 数据 | データ |
| `zeroTrust.matrix.telemetryGloss` | 가시성 · 분석, 자동화 · 오케스트레이션 | (빈 문자열) | 遥测与分析、自动化与编排 | テレメトリ・分析、自動化・オーケストレーション |
| `zeroTrust.current.title` | 전형적인 기업의 현재 수준 | Where a typical organisation stands today | 典型企业的现状 | 典型的な企業の現状 |
| `zeroTrust.current.identity` | 신원 · 권한 통합관리 체계 부재, IDC와 클라우드 간 인증체계 이원화 | No integrated identity and privilege management; separate authentication for the IDC and the cloud | 缺乏身份与权限统一管理体系，IDC 与云之间的认证体系分为两套 | ID・権限の統合管理体制がなく、IDCとクラウドで認証体系が二元化 |
| `zeroTrust.current.device` | 단말 보안 상태가 접근 결정에 반영되지 않음, 신규 자산 발견 · 인벤토리 자동화 미흡 | Device security posture is not reflected in access decisions; discovery and inventory of new assets are poorly automated | 终端安全状态未反映到访问决策中，新资产发现与资产清单自动化不足 | 端末のセキュリティ状態がアクセス判断に反映されず、新規資産の発見・インベントリの自動化が不十分 |
| `zeroTrust.current.application` | 최초 인증 이후 지속 승인 · 재검증 미흡, 오픈소스 취약점 · 라이선스 관리 미흡 | Little continuous authorisation or re-verification after first sign-in; weak management of open-source vulnerabilities and licences | 首次认证后的持续授权与再验证不足，开源漏洞与许可证管理不足 | 初回認証後の継続的な承認・再検証が不十分で、オープンソースの脆弱性・ライセンス管理も不十分 |
| `zeroTrust.current.network` | 경계성 보안 중심, 방화벽 정책 변경 · 검증 자동화 미흡 | Perimeter-centred security; firewall policy changes and verification are poorly automated | 以边界安全为中心，防火墙策略变更与验证自动化不足 | 境界型セキュリティが中心で、ファイアウォールポリシーの変更・検証の自動化が不十分 |
| `zeroTrust.current.data` | 중요정보 보안 분류체계 미약 | A weak security classification scheme for sensitive information | 重要信息的安全分类体系薄弱 | 重要情報のセキュリティ分類体系が脆弱 |
| `zeroTrust.approach.title` | 전환 접근 방법 | How we approach the transition | 转型方法 | 移行のアプローチ |
| `zeroTrust.approach.premiseLabel` | 대전제 | Core premise | 大前提 | 大前提 |
| `zeroTrust.approach.premise` | IAM · SSO · PAM을 통한 중앙집중형 권한관리 체계 확립 | Establish centralised privilege management through IAM, SSO and PAM | 通过 IAM、SSO、PAM 建立集中式权限管理体系 | IAM・SSO・PAMによる中央集中型の権限管理体制の確立 |
| `zeroTrust.approach.additionLabel` | 추가 사항 | In addition | 补充事项 | 追加事項 |
| `zeroTrust.approach.addition` | Micro Segmentation 등 시스템 · 워크로드 · 프로세스 세분화를 구현하는 특화 솔루션 도입 · 정착 | Introduce and embed specialised solutions, such as Micro Segmentation, that segment systems, workloads and processes | 引入并落地 Micro Segmentation 等实现系统、工作负载、进程细分的专用解决方案 | Micro Segmentationなど、システム・ワークロード・プロセスの細分化を実現する特化ソリューションの導入・定着 |
| `zeroTrust.approach.caseTitle` | 국내 금융사 적용 사례 분석 | Case analysis: a Korean financial institution | 韩国金融机构应用案例分析 | 韓国の金融機関における適用事例の分析 |
| `zeroTrust.approach.caseSummary` | 기존 IAM · SSO · PAM 기반 중앙집중형 권한관리 체계에 Micro Segmentation을 결합해, 사용자 인증 · 권한 통제를 실제 운영 시스템 · 워크로드 · 프로세스 간 통신 통제로 확장한 사례입니다. | This case combined Micro Segmentation with an existing IAM, SSO and PAM-based centralised privilege management framework, extending user authentication and privilege control into control of the communication between live systems, workloads and processes. | 该案例在原有基于 IAM、SSO、PAM 的集中式权限管理体系上结合 Micro Segmentation，将用户认证与权限控制扩展到实际运营系统、工作负载、进程之间的通信控制。 | 既存のIAM・SSO・PAMに基づく中央集中型の権限管理体制にMicro Segmentationを組み合わせ、ユーザー認証・権限統制を実際の運用システム・ワークロード・プロセス間の通信統制へ拡張した事例です。 |
| `zeroTrust.approach.taskLabel` | 과제 | Task | 课题 | 課題 |
| `zeroTrust.approach.detailLabel` | 내용 | What was done | 内容 | 内容 |
| `zeroTrust.approach.noteLabel` | 고려사항 | Considerations | 注意事项 | 考慮事項 |
| `zeroTrust.approach.task1Title` | 내부통신 가시성 확보 | Visibility into internal traffic | 确保内部通信可见性 | 内部通信の可視性確保 |
| `zeroTrust.approach.task1Detail` | 서버 · 클라우드 워크로드 · 사용자 단말에 에이전트를 적용해 실제 통신 흐름 수집, 서버 간 연결과 애플리케이션 · 프로세스 단위 통신 및 미등록 자산 식별 | Agents on servers, cloud workloads and user devices collect the actual traffic flows and identify server-to-server connections, application- and process-level communication, and unregistered assets | 在服务器、云工作负载、用户终端部署代理，收集实际通信流量，识别服务器间连接、应用与进程级通信以及未登记资产 | サーバー・クラウドワークロード・ユーザー端末にエージェントを適用して実際の通信フローを収集し、サーバー間の接続、アプリケーション・プロセス単位の通信、未登録資産を識別 |
| `zeroTrust.approach.task1Note` | 도입 초기 차단 정책 적용 시 업무 중단 가능성을 줄이기 위해 통신 흐름 분석에 충분한 공수 투입 | Put enough effort into traffic-flow analysis to reduce the risk of business disruption when blocking policies are first applied | 为降低导入初期应用阻断策略时业务中断的可能性，在通信流量分析上投入充足工作量 | 導入初期に遮断ポリシーを適用した際の業務停止の可能性を減らすため、通信フローの分析に十分な工数を投入 |
| `zeroTrust.approach.task2Title` | 업무 기반의 논리적 그룹화 | Business-based logical grouping | 基于业务的逻辑分组 | 業務に基づく論理的なグループ化 |
| `zeroTrust.approach.task2Detail` | 부서 · 업무 · 애플리케이션 · OS · 서버 역할 · 중요도 등 속성을 라벨로 정의, 복잡한 IP · 네트워크 구조를 업무 의미 중심의 논리 그룹으로 분류 | Attributes such as department, business function, application, OS, server role and criticality are defined as labels, sorting a complex IP and network structure into logical groups that carry business meaning | 将部门、业务、应用、OS、服务器角色、重要性等属性定义为标签，把复杂的 IP 与网络结构划分为以业务含义为中心的逻辑组 | 部署・業務・アプリケーション・OS・サーバーの役割・重要度などの属性をラベルとして定義し、複雑なIP・ネットワーク構造を業務上の意味を軸とした論理グループに分類 |
| `zeroTrust.approach.task2Note` | 라벨 부착 시 업무정보 · 자산관리 정보와 교차 대조해 정합성 확인 | When attaching labels, cross-check them against business and asset-management records to confirm consistency | 贴标签时与业务信息、资产管理信息交叉核对，确认一致性 | ラベル付与時は業務情報・資産管理情報と突き合わせて整合性を確認 |
| `zeroTrust.approach.task3Title` | 중앙 권한 정보와 통신정책 연계 | Linking central privilege data to communication policy | 中央权限信息与通信策略联动 | 中央の権限情報と通信ポリシーの連携 |
| `zeroTrust.approach.task3Detail` | 기존 사용자 · 로그인 ID · 역할 · 특권정보 활용, 사용자별 접근 가능 URL · IP · 대상 시스템을 ACL로 구성, 중앙 권한관리를 Micro Segmentation 정책에 실시간 반영 | Existing user, login ID, role and privilege data are used to build ACLs of the URLs, IPs and target systems each user may reach, so central privilege management is reflected in Micro Segmentation policy in real time | 利用现有用户、登录 ID、角色、特权信息，将每个用户可访问的 URL、IP、目标系统构建为 ACL，使中央权限管理实时反映到 Micro Segmentation 策略中 | 既存のユーザー・ログインID・ロール・特権情報を活用し、ユーザーごとにアクセス可能なURL・IP・対象システムをACLとして構成、中央の権限管理をMicro Segmentationのポリシーにリアルタイムで反映 |
| `zeroTrust.approach.task3Note` | 입사 · 이동 · 퇴사 · 직무변경이 IAM 권한 변경과 ACL에 신속히 반영되도록 연계 관리 | Keep the link managed so that joiners, movers, leavers and role changes reach IAM privileges and ACLs quickly | 联动管理入职、调岗、离职、职务变更，使其迅速反映到 IAM 权限变更与 ACL 中 | 入社・異動・退職・職務変更がIAMの権限変更とACLに迅速に反映されるよう連携して管理 |
| `zeroTrust.approach.task4Title` | 워크로드 · 프로세스 단위 최소권한 통제 | Least-privilege control per workload and process | 以工作负载、进程为单位的最小权限控制 | ワークロード・プロセス単位の最小権限統制 |
| `zeroTrust.approach.task4Detail` | 서버 · 애플리케이션 · 워크로드 · 프로세스 간 필요 통신만 허용, 관리자 접근도 지정 단말 · 접근경로 · 대상 서버 · 포트 · 프로세스로 세분화, 외부 침입자와 내부 비인가 접근 · 인접 시스템 횡적 이동 차단 | Only the communication needed between servers, applications, workloads and processes is allowed; administrator access is narrowed to designated devices, access paths, target servers, ports and processes, blocking outside intruders, unauthorised internal access and lateral movement to adjacent systems | 服务器、应用、工作负载、进程之间仅允许必要通信，管理员访问也细分到指定终端、访问路径、目标服务器、端口、进程，阻断外部入侵者、内部未授权访问及向相邻系统的横向移动 | サーバー・アプリケーション・ワークロード・プロセス間で必要な通信のみを許可し、管理者アクセスも指定端末・アクセス経路・対象サーバー・ポート・プロセス単位に細分化、外部侵入者と内部の不正アクセス・隣接システムへの横展開を遮断 |
| `zeroTrust.approach.task4Note` | 중요 업무 · 관리자 접근은 승인 · 예외 · 만료 기한 등에 대한 통제된 정책으로 관리 | Manage critical business and administrator access through controlled policies covering approval, exceptions and expiry dates | 重要业务与管理员访问通过涵盖审批、例外、到期期限等的受控策略进行管理 | 重要業務・管理者アクセスは承認・例外・有効期限などを定めた統制されたポリシーで管理 |
| `zeroTrust.approach.task5Title` | 단계적 정책 적용 및 운영 고도화 | Phased policy rollout and maturing operations | 分阶段应用策略并提升运营水平 | 段階的なポリシー適用と運用の高度化 |
| `zeroTrust.approach.task5Detail` | 라벨 · 정책 템플릿 · 자동 정책 추천으로 운영 복잡도 완화, 향후 AI 기반 정책관리 및 탐지 · 대응 자동화 확장 기반 마련 | Labels, policy templates and automatic policy recommendations ease operational complexity and lay the groundwork for AI-based policy management and automated detection and response later | 通过标签、策略模板、自动策略推荐降低运营复杂度，为今后扩展基于 AI 的策略管理及检测与响应自动化奠定基础 | ラベル・ポリシーテンプレート・自動ポリシー推奨で運用の複雑さを緩和し、今後のAIによるポリシー管理と検知・対応の自動化へ拡張する基盤を整備 |
| `zeroTrust.approach.task5Note` | 정책 위반 · 횡적 이동 · 비인가 접근 이벤트를 SIEM으로 수집하고 반복 대응은 SOAR 플레이북과 연계 | Collect policy-violation, lateral-movement and unauthorised-access events in the SIEM, and link repeat responses to SOAR playbooks | 将策略违规、横向移动、未授权访问事件收集到 SIEM，重复性响应与 SOAR 剧本联动 | ポリシー違反・横展開・不正アクセスのイベントをSIEMで収集し、繰り返しの対応はSOARのプレイブックと連携 |
| `zeroTrust.approach.effectsLabel` | 적용 효과 | Outcomes | 应用效果 | 適用効果 |
| `zeroTrust.approach.effect1` | 내부 통신 · 미등록 자산 가시성 확보 | Visibility into internal traffic and unregistered assets | 内部通信与未登记资产可见 | 内部通信・未登録資産の可視化 |
| `zeroTrust.approach.effect2` | IAM · PAM 권한의 실제 통신정책 집행 | IAM and PAM privileges enforced as live communication policy | IAM、PAM 权限落实为实际通信策略 | IAM・PAM権限を実際の通信ポリシーとして執行 |
| `zeroTrust.approach.effect3` | 워크로드 · 프로세스 단위 최소권한 구현 | Least privilege at workload and process level | 实现工作负载、进程级最小权限 | ワークロード・プロセス単位の最小権限を実現 |
| `zeroTrust.approach.effect4` | 침해 시 횡적 이동 · 영향범위 최소화 | Lateral movement and blast radius minimised in a breach | 入侵时横向移动与影响范围最小化 | 侵害時の横展開・影響範囲を最小化 |
| `zeroTrust.approach.effect5` | 온프레미스 · 클라우드 통합 ZTA 기반 확보 | A foundation for unified on-premises and cloud ZTA | 奠定本地与云统一的 ZTA 基础 | オンプレミス・クラウド統合ZTAの基盤を確保 |
| `zeroTrust.success.title` | 성공 요인과 시사점 | Success factors and implications | 成功因素与启示 | 成功要因と示唆 |
| `zeroTrust.success.factorLabel` | 성공 요인 | Success factor | 成功因素 | 成功要因 |
| `zeroTrust.success.implicationLabel` | 시사점 | Implication | 启示 | 示唆 |
| `zeroTrust.success.s1Title` | 기존 통제방안 활용 및 연계 | Use and connect existing controls | 利用并联动现有控制手段 | 既存の統制手段の活用と連携 |
| `zeroTrust.success.s1Factor` | 기존 IAM · SSO · PAM 정보를 공통 정책 기준으로 활용해 워크로드 접근통제로 확장 | Existing IAM, SSO and PAM data served as the common policy basis and was extended to workload access control | 以现有 IAM、SSO、PAM 信息作为共同策略基准，扩展到工作负载访问控制 | 既存のIAM・SSO・PAMの情報を共通のポリシー基準として活用し、ワークロードのアクセス制御へ拡張 |
| `zeroTrust.success.s1Implication` | Micro Segmentation 도입 시 기존 Identity 정보 · Risk 정보를 공유하는 통합 정책 구조로 설계하는 Zero Trust 설계 지향 | When introducing Micro Segmentation, aim for a Zero Trust design: an integrated policy structure that shares existing Identity and Risk data | 导入 Micro Segmentation 时，以共享现有 Identity 信息与 Risk 信息的统一策略结构进行设计，追求 Zero Trust 设计 | Micro Segmentation導入時は、既存のIdentity情報・Risk情報を共有する統合ポリシー構造として設計するZero Trust設計を目指す |
| `zeroTrust.success.s2Title` | 내부 가시성 우선 접근 | Internal visibility first | 内部可见性优先 | 内部の可視性を優先 |
| `zeroTrust.success.s2Factor` | 실제 통신과 애플리케이션 의존관계 우선 파악, 정책 적용 전 시뮬레이션으로 업무 영향과 예외 통신 확인 | Actual traffic and application dependencies were mapped first, and simulation before enforcement confirmed business impact and exception traffic | 优先掌握实际通信与应用依赖关系，在应用策略前通过模拟确认业务影响与例外通信 | 実際の通信とアプリケーションの依存関係を優先して把握し、ポリシー適用前のシミュレーションで業務への影響と例外通信を確認 |
| `zeroTrust.success.s2Implication` | 전사 일괄 적용을 지양하고 침해 영향도가 높은 업무부터 보호구역을 정의해 단계적으로 확장 | Avoid a company-wide rollout in one go; define protected zones starting with the business functions a breach would hurt most, and expand in stages | 避免全公司一次性应用，从入侵影响度高的业务开始定义保护区并分阶段扩展 | 全社一括適用は避け、侵害の影響度が高い業務から保護区域を定義して段階的に拡張 |
| `zeroTrust.success.s3Title` | 유의미한 업무 기반 정책관리 | Policy managed around meaningful business context | 基于有意义业务的策略管理 | 意味のある業務に基づくポリシー管理 |
| `zeroTrust.success.s3Factor` | IP · 포트 중심의 정적 ACL을 업무 · 애플리케이션 · 역할 · 프로세스 중심으로 전환 | Static ACLs built on IPs and ports were shifted to ones built on business functions, applications, roles and processes | 将以 IP、端口为中心的静态 ACL 转变为以业务、应用、角色、进程为中心 | IP・ポート中心の静的なACLを、業務・アプリケーション・ロール・プロセス中心へ転換 |
| `zeroTrust.success.s3Implication` | 업무 · 보안 · 인프라 조직이 공동으로 라벨링 · 허용통신 정책을 확정하고, 예외 관련 만료 · 재승인 정책 합의 | Business, security and infrastructure teams settle labelling and allowed-traffic policy together, and agree expiry and re-approval rules for exceptions | 业务、安全、基础设施部门共同确定标签与允许通信策略，并就例外相关的到期与重新审批策略达成一致 | 業務・セキュリティ・インフラの各組織が共同でラベリング・許可通信ポリシーを確定し、例外の有効期限・再承認ポリシーに合意 |
| `zeroTrust.success.s4Title` | 정책 결정과 집행의 연계 | Link policy decision to enforcement | 策略决策与执行的联动 | ポリシーの決定と執行の連携 |
| `zeroTrust.success.s4Factor` | IAM · PAM은 누가 어떤 권한을 갖는지 결정하고, 솔루션은 그 권한이 어떤 워크로드 · 프로세스까지 적용되는지 연결 | IAM and PAM decide who holds which privileges; the solution connects how far those privileges reach across workloads and processes | IAM、PAM 决定谁拥有何种权限，解决方案则把这些权限连接到其适用的工作负载与进程 | IAM・PAMは誰がどの権限を持つかを決定し、ソリューションはその権限がどのワークロード・プロセスまで適用されるかを結び付ける |
| `zeroTrust.success.s4Implication` | 통신정책 위반을 탐지 · 대응 체계와 연결(정책 위반 이벤트는 SIEM에서 통합, 고위험 시나리오는 SOAR에서 자동 격리 · 차단 · 조사) | Connect communication-policy violations to detection and response (violation events consolidated in the SIEM; high-risk scenarios automatically isolated, blocked and investigated in SOAR) | 将通信策略违规与检测、响应体系相连接（策略违规事件在 SIEM 中整合，高风险场景在 SOAR 中自动隔离、阻断、调查） | 通信ポリシー違反を検知・対応体制と連携（ポリシー違反イベントはSIEMで統合し、高リスクのシナリオはSOARで自動的に隔離・遮断・調査） |
| `zeroTrust.success.s5Title` | 솔루션 도입 우선 목표를 침해 확산 억제에 설정 | Make containing breach spread the first goal | 将解决方案导入的首要目标设定为抑制入侵扩散 | ソリューション導入の最優先目標を侵害拡大の抑止に設定 |
| `zeroTrust.success.s5Factor` | 완전한 예방보다 침해 이후 인접 시스템으로의 확산 통제에 집중, 위협 상황에서도 중요업무 보호구역 유지 | Rather than complete prevention, the focus was on controlling spread to adjacent systems after a breach, keeping critical-business protected zones intact even under threat | 相比完全预防，更专注于控制入侵后向相邻系统的扩散，在威胁情况下也维持重要业务保护区 | 完全な予防よりも侵害後の隣接システムへの拡大の統制に集中し、脅威下でも重要業務の保護区域を維持 |
| `zeroTrust.success.s5Implication` | 도입 효과 측정을 정책 수립 건수가 아닌 위험 감소 기준(예: 불필요 통신경로 제거율)으로 책정 | Measure the effect by risk reduction (e.g. the rate at which unnecessary communication paths are removed), not by the number of policies written | 以风险降低为基准（例：不必要通信路径的清除率）而非策略制定数量来衡量导入效果 | 導入効果の測定は、ポリシーの策定件数ではなくリスク低減の基準（例：不要な通信経路の除去率）で設定 |
| `zeroTrust.architecture.title` | 목표 아키텍처: ZTNA 접근통제 구성 | Target architecture: ZTNA access control | 目标架构：ZTNA 访问控制构成 | 目標アーキテクチャ：ZTNAアクセス制御の構成 |
| `zeroTrust.architecture.lead` | 경계 중심의 내부망 보안에서 벗어나 사용자 · 단말 · 접근 상황을 지속 검증하고, 시스템 간 접근을 최소화하는 체계로 전환합니다. | We move internal network security off the perimeter and onto a model that continuously verifies users, devices and access context and minimises access between systems. | 摆脱以边界为中心的内网安全，转向持续验证用户、终端与访问情境、并将系统间访问降至最低的体系。 | 境界中心の内部ネットワークセキュリティから脱却し、ユーザー・端末・アクセス状況を継続的に検証してシステム間のアクセスを最小化する体制へ移行します。 |
| `zeroTrust.architecture.aria` | ZTNA 접근통제 구성: End-Point의 접근 요청은 PDP 정책 결정과 PEP 정책 집행을 거쳐 Resource에 닿고, PDP는 신원기반 위험평가를 입력으로 받습니다. | ZTNA access control: an End-Point access request passes through the PDP (policy decision) and the PEP (policy enforcement) to reach the Resource; the PDP takes identity-based risk assessment as input. | ZTNA 访问控制构成：End-Point 的访问请求经过 PDP 策略决策与 PEP 策略执行到达 Resource，PDP 以基于身份的风险评估作为输入。 | ZTNAアクセス制御の構成：End-PointのアクセスリクエストはPDP（ポリシー決定）とPEP（ポリシー執行）を経てResourceに到達し、PDPはアイデンティティベースのリスク評価を入力として受け取ります。 |
| `zeroTrust.architecture.pdpLabel` | 정책 결정 | Policy decision | 策略决策 | ポリシー決定 |
| `zeroTrust.architecture.pepLabel` | 정책 집행 | Policy enforcement | 策略执行 | ポリシー執行 |
| `zeroTrust.architecture.endpointUser` | 사용자 | Users | 用户 | ユーザー |
| `zeroTrust.architecture.endpointAdmin` | 관리자 | Administrators | 管理员 | 管理者 |
| `zeroTrust.architecture.endpointDevice` | 디바이스 | Devices | 设备 | デバイス |
| `zeroTrust.architecture.pdp1` | 정책 관리 · 평가 | Policy management and evaluation | 策略管理与评估 | ポリシー管理・評価 |
| `zeroTrust.architecture.pdp2` | 접근요청 정책 분석 | Access-request policy analysis | 访问请求策略分析 | アクセス要求のポリシー分析 |
| `zeroTrust.architecture.pdp3` | 사용자 신원검증 | User identity verification | 用户身份验证 | ユーザーのID検証 |
| `zeroTrust.architecture.pdp4` | 기기 신원검증 | Device identity verification | 设备身份验证 | デバイスのID検証 |
| `zeroTrust.architecture.pdp5` | 감사 · 기록 관리 | Audit and log management | 审计与记录管理 | 監査・記録管理 |
| `zeroTrust.architecture.pdp6` | 실시간 모니터링 | Real-time monitoring | 实时监控 | リアルタイム監視 |
| `zeroTrust.architecture.riskFeed` | 신원기반 위험평가 | Identity-based risk assessment | 基于身份的风险评估 | アイデンティティベースのリスク評価 |
| `zeroTrust.architecture.pepDb` | DB 접근제어 | DB access control | DB 访问控制 | DBアクセス制御 |
| `zeroTrust.architecture.pepUnified` | 통합접근제어 | Unified access control | 统一访问控制 | 統合アクセス制御 |
| `zeroTrust.architecture.pepCloud` | Cloud 접근제어 | Cloud access control | Cloud 访问控制 | Cloudアクセス制御 |
| `zeroTrust.architecture.resourceProd` | 운영망 | Production network | 运营网 | 運用網 |
| `zeroTrust.architecture.resourceDev` | 개발망 | Development network | 开发网 | 開発網 |
| `zeroTrust.architecture.resourceCloud` | 클라우드(AWS) | Cloud (AWS) | 云（AWS） | クラウド（AWS） |
| `zeroTrust.architecture.premiseTitle` | 아키텍처 운영 대전제 | Operating premises | 架构运营大前提 | アーキテクチャ運用の大前提 |
| `zeroTrust.architecture.premise1` | 위치와 네트워크를 신뢰하지 않고 모든 접근을 지속 검증 | Trust no location or network; verify every access continuously | 不信任位置与网络，持续验证所有访问 | 場所とネットワークを信頼せず、すべてのアクセスを継続的に検証 |
| `zeroTrust.architecture.premise2` | 접근 허용 후에도 위험 변화를 감지해 권한을 지속 재평가 | Even after access is granted, detect changes in risk and keep re-evaluating privileges | 即使允许访问后，也检测风险变化并持续重新评估权限 | アクセス許可後もリスクの変化を検知し、権限を継続的に再評価 |
| `zeroTrust.architecture.rolesTitle` | 구성 요소별 역할 | What each component does | 各组成部分的作用 | 構成要素ごとの役割 |
| `zeroTrust.architecture.role1` | 사용자 · 관리자 · 단말 등 모든 접근 주체 식별 | Identifies every access subject: users, administrators and devices | 识别用户、管理员、终端等所有访问主体 | ユーザー・管理者・端末など、すべてのアクセス主体を識別 |
| `zeroTrust.architecture.role2` | 신원 · 단말 · 접근 상황의 위험도 기반 허용 여부 결정 | Decides whether to allow access based on the risk of the identity, device and access context | 基于身份、终端、访问情境的风险度决定是否允许 | ID・端末・アクセス状況のリスク度に基づいて許可の可否を決定 |
| `zeroTrust.architecture.role3` | 정책에서 결정된 최소 접근권한 기반의 접근 허용 | Grants access on the least privilege the policy decided | 基于策略确定的最小访问权限允许访问 | ポリシーで決定された最小アクセス権限に基づいてアクセスを許可 |
| `zeroTrust.architecture.role4` | IDC 서버팜 · 개발망 · 클라우드 망 등 중요자원 통합 보호 | Protects critical resources such as the IDC server farm, development network and cloud network as one | 统一保护 IDC 服务器集群、开发网、云网络等重要资源 | IDCサーバーファーム・開発網・クラウド網などの重要資源を統合的に保護 |
| `zeroTrust.experience.title` | 수행 경험 | Experience | 执行经验 | 遂行経験 |
| `zeroTrust.experience.disclaimer` | 아래 실적은 광명마리타임이 직접 수행한 것이 아니라, 광명마리타임 구성원이 이전 소속에서 수행한 프로젝트입니다. | The projects below were not carried out by Gwangmyung Maritime itself; they are projects that Gwangmyung Maritime members carried out at their previous organisations. | 以下业绩并非光明海事直接执行，而是光明海事成员在此前任职单位执行的项目。 | 以下の実績は光明マリタイムが直接遂行したものではなく、光明マリタイムのメンバーが以前の所属先で遂行したプロジェクトです。 |
| `zeroTrust.experience.item1` | 영호남 지역 대표은행 차세대 정보보안 아키텍처 수립 | Next-generation information security architecture for a leading regional bank in the Yeongnam and Honam regions | 韩国岭南、湖南地区代表性银行的新一代信息安全架构制定 | 嶺南・湖南地域を代表する銀行の次世代情報セキュリティアーキテクチャ策定 |
| `zeroTrust.experience.item2` | 서울 소재 중대형 공금융 기관 정보보호 선진화 전략계획 수립 | Information security advancement strategy plan for a mid-to-large public financial institution in Seoul | 首尔一家中大型公共金融机构的信息保护先进化战略规划制定 | ソウル所在の中・大規模公的金融機関における情報保護高度化戦略計画の策定 |
| `zeroTrust.experience.result` | 제로 트러스트 추진방안 제시 | Zero Trust implementation plan proposed | 提出零信任推进方案 | ゼロトラスト推進方策の提示 |
| `zeroTrust.cta.title` | 내부망 보안을 제로 트러스트로 전환하려 하시나요? | Moving your internal network security to Zero Trust? | 打算将内网安全转向零信任吗？ | 内部ネットワークのセキュリティをゼロトラストへ移行しませんか？ |
| `zeroTrust.cta.desc` | 현재 수준 진단부터 목표 아키텍처와 단계별 전환 계획까지 함께 설계합니다. | We design it with you, from assessing where you stand today to the target architecture and a phased transition plan. | 从现状诊断到目标架构与分阶段转型计划，与您共同设计。 | 現状の診断から目標アーキテクチャ、段階的な移行計画まで、ともに設計します。 |
| `home.business.platform.body` | 공공 · 민간 · 해양 분야의 IT / OT 플랫폼을 설계하고 구축합니다. 데이터 · AI 기반 운영 시스템과 글로벌 표준을 따르는 데이터 관리 체계를 포함합니다. 공공 · 민간 기관의 제로 트러스트 전환 컨설팅도 이 영역에서 맡습니다. | We design and build IT / OT platforms for the public, private and maritime sectors. This includes data- and AI-based operating systems and data management frameworks that follow global standards. Zero Trust transition consulting for public and private-sector organisations also sits in this area. | 为公共、民间及海事领域设计并建设 IT / OT 平台。涵盖基于数据和 AI 的运营系统，以及遵循全球标准的数据管理体系。面向公共与民间机构的零信任转型咨询也属于这一领域。 | 公共・民間・海事分野のIT / OTプラットフォームを設計・構築します。データ・AIに基づく運用システムと、グローバル標準に沿ったデータ管理体制を含みます。公共・民間機関のゼロトラスト移行コンサルティングもこの領域で担います。 |
| `home.business.platform.link` | 제로 트러스트 보기 | View Zero Trust | 查看零信任 | ゼロトラストを見る |
| `home.services.subtitle` | 다섯 가지 일은 하나로 이어집니다. 중심은 IACS UR E26 / E27 대응입니다. | Five services, one thread: IACS UR E26 / E27 compliance. | 五项服务环环相扣，核心是 IACS UR E26 / E27 应对。 | 5つのサービスは一つにつながっています。中心はIACS UR E26 / E27への対応です。 |
| `home.services.zeroTrust.title` | 제로 트러스트 전환 컨설팅 | Zero Trust Consulting | 零信任转型咨询 | ゼロトラスト移行コンサルティング |
| `home.services.zeroTrust.tag` | Zero Trust · 공공 · 민간 IT | (빈 문자열) | Zero Trust · 公共与民间 IT | Zero Trust · 公共・民間IT |
| `home.services.zeroTrust.desc` | CISA 성숙도 진단부터 IAM · SSO · PAM 중앙집중형 권한관리와 Micro Segmentation, ZTNA 목표 아키텍처까지 내부망 보안을 전환합니다. | From a CISA maturity assessment to centralised privilege management with IAM, SSO and PAM, Micro Segmentation and a ZTNA target architecture, we move internal network security to Zero Trust. | 从 CISA 成熟度诊断到基于 IAM、SSO、PAM 的集中式权限管理、Micro Segmentation 与 ZTNA 目标架构，全面转型内网安全。 | CISA成熟度診断から、IAM・SSO・PAMによる中央集中型の権限管理、Micro Segmentation、ZTNA目標アーキテクチャまで、内部ネットワークのセキュリティを転換します。 |

## 13. 두 서비스 분야 — 선박 사이버 보안 / 기업 보안 컨설팅 (Stage 8)

대표 결정으로 서비스 영역을 두 분야로 나눴습니다. `services.html`은 두 분야를 소개하는 허브가 되고, 지금까지의 서비스 개요(히어로 흐름도 · 네 개 서비스 카드 · 왜 광명마리타임인가)는 `maritime.html`(선박 사이버 보안 분야 개요)로 옮겼습니다. 제로 트러스트 컨설팅은 두 번째 분야인 기업 보안 컨설팅에 속합니다.

- 새 키: `nav.groupMaritime`, `nav.groupEnterprise`, `nav.maritimeOverview`, `nav.backToMaritime`, `hub.*`, `home.enterprise.*`.
- 바뀐 값: `home.business.platform.body` · `.link`를 Stage 3 값으로 되돌렸습니다(제로 트러스트 문장 삭제, 링크는 다시 `#contact` "문의하기").
- 삭제한 키: `home.services.otherTitle`, `home.services.otherLead` (`services.html`의 "공공 · 민간 IT 보안 서비스" 블록이 없어지면서 쓰는 곳이 없습니다).
- 재사용: 허브 카드 목록은 `nav.compliance` · `nav.maritimeCybersecurity` · `nav.systemIntegration` · `nav.aiConsulting` · `nav.zeroTrust`, 기업 카드 링크와 홈 `#enterprise` 행 링크는 `competitivenessSection.cta`("자세히 보기"), 홈 `#enterprise` 행 제목 · 본문은 `home.services.zeroTrust.title` · `.desc`, 허브 CTA 띠는 `systemIntegration.ctaTitle` · `ctaDesc` · `hero.ctaSecondary`.
- ja: 분야 이름 "企業セキュリティ コンサルティング"은 내비 라벨의 구절 띄어쓰기 관례를 따릅니다. 허브 본문 문장에는 띄어쓰기를 넣지 않았습니다.

| 키 | ko | en | zh | ja |
|---|---|---|---|---|
| `nav.groupMaritime` | 선박 사이버 보안 | Ship Cybersecurity | 船舶网络安全 | 船舶サイバーセキュリティ |
| `nav.groupEnterprise` | 기업 보안 컨설팅 | Enterprise Security Consulting | 企业安全咨询 | 企業セキュリティ コンサルティング |
| `nav.maritimeOverview` | 분야 개요 | Overview | 领域概览 | 分野概要 |
| `nav.backToMaritime` | 선박 사이버 보안 개요로 돌아가기 | Back to ship cybersecurity overview | 返回船舶网络安全概览 | 船舶サイバーセキュリティ概要に戻る |
| `hub.title` | 선박과 기업, 두 분야의 보안을 설계합니다. | We design security for two fields: ships and enterprises. | 我们为船舶与企业两个领域设计安全体系。 | 船舶と企業、二つの分野のセキュリティを設計します。 |
| `hub.lede` | 조선 · 해양 산업에서는 IACS UR E26 / E27 대응을 중심으로, 공공 · 민간 기관에서는 제로 트러스트 전환을 중심으로 보안 구조를 설계하고 운영합니다. | In shipbuilding and maritime, our work centres on IACS UR E26 / E27 compliance; for public and private organisations, it centres on the move to Zero Trust. In both, we design and operate the security architecture. | 在造船 · 海事行业，以 IACS UR E26 / E27 应对为核心；在公共与民间机构，以零信任转型为核心，设计并运营安全架构。 | 造船・海事産業ではIACS UR E26 / E27対応を中心に、公共・民間機関ではゼロトラスト移行を中心に、セキュリティ構造を設計・運用します。 |
| `hub.maritime.title` | 선박 사이버 보안 | Ship Cybersecurity | 船舶网络安全 | 船舶サイバーセキュリティ |
| `hub.maritime.desc` | 설계부터 선급 검사까지 한 팀이 이어서 맡습니다. IACS UR E26 / E27 대응이 중심입니다. | One team carries the work from design to class survey. IACS UR E26 / E27 compliance is at the centre. | 从设计到船级检验，由同一团队持续负责。核心是 IACS UR E26 / E27 应对。 | 設計から船級検査まで、同じチームが一貫して担います。中心はIACS UR E26 / E27対応です。 |
| `hub.enterprise.title` | 기업 보안 컨설팅 | Enterprise Security Consulting | 企业安全咨询 | 企業セキュリティ コンサルティング |
| `hub.enterprise.desc` | 공공 · 민간 기관의 내부망 보안을 제로 트러스트 체계로 전환합니다. 진단부터 목표 아키텍처까지 함께 설계합니다. | We move the internal network security of public and private organisations to a Zero Trust model, designing it with you from the assessment to the target architecture. | 将公共与民间机构的内网安全转向零信任体系。从诊断到目标架构，与客户共同设计。 | 公共・民間機関の内部ネットワークのセキュリティをゼロトラスト体制へ移行します。診断から目標アーキテクチャまで共に設計します。 |
| `hub.viewField` | 분야 개요 보기 | View the field overview | 查看领域概览 | 分野概要を見る |
| `home.enterprise.title` | 기업 보안 컨설팅 | Enterprise Security Consulting | 企业安全咨询 | 企業セキュリティ コンサルティング |
| `home.enterprise.lede` | 조선 · 해양과는 별개로, 공공 · 민간 기관의 보안 체계를 설계합니다. | Separate from our shipbuilding and maritime work, we design security frameworks for public and private organisations. | 与造船 · 海事业务相互独立，为公共与民间机构设计安全体系。 | 造船・海事とは別に、公共・民間機関のセキュリティ体制を設計します。 |
| `home.business.platform.body` | 공공 · 민간 · 해양 분야의 IT / OT 플랫폼을 설계하고 구축합니다. 데이터 · AI 기반 운영 시스템과 글로벌 표준을 따르는 데이터 관리 체계를 포함합니다. | We design and build IT / OT platforms for the public, private and maritime sectors. This includes data- and AI-based operating systems and data management frameworks that follow global standards. | 为公共、民间及海事领域设计并建设 IT / OT 平台。涵盖基于数据和 AI 的运营系统，以及遵循全球标准的数据管理体系。 | 公共・民間・海事分野のIT / OTプラットフォームを設計・構築します。データ・AIに基づく運用システムと、グローバル標準に沿ったデータ管理体制を含みます。 |
| `home.business.platform.link` | 문의하기 | Contact us | 联系我们 | お問い合わせ |
