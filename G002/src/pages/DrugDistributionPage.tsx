import React from 'react';
import { Truck, CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react';
import { drugDistributions } from '../data/initialData';

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
  flowContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', marginBottom: '24px' },
  flowTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px' },
  flowSteps: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  flowStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  flowIcon: { width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' },
  flowLabel: { fontSize: '13px', fontWeight: 500, color: '#374151' },
  flowCount: { fontSize: '12px', color: '#6b7280' },
  flowArrow: { color: '#d1d5db', flexShrink: 0 },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  tableTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', padding: '16px', borderBottom: '1px solid #e5e7eb' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 },
  badgePending: { background: '#fef3c7', color: '#b45309' },
  badgeDispensed: { background: '#dbeafe', color: '#1e40af' },
  badgeInjected: { background: '#d1fae5', color: '#047857' },
  badgeWasted: { background: '#fee2e2', color: '#dc2626' },
};

export default function DrugDistributionPage() {
  const statusCounts = {
    待分装: drugDistributions.filter(d => d.status === '待分装').length,
    已分装: drugDistributions.filter(d => d.status === '已分装').length,
    已注射: drugDistributions.filter(d => d.status === '已注射').length,
    已废弃: drugDistributions.filter(d => d.status === '已废弃').length,
  };

  const totalDose = drugDistributions.reduce((sum, d) => sum + d.distributedDose, 0);
  const totalResidual = drugDistributions.reduce((sum, d) => sum + (d.residualDose || 0), 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已注射': return <CheckCircle size={24} color="#047857" />;
      case '待分装': return <Clock size={24} color="#b45309" />;
      case '已废弃': return <XCircle size={24} color="#dc2626" />;
      default: return <Truck size={24} color="#1e40af" />;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>药品分发管理</h1>
        <p style={styles.subtitle}>放射性药品分发与注射流程追踪</p>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Truck size={16} color="#1e40af" /> 总分发数</div>
          <div><span style={styles.cardValue}>{drugDistributions.length}</span><span style={styles.cardUnit}>次</span></div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><CheckCircle size={16} color="#047857" /> 已注射</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#047857' }}>{statusCounts.已注射}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Clock size={16} color="#b45309" /> 待分装</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#b45309' }}>{statusCounts.待分装}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Truck size={16} color="#1e40af" /> 分发总量</div>
          <div><span style={styles.cardValue}>{totalDose.toFixed(1)}</span><span style={styles.cardUnit}>mCi</span></div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><XCircle size={16} color="#6b7280" /> 残余总量</div>
          <div><span style={{ fontSize: '28px', fontWeight: 700, color: '#6b7280' }}>{totalResidual.toFixed(1)}</span><span style={styles.cardUnit}>mCi</span></div>
        </div>
      </div>

      <div style={styles.flowContainer}>
        <div style={styles.flowTitle}>分发流程状态</div>
        <div style={styles.flowSteps}>
          <div style={styles.flowStep}>
            <div style={{ ...styles.flowIcon, background: '#fef3c7' }}><Clock size={24} color="#b45309" /></div>
            <div style={styles.flowLabel}>待分装</div>
            <div style={styles.flowCount}>{statusCounts.待分装} 项</div>
          </div>
          <div style={styles.flowArrow}><ArrowRight size={20} /></div>
          <div style={styles.flowStep}>
            <div style={{ ...styles.flowIcon, background: '#dbeafe' }}><Truck size={24} color="#1e40af" /></div>
            <div style={styles.flowLabel}>已分装</div>
            <div style={styles.flowCount}>{statusCounts.已分装} 项</div>
          </div>
          <div style={styles.flowArrow}><ArrowRight size={20} /></div>
          <div style={styles.flowStep}>
            <div style={{ ...styles.flowIcon, background: '#d1fae5' }}><CheckCircle size={24} color="#047857" /></div>
            <div style={styles.flowLabel}>已注射</div>
            <div style={styles.flowCount}>{statusCounts.已注射} 项</div>
          </div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableTitle}>药品分发记录</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>分发ID</th>
              <th style={styles.th}>药品名称</th>
              <th style={styles.th}>患者姓名</th>
              <th style={styles.th}>分发剂量</th>
              <th style={styles.th}>分发时间</th>
              <th style={styles.th}>分发人</th>
              <th style={styles.th}>状态</th>
              <th style={styles.th}>残余量</th>
            </tr>
          </thead>
          <tbody>
            {drugDistributions.map(dist => (
              <tr key={dist.id}>
                <td style={styles.td}>{dist.id}</td>
                <td style={styles.td}><strong>{dist.drugName}</strong></td>
                <td style={styles.td}>{dist.patientName}</td>
                <td style={styles.td}>{dist.distributedDose} {dist.unit}</td>
                <td style={styles.td}>{dist.distributedTime}</td>
                <td style={styles.td}>{dist.distributedBy}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...(dist.status === '已注射' ? styles.badgeInjected : dist.status === '待分装' ? styles.badgePending : dist.status === '已废弃' ? styles.badgeWasted : styles.badgeDispensed) }}>
                    {dist.status}
                  </span>
                </td>
                <td style={styles.td}>{dist.residualDose ? `${dist.residualDose} ${dist.unit}` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
