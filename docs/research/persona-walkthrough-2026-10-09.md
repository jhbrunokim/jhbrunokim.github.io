# 페르소나 워크스루 — gmmaritime.com 홈페이지 (현행)

작성일: 2026-10-09 · Stage 2 Task 2 · 대상: https://gmmaritime.com/ (한국어 UI)

## 0. 읽기 전에

- 이 문서는 **정성적 시뮬레이션**입니다. 실제 사용자 인터뷰나 분석 데이터가 아니며, 여기 적힌 반응은 검증할 가설입니다. 우선순위도 "실제 문의 데이터로 확인해 볼 순서"로 읽어 주십시오.
- 작업 방식: **라이브 사이트를 Playwright 브라우저로 직접** 보았습니다. 1440×900(데스크톱)과 375×812(모바일)에서 섹션 단위로 스크롤하며 캡처했고, 화면 텍스트는 `innerText`로 추출해 그대로 인용했습니다.
- 언어: 첫 진입 시 일본어로 표시되어(브라우저에 이전 세션의 `preferredLanguage=ja`가 남아 있었음) 언어 모달에서 "韓国 (대한민국)"을 골라 한국어로 전환했습니다. 이 과정 중 같은 브라우저를 다른 세션이 함께 쓰고 있던 흔적(페이지 URL이 localhost로 바뀜)이 있어, **언어 유지 여부는 이 문서에서 판단하지 않습니다.** 라이브 사이트는 아직 IP 기반 국가 감지(`get.geojs.io`) 버전의 `country-detector.js`를 쓰고 있습니다(Stage 1 브랜치의 코드와 다름).
- 쿠키 배너는 이미 거부 상태(`analyticsConsent=denied`)였습니다.
- 회사에 대한 사실은 사이트에 적힌 것만 사용했습니다. 권고는 콘텐츠·레이아웃 변경으로 가능한 것만 담았고, 증거가 없는 곳은 "소유자 확인 필요"로 표시했습니다.

### 데스크톱 화면 구성(1440×900, 전체 높이 8,236px)

| 폴드 | 위치(px) | 섹션 id | 화면 제목 |
|---|---|---|---|
| F1 | 0 | `home` | 히어로 "조선 · 해양 산업의 플랫폼 개발, 시스템 통합, 글로벌 규제 대응 전문 기술 기업" |
| F2 | 914 | `expertise` | "OUR JOURNEY / 광명 마리타임이 걸어온 길" (2021–2026 타임라인) |
| F3 | 2260 | `vision` | "우리가 만드는 가치" 4카드 + "OUR VISION" 인용 패널 |
| F4 | 3257 | `business` | "BUSINESS / 사업 범위" 2박스 |
| F5 | 3986 | `competitiveness` | "COMPETITIVENESS / 핵심 경쟁력" 4카드 |
| F6 | 4657 | `articles` | "ARTICLES / 최신 인사이트" 3카드 |
| F7 | 5293 | `about` | "About Us" + "핵심 역량" 4카드 + "핵심 가치" 4아이콘 |
| F8 | ≈6300 | `about`(하단) | "지원 범위": IACS 선급 로고 흐름, "국제 기관" 로고, "표준 · 프레임워크" 칩 |
| F9 | 7047 | `contact` | 소개 문장 + 대형 "Trust Execution Responsibility Partnership" + 문의 양식 |
| F10 | 7866 | footer | 이메일 · 주소 · 사업자등록번호 · Services 목록 |

모바일(375×812)은 전체 높이 13,505px로, **Compliance 카드가 6,470px(약 8번째 화면), 문의 양식이 12,300px(약 15번째 화면)**에 있습니다. 히어로 사진 콜라주는 모바일에서 숨겨집니다.

---

## 1. 페르소나 A — 조선소 기본설계 엔지니어

```
PERSONA PROFILE
===============
Name:              최준호 (가명)
Age & gender:      38M
Nationality:       한국 (국내 대형 조선소 근무)
Current situation: 기본설계팀(전장·통신) 책임. 신조 호선 선주가 사양 협의에서
                   "E26/E27은 조선소가 알아서 처리해 달라"고 했고, 팀장이
                   "외부 도와줄 업체 몇 군데 알아봐"라고 지시함. 다음 주 사양
                   회의 전에 후보 업체 2~3곳을 정리해야 함.

SEARCH CONTEXT
==============
Google query:      "IACS UR E26 E27 대응 컨설팅"
Arrival source:    Google 자연 검색 → 홈페이지 첫 화면
Sites seen before: 선급(KR·DNV)의 E26/E27 안내 페이지, 대형 SI 업체의 "선박 사이버
                   보안 솔루션" 소개 페이지
Device:            사무실 데스크톱, 1440×900

PSYCHOLOGY
==========
Familiarity level: 선박 설계·선급 승인 절차 High / 사이버 보안 Medium
Urgency:           Weeks (다음 주 사양 회의)
Primary fears:     ① IT 회사가 선급 승인 도면·문서 체계를 모름 ② 범위가 불명확해
                   변경 요청(추가 비용)이 쌓임 ③ FAT 직전에 결함이 드러나 인도 일정이 밀림
Trust triggers:    설계 단계 언어(승인도면, 메이커 선정, FAT), 산출물 목록과 UR 조항 번호,
                   선급 실무 경험의 구체적 흔적
Decision style:    꼼꼼한 비교형. 하지만 첫 화면에서 "우리 일"이 안 보이면 바로 닫음
Attachment:        Avoidant — 사실만 원하고 슬로건·가치 선언에 짜증을 냄

GOAL
====
Success:           "E26 Deliverable과 메이커 E27 대응을 같이 봐 줄 수 있는 업체"를
                   팀장에게 근거와 함께 보고
Contact threshold: 이 회사가 조선소 설계 일정 안에서 무엇을 언제 해 주는지가
                   한 화면에 보이면 바로 이메일 문의
```

### Phase 0 — 도착 전

> "E26/E27 컨설팅으로 검색했으니까, 들어가면 E26/E27 얘기가 바로 나와야지. 선급 안내 자료는 이미 읽었어. 내가 알고 싶은 건 '누가 우리 대신 문서 만들어 주고 메이커들 E27 따라오게 해 주느냐'야. 보안 솔루션 판다는 SI 회사는 이미 하나 봤는데, 장비 팔려는 거지 도면 얘기는 하나도 없더라. 여기도 그러면 바로 닫는다."

