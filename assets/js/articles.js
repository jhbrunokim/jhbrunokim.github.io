// Articles Manager - Loads and renders markdown articles
class ArticlesManager {
  constructor() {
    this.articles = [];
    this.basePath = this.getBasePath();
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
    try {
      const response = await fetch(`articles/${slug}.md`);
      if (!response.ok) throw new Error(`Article not found: ${slug}`);
      return await response.text();
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
    const lang = localStorage.getItem('preferredLanguage') || 'ko';
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

    if (this.articles.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16">
          <i data-lucide="file-text" class="w-12 h-12 text-slate-400 mx-auto mb-4"></i>
          <p class="text-slate-500 dark:text-slate-400">아직 등록된 아티클이 없습니다.</p>
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
              <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                ${article.category}
              </span>
            ` : ''}
          </div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <a href="article.html#${article.slug}" class="block">
              <span class="absolute inset-0"></span>
              ${article.title}
            </a>
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            ${article.description}
          </p>
          <div class="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            <span>Read article</span>
            <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </article>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  async renderArticleDetail(metaContainerId, contentContainerId) {
    // Support both hash (#slug) and query param (?slug=xxx) formats
    const slug = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get('slug');
    if (!slug) {
      this.showArticleError(contentContainerId, 'No article specified.');
      return;
    }

    await this.fetchArticleIndex();
    const meta = this.getArticleMeta(slug);
    if (!meta) {
      this.showArticleError(contentContainerId, 'Article not found.');
      return;
    }

    // Render meta
    const metaContainer = document.getElementById(metaContainerId);
    if (metaContainer) {
      metaContainer.innerHTML = `
        <div class="flex items-center gap-x-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <time datetime="${meta.date}">${this.formatDate(meta.date)}</time>
          ${meta.category ? `
            <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
              ${meta.category}
            </span>
          ` : ''}
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">${meta.title}</h1>
        <p class="text-slate-300 text-lg">${meta.description}</p>
        ${meta.author ? `<p class="mt-4 text-sm text-slate-400">By ${meta.author}</p>` : ''}
      `;
    }

    // Update page title
    document.title = `${meta.title} - 광명마리타임`;

    // Render content
    const markdown = await this.fetchArticleContent(slug);
    if (!markdown) {
      this.showArticleError(contentContainerId, 'Failed to load article content.');
      return;
    }

    const contentContainer = document.getElementById(contentContainerId);
    if (contentContainer && window.marked) {
      contentContainer.innerHTML = marked.parse(markdown);
    }
  }

  showArticleError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div class="text-center py-16">
          <p class="text-slate-500 dark:text-slate-400 mb-4">${message}</p>
          <a href="articles.html" class="text-blue-600 dark:text-blue-400 hover:underline">Back to Articles</a>
        </div>
      `;
    }
  }
}

// Global instance
window.articlesManager = new ArticlesManager();
