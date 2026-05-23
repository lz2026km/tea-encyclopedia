// RadioisotopePage.tsx - 核素管理
import React, { useState } from 'react';
import { Activity, Radio, Clock, AlertTriangle, Search, Package, TrendingUp } from 'lucide-react';

interface Radioisotope {
  id: string;
  name: string;
  symbol: string;
  halfLife: string;
  halfLifeHours: number;
  decayMode: string;
  emissionEnergy: string;
  productionMethod: string;
  supplier: string;
  currentActivity: number;
  unit: string;
  monthlyConsumption: number;
  storageLocation: string;
  lastDelivery: string;
  nextDelivery: string;
  status: '充足' | '不足' | '紧急' | '缺货';
  notes: string;
}

const mockData: Radioisotope[] = [
  { id: 'RI001', name: '氟-18', symbol: '18F', halfLife: '109.8分钟', halfLifeHours: 1.83, decayMode: 'β+', emissionEnergy: '511 keV', productionMethod: '回旋加速器', supplier: '科室自制', currentActivity: 18500, unit: 'MBq', monthlyConsumption: 45000, storageLocation: '加速器实验室', lastDelivery: '2026-05-07', nextDelivery: '每日配送', status: '充足', notes: '每日制备，供应本院PET/CT使用' },
  { id: 'RI002', name: '锝-99m', symbol: '99mTc', halfLife: '6.02小时', halfLifeHours: 6.02, decayMode: 'IT', emissionEnergy: '140 keV', productionMethod: '99Mo-99mTc发生器', supplier: '中国同辐股份', currentActivity: 18500, unit: 'MBq', monthlyConsumption: 35000, storageLocation: '核素药房', lastDelivery: '2026-05-05', nextDelivery: '2026-05-10', status: '充足', notes: '发生器淋洗后使用' },
  { id: 'RI003', name: '碘-131', symbol: '131I', halfLife: '8.02天', halfLifeHours: 192.5, decayMode: 'β-', emissionEnergy: '364 keV', productionMethod: '核反应堆', supplier: '中国同辐股份', currentActivity: 1850, unit: 'MBq', monthlyConsumption: 4500, storageLocation: '核素治疗室(铅柜)', lastDelivery: '2026-04-20', nextDelivery: '2026-05-12', status: '不足', notes: '需提前5天订购，有库存但接近安全线' },
  { id: 'RI004', name: '锶-89', symbol: '89Sr', halfLife: '50.5天', halfLifeHours: 1212, decayMode: 'β-', emissionEnergy: '909 keV', productionMethod: '核反应堆', supplier: '进口', currentActivity: 555, unit: 'MBq', monthlyConsumption: 820, storageLocation: '核素治疗室(铅罐)', lastDelivery: '2026-04-10', nextDelivery: '2026-05-14', status: '紧急', notes: '⚠️ 库存不足，紧急！需提前1周订购' },
  { id: 'RI005', name: '碳-11', symbol: '11C', halfLife: '20.4分钟', halfLifeHours: 0.34, decayMode: 'β+', emissionEnergy: '511 keV', productionMethod: '回旋加速器', supplier: '科室自制', currentActivity: 3700, unit: 'MBq', monthlyConsumption: 5500, storageLocation: '加速器实验室', lastDelivery: '2026-05-07', nextDelivery: '每日配送', status: '充足', notes: '短半衰期核素，即制即用' },
  { id: 'RI006', name: '铊-201', symbol: '201Tl', halfLife: '73.1小时', halfLifeHours: 73.1, decayMode: 'EC', emissionEnergy: '69-83 keV', productionMethod: '核反应堆', supplier: '进口', currentActivity: 925, unit: 'MBq', monthlyConsumption: 850, storageLocation: '核素药房', lastDelivery: '2026-04-25', nextDelivery: '2026-05-15', status: '充足', notes: '心肌灌注显像备用示踪剂' },
  { id: 'RI007', name: '碘-125', symbol: '125I', halfLife: '59.6天', halfLifeHours: 1430, decayMode: 'EC', emissionEnergy: '27-35 keV', productionMethod: '核反应堆', supplier: '中国同辐股份', currentActivity: 185, unit: 'MBq', monthlyConsumption: 320, storageLocation: '粒子植入室', lastDelivery: '2026-03-20', nextDelivery: '2026-05-22', status: '不足', notes: '粒子植入用，需提前2周订购' },
  { id: 'RI008', name: '钐-153', symbol: '153Sm', halfLife: '46.3小时', halfLifeHours: 46.3, decayMode: 'β-', emissionEnergy: '103 keV', productionMethod: '核反应堆', supplier: '进口', currentActivity: 740, unit: 'MBq', monthlyConsumption: 920, storageLocation: '核素治疗室', lastDelivery: '2026-04-25', nextDelivery: '2026-05-15', status: '充足', notes: '骨转移瘤镇痛治疗' },
  { id: 'RI009', name: '镥-177', symbol: '177Lu', halfLife: '6.65天', halfLifeHours: 159.6, decayMode: 'β-', emissionEnergy: '208 keV', productionMethod: '核反应堆', supplier: '进口', currentActivity: 7400, unit: 'MBq', monthlyConsumption: 14800, storageLocation: '核素治疗室', lastDelivery: '2026-04-15', nextDelivery: '2026-05-18', status: '不足', notes: 'PRRT治疗用，177Lu-DOTATATE前体' },
  { id: 'RI010', name: '铼-186', symbol: '186Re', halfLife: '89.3小时', halfLifeHours: 89.3, decayMode: 'β-', emissionEnergy: '137 keV', productionMethod: '核反应堆', supplier: '进口', currentActivity: 3700, unit: 'MBq', monthlyConsumption: 2800, storageLocation: '核素治疗室', lastDelivery: '2026-04-20', nextDelivery: '2026-05-20', status: '充足', notes: '骨转移瘤治疗备用' },
  { id: 'RI011', name: '铜-64', symbol: '64Cu', halfLife: '12.7小时', halfLifeHours: 12.7, decayMode: 'β+/EC', emissionEnergy: '511 keV', productionMethod: '回旋加速器', supplier: '科室自制', currentActivity: 740, unit: 'MBq', monthlyConsumption: 1200, storageLocation: '加速器实验室', lastDelivery: '2026-05-01', nextDelivery: '按需制备', status: '充足', notes: '新型PET示踪剂，肿瘤/感染成像' },
  { id: 'RI012', name: '镓-68', symbol: '68Ga', halfLife: '68分钟', halfLifeHours: 1.13, decayMode: 'β+', emissionEnergy: '511 keV', productionMethod: '68Ge-68Ga发生器', supplier: '进口', currentActivity: 1850, unit: 'MBq', monthlyConsumption: 2200, storageLocation: '核素药房', lastDelivery: '2026-05-01', nextDelivery: '按需淋洗', status: '充足', notes: '68Ga-PSMA/68Ga-DOTATATE前体' },
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
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
};

