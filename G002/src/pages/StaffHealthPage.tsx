// StaffHealthPage.tsx - 职业人员健康档案
import React, { useState } from 'react';
import { Users, ShieldCheck, AlertTriangle, CheckCircle, Search, Activity, TrendingUp } from 'lucide-react';

interface DoseRecord {
  year: number;
  quarter: string;
  dose: number;
  status: '正常' | '预警' | '超标';
}

interface StaffRecord {
  id: string;
  name: string;
  gender: string;
  age: number;
  department: string;
  role: string;
  joinedYear: number;
  totalDose2024: number;
  totalDose2025: number;
  totalDose2026: number;
  lifetimeDose: number;
  status: '正常' | '预警' | '超标';
  records: DoseRecord[];
}

const mockData: StaffRecord[] = [
  { id: 'S001', name: '张明', gender: '男', age: 42, department: '核医学科', role: '主任医师', joinedYear: 2010, totalDose2024: 18.5, totalDose2025: 16.2, totalDose2026: 8.3, lifetimeDose: 145.3, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 4.2, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 5.1, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 4.8, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 4.4, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 3.9, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 4.5, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 4.1, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 3.7, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 4.2, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 4.1, status: '正常' }] },
  { id: 'S002', name: '李娜', gender: '女', age: 38, department: '核医学科', role: '副主任医师', joinedYear: 2013, totalDose2024: 22.1, totalDose2025: 20.5, totalDose2026: 9.8, lifetimeDose: 128.7, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 5.5, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 5.8, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 5.4, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 5.4, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 5.1, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 5.3, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 5.2, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 4.9, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 4.9, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 4.9, status: '正常' }] },
  { id: 'S003', name: '王强', gender: '男', age: 35, department: '核医学科', role: '主治医师', joinedYear: 2016, totalDose2024: 28.3, totalDose2025: 25.7, totalDose2026: 12.4, lifetimeDose: 89.2, status: '预警', records: [{ year: 2024, quarter: 'Q1', dose: 7.2, status: '预警' }, { year: 2024, quarter: 'Q2', dose: 7.5, status: '预警' }, { year: 2024, quarter: 'Q3', dose: 6.8, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 6.8, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 6.5, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 6.4, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 6.4, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 6.4, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 6.2, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 6.2, status: '正常' }] },
  { id: 'S004', name: '陈护士', gender: '女', age: 29, department: '核医学科', role: '主管护师', joinedYear: 2019, totalDose2024: 35.6, totalDose2025: 32.1, totalDose2026: 15.8, lifetimeDose: 68.4, status: '预警', records: [{ year: 2024, quarter: 'Q1', dose: 9.2, status: '预警' }, { year: 2024, quarter: 'Q2', dose: 9.0, status: '预警' }, { year: 2024, quarter: 'Q3', dose: 8.7, status: '预警' }, { year: 2024, quarter: 'Q4', dose: 8.7, status: '预警' }, { year: 2025, quarter: 'Q1', dose: 8.3, status: '预警' }, { year: 2025, quarter: 'Q2', dose: 8.0, status: '预警' }, { year: 2025, quarter: 'Q3', dose: 8.0, status: '预警' }, { year: 2025, quarter: 'Q4', dose: 7.8, status: '预警' }, { year: 2026, quarter: 'Q1', dose: 7.9, status: '预警' }, { year: 2026, quarter: 'Q2', dose: 7.9, status: '预警' }] },
  { id: 'S005', name: '刘药师', gender: '男', age: 45, department: '核医学科', role: '副主任药师', joinedYear: 2008, totalDose2024: 12.3, totalDose2025: 11.8, totalDose2026: 5.6, lifetimeDose: 165.8, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 3.0, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 3.2, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 3.1, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 3.0, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 2.9, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 3.0, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 3.0, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 2.9, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 2.8, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 2.8, status: '正常' }] },
  { id: 'S006', name: '赵技术', gender: '男', age: 31, department: '核医学科', role: '技师', joinedYear: 2020, totalDose2024: 42.8, totalDose2025: 38.5, totalDose2026: 18.2, lifetimeDose: 52.3, status: '超标', records: [{ year: 2024, quarter: 'Q1', dose: 11.5, status: '超标' }, { year: 2024, quarter: 'Q2', dose: 11.2, status: '超标' }, { year: 2024, quarter: 'Q3', dose: 10.5, status: '超标' }, { year: 2024, quarter: 'Q4', dose: 9.6, status: '预警' }, { year: 2025, quarter: 'Q1', dose: 10.2, status: '超标' }, { year: 2025, quarter: 'Q2', dose: 9.8, status: '预警' }, { year: 2025, quarter: 'Q3', dose: 9.5, status: '预警' }, { year: 2025, quarter: 'Q4', dose: 9.0, status: '预警' }, { year: 2026, quarter: 'Q1', dose: 9.2, status: '预警' }, { year: 2026, quarter: 'Q2', dose: 9.0, status: '预警' }] },
  { id: 'S007', name: '孙护士', gender: '女', age: 27, department: '核医学科', role: '护师', joinedYear: 2021, totalDose2024: 25.4, totalDose2025: 23.2, totalDose2026: 11.5, lifetimeDose: 32.1, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 6.5, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 6.4, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 6.3, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 6.2, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 5.9, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 5.8, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 5.8, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 5.7, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 5.7, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 5.8, status: '正常' }] },
  { id: 'S008', name: '吴医生', gender: '男', age: 52, department: '核医学科', role: '主任医师', joinedYear: 2003, totalDose2024: 8.2, totalDose2025: 7.8, totalDose2026: 3.5, lifetimeDose: 245.6, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 2.1, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 2.0, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 2.1, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 2.0, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 2.0, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 1.9, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 2.0, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 1.9, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 1.8, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 1.7, status: '正常' }] },
  { id: 'S009', name: '周技师', gender: '男', age: 33, department: '核医学科', role: '技师', joinedYear: 2018, totalDose2024: 38.5, totalDose2025: 35.2, totalDose2026: 17.1, lifetimeDose: 78.6, status: '预警', records: [{ year: 2024, quarter: 'Q1', dose: 9.8, status: '预警' }, { year: 2024, quarter: 'Q2', dose: 9.8, status: '预警' }, { year: 2024, quarter: 'Q3', dose: 9.6, status: '预警' }, { year: 2024, quarter: 'Q4', dose: 9.3, status: '预警' }, { year: 2025, quarter: 'Q1', dose: 9.0, status: '预警' }, { year: 2025, quarter: 'Q2', dose: 8.8, status: '预警' }, { year: 2025, quarter: 'Q3', dose: 8.8, status: '预警' }, { year: 2025, quarter: 'Q4', dose: 8.6, status: '预警' }, { year: 2026, quarter: 'Q1', dose: 8.6, status: '预警' }, { year: 2026, quarter: 'Q2', dose: 8.5, status: '预警' }] },
  { id: 'S010', name: '郑护士', gender: '女', age: 32, department: '核医学科', role: '护师', joinedYear: 2017, totalDose2024: 29.8, totalDose2025: 27.5, totalDose2026: 13.2, lifetimeDose: 58.7, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 7.6, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 7.5, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 7.4, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 7.3, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 7.0, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 6.9, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 6.9, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 6.7, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 6.6, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 6.6, status: '正常' }] },
  { id: 'S011', name: '冯药师', gender: '男', age: 40, department: '核医学科', role: '主管药师', joinedYear: 2012, totalDose2024: 15.6, totalDose2025: 14.2, totalDose2026: 6.8, lifetimeDose: 112.4, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 3.9, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 3.9, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 3.9, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 3.9, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 3.6, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 3.5, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 3.6, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 3.5, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 3.4, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 3.4, status: '正常' }] },
  { id: 'S012', name: '褚技术', gender: '男', age: 28, department: '核医学科', role: '技师', joinedYear: 2022, totalDose2024: 45.2, totalDose2025: 42.8, totalDose2026: 20.5, lifetimeDose: 35.6, status: '超标', records: [{ year: 2024, quarter: 'Q1', dose: 11.8, status: '超标' }, { year: 2024, quarter: 'Q2', dose: 11.5, status: '超标' }, { year: 2024, quarter: 'Q3', dose: 11.2, status: '超标' }, { year: 2024, quarter: 'Q4', dose: 10.7, status: '超标' }, { year: 2025, quarter: 'Q1', dose: 11.0, status: '超标' }, { year: 2025, quarter: 'Q2', dose: 10.8, status: '超标' }, { year: 2025, quarter: 'Q3', dose: 10.6, status: '超标' }, { year: 2025, quarter: 'Q4', dose: 10.4, status: '超标' }, { year: 2026, quarter: 'Q1', dose: 10.3, status: '超标' }, { year: 2026, quarter: 'Q2', dose: 10.2, status: '超标' }] },
  { id: 'S013', name: '卫护士', gender: '女', age: 30, department: '核医学科', role: '护师', joinedYear: 2020, totalDose2024: 32.4, totalDose2025: 29.8, totalDose2026: 14.2, lifetimeDose: 48.2, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 8.3, status: '预警' }, { year: 2024, quarter: 'Q2', dose: 8.1, status: '预警' }, { year: 2024, quarter: 'Q3', dose: 8.0, status: '预警' }, { year: 2024, quarter: 'Q4', dose: 8.0, status: '预警' }, { year: 2025, quarter: 'Q1', dose: 7.6, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 7.4, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 7.5, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 7.3, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 7.1, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 7.1, status: '正常' }] },
  { id: 'S014', name: '蒋医生', gender: '男', age: 36, department: '核医学科', role: '主治医师', joinedYear: 2015, totalDose2024: 24.5, totalDose2025: 22.8, totalDose2026: 10.8, lifetimeDose: 82.3, status: '正常', records: [{ year: 2024, quarter: 'Q1', dose: 6.2, status: '正常' }, { year: 2024, quarter: 'Q2', dose: 6.1, status: '正常' }, { year: 2024, quarter: 'Q3', dose: 6.1, status: '正常' }, { year: 2024, quarter: 'Q4', dose: 6.1, status: '正常' }, { year: 2025, quarter: 'Q1', dose: 5.8, status: '正常' }, { year: 2025, quarter: 'Q2', dose: 5.7, status: '正常' }, { year: 2025, quarter: 'Q3', dose: 5.7, status: '正常' }, { year: 2025, quarter: 'Q4', dose: 5.6, status: '正常' }, { year: 2026, quarter: 'Q1', dose: 5.4, status: '正常' }, { year: 2026, quarter: 'Q2', dose: 5.4, status: '正常' }] },
  { id: 'S015', name: '沈技师', gender: '男', age: 29, department: '核医学科', role: '技师', joinedYear: 2021, totalDose2024: 40.2, totalDose2025: 36.8, totalDose2026: 17.5, lifetimeDose: 38.5, status: '预警', records: [{ year: 2024, quarter: 'Q1', dose: 10.5, status: '超标' }, { year: 2024, quarter: 'Q2', dose: 10.2, status: '超标' }, { year: 2024, quarter: 'Q3', dose: 9.8, status: '预警' }, { year: 2024, quarter: 'Q4', dose: 9.7, status: '预警' }, { year: 2025, quarter: 'Q1', dose: 9.5, status: '预警' }, { year: 2025, quarter: 'Q2', dose: 9.2, status: '预警' }, { year: 2025, quarter: 'Q3', dose: 9.2, status: '预警' }, { year: 2025, quarter: 'Q4', dose: 8.9, status: '预警' }, { year: 2026, quarter: 'Q1', dose: 8.8, status: '预警' }, { year: 2026, quarter: 'Q2', dose: 8.7, status: '预警' }] },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  alertBanner: { background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '20px' },
  thresholdNote: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#166534', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  filterRow: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' as const },
  searchInput: { flex: '1 1 240px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
};

