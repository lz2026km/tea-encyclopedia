// 新闻页
function renderNewsPage() {
  var container = document.getElementById('newsPage');
  if (!container) { container.innerHTML = '<div style="padding:1rem;color:var(--c2)">加载中...</div>'; return; }
  var list = document.getElementById('newsList');
  if (!list) return;
  window._newsCat = window._newsCat || 'all';
  renderNews();
}

function renderNews() {
  var list = document.getElementById('newsList');
  if (!list) return;
  var cat = window._newsCat || 'all';
  var filtered = NEWS_DATA.filter(function(n) { return cat === 'all' || n.cat === cat; });
  var catNames = {exhibition:'🏛展会',market:'📊行情',policy:'📜政策',culture:'🎭文化',product:'🆕新品',tech:'🔬技术'};
  list.innerHTML = filtered.map(function(n) {
    return '<div style="background:var(--white);border-radius:12px;padding:.9rem;border:1.5px solid var(--border);margin-bottom:.6rem">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;margin-bottom:.4rem">' +
        '<span style="font-weight:700;color:var(--c5);font-size:.88rem;flex:1">'+n.title+'</span>' +
        '<span style="font-size:.65rem;background:var(--c1);color:#fff;padding:.15rem .5rem;border-radius:10px;white-space:nowrap">'+catNames[n.cat]+'</span>' +
      '</div>' +
      '<div style="color:var(--c2);font-size:.75rem">'+n.source+' · '+n.date+'</div>' +
    '</div>';
  }).join('');
  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--c2)">暂无该分类新闻</div>';
  }
}

function switchNewsCat(cat) {
  window._newsCat = cat;
  document.querySelectorAll('#newsPage .tab-btn').forEach(function(b) {
    b.classList.remove('active');
    if (b.getAttribute('data-newscat') === cat) b.classList.add('active');
  });
  renderNews();
}
