// 标准页
function renderStandardPage() {
  var container = document.getElementById('standardPage');
  if (!container) return;
  container.innerHTML = '<div style="padding:1rem;color:var(--c2)">加载中...</div>';
  var content = document.getElementById('standardContent');
  if (!content) return;
  window._stdTab = window._stdTab || 'cn';
  renderStandard();
}

function renderStandard() {
  var content = document.getElementById('standardContent');
  if (!content) return;
  var tab = window._stdTab || 'cn';

  if (tab === 'cn') {
    content.innerHTML = '<div style="padding:.5rem"><h3 style="color:var(--c5);margin-bottom:.8rem">🇨🇳 中国茶叶标准</h3>' +
      '<div style="background:var(--white);border-radius:12px;padding:1rem;border:1.5px solid var(--border)">' +
        '<table style="width:100%;font-size:.85rem;border-collapse:collapse">' +
          '<thead><tr style="background:var(--c1);color:#fff"><th style="padding:.5rem;text-align:left">标准代号</th><th style="padding:.5rem">适用范围</th><th style="padding:.5rem">等级</th></tr></thead>' +
          '<tbody>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">GB/T 18650</td><td style="padding:.4rem">龙井茶</td><td style="padding:.4rem">特级/一级/二级/三级</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border);background:var(--c4)"><td style="padding:.4rem;font-weight:700">GB/T 14456</td><td style="padding:.4rem">绿茶</td><td style="padding:.4rem">特级/一级/二级/三级/四级</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">GB/T 13738.2</td><td style="padding:.4rem">红茶</td><td style="padding:.4rem">特级/一级/二级/三级</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border);background:var(--c4)"><td style="padding:.4rem;font-weight:700">GB/T 30357</td><td style="padding:.4rem">乌龙茶</td><td style="padding:.4rem">特级/一级/二级/三级</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">GB/T 22291</td><td style="padding:.4rem">白茶</td><td style="padding:.4rem">特级/一级/二级/三级</td></tr>' +
            '<tr style="background:var(--c4)"><td style="padding:.4rem;font-weight:700">GB/T 32744</td><td style="padding:.4rem">茶叶加工良好规范</td><td style="padding:.4rem">认证要求</td></tr>' +
          '</tbody>' +
        '</table>' +
      '</div></div>';
  } else if (tab === 'jp') {
    content.innerHTML = '<div style="padding:.5rem"><h3 style="color:var(--c5);margin-bottom:.8rem">🇯🇵 日本茶标准</h3>' +
      '<div style="background:var(--white);border-radius:12px;padding:1rem;border:1.5px solid var(--border);margin-bottom:.8rem">' +
        '<p style="font-size:.85rem;color:var(--text);margin-bottom:.6rem">日本农林水产省「茶葉品質規格基準」采用「肯定列表制度」，对农药残留实施极其严格的"一律基准值"（0.01ppm）。</p>' +
        '<table style="width:100%;font-size:.8rem;border-collapse:collapse">' +
          '<thead><tr style="background:var(--c1);color:#fff"><th style="padding:.4rem;text-align:left">指标</th><th style="padding:.4rem">限量标准</th></tr></thead>' +
          '<tbody>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">草甘膦</td><td style="padding:.4rem;color:var(--c1)">0.01 ppm（一律基准）</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border);background:var(--c4)"><td style="padding:.4rem;font-weight:700">氟虫腈</td><td style="padding:.4rem;color:var(--c1)">0.002 ppm</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">三氟氯氰菊酯</td><td style="padding:.4rem;color:var(--c1)">0.5 ppm</td></tr>' +
            '<tr><td style="padding:.4rem;font-weight:700">滴滴涕</td><td style="padding:.4rem;color:var(--c1)">未检出</td></tr>' +
          '</tbody>' +
        '</table>' +
      '</div></div>';
  } else if (tab === 'eu') {
    content.innerHTML = '<div style="padding:.5rem"><h3 style="color:var(--c5);margin-bottom:.8rem">🇪🇺 欧盟茶叶标准</h3>' +
      '<div style="background:var(--white);border-radius:12px;padding:1rem;border:1.5px solid var(--border);margin-bottom:.8rem">' +
        '<p style="font-size:.85rem;color:var(--text);margin-bottom:.6rem">欧盟EC396/2005法规对茶叶设立极低的最大残留限量（MRL），多项指标为仪器检出限（0.01mg/kg）水平。</p>' +
        '<table style="width:100%;font-size:.8rem;border-collapse:collapse">' +
          '<thead><tr style="background:var(--c1);color:#fff"><th style="padding:.4rem;text-align:left">农药</th><th style="padding:.4rem">EU MRL (mg/kg)</th></tr></thead>' +
          '<tbody>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">草甘膦</td><td style="padding:.4rem;color:#c62828">0.05</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border);background:var(--c4)"><td style="padding:.4rem;font-weight:700">氟虫腈</td><td style="padding:.4rem;color:#c62828">0.005</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border)"><td style="padding:.4rem;font-weight:700">三氟氯氰菊酯</td><td style="padding:.4rem;color:#c62828">0.1</td></tr>' +
            '<tr style="border-bottom:1px solid var(--border);background:var(--c4)"><td style="padding:.4rem;font-weight:700">氯氰菊酯</td><td style="padding:.4rem;color:#c62828">0.05</td></tr>' +
            '<tr><td style="padding:.4rem;font-weight:700">茚虫威</td><td style="padding:.4rem;color:#c62828">0.02</td></tr>' +
          '</tbody>' +
        '</table>' +
      '</div></div>';
  } else if (tab === 'cert') {
    var certs = [
      {icon:'🌿', name:'有机食品认证', desc:'全过程不使用化学合成农药、化肥和添加剂，通过认证机构现场检查', org:'中国有机产品认证'},
      {icon:'🥬', name:'绿色食品认证', desc:'AA级绿色食品等同于有机标准，A级允许使用部分化学投入品', org:'中国绿色食品发展中心'},
      {icon:'📍', name:'地理标志保护', desc:'特定产区的独特自然/人文因素形成的品质特色，受地理标志保护', org:'国家知识产权局'},
      {icon:'🔷', name:'GAP认证', desc:'良好农业规范，关注食品安全、环境保护和工人健康', org:'中国质量认证中心'},
      {icon:'🏭', name:'SC生产许可', desc:'食品生产许可证，基本准入门槛，保证基本卫生条件', org:'市场监督管理局'},
      {icon:'🌏', name:'EU有机认证', desc:'欧盟有机产品进口许可，标注"Organic"标识，符合EU有机法规834/2007', org:'欧盟委员会'},
    ];
    content.innerHTML = '<div style="padding:.5rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:.8rem">' +
      certs.map(function(c) {
        return '<div style="background:var(--white);border-radius:12px;padding:1rem;border:1.5px solid var(--border)">' +
          '<div style="font-size:1.5rem;margin-bottom:.4rem">'+c.icon+'</div>' +
          '<div style="font-weight:700;color:var(--c5);margin-bottom:.3rem;font-size:.9rem">'+c.name+'</div>' +
          '<div style="font-size:.78rem;color:var(--text);margin-bottom:.4rem;line-height:1.5">'+c.desc+'</div>' +
          '<div style="font-size:.7rem;color:var(--c2)">🏛 '+c.org+'</div>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  if (content.innerHTML.trim() === '') {
    content.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--c2)">内容加载中...</div>';
  }
}

function switchStdTab(tab) {
  window._stdTab = tab;
  document.querySelectorAll('#standardPage .tab-btn').forEach(function(b) {
    b.classList.remove('active');
    if (b.getAttribute('data-stdtab') === tab) b.classList.add('active');
  });
  renderStandard();
}
