// Articles Manager - renders the article list (articles.html) and the home
// page preview from articles/index.json.
//
// Article pages themselves are static: scripts/build-articles.mjs turns each
// markdown file into articles/<slug>.html (ko) and articles/<slug>.<lang>.html,
// so search engines and link previews see the full text. This file only
// builds links to those pages.
class ArticlesManager {
  constructor() {
    this.articles = [];
    // Last view rendered, so it can be redrawn when the language changes
    this.lastView = null;

    document.addEventListener('languageChanged', () => this.rerender());
  }

  // Active locale; falls back the same way as i18n.js
  lang() {
    return window.i18nManager?.currentLang || localStorage.getItem('preferredLanguage') || 'en';
  }

  // Article fields are either a plain string or a per-locale object
  localize(field) {
    if (!field || typeof field === 'string') return field;
    return field[this.lang()] ?? field.en ?? field.ko;
  }

  // UI strings from translations.json (articlesUi). The returned markup also
  // carries data-i18n so i18n.js fills it in if translations load later.
  ui(key, fallback) {
    return window.i18nManager?.translations?.[this.lang()]?.articlesUi?.[key] || fallback;
  }

  uiSpan(key, fallback) {
    return `<span data-i18n="articlesUi.${key}">${this.ui(key, fallback)}</span>`;
  }

  // Static page for an article in the active locale. Korean is the original
  // (articles/slug.html); other locales live under their language directory
  // (en/articles/slug.html). Must match pagePath() in scripts/build-articles.mjs.
  articleUrl(slug) {
    const lang = this.lang();
    return `${lang === 'ko' ? '' : `${lang}/`}articles/${slug}.html`;
  }

  rerender() {
    if (!this.lastView) return;
    const { type, args } = this.lastView;
    if (type === 'list') this.renderArticleList(...args);
    else if (type === 'preview') this.renderArticlePreview(...args);
  }

  async fetchArticleIndex() {
    try {
      const response = await fetch('articles/index.json');
      if (!response.ok) throw new Error('Failed to load article index');
      this.articles = await response.json();
      // Sort by date descending (newest first)
      this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      return this.articles;
    } catch (error) {
      console.error('Error loading article index:', error);
      return [];
    }
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    const lang = this.lang();
    const localeMap = { ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP' };
    return date.toLocaleDateString(localeMap[lang] || 'ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  renderArticleList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    this.lastView = { type: 'list', args: [containerId] };

    if (this.articles.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16">
          <i data-lucide="file-text" class="w-12 h-12 text-slate-400 mx-auto mb-4"></i>
          <p class="text-slate-500 dark:text-slate-400">${this.uiSpan('empty', 'No articles yet.')}</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = this.articles.map(article => `
      <article class="group relative flex flex-col items-start">
        <div class="relative w-full bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-x-3 text-xs mb-3">
            <time datetime="${article.date}" class="text-slate-500 dark:text-slate-400">
              ${this.formatDate(article.date)}
            </time>
            ${article.category ? `
              <span class="inline-flex items-center rounded-full bg-ocean-50 dark:bg-ocean-900/30 px-2.5 py-0.5 text-xs font-medium text-ocean-700 dark:text-ocean-300">
                ${article.category}
              </span>
            ` : ''}
          </div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-ocean-700 dark:group-hover:text-ocean-300 transition-colors">
            <a href="${this.articleUrl(article.slug)}" class="block">
              <span class="absolute inset-0"></span>
              ${this.localize(article.title)}
            </a>
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            ${this.localize(article.description)}
          </p>
          <div class="mt-4 flex items-center text-sm font-medium text-ocean-700 dark:text-ocean-300">
            ${this.uiSpan('readArticle', 'Read article')}
            <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </article>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  renderArticlePreview(containerId, limit = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    this.lastView = { type: 'preview', args: [containerId, limit] };

    const items = this.articles.slice(0, limit);
    if (!items.length) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = items.map(article => `
      <a href="${this.articleUrl(article.slug)}" class="group block bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-ocean-500 dark:hover:border-ocean-400 transition-colors">
        <div class="flex items-center gap-x-3 text-xs mb-3">
          <time datetime="${article.date}" class="text-slate-500 dark:text-slate-400">
            ${this.formatDate(article.date)}
          </time>
          ${article.category ? `
            <span class="inline-flex items-center rounded-full bg-ocean-50 dark:bg-ocean-900/30 px-2.5 py-0.5 text-xs font-medium text-ocean-700 dark:text-ocean-300">
              ${article.category}
            </span>
          ` : ''}
        </div>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-ocean-700 dark:group-hover:text-ocean-300 transition-colors leading-snug">
          ${this.localize(article.title)}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          ${this.localize(article.description)}
        </p>
      </a>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }
}

// Global instance
window.articlesManager = new ArticlesManager();
