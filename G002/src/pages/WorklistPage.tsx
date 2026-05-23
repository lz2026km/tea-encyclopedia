import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { examRecords } from '../data/initialData';

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '0' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 700, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  filterBar: {
    background: '#fff', borderRadius: '10px', padding: '16px', border: '1px solid #e5e7eb',
    display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap'
  },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: '8px', background: '#f4f6f9',
    borderRadius: '8px', padding: '8px 12px', flex: 1, minWidth: '200px'
  },
  searchInput: { border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', flex: 1 },
  select: {
    padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb',
    fontSize: '13px', background: '#fff', cursor: 'pointer', minWidth: '120px'
  },
  btn: {
    padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
  },
  tableWrap: { background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    textAlign: 'left', padding: '12px 10px', background: '#f8fafc',
    color: '#6b7280', fontWeight: 600, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap'
  },
  td: { padding: '12px 10px', borderBottom: '1px solid #f3f4f6', color: '#374151', whiteSpace: 'nowrap' },
  tag: { padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: '#f0fdf4', color: '#166534' },
  empty: { textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '14px' },
};

function statusBadge(status: string): React.CSSProperties {
  const map: Record<string, { bg: string; color: string }> = {
    '已完成': { bg: '#dcfce7', color: '#166534' },
    '检查中': { bg: '#fef3c7', color: '#92400e' },
    '图像采集中': { bg: '#dbeafe', color: '#1e40af' },
    '处理中': { bg: '#ede9fe', color: '#6d28d9' },
    '准备中': { bg: '#f3f4f6', color: '#4b5563' },
    '待检查': { bg: '#fef2f2', color: '#dc2626' },
  };
  const s = map[status] || { bg: '#f3f4f6', color: '#4b5563' };
  return { padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 500, background: s.bg, color: s.color };
}

const examTypeOptions = ['全部', 'PET/CT', 'SPECT', '核素治疗', '骨密度'];
const statusOptions = ['全部', '准备中', '检查中', '图像采集中', '处理中', '已完成', '待检查'];

export default function WorklistPage() {
  const [search, setSearch] = useState('');
  const [examType, setExamType] = useState('全部');
  const [status, setStatus] = useState('全部');

  const filtered = examRecords.filter(r => {
    const matchSearch = !search || r.patientName.includes(search) || r.examItem.includes(search) || r.id.includes(search);
    const matchType = examType === '全部' || r.examType === examType;
    const matchStatus = status === '全部' || r.status === status;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>检查工作台</h1>
        <p style={styles.subtitle}>查看和管理今日检查记录</p>
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <Search size={16} color="#9ca3af" />
          <input
            style={styles.searchInput}
            placeholder="搜索患者姓名 / 检查项目 / 记录ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select style={styles.select} value={examType} onChange={e => setExamType(e.target.value)}>
          {examTypeOptions.map(o => <option key={o}>{o}</option>)}
        </select>

        <select style={styles.select} value={status} onChange={e => setStatus(e.target.value)}>
          {statusOptions.map(o => <option key={o}>{o}</option>)}
        </select>

        <button style={{ ...styles.btn, background: '#f4f6f9', color: '#374151' }}>
          <RefreshCw size={14} />
          重置
        </button>

        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>
          共 {filtered.length} 条记录
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>记录ID</th>
              <th style={styles.th}>患者姓名</th>
              <th style={styles.th}>检查类型</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>检查日期</th>
              <th style={styles.th}>时间</th>
              <th style={styles.th}>状态</th>
              <th style={styles.th}>设备</th>
              <th style={styles.th}>医生</th>
              <th style={styles.th}>护士</th>
              <th style={styles.th}>放射性药物</th>
              <th style={styles.th}>注射剂量</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} style={styles.empty}>暂无符合条件的记录</td>
              </tr>
            ) : (
              filtered.map(record => (
                <tr key={record.id} style={{ cursor: 'pointer' }}>
                  <td style={styles.td}>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{record.id}</span>
                  </td>
                  <td style={styles.td}>{record.patientName}</td>
                  <td style={styles.td}>
                    <span style={styles.tag}>{record.examType}</span>
                  </td>
                  <td style={styles.td}>{record.examItem}</td>
                  <td style={styles.td}>{record.examDate}</td>
                  <td style={styles.td}>{record.startTime}{record.endTime ? ` - ${record.endTime}` : ''}</td>
                  <td style={styles.td}>
                    <span style={statusBadge(record.status)}>{record.status}</span>
                  </td>
                  <td style={styles.td}>{record.device}</td>
                  <td style={styles.td}>{record.doctor}</td>
                  <td style={styles.td}>{record.nurse}</td>
                  <td style={styles.td}>{record.radiopharmaceutical || '-'}</td>
                  <td style={styles.td}>{record.injectedDose || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
