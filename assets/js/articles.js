// Articles Manager - Loads and renders markdown articles
class ArticlesManager {
  constructor() {
    this.articles = [];
    this.basePath = this.getBasePath();
    // Last view rendered, so it can be redrawn when the language changes
    this.lastView = null;
    this.renderToken = 0;

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

  rerender() {
    if (!this.lastView) return;
    const { type, args } = this.lastView;
    if (type === 'list') this.renderArticleList(...args);
    else if (type === 'preview') this.renderArticlePreview(...args);
    else if (type === 'detail') this.renderArticleDetail(...args);
  }

  getBasePath() {
    // Determine base path based on current page location
    const path = window.location.pathname;
    if (path.includes('/articles/') || path.endsWith('/article.html')) {
      return '';
    }
    return '';
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

  async fetchArticleContent(slug) {
    // Korean is the original (slug.md); other locales are slug.<lang>.md,
    // falling back to the original when a translation is missing.
    const lang = this.lang();
    const paths = lang === 'ko' ? [`articles/${slug}.md`] : [`articles/${slug}.${lang}.md`, `articles/${slug}.md`];
    try {
      for (const path of paths) {
        const response = await fetch(path);
        if (response.ok) return await response.text();
      }
      throw new Error(`Article not found: ${slug}`);
    } catch (error) {
      console.error('Error loading article:', error);
      return null;
    }
  }

  getArticleMeta(slug) {
    return this.articles.find(a => a.slug === slug) || null;
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
            <a href="article.html#${article.slug}" class="block">
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
      <a href="article.html#${article.slug}" class="group block bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
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

  async renderArticleDetail(metaContainerId, contentContainerId) {
    this.lastView = { type: 'detail', args: [metaContainerId, contentContainerId] };
    // Drop results of an earlier render if the language changed meanwhile
    const token = ++this.renderToken;

    // Support both hash (#slug) and query param (?slug=xxx) formats
    const slug = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get('slug');
    if (!slug) {
      this.showArticleError(contentContainerId, 'noSlug', 'No article specified.');
      return null;
    }

    if (!this.articles.length) await this.fetchArticleIndex();
    const meta = this.getArticleMeta(slug);
    if (!meta) {
      this.showArticleError(contentContainerId, 'notFound', 'Article not found.');
      return null;
    }

    // Fetch the body first so meta and body switch language together
    const markdown = await this.fetchArticleContent(slug);
    if (token !== this.renderToken) return null;
    if (!markdown) {
      this.showArticleError(contentContainerId, 'loadFailed', 'Failed to load the article.');
      return null;
    }

    const title = this.localize(meta.title);
    const author = this.localize(meta.author);

    // Render meta
    const metaContainer = document.getElementById(metaContainerId);
    if (metaContainer) {
      metaContainer.innerHTML = `
        <div class="flex items-center gap-x-3 text-sm text-slate-300 mb-4">
          <time datetime="${meta.date}">${this.formatDate(meta.date)}</time>
          ${meta.category ? `
            <span class="inline-flex items-center rounded-full bg-ocean-50 dark:bg-ocean-900/30 px-2.5 py-0.5 text-xs font-medium text-ocean-700 dark:text-ocean-300">
              ${meta.category}
            </span>
          ` : ''}
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">${title}</h1>
        <p class="text-slate-300 text-lg">${this.localize(meta.description)}</p>
        ${author ? `<p class="mt-4 text-sm text-slate-300">${this.uiSpan('by', 'By')} ${author}</p>` : ''}
      `;
    }

    // Update page title
    document.title = `${title} - ${this.ui('siteName', 'Gwangmyung Maritime')}`;

    // Render content
    const contentContainer = document.getElementById(contentContainerId);
    if (contentContainer && window.marked) {
      contentContainer.innerHTML = marked.parse(markdown);
    }
    document.dispatchEvent(new CustomEvent('articleRendered', { detail: { meta } }));
    return meta;
  }

  showArticleError(containerId, key, fallback) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div class="text-center py-16">
          <p class="text-slate-500 mb-4">${this.uiSpan(key, fallback)}</p>
          <a href="articles.html" class="text-ocean-700 hover:underline">${this.uiSpan('back', 'Back to Articles')}</a>
        </div>
      `;
    }
  }
}

// Global instance
window.articlesManager = new ArticlesManager();
