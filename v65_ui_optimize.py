#!/usr/bin/env python3
"""
茶叶百科 v6.5 UI全面优化脚本
"""

import re

FILE_PATH = '/home/admin/hermes/projects/tea-encyclopedia/index.html'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    content = read_file(FILE_PATH)
    
    print("开始UI优化...")
    
    # ========== 1. 版本升级 v6.0 → v6.5 ==========
    print("[1/6] 版本升级 v6.0 -> v6.5...")
    content = content.replace('v6.0', 'v6.5')
    content = re.sub(r'version["\']?\s*[:=]\s*["\']?6\.0', 'version="6.5"', content)
    
    # ========== 2. Tab栏缩短 + 横向滚动 + 右侧渐变遮罩 ==========
    print("[2/6] Tab栏优化...")
    
    # Tab文本缩短
    tab_shorten = {
        '>🍵 名茶浏览<': '>🍵 名茶<',
    }
    
    # 应用Tab缩短
    for old, new in tab_shorten.items():
        content = content.replace(old, new)
    
    # Tab栏样式优化：横向滚动 + 右侧渐变遮罩
    old_tab_bar = '.tab-bar { display: flex; gap: .4rem; margin-bottom: 1.2rem; border-bottom: 2px solid var(--border); padding-bottom: .5rem; }'
    new_tab_bar = '.tab-bar { display: flex; gap: .3rem; margin-bottom: 1.2rem; border-bottom: 2px solid var(--border); padding-bottom: .5rem; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; position: relative; }\n.tab-bar::-webkit-scrollbar { display: none; }\n.tab-bar::after { content: ""; flex-shrink: 0; width: 2.5rem; pointer-events: none; background: linear-gradient(to right, transparent, var(--bg)); position: absolute; right: 0; top: 0; bottom: .5rem; z-index: 1; }'
    content = content.replace(old_tab_bar, new_tab_bar)
    
    # Tab按钮样式优化
    old_tab_btn = '.tab-btn { background: none; border: none; border-bottom: 3px solid transparent; padding: .4rem .8rem; cursor: pointer; font-size: .9rem; font-family: inherit; color: var(--text); opacity: .7; transition: all .2s; }'
    new_tab_btn = '.tab-btn { background: none; border: none; border-bottom: 3px solid transparent; padding: .4rem .7rem; cursor: pointer; font-size: .85rem; font-family: inherit; color: var(--text); opacity: .7; transition: all .2s; white-space: nowrap; flex-shrink: 0; }'
    content = content.replace(old_tab_btn, new_tab_btn)
    
    # ========== 3. 移动端筛选：浮动按钮 + 右侧滑入面板 ==========
    print("[3/6] 移动端筛选优化...")
    
    # 移动端浮动筛选按钮
    old_mobile_filter_btn = '<button class="mobile-filter-btn" id="mobileFilterBtn" onclick="openMobileFilter()" style="display:none;position:fixed;bottom:1.5rem;right:1.5rem;width:3.5rem;height:3.5rem;background:var(--c1);color:#fff;border:none;border-radius:50%;font-size:1.4rem;cursor:pointer;z-index:900;box-shadow:var(--shadow-md);align-items:center;justify-content:center;flex-direction:column;">'
    new_mobile_filter_btn = '<button class="mobile-filter-btn" id="mobileFilterBtn" onclick="openMobileFilter()" aria-label="打开筛选面板">'
    content = content.replace(old_mobile_filter_btn, new_mobile_filter_btn)
    
    # 移动端筛选面板 - 右侧滑入
    old_mob_panel = '<div id="mobPanel" style="display:none;position:fixed;inset:0;z-index:950;background:rgba(0,0,0,.5)" onclick="closeMobileFilter(event)">'
    new_mob_panel = '<div id="mobPanel" class="mob-overlay" onclick="closeMobileFilter(event)">'
    content = content.replace(old_mob_panel, new_mob_panel)
    
    # ========== 4. Modal底部弹出优化 ==========
    print("[4/6] Modal优化...")
    
    # Modal overlay无padding，底部弹出
    old_modal = '.modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 200; align-items: center; justify-content: center; padding: 1rem; }'
    new_modal = '.modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 200; align-items: flex-end; justify-content: center; padding: 0; }'
    content = content.replace(old_modal, new_modal)
    
    old_modal2 = '.modal { background: var(--bg); border-radius: var(--radius); max-width: 700px; width: 100%; max-height: 88vh; overflow: auto; box-shadow: var(--shadow-lg); position: relative; }'
    new_modal2 = '.modal { background: var(--bg); border-radius: var(--radius) var(--radius) 0 0; max-width: 700px; width: 100%; max-height: 90vh; overflow: auto; box-shadow: var(--shadow-lg); position: relative; }'
    content = content.replace(old_modal2, new_modal2)
    
    # 移动端Modal底部圆角0 + 隐藏图片
    old_modal_mobile = '  .modal-overlay { padding: 0; align-items: flex-end; }\n  .modal { max-height: 95vh; border-radius: 20px 20px 0 0; max-width: 100vw; }'
    new_modal_mobile = '  .modal-overlay { padding: 0; align-items: flex-end; background: rgba(0,0,0,.5); }\n  .modal { max-height: 95vh; border-radius: 16px 16px 0 0; max-width: 100vw; }\n  .modal-img-wrap, .modal-img { display: none; }\n  .modal-body { padding: 1rem; }'
    content = content.replace(old_modal_mobile, new_modal_mobile)
    
    # ========== 5. 深色模式对比度优化 ==========
    print("[5/6] 深色模式对比度优化...")
    
    # 深色模式.sb-tag.active对比度
    old_dark_sbtag = '''[data-theme="dark"] {
  --bg: #1a1a2e;
  --white: #2d2d44;
  --text: #e0e0e0;
  --border: #3d3d5c;
  --c1: #4a7c59;
  --c2: #5a9c6f;
  --c3: #3d6b4a;
  --c4: #2a2a3e;
  --c5: #74c69d;
  --shadow: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
}'''
    new_dark_sbtag = '''[data-theme="dark"] {
  --bg: #1a1a2e;
  --white: #2d2d44;
  --text: #e8e8e8;
  --border: #4a4a6a;
  --c1: #5a9c6f;
  --c2: #74c69d;
  --c3: #4a8a5a;
  --c4: #2a2a3e;
  --c5: #95d5b2;
  --shadow: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
}
[data-theme="dark"] .sb-tag.active { background: var(--c5); color: #1a1a2e; border-color: var(--c5); }
[data-theme="dark"] .tab-btn.active { color: var(--c5); border-bottom-color: var(--c5); }
[data-theme="dark"] .modal { background: #252540; }'''
    content = content.replace(old_dark_sbtag, new_dark_sbtag)
    
    # ========== 6. 新页面适配：Grid minmax(140px) + 表格横向滚动 ==========
    print("[6/6] 页面适配优化...")
    
    # 通用grid minmax(140px)自适应
    old_grid1 = 'grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));'
    new_grid1 = 'grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));'
    content = content.replace(old_grid1, new_grid1)
    
    # 表格横向滚动
    old_table_wrap = '.std-table-wrap { overflow-x: auto; }'
    new_table_wrap = '.std-table-wrap, .compare-table-wrap, .grade-table-wrap, .price-hist-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }'
    content = content.replace(old_table_wrap, new_table_wrap)
    
    # 移动端面板样式优化 - 右侧滑入
    old_mob_panel_style = '.mob-panel { position: fixed; bottom: 0; left: 0; right: 0; background: var(--bg); z-index: 200; border-radius: 20px 20px 0 0; box-shadow: 0 -4px 30px rgba(0,0,0,.2); transform: translateY(100%); transition: transform .3s ease; max-height: 75vh; overflow-y: auto; padding: 1.2rem; }'
    new_mob_panel_style = '.mob-panel { position: fixed; top: 0; right: 0; bottom: 0; left: auto; width: 300px; max-width: 85vw; background: var(--bg); z-index: 200; border-radius: 16px 0 0 16px; box-shadow: -4px 0 30px rgba(0,0,0,.2); transform: translateX(100%); transition: transform .3s ease; max-height: 100vh; overflow-y: auto; padding: 1.2rem; }'
    content = content.replace(old_mob_panel_style, new_mob_panel_style)
    
    old_mob_panel_on = '.mob-panel.on { transform: translateY(0); }'
    new_mob_panel_on = '.mob-panel.on { transform: translateX(0); }'
    content = content.replace(old_mob_panel_on, new_mob_panel_on)
    
    # 写入文件
    write_file(FILE_PATH, content)
    print("\nUI优化完成!")
    print("1. 版本升级 v6.0 -> v6.5")
    print("2. Tab栏缩短 + 横向滚动 + 右侧渐变遮罩")
    print("3. 移动端筛选浮动按钮 + 右侧滑入面板")
    print("4. Modal底部弹出优化")
    print("5. 深色模式对比度优化")
    print("6. 页面适配 (Grid minmax + 表格横向滚动)")

if __name__ == '__main__':
    main()
