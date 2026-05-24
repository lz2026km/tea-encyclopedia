// 茶叶百科 v7.1 Service Worker - 优化版
const CACHE_NAME = 'tea-encyclopedia-v7.1';
const OFFLINE_URL = '/index.html';

// 资源分类
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/tea_data.js',
  '/lazy-load.js',
  '/debounce-throttle.js',
  '/virtual-list.js',
  '/code-split.js',
  '/lazy-modal.js'
];

const FONT_ASSETS = [];

const IMAGE_ASSETS = [
  '/images/'
];

const DATA_ASSETS = [
  '/tea_data.js',
  '/glossary_data.js',
  '/news_data.js',
  '/season_data.js',
  '/china.json'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Install failed:', err);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // 删除旧版本缓存
            if (cacheName !== CACHE_NAME && cacheName.startsWith('tea-encyclopedia')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// 预缓存容量估算
const CACHE_QUOTA = {
  maxEntries: 200,
  maxSize: 50 * 1024 * 1024 // 50MB
};

// 获取策略
function getStrategy(request) {
  const url = new URL(request.url);

  // 同源请求
  if (url.origin === self.location.origin) {
    // HTML - 网络优先
    if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
      return 'networkFirst';
    }

    // 静态资源 - 缓存优先
    if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset))) {
      return 'cacheFirst';
    }

    // 数据文件 - 缓存优先，fallback网络
    if (DATA_ASSETS.some(asset => url.pathname.endsWith(asset))) {
      return 'staleWhileRevalidate';
    }

    // 图片 - 缓存优先
    if (url.pathname.includes('/images/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname)) {
      return 'cacheFirst';
    }

    // JS/CSS - 缓存优先
    if (/\.(js|css)$/i.test(url.pathname)) {
      return 'cacheFirst';
    }

    // 默认：网络优先
    return 'networkFirst';
  }

  // 跨域请求 - 仅在支持时缓存
  return 'networkFirst';
}

// 网络优先策略
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

// 缓存优先策略
async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    // 后台更新
    fetchAndCache(request);
    return cached;
  }
  return fetchAndCache(request);
}

// Stale-While-Revalidate 策略
async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);
  const networkPromise = fetchAndCache(request);
  return cached || networkPromise;
}

// 获取并缓存
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      // 限制缓存大小
      const cacheCount = await cache.keys().then(keys => keys.length);
      if (cacheCount >= CACHE_QUOTA.maxEntries) {
        // 删除最老的条目
        cache.keys().then(keys => {
          if (keys.length >= CACHE_QUOTA.maxEntries) {
            cache.delete(keys[0]);
          }
        });
      }
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

// 缓存清理
async function cleanupCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();

  if (keys.length > CACHE_QUOTA.maxEntries) {
    const deleteCount = keys.length - CACHE_QUOTA.maxEntries;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// Fetch 事件处理
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非GET请求
  if (request.method !== 'GET') return;

  // 跳过 chrome-extension 和其他非http请求
  if (!url.protocol.startsWith('http')) return;

  // 跨域处理
  if (url.origin !== self.location.origin) {
    // 跨域图片缓存
    if (request.destination === 'image') {
      event.respondWith(
        caches.match(request)
          .then((cached) => {
            if (cached) return cached;
            return fetch(request)
              .then((response) => {
                if (response.ok) {
                  const clone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(request, clone));
                }
                return response;
              })
              .catch(() => {
                // 返回占位图
                return new Response(
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#D8F3DC" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-size="30">🍵</text></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              });
          })
      );
      return;
    }
    return;
  }

  const strategy = getStrategy(request);

  event.respondWith(
    (async () => {
      try {
        switch (strategy) {
          case 'networkFirst':
            return await networkFirstStrategy(request);
          case 'cacheFirst':
            return await cacheFirstStrategy(request);
          case 'staleWhileRevalidate':
            return await staleWhileRevalidateStrategy(request);
          default:
            return await networkFirstStrategy(request);
        }
      } catch (error) {
        // 网络失败时尝试返回缓存或离线页面
        const cached = await caches.match(request);
        if (cached) return cached;

        // 对于导航请求返回离线页面
        if (request.mode === 'navigate') {
          const offlinePage = await caches.match(OFFLINE_URL);
          if (offlinePage) return offlinePage;
        }

        return new Response('离线', { status: 503, statusText: 'Service Unavailable' });
      }
    })()
  );
});

// 消息处理
self.addEventListener('message', (event) => {
  const { action, data } = event.data || {};

  switch (action) {
    case 'skipWaiting':
      self.skipWaiting();
      break;

    case 'clearCache':
      caches.delete(CACHE_NAME)
        .then(() => event.ports[0]?.postMessage({ success: true }));
      break;

    case 'getCacheSize':
      caches.open(CACHE_NAME)
        .then(async (cache) => {
          const keys = await cache.keys();
          event.ports[0]?.postMessage({ count: keys.length });
        });
      break;

    case 'prefetch':
      if (data && data.urls) {
        data.urls.forEach((url) => {
          fetch(url).then((response) => {
            if (response.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(url, response);
              });
            }
          }).catch(() => {});
        });
      }
      break;

    default:
      break;
  }
});

// 后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tea-data') {
    event.waitUntil(syncTeaData());
  }
});

async function syncTeaData() {
  try {
    const response = await fetch('/tea_data.js');
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/tea_data.js', response);
      // 通知客户端更新
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage({ type: 'dataUpdated' });
      });
    }
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}

// 定期清理 - 使用指数退避策略减少不必要的唤醒
let cacheCleanupInterval = 60000;
let lastCleanup = Date.now();
async function scheduledCleanup() {
  if (Date.now() - lastCleanup >= cacheCleanupInterval) {
    await cleanupCache();
    lastCleanup = Date.now();
    // 逐渐增加间隔，最大5分钟
    cacheCleanupInterval = Math.min(cacheCleanupInterval * 1.5, 300000);
  }
}
// 改为基于消息触发而非固定间隔
self.addEventListener('message', (event) => {
  if (event.data?.action === 'cleanupCache') {
    cleanupCache();
  }
});