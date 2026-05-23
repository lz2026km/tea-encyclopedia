import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, Monitor } from 'lucide-react';
import { qcRecords } from '../data/initialData';

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  cardsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' },
  card: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  cardTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
  cardValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  cardUnit: { fontSize: '14px', color: '#6b7280', marginLeft: '4px' },
  deviceGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' },
  deviceCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  deviceHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  deviceName: { fontSize: '15px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' },
  deviceStatus: { fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '4px' },
  statusNormal: { background: '#d1fae5', color: '#047857' },
  statusWarning: { background: '#fef3c7', color: '#b45309' },
  statusError: { background: '#fee2e2', color: '#dc2626' },
  deviceStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  deviceStat: { textAlign: 'center', padding: '8px', background: '#f9fafb', borderRadius: '4px' },
  deviceStatValue: { fontSize: '18px', fontWeight: 600, color: '#1e40af' },
  deviceStatLabel: { fontSize: '11px', color: '#6b7280' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  tableTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', padding: '16px', borderBottom: '1px solid #e5e7eb' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 },
  badgePass: { background: '#d1fae5', color: '#047857' },
  badgeFail: { background: '#fee2e2', color: '#dc2626' },
  badgePending: { background: '#fef3c7', color: '#b45309' },
  itemList: { fontSize: '12px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f3f4f6' },
  itemName: { color: '#6b7280' },
  itemValue: { fontWeight: 500, color: '#374151' },
};

export default function QCPage() {
  const passCount = qcRecords.filter(r => r.result === '合格').length;
  const failCount = qcRecords.filter(r => r.result === '不合格').length;
  const pendingCount = qcRecords.filter(r => r.result === '待复测').length;
  const passRate = ((passCount / qcRecords.length) * 100).toFixed(1);

  const devices = [
    { id: 'PET01', name: 'PET/CT-01', status: '正常', qcCount: qcRecords.filter(r => r.deviceId === 'PET01').length, lastQC: '2026-05-01' },
    { id: 'PET02', name: 'PET/CT-02', status: '待维护', qcCount: qcRecords.filter(r => r.deviceId === 'PET02').length, lastQC: '2026-04-28' },
    { id: 'SPT01', name: 'SPECT-01', status: '正常', qcCount: qcRecords.filter(r => r.deviceId === 'SPT01').length, lastQC: '2026-05-01' },
  ];

  const getDeviceStatusStyle = (status: string) => {
    switch (status) {
      case '正常': return styles.statusNormal;
      case '待维护': return styles.statusWarning;
      default: return styles.statusError;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>质量控制</h1>
        <p style={styles.subtitle}>设备质量控制与性能监测</p>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}><CheckCircle size={16} color="#047857" /> 合格率</div>
          <div><span style={{ ...styles.cardValue, color: '#047857' }}>{passRate}</span><span style={styles.cardUnit}>%</span></div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><CheckCircle size={16} color="#047857" /> 合格记录</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#047857' }}>{passCount}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><XCircle size={16} color="#dc2626" /> 不合格</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#dc2626' }}>{failCount}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Clock size={16} color="#b45309" /> 待复测</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#b45309' }}>{pendingCount}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Monitor size={16} color="#1e40af" /> 在用设备</div>
          <div><span style={styles.cardValue}>{devices.length}</span><span style={styles.cardUnit}>台</span></div>
        </div>
      </div>

      <div style={styles.deviceGrid}>
        {devices.map(device => (
          <div key={device.id} style={styles.deviceCard}>
            <div style={styles.deviceHeader}>
              <div style={styles.deviceName}><Monitor size={18} color="#1e40af" /> {device.name}</div>
              <div style={{ ...styles.deviceStatus, ...getDeviceStatusStyle(device.status) }}>{device.status}</div>
            </div>
            <div style={styles.deviceStats}>
              <div style={styles.deviceStat}>
                <div style={styles.deviceStatValue}>{device.qcCount}</div>
                <div style={styles.deviceStatLabel}>质控次数</div>
              </div>
              <div style={styles.deviceStat}>
                <div style={styles.deviceStatValue}>{device.lastQC}</div>
                <div style={styles.deviceStatLabel}>最近质控</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableTitle}>质控记录明细</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>记录ID</th>
              <th style={styles.th}>设备名称</th>
              <th style={styles.th}>质控类型</th>
              <th style={styles.th}>质控日期</th>
              <th style={styles.th}>结果</th>
              <th style={styles.th}>质控项目</th>
              <th style={styles.th}>执行人</th>
              <th style={styles.th}>下次日期</th>
            </tr>
          </thead>
          <tbody>
            {qcRecords.map(record => (
              <tr key={record.id}>
                <td style={styles.td}>{record.id}</td>
                <td style={styles.td}><strong>{record.deviceName}</strong></td>
                <td style={styles.td}>{record.qcType}</td>
                <td style={styles.td}>{record.qcDate}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...(record.result === '合格' ? styles.badgePass : record.result === '待复测' ? styles.badgePending : styles.badgeFail) }}>
                    {record.result}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.itemList}>
                    {record.items.map((item, idx) => (
                      <div key={idx} style={styles.itemRow}>
                        <span style={styles.itemName}>{item.name}</span>
                        <span style={{ ...styles.itemValue, color: item.pass ? '#047857' : '#dc2626' }}>
                          {item.value} {item.pass ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td style={styles.td}>{record.performedBy}</td>
                <td style={styles.td}>{record.nextQCDate || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
