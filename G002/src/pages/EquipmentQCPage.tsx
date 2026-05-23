// EquipmentQCPage.tsx - 设备日常质控
import React, { useState } from 'react';
import { Monitor, CheckCircle, XCircle, AlertTriangle, Settings, Clock } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'maintenance' | 'offline';
  lastQCDate: string;
  lastQCResult: 'pass' | 'fail' | 'pending';
  weeklyResult: 'pass' | 'fail' | 'pending';
  nextQCTime: string;
}

interface DailyQCRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  qcDate: string;
  qcTime: string;
  qcType: '泛源' | '点源' | '均匀性' | '灵敏度';
  result: 'pass' | 'fail';
  value: number;
  reference: string;
  operator: string;
  notes: string;
}

interface WeeklyCalRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  calDate: string;
  calType: '能量校准' | '位置校准' | '均匀性校准' | '全身校准';
  result: 'pass' | 'fail';
  operator: string;
  notes: string;
}

const devices: Device[] = [
  { id: 'DEV001', name: 'PET/CT-01', type: 'PET/CT', location: '核医学科1号机房', status: 'online', lastQCDate: '2026-05-07', lastQCResult: 'pass', weeklyResult: 'pass', nextQCTime: '2026-05-08 07:30' },
  { id: 'DEV002', name: 'PET/CT-02', type: 'PET/CT', location: '核医学科2号机房', status: 'online', lastQCDate: '2026-05-07', lastQCResult: 'pass', weeklyResult: 'pass', nextQCTime: '2026-05-08 07:00' },
  { id: 'DEV003', name: 'SPECT-01', type: 'SPECT', location: '核医学科3号机房', status: 'online', lastQCDate: '2026-05-07', lastQCResult: 'pass', weeklyResult: 'pending', nextQCTime: '2026-05-10 08:00' },
  { id: 'DEV004', name: 'SPECT-02', type: 'SPECT', location: '核医学科4号机房', status: 'maintenance', lastQCDate: '2026-05-05', lastQCResult: 'fail', weeklyResult: 'fail', nextQCTime: '维修中' },
  { id: 'DEV005', name: 'DXA-01', type: 'DXA', location: '核医学科骨密度室', status: 'online', lastQCDate: '2026-05-07', lastQCResult: 'pass', weeklyResult: 'pending', nextQCTime: '2026-05-12 09:00' },
];

