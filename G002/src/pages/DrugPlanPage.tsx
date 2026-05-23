// DrugPlanPage.tsx - 药物申购计划
import React, { useState } from 'react';
import { Pill, TrendingUp, AlertTriangle, Calendar, Clock, Search, CheckCircle, FileText } from 'lucide-react';

interface DrugPlan {
  id: string;
  drugName: string;
  radioisotope: string;
  specification: string;
  unit: string;
  currentStock: number;
  monthlyConsumption: number;
  safetyStock: number;
  suggestedOrder: number;
  leadTime: string;
  supplier: string;
  lastOrderDate: string;
  lastOrderQty: number;
  unitPrice: number;
  status: '正常' | '需补货' | '紧急' | '缺货';
  nextDelivery: string;
  notes: string;
}

const mockData: DrugPlan[] = [
  { id: 'DP001', drugName: '18F-FDG注射液', radioisotope: '18F', specification: '3700MBq/5ml', unit: '支', currentStock: 8, monthlyConsumption: 35, safetyStock: 10, suggestedOrder: 30, leadTime: '1天', supplier: '回旋加速器自制', lastOrderDate: '2026-05-01', lastOrderQty: 30, unitPrice: 0, status: '需补货', nextDelivery: '2026-05-08', notes: '加速器产18F，需每日配送' },
  { id: 'DP002', drugName: '18F-PSMA注射液', radioisotope: '18F', specification: '370MBq/5ml', unit: '支', currentStock: 3, monthlyConsumption: 12, safetyStock: 5, suggestedOrder: 15, leadTime: '2天', supplier: '回旋加速器自制', lastOrderDate: '2026-05-01', lastOrderQty: 15, unitPrice: 0, status: '需补货', nextDelivery: '2026-05-09', notes: '前列腺癌专用示踪剂' },
  { id: 'DP003', drugName: '18F-AV45注射液', radioisotope: '18F', specification: '370MBq/5ml', unit: '支', currentStock: 5, monthlyConsumption: 8, safetyStock: 4, suggestedOrder: 10, leadTime: '2天', supplier: '回旋加速器自制', lastOrderDate: '2026-05-01', lastOrderQty: 10, unitPrice: 0, status: '正常', nextDelivery: '按需制备', notes: 'β-淀粉样蛋白显像剂' },
  { id: 'DP004', drugName: '99mTc-MIBI药盒', radioisotope: '99mTc', specification: '5mg/瓶', unit: '瓶', currentStock: 25, monthlyConsumption: 20, safetyStock: 15, suggestedOrder: 30, leadTime: '3天', supplier: '中国同辐股份', lastOrderDate: '2026-04-15', lastOrderQty: 40, unitPrice: 180, status: '正常', nextDelivery: '2026-05-12', notes: '心肌灌注显像主力药物' },
  { id: 'DP005', drugName: '99mTc-DTPA药盒', radioisotope: '99mTc', specification: '5mg/瓶', unit: '瓶', currentStock: 18, monthlyConsumption: 15, safetyStock: 10, suggestedOrder: 20, leadTime: '3天', supplier: '中国同辐股份', lastOrderDate: '2026-04-15', lastOrderQty: 25, unitPrice: 150, status: '正常', nextDelivery: '2026-05-12', notes: '肾动态显像用药' },
  { id: 'DP006', drugName: '99mTc-MDP药盒', radioisotope: '99mTc', specification: '10mg/瓶', unit: '瓶', currentStock: 22, monthlyConsumption: 18, safetyStock: 12, suggestedOrder: 25, leadTime: '3天', supplier: '中国同辐股份', lastOrderDate: '2026-04-15', lastOrderQty: 30, unitPrice: 120, status: '正常', nextDelivery: '2026-05-12', notes: '全身骨显像用药' },
  { id: 'DP007', drugName: '99mTcO4-高锝酸钠', radioisotope: '99mTc', specification: '1850MBq/ml', unit: 'ml', currentStock: 15, monthlyConsumption: 12, safetyStock: 8, suggestedOrder: 20, leadTime: '1天', supplier: '99Mo-99mTc发生器', lastOrderDate: '2026-05-01', lastOrderQty: 20, unitPrice: 0, status: '正常', nextDelivery: '2026-05-08', notes: '甲状腺/唾液腺显像' },
  { id: 'DP008', drugName: '131I-碘化钠溶液', radioisotope: '131I', specification: '3700MBq/10ml', unit: '支', currentStock: 2, monthlyConsumption: 8, safetyStock: 5, suggestedOrder: 10, leadTime: '5天', supplier: '中国同辐股份', lastOrderDate: '2026-04-20', lastOrderQty: 12, unitPrice: 3200, status: '紧急', nextDelivery: '2026-05-12', notes: '⚠️ 甲亢/甲状腺癌治疗，需要提前5天订购' },
  { id: 'DP009', drugName: '89Sr-氯化锶注射液', radioisotope: '89Sr', specification: '150MBq/ml', unit: '支', currentStock: 1, monthlyConsumption: 4, safetyStock: 3, suggestedOrder: 6, leadTime: '7天', supplier: '进口', lastOrderDate: '2026-04-10', lastOrderQty: 5, unitPrice: 8500, status: '紧急', nextDelivery: '2026-05-14', notes: '⚠️ 骨转移瘤治疗，需提前1周订购' },
  { id: 'DP010', drugName: '177Lu-DOTATATE', radioisotope: '177Lu', specification: '7400MBq/5ml', unit: '支', currentStock: 2, monthlyConsumption: 3, safetyStock: 3, suggestedOrder: 5, leadTime: '10天', supplier: '进口', lastOrderDate: '2026-04-15', lastOrderQty: 4, unitPrice: 15000, status: '需补货', nextDelivery: '2026-05-18', notes: '神经内分泌肿瘤PRRT治疗' },
  { id: 'DP011', drugName: '125I-放射性粒子', radioisotope: '125I', specification: '0.5mCi/粒', unit: '粒', currentStock: 50, monthlyConsumption: 30, safetyStock: 40, suggestedOrder: 60, leadTime: '14天', supplier: '中国同辐股份', lastOrderDate: '2026-03-20', lastOrderQty: 80, unitPrice: 85, status: '需补货', nextDelivery: '2026-05-22', notes: '肿瘤植入近距离治疗' },
  { id: 'DP012', drugName: '153Sm-EDTMP', radioisotope: '153Sm', specification: '1850MBq/ml', unit: '支', currentStock: 3, monthlyConsumption: 2, safetyStock: 2, suggestedOrder: 4, leadTime: '7天', supplier: '进口', lastOrderDate: '2026-04-25', lastOrderQty: 3, unitPrice: 6000, status: '正常', nextDelivery: '2026-05-15', notes: '骨转移瘤镇痛治疗' },
  { id: 'DP013', drugName: '11C-胆碱注射液', radioisotope: '11C', specification: '370MBq/5ml', unit: '支', currentStock: 6, monthlyConsumption: 6, safetyStock: 4, suggestedOrder: 10, leadTime: '1天', supplier: '回旋加速器自制', lastOrderDate: '2026-05-01', lastOrderQty: 10, unitPrice: 0, status: '需补货', nextDelivery: '2026-05-08', notes: '前列腺癌/肝癌专用11C标记' },
  { id: 'DP014', drugName: '99mTc-ECD脑灌注药盒', radioisotope: '99mTc', specification: '5mg/瓶', unit: '瓶', currentStock: 12, monthlyConsumption: 10, safetyStock: 8, suggestedOrder: 15, leadTime: '3天', supplier: '中国同辐股份', lastOrderDate: '2026-04-20', lastOrderQty: 20, unitPrice: 200, status: '正常', nextDelivery: '2026-05-11', notes: '脑血流灌注显像' },
  { id: 'DP015', drugName: '18F-FLT胸苷激酶', radioisotope: '18F', specification: '370MBq/5ml', unit: '支', currentStock: 4, monthlyConsumption: 5, safetyStock: 4, suggestedOrder: 8, leadTime: '2天', supplier: '回旋加速器自制', lastOrderDate: '2026-05-01', lastOrderQty: 8, unitPrice: 0, status: '正常', nextDelivery: '按需制备', notes: '细胞增殖显像剂' },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  alertBanner: { background: '#fee2e2', border: '2px solid #dc2626', borderRadius: '8px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
  warnBanner: { background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '8px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
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
  stockBar: { background: '#e5e7eb', borderRadius: '4px', height: '6px', marginTop: '4px', width: '100%' },
};

const DrugPlanPage: React.FC = () => {
  const [plans] = useState<DrugPlan[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const filtered = plans.filter(p => {
    const matchSearch = p.drugName.includes(search) || p.radioisotope.includes(search);
    const matchStatus = statusFilter === '全部' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const urgentCount = plans.filter(p => p.status === '紧急').length;
  const reorderCount = plans.filter(p => p.status === '需补货').length;
  const totalOrderCost = plans.filter(p => p.status === '紧急' || p.status === '需补货').reduce((s, p) => s + p.suggestedOrder * p.unitPrice, 0);

  const statusBadge = (s: string) => {
    if (s === '紧急') return { background: '#fee2e2', color: '#dc2626' };
    if (s === '需补货') return { background: '#fef3c7', color: '#b45309' };
    if (s === '缺货') return { background: '#dc2626', color: '#fff' };
    return { background: '#d1fae5', color: '#047857' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>药物申购计划</h2>
        <p style={styles.subtitle}>放射性药物库存监测 · 申购建议 · 供应商管理</p>
      </div>

      {urgentCount > 0 && (
        <div style={styles.alertBanner}>
          <AlertTriangle size={20} color="#dc2626" />
          <div>
            <div style={{ fontWeight: 600, color: '#dc2626' }}>⚠️ {urgentCount} 种药物需要紧急采购</div>
            <div style={{ fontSize: '13px', color: '#991b1b' }}>131I和89Sr库存不足，请立即提交紧急订单！</div>
          </div>
        </div>
      )}
      {reorderCount > 0 && (
        <div style={styles.warnBanner}>
          <Pill size={20} color="#b45309" />
          <div>
            <div style={{ fontWeight: 600, color: '#b45309' }}>⚠️ {reorderCount} 种药物建议补货</div>
            <div style={{ fontSize: '13px', color: '#92400e' }}>18F-FDG和18F-PSMA库存接近安全线，请提前订购</div>
          </div>
        </div>
      )}

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Pill size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{plans.length}</div><div style={styles.statLabel}>药品种类</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{urgentCount}</div><div style={styles.statLabel}>紧急采购</div></div>
        <div style={styles.statCard}><TrendingUp size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>{reorderCount}</div><div style={styles.statLabel}>建议补货</div></div>
        <div style={styles.statCard}><FileText size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalOrderCost > 0 ? `¥${(totalOrderCost / 10000).toFixed(1)}万` : '¥0'}</div><div style={styles.statLabel}>待采购金额</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索药品名称/核素..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '正常', '需补货', '紧急', '缺货'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: statusFilter === s ? '#1e40af' : '#d1d5db', background: statusFilter === s ? '#1e40af' : '#fff', color: statusFilter === s ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{s}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>药品名称</th>
              <th style={styles.th}>核素/规格</th>
              <th style={styles.th}>当前库存</th>
              <th style={styles.th}>月消耗</th>
              <th style={styles.th}>安全库存</th>
              <th style={styles.th}>建议订购量</th>
              <th style={styles.th}>到货周期</th>
              <th style={styles.th}>供应商</th>
              <th style={styles.th}>单价</th>
              <th style={styles.th}>下次到货</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const stockPercent = Math.min((p.currentStock / p.safetyStock) * 100, 100);
              return (
                <tr key={p.id}>
                  <td style={styles.td}><div style={{ fontWeight: 500 }}>{p.drugName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{p.radioisotope}</div></td>
                  <td style={styles.td}>{p.specification}</td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 600, color: p.currentStock < p.safetyStock ? '#dc2626' : '#374151' }}>{p.currentStock} {p.unit}</div>
                    <div style={{ ...styles.stockBar }}>
                      <div style={{ width: `${stockPercent}%`, background: p.currentStock < p.safetyStock ? '#dc2626' : '#1e40af', borderRadius: '4px', height: '6px' }} />
                    </div>
                  </td>
                  <td style={styles.td}>{p.monthlyConsumption} {p.unit}/月</td>
                  <td style={styles.td}>{p.safetyStock} {p.unit}</td>
                  <td style={{ ...styles.td, fontWeight: 700, color: '#1e40af' }}>{p.suggestedOrder} {p.unit}</td>
                  <td style={styles.td}><Clock size={12} color="#6b7280" style={{ marginRight: '4px' }} />{p.leadTime}</td>
                  <td style={styles.td}>{p.supplier}</td>
                  <td style={styles.td}>{p.unitPrice > 0 ? `¥${p.unitPrice.toLocaleString()}` : '自制'}</td>
                  <td style={styles.td}><Calendar size={12} color="#6b7280" style={{ marginRight: '4px' }} />{p.nextDelivery}</td>
                  <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...statusBadge(p.status) }}>{p.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrugPlanPage;
