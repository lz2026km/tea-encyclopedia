// KitManagePage.tsx - 药盒/试剂盒管理
import React, { useState } from 'react';
import { Package, Search, AlertTriangle, Clock, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

interface Kit {
  id: string;
  name: string;
  kitType: string;
  packageSpec: string;
  unit: string;
  currentStock: number;
  safetyStock: number;
  monthlyUsage: number;
  shelfLife: string;
  expireDate: string;
  supplier: string;
  unitPrice: number;
  status: '充足' | '不足' | '过期' | '紧急';
  lastDelivery: string;
  nextDelivery: string;
  storageCondition: string;
  notes: string;
}

const mockData: Kit[] = [
  { id: 'K001', name: '99mTc-MIBI药盒', kitType: '心肌灌注', packageSpec: '5mg/瓶', unit: '瓶', currentStock: 25, safetyStock: 15, monthlyUsage: 20, shelfLife: '6个月', expireDate: '2026-10-15', supplier: '中国同辐股份', unitPrice: 180, status: '充足', lastDelivery: '2026-04-15', nextDelivery: '2026-05-12', storageCondition: '2-8°C冷藏', notes: 'MIBI药盒，需新鲜标记' },
  { id: 'K002', name: '99mTc-DTPA药盒', kitType: '肾动态', packageSpec: '5mg/瓶', unit: '瓶', currentStock: 18, safetyStock: 10, monthlyUsage: 15, shelfLife: '6个月', expireDate: '2026-09-20', supplier: '中国同辐股份', unitPrice: 150, status: '充足', lastDelivery: '2026-04-15', nextDelivery: '2026-05-12', storageCondition: '2-8°C冷藏', notes: '肾动态显像' },
  { id: 'K003', name: '99mTc-MDP药盒', kitType: '骨显像', packageSpec: '10mg/瓶', unit: '瓶', currentStock: 22, safetyStock: 12, monthlyUsage: 18, shelfLife: '6个月', expireDate: '2026-11-05', supplier: '中国同辐股份', unitPrice: 120, status: '充足', lastDelivery: '2026-04-15', nextDelivery: '2026-05-12', storageCondition: '2-8°C冷藏', notes: '全身骨显像' },
  { id: 'K004', name: '99mTc-ECD脑灌注药盒', kitType: '脑血流', packageSpec: '5mg/瓶', unit: '瓶', currentStock: 12, safetyStock: 8, monthlyUsage: 10, shelfLife: '6个月', expireDate: '2026-10-30', supplier: '中国同辐股份', unitPrice: 200, status: '充足', lastDelivery: '2026-04-20', nextDelivery: '2026-05-11', storageCondition: '2-8°C冷藏', notes: '脑血流灌注显像' },
  { id: 'K005', name: '99mTcO4-发生器用淋洗液', kitType: '通用', packageSpec: '生理盐水', unit: 'ml', currentStock: 500, safetyStock: 300, monthlyUsage: 450, shelfLife: '2年', expireDate: '2028-01-01', supplier: '中国同辐股份', unitPrice: 5, status: '充足', lastDelivery: '2026-05-01', nextDelivery: '按需', storageCondition: '常温保存', notes: '发生器淋洗用' },
  { id: 'K006', name: '131I治疗用胶囊', kitType: '核素治疗', packageSpec: '370MBq/粒', unit: '粒', currentStock: 5, safetyStock: 10, monthlyUsage: 12, shelfLife: '2个月', expireDate: '2026-06-30', supplier: '中国同辐股份', unitPrice: 800, status: '不足', lastDelivery: '2026-04-20', nextDelivery: '2026-05-12', storageCondition: '铅罐屏蔽', notes: '甲亢/甲状腺癌治疗，需提前订购' },
  { id: 'K007', name: '89Sr注射液', kitType: '核素治疗', packageSpec: '150MBq/ml', unit: '支', currentStock: 2, safetyStock: 5, monthlyUsage: 6, shelfLife: '3个月', expireDate: '2026-07-15', supplier: '进口', unitPrice: 8500, status: '紧急', lastDelivery: '2026-04-10', nextDelivery: '2026-05-14', storageCondition: '铅罐屏蔽', notes: '⚠️ 骨转移瘤镇痛，紧急补货！' },
  { id: 'K008', name: '177Lu-DOTATATE前体', kitType: 'PRRT治疗', packageSpec: '50μg/瓶', unit: '瓶', currentStock: 8, safetyStock: 10, monthlyUsage: 12, shelfLife: '1个月', expireDate: '2026-05-30', supplier: '进口', unitPrice: 15000, status: '不足', lastDelivery: '2026-04-15', nextDelivery: '2026-05-18', storageCondition: '-20°C冷冻', notes: '神经内分泌肿瘤PRRT，需提前订购' },
  { id: 'K009', name: '18F-FDG合成试剂盒', kitType: '正电子', packageSpec: '1套/批次', unit: '套', currentStock: 3, safetyStock: 5, monthlyUsage: 6, shelfLife: '2个月', expireDate: '2026-06-15', supplier: '科室自制', unitPrice: 0, status: '不足', lastDelivery: '2026-04-25', nextDelivery: '按需制备', storageCondition: '-20°C冷冻', notes: '加速器合成用FDG试剂盒' },
  { id: 'K010', name: '18F-PSMA合成试剂盒', kitType: '正电子', packageSpec: '1套/批次', unit: '套', currentStock: 5, safetyStock: 8, monthlyUsage: 10, shelfLife: '1个月', expireDate: '2026-05-28', supplier: '科室自制', unitPrice: 0, status: '充足', lastDelivery: '2026-05-01', nextDelivery: '按需制备', storageCondition: '-20°C冷冻', notes: '前列腺癌PSMA PET用' },
  { id: 'K011', name: '18F-AV45合成试剂盒', kitType: '正电子', packageSpec: '1套/批次', unit: '套', currentStock: 4, safetyStock: 5, monthlyUsage: 6, shelfLife: '1个月', expireDate: '2026-06-10', supplier: '科室自制', unitPrice: 0, status: '充足', lastDelivery: '2026-05-01', nextDelivery: '按需制备', storageCondition: '-20°C冷冻', notes: 'β-淀粉样蛋白显像用' },
  { id: 'K012', name: '99mTc-PYP焦磷酸盐药盒', kitType: '心肌淀粉样变', packageSpec: '5mg/瓶', unit: '瓶', currentStock: 8, safetyStock: 5, monthlyUsage: 4, shelfLife: '6个月', expireDate: '2026-10-01', supplier: '中国同辐股份', unitPrice: 220, status: '充足', lastDelivery: '2026-04-25', nextDelivery: '2026-06-01', storageCondition: '2-8°C冷藏', notes: '心肌淀粉样变筛查' },
  { id: 'K013', name: '99mTc-DMSA药盒', kitType: '肾脏肿瘤', packageSpec: '5mg/瓶', unit: '瓶', currentStock: 10, safetyStock: 6, monthlyUsage: 5, shelfLife: '6个月', expireDate: '2026-09-15', supplier: '中国同辐股份', unitPrice: 160, status: '充足', lastDelivery: '2026-04-20', nextDelivery: '2026-05-15', storageCondition: '2-8°C冷藏', notes: '肾静态显像，肾脏肿瘤定位' },
  { id: 'K014', name: '125I粒子', kitType: '近距离治疗', packageSpec: '0.5mCi/粒', unit: '粒', currentStock: 50, safetyStock: 40, monthlyUsage: 30, shelfLife: '60天', expireDate: '2026-06-30', supplier: '中国同辐股份', unitPrice: 85, status: '不足', lastDelivery: '2026-03-20', nextDelivery: '2026-05-22', storageCondition: '铅罐屏蔽', notes: '肿瘤植入治疗，需提前2周订购' },
  { id: 'K015', name: '153Sm-EDTMP药盒', kitType: '核素治疗', packageSpec: '50μg/瓶', unit: '瓶', currentStock: 5, safetyStock: 6, monthlyUsage: 5, shelfLife: '3个月', expireDate: '2026-07-01', supplier: '进口', unitPrice: 6000, status: '充足', lastDelivery: '2026-04-25', nextDelivery: '2026-05-15', storageCondition: '2-8°C冷藏', notes: '骨转移瘤治疗' },
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
  stockBar: { background: '#e5e7eb', borderRadius: '4px', height: '6px', marginTop: '4px', width: '100%' },
};

const statusBadge = (s: string) => {
  if (s === '紧急') return { background: '#fee2e2', color: '#dc2626' };
  if (s === '过期') return { background: '#dc2626', color: '#fff' };
  if (s === '不足') return { background: '#fef3c7', color: '#b45309' };
  return { background: '#d1fae5', color: '#047857' };
};

const KitManagePage: React.FC = () => {
  const [kits] = useState<Kit[]>(mockData);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');

  const types = ['全部', '心肌灌注', '肾动态', '骨显像', '脑血流', '正电子', '核素治疗', 'PRRT治疗', '近距离治疗', '通用'];
  const filtered = kits.filter(k => {
    const matchSearch = k.name.includes(search) || k.kitType.includes(search);
    const matchType = typeFilter === '全部' || k.kitType === typeFilter;
    return matchSearch && matchType;
  });

  const urgentCount = kits.filter(k => k.status === '紧急').length;
  const lowCount = kits.filter(k => k.status === '不足').length;
  const totalValue = kits.filter(k => k.status === '紧急' || k.status === '不足').reduce((s, k) => s + k.safetyStock * k.unitPrice, 0);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>药盒/试剂盒管理</h2>
        <p style={styles.subtitle}>99mTc药盒 · FDG合成试剂盒 · 治疗用核素 · 库存有效期追踪</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Package size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{kits.length}</div><div style={styles.statLabel}>药盒种类</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{urgentCount}</div><div style={styles.statLabel}>紧急采购</div></div>
        <div style={styles.statCard}><TrendingUp size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>{lowCount}</div><div style={styles.statLabel}>库存不足</div></div>
        <div style={styles.statCard}><Package size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>¥{(totalValue / 10000).toFixed(1)}万</div><div style={styles.statLabel}>待采购金额</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索药盒名称/类型..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {types.slice(0, 5).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: typeFilter === t ? '#1e40af' : '#d1d5db', background: typeFilter === t ? '#1e40af' : '#fff', color: typeFilter === t ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{t}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>药盒名称</th>
              <th style={styles.th}>类型</th>
              <th style={styles.th}>规格</th>
              <th style={styles.th}>当前库存</th>
              <th style={styles.th}>安全库存</th>
              <th style={styles.th}>月消耗</th>
              <th style={styles.th}>有效期</th>
              <th style={styles.th}>供应商</th>
              <th style={styles.th}>单价</th>
              <th style={styles.th}>存储条件</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(k => {
              const stockPercent = Math.min((k.currentStock / k.safetyStock) * 100, 100);
              return (
                <tr key={k.id}>
                  <td style={styles.td}><div style={{ fontWeight: 600, color: '#374151' }}>{k.name}</div></td>
                  <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: '#eff6ff', color: '#1e40af' }}>{k.kitType}</span></td>
                  <td style={styles.td}>{k.packageSpec}</td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 700, color: k.currentStock < k.safetyStock ? '#dc2626' : '#374151' }}>{k.currentStock} {k.unit}</div>
                    <div style={styles.stockBar}>
                      <div style={{ width: `${stockPercent}%`, background: k.currentStock < k.safetyStock ? '#dc2626' : '#1e40af', borderRadius: '4px', height: '6px' }} />
                    </div>
                  </td>
                  <td style={styles.td}>{k.safetyStock} {k.unit}</td>
                  <td style={styles.td}>{k.monthlyUsage} {k.unit}/月</td>
                  <td style={styles.td}><Clock size={12} color="#6b7280" style={{ marginRight: '4px' }} />{k.expireDate}<div style={{ fontSize: '11px', color: '#9ca3af' }}>{k.shelfLife}</div></td>
                  <td style={styles.td}>{k.supplier}</td>
                  <td style={styles.td}>{k.unitPrice > 0 ? `¥${k.unitPrice.toLocaleString()}` : '自制'}</td>
                  <td style={styles.td}>{k.storageCondition}</td>
                  <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, ...statusBadge(k.status) }}>{k.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KitManagePage;
