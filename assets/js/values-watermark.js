// Core-values watermark behind the home contact section.
// The words are static in the markup (with a fixed fallback layout). With
// JS we re-lay them out on every load: the section is split into a grid,
// each word gets one cell, and only its position inside the cell, size,
// orientation and opacity are random. Even density, different every time.
(function () {
  const root = document.querySelector('[data-values-watermark]');
  if (!root) return;
  const words = Array.from(root.children);
  if (!words.length) return;

  const rand = (a, b) => a + Math.random() * (b - a);
  const isCjk = el => !/[A-Za-z]/.test(el.textContent);

  function layout() {
    const w = root.clientWidth;
    const h = root.clientHeight;
    if (!w || !h) return;
    const cols = w >= 1024 ? 4 : w >= 640 ? 3 : 2;
    const rows = Math.ceil(words.length / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    // Shuffle so the same word is not always in the same cell.
    const order = words.slice();
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    order.forEach((el, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cjk = isCjk(el);
      // Two-character CJK words are narrow, so they get a larger face than
      // the long Latin words; the vertical variant is used sparingly.
      const vertical = Math.random() < (cjk ? 0.15 : 0.3);
      const vw = w / 100;
      const size = cjk ? rand(9, 17) * vw : vertical ? rand(5.5, 8.5) * vw : rand(6, 10.5) * vw;
      // Place inside the cell with jitter; cells on the edges may bleed out.
      const x = col * cellW + rand(-0.25, 0.45) * cellW;
      const y = row * cellH + rand(-0.35, 0.35) * cellH;
      el.style.left = `${Math.round(x)}px`;
      el.style.top = `${Math.round(y)}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.fontSize = `${Math.round(size)}px`;
      el.style.writingMode = vertical ? 'vertical-rl' : 'horizontal-tb';
      el.style.opacity = rand(0.04, 0.075).toFixed(3);
    });
  }

  let timer = 0;
  const relayout = () => { clearTimeout(timer); timer = setTimeout(layout, 150); };

  layout();
  window.addEventListener('resize', relayout, { passive: true });
  // The section height can change once fonts and translations arrive.
  window.addEventListener('load', layout);
  document.addEventListener('layoutLoaded', layout);
})();