**관련성 계약(Relevance contract)**: 첫 3초 안에 "IACS UR E26/E27"이라는 단어와 "조선소/설계/선급 승인"이 함께 보여야 합니다. 그렇지 않으면 이 사람은 이 사이트를 "IT 회사"로 분류합니다.

### Phase 1 — 5초 테스트 (F1, 1440×900)

화면에 보이는 것: 배지 "Ship OT & Cyber Security Specialist", 제목 "조선 · 해양 산업의 플랫폼 개발, 시스템 통합, 글로벌 규제 대응 전문 기술 기업", 부제 "광명 마리타임은 복잡해진 해양 산업과 기술에 대한 이해와 경험으로 데이터와 AI 기반 System Integration 솔루션을 제공하고 Global Compliance 에 대응 합니다.", 주황 버튼 "문의하기", 오른쪽에 컨테이너선·항만 사진 5장. 상단 메뉴는 "Home · Expertise · Vision · Business · Competitiveness · Articles · About Us · Contact"로 모두 영어입니다.

| 질문 | 답 | 판정 |
|---|---|---|
| 이게 뭐지? | "플랫폼 개발… 시스템 통합… 규제 대응" — 세 가지를 다 한다는 IT 회사 | 불명확 |
| 나한테 맞나? | "E26", "E27", "선급", "설계" 어느 단어도 첫 화면에 없음. "글로벌 규제 대응"이 그건가 싶은 추측뿐 | **실패** |
| 뭘 하면 되지? | "문의하기" 하나. 하지만 아직 물어볼 이유가 없음 | 버튼은 명확, 동기는 없음 |

> "플랫폼 개발, 시스템 통합, 규제 대응… 다 한다는 건 아무것도 특별히 안 한다는 거잖아. 'Global Compliance'가 E26 얘기인가? 그럼 그렇게 쓰지. 사진은 다 컨테이너선 항구 사진이고, 이거 그냥 스톡 사진이네. 배지에 'Ship OT & Cyber Security'라고는 써 있는데 제목은 플랫폼 개발이고. 뭐가 진짜야."

**결정적 발견**: 페르소나 A는 5초 테스트의 두 번째 질문("나한테 맞나?")에 답하지 못합니다. 검색어 "E26 E27"과 첫 화면 사이에 연결 고리가 하나도 없습니다.

### Phase 2 — 스크롤

#### F2 — "광명 마리타임이 걸어온 길" (914px)

> "왜 바로 연혁이야. 2021 '㈜끌밋 법인 설립'? 끌밋이 누군데. 광명마리타임이랑 같은 회사야? 2023 '국방부 위성 영상 처리 시스템 구축 사업 참여' — 배랑 상관없네. 2024에서야 'IACS UR E26 / E27 규제 대응 구조 연구'. 연구? 2024년에 연구를 시작했다고? 2025 '㈜광명 마리타임 출범'. 작년에 생긴 회사구나. 2026 '주요 선급 IACS UR E27 TA 취득 및 E26 Deliverable 제공'… 주요 선급이 어디야, 무슨 장비로 TA를 받았다는 거야. 올해 일인데 했다는 건지 할 거라는 건지 모르겠네. 메뉴엔 'Expertise'라고 써 있어서 눌렀더니 연혁이 나오고."

```
ANALYST — F2
==================
Emotional state:  의심(suspicious)
Trust delta:      ↓ — "끌밋"과의 관계 미설명, 2026 항목이 성과인지 목표인지 불명, "연구" 단어가 실무 경험 부재로 읽힘
LIFT assessment:  Anxiety ↑ (주 요인), Relevance ↓ (2021–2023이 조선 설계와 무관)
Cialdini active:  없음
Cialdini missing: Authority — 2026 항목이 사실이면 선급명·대상 시스템이 있어야 권위로 작동. 지금은 모호해서 역효과
Fogg position:    Motivation: Low | Ability: Med | Prompt visible: No (F1의 문의 버튼은 지나감)
CTA reachable:    No (상단 메뉴 "Contact"만 있음)
Technical notes:  메뉴 "Expertise"가 #expertise = 연혁 섹션으로 연결되어 메뉴 이름과 내용이 어긋남
```

#### F3 — "우리가 만드는 가치" + "OUR VISION" (2260px)

> "아, 조선소(Shipyard) 카드가 있네. '디지털 기본설계와 연계된 OT 아키텍처'. 내 일이랑 가까운 말이긴 한데 한 줄이 끝이야. 눌러지지도 않고. 공급사 카드에 'E27 기준에 부합하는 명확한 기술 기준'. 그래서 뭘 해 준다는 거지? 그 아래 큰 패널, '데이터와 거버넌스를 설계하는 산업으로의 전환, 그 중심에 광명마리타임이 있습니다.' 이런 문장은 그냥 건너뛰어."

```
ANALYST — F3
==================
Emotional state:  지루함(bored), 잠깐 관심(조선소 카드)
Trust delta:      → (변화 없음) — 조선소 카드가 관련성을 처음 보여 줬지만 한 줄짜리라 근거가 되지 못함
LIFT assessment:  Clarity ↓ — 역할별 가치가 결과물이 아니라 형용사("안전하고 설명 가능한", "현실적이고 지속 가능한")로 적힘
Cialdini active:  Unity(약함) — "선주/조선소/공급사"를 호명함
Cialdini missing: Authority — 역할별로 무엇을 산출하는지(compliance.html에 이미 있는 내용)가 빠짐
Fogg position:    Motivation: Low→Med | Ability: Med | Prompt visible: No
CTA reachable:    No
Technical notes:  비전 인용문 앞 따옴표가 닫는 따옴표(”)로 렌더링됨: "”데이터와 거버넌스를…"
```

#### F4 — "BUSINESS / 사업 범위" (3257px)

> "'공공 · 민간 · 해양 분야에서 운영이 요구되는 IT / OT 플랫폼의 개발·구축'. 공공 분야? 결국 SI 회사네. 오른쪽 박스 'Maritime Consulting — Smart Ship & Digital Shipyard Consulting'. 그 밑에 'Engineering and Development', 'IACS UR E26 / E27 기반'. 이제야 E26 단어가 나왔는데 불릿 하나야. 여기까지 화면 네 번 내렸다."

