/**
 * 防抖(Debounce) 和 节流(Throttle) 工具函数
 * 用于优化高频事件处理，提升性能
 */
(function() {
  'use strict';

  /**
   * 防抖函数 - 事件触发n毫秒后执行，n毫秒内再次触发则重新计时
   * @param {Function} fn - 要执行的函数
   * @param {number} delay - 延迟时间（毫秒）
   * @param {boolean} immediate - 是否立即执行
   * @returns {Function}
   */
  function debounce(fn, delay, immediate) {
    let timer = null;
    let result;

    function debounced() {
      const context = this;
      const args = arguments;

      clearTimeout(timer);

      if (immediate) {
        const callNow = !timer;
        timer = setTimeout(function() {
          timer = null;
        }, delay);

        if (callNow) {
          result = fn.apply(context, args);
        }
      } else {
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      }

      return result;
    }

    debounced.cancel = function() {
      clearTimeout(timer);
      timer = null;
    };

    debounced.flush = function() {
      clearTimeout(timer);
      fn.apply(context, args);
    };

    return debounced;
  }

  /**
   * 节流函数 - 规定时间内只执行一次，稀释执行频率
   * @param {Function} fn - 要执行的函数
   * @param {number} limit - 时间间隔（毫秒）
   * @param {object} options - 配置选项
   * @returns {Function}
   */
  function throttle(fn, limit, options) {
    let inThrottle = false;
    let lastArgs = null;
    let lastContext = null;
    let result;

    const defaultOptions = {
      leading: true,  // 是否在开始时执行
      trailing: true  // 是否在结束时执行
    };

    options = Object.assign(defaultOptions, options || {});

    function throttled() {
      const context = this;
      const args = arguments;

      if (!inThrottle) {
        // 进入节流状态
        inThrottle = true;

        if (options.leading) {
          result = fn.apply(context, args);
        }

        setTimeout(function() {
          inThrottle = false;

          if (options.trailing && lastArgs) {
            fn.apply(lastContext, lastArgs);
            lastArgs = null;
            lastContext = null;
          }
        }, limit);
      } else {
        // 在节流中，保存最后一次参数
        lastArgs = args;
        lastContext = context;
      }

      return result;
    }

    throttled.cancel = function() {
      inThrottle = false;
      lastArgs = null;
      lastContext = null;
    };

    throttled.flush = function() {
      if (lastArgs && lastContext) {
        fn.apply(lastContext, lastArgs);
        lastArgs = null;
        lastContext = null;
      }
    };

    return throttled;
  }

  /**
   * 带回调的防抖
   */
  function debounceCallback(fn, delay) {
    let timer = null;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  /**
   * 带回调的节流
   */
  function throttleCallback(fn, limit) {
    let lastCall = 0;
    return function() {
      const now = Date.now();
      const context = this;
      const args = arguments;
      if (now - lastCall >= limit) {
        lastCall = now;
        fn.apply(context, args);
      }
    };
  }

  /**
   * 异步节流 - 确保异步操作完成后才允许下次执行
   */
  function throttleAsync(fn, limit) {
    let pending = false;
    let lastArgs = null;

    return function() {
      const context = this;
      const args = arguments;

      if (pending) {
        lastArgs = { context: context, args: args };
        return;
      }

      pending = true;
      const result = fn.apply(context, args);

      if (result && typeof result.then === 'function') {
        result.then(function() {
          pending = false;
          if (lastArgs) {
            throttleAsync(fn, limit).call(lastArgs.context, lastArgs.args);
            lastArgs = null;
          }
        }).catch(function() {
          pending = false;
        });
      } else {
        setTimeout(function() {
          pending = false;
          if (lastArgs) {
            throttleAsync(fn, limit).call(lastArgs.context, lastArgs.args);
            lastArgs = null;
          }
        }, limit);
      }

      return result;
    };
  }

  // 导出到全局
  window.debounce = debounce;
  window.throttle = throttle;
  window.debounceCallback = debounceCallback;
  window.throttleCallback = throttleCallback;
  window.throttleAsync = throttleAsync;

  // 快捷绑定方法
  window.debounceFn = function(fn, delay) {
    return debounce(fn, delay, false);
  };

  window.throttleFn = function(fn, limit) {
    return throttle(fn, limit, { leading: true, trailing: true });
  };
})();