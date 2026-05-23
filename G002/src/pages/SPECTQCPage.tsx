// SPECTQCPage.tsx - SPECT图像质量评价
import React, { useState } from 'react';
import { Image, Grid, Activity, Star, CheckCircle, Search, AlertTriangle } from 'lucide-react';

interface SPECTQCRecord {
  id: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  examDate: string;
  device: string;
  doctor: string;
  grayContrast: number;
  spatialRes: number;
  snr: number;
  qualityGrade: '优' | '良' | '差';
  notes: string;
}

const mockData: SPECTQCRecord[] = [
  { id: 'SQ001', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, examType: 'SPECT', examItem: '心肌灌注显像', examDate: '2026-05-02', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.2, spatialRes: 4.5, snr: 45.2, qualityGrade: '优', notes: '图像清晰，心肌边界分明' },
  { id: 'SQ002', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'SPECT', examItem: '骨显像', examDate: '2026-05-02', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.5, spatialRes: 4.2, snr: 52.8, qualityGrade: '优', notes: '全身骨显像质量优良' },
  { id: 'SQ003', patientId: 'P010', patientName: '郑晓燕', gender: '女', age: 39, examType: 'SPECT', examItem: '肾动态显像', examDate: '2026-05-03', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.0, spatialRes: 4.3, snr: 38.5, qualityGrade: '优', notes: '肾图曲线清晰' },
  { id: 'SQ004', patientId: 'P012', patientName: '林美红', gender: '女', age: 58, examType: 'SPECT', examItem: '甲状腺静态显像', examDate: '2026-05-03', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.3, spatialRes: 4.6, snr: 41.2, qualityGrade: '优', notes: '甲状腺显像清晰' },
  { id: 'SQ005', patientId: 'P015', patientName: '王磊', gender: '男', age: 52, examType: 'SPECT', examItem: '肺通气显像', examDate: '2026-05-04', device: 'SPECT-01', doctor: '王丽华', grayContrast: 3.8, spatialRes: 4.0, snr: 35.2, qualityGrade: '良', notes: '通气分布欠均匀' },
  { id: 'SQ006', patientId: 'P018', patientName: '赵雅琴', gender: '女', age: 61, examType: 'SPECT', examItem: '肝胆动态显像', examDate: '2026-05-05', device: 'SPECT-01', doctor: '王丽华', grayContrast: 3.5, spatialRes: 3.8, snr: 28.5, qualityGrade: '良', notes: '胆道排泄略延迟' },
  { id: 'SQ007', patientId: 'P021', patientName: '周明', gender: '男', age: 49, examType: 'SPECT', examItem: '心肌灌注显像', examDate: '2026-05-06', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.1, spatialRes: 4.4, snr: 43.8, qualityGrade: '优', notes: '负荷显像质量优良' },
  { id: 'SQ008', patientId: 'P024', patientName: '黄婷', gender: '女', age: 36, examType: 'SPECT', examItem: '肾动态显像', examDate: '2026-05-06', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.4, spatialRes: 4.5, snr: 46.2, qualityGrade: '优', notes: 'GFR计算准确' },
  { id: 'SQ009', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, examType: 'SPECT', examItem: '静息心肌灌注显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.0, spatialRes: 4.2, snr: 40.5, qualityGrade: '优', notes: '与负荷显像对比清晰' },
  { id: 'SQ010', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'SPECT', examItem: '肺通气显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 3.2, spatialRes: 3.5, snr: 25.8, qualityGrade: '差', notes: '⚠️ 患者移动，图像模糊' },
  { id: 'SQ011', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'SPECT', examItem: '全身骨显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.3, spatialRes: 4.1, snr: 48.5, qualityGrade: '优', notes: '骨转移灶显示清晰' },
  { id: 'SQ012', patientId: 'P010', patientName: '郑晓燕', gender: '女', age: 39, examType: 'SPECT', examItem: '肾动态显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.1, spatialRes: 4.3, snr: 39.2, qualityGrade: '优', notes: '分肾功能正常' },
  { id: 'SQ013', patientId: 'P012', patientName: '林美红', gender: '女', age: 58, examType: 'SPECT', examItem: '甲状腺静态显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 3.7, spatialRes: 3.9, snr: 30.5, qualityGrade: '良', notes: '凉结节边界欠清' },
  { id: 'SQ014', patientId: 'P015', patientName: '王磊', gender: '男', age: 52, examType: 'SPECT', examItem: '肺灌注显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 4.0, spatialRes: 4.2, snr: 38.8, qualityGrade: '优', notes: '肺段灌注正常' },
  { id: 'SQ015', patientId: 'P018', patientName: '赵雅琴', gender: '女', age: 61, examType: 'SPECT', examItem: '肝血池显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', grayContrast: 3.6, spatialRes: 3.8, snr: 29.2, qualityGrade: '良', notes: '肝血池分布正常' },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  filterRow: { display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' as const },
  searchInput: { flex: '1 1 240px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  gradeExcellent: { background: '#d1fae5', color: '#047857' },
  gradeGood: { background: '#dbeafe', color: '#1e40af' },
  gradeBad: { background: '#fee2e2', color: '#dc2626' },
  scoreBar: { display: 'flex', gap: '4px', marginTop: '4px' },
  scoreDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#d1d5db' },
  scoreDotFilled: { background: '#1e40af' },
};

const gradeStyle = (g: string) => {
  if (g === '优') return styles.gradeExcellent;
  if (g === '良') return styles.gradeGood;
  return styles.gradeBad;
};

const SPECTQCPage: React.FC = () => {
  const [records] = useState<SPECTQCRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('全部');

  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.patientId.includes(search);
    const matchGrade = gradeFilter === '全部' || r.qualityGrade === gradeFilter;
    return matchSearch && matchGrade;
  });

  const excellentCount = records.filter(r => r.qualityGrade === '优').length;
  const avgSNR = (records.reduce((s, r) => s + r.snr, 0) / records.length).toFixed(1);
  const failCount = records.filter(r => r.qualityGrade === '差').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>SPECT图像质量评价</h2>
        <p style={styles.subtitle}>灰度对比度 · 空间分辨率 · SNR评分 · 质量等级</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Image size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>总评价数</div></div>
        <div style={styles.statCard}><Star size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={styles.statValue}>{excellentCount}</div><div style={styles.statLabel}>优秀(优)</div></div>
        <div style={styles.statCard}><Activity size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{avgSNR}</div><div style={styles.statLabel}>平均SNR</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{failCount}</div><div style={styles.statLabel}>不合格</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '优', '良', '差'].map(g => (
          <button key={g} onClick={() => setGradeFilter(g)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: gradeFilter === g ? '#1e40af' : '#d1d5db', background: gradeFilter === g ? '#1e40af' : '#fff', color: gradeFilter === g ? '#fff' : '#374151', cursor: 'pointer', fontSize: '13px' }}>{g === '全部' ? '全部' : g === '优' ? '优' : g === '良' ? '良' : '差'}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>灰度对比度</th>
              <th style={styles.th}>空间分辨率</th>
              <th style={styles.th}>SNR</th>
              <th style={styles.th}>质量等级</th>
              <th style={styles.th}>备注</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examDate} · {r.device}</div></td>
                <td style={styles.td}>
                  <div style={{ fontWeight: 600, color: r.grayContrast < 3.5 ? '#dc2626' : '#374151' }}>{r.grayContrast}</div>
                  <div style={{ display: 'flex', gap: '3px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= Math.round(r.grayContrast) ? '#1e40af' : '#e5e7eb' }} />)}</div>
                </td>
                <td style={styles.td}>
                  <div style={{ fontWeight: 600, color: r.spatialRes < 3.5 ? '#dc2626' : '#374151' }}>{r.spatialRes}</div>
                  <div style={{ display: 'flex', gap: '3px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= Math.round(r.spatialRes) ? '#1e40af' : '#e5e7eb' }} />)}</div>
                </td>
                <td style={{ ...styles.td, fontWeight: 600, color: r.snr < 30 ? '#dc2626' : r.snr < 35 ? '#b45309' : '#047857' }}>{r.snr}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, ...gradeStyle(r.qualityGrade) }}>{r.qualityGrade}</span></td>
                <td style={styles.td}><div style={{ fontSize: '12px', color: '#6b7280' }}>{r.notes}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SPECTQCPage;
