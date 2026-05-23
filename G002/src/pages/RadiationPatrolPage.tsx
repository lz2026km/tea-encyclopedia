// RadiationPatrolPage.tsx - 辐射巡检记录
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Search, Clock, CheckCircle, User, Monitor, Activity, FileText } from 'lucide-react';

interface PatrolRecord {
  id: string;
  patrolDate: string;
  patrolTime: string;
  location: string;
  inspector: string;
  equipment: string;
  backgroundDose: number; // μSv/h
  surfaceDose: number; // μSv/h
  leakageDose: number; // μSv/h
  alarmStatus: '正常' | '超标' | '故障';
  shieldStatus: '完好' | '损坏' | '需维护';
  personalDose: number; // mSv
  cumulativeDose: number; // mSv (当月)
  result: '通过' | '不通过' | '需复查';
  notes: string;
}

const mockData: PatrolRecord[] = [
  { id: 'RP001', patrolDate: '2026-05-07', patrolTime: '08:30', location: 'PET/CT-01机房', equipment: 'PET/CT-01', backgroundDose: 0.08, surfaceDose: 2.5, leakageDose: 0.12, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.12, cumulativeDose: 0.48, result: '通过', notes: '' },
  { id: 'RP002', patrolDate: '2026-05-07', patrolTime: '08:45', location: 'PET/CT-02机房', equipment: 'PET/CT-02', backgroundDose: 0.09, surfaceDose: 2.8, leakageDose: 0.15, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.11, cumulativeDose: 0.44, result: '通过', notes: '' },
  { id: 'RP003', patrolDate: '2026-05-07', patrolTime: '09:00', location: 'SPECT-01机房', equipment: 'SPECT-01', backgroundDose: 0.07, surfaceDose: 8.5, leakageDose: 0.25, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.18, cumulativeDose: 0.72, result: '通过', notes: '' },
  { id: 'RP004', patrolDate: '2026-05-07', patrolTime: '09:15', location: '核素药房', equipment: '铅柜/通风橱', backgroundDose: 0.35, surfaceDose: 15.2, leakageDose: 0.8, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.25, cumulativeDose: 1.0, result: '通过', notes: '' },
  { id: 'RP005', patrolDate: '2026-05-07', patrolTime: '09:30', location: '核素治疗室', equipment: '131I治疗室', backgroundDose: 0.42, surfaceDose: 22.5, leakageDose: 1.2, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.35, cumulativeDose: 1.4, result: '通过', notes: '' },
  { id: 'RP006', patrolDate: '2026-05-07', patrolTime: '10:00', location: '加速器实验室', equipment: '回旋加速器', backgroundDose: 0.15, surfaceDose: 5.2, leakageDose: 0.3, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.08, cumulativeDose: 0.32, result: '通过', notes: '加速器未运行，本底辐射' },
  { id: 'RP007', patrolDate: '2026-05-07', patrolTime: '10:15', location: '废物暂存间', equipment: '放射性废物桶', backgroundDose: 1.2, surfaceDose: 45.0, leakageDose: 2.5, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.05, cumulativeDose: 0.2, result: '通过', notes: '废物桶表面剂量较高，注意接触时间' },
  { id: 'RP008', patrolDate: '2026-05-06', patrolTime: '08:30', location: 'PET/CT-01机房', equipment: 'PET/CT-01', backgroundDose: 0.08, surfaceDose: 2.6, leakageDose: 0.13, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.11, cumulativeDose: 0.36, result: '通过', notes: '' },
  { id: 'RP009', patrolDate: '2026-05-06', patrolTime: '08:45', location: 'PET/CT-02机房', equipment: 'PET/CT-02', backgroundDose: 0.09, surfaceDose: 2.9, leakageDose: 0.16, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.12, cumulativeDose: 0.33, result: '通过', notes: '' },
  { id: 'RP010', patrolDate: '2026-05-06', patrolTime: '09:00', location: 'SPECT-01机房', equipment: 'SPECT-01', backgroundDose: 0.07, surfaceDose: 8.8, leakageDose: 0.28, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.19, cumulativeDose: 0.54, result: '通过', notes: '' },
  { id: 'RP011', patrolDate: '2026-05-06', patrolTime: '09:15', location: '核素药房', equipment: '铅柜/通风橱', backgroundDose: 0.38, surfaceDose: 14.8, leakageDose: 0.75, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.22, cumulativeDose: 0.75, result: '通过', notes: '' },
  { id: 'RP012', patrolDate: '2026-05-06', patrolTime: '09:30', location: 'SPECT-02机房', equipment: 'SPECT-02', backgroundDose: 0.08, surfaceDose: 7.5, leakageDose: 0.22, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.15, cumulativeDose: 0.45, result: '通过', notes: '' },
  { id: 'RP013', patrolDate: '2026-05-05', patrolTime: '08:30', location: 'PET/CT-01机房', equipment: 'PET/CT-01', backgroundDose: 0.08, surfaceDose: 2.4, leakageDose: 0.11, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.10, cumulativeDose: 0.24, result: '通过', notes: '' },
  { id: 'RP014', patrolDate: '2026-05-05', patrolTime: '08:45', location: 'PET/CT-02机房', equipment: 'PET/CT-02', backgroundDose: 0.09, surfaceDose: 2.7, leakageDose: 0.14, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.11, cumulativeDose: 0.21, result: '通过', notes: '' },
  { id: 'RP015', patrolDate: '2026-05-05', patrolTime: '09:00', location: 'SPECT-01机房', equipment: 'SPECT-01', backgroundDose: 0.07, surfaceDose: 8.2, leakageDose: 0.24, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.16, cumulativeDose: 0.35, result: '通过', notes: '' },
  { id: 'RP016', patrolDate: '2026-05-05', patrolTime: '09:15', location: 'DXA机房', equipment: 'DXA-01', backgroundDose: 0.02, surfaceDose: 0.8, leakageDose: 0.05, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.01, cumulativeDose: 0.05, result: '通过', notes: 'DXA辐射剂量极低' },
  { id: 'RP017', patrolDate: '2026-05-05', patrolTime: '09:30', location: '护士站', equipment: '注射窗口', backgroundDose: 0.12, surfaceDose: 5.5, leakageDose: 0.3, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.08, cumulativeDose: 0.2, result: '通过', notes: '' },
  { id: 'RP018', patrolDate: '2026-05-04', patrolTime: '08:30', location: 'PET/CT-01机房', equipment: 'PET/CT-01', backgroundDose: 0.08, surfaceDose: 2.5, leakageDose: 0.12, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.12, cumulativeDose: 0.12, result: '通过', notes: '' },
  { id: 'RP019', patrolDate: '2026-05-04', patrolTime: '08:45', location: 'PET/CT-02机房', equipment: 'PET/CT-02', backgroundDose: 0.09, surfaceDose: 2.8, leakageDose: 0.15, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.10, cumulativeDose: 0.1, result: '通过', notes: '' },
  { id: 'RP020', patrolDate: '2026-05-04', patrolTime: '09:00', location: 'SPECT-01机房', equipment: 'SPECT-01', backgroundDose: 0.07, surfaceDose: 8.5, leakageDose: 0.26, alarmStatus: '正常', inspector: '辐射安全员', shieldStatus: '完好', personalDose: 0.17, cumulativeDose: 0.17, result: '通过', notes: '' },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
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

const RadiationPatrolPage: React.FC = () => {
  const [records] = useState<PatrolRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState('全部');

  const filtered = records.filter(r => {
    const matchSearch = r.location.includes(search) || r.equipment.includes(search) || r.inspector.includes(search);
    const matchResult = resultFilter === '全部' || r.result === resultFilter;
    return matchSearch && matchResult;
  });

  const passCount = records.filter(r => r.result === '通过').length;
  const failCount = records.filter(r => r.result === '不通过').length;
  const totalPatrols = records.length;
  const maxCumulativeDose = Math.max(...records.map(r => r.cumulativeDose)).toFixed(2);

  const alarmBadge = (s: string) => {
    if (s === '正常') return { background: '#d1fae5', color: '#047857' };
    if (s === '超标') return { background: '#fee2e2', color: '#dc2626' };
    return { background: '#fef3c7', color: '#b45309' };
  };

  const resultBadge = (r: string) => {
    if (r === '通过') return { background: '#d1fae5', color: '#047857' };
    if (r === '不通过') return { background: '#fee2e2', color: '#dc2626' };
    return { background: '#fef3c7', color: '#b45309' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>辐射巡检记录</h2>
        <p style={styles.subtitle}>工作场所辐射监测 · 个人剂量追踪 · 防护设备状态检查</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><ShieldCheck size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalPatrols}</div><div style={styles.statLabel}>巡检记录</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{passCount}</div><div style={styles.statLabel}>通过</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{failCount}</div><div style={styles.statLabel}>不通过</div></div>
        <div style={styles.statCard}><Activity size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{maxCumulativeDose} mSv</div><div style={styles.statLabel}>最高月累积剂量</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索区域/设备/巡检员..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '通过', '不通过', '需复查'].map(r => (
          <button key={r} onClick={() => setResultFilter(r)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: resultFilter === r ? '#1e40af' : '#d1d5db', background: resultFilter === r ? '#1e40af' : '#fff', color: resultFilter === r ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{r}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>巡检时间</th>
              <th style={styles.th}>区域/设备</th>
              <th style={styles.th}>巡检员</th>
              <th style={styles.th}>本底剂量</th>
              <th style={styles.th}>表面剂量</th>
              <th style={styles.th}>泄漏剂量</th>
              <th style={styles.th}>报警状态</th>
              <th style={styles.th}>屏蔽状态</th>
              <th style={styles.th}>个人剂量</th>
              <th style={styles.th}>当月累积</th>
              <th style={styles.th}>结果</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div>{r.patrolDate}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patrolTime}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: '#1e40af' }}>{r.location}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.equipment}</div></td>
                <td style={styles.td}><User size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.inspector}</td>
                <td style={styles.td}>{r.backgroundDose} μSv/h</td>
                <td style={{ ...styles.td, fontWeight: 600, color: r.surfaceDose > 10 ? '#dc2626' : r.surfaceDose > 5 ? '#b45309' : '#374151' }}>{r.surfaceDose} μSv/h</td>
                <td style={styles.td}>{r.leakageDose} μSv/h</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...alarmBadge(r.alarmStatus) }}>{r.alarmStatus}</span></td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: r.shieldStatus === '完好' ? '#d1fae5' : r.shieldStatus === '损坏' ? '#fee2e2' : '#fef3c7', color: r.shieldStatus === '完好' ? '#047857' : r.shieldStatus === '损坏' ? '#dc2626' : '#b45309' }}>{r.shieldStatus}</span></td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: r.personalDose > 0.2 ? '#dc2626' : '#374151' }}>{r.personalDose} mSv</div></td>
                <td style={styles.td}><div style={{ fontWeight: 700, color: r.cumulativeDose > 1 ? '#dc2626' : r.cumulativeDose > 0.5 ? '#b45309' : '#374151' }}>{r.cumulativeDose} mSv</div></td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, ...resultBadge(r.result) }}>{r.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RadiationPatrolPage;