const statusBadge = (s: string) => {
  if (s === '紧急') return { background: '#fee2e2', color: '#dc2626' };
  if (s === '缺货') return { background: '#dc2626', color: '#fff' };
  if (s === '不足') return { background: '#fef3c7', color: '#b45309' };
  return { background: '#d1fae5', color: '#047857' };
};

const RadioisotopePage: React.FC = () => {
  const [data] = useState<Radioisotope[]>(mockData);
  const urgentCount = data.filter(d => d.status === '紧急').length;
  const lowCount = data.filter(d => d.status === '不足').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>核素管理</h2>
        <p style={styles.subtitle}>放射性核素库存 · 半衰期追踪 · 供应链管理</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Radio size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{data.length}</div><div style={styles.statLabel}>核素种类</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{urgentCount}</div><div style={styles.statLabel}>紧急补货</div></div>
        <div style={styles.statCard}><TrendingUp size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>{lowCount}</div><div style={styles.statLabel}>库存不足</div></div>
        <div style={styles.statCard}><Package size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{data.filter(d => d.status === '充足').length}</div><div style={styles.statLabel}>库存充足</div></div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>核素</th>
              <th style={styles.th}>半衰期</th>
              <th style={styles.th}>衰变方式</th>
              <th style={styles.th}>射线能量</th>
              <th style={styles.th}>生产方式</th>
              <th style={styles.th}>供应商</th>
              <th style={styles.th}>当前库存</th>
              <th style={styles.th}>月消耗</th>
              <th style={styles.th}>存储位置</th>
              <th style={styles.th}>下次到货</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 700, fontSize: '16px', color: '#1e40af' }}>{r.symbol}</div><div style={{ fontSize: '12px', color: '#6b7280' }}>{r.name}</div></td>
                <td style={styles.td}><Clock size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.halfLife}</td>
                <td style={styles.td}>{r.decayMode}</td>
                <td style={styles.td}>{r.emissionEnergy}</td>
                <td style={styles.td}>{r.productionMethod}</td>
                <td style={styles.td}>{r.supplier}</td>
                <td style={{ ...styles.td, fontWeight: 700, color: r.status === '紧急' ? '#dc2626' : r.status === '不足' ? '#b45309' : '#374151' }}>{r.currentActivity.toLocaleString()} {r.unit}</td>
                <td style={styles.td}>{r.monthlyConsumption.toLocaleString()} {r.unit}/月</td>
                <td style={styles.td}>{r.storageLocation}</td>
                <td style={styles.td}>{r.nextDelivery}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, ...statusBadge(r.status) }}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RadioisotopePage;
