#!/usr/bin/env python3
"""茶叶百科v6.0 补全缺失的render函数 - 执行修复"""

html_path = '/home/admin/hermes/projects/tea-encyclopedia/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')

# Find the stub block (lines 6112-6116 area, 0-indexed)
stub_start = None
stub_end = None
for i, line in enumerate(lines):
    if '// Missing tab render stubs' in line:
        stub_start = i
    if stub_start is not None and i > stub_start and '// ============================================================' in line:
        stub_end = i
        break

print(f"Stub block: lines {stub_start+1}-{stub_end+1} ({stub_end-stub_start+1} lines)")

old_lines = lines[stub_start:stub_end+1]
old_string = '\n'.join(old_lines)

if 'showToast' not in old_string:
    print("ERROR: showToast not found in old_string")
    exit(1)

# Build complete replacement for the 4 stubs
new_stub_block = '''// ============================================================
// 术语词典
// ============================================================
function renderTermPage() {
  var el = document.getElementById('termPageContent');
  if (!el) return;
  var categories = [
    { name: '茶叶类别', icon: '🍃', terms: [
      { cn: '绿茶', en: 'Green Tea', desc: '不发酵茶，杀青后制成，色泽绿润' },
      { cn: '红茶', en: 'Black Tea', desc: '全发酵茶，色泽红褐，汤色红艳' },
      { cn: '乌龙茶', en: 'Oolong Tea', desc: '半发酵茶，介于绿红之间' },
      { cn: '白茶', en: 'White Tea', desc: '微发酵茶，轻微发酵加工' },
      { cn: '黄茶', en: 'Yellow Tea', desc: '轻发酵茶，闷黄工艺' },
      { cn: '黑茶', en: 'Dark Tea', desc: '后发酵茶，越陈越香' },
      { cn: '花茶', en: 'Scented Tea', desc: '再加工茶，窨制工艺' }
    ]},
    { name: '制茶工艺', icon: '🔥', terms: [
      { cn: '杀青', en: 'Enzyme Inactivation', desc: '高温钝化氧化酶，停止发酵' },
      { cn: '揉捻', en: 'Rolling', desc: '成形并破坏细胞组织，挤出茶汁' },
      { cn: '发酵', en: 'Fermentation', desc: '氧化发酵，形成特有色泽与风味' },
      { cn: '萎凋', en: 'Withering', desc: '摊晾失水，使叶片变软' },
      { cn: '渥堆', en: 'Piling', desc: '黑茶后发酵，洒水渥堆' },
      { cn: '闷黄', en: 'Yellowing', desc: '黄茶特有，湿热闷堆' },
      { cn: '干燥', en: 'Drying', desc: '定型提香，降低含水率' }
    ]},
    { name: '茶叶等级', icon: '🏆', terms: [
      { cn: '特级', en: 'Superior Grade', desc: '芽头肥壮，满披白毫' },
      { cn: '一级', en: 'Grade 1', desc: '一芽一叶为主，匀整' },
      { cn: '二级', en: 'Grade 2', desc: '一芽二叶为主' },
      { cn: '三级', en: 'Grade 3', desc: '一芽二至三叶' },
      { cn: '四级', en: 'Grade 4', desc: '一芽三叶为主' },
      { cn: '五级', en: 'Grade 5', desc: '一芽四至五叶' }
    ]},
    { name: '冲泡术语', icon: '🫖', terms: [
      { cn: '上投法', en: 'Top Pouring', desc: '先注水后投茶，适用于细嫩绿茶' },
      { cn: '中投法', en: 'Middle Pouring', desc: '先注1/3水，投茶，再注水' },
      { cn: '下投法', en: 'Bottom Pouring', desc: '先投茶后注水，适用于大众茶' },
      { cn: '醒茶', en: 'Awakening Tea', desc: '温润泡，唤醒茶叶' },
      { cn: '留根', en: 'Leave Roots', desc: '不出尽茶汤，保留茶味' }
    ]},
    { name: '茶具名称', icon: '🏺', terms: [
      { cn: '茶针', en: 'Tea Needle', desc: '通壶嘴，拨茶叶' },
      { cn: '茶则', en: 'Tea Measurer', desc: '量取干茶' },
      { cn: '茶海', en: 'Tea Pitcher', desc: '均匀茶汤' },
      { cn: '茶盅', en: 'Tea Tray', desc: '盛接滴水' },
      { cn: '盖碗', en: 'Gaiwan', desc: '泡茶器皿' },
      { cn: '紫砂壶', en: 'Yixing Teapot', desc: '宜兴紫砂，透气性好' }
    ]},
    { name: '品鉴术语', icon: '👃', terms: [
      { cn: '回甘', en: 'Hui Gan (Sweet Aftertaste)', desc: '入口微苦，转化甘甜' },
      { cn: '生津', en: 'Sheng Jin (Salivation)', desc: '口腔分泌唾液' },
      { cn: '喉韵', en: 'Hou Yun (Throat Resonance)', desc: '茶汤入喉的舒适感' },
      { cn: '挂杯', en: 'Guabei (Hang Cup)', desc: '茶香留于杯壁' },
      { cn: '收敛性', en: 'Astringency', desc: '茶多酚带来的涩感' },
      { cn: '醇厚', en: 'Mellow & Thick', desc: '茶汤滋味饱满' }
    ]},
    { name: '茶文化', icon: '📜', terms: [
      { cn: '茶道', en: 'Sado (Tea Way)', desc: '日本茶道，以和敬清寂为精神' },
      { cn: '茶艺', en: 'Chinese Tea Ceremony', desc: '中国泡茶艺术' },
      { cn: '茶圣', en: 'Tea Saint', desc: '陆羽，唐代《茶经》作者' },
      { cn: '径山茶宴', en: 'King Mountain Tea Banquet', desc: '宋代禅院茶礼' },
      { cn: '茶马古道', en: 'Tea-Horse Road', desc: '云南-西藏古代贸易路线' },
      { cn: '丝路茶香', en: 'Silk Road Tea', desc: '沿丝路传播的中国茶文化' }
    ]}
  ];

  var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem">';
  categories.forEach(function(cat) {
    html += '<div style="background:var(--white);border-radius:12px;border:1.5px solid var(--border);padding:1rem;box-shadow:var(--shadow-sm)">' +
      '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.8rem;padding-bottom:.6rem;border-bottom:1.5px solid var(--border)">' +
        '<span style="font-size:1.5rem">' + cat.icon + '</span>' +
        '<span style="font-weight:700;color:var(--c5);font-size:1rem">' + cat.name + '</span>' +
      '</div>';
    cat.terms.forEach(function(term) {
      html += '<div style="display:flex;gap:.6rem;padding:.4rem 0;border-bottom:1px solid var(--border)">' +
        '<div style="flex:1">' +
          '<div style="font-weight:600;color:var(--c5);font-size:.88rem">' + term.cn + '</div>' +
          '<div style="color:var(--c2);font-size:.72rem;font-style:italic">' + term.en + '</div>' +
        '</div>' +
        '<div style="color:var(--text);font-size:.75rem;flex:.8;line-height:1.4">' + term.desc + '</div>' +
      '</div>';
    });
    html += '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

// ============================================================
// 茶叶新闻
// ============================================================
function renderNewsPage() {
  var el = document.getElementById('newsPageContent');
  if (!el) return;
  var categories = ['全部','行业动态','价格行情','科技前沿','文化活动','出口贸易','国家标准','健康研究','新茶上市'];
  var newsData = [
    { cat: '行业动态', date: '2026-05-20', title: '2026春茶季：云南普洱古树茶产量下降15%，价格普涨', tag: '⚠️', color: '#e74c3c' },
    { cat: '价格行情', date: '2026-05-18', title: '西湖龙井明前茶均价突破8000元/斤，创历史新高', tag: '📈', color: '#27ae60' },
    { cat: '科技前沿', date: '2026-05-15', title: '浙江大学发布茶叶自动化采摘机器人，效率提升300%', tag: '🤖', color: '#3498db' },
    { cat: '文化活动', date: '2026-05-12', title: '杭州"国际茶日"活动圆满落幕，32国使节参与', tag: '🌐', color: '#9b59b6' },
    { cat: '出口贸易', date: '2026-05-10', title: '2026年一季度中国茶叶出口量达12万吨，同比增长8.3%', tag: '📦', color: '#f39c12' },
    { cat: '国家标准', date: '2026-05-08', title: '新《茶叶中农药最大残留限量》GB 2763-2026正式实施', tag: '📋', color: '#34495e' },
    { cat: '健康研究', date: '2026-05-05', title: '研究证实：每天4杯绿茶可将认知衰退风险降低32%', tag: '🧠', color: '#1abc9c' },
    { cat: '新茶上市', date: '2026-05-03', title: '福鼎白茶头采银针上市，精品价格达5000元+/斤', tag: '🆕', color: '#e91e63' },
    { cat: '行业动态', date: '2026-04-28', title: '印度阿萨姆茶园遭遇极端高温，产量预计减少20%', tag: '⚠️', color: '#e74c3c' },
    { cat: '价格行情', date: '2026-04-25', title: '安溪铁观音春茶上市，品质优于去年，价格平稳', tag: '📊', color: '#27ae60' },
    { cat: '文化活动', date: '2026-04-20', title: '四川国际茶文化节开幕，展示藏茶文化魅力', tag: '🎭', color: '#9b59b6' },
    { cat: '健康研究', date: '2026-04-15', title: '最新研究：乌龙茶提取物可显著改善肠道菌群', tag: '🔬', color: '#1abc9c' }
  ];
  window._newsActiveCat = window._newsActiveCat || '全部';
  window._renderNewsFilter = function(cat) {
    window._newsActiveCat = cat;
    el.innerHTML = renderNewsInner(cat);
  };
  el.innerHTML = renderNewsInner('全部');

  function renderNewsInner(cat) {
    var filtered = cat === '全部' ? newsData : newsData.filter(function(n) { return n.cat === cat; });
    var h = '<div style="margin-bottom:1rem;display:flex;flex-wrap:wrap;gap:.5rem">';
    categories.forEach(function(c) {
      var isActive = c === cat;
      h += '<button onclick="_renderNewsFilter(\\'' + c + '\\')" style="padding:.35rem .8rem;border-radius:20px;border:1.5px solid ' + (isActive ? 'var(--c1)' : 'var(--border)') + ';background:' + (isActive ? 'var(--c1)' : 'var(--white)') + ';color:' + (isActive ? '#fff' : 'var(--text)') + ';font-size:.8rem;cursor:pointer;font-family:inherit">' + c + '</button>';
    });
    h += '</div><div style="display:grid;gap:.8rem">';
    filtered.forEach(function(n) {
      h += '<div style="background:var(--white);border-radius:10px;border:1.5px solid var(--border);padding:1rem;display:flex;gap:1rem;align-items:flex-start;transition:all .2s" onmouseover="this.style.borderColor=\\'var(--c1)\\'" onmouseout="this.style.borderColor=\\'var(--border)\\'">' +
        '<div style="width:40px;height:40px;border-radius:8px;background:' + n.color + ';display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem;flex-shrink:0">' + n.tag + '</div>' +
        '<div style="flex:1">' +
          '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem">' +
            '<span style="font-size:.72rem;padding:.15rem .5rem;background:var(--c4);border-radius:10px;color:var(--text)">' + n.cat + '</span>' +
            '<span style="font-size:.72rem;color:var(--c2)">' + n.date + '</span>' +
          '</div>' +
          '<div style="font-weight:600;color:var(--text);font-size:.9rem;line-height:1.4">' + n.title + '</div>' +
        '</div>' +
      '</div>';
    });
    h += '</div>';
    return h;
  }
}

// ============================================================
// 四季饮茶
// ============================================================
function renderSeasonPage() {
  var el = document.getElementById('seasonPageContent');
  if (!el) return;
  var seasons = [
    {
      name: '春', icon: '🌸', color: '#e91e63', dates: '立春—立夏（2-5月）',
      principle: '春属木，对应肝脏，宜疏肝理气。春季肝气旺盛，宜饮花茶和轻发酵茶。',
      teas: [
        { name: '茉莉花茶', desc: '疏肝解郁，理气安神', emoji: '🌸' },
        { name: '碧螺春', desc: '鲜嫩清香，助阳气升发', emoji: '🍃' },
        { name: '龙井', desc: '清肝明目，醒脑提神', emoji: '🏔️' },
        { name: '白毫银针', desc: '毫香清鲜，润燥生津', emoji: '🤍' }
      ]
    },
    {
      name: '夏', icon: '☀️', color: '#f39c12', dates: '立夏—立秋（5-8月）',
      principle: '夏属火，对应心脏，宜清心降火。夏季心火旺盛，宜饮绿茶和白茶。',
      teas: [
        { name: '西湖龙井', desc: '清热消暑，止渴生津', emoji: '🍃' },
        { name: '安吉白茶', desc: '氨基酸丰富，清凉解暑', emoji: '🤍' },
        { name: '太平猴魁', desc: '滋味浓爽，降火去燥', emoji: '🏔️' },
        { name: '茉莉银毫', desc: '花香馥郁，清热利湿', emoji: '🌸' }
      ]
    },
    {
      name: '秋', icon: '🍂', color: '#e67e22', dates: '立秋—立冬（8-11月）',
      principle: '秋属金，对应肺脏，宜润燥养肺。秋季干燥，宜饮乌龙茶和红茶。',
      teas: [
        { name: '铁观音', desc: '音韵明显，润肺生津', emoji: '🍵' },
        { name: '凤凰单丛', desc: '香气馥郁，润燥清热', emoji: '🌸' },
        { name: '正山小种', desc: '松烟香浓，润肺暖胃', emoji: '🫖' },
        { name: '茉莉龙珠', desc: '香高味醇，养阴润燥', emoji: '🌸' }
      ]
    },
    {
      name: '冬', icon: '❄️', color: '#3498db', dates: '立冬—立春（11-2月）',
      principle: '冬属水，对应肾脏，宜温补驱寒。冬季肾气虚弱，宜饮红茶和黑茶。',
      teas: [
        { name: '祁门红茶', desc: '温中散寒，暖胃驱湿', emoji: '🫖' },
        { name: '熟普洱', desc: '温补肾气，消食解腻', emoji: '🟤' },
        { name: '大红袍', desc: '岩骨花香，暖身益智', emoji: '🍵' },
        { name: '红枣老茶', desc: '补气养血，驱寒暖身', emoji: '❤️' }
      ]
    }
  ];
  var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem">';
  seasons.forEach(function(season) {
    html += '<div style="background:var(--white);border-radius:16px;border:2px solid ' + season.color + ';overflow:hidden;box-shadow:var(--shadow-md)">' +
      '<div style="background:' + season.color + ';padding:1rem;display:flex;align-items:center;gap:.8rem">' +
        '<span style="font-size:2rem">' + season.icon + '</span>' +
        '<div>' +
          '<div style="font-size:1.4rem;font-weight:700;color:#fff">' + season.name + '季饮茶</div>' +
          '<div style="font-size:.75rem;color:rgba(255,255,255,.85)">' + season.dates + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="padding:1rem">' +
        '<div style="background:var(--c4);border-radius:8px;padding:.7rem;margin-bottom:.8rem;font-size:.8rem;color:var(--text);line-height:1.5">💡 ' + season.principle + '</div>' +
        '<div style="display:grid;gap:.5rem">';
    season.teas.forEach(function(tea) {
      html += '<div style="display:flex;align-items:center;gap:.6rem;padding:.5rem;background:var(--c4);border-radius:8px">' +
        '<span style="font-size:1.2rem">' + tea.emoji + '</span>' +
        '<div style="flex:1">' +
          '<div style="font-weight:600;color:var(--text);font-size:.88rem">' + tea.name + '</div>' +
          '<div style="font-size:.72rem;color:var(--c2)">' + tea.desc + '</div>' +
        '</div>' +
      '</div>';
    });
    html += '</div></div></div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

// ============================================================
// 标准对照
// ============================================================
function renderStandardPage() {
  var el = document.getElementById('standardPageContent');
  if (!el) return;
  var html = '<style>.std-table{width:100%;border-collapse:collapse;font-size:.82rem}.std-table th,.std-table td{padding:.6rem;border:1.5px solid var(--border);text-align:left}.std-table th{background:var(--c1);color:#fff;font-weight:600}.std-table tr:nth-child(even){background:var(--c4)}.std-cert{display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .8rem;background:var(--white);border:1.5px solid var(--border);border-radius:20px;margin:.3rem;font-size:.8rem;cursor:pointer;transition:all .2s}.std-cert:hover{background:var(--c1);color:#fff;border-color:var(--c1)}.std-cert-icon{font-size:1.2rem}</style>';
  html += '<div style="margin-bottom:1.5rem">';
  html += '<div style="background:var(--white);border-radius:12px;border:1.5px solid var(--border);padding:1rem;margin-bottom:1rem;box-shadow:var(--shadow-sm)">' +
    '<h3 style="color:var(--c5);margin-bottom:.8rem;font-size:1rem">🌾 农药残留限量对比（mg/kg）</h3>' +
    '<div style="overflow-x:auto">' +
    '<table class="std-table"><thead><tr><th>农药名称</th><th>中国 GB 2763</th><th>日本肯定列表</th><th>欧盟 EC 396</th><th>说明</th></tr></thead><tbody>' +
    '<tr><td>苯醚甲环唑</td><td style="color:#e74c3c">10</td><td style="color:#e74c3c">30</td><td style="color:#27ae60">0.01</td><td>欧盟最严格</td></tr>' +
    '<tr><td>啶虫脒</td><td style="color:#f39c12">2</td><td style="color:#e74c3c">10</td><td style="color:#27ae60">0.01</td><td>欧盟近乎零检出</td></tr>' +
    '<tr><td>吡虫啉</td><td style="color:#f39c12">0.5</td><td style="color:#e74c3c">10</td><td style="color:#27ae60">0.01</td><td>中国较宽松</td></tr>' +
    '<tr><td>草甘膦</td><td style="color:#27ae60">1</td><td style="color:#f39c12">1</td><td style="color:#e74c3c">0.1</td><td>欧盟降低20倍</td></tr>' +
    '<tr><td>滴滴涕</td><td style="color:#27ae60">0.2</td><td style="color:#f39c12">0.5</td><td style="color:#27ae60">0.05</td><td>全面禁用</td></tr>' +
    '<tr><td>氯氰菊酯</td><td style="color:#f39c12">15</td><td style="color:#e74c3c">20</td><td style="color:#27ae60">0.5</td><td>欧盟相差30倍</td></tr>' +
    '<tr><td>溴氰菊酯</td><td style="color:#f39c12">5</td><td style="color:#e74c3c">10</td><td style="color:#27ae60">0.01</td><td>欧盟近乎禁限</td></tr>' +
    '<tr><td>茚虫威</td><td style="color:#27ae60">2</td><td style="color:#f39c12">5</td><td style="color:#27ae60">0.01</td><td>中国与日本较宽松</td></tr>' +
    '</tbody></table></div></div>';
  html += '<div style="background:var(--white);border-radius:12px;border:1.5px solid var(--border);padding:1rem;box-shadow:var(--shadow-sm)">' +
    '<h3 style="color:var(--c5);margin-bottom:.8rem;font-size:1rem">🏅 认证标识说明</h3>' +
    '<div style="display:flex;flex-wrap:wrap;gap:.5rem">';
  var certs = [
    { icon: '🏅', name: '有机食品', color: '#27ae60', desc: '纯天然，无化学合成' },
    { icon: '🌿', name: '绿色食品', color: '#2ecc71', desc: 'AA级/A级绿色标准' },
    { icon: '🔒', name: '地理标志', color: '#3498db', desc: '原产地保护产品' },
    { icon: '⚙️', name: 'ISO 22000', color: '#34495e', desc: '食品安全管理体系' },
    { icon: '🔬', name: 'GAP认证', color: '#9b59b6', desc: '良好农业规范' },
    { icon: '🌏', name: '雨林联盟', color: '#1abc9c', desc: '可持续农业标准' }
  ];
  certs.forEach(function(cert) {
    html += '<div class="std-cert" title="' + cert.desc + '" style="border-color:' + cert.color + '">' +
      '<span class="std-cert-icon">' + cert.icon + '</span>' +
      '<span style="font-weight:600;color:' + cert.color + '">' + cert.name + '</span>' +
    '</div>';
  });
  html += '</div></div></div>';
  el.innerHTML = html;
}'''

