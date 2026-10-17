// 아티클에 끼워 넣는 인라인 SVG 도해.
//
// 마크다운 본문에 `[[stage-diagram N]]` 을 쓰면 build-articles.mjs 가 이 모듈의 SVG 로 바꿉니다.
// N 은 강조할 단계(1~5), 0 이면 전체 흐름만 보여 줍니다. 인라인 SVG 라 페이지 글꼴과 색을 그대로 씁니다.
// 가로형(데스크톱)과 세로형(모바일) 두 벌을 넣고 CSS(.stage-figure) 가 화면 폭에 따라 하나만 보여 줍니다.

const STAGES = {
  ko: ['계약', '설계', '발주', 'FAT · 시운전', '인도 · 운항'],
  en: ['Contract', 'Design', 'Procurement', 'FAT · Sea trials', 'Delivery · Operation'],
  zh: ['合同', '设计', '采购', 'FAT · 试航', '交付 · 运营'],
  ja: ['契約', '設計', '調達', 'FAT · 海上試運転', '引渡し · 運航'],
};
const TITLE = {
  ko: '신조선 E26/E27 대응의 다섯 단계',
  en: 'The five stages of E26/E27 compliance for a newbuild',
  zh: '新造船 E26/E27 合规的五个阶段',
  ja: '新造船 E26/E27 対応の五つの段階',
};

// 브랜드 색 (tailwind.config.js 의 ocean · ink · signal 램프)
const C = {
  line: '#aeb5bc', // ink-300
  text: '#232d36', // ink-900
  muted: '#707c87', // ink-500
  fill: '#eef6fe', // ocean-50
  stroke: '#8ab9e6', // ocean-300
  active: '#0d5387', // ocean-700
  activeText: '#ffffff',
  accent: '#f09025', // signal-400
};

function chipColors(step, current) {
  const isActive = step === current;
  const isDone = current > 0 && step < current;
  return {
    isActive,
    fill: isActive ? C.active : isDone ? C.fill : '#ffffff',
    stroke: isActive ? C.active : C.stroke,
    text: isActive ? C.activeText : C.text,
    numFill: isActive ? C.accent : isDone ? C.stroke : '#ffffff',
    numStroke: isActive ? C.accent : C.stroke,
    numText: isActive ? C.text : isDone ? '#ffffff' : C.muted,
  };
}

function horizontal(labels, current) {
  const W = 960;
  const H = current > 0 ? 150 : 120;
  const n = labels.length;
  const gap = 18;
  const chipW = (W - gap * (n - 1)) / n;
  const chipH = 56;
  const y = 40;
  const chips = labels
    .map((label, i) => {
      const x = i * (chipW + gap);
      const step = i + 1;
      const c = chipColors(step, current);
      const arrow =
        i < n - 1
          ? `<path d="M${x + chipW + 3} ${y + chipH / 2} h${gap - 6}" stroke="${C.line}" stroke-width="2" fill="none" marker-end="url(#stage-arrow-h)"/>`
          : '';
      return `
  <g>
    <rect x="${x}" y="${y}" width="${chipW}" height="${chipH}" rx="14" fill="${c.fill}" stroke="${c.stroke}" stroke-width="${c.isActive ? 2 : 1.5}"/>
    <circle cx="${x + 26}" cy="${y + chipH / 2}" r="13" fill="${c.numFill}" stroke="${c.numStroke}" stroke-width="1.5"/>
    <text x="${x + 26}" y="${y + chipH / 2 + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${c.numText}">${step}</text>
    <text x="${x + 50}" y="${y + chipH / 2 + 6}" font-size="17" font-weight="${c.isActive ? 700 : 600}" fill="${c.text}">${escape(label)}</text>
  </g>${arrow}`;
    })
    .join('');
  const marker =
    current > 0
      ? `<text x="${(current - 1) * (chipW + gap) + chipW / 2}" y="${y + chipH + 34}" text-anchor="middle" font-size="13" fill="${C.active}" font-weight="600">▲ ${escape(labels[current - 1])}</text>`
      : '';
  return `<svg class="stage-h" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" aria-hidden="true">
  <defs><marker id="stage-arrow-h" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.line}"/></marker></defs>${chips}${marker}
</svg>`;
}

function vertical(labels, current) {
  const W = 360;
  const chipH = 52;
  const gap = 22;
  const n = labels.length;
  const H = n * chipH + (n - 1) * gap;
  const chips = labels
    .map((label, i) => {
      const y = i * (chipH + gap);
      const step = i + 1;
      const c = chipColors(step, current);
      const arrow =
        i < n - 1
          ? `<path d="M${W / 2} ${y + chipH + 3} v${gap - 8}" stroke="${C.line}" stroke-width="2" fill="none" marker-end="url(#stage-arrow-v)"/>`
          : '';
      return `
  <g>
    <rect x="0" y="${y}" width="${W}" height="${chipH}" rx="14" fill="${c.fill}" stroke="${c.stroke}" stroke-width="${c.isActive ? 2 : 1.5}"/>
    <circle cx="28" cy="${y + chipH / 2}" r="14" fill="${c.numFill}" stroke="${c.numStroke}" stroke-width="1.5"/>
    <text x="28" y="${y + chipH / 2 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${c.numText}">${step}</text>
    <text x="54" y="${y + chipH / 2 + 6}" font-size="18" font-weight="${c.isActive ? 700 : 600}" fill="${c.text}">${escape(label)}</text>
  </g>${arrow}`;
    })
    .join('');
  return `<svg class="stage-v" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" aria-hidden="true">
  <defs><marker id="stage-arrow-v" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.line}"/></marker></defs>${chips}
</svg>`;
}

export function stageDiagram(current = 0, lang = 'ko') {
  const labels = STAGES[lang] || STAGES.ko;
  const title = TITLE[lang] || TITLE.ko;
  return `<figure class="stage-figure" role="img" aria-label="${escape(title)}">
<figcaption class="stage-title">${escape(title)}</figcaption>
${horizontal(labels, current)}
${vertical(labels, current)}
</figure>`;
}

function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// `[[stage-diagram N]]` 토큰(단락으로 감싸인 형태 포함)을 SVG 로 교체
export function applyDiagrams(html, lang) {
  return html.replace(/(?:<p>)?\[\[stage-diagram\s+(\d)\]\](?:<\/p>)?/g, (_, n) => stageDiagram(Number(n), lang));
}
