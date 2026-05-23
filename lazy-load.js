/**
 * 图片懒加载 + WebP 支持
 * 使用 IntersectionObserver 实现图片懒加载
 * 自动检测浏览器 WebP 支持并切换图片格式
 */
(function() {
  'use strict';

  // WebP 支持检测
  window.webpSupported = false;
  function detectWebP() {
    const img = new Image();
    img.onload = function() {
      window.webpSupported = img.width > 0 && img.height > 0;
      window.webpVersion = window.webpSupported ? 'webp' : 'jpg';
      document.documentElement.setAttribute('data-webp', window.webpSupported ? 'supported' : 'unsupported');
      console.log('[LazyLoad] WebP:', window.webpSupported ? '支持' : '不支持');
    };
    img.onerror = function() {
      window.webpSupported = false;
      window.webpVersion = 'jpg';
    };
    img.src = 'data:image/webp;base64,UklGRhwAAABXRUJQVlA4TCwAAAAvAQAAf18QAA==';
  }
  detectWebP();

  // 获取图片URL（处理WebP格式）
  window.getOptimizedImageUrl = function(baseName, type) {
    type = type || 'jpg';
    // 如果支持WebP且存在WebP版本，返回WebP
    if (window.webpSupported && type === 'jpg') {
      // 假设图片命名规则：名称_type.webp
      const webpName = baseName.replace(/\.jpg$/, '.webp');
      // 这里返回原名，因为实际项目中可能没有webp
      // 实际使用中根据服务器上的文件返回
    }
    return baseName;
  };

  // 懒加载初始化
  function initLazyLoad() {
    if (!('IntersectionObserver' in window)) {
      // 降级：直接加载所有图片
      document.querySelectorAll('img[data-src]').forEach(function(img) {
        img.src = img.dataset.src;
      });
      return;
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            // 创建新图片预加载
            const tempImg = new Image();
            tempImg.onload = function() {
              img.src = src;
              img.classList.add('lazy-loaded');
              img.removeAttribute('data-src');
            };
            tempImg.onerror = function() {
              // 图片加载失败，使用占位符
              img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23D8F3DC" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="30"%3E🍵%3C/text%3E%3C/svg%3E';
              img.classList.add('lazy-error');
            };
            tempImg.src = src;
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // 观察所有带 data-src 的图片
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      observer.observe(img);
    });

    // 观察背景图片
    document.querySelectorAll('[data-bg]').forEach(function(el) {
      observer.observe(el);
    });
  }

  // 背景图懒加载处理
  function handleBackgroundLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    const bgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const bg = el.dataset.bg;
          if (bg) {
            el.style.backgroundImage = 'url(' + bg + ')';
            el.classList.add('bg-loaded');
            bgObserver.unobserve(el);
          }
        }
      });
    }, { rootMargin: '100px 0px' });

    document.querySelectorAll('[data-bg]').forEach(function(el) {
      bgObserver.observe(el);
    });
  }

  // 图片错误处理
  function initImageErrorHandler() {
    document.addEventListener('error', function(e) {
      if (e.target.tagName === 'IMG' && !e.target.classList.contains('lazy-error')) {
        e.target.onerror = null;
        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23D8F3DC" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="30"%3E🍵%3C/text%3E%3C/svg%3E';
        e.target.classList.add('img-error');
      }
    }, true);
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initLazyLoad();
      handleBackgroundLazyLoad();
      initImageErrorHandler();
    });
  } else {
    initLazyLoad();
    handleBackgroundLazyLoad();
    initImageErrorHandler();
  }

  // 公开API
  window.LazyLoad = {
    refresh: function() {
      initLazyLoad();
      handleBackgroundLazyLoad();
    },
    isWebpSupported: function() {
      return window.webpSupported;
    }
  };
})();