```
ANALYST — F4
==================
Emotional state:  답답함(frustrated)
Trust delta:      ↓ — "공공/민간 IT OT 플랫폼"이 첫 번째 박스라 본업이 SI로 읽힘
LIFT assessment:  Relevance ↓, Distraction ↑ — 검색 의도와 무관한 공공 SI가 E26보다 앞에 옴
Cialdini active:  없음
Cialdini missing: Commitment — "우리 호선 단계가 어디냐"를 고르게 하는 작은 입구가 없음
Fogg position:    Motivation: Low | Ability: Med | Prompt visible: No
CTA reachable:    No
Technical notes:  박스 제목이 영어("Platform Development & Deployment", "Maritime Consulting")이고 한국어가 보조로 붙음
```

**거의 떠날 뻔한 순간**: 이 폴드입니다. 페르소나 A는 "공공 · 민간"이라는 단어에서 이 회사를 IT 용역 업체로 분류하고, 탭을 닫을 직전까지 갑니다. 남아 있는 이유는 F3에서 본 "조선소" 카드 한 줄뿐입니다.

#### F5 — "COMPETITIVENESS / 핵심 경쟁력" (3986px)

> "'Compliance — IACS UR E26 / E27 대응 원스톱 서비스'. 이거다. 근데 왜 세 번째 카드야. 첫 번째는 'Structure-first 접근 기반의 해양 IT / OT 시스템 통합' — Structure-first가 뭔데. 네 번째 'Agentic AI SecOps' — 무슨 말인지도 모르겠고 관심도 없어. 일단 Compliance '자세히 보기' 눌러 본다."

```
ANALYST — F5
==================
Emotional state:  호기심(curious) — 페이지에서 처음으로 클릭 의향이 생김
Trust delta:      ↑ (약함) — 검색어와 정확히 일치하는 문구 "IACS UR E26 / E27 대응 원스톱 서비스"
LIFT assessment:  Relevance ↑ (드디어), Clarity ↓ ("Structure-first", "Agentic AI SecOps" 설명 없음)
Cialdini active:  없음 (카드는 링크일 뿐)
Cialdini missing: Authority — 카드 안에 "메이커 선정 → 승인도면 → FAT → 인도" 같은 설계 언어가 하나만 있어도 신뢰가 크게 오름
Fogg position:    Motivation: Med | Ability: High(링크 있음) | Prompt visible: Yes("자세히 보기")
CTA reachable:    No (문의는 여전히 멀고, 대신 하위 페이지로 이탈)
```

**가장 몰입한 순간(홈페이지 안에서)**: 이 폴드의 Compliance 카드입니다.

> 하위 페이지 메모: Compliance 페이지(compliance.html)는 이 페르소나가 원하던 내용을 거의 다 갖고 있습니다. "유형을 늦게 정하면, 일정이 밀립니다.", 단계 "메이커 선정 · 견적 → 승인도면 → FAT → 인도", 시스템 유형 분류(Non-CBS / Out-of-Scope / Exclusion / Target), UR E27 3.1.1–3.1.10 산출물 10종, TA · SoC · SoF 설명. 페르소나 A는 여기서 "아, 이 사람들 도면이랑 FAT를 아는구나"라고 처음으로 신뢰합니다. **문제는 홈페이지에서 이 페이지까지 오는 데 화면 다섯 번과 영어 카드 세 장을 거쳐야 한다는 점입니다.**

#### F6 — "최신 인사이트" (4657px)

> (Compliance 페이지에서 돌아왔다면) "'IACS UR E26/E27 규제 개요와 대응 전략 — 조선소, 선주, 공급사가 준비해야 할 사항'. 글도 쓰는구나. 날짜 보니 최근 거네. 이건 팀장한테 링크 보내기 좋겠다."

```
ANALYST — F6
==================
Emotional state:  안도(reassured)
Trust delta:      ↑ — 2026년 날짜의 규제 글은 "지금 이 분야를 하고 있다"는 증거
LIFT assessment:  Value Prop ↑ (지식 제공)
Cialdini active:  Reciprocity, Authority(약함 — 저자 이름이 카드에 없음)
Cialdini missing: Authority — 저자/검토자 이름
Fogg position:    Motivation: Med | Ability: Med | Prompt visible: No (아티클 → 문의 연결 없음)
CTA reachable:    No
```

#### F7 — "About Us" + "핵심 역량" + "핵심 가치" (5293px)

> "About Us 문장은 아까 사업 범위랑 똑같은 문장이네. '핵심 역량' 네 장, 'E26 / E27 대응 구조 — 선급 승인을 위한 구조 설계 및 기술 컨설팅'. 아까 본 거랑 또 비슷해. 'CBS update & patch 관리'. CBS는 아는데, 모르는 사람도 있겠다. 'Trust · Execution · Responsibility · Partnership'… 이건 패스."

```
ANALYST — F7
==================
Emotional state:  지루함(bored)
Trust delta:      ↓ (약함) — 같은 문장 반복("광명마리타임은 공공 · 민간 · 해양 분야에서…")이 내용 부족으로 읽힘
LIFT assessment:  Distraction ↑ — 사업 범위(F4)·핵심 경쟁력(F5)·핵심 역량(F7)이 같은 서비스를 세 번 설명
Cialdini active:  없음
Cialdini missing: Liking — 사람(대표·엔지니어)의 얼굴이나 이름이 페이지 어디에도 없음
Fogg position:    Motivation: Med | Ability: Med | Prompt visible: No
CTA reachable:    No
```

#### F8 — "지원 범위" (≈6300px)

> "IACS 선급 로고들 흘러가네. CCS, PRS, DNV, LR, ClassNK, KR… '지원 범위'라는 건 이 선급들 승인 대응을 해 봤다는 거야, 할 수 있다는 거야? 그 밑에 '국제 기관' — NSA, 미국 해안경비대, 싱가포르 CSA? 이 회사가 NSA랑 일한다고? 말이 안 되지. 영국 NCSC 로고는 두 번 나오고. 이런 거 보면 오히려 부풀렸나 싶어. 표준 칩 'N2SF', 'ISP · ISMP', 'SC-100 · 200 · 300'은 뭔지 모르겠다."