const dailyRecords: DailyQCRecord[] = [
  { id: 'DQC001', deviceId: 'DEV001', deviceName: 'PET/CT-01', qcDate: '2026-05-07', qcTime: '07:30', qcType: '泛源', result: 'pass', value: 1.02, reference: '0.95-1.05', operator: '李技师', notes: '正常' },
  { id: 'DQC002', deviceId: 'DEV001', deviceName: 'PET/CT-01', qcDate: '2026-05-07', qcTime: '07:32', qcType: '均匀性', result: 'pass', value: 1.01, reference: '0.90-1.10', operator: '李技师', notes: '正常' },
  { id: 'DQC003', deviceId: 'DEV002', deviceName: 'PET/CT-02', qcDate: '2026-05-07', qcTime: '07:00', qcType: '泛源', result: 'pass', value: 0.98, reference: '0.95-1.05', operator: '王技师', notes: '正常' },
  { id: 'DQC004', deviceId: 'DEV002', deviceName: 'PET/CT-02', qcDate: '2026-05-07', qcTime: '07:02', qcType: '灵敏度', result: 'pass', value: 8.5, reference: '8.0-9.0', operator: '王技师', notes: '正常' },
  { id: 'DQC005', deviceId: 'DEV003', deviceName: 'SPECT-01', qcDate: '2026-05-07', qcTime: '08:00', qcType: '泛源', result: 'pass', value: 1.03, reference: '0.95-1.05', operator: '张技师', notes: '正常' },
  { id: 'DQC006', deviceId: 'DEV003', deviceName: 'SPECT-01', qcDate: '2026-05-07', qcTime: '08:03', qcType: '灵敏度', result: 'pass', value: 9.8, reference: '9.5-10.5', operator: '张技师', notes: '正常' },
  { id: 'DQC007', deviceId: 'DEV004', deviceName: 'SPECT-02', qcDate: '2026-05-06', qcTime: '08:00', qcType: '泛源', result: 'fail', value: 0.82, reference: '0.95-1.05', operator: '赵技师', notes: '探测器B灵敏度下降，已报修' },
  { id: 'DQC008', deviceId: 'DEV004', deviceName: 'SPECT-02', qcDate: '2026-05-05', qcTime: '08:00', qcType: '均匀性', result: 'fail', value: 0.88, reference: '0.90-1.10', operator: '赵技师', notes: '探测器A不均匀，已停机' },
  { id: 'DQC009', deviceId: 'DEV005', deviceName: 'DXA-01', qcDate: '2026-05-07', qcTime: '09:00', qcType: '均匀性', result: 'pass', value: 1.00, reference: '0.98-1.02', operator: '刘技师', notes: '正常' },
  { id: 'DQC010', deviceId: 'DEV001', deviceName: 'PET/CT-01', qcDate: '2026-05-06', qcTime: '07:30', qcType: '泛源', result: 'pass', value: 1.01, reference: '0.95-1.05', operator: '李技师', notes: '正常' },
  { id: 'DQC011', deviceId: 'DEV001', deviceName: 'PET/CT-01', qcDate: '2026-05-06', qcTime: '07:32', qcType: '点源', result: 'pass', value: 1.00, reference: '0.95-1.05', operator: '李技师', notes: '正常' },
  { id: 'DQC012', deviceId: 'DEV002', deviceName: 'PET/CT-02', qcDate: '2026-05-06', qcTime: '07:00', qcType: '泛源', result: 'pass', value: 0.99, reference: '0.95-1.05', operator: '王技师', notes: '正常' },
  { id: 'DQC013', deviceId: 'DEV003', deviceName: 'SPECT-01', qcDate: '2026-05-06', qcTime: '08:00', qcType: '泛源', result: 'pass', value: 1.02, reference: '0.95-1.05', operator: '张技师', notes: '正常' },
  { id: 'DQC014', deviceId: 'DEV002', deviceName: 'PET/CT-02', qcDate: '2026-05-05', qcTime: '07:00', qcType: '灵敏度', result: 'pass', value: 8.7, reference: '8.0-9.0', operator: '王技师', notes: '正常' },
  { id: 'DQC015', deviceId: 'DEV005', deviceName: 'DXA-01', qcDate: '2026-05-06', qcTime: '09:00', qcType: '均匀性', result: 'pass', value: 1.01, reference: '0.98-1.02', operator: '刘技师', notes: '正常' },
];

