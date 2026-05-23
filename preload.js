/**
 * 预加载(Preload) 和 预获取(Prefetch) 工具
 * 提升页面加载和导航性能
 */
(function() {
  'use strict';

  // 预加载资源映射
  const PRELOAD_MAP = {
    // 高优先级 - 首屏必需
    high: [
      { href: 'tea_data.js', as: 'script', type: 'modulepreload' },
      { href: 'lazy-load.js', as: 'script' }
    ],
    // 中优先级 - 即将使用
    medium: [
      { href: 'debounce-throttle.js', as: 'script' },
      { href: 'code-split.js', as: 'script' },
      { href: 'virtual-list.js', as: 'script' }
    ],
    // 低优先级 - 即将使用
    low: [
      { href: 'lazy-modal.js', as: 'script' }
    ]
  };

  /**
   * 创建预加载链接
   */
  function createPreloadLink(href, as, options) {
    options = options || {};
    const link = document.createElement('link');
    link.rel = options.rel || 'preload';
    link.href = href;
    link.as = as;

    if (options.crossorigin) link.crossOrigin = 'anonymous';
    if (options.type) link.type = options.type;
    if (options.media) link.media = options.media;
    if (options.onload) link.onload = options.onload;
    if (options.integrity) link.integrity = options.integrity;

    return link;
  }

  /**
   * 预加载资源
   */
  function preload(href, as, options) {
    // 检查是否已存在
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) return existing;

    const link = createPreloadLink(href, as, options);
    document.head.appendChild(link);
    return link;
  }

  /**
   * 预加载脚本
   */
  function preloadScript(src, options) {
    return preload(src, 'script', options);
  }

  /**
   * 预加载样式表
   */
  function preloadStylesheet(href, media) {
    return preload(href, 'style', { media: media || 'screen' });
  }

  /**
   * 预加载图片
   */
  function preloadImage(src, options) {
    const link = createPreloadLink(src, 'image', options);
    link.rel = 'prefetch';
    document.head.appendChild(link);
    return link;
  }

  /**
   * 预加载字体
   */
  function preloadFont(href, options) {
    return preload(href, 'font', Object.assign({ crossorigin: 'anonymous' }, options));
  }

  /**
   * DNS预解析
   */
  function dnsPrefetch(hostname) {
    const existing = document.querySelector(`link[href="//${hostname}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = '//' + hostname;
    document.head.appendChild(link);
  }

  /**
   * 预连接
   */
  function preconnect(href, options) {
    const url = new URL(href);
    const existing = document.querySelector(`link[rel="preconnect"][href="${href}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // 也添加 DNS 预解析
    dnsPrefetch(url.hostname);

    return link;
  }

  /**
   * 批量预加载
   */
  function preloadBatch(items) {
    items.forEach(function(item) {
      if (typeof item === 'string') {
        preload(item, guessResourceType(item));
      } else if (item.href) {
        preload(item.href, item.as || guessResourceType(item.href), item);
      }
    });
  }

  /**
   * 根据URL猜测资源类型
   */
  function guessResourceType(href) {
    if (/\.js$/.test(href)) return 'script';
    if (/\.css$/.test(href)) return 'style';
    if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(href)) return 'image';
    if (/\.(woff|woff2|ttf|otf|eot)$/i.test(href)) return 'font';
    if (/\.json$/.test(href)) return 'fetch';
    return 'fetch';
  }

  /**
   * 智能预加载 - 根据页面阶段决定加载内容
   */
  function smartPreload(phase) {
    switch (phase) {
      case 'immediate':
        // 首屏必需
        preloadBatch(PRELOAD_MAP.high);
        break;

      case 'loaded':
        // DOM ready 后加载中优先级
        preloadBatch(PRELOAD_MAP.medium);
        break;

      case 'idle':
        // 空闲时加载低优先级
        preloadBatch(PRELOAD_MAP.low);
        // 预连接可能用到的域名
        preconnect('https://fonts.googleapis.com');
        preconnect('https://fonts.gstatic.com');
        break;

      default:
        break;
    }
  }

  /**
   * 预测性预加载 - 根据用户行为预测
   */
  const linkObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const link = entry.target;
        const href = link.href;
        const as = link.dataset.preloadAs || guessResourceType(href);
        preload(href, as);
        linkObserver.unobserve(link);
      }
    });
  }, { rootMargin: '200px' });

  /**
   * 观察链接进行预测性预加载
   */
  function observeLinks(selector) {
    selector = selector || 'a[data-preload]';
    document.querySelectorAll(selector).forEach(function(link) {
      linkObserver.observe(link);
    });
  }

  /**
   * 预加载 hovered 链接
   */
  function setupHoverPreload() {
    document.addEventListener('mouseover', function(e) {
      const link = e.target.closest('a');
      if (link && link.href && link.ownerDocument === document) {
        const as = link.dataset.preloadAs || guessResourceType(link.href);
        // 低优先级预加载
        setTimeout(function() {
          preload(link.href, as);
        }, 100);
      }
    }, { passive: true });
  }

  /**
   * 预加载图片（鼠标悬停时）
   */
  function setupImagePreload() {
    document.addEventListener('mouseover', function(e) {
      const img = e.target.closest('img[data-src]');
      if (img && img.dataset.src) {
        // 立即预加载
        const tempImg = new Image();
        tempImg.src = img.dataset.src;
      }
    }, { passive: true });
  }

  /**
   * 空闲时预加载（requestIdleCallback polyfill）
   */
  function whenIdle(callback) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 3000 });
    } else {
      setTimeout(callback, 1);
    }
  }

  /**
   * 初始化
   */
  function init() {
    // 立即加载高优先级
    smartPreload('immediate');

    // DOM Ready 后加载中优先级
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        smartPreload('loaded');
        setupHoverPreload();
        observeLinks();
      });
    } else {
      smartPreload('loaded');
      setupHoverPreload();
      observeLinks();
    }

    // 空闲时加载低优先级
    whenIdle(function() {
      smartPreload('idle');
    });

    // 页面可见性变化时加载
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        smartPreload('idle');
      }
    });
  }

  // 初始化
  init();

  // 导出 API
  window.Preload = {
    preload: preload,
    preloadScript: preloadScript,
    preloadStylesheet: preloadStylesheet,
    preloadImage: preloadImage,
    preloadFont: preloadFont,
    dnsPrefetch: dnsPrefetch,
    preconnect: preconnect,
    preloadBatch: preloadBatch,
    smartPreload: smartPreload,
    observeLinks: observeLinks,
    whenIdle: whenIdle,
    guessResourceType: guessResourceType
  };
})();