```
ANALYST — F8
==================
Emotional state:  의심(suspicious)
Trust delta:      ↓↓ — 정부 기관 로고가 "협력" 또는 "인증"처럼 보이는데 근거가 없어 과장으로 읽힘. 같은 UK NCSC 로고가 두 개("UK NCSC", "NCSC") 나란히 있음
LIFT assessment:  Anxiety ↑ (주 요인)
Cialdini active:  Authority(시도했지만 역효과) — 로고 차용형 권위
Cialdini missing: Authority(정직한 형태) — "대응 가능한 선급", "참조한 표준·가이드라인"처럼 관계를 정확히 말하는 표현
Fogg position:    Motivation: Med→Low | Ability: Med | Prompt visible: No
CTA reachable:    No
```

#### F9 — 문의 (7047px)

> "왼쪽에 'Trust Execution Responsibility Partnership'가 화면 반을 차지하고 있네. 오른쪽 양식은 이름, 이메일, 메시지. 전화번호는 없어? 담당자 이름도 없고. 메시지 칸에 뭐라고 써야 하지. 호선 번호랑 선급이랑 시스템 목록 다 적어야 하나? 답은 언제 오는지도 안 써 있고. 일단 아래 이메일 info@gmmaritime.com을 복사해 둔다… 클릭은 안 되네."

```
ANALYST — F9
==================
Emotional state:  망설임(hesitant)
Trust delta:      → — 양식은 깔끔하지만, 무엇을 적어야 하는지와 그 다음에 무슨 일이 일어나는지 안내가 없음
LIFT assessment:  Anxiety ↑ (응답 시점·담당자 불명), Clarity ↓ (메시지 안내 없음)
Cialdini active:  없음
Cialdini missing: Commitment — "조선소 / 선주 / 공급사" 선택 같은 작은 첫 단계
Fogg position:    Motivation: Med | Ability: Med(3칸이지만 메시지 작성 부담이 큼) | Prompt visible: Yes("전송하기")
CTA reachable:    Yes
Technical notes:  footer의 이메일이 mailto 링크가 아님; footer "Services" 4항목이 링크가 아님; 전화번호 없음
```

#### F10 — Footer

> "'전라북도 군산시 상신6길 12', '사업자 등록번호: 391-81-02164'. 실체 있는 회사긴 하네. 군산이면 조선소랑 가깝긴 하고. 그런데 맨 위 제목이랑 여기 'Ship OT 및 사이버 보안 중심의 기술 전문 기업'이랑 다르잖아."

```
ANALYST — F10
==================
Emotional state:  약간 안도
Trust delta:      ↑ (약함) — 주소·사업자등록번호는 실재성 신호
LIFT assessment:  Anxiety ↓ (약함)
Cialdini missing: 이 신호가 맨 아래에만 있음
CTA reachable:    No (이메일이 텍스트)
```

### Phase 3 — 판정 (페르소나 A)

> "홈페이지만 봤으면 '공공 SI 하다가 E26으로 넘어온 신생 회사'로 정리했을 거야. 그런데 Compliance 페이지는 진짜 실무자가 쓴 것 같아. 메이커 선정 단계에서 유형 정한다는 얘기, 승인도면에서 선급 코멘트 반복된다는 얘기는 우리가 실제로 겪는 거거든. 그 페이지를 첫 화면에 걸었으면 바로 연락했지. 지금은… 팀장한테 '후보 3번'으로 올리고, 메일 한 통 보내 보고 답 오는 거 봐서 판단할래."

```
VERDICT — 페르소나 A
=======
Confidence score:     4/10 — 실재하는 회사(주소·사업자번호)지만, 정부 기관 로고와 모호한 2026 항목이 신뢰를 깎음
Clarity score:        3/10 — 홈페이지만으로는 "E26/E27 대응 회사"라는 사실이 다섯 번째 화면에서야 드러남
Relevance score:      4/10 — 검색어와 일치하는 문구가 F5 카드 한 장, 하위 페이지까지 가면 8/10
Would I contact them: Maybe — Compliance 페이지를 본 경우에만, 이메일로 탐색성 질문 1회

Top 3 strengths:
1. Compliance 하위 페이지의 설계 단계 언어(메이커 선정 → 승인도면 → FAT → 인도) — Cialdini:Authority, 실무 지식의 구체성
2. 2026년 날짜의 규제 아티클 3편 — Cialdini:Reciprocity, "지금 이 분야를 한다"는 증거
3. 주소·사업자등록번호 공개 — LIFT:Anxiety ↓ (실재성)

Top 3 weaknesses:
1. 히어로가 "플랫폼 개발, 시스템 통합, 글로벌 규제 대응"으로 E26/E27을 말하지 않음 — LIFT:Relevance, 5초 테스트 실패
2. 같은 서비스 설명이 F4·F5·F7에 세 번 나오고 핵심(Compliance)은 그중 세 번째 카드 — LIFT:Distraction, Clarity
3. NSA·USCG 등 정부 기관 로고와 "목표인지 성과인지 모를" 2026 항목 — LIFT:Anxiety

The moment I almost left:     F4 "공공 · 민간 · 해양 분야에서 운영이 요구되는 IT / OT 플랫폼의 개발·구축"
The moment I was most engaged: F5 Compliance 카드 "IACS UR E26 / E27 대응 원스톱 서비스" → compliance.html
```

---

## 2. 페르소나 B — 선사 공무팀 기술 관리자

```
PERSONA PROFILE
===============
Name:              한서연 (가명)
Age & gender:      46F
Nationality:       한국 (국내 중견 선사, 벌크·탱커 선대 운영)
Current situation: 공무팀 기술 관리자(fleet technical manager). 신조 2척 계약을 앞두고
                   E26 대응을 조선소에만 맡길지, 선주 측 자문사를 따로 둘지 결정해야 함.
                   본부장에게 "외부 자문사 비교안"을 올려야 함.

SEARCH CONTEXT
==============
Google query:      "선박 사이버보안 컨설팅 선주 E26"
Arrival source:    Google 자연 검색
Sites seen before: 선급 계열 자문 서비스 페이지, 해외 해양 사이버 보안 전문 업체 페이지
                   (사례·담당자 프로필·서비스 패키지가 정리돼 있었음)
Device:            출장 이동 중 휴대폰, 375×812

PSYCHOLOGY
==========
Familiarity level: 선박 운항·정비 High / 사이버 규제 Medium / 업체 선정 절차 High
Urgency:           Weeks (신조 계약 일정)
Primary fears:     ① 작은 신생 업체라 프로젝트 중간에 사라짐 ② 선대 전체(기존선 포함)를
                   못 받쳐 줌 ③ 견적 범위가 불명확 ④ 본부장에게 설명할 근거가 없음
Trust triggers:    누가 하는지(사람), 선주 쪽에서 받는 산출물, 비교 가능한 서비스 범위,
                   빠르고 구체적인 연락 창구
Decision style:    체계적 비교형. 첫 방문에서 계약하지 않음. "비교표에 넣을 수 있느냐"가 기준
Attachment:        Secure — 기본 신호가 갖춰지면 신뢰하지만, 과장 신호에는 바로 감점

GOAL
====
Success:           비교표 한 줄을 채울 정보(서비스 범위·선주 산출물·연락 창구) 확보
Contact threshold: "선주 측 대리로 무엇을 해 주는지"가 보이고, 담당자와 바로 말할 길이 있으면 문의
```

