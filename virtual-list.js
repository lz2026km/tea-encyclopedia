/**
 * 虚拟列表实现
 * 用于大量数据的高效渲染，只渲染可视区域内的元素
 */
(function() {
  'use strict';

  class VirtualList {
    constructor(options) {
      this.container = options.container;        // 容器元素
      this.items = options.items || [];           // 全部数据
      this.itemHeight = options.itemHeight || 200; // 每项高度
      this.bufferSize = options.bufferSize || 5;   // 缓冲数量
      this.renderItem = options.renderItem;       // 渲染函数
      this.key = options.key || 'id';             // 数据唯一键

      this.scrollTop = 0;
      this.containerHeight = 0;
      this.visibleCount = 0;
      this.startIndex = 0;
      this.endIndex = 0;

      this.initialized = false;
      this.itemHeights = {}; // 缓存每项高度（用于动态高度）

      this.init();
    }

    init() {
      if (!this.container) return;

      // 创建内部结构
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'virtual-list-wrapper';
      this.wrapper.style.cssText = 'position:relative;overflow:hidden;';

      this.content = document.createElement('div');
      this.content.className = 'virtual-list-content';

      this.wrapper.appendChild(this.content);
      this.container.appendChild(this.wrapper);

      // 缓存容器高度
      this.containerHeight = this.container.clientHeight;

      // 绑定滚动事件
      this.handleScroll = this.handleScroll.bind(this);
      this.container.addEventListener('scroll', this.handleScroll);

      // 窗口resize监听
      this.handleResize = this.debounce(this.handleResize.bind(this), 150);
      window.addEventListener('resize', this.handleResize);

      this.initialized = true;
      this.update();
    }

    handleScroll() {
      this.scrollTop = this.container.scrollTop;
      this.update();
    }

    handleResize() {
      this.containerHeight = this.container.clientHeight;
      this.update();
    }

    update() {
      if (!this.initialized) return;

      // 计算可见范围
      const scrollTop = this.scrollTop;
      const containerHeight = this.containerHeight;

      // 起始索引（含缓冲）
      let startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
      // 结束索引（含缓冲）
      let endIndex = Math.min(
        this.items.length,
        Math.ceil((scrollTop + containerHeight) / this.itemHeight) + this.bufferSize
      );

      // 如果范围没变且已渲染，跳过
      if (startIndex === this.startIndex && endIndex === this.endIndex) return;

      this.startIndex = startIndex;
      this.endIndex = endIndex;

      this.render();
    }

    render() {
      const visibleItems = this.items.slice(this.startIndex, this.endIndex);

      // 计算总高度（用于滚动条）
      const totalHeight = this.items.length * this.itemHeight;
      this.content.style.height = totalHeight + 'px';

      // 偏移量（让可见区域正确对齐）
      const offsetY = this.startIndex * this.itemHeight;
      this.content.style.transform = `translateY(${offsetY}px)`;

      // 只渲染可见项
      this.content.innerHTML = visibleItems.map((item, index) => {
        const actualIndex = this.startIndex + index;
        return `<div class="virtual-list-item" data-index="${actualIndex}" style="height:${this.itemHeight}px;position:absolute;top:0;left:0;right:0;">
          ${this.renderItem(item, actualIndex)}
        </div>`;
      }).join('');

      // 绑定可见项的事件
      this.content.querySelectorAll('.virtual-list-item').forEach(el => {
        el.addEventListener('click', (e) => {
          const index = parseInt(el.dataset.index);
          this.handleItemClick(this.items[index], index, e);
        });
      });
    }

    handleItemClick(item, index, event) {
      // 可被重写的点击处理
      if (this.onItemClick) {
        this.onItemClick(item, index, event);
      }
    }

    setItems(items) {
      this.items = items;
      this.update();
    }

    scrollToIndex(index) {
      const targetScroll = index * this.itemHeight;
      this.container.scrollTop = targetScroll;
    }

    refresh() {
      this.update();
    }

    destroy() {
      this.container.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
      if (this.wrapper && this.wrapper.parentNode) {
        this.wrapper.parentNode.removeChild(this.wrapper);
      }
      this.initialized = false;
    }

    // 防抖
    debounce(fn, delay) {
      let timer = null;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    }
  }

  // 茶叶网格虚拟列表（针对茶叶卡片优化）
  class TeaGridVirtualList extends VirtualList {
    constructor(options) {
      options.itemHeight = options.itemHeight || 280;
      options.bufferSize = options.bufferSize || 3;
      super(options);

      this.columns = options.columns || this.calculateColumns();
      this.onTeaClick = options.onTeaClick;
    }

    calculateColumns() {
      const width = window.innerWidth;
      if (width <= 480) return 2;
      if (width <= 768) return 3;
      if (width <= 1024) return 4;
      return 5;
    }

    render() {
      const containerWidth = this.container.clientWidth;
      this.columns = this.calculateColumns();
      const itemWidth = (containerWidth - 20) / this.columns;

      // 计算可见范围
      const scrollTop = this.scrollTop;
      const containerHeight = this.containerHeight;

      let startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) * this.columns - this.bufferSize * this.columns);
      let endIndex = Math.min(
        this.items.length,
        Math.ceil((scrollTop + containerHeight) / this.itemHeight) * this.columns + this.bufferSize * this.columns
      );

      if (startIndex === this.startIndex && endIndex === this.endIndex && this._lastColumns === this.columns) return;

      this.startIndex = startIndex;
      this.endIndex = endIndex;
      this._lastColumns = this.columns;

      const visibleItems = this.items.slice(this.startIndex, this.endIndex);

      // 总高度
      const rows = Math.ceil(this.items.length / this.columns);
      const totalHeight = rows * this.itemHeight;
      this.content.style.height = totalHeight + 'px';

      // 渲染
      this.content.innerHTML = visibleItems.map((item, index) => {
        const actualIndex = this.startIndex + index;
        const col = actualIndex % this.columns;
        const row = Math.floor(actualIndex / this.columns);
        const left = col * itemWidth;
        const top = row * this.itemHeight;

        return `<div class="virtual-tea-card" data-index="${actualIndex}" style="
          position:absolute;
          top:${top}px;
          left:${left}px;
          width:${itemWidth - 10}px;
          height:${this.itemHeight - 10}px;
        ">
          ${this.renderItem(item, actualIndex)}
        </div>`;
      }).join('');

      // 绑定点击
      this.content.querySelectorAll('.virtual-tea-card').forEach(el => {
        el.addEventListener('click', (e) => {
          const index = parseInt(el.dataset.index);
          if (this.onTeaClick) {
            this.onTeaClick(this.items[index], index, e);
          }
        });
      });
    }
  }

  // 导出到全局
  window.VirtualList = VirtualList;
  window.TeaGridVirtualList = TeaGridVirtualList;

  // 初始化虚拟滚动（用于茶叶列表）
  window.initTeaGridVirtual = function(containerId, items, options) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const defaults = {
      container: container,
      items: items,
      itemHeight: options.itemHeight || 300,
      columns: options.columns || 4,
      onTeaClick: options.onTeaClick || function(tea) { openModal(tea.id); }
    };

    // 使用简单的虚拟列表实现
    return new VirtualList({
      container: container,
      items: items,
      itemHeight: options.itemHeight || 280,
      bufferSize: 3,
      renderItem: options.renderItem,
      key: 'id'
    });
  };
})();