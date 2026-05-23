/**
 * 代码分割(Code Splitting) 模块
 * 实现模块按需加载，提升首屏加载性能
 */
(function() {
  'use strict';

  // 模块注册表
  const moduleRegistry = {
    // 预定义模块及其依赖
    'modal': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 modal 模块');
        return Promise.resolve();
      }
    },
    'charts': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 charts 模块');
        return Promise.resolve();
      }
    },
    'ranking': {
      deps: ['charts'],
      load: function() {
        console.log('[CodeSplit] 加载 ranking 模块');
        return Promise.resolve();
      }
    },
    'compare': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 compare 模块');
        return Promise.resolve();
      }
    },
    'diary': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 diary 模块');
        return Promise.resolve();
      }
    },
    'timeline': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 timeline 模块');
        return Promise.resolve();
      }
    },
    'origin': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 origin 模块');
        return Promise.resolve();
      }
    },
    'storage': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 storage 模块');
        return Promise.resolve();
      }
    },
    'process': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 process 模块');
        return Promise.resolve();
      }
    },
    'term': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 term 模块');
        return Promise.resolve();
      }
    },
    'news': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 news 模块');
        return Promise.resolve();
      }
    },
    'season': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 season 模块');
        return Promise.resolve();
      }
    },
    'standard': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 standard 模块');
        return Promise.resolve();
      }
    },
    'grade': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 grade 模块');
        return Promise.resolve();
      }
    },
    'pricehistory': {
      deps: ['charts'],
      load: function() {
        console.log('[CodeSplit] 加载 pricehistory 模块');
        return Promise.resolve();
      }
    },
    'halloffame': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 halloffame 模块');
        return Promise.resolve();
      }
    },
    'pricemap': {
      deps: ['charts'],
      load: function() {
        console.log('[CodeSplit] 加载 pricemap 模块');
        return Promise.resolve();
      }
    },
    'typepie': {
      deps: ['charts'],
      load: function() {
        console.log('[CodeSplit] 加载 typepie 模块');
        return Promise.resolve();
      }
    },
    'origin3d': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 origin3d 模块');
        return Promise.resolve();
      }
    },
    'pricechart': {
      deps: ['charts'],
      load: function() {
        console.log('[CodeSplit] 加载 pricechart 模块');
        return Promise.resolve();
      }
    },
    'brewheatmap': {
      deps: ['charts'],
      load: function() {
        console.log('[CodeSplit] 加载 brewheatmap 模块');
        return Promise.resolve();
      }
    },
    'solarterms': {
      deps: [],
      load: function() {
        console.log('[CodeSplit] 加载 solarterms 模块');
        return Promise.resolve();
      }
    }
  };

  // 已加载模块缓存
  const loadedModules = {};
  // 正在加载的模块
  const loadingModules = {};

  /**
   * 动态加载JS文件
   */
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = true;
      script.onload = function() {
        resolve();
      };
      script.onerror = function() {
        reject(new Error('Failed to load script: ' + src));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * 加载CSS文件
   */
  function loadCSS(href) {
    return new Promise(function(resolve, reject) {
      // 检查是否已存在
      if (document.querySelector('link[href="' + href + '"]')) {
        resolve();
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = function() { resolve(); };
      link.onerror = function() { reject(new Error('Failed to load CSS: ' + href)); };
      document.head.appendChild(link);
    });
  }

  /**
   * 加载模块（带依赖解析）
   */
  function loadModule(name) {
    // 已加载
    if (loadedModules[name]) {
      return Promise.resolve(loadedModules[name]);
    }

    // 正在加载
    if (loadingModules[name]) {
      return loadingModules[name];
    }

    const module = moduleRegistry[name];
    if (!module) {
      return Promise.reject(new Error('Module not found: ' + name));
    }

    // 开始加载
    loadingModules[name] = new Promise(function(resolve, reject) {
      // 先加载依赖
      const depPromises = module.deps.map(function(dep) {
        return loadModule(dep);
      });

      Promise.all(depPromises)
        .then(function() {
          // 加载主模块
          return module.load();
        })
        .then(function(result) {
          loadedModules[name] = result || true;
          delete loadingModules[name];
          resolve(result);
        })
        .catch(function(err) {
          delete loadingModules[name];
          reject(err);
        });
    });

    return loadingModules[name];
  }

  /**
   * 预加载模块（不阻塞）
   */
  function preloadModule(name) {
    const module = moduleRegistry[name];
    if (!module || loadedModules[name] || loadingModules[name]) {
      return;
    }
    // 低优先级加载
    setTimeout(function() {
      loadModule(name).catch(function(e) {
        console.warn('[CodeSplit] Preload failed:', name, e);
      });
    }, 100);
  }

  /**
   * 注册新模块
   */
  function registerModule(name, deps, loader) {
    moduleRegistry[name] = {
      deps: deps || [],
      load: loader
    };
  }

  /**
   * 批量预加载模块
   */
  function preloadModules(names) {
    names.forEach(function(name) {
      preloadModule(name);
    });
  }

  /**
   * 智能预加载 - 根据Tab切换预判
   */
  function smartPreload(currentTab) {
    // 预判可能访问的模块
    const predictions = {
      'grid': ['compare', 'diary'],
      'compare': ['compare'],
      'timeline': ['timeline'],
      'origin': ['origin'],
      'pricemap': ['pricemap', 'charts'],
      'typepie': ['typepie', 'charts'],
      'origin3d': ['origin3d'],
      'ranking': ['ranking', 'charts'],
      'pricechart': ['pricechart', 'charts'],
      'brewheatmap': ['brewheatmap', 'charts'],
      'solarterms': ['solarterms'],
      'storage': ['storage'],
      'process': ['process'],
      'term': ['term'],
      'news': ['news'],
      'season': ['season'],
      'standard': ['standard'],
      'grade': ['grade'],
      'pricehistory': ['pricehistory', 'charts'],
      'halloffame': ['halloffame'],
      'encyclopedia': ['ranking', 'compare']
    };

    const toPreload = predictions[currentTab] || [];
    toPreload.forEach(function(name) {
      preloadModule(name);
    });
  }

  /**
   * 获取已加载模块状态
   */
  function getLoadedModules() {
    return Object.keys(loadedModules);
  }

  // 导出到全局
  window.CodeSplit = {
    load: loadModule,
    preload: preloadModule,
    preloadModules: preloadModules,
    register: registerModule,
    smartPreload: smartPreload,
    isLoaded: function(name) {
      return !!loadedModules[name];
    },
    getLoaded: getLoadedModules,
    registry: moduleRegistry
  };

  // 监听Tab切换进行智能预加载
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'tabChanged') {
      smartPreload(e.data.tab);
    }
  });

  // 导出快捷方法
  window.loadModule = loadModule;
  window.preloadModule = preloadModule;
})();