### Phase 0 — 도착 전

> "이동 중이라 길게 못 봐. 선주 쪽에서 쓸 자문사 찾는 거니까 '선주'라는 단어가 빨리 보여야 해. 아까 본 해외 업체는 서비스 패키지랑 담당자 사진이 한눈에 나왔는데. 비교표에 넣을 수 있는 수준이면 일단 저장."

**관련성 계약**: 첫 화면에 "선박 사이버 보안"과 "선주(또는 선대 운영)"가 함께 보여야 하고, 모바일에서 한두 번 스크롤 안에 "선주에게 무엇을 해 주는지"가 나와야 합니다.

### Phase 1 — 5초 테스트 (모바일 첫 화면)

화면: 배지 "Ship OT & Cyber Security Specialist", 6줄로 꺾인 제목 "조선 · 해양 / 산업의 / 플랫폼 개발, / 시스템 통합, / 글로벌 규제 대응 / 전문 기술 기업", 부제, "문의하기" 버튼. 부제 줄바꿈 부분에서 띄어쓰기가 사라져 **"경험으로데이터와"**, **"제공하고Global Compliance 에"**로 붙어 보입니다.

| 질문 | 답 | 판정 |
|---|---|---|
| 이게 뭐지? | 해양 IT 회사. 배지로 보면 보안 회사 | 반쯤 |
| 나한테 맞나? | "선주", "선대", "E26" 없음 | **실패** |
| 뭘 하면 되지? | "문의하기" — 무엇을 물을지는 모름 | 불명확 |

> "플랫폼 개발 회사네. 배지는 사이버 보안인데. 글자가 붙어 있네, '경험으로데이터와'. 대충 만든 건가. 일단 내려 본다."

### Phase 2 — 스크롤 (모바일)

#### M1–M2 — 연혁 (870–2380px, 화면 약 2–3)

> "2021 끌밋, 2023 국방부 위성 영상… 2025년에 출범한 회사구나. 2026에 'TA 취득 및 E26 Deliverable 제공'. 1년 된 회사가 벌써? 근거가 있으면 좋겠는데. 신생이면 우리 선대 10년 같이 갈 수 있을까."

```
ANALYST — M1–M2
==================
Emotional state:  걱정(anxious)
Trust delta:      ↓ — "2025 출범"이 업체 지속성 걱정을 직접 건드림. 2026 항목은 근거 없는 주장으로 읽힘
LIFT assessment:  Anxiety ↑
Cialdini missing: Social Proof — 협업 이력이 전혀 없음(소유자 확인 전에는 만들 수 없음)
Fogg position:    Motivation: Low | Ability: Low(모바일에서 연혁이 두 화면 이상) | Prompt visible: No
CTA reachable:    No (햄버거 메뉴 안에만 있음)
```

#### M3–M5 — "우리가 만드는 가치" (2381px~)

> "'선주 (Shipowner) — 안전하고 설명 가능한 선대 보안 구조'. 오, 선주 카드가 맨 앞이네. 근데 '설명 가능한'이 뭐야? 뭘 해 주는지는 없어. 눌러도 아무 데도 안 가."

```
ANALYST — M3–M5
==================
Emotional state:  잠깐 기대 → 실망
Trust delta:      → — 선주를 호명해서 관련성은 올랐지만 결과물이 없음
LIFT assessment:  Relevance ↑ / Clarity ↓
Cialdini active:  Unity(약함)
Cialdini missing: Authority — compliance.html의 "For Ship Management and Operation"(선주 대리 E26 실증 항목) 같은 구체 내용이 여기 연결되지 않음
Fogg position:    Motivation: Med | Ability: Low | Prompt visible: No
CTA reachable:    No
```

**가장 몰입한 순간(페르소나 B)**: 이 "선주 (Shipowner)" 카드입니다. 그리고 그 몰입은 카드가 아무 데도 연결되지 않아 바로 끝납니다.

#### M6–M7 — "사업 범위" (4379px, 화면 약 6)

> "'공공 · 민간 · 해양 분야… IT / OT 플랫폼의 개발·구축'. 공공 SI도 하는구나. 그럼 우리 일은 여러 사업 중 하나겠네. 본부장이 '여기 전문 업체 맞아?' 하고 물어보면 대답이 안 되겠다."

```
ANALYST — M6–M7
==================
Emotional state:  회의적(skeptical)
Trust delta:      ↓ — 전문성 희석
LIFT assessment:  Value Prop ↓ (선주에게 이 회사가 "전문 자문사"인지 "범용 SI"인지 결정 불가)
Fogg position:    Motivation: Low | Ability: Low | Prompt visible: No
CTA reachable:    No
```

**거의 떠날 뻔한 순간(페르소나 B)**: 이 지점입니다. 이동 중 모바일에서 여섯 번째 화면에 "공공 SI"를 읽고 나면, 비교표에 넣을 이유가 사라집니다. 페르소나 B는 여기서 탭을 닫고 "나중에 PC로 다시"로 미룰 가능성이 높습니다. (실제로 다시 오는 비율은 낮습니다.)

#### M8 — "핵심 경쟁력" (5574px, Compliance 카드는 6470px ≈ 화면 8)

> (남아 있었다면) "카드가 한 장씩 세로로 쌓이니까 끝이 없네. Compliance 카드 'IACS UR E26 / E27 대응 원스톱 서비스'. 원스톱이면 선주 쪽도 해 준다는 건가."

```
ANALYST — M8
==================
Emotional state:  피곤함(fatigued)
LIFT assessment:  Distraction ↑ — 4카드 그리드가 모바일에서 4화면 분량 세로 목록이 됨
Fogg position:    Motivation: Med | Ability: Med | Prompt visible: Yes("자세히 보기")
CTA reachable:    No
```

