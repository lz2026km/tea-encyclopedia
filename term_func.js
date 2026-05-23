// 术语词典页
function renderTermPage() {
  var container = document.getElementById('termPage');
  if (!container) { container.innerHTML = '<div style="padding:1rem;color:var(--c2)">加载中...</div>'; return; }
  var grid = document.getElementById('glossaryGrid');
  if (!grid) return;
  window._glossaryCat = window._glossaryCat || 'all';
  renderGlossary();
}

function renderGlossary() {
  var grid = document.getElementById('glossaryGrid');
  if (!grid) return;
  var searchInput = document.getElementById('glossarySearchInput');
  var searchText = (searchInput ? searchInput.value.trim().toLowerCase() : '');
  var cat = window._glossaryCat || 'all';
  var filtered = GLOSSARY_DATA.filter(function(item) {
    if (cat !== 'all' && item.cat !== cat) return false;
    if (searchText && item.term.indexOf(searchText) < 0 && item.zh.indexOf(searchText) < 0 && item.en.toLowerCase().indexOf(searchText) < 0) return false;
    return true;
  });
  var catColors = {processing:'#4CAF50', quality:'#2196F3', teatype:'#FF9800'};
  var catNames = {processing:'工艺', quality:'感官', teatype:'品种'};
  grid.innerHTML = filtered.map(function(item) {
    var color = catColors[item.cat] || '#666';
    var catName = catNames[item.cat] || item.cat;
    return '<div style="background:var(--white);border-radius:12px;padding:1rem;border:1.5px solid var(--border);margin-bottom:.6rem">' +
      '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem">' +
        '<span style="font-size:1.1rem;font-weight:700;color:var(--c5)">'+item.term+'</span>' +
        '<span style="font-size:.65rem;padding:.1rem .5rem;border-radius:10px;background:'+color+';color:#fff">'+catName+'</span>' +
      '</div>' +
      '<div style="color:var(--text);font-size:.85rem;margin-bottom:.2rem">'+item.zh+'</div>' +
      '<div style="color:var(--c2);font-size:.78rem;font-style:italic">'+item.en+'</div>' +
    '</div>';
  }).join('');
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--c2)">没有找到匹配的术语</div>';
  }
}

function switchGlossaryTab(cat) {
  window._glossaryCat = cat;
  document.querySelectorAll('#termPage .tab-btn').forEach(function(b) {
    b.classList.remove('active');
    if (b.getAttribute('data-glosstab') === cat) b.classList.add('active');
  });
  renderGlossary();
}
