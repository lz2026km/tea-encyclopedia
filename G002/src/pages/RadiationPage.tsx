import React from 'react';
import { Activity, AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { radiationDoses } from '../data/initialData';

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
  chartContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', marginBottom: '24px' },
  chartTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '20px' },
  barChart: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', paddingTop: '20px' },
  barGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  barWrapper: { display: 'flex', gap: '4px', alignItems: 'flex-end', height: '160px' },
  bar: { width: '24px', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' },
  barLabel: { fontSize: '11px', color: '#6b7280', marginTop: '8px', textAlign: 'center' },
  barValue: { fontSize: '10px', color: '#374151', marginBottom: '4px' },
  legend: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' },
  legendDot: { width: '12px', height: '12px', borderRadius: '2px' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  tableTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', padding: '16px', borderBottom: '1px solid #e5e7eb' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 },
  badgeNormal: { background: '#d1fae5', color: '#047857' },
  badgeAttention: { background: '#fef3c7', color: '#b45309' },
  badgeExceeded: { background: '#fee2e2', color: '#dc2626' },
  progressBar: { width: '100px', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden', display: 'inline-block', verticalAlign: 'middle', marginLeft: '8px' },
  progressFill: { height: '100%', borderRadius: '4px', transition: 'width 0.3s' },
};

export default function RadiationPage() {
  const normalCount = radiationDoses.filter(d => d.status === '正常').length;
  const attentionCount = radiationDoses.filter(d => d.status === '关注').length;
  const exceededCount = radiationDoses.filter(d => d.status === '超标').length;
  const avgCumulative = (radiationDoses.reduce((sum, d) => sum + d.cumulativeYear, 0) / radiationDoses.length).toFixed(2);
  
  const maxCumulative = Math.max(...radiationDoses.map(d => d.cumulativeYear));
  const chartHeight = 160;
  
  const colors = {
    deep: '#1e40af',
    shallow: '#3b82f6',
    extremity: '#60a5fa',
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>剂量监测</h1>
        <p style={styles.subtitle}>核医学科工作人员辐射剂量追踪</p>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Shield size={16} color="#1e40af" /> 在册人员</div>
          <div><span style={styles.cardValue}>{radiationDoses.length}</span><span style={styles.cardUnit}>人</span></div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Activity size={16} color="#047857" /> 剂量正常</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#047857' }}>{normalCount}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><AlertTriangle size={16} color="#b45309" /> 需关注</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#b45309' }}>{attentionCount}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><TrendingUp size={16} color="#1e40af" /> 年均累计剂量</div>
          <div><span style={styles.cardValue}>{avgCumulative}</span><span style={styles.cardUnit}>mSv</span></div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Shield size={16} color="#1e40af" /> 最高累计</div>
          <div><span style={styles.cardValue}>{maxCumulative}</span><span style={styles.cardUnit}>mSv</span></div>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <div style={styles.chartTitle}>个人累计年剂量 (mSv)</div>
        <div style={styles.barChart}>
          {radiationDoses.map(dose => {
            const height = (dose.cumulativeYear / maxCumulative) * chartHeight;
            return (
              <div key={dose.id} style={styles.barGroup}>
                <div style={styles.barValue}>{dose.cumulativeYear}</div>
                <div style={styles.barWrapper}>
                  <div
                    style={{
                      ...styles.bar,
                      background: dose.status === '关注' ? '#f59e0b' : dose.status === '超标' ? '#dc2626' : '#1e40af',
                      height: `${Math.max(height, 4)}px`,
                    }}
                  />
                </div>
                <div style={styles.barLabel}>{dose.staffName.split(' ')[0]}</div>
              </div>
            );
          })}
        </div>
        <div style={styles.legend}>
          <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#1e40af' }}></div>正常</div>
          <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#f59e0b' }}></div>关注</div>
          <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#dc2626' }}></div>超标</div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableTitle}>个人剂量记录 (2026年4月)</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>工号</th>
              <th style={styles.th}>姓名</th>
              <th style={styles.th}>部门</th>
              <th style={styles.th}>深部剂量(mSv)</th>
              <th style={styles.th}>浅表剂量(mSv)</th>
              <th style={styles.th}> extremities剂量(mSv)</th>
              <th style={styles.th}>年累计(mSv)</th>
              <th style={styles.th}>阈值(mSv)</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {radiationDoses.map(dose => {
              const percent = (dose.cumulativeYear / dose.threshold) * 100;
              const barColor = dose.status === '正常' ? '#047857' : dose.status === '关注' ? '#f59e0b' : '#dc2626';
              return (
                <tr key={dose.id}>
                  <td style={styles.td}>{dose.staffId}</td>
                  <td style={styles.td}><strong>{dose.staffName}</strong></td>
                  <td style={styles.td}>{dose.department}</td>
                  <td style={styles.td}>{dose.deepDose}</td>
                  <td style={styles.td}>{dose.shallowDose}</td>
                  <td style={styles.td}>{dose.extremityDose}</td>
                  <td style={styles.td}>
                    <strong>{dose.cumulativeYear}</strong>
                    <div style={{ ...styles.progressBar }}>
                      <div style={{ ...styles.progressFill, width: `${Math.min(percent, 100)}%`, background: barColor }} />
                    </div>
                  </td>
                  <td style={styles.td}>{dose.threshold}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...(dose.status === '正常' ? styles.badgeNormal : dose.status === '关注' ? styles.badgeAttention : styles.badgeExceeded) }}>
                      {dose.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