#### M9–M13 — 아티클, About, 핵심 역량, 핵심 가치, 지원 범위 (7146–11597px)

> "아티클은 제목만 보고 저장. About 문장은 또 같은 말. 핵심 가치 아이콘 넘기고… '국제 기관'에 NSA? 해안경비대? 이건 좀. 선급 로고는 괜찮은데, 우리 선대가 KR이랑 DNV니까 그 둘 대응 가능하다는 건 메모."

```
ANALYST — M9–M13
==================
Emotional state:  지루함 → 의심
Trust delta:      ↑(선급 로고, 우리 선급 확인) ↓(정부 기관 로고) — 상쇄 후 순감
LIFT assessment:  Anxiety ↑ (기관 로고), Distraction ↑ (반복 섹션)
Cialdini active:  Authority(선급 로고 — 관계가 "대응 가능"으로 정확히 표현되면 유효)
Fogg position:    Motivation: Med | Ability: Low (문의까지 아직 네 화면) | Prompt visible: No
CTA reachable:    No
```

#### M14–M15 — 문의 (11597px~, 양식 12300px)

> "드디어 양식. 이름, 이메일, 메시지. 담당자 이름도, 전화번호도 없네. 휴대폰으로 긴 메시지 쓰긴 싫은데. 메일 주소 눌러서 메일 앱으로 보내고 싶은데 안 눌러지고."

```
ANALYST — M14–M15
==================
Emotional state:  망설임
Trust delta:      → 
LIFT assessment:  Anxiety ↑ (응답 주체·시점 없음), Ability ↓ (모바일 장문 작성 부담, mailto 없음, 전화 없음)
Cialdini missing: Liking — 사람 이름·얼굴
Fogg position:    Motivation: Med | Ability: Low | Prompt visible: Yes
CTA reachable:    Yes (15번째 화면에서야)
```

### Phase 3 — 판정 (페르소나 B)

> "비교표에 넣긴 할 건데 '정보 부족' 칸이 많아. 서비스 범위는 '원스톱'이라는 말뿐이고, 선주 쪽 산출물은 못 봤고, 누가 하는지도 모르겠고. 회사가 작년에 생겼다는 것만 확실해. 사무실에서 PC로 Compliance 페이지를 다시 보면 달라질 수도 있지만, 오늘은 문의 안 해."

```
VERDICT — 페르소나 B
=======
Confidence score:     3/10 — 신생 회사 + 근거 없는 2026 주장 + 정부 기관 로고 → 과장 의심
Clarity score:        3/10 — 선주에게 무엇을 주는지 홈페이지 어디에도 없음
Relevance score:      4/10 — "선주 (Shipowner)" 카드 한 장, 선급 로고에서 자사 선급 확인
Would I contact them: No (오늘) — 비교표에 "정보 부족"으로 기록, 나중에 PC로 재방문할 수도 있음

Top 3 strengths:
1. "선주 (Shipowner)" 카드가 이해관계자 카드 중 맨 앞 — Cialdini:Unity, LIFT:Relevance
2. IACS 선급 로고 흐름으로 자사 선급(KR·DNV) 대응 확인 — Cialdini:Authority
3. 최근 날짜의 규제 아티클 — Cialdini:Reciprocity

Top 3 weaknesses:
1. 모바일에서 문의 양식이 15번째 화면, Compliance 카드가 8번째 화면 — Fogg:Ability
2. 사람(담당자·대표)과 선주 산출물이 없음 — Cialdini:Liking, Authority 부재
3. "2025 출범" + "2026 TA 취득"(근거 없음) + NSA 로고 — LIFT:Anxiety

The moment I almost left:     M6 "공공 · 민간 · 해양 분야… IT / OT 플랫폼의 개발·구축"
The moment I was most engaged: M3 "선주 (Shipowner) — 안전하고 설명 가능한 선대 보안 구조"
```

---

## 3. 두 페르소나 비교

| 항목 | A: 조선소 기본설계 | B: 선사 기술 관리자 | 시사점 |
|---|---|---|---|
| 첫 화면에 필요한 단어 | E26/E27, 설계, 선급 승인 | 선박 사이버 보안, 선주/선대 | 공통 축: **"선박 사이버 보안 + IACS UR E26/E27"**. 히어로가 둘 다 놓침 |
| 신뢰를 만드는 것 | 설계 단계 언어, 조항 번호, 산출물 목록 | 사람, 선주 측 산출물, 연락 창구 | A는 Authority(구체성), B는 Liking(사람)+Ability |
| 가장 큰 불안 | 승인 일정 지연, 범위 불명확 | 업체 지속성, 과장 | 2026 항목과 기관 로고가 둘 모두에게 감점 |
| 거의 떠난 지점 | F4 "공공 · 민간" | M6 "공공 · 민간" | **같은 문구가 두 사람 모두를 내보냄** |
| 가장 몰입한 지점 | F5 Compliance 카드 | M3 선주 카드 | 역할별 입구(조선소/선주/공급사)가 둘 다를 붙잡음 |
| 문의 여부 | Maybe (하위 페이지를 본 경우) | No (오늘) | 현재 페이지는 "끝까지 파고드는 데스크톱 실무자"만 겨우 전환 |
| 문의 양식에서 필요한 것 | 호선 단계·시스템을 적을 안내 | 짧게 보낼 수 있는 방법, 사람 이름 | 역할 선택 + 짧은 안내 문구가 둘 다를 돕습니다 |

현재 페이지는 **누구에게도 최적화되어 있지 않습니다.** 공공 SI 고객이라는 세 번째 청중을 위해 쓰인 문장(F4, F7)이 두 핵심 구매자의 이탈 지점이 되고 있습니다. 두 페르소나의 요구는 충돌하지 않습니다. A는 깊이를, B는 빠른 입구와 사람을 원하며, "역할별 입구 → 하위 페이지의 깊이"라는 하나의 구조로 둘 다 충족할 수 있습니다.

---

## 4. 문의를 가장 많이 늘릴 다섯 가지 변경 (순위)

순위 기준: 두 페르소나 모두의 이탈·망설임을 얼마나 직접 줄이는지, 그리고 사실을 지어내지 않고 콘텐츠·레이아웃만으로 가능한지.