const statusBadge = (s: string) => {
  if (s === '超标') return { bg: '#fee2e2', color: '#dc2626' };
  if (s === '预警') return { bg: '#fef3c7', color: '#b45309' };
  return { bg: '#d1fae5', color: '#047857' };
};

const StaffHealthPage: React.FC = () => {
  const [staff] = useState<StaffRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const filtered = staff.filter(s => {
    const matchSearch = s.name.includes(search) || s.id.includes(search) || s.role.includes(search);
    const matchStatus = statusFilter === '全部' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exceededCount = staff.filter(s => s.status === '超标').length;
  const warningCount = staff.filter(s => s.status === '预警').length;
  const normalCount = staff.filter(s => s.status === '正常').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>职业人员健康管理</h2>
        <p style={styles.subtitle}>辐射工作人员个人剂量档案 · 年度累计剂量追踪 · 超剂量调查</p>
      </div>

      {exceededCount > 0 && (
        <div style={styles.alertBanner}>
          <AlertTriangle size={20} color="#dc2626" />
          <div>
            <div style={{ fontWeight: 600, color: '#dc2626' }}>⚠️ {exceededCount} 名工作人员年度累计剂量超过50mSv上限</div>
            <div style={{ fontSize: '13px', color: '#991b1b' }}>根据GBZ 128-2016，职业人员年有效剂量限值为50mSv，需启动剂量调查和职业健康评估</div>
          </div>
        </div>
      )}

      <div style={styles.thresholdNote}>
        <ShieldCheck size={14} style={{ marginRight: '6px', color: '#166534' }} />
        <strong>依据GBZ 128-2016《职业性外照射个人监测规范》：</strong>
        职业人员年有效剂量限值 <strong>50mSv/年</strong>（眼晶体150mSv），季度参考水平 12.5mSv，
        三个月剂量超过25mSv需启动调查，超过50mSv为超标。
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Users size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{staff.length}</div><div style={styles.statLabel}>职业人员</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{normalCount}</div><div style={styles.statLabel}>剂量正常</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>{warningCount}</div><div style={styles.statLabel}>剂量预警</div></div>
        <div style={styles.statCard}><Activity size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{exceededCount}</div><div style={styles.statLabel}>剂量超标</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索姓名/工号/岗位..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '正常', '预警', '超标'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: statusFilter === s ? '#1e40af' : '#d1d5db', background: statusFilter === s ? '#1e40af' : '#fff', color: statusFilter === s ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{s}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>人员信息</th>
              <th style={styles.th}>岗位</th>
              <th style={styles.th}>2024年累计</th>
              <th style={styles.th}>2025年累计</th>
              <th style={styles.th}>2026年累计</th>
              <th style={styles.th}>终身剂量</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{s.name}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.id} · {s.gender} · {s.age}岁 · {s.department}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>入职{s.joinedYear}年</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{s.role}</div><div style={{ fontSize: '11px', color: '#6b7280' }}>{s.department}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: s.totalDose2024 > 50 ? '#dc2626' : s.totalDose2024 > 40 ? '#b45309' : '#374151' }}>{s.totalDose2024.toFixed(1)} mSv</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.records.filter(r => r.year === 2024).map(r => r.quarter + ':' + r.dose.toFixed(1)).join(' | ')}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: s.totalDose2025 > 50 ? '#dc2626' : s.totalDose2025 > 40 ? '#b45309' : '#374151' }}>{s.totalDose2025.toFixed(1)} mSv</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.records.filter(r => r.year === 2025).map(r => r.quarter + ':' + r.dose.toFixed(1)).join(' | ')}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: s.totalDose2026 > 50 ? '#dc2626' : s.totalDose2026 > 40 ? '#b45309' : '#374151' }}>{s.totalDose2026.toFixed(1)} mSv</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.records.filter(r => r.year === 2026).map(r => r.quarter + ':' + r.dose.toFixed(1)).join(' | ')}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: '#1e40af' }}>{s.lifetimeDose.toFixed(1)} mSv</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>终身累计</div></td>
                <td style={styles.td}><span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, ...statusBadge(s.status) }}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffHealthPage;
