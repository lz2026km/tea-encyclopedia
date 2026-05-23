import React from 'react';
import { Package, AlertTriangle, Clock } from 'lucide-react';
import { nuclearDrugs } from '../data/initialData';

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  cardsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' },
  card: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  cardTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
  cardValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  cardUnit: { fontSize: '14px', color: '#6b7280', marginLeft: '4px' },
  cardSubtext: { fontSize: '12px', color: '#9ca3af', marginTop: '4px' },
  alertCard: { background: '#fef3c7', borderColor: '#f59e0b' },
  alertCardTitle: { color: '#b45309' },
  alertValue: { color: '#d97706' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  tableTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', padding: '16px', borderBottom: '1px solid #e5e7eb' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 },
  badgeDiagnostic: { background: '#dbeafe', color: '#1e40af' },
  badgeTherapy: { background: '#fce7f3', color: '#be185d' },
  badgeNormal: { background: '#d1fae5', color: '#047857' },
  badgeWarning: { background: '#fef3c7', color: '#b45309' },
  badgeExpired: { background: '#fee2e2', color: '#dc2626' },
  stockLow: { color: '#dc2626' },
  stockNormal: { color: '#047857' },
};

function getDaysUntilExpiry(expiryDate: string): number {
  const today = new Date('2026-05-02');
  const expiry = new Date(expiryDate);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DrugPage() {
  const expiringDrugs = nuclearDrugs.filter(d => getDaysUntilExpiry(d.expiryDate) <= 3);
  const totalStock = nuclearDrugs.reduce((sum, d) => sum + d.inventoryCount, 0);
  const diagnosticDrugs = nuclearDrugs.filter(d => d.category === '诊断用药').length;
  const therapyDrugs = nuclearDrugs.filter(d => d.category === '治疗用药').length;

  const getStockStatus = (drug: typeof nuclearDrugs[0]) => {
    if (drug.name.includes('18F') && drug.inventoryCount < 400) return 'low';
    if (drug.name.includes('99mTc') && drug.inventoryCount < 1500) return 'low';
    if (drug.name.includes('131I') && drug.inventoryCount < 200) return 'low';
    return 'normal';
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>药品库存管理</h1>
        <p style={styles.subtitle}>核医学科放射性药品库存与效期监控</p>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Package size={16} color="#1e40af" /> 库存总量</div>
          <div><span style={styles.cardValue}>{totalStock.toLocaleString()}</span><span style={styles.cardUnit}>mCi</span></div>
          <div style={styles.cardSubtext}>共{nuclearDrugs.length}种药品</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><AlertTriangle size={16} color="#1e40af" /> 效期预警</div>
          <div><span style={styles.cardValue}>{expiringDrugs.length}</span><span style={styles.cardUnit}>项</span></div>
          <div style={styles.cardSubtext}>3天内即将过期</div>
        </div>
        <div style={{ ...styles.card, ...styles.alertCard }}>
          <div style={{ ...styles.cardTitle, ...styles.alertCardTitle }}><Clock size={16} color="#b45309" /> 即将过期药品</div>
          {expiringDrugs.length > 0 ? expiringDrugs.slice(0, 3).map(d => (
            <div key={d.id} style={{ fontSize: '13px', color: '#b45309', marginBottom: '4px' }}>
              {d.name}: {getDaysUntilExpiry(d.expiryDate)}天后 ({d.inventoryCount}{d.unit})
            </div>
          )) : <div style={{ fontSize: '13px', color: '#047857' }}>无即将过期药品</div>}
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Package size={16} color="#1e40af" /> 诊断用药</div>
          <div><span style={styles.cardValue}>{diagnosticDrugs}</span><span style={styles.cardUnit}>种</span></div>
          <div style={styles.cardSubtext}>放射性诊断用药</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}><Package size={16} color="#1e40af" /> 治疗用药</div>
          <div><span style={styles.cardValue}>{therapyDrugs}</span><span style={styles.cardUnit}>种</span></div>
          <div style={styles.cardSubtext}>放射性治疗用药</div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableTitle}>核药品库存明细</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>药品名称</th>
              <th style={styles.th}>同位素</th>
              <th style={styles.th}>半衰期</th>
              <th style={styles.th}>类别</th>
              <th style={styles.th}>库存量</th>
              <th style={styles.th}>有效期</th>
              <th style={styles.th}>供应商</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {nuclearDrugs.map(drug => {
              const daysUntil = getDaysUntilExpiry(drug.expiryDate);
              const stockStatus = getStockStatus(drug);
              return (
                <tr key={drug.id}>
                  <td style={styles.td}><strong>{drug.name}</strong></td>
                  <td style={styles.td}>{drug.isotope}</td>
                  <td style={styles.td}>{drug.halfLife}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...(drug.category === '诊断用药' ? styles.badgeDiagnostic : styles.badgeTherapy) }}>
                      {drug.category}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={stockStatus === 'low' ? styles.stockLow : styles.stockNormal}>
                      {drug.inventoryCount.toLocaleString()} {drug.unit}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {drug.expiryDate} 
                    {daysUntil <= 3 && <span style={{ ...styles.badge, ...styles.badgeWarning, marginLeft: '6px' }}>预警</span>}
                    {daysUntil <= 0 && <span style={{ ...styles.badge, ...styles.badgeExpired, marginLeft: '6px' }}>过期</span>}
                  </td>
                  <td style={styles.td}>{drug.supplier}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...styles.badgeNormal }}>库存正常</span>
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
