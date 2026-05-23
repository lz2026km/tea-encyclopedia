import React, { useState, useEffect } from 'react';
import {
  BookOpen, Plus, Trash2, Search, Calendar as CalendarIcon,
  Edit2, X, ChevronLeft
} from 'lucide-react';
import { storage, DiaryEntry } from '../lib/storage';

const styles = {
  page: { padding: '0' as const },
  header: { marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: '20px', fontWeight: 700, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  actions: { display: 'flex', gap: '8px', alignItems: 'center' },
  searchBar: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' as const },
  searchInput: { flex: 1, minWidth: '200px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none' },
  select: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none' },
  btn: (variant: 'primary' | 'secondary' = 'secondary'): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: variant === 'primary' ? '#1e40af' : '#fff',
    color: variant === 'primary' ? '#fff' : '#374151',
    borderColor: '#e5e7eb',
  }),
  list: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  card: { background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'box-shadow 0.15s' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  cardTitle: { fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 },
  cardDate: { fontSize: '11px', color: '#9ca3af' },
  cardCategory: { fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '8px', textTransform: 'capitalize' },
  cardContent: { fontSize: '13px', color: '#6b7280', lineHeight: 1.6, marginBottom: '8px' },
  cardMeta: { display: 'flex', justifyContent: 'flex-end' },
  empty: { textAlign: 'center' as const, padding: '60px 20px', color: '#9ca3af' },
  modal: { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { background: '#fff', borderRadius: '12px', padding: '24px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' as const },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  modalTitle: { fontSize: '16px', fontWeight: 600, color: '#1e40af', margin: 0 },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' },
  input: { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const },
  textarea: { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', resize: 'vertical' as const, minHeight: '120px', fontFamily: 'inherit', boxSizing: 'border-box' as const },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' },
  viewContainer: { background: '#fff', borderRadius: '10px', padding: '24px', border: '1px solid #e5e7eb' },
  viewHeader: { marginBottom: '20px' },
  viewTitle: { fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px' },
  viewMeta: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' as const },
  viewContent: { fontSize: '14px', color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap' as const },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' },
  statCard: { background: '#fff', borderRadius: '10px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '20px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '10px', color: '#6b7280', marginTop: '2px' },
};

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  work: { bg: '#dbeafe', color: '#1e40af' },
  study: { bg: '#ede9fe', color: '#7c3aed' },
  personal: { bg: '#dcfce7', color: '#059669' },
  health: { bg: '#fef3c7', color: '#f59e0b' },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function DiaryPage() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewDiary, setViewDiary] = useState<DiaryEntry | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', date: '', category: 'work' as DiaryEntry['category'] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadDiaries();
  }, []);

  async function loadDiaries() {
    try {
      const data = await storage.getAllDiaries();
      setDiaries(data);
    } catch (e) {
      console.error('[Diary] Load error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.title.trim() || !formData.content.trim()) return;
    try {
      if (editingId) {
        const updated = await storage.updateDiary(editingId, formData);
        if (updated) {
          setDiaries(prev => prev.map(d => d.id === editingId ? updated : d));
        }
      } else {
        const created = await storage.addDiary(formData);
        setDiaries(prev => [created, ...prev]);
      }
      setShowModal(false);
      setFormData({ title: '', content: '', date: '', category: 'work' });
      setEditingId(null);
    } catch (e) {
      console.error('[Diary] Save error:', e);
    }
  }

  async function handleDelete(id: string) {
    try {
      await storage.deleteDiary(id);
      setDiaries(prev => prev.filter(d => d.id !== id));
      setViewDiary(null);
    } catch (e) {
      console.error('[Diary] Delete error:', e);
    }
  }

  function openEdit(diary: DiaryEntry) {
    setEditingId(diary.id);
    setFormData({ title: diary.title, content: diary.content, date: diary.date, category: diary.category || 'work' });
    setShowModal(true);
  }

  function openNew() {
    setEditingId(null);
    setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], category: 'work' });
    setShowModal(true);
  }

  const filtered = diaries.filter(d => {
    const matchSearch = !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.content.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || d.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const categoryCount = (cat: string) => diaries.filter(d => d.category === cat).length;

  if (loading) {
    return <div style={{ padding: '20px', color: '#6b7280' }}>加载中...</div>;
  }

  if (viewDiary) {
    const catColor = CATEGORY_COLORS[viewDiary.category || 'work'];
    return (
      <div style={styles.page}>
        <div style={styles.viewContainer}>
          <div style={styles.viewHeader}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={styles.viewTitle}>{viewDiary.title}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={styles.btn('secondary')} onClick={() => openEdit(viewDiary)}>
                  <Edit2 size={14} />编辑
                </button>
                <button style={styles.btn('secondary')} onClick={() => setViewDiary(null)}>
                  <ChevronLeft size={14} />返回
                </button>
              </div>
            </div>
            <div style={styles.viewMeta}>
              <span style={{ ...styles.cardDate, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CalendarIcon size={12} />{formatDate(viewDiary.date)}
              </span>
              <span style={{ ...styles.cardCategory, background: catColor.bg, color: catColor.color }}>
                {viewDiary.category || 'work'}
              </span>
            </div>
          </div>
          <div style={styles.viewContent}>{viewDiary.content}</div>
          <div style={{ ...styles.modalActions, justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
            <button style={{ ...styles.btn('secondary'), color: '#dc2626' }} onClick={() => handleDelete(viewDiary.id)}>
              <Trash2 size={14} />删除日记
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>工作日记</h1>
          <p style={styles.subtitle}>记录日常工作、学习与健康笔记</p>
        </div>
        <div style={styles.actions}>
          <button style={styles.btn('primary')} onClick={openNew}>
            <Plus size={14} />写日记
          </button>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{diaries.length}</div>
          <div style={styles.statLabel}>全部日记</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{categoryCount('work')}</div>
          <div style={styles.statLabel}>工作</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{categoryCount('study')}</div>
          <div style={styles.statLabel}>学习</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{categoryCount('health')}</div>
          <div style={styles.statLabel}>健康</div>
        </div>
      </div>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="搜索日记..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={styles.select}>
          <option value="all">全部分类</option>
          <option value="work">工作</option>
          <option value="study">学习</option>
          <option value="personal">个人</option>
          <option value="health">健康</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <BookOpen size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>暂无日记</p>
          <p style={{ fontSize: '12px', margin: 0 }}>点击右上角"写日记"开始记录</p>
        </div>
      ) : (
        <div style={styles.list}>
          {filtered.map(diary => {
            const catColor = CATEGORY_COLORS[diary.category || 'work'];
            return (
              <div
                key={diary.id}
                style={styles.card}
                onClick={() => setViewDiary(diary)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.cardTitle}>{diary.title}</div>
                  <div style={styles.cardDate}>{formatDate(diary.date)}</div>
                </div>
                <div style={{ ...styles.cardCategory, background: catColor.bg, color: catColor.color, marginBottom: '8px', display: 'inline-block' }}>
                  {diary.category || 'work'}
                </div>
                <div style={styles.cardContent}>
                  {diary.content.length > 120 ? diary.content.slice(0, 120) + '...' : diary.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div style={styles.modal} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{editingId ? '编辑日记' : '写日记'}</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} onClick={() => setShowModal(false)}>
                <X size={18} color="#6b7280" />
              </button>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>日期</label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>标题</label>
              <input
                type="text"
                placeholder="日记标题"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>分类</label>
              <select
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as DiaryEntry['category'] }))}
                style={styles.input}
              >
                <option value="work">工作</option>
                <option value="study">学习</option>
                <option value="personal">个人</option>
                <option value="health">健康</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>内容</label>
              <textarea
                placeholder="记录今天的工作心得..."
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                style={styles.textarea}
              />
            </div>
            <div style={styles.modalActions}>
              <button style={styles.btn('secondary')} onClick={() => setShowModal(false)}>取消</button>
              <button style={styles.btn('primary')} onClick={handleSave}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}