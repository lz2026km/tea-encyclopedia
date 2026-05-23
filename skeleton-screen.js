/**
 * 骨架屏 (Skeleton Screen) 模块
 * 在内容加载过程中显示骨架屏，提升感知加载速度
 */
(function() {
  'use strict';

  // 骨架屏样式
  const SKELETON_STYLES = `
    .skeleton-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 1.2rem;
      padding: 1rem;
    }
    .skeleton-card {
      width: calc(50% - 0.6rem);
      height: 280px;
      background: linear-gradient(90deg, var(--c4, #D8F3DC) 25%, var(--c3, #95D5B2) 50%, var(--c4, #D8F3DC) 75%);
      background-size: 200% 100%;
      border-radius: 12px;
      animation: skeleton-shimmer 1.5s infinite;
    }
    .skeleton-card:nth-child(2n) {
      animation-delay: 0.2s;
    }
    .skeleton-card:nth-child(3n) {
      animation-delay: 0.4s;
    }
    @keyframes skeleton-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .skeleton-wrap.hidden {
      display: none;
    }
    /* 骨架屏内元素 */
    .skeleton-line {
      height: 16px;
      background: var(--c4, #D8F3DC);
      border-radius: 8px;
      animation: skeleton-pulse 1.5s infinite;
      margin-bottom: 8px;
    }
    .skeleton-line.short {
      width: 60%;
    }
    .skeleton-line.medium {
      width: 80%;
    }
    .skeleton-circle {
      width: 60px;
      height: 60px;
      background: var(--c4, #D8F3DC);
      border-radius: 50%;
      animation: skeleton-pulse 1.5s infinite;
    }
    .skeleton-rect {
      background: var(--c4, #D8F3DC);
      border-radius: 8px;
      animation: skeleton-pulse 1.5s infinite;
    }
    .skeleton-text {
      height: 12px;
      background: var(--c4, #D8F3DC);
      border-radius: 6px;
      animation: skeleton-pulse 1.5s infinite;
      margin-bottom: 6px;
    }
    .skeleton-text:last-child {
      width: 70%;
    }
    /* 渐变动画 */
    @keyframes skeleton-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    /* 卡片骨架 */
    .skeleton-tea-card {
      background: var(--white, #fff);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(45,106,79,0.08);
    }
    .skeleton-tea-img {
      height: 160px;
      background: linear-gradient(90deg, var(--c4, #D8F3DC) 25%, var(--c3, #95D5B2) 50%, var(--c4, #D8F3DC) 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s infinite;
    }
    .skeleton-tea-body {
      padding: 12px;
    }
    .skeleton-tea-title {
      height: 18px;
      width: 70%;
      background: var(--c4, #D8F3DC);
      border-radius: 8px;
      margin-bottom: 10px;
      animation: skeleton-pulse 1.5s infinite;
    }
    .skeleton-tea-text {
      height: 12px;
      width: 90%;
      background: var(--c4, #D8F3DC);
      border-radius: 6px;
      margin-bottom: 8px;
      animation: skeleton-pulse 1.5s infinite 0.1s;
    }
    .skeleton-tea-text:last-child {
      width: 60%;
      animation-delay: 0.2s;
    }
    .skeleton-sidebar {
      width: 260px;
      min-width: 260px;
      background: var(--white, #fff);
      border-right: 2px solid var(--border, #B7E4C7);
      padding: 1.2rem;
    }
    .skeleton-header {
      height: 60px;
      background: var(--white, #fff);
      border-bottom: 2px solid var(--border, #B7E4C7);
      padding: 0.6rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .skeleton-header-logo {
      width: 100px;
      height: 30px;
      background: var(--c4, #D8F3DC);
      border-radius: 8px;
      animation: skeleton-pulse 1.5s infinite;
    }
    .skeleton-header-search {
      width: 200px;
      height: 36px;
      background: var(--c4, #D8F3DC);
      border-radius: 20px;
      animation: skeleton-pulse 1.5s infinite;
    }
    .skeleton-banner {
      height: 120px;
      background: linear-gradient(135deg, var(--c1, #2D6A4F), var(--c2, #52B788));
      border-radius: 12px;
      margin-bottom: 1.5rem;
      animation: skeleton-pulse 1.5s infinite;
    }
  `;

  // 注入样式
  function injectStyles() {
    if (document.getElementById('skeleton-styles')) return;
    const style = document.createElement('style');
    style.id = 'skeleton-styles';
    style.textContent = SKELETON_STYLES;
    document.head.appendChild(style);
  }

  // 生成骨架HTML
  function generateSkeletonHTML(type, options) {
    options = options || {};
    switch (type) {
      case 'tea-card':
        return `
          <div class="skeleton-tea-card">
            <div class="skeleton-tea-img"></div>
            <div class="skeleton-tea-body">
              <div class="skeleton-tea-title"></div>
              <div class="skeleton-tea-text"></div>
              <div class="skeleton-tea-text"></div>
            </div>
          </div>`;

      case 'tea-grid':
        const count = options.count || 8;
        let html = '<div class="skeleton-wrap">';
        for (let i = 0; i < count; i++) {
          html += `<div class="skeleton-card" style="animation-delay:${i * 0.1}s"></div>`;
        }
        html += '</div>';
        return html;

      case 'sidebar':
        return `
          <div class="skeleton-sidebar">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div style="height:20px"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
          </div>`;

      case 'header':
        return `
          <div class="skeleton-header">
            <div class="skeleton-header-logo"></div>
            <div class="skeleton-header-search"></div>
          </div>`;

      case 'full':
        return `
          ${options.includeHeader ? '<div class="skeleton-header"></div>' : ''}
          <div style="display:flex">
            ${options.includeSidebar ? '<div class="skeleton-sidebar"></div>' : ''}
            <div style="flex:1;padding:1rem">
              <div class="skeleton-banner"></div>
              <div class="skeleton-wrap">
                ${Array(options.cardCount || 8).fill('<div class="skeleton-card"></div>').join('')}
              </div>
            </div>
          </div>`;

      case 'loading-text':
        return `
          <div class="skeleton-text" style="width:${options.width || '100%'}"></div>`;

      default:
        return '<div class="skeleton-wrap"><div class="skeleton-card"></div></div>';
    }
  }

  // 显示骨架屏
  function showSkeleton(type, container, options) {
    injectStyles();
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (el) {
      el.innerHTML = generateSkeletonHTML(type, options);
      el.classList.remove('hidden');
    }
  }

  // 隐藏骨架屏
  function hideSkeleton(container) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (el) {
      el.classList.add('hidden');
      setTimeout(() => { el.innerHTML = ''; }, 300);
    }
  }

  // 渐变动画
  function startShimmer(container) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.querySelectorAll('.skeleton-card, .skeleton-tea-card, .skeleton-tea-img').forEach((card) => {
      card.style.animation = 'skeleton-shimmer 1.5s infinite';
    });
  }

  // 停止动画
  function stopShimmer(container) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.querySelectorAll('.skeleton-card, .skeleton-tea-card, .skeleton-tea-img').forEach((card) => {
      card.style.animation = 'none';
    });
  }

  // 初始化页面骨架
  function initPageSkeleton(options) {
    options = Object.assign({
      container: 'skeletonScreen',
      type: 'full',
      includeHeader: true,
      includeSidebar: true,
      cardCount: 8,
      minDuration: 300,
      maxDuration: 2000
    }, options || {});

    const start = Date.now();
    const el = document.getElementById(options.container);

    // 确保骨架屏显示
    if (el) {
      el.innerHTML = generateSkeletonHTML('full', options);
      el.classList.remove('hidden');
    }

    // 返回一个promise，在数据加载完成后调用
    return function hide() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, options.minDuration - elapsed);

      setTimeout(() => {
        if (el) {
          el.classList.add('hidden');
          setTimeout(() => { el.innerHTML = ''; }, 500);
        }
      }, remaining);
    };
  }

  // 导出到全局
  window.SkeletonScreen = {
    show: showSkeleton,
    hide: hideSkeleton,
    generate: generateSkeletonHTML,
    startShimmer: startShimmer,
    stopShimmer: stopShimmer,
    init: initPageSkeleton,
    injectStyles: injectStyles
  };

  // 快捷方法
  window.showSkeleton = showSkeleton;
  window.hideSkeleton = hideSkeleton;
})();