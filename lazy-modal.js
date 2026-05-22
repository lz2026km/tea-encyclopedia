/**
 * 懒加载弹窗管理器 v3.2
 * 用于延迟加载弹窗内容，提升首屏性能
 */
window.LazyModal = {
  loaded: {},
  ensure(name) {
    if (this.loaded[name]) return;
    this.loaded[name] = true;
    console.log(`[LazyModal] 加载模块: ${name}`);
  }
};