### 1위 — 히어로를 E26/E27 축으로 다시 쓰고, Compliance로 가는 두 번째 길을 연다

```
Major improvement — 히어로 재작성
Fold: F1 | Framework: LIFT:Relevance, LIFT:Clarity / 5초 테스트
What: 제목을 "플랫폼 개발, 시스템 통합, 글로벌 규제 대응 전문 기술 기업"에서 E26/E27 중심 문장으로
      교체합니다(Global Constraints 11의 A안 "선박 사이버 보안, 설계부터 선급 승인까지." 또는
      B안 "E26/E27 대응을 늦게 시작하면 일정이 밀립니다."). 부제에 "IACS UR E26/E27"과 "IT/OT 시스템
      통합"을 한국어로 명시합니다. 영어 배지 "Ship OT & Cyber Security Specialist"는 "IACS UR E26 / E27"로
      바꾸거나 없앱니다. 주 버튼 "문의하기" 옆에 보조 링크 "단계별 대응 보기 →"(compliance.html)를 둡니다.
      모바일 부제 줄바꿈에서 붙는 글자("경험으로데이터와", "제공하고Global")도 함께 고칩니다.
Why: 두 페르소나 모두 5초 테스트의 "나한테 맞나?"에서 실패했습니다. A는 "Global Compliance가 E26 얘기인가?
     그럼 그렇게 쓰지", B는 "플랫폼 개발 회사네"라고 반응했습니다.
Expected effect: 검색어 "E26 E27"로 들어온 방문자가 첫 화면에서 머물 이유를 얻고, A는 하위 페이지로 곧장
     이동합니다(현재는 다섯 화면 뒤). B 판단은 "IT 회사"에서 "선박 사이버 보안 전문 회사"로 바뀝니다.
```

B안 메모: compliance.html에 이미 "유형을 늦게 정하면, 일정이 밀립니다."라는 문장이 있습니다. A에게는 이 문장이 사이트 전체에서 가장 강한 문장이었습니다("우리가 실제로 겪는 거거든"). 히어로나 바로 다음 섹션에 이 논지를 쓰면 A의 동기(Fogg Motivation)가 첫 화면에서 바로 오릅니다.

### 2위 — "역할별 입구" 섹션: 조선소 · 선주 · 공급사가 각자 받는 것을 보여 주고 하위 페이지로 연결한다

```
Major improvement — 이해관계자 카드를 결과물 중심 입구로
Fold: F3 (현 "우리가 만드는 가치") | Framework: Cialdini:Authority, Cialdini:Unity, Fogg:Motivation
What: "안전하고 설명 가능한 선대 보안 구조" 같은 형용사 문구를, compliance.html에 이미 있는 역할별
      내용으로 바꿉니다. 조선소 → "메이커 선정 · 견적 → 승인도면 → FAT → 인도" 단계와 단계별 위험 평가,
      공급사 → "UR E27 산출물 10종(3.1.1–3.1.10)"과 TA · SoC · SoF 선택, 선주 → compliance.html의
      "For Ship Management and Operation" 항목. 각 카드는 compliance.html의 해당 위치로 링크합니다.
      이 섹션을 히어로 바로 다음(연혁보다 앞)에 둡니다.
Why: 두 사람이 가장 몰입한 지점이 각각 "조선소"/"선주" 카드와 Compliance 카드였습니다. 그런데 카드가
     한 줄짜리이고 눌리지 않아 몰입이 즉시 끊겼습니다(B: "눌러도 아무 데도 안 가").
Expected effect: A는 두 번째 화면에서 "이 사람들 도면이랑 FAT를 아는구나"라는 신뢰를 얻습니다(현재는 하위
     페이지에서만). B는 비교표의 "선주 산출물" 칸을 채울 수 있습니다.
```

### 3위 — 신뢰를 깎는 주장을 정직한 표현으로 바꾼다 (2026 항목, 기관 로고, 끌밋)

```
Quick win — 과장으로 읽히는 신호 제거
Fold: F2, F8 | Framework: LIFT:Anxiety, Cialdini:Authority(정직한 형태)
What: ① 2026 "주요 선급 IACS UR E27 TA 취득 및 E26 Deliverable 제공"을 소유자가 달성을 확인하기 전까지
      "목표"로 표시합니다. 달성했다면 선급명과 대상 범위를 적습니다(소유자 확인 필요).
      ② 2021 "㈜끌밋 법인 설립"에 광명마리타임과의 관계를 한 절로 밝힙니다(소유자 확인 필요).
      ③ "지원 범위"를 "대응 가능한 선급"과 "참조 표준 · 가이드라인 기관"으로 바꾸고, NSA · UK NCSC ·
      USCG · CSA 로고는 텍스트 목록으로 대체합니다. 현재 UK NCSC 로고가 두 번("UK NCSC", "NCSC") 나오는
      중복도 없앱니다. ④ "N2SF", "ISP · ISMP", "SC-100 · 200 · 300"은 한 줄 설명을 붙이거나 홈에서 뺍니다.
Why: A는 "이 회사가 NSA랑 일한다고? 말이 안 되지… 오히려 부풀렸나 싶어", B는 "1년 된 회사가 벌써?
     근거가 있으면 좋겠는데"라고 반응했습니다. 둘 다 이 지점에서 신뢰가 순감했습니다.
Expected effect: 신생 회사라는 사실은 그대로지만 "정직한 신생 전문 회사"로 읽혀, B의 비교표에서 감점 요인이
     사라집니다. 하루 안에 할 수 있는 변경 중 신뢰 효과가 가장 큽니다.
```

### 4위 — 문의를 쉽게, 그리고 덜 막막하게 만든다

