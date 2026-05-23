// 四季页
function renderSeasonPage() {
  var container = document.getElementById('seasonPage');
  if (!container) { container.innerHTML = '<div style="padding:1rem;color:var(--c2)">加载中...</div>'; return; }
  var content = document.getElementById('seasonContent');
  if (!content) return;
  var catColors = {'春':'#4CAF50','夏':'#FF9800','秋':'#8D6E63','冬':'#1976D2'};
  content.innerHTML = SEASON_DATA.map(function(s) {
    var color = catColors[s.season] || '#666';
    return '<div style="background:var(--white);border-radius:16px;padding:1.2rem;margin-bottom:1rem;border-left:6px solid '+color+';box-shadow:0 2px 8px rgba(0,0,0,.08)">' +
      '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.6rem">' +
        '<span style="font-size:2rem;font-weight:700;color:'+color+'">'+s.season+'</span>' +
        '<div><span style="font-size:.75rem;color:var(--c2)">'+s.months+'</span><br><span style="font-size:.88rem;color:var(--text)">'+s.desc+'</span></div>' +
      '</div>' +
      '<div style="font-size:.78rem;color:var(--c2);margin-bottom:.5rem">推荐茶叶</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:.4rem">' +
        s.teas.map(function(t) { return '<span style="background:var(--c4);color:var(--c5);padding:.2rem .7rem;border-radius:20px;font-size:.8rem">'+t+'</span>'; }).join('') +
      '</div>' +
      '<div style="margin-top:.6rem;padding:.5rem;background:#FFF9E6;border-radius:8px;font-size:.8rem;color:#B8860B">💡 '+s.tip+'</div>' +
    '</div>';
  }).join('');
}
