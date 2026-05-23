import React, { useState, useEffect } from 'react';
import {
  Star, Trash2, Search, Filter, Plus, X,
  FileText, Users, Calendar, ClipboardList,
  Pill, Radio, Download
} from 'lucide-react';
import { storage, FavoriteItem } from '../lib/storage';

const styles = {
  page: { padding: '0' as const },
  header: { marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: '20px', fontWeight: 700, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  actions: { display: 'flex', gap: '8px', alignItems: 'center' },
  searchBar: { display: 'flex', gap: '8px', marginBottom: '16px' },
  searchInput: { flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none' },
  select: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  card: { background: '#fff', borderRadius: '10px', padding: '16px', border: '1px solid #e5e7eb', position: 'relative' as const },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  cardType: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '12px', background: '#dbeafe', color: '#1e40af' },
  cardTitle: { fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '4px' },
  cardDesc: { fontSize: '12px', color: '#6b7280', marginBottom: '8px' },
  cardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardDate: { fontSize: '11px', color: '#9ca3af' },
  cardDelete: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px', color: '#9ca3af', display: 'flex', alignItems: 'center' },
  tags: { display: 'flex', gap: '4px', flexWrap: 'wrap' as const },
  tag: { fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: '#f3f4f6', color: '#6b7280' },
  empty: { textAlign: 'center' as const, padding: '60px 20px', color: '#9ca3af' },
  emptyIcon: { marginBottom: '12px', opacity: 0.5 },
  stats: { display: 'flex', gap: '16px', marginBottom: '20px' },
  statCard: { flex: 1, background: '#fff', borderRadius: '10px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '24px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '11px', color: '#6b7280', marginTop: '4px' },
};

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  patient: { icon: <Users size={12} />, label: '患者', color: '#0891b2', bg: '#e0f2fe' },
  appointment: { icon: <Calendar size={12} />, label: '预约', color: '#7c3aed', bg: '#ede9fe' },
  exam: { icon: <ClipboardList size={12} />, label: '检查', color: '#059669', bg: '#dcfce7' },
  report: { icon: <FileText size={12} />, label: '报告', color: '#dc2626', bg: '#fee2e2' },
  drug: { icon: <Pill size={12} />, label: '药品', color: '#f59e0b', bg: '#fef3c7' },
  recipe: { icon: <Radio size={12} />, label: '古方', color: '#1e40af', bg: '#dbeafe' },
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const data = await storage.getAllFavorites();
      setFavorites(data);
    } catch (e) {
      console.error('[Favorites] Load error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await storage.removeFavorite(id);
      setFavorites(prev => prev.filter(f => f.id !== id));
    } catch (e) {
      console.error('[Favorites] Delete error:', e);
    }
  }

  const filtered = favorites.filter(f => {
    const matchSearch = !search ||
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || f.type === typeFilter;
    return matchSearch && matchType;
  });

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }

  if (loading) {
    return <div style={{ padding: '20px', color: '#6b7280' }}>加载中...</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>我的收藏</h1>
          <p style={styles.subtitle}>收藏常用患者、预约、检查记录，方便快速访问</p>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{favorites.length}</div>
          <div style={styles.statLabel}>全部收藏</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{favorites.filter(f => f.type === 'patient').length}</div>
          <div style={styles.statLabel}>患者</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{favorites.filter(f => f.type === 'exam').length}</div>
          <div style={styles.statLabel}>检查</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{favorites.filter(f => f.type === 'report').length}</div>
          <div style={styles.statLabel}>报告</div>
        </div>
      </div>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="搜索收藏..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={styles.select}>
          <option value="all">全部类型</option>
          <option value="patient">患者</option>
          <option value="appointment">预约</option>
          <option value="exam">检查</option>
          <option value="report">报告</option>
          <option value="drug">药品</option>
          <option value="recipe">古方</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <Star size={48} style={styles.emptyIcon} />
          <p style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>暂无收藏</p>
          <p style={{ fontSize: '12px', margin: 0 }}>从患者、预约、检查等页面添加收藏</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(item => {
            const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.exam;
            return (
              <div key={item.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={{ ...styles.cardType, background: config.bg, color: config.color }}>
                    {config.icon}
                    {config.label}
                  </div>
                  <button
                    style={styles.cardDelete}
                    onClick={() => handleDelete(item.id)}
                    title="删除收藏"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div style={styles.cardTitle}>{item.title}</div>
                {item.description && (
                  <div style={styles.cardDesc}>{item.description}</div>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div style={styles.tags}>
                    {item.tags.map(tag => (
                      <span key={tag} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ ...styles.cardMeta, marginTop: '8px' }}>
                  <span style={styles.cardDate}>{formatDate(item.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}