```
Major improvement — 문의 섹션 재설계
Fold: F9 (모바일 M14–M15) | Framework: Fogg:Ability, Fogg:Prompt, Cialdini:Commitment
What: ① "Trust Execution Responsibility Partnership" 대형 문구를 없애고, 그 자리에 이메일(mailto 링크)과
      주소를 둡니다. ② 양식에 "소속/회사"와 "역할(조선소 · 선주 · 공급사 · 기타)" 선택을 추가하고,
      메시지 칸 안내 문구를 "호선 단계(메이커 선정/승인도면/FAT/운항), 대상 시스템, 선급을 적어 주시면
      더 정확히 답변드립니다"처럼 씁니다. ③ 응답 시점이나 담당자 이름은 소유자가 약속할 수 있을 때만
      적습니다(소유자 확인 필요 — 지어내지 않음). ④ footer 이메일을 mailto 링크로 바꿉니다.
      ⑤ 모바일에서는 섹션 중간(역할별 입구 뒤)에 "문의하기" 버튼을 한 번 더 둡니다.
Why: A는 "메시지 칸에 뭐라고 써야 하지", B는 "휴대폰으로 긴 메시지 쓰긴 싫은데… 메일 주소가 안 눌러지고"
     라고 반응했습니다. 의향이 생긴 순간에 행동 수단이 부족했습니다.
Expected effect: 문의 수와 함께 문의의 질(호선 단계·시스템·선급 정보 포함)이 올라가 첫 회신이 빨라집니다.
     역할 선택은 B처럼 망설이는 방문자에게 작은 첫 걸음(Commitment)이 됩니다.
```

### 5위 — 같은 말을 세 번 하는 섹션을 합쳐 페이지를 줄인다

```
Major improvement — 중복 제거와 순서 재배치
Fold: F4, F5, F7 (모바일 M6–M13) | Framework: LIFT:Distraction, Fogg:Ability
What: "사업 범위"(2박스), "핵심 경쟁력"(4카드), "핵심 역량"(4카드)을 하나의 "What we do" 섹션(하위 페이지
      4개로 연결, Compliance를 시각적으로 가장 크게)으로 합칩니다. About 부제와 Business 부제의 같은 문장,
      두 번 나오는 "핵심 가치", 비전 인용 패널을 정리합니다. "공공 · 민간" SI 문장은 보조 역량으로 내리고
      첫 섹션에서 뺍니다. 카드 제목은 한국어로 쓰고 영어는 보조 줄로 둡니다("Structure-first",
      "Agentic AI SecOps"는 한 줄 설명을 붙입니다). 메뉴 라벨도 한국어로 쓰고 "Expertise"→연혁처럼
      어긋난 링크를 맞춥니다.
Why: 두 페르소나가 거의 떠날 뻔한 지점이 같은 문장, "공공 · 민간 · 해양 분야에서 운영이 요구되는 IT / OT
     플랫폼의 개발·구축"이었습니다. 모바일에서는 반복 섹션 때문에 문의 양식이 15번째 화면까지 밀립니다.
Expected effect: 모바일 페이지 길이가 크게 줄어 Compliance 입구가 2–3번째 화면, 문의가 훨씬 앞쪽에 옵니다.
     "SI 회사인가?"라는 분류 오류가 사라집니다.
```

---

## 5. 추가 권고 (우선순위 등급별)

### Quick wins (하루 미만)

- **비전 인용문의 여는 따옴표 수정** — F3 | Clarity. "”데이터와…"처럼 닫는 따옴표로 시작합니다. 패널을 없앤다면 불필요합니다.
- **아티클 카드에 저자명 표시** — F6 | Cialdini:Authority. `articles/index.json`에 이미 저자가 있으므로 지어낸 정보가 아닙니다. 사람 이름이 보이면 B가 원한 Liking도 조금 생깁니다.
- **아티클 섹션 끝에 문의 연결 한 줄** — F6 | Fogg:Prompt. 예: "우리 호선에 적용하면 어떻게 되는지 궁금하시면 → 문의하기".
- **footer "Services" 4항목을 하위 페이지 링크로** — F10 | Fogg:Ability.

### Major improvements (며칠)

- **연혁을 짧게 줄여 페이지 아래쪽으로** — F2 | LIFT:Relevance. 현재 히어로 바로 다음이 연혁이라, 두 사람 모두 "왜 바로 연혁이야"라고 느낍니다. 이 문제는 Global Constraints 8의 순서(Hero → What we do → Why → Journey)와도 맞습니다.
- **스톡 사진 콜라주 축소 또는 E26→E27→SCARP 구조 다이어그램으로 교체** — F1 | Liking/Clarity. A는 "그냥 스톡 사진이네"라고 반응했습니다. compliance.html의 "E26(선박 전체) → E27(개별 시스템) → SCARP(운항 단계)" 도식이 같은 자리에서 훨씬 많은 것을 말해 줍니다.

### Strategic opportunities (계획 필요)

- **사람을 보여 주는 증거** — Cialdini:Liking, Authority. 대표 또는 책임 컨설턴트의 이름과 경력 한 줄, 선급 대응 이력처럼 소유자가 확인한 사실만 담습니다. 지금은 사실이 없으므로 `<!-- OWNER: … -->` 자리표시 주석으로 남기고, 지어내지 않습니다.
- **"우리 시스템은 E27 대상인가?" 자가 진단** — Cialdini:Commitment, Reciprocity. compliance.html의 Non-CBS / Out-of-Scope / Exclusion / Target 분류를 3–4문항 체크로 만들고, 결과 화면에서 문의로 연결합니다. A에게는 사양 회의 자료가 되고, 업체에게는 질 좋은 문의가 됩니다.

---

## 6. 다른 작업에 넘길 관찰 사항

- 모바일 히어로 부제에서 줄바꿈 위치의 띄어쓰기가 사라집니다("경험으로데이터와", "제공하고Global Compliance 에"). 한국어 문자열에 `<br>`만 있고 공백이 없는 것으로 보입니다. 또한 "Compliance 에", "대응 합니다"처럼 띄어쓰기 오류가 있습니다.
- 메뉴 "Expertise"가 `#expertise`(연혁 "OUR JOURNEY")로 연결되어 이름과 내용이 다릅니다. Global Constraints 9의 내비게이션 개편 범위입니다.
- 문의 양식 근처에 개인정보 수집 안내 문구가 보이지 않습니다(footer에 "개인정보처리방침" 링크만 있음). 양식을 개편할 때 함께 확인해야 합니다.
- 회사명 띄어쓰기가 섞여 있습니다: "광명 마리타임"(히어로 부제, 연혁 제목, 문의 소개)과 "광명마리타임"(로고, 비전, footer). Global Constraints 2에 해당합니다.
- 라이브 사이트의 `country-detector.js`는 여전히 IP 기반 국가 감지(geojs) 버전입니다. 이 워크스루에서는 첫 진입 시 일본어로 표시되었지만, 같은 브라우저를 다른 세션이 함께 쓰던 흔적이 있어 원인을 확정하지 않았습니다. Stage 1 배포 후 깨끗한 브라우저 프로필에서 다시 확인해야 합니다.