# Apply the replacement
new_content = content.replace(old_string, new_stub_block, 1)

if new_content == content:
    print("ERROR: Replacement had no effect!")
    exit(1)

# Now add page HTML containers after the hallOfFamePage div
# We need to add: termPage, newsPage, seasonPage, standardPage containers
# These should be added before the gridPage div (line ~1423)

# Find the hallOfFamePage closing div and insert new pages after it
hall_of_fame_close = '''  <!-- T4 茶文化名人堂 PAGE -->
  <div class="fav-page" id="hallOfFamePage">
    <div class="results-info">🏛️ 茶文化名人堂 · 陆羽·卢仝·皎然·乾隆·鲁迅</div>
    <div id="hallOfFameContent"></div>
  </div>'''

new_pages_html = '''  <!-- T4 茶文化名人堂 PAGE -->
  <div class="fav-page" id="hallOfFamePage">
    <div class="results-info">🏛️ 茶文化名人堂 · 陆羽·卢仝·皎然·乾隆·鲁迅</div>
    <div id="hallOfFameContent"></div>
  </div>

  <!-- 术语词典 PAGE -->
  <div class="fav-page" id="termPage">
    <div class="results-info">📖 茶叶术语词典 · 中英对照+分类检索</div>
    <div id="termPageContent"></div>
  </div>

  <!-- 茶叶新闻 PAGE -->
  <div class="fav-page" id="newsPage">
    <div class="results-info">📰 茶叶新闻资讯 · 行业动态+价格行情+健康研究</div>
    <div id="newsPageContent"></div>
  </div>

  <!-- 四季饮茶 PAGE -->
  <div class="fav-page" id="seasonPage">
    <div class="results-info">🌿 四季饮茶指南 · 顺应节气+调养五脏</div>
    <div id="seasonPageContent"></div>
  </div>

  <!-- 标准对照 PAGE -->
  <div class="fav-page" id="standardPage">
    <div class="results-info">📋 茶叶标准对照 · 中国/日本/欧盟农残标准对比</div>
    <div id="standardPageContent"></div>
  </div>'''

if hall_of_fame_close in new_content:
    new_content = new_content.replace(hall_of_fame_close, new_pages_html, 1)
    print("Added page containers for term/news/season/standard pages")
else:
    print("ERROR: hallOfFame close tag not found")
    exit(1)

# Write the result
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"SUCCESS! File written: {html_path}")
print(f"Original size: {len(content)}, New size: {len(new_content)}")

# Verify
with open(html_path, 'r', encoding='utf-8') as f:
    verify = f.read()

for func in ['function renderTermPage()', 'function renderNewsPage()', 'function renderSeasonPage()', 'function renderStandardPage()']:
    if func in verify:
        print(f"  ✓ {func} found")
    else:
        print(f"  ✗ {func} NOT FOUND")

# Check page divs
for page_id in ['id="termPage"', 'id="newsPage"', 'id="seasonPage"', 'id="standardPage"', 'id="termPageContent"', 'id="newsPageContent"', 'id="seasonPageContent"', 'id="standardPageContent"']:
    if page_id in verify:
        print(f"  ✓ {page_id} found")
    else:
        print(f"  ✗ {page_id} NOT FOUND")

print("Done!")