const weeklyRecords: WeeklyCalRecord[] = [
  { id: 'WQC001', deviceId: 'DEV001', deviceName: 'PET/CT-01', calDate: '2026-05-04', calType: '能量校准', result: 'pass', operator: '李技师', notes: '511keV峰位正常' },
  { id: 'WQC002', deviceId: 'DEV001', deviceName: 'PET/CT-01', calDate: '2026-05-04', calType: '均匀性校准', result: 'pass', operator: '李技师', notes: '所有晶体正常' },
  { id: 'WQC003', deviceId: 'DEV002', deviceName: 'PET/CT-02', calDate: '2026-05-04', calType: '位置校准', result: 'pass', operator: '王技师', notes: 'LOR校正正常' },
  { id: 'WQC004', deviceId: 'DEV002', deviceName: 'PET/CT-02', calDate: '2026-05-04', calType: '全身校准', result: 'pass', operator: '王技师', notes: '灵敏度在范围内' },
  { id: 'WQC005', deviceId: 'DEV003', deviceName: 'SPECT-01', calDate: '2026-05-03', calType: '能量校准', result: 'pass', operator: '张技师', notes: '140keV峰位正常' },
  { id: 'WQC006', deviceId: 'DEV004', deviceName: 'SPECT-02', calDate: '2026-05-03', calType: '均匀性校准', result: 'fail', operator: '赵技师', notes: '探测器B不均匀，需维修' },
  { id: 'WQC007', deviceId: 'DEV004', deviceName: 'SPECT-02', calDate: '2026-05-03', calType: '全身校准', result: 'fail', operator: '赵技师', notes: '整体效率偏低' },
  { id: 'WQC008', deviceId: 'DEV005', deviceName: 'DXA-01', calDate: '2026-05-05', calType: '能量校准', result: 'pass', operator: '刘技师', notes: '体模扫描正常' },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  sectionTitle: { fontSize: '15px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
  deviceGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' },
  deviceCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  deviceHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' },
  deviceName: { fontSize: '15px', fontWeight: 600, color: '#374151' },
  deviceStatus: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 },
  statusOnline: { background: '#d1fae5', color: '#047857' },
  statusMaintenance: { background: '#fef3c7', color: '#b45309' },
  statusOffline: { background: '#fee2e2', color: '#dc2626' },
  qcPass: { background: '#d1fae5', color: '#047857' },
  qcFail: { background: '#fee2e2', color: '#dc2626' },
  qcPending: { background: '#fef3c7', color: '#b45309' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: '24px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
};

const EquipmentQCPage: React.FC = () => {
  const [tab, setTab] = useState<'daily' | 'weekly'>('daily');

  const statusStyle = (s: string) => {
    if (s === 'online') return styles.statusOnline;
    if (s === 'maintenance') return styles.statusMaintenance;
    return styles.statusOffline;
  };
  const qcStyle = (s: string) => {
    if (s === 'pass') return styles.qcPass;
    if (s === 'fail') return styles.qcFail;
    return styles.qcPending;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>设备日常质控</h2>
        <p style={styles.subtitle}>PET/SPECT设备每日泛源QC · SPECT每周平面源校准</p>
      </div>

      {/* Device Status */}
      <div style={styles.sectionTitle}><Monitor size={16} color="#1e40af" />设备状态总览</div>
      <div style={styles.deviceGrid}>
        {devices.map(d => (
          <div key={d.id} style={styles.deviceCard}>
            <div style={styles.deviceHeader}>
              <span style={styles.deviceName}>{d.name}</span>
              <span style={{ ...styles.deviceStatus, ...statusStyle(d.status) }}>
                {d.status === 'online' ? '● 正常' : d.status === 'maintenance' ? '● 维护' : '● 离线'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{d.type} · {d.location}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px' }}>
              <div>今日QC: <span style={{ color: d.lastQCResult === 'pass' ? '#047857' : '#dc2626', fontWeight: 600 }}>{d.lastQCResult === 'pass' ? '✓ 通过' : d.lastQCResult === 'fail' ? '✗ 失败' : '◌ 待检'}</span></div>
              <div>本周校准: <span style={{ color: d.weeklyResult === 'pass' ? '#047857' : '#dc2626', fontWeight: 600 }}>{d.weeklyResult === 'pass' ? '✓ 通过' : d.weeklyResult === 'fail' ? '✗ 失败' : '◌ 待检'}</span></div>
              <div style={{ gridColumn: '1 / -1' }}>上次QC: {d.lastQCDate}</div>
              <div style={{ gridColumn: '1 / -1' }}>下次QC: {d.nextQCTime}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {(['daily', 'weekly'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid', borderColor: tab === t ? '#1e40af' : '#d1d5db', background: tab === t ? '#1e40af' : '#fff', color: tab === t ? '#fff' : '#374151', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>{t === 'daily' ? '每日QC记录' : '每周校准记录'}</button>
        ))}
      </div>

      {tab === 'daily' ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>设备</th>
                <th style={styles.th}>日期</th>
                <th style={styles.th}>时间</th>
                <th style={styles.th}>QC类型</th>
                <th style={styles.th}>测量值</th>
                <th style={styles.th}>参考范围</th>
                <th style={styles.th}>结果</th>
                <th style={styles.th}>操作者</th>
                <th style={styles.th}>备注</th>
              </tr>
            </thead>
            <tbody>
              {dailyRecords.map(r => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.deviceName}</td>
                  <td style={styles.td}>{r.qcDate}</td>
                  <td style={styles.td}>{r.qcTime}</td>
                  <td style={styles.td}>{r.qcType}</td>
                  <td style={{ ...styles.td, fontWeight: 600, color: r.result === 'pass' ? '#047857' : '#dc2626' }}>{r.value}</td>
                  <td style={styles.td}>{r.reference}</td>
                  <td style={styles.td}><span style={{ ...styles.deviceStatus, ...qcStyle(r.result) }}>{r.result === 'pass' ? '✓ 通过' : '✗ 失败'}</span></td>
                  <td style={styles.td}>{r.operator}</td>
                  <td style={styles.td}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>设备</th>
                <th style={styles.th}>校准日期</th>
                <th style={styles.th}>校准类型</th>
                <th style={styles.th}>结果</th>
                <th style={styles.th}>操作者</th>
                <th style={styles.th}>备注</th>
              </tr>
            </thead>
            <tbody>
              {weeklyRecords.map(r => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.deviceName}</td>
                  <td style={styles.td}>{r.calDate}</td>
                  <td style={styles.td}>{r.calType}</td>
                  <td style={styles.td}><span style={{ ...styles.deviceStatus, ...qcStyle(r.result) }}>{r.result === 'pass' ? '✓ 通过' : '✗ 失败'}</span></td>
                  <td style={styles.td}>{r.operator}</td>
                  <td style={styles.td}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EquipmentQCPage;
