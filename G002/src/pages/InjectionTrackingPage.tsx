// InjectionTrackingPage.tsx - 注射追踪记录
import React, { useState } from 'react';
import { Syringe, CheckCircle, Clock, User, ShieldCheck, Search, Package, ArrowRight } from 'lucide-react';

interface InjectionRecord {
  id: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  drugBatch: string;
  drugName: string;
  preparedBy: string;
  preparedTime: string;
  injectedBy: string;
  injectedTime: string;
  prescribedDose: number;
  actualDose: number;
  residualVolume: number;
  injectionSite: string;
  extravasation: boolean;
  status: '待注射' | '注射中' | '已完成' | '异常';
  chainSteps: { label: string; time: string; operator: string; status: 'ok' | 'pending' }[];
  notes: string;
}

const mockData: InjectionRecord[] = [
  { id: 'IT001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '全身肿瘤筛查', drugBatch: '18F-20260501-001', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '07:30', injectedBy: '陈护士', injectedTime: '08:05', prescribedDose: 480, actualDose: 476, residualVolume: 0.2, injectionSite: '右肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '07:30', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '07:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '07:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '08:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '08:05', operator: '陈护士', status: 'ok' }], notes: '注射顺利，无不良反应' },
  { id: 'IT002', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, examType: 'PET/CT', examItem: '肺部肿瘤分期', drugBatch: '18F-20260501-001', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '08:00', injectedBy: '陈护士', injectedTime: '08:35', prescribedDose: 385, actualDose: 380, residualVolume: 0.3, injectionSite: '左贵要静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '08:00', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '08:15', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '08:20', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '08:30', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '08:35', operator: '陈护士', status: 'ok' }], notes: '老年患者，注射速度稍慢' },
  { id: 'IT003', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌评估', drugBatch: '18F-20260501-002', drugName: '18F-PSMA', preparedBy: '刘药师', preparedTime: '08:30', injectedBy: '陈护士', injectedTime: '09:05', prescribedDose: 500, actualDose: 498, residualVolume: 0.1, injectionSite: '右股静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '08:30', operator: '刘药师', status: 'ok' }, { label: '冷链运输', time: '08:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '08:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '09:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '09:05', operator: '陈护士', status: 'ok' }], notes: 'PSMA专用示踪剂，注意辐射防护' },
  { id: 'IT004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤疗效评估', drugBatch: '18F-20260502-001', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '09:30', injectedBy: '陈护士', injectedTime: '10:35', prescribedDose: 555, actualDose: 550, residualVolume: 0.2, injectionSite: '左肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '09:30', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '09:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '09:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '10:30', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '10:35', operator: '陈护士', status: 'ok' }], notes: '淋巴瘤复查，剂量充足' },
  { id: 'IT005', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'SPECT', examItem: '心肌灌注显像', drugBatch: '99mTc-20260502-001', drugName: '99mTc-MIBI', preparedBy: '王药师', preparedTime: '09:30', injectedBy: '陈护士', injectedTime: '10:05', prescribedDose: 800, actualDose: 795, residualVolume: 0.5, injectionSite: '右肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物标记', time: '09:30', operator: '王药师', status: 'ok' }, { label: '质量控制', time: '09:45', operator: '王药师', status: 'ok' }, { label: '药房入库', time: '09:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '10:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '10:05', operator: '陈护士', status: 'ok' }], notes: '心肌显像，MIBI药盒新鲜配制' },
  { id: 'IT006', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '癫痫灶定位', drugBatch: '18F-20260502-002', drugName: '18F-FDG', preparedBy: '刘药师', preparedTime: '11:30', injectedBy: '陈护士', injectedTime: '12:35', prescribedDose: 360, actualDose: 355, residualVolume: 0.3, injectionSite: '左贵要静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '11:30', operator: '刘药师', status: 'ok' }, { label: '冷链运输', time: '11:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '11:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '12:30', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '12:35', operator: '陈护士', status: 'ok' }], notes: '午后检查，等待时间充足' },
  { id: 'IT007', patientId: 'P010', patientName: '郑晓燕', gender: '女', age: 39, examType: 'SPECT', examItem: '肾动态显像', drugBatch: '99mTc-20260503-001', drugName: '99mTc-DTPA', preparedBy: '王药师', preparedTime: '08:30', injectedBy: '陈护士', injectedTime: '09:05', prescribedDose: 660, actualDose: 655, residualVolume: 0.4, injectionSite: '右足背静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物标记', time: '08:30', operator: '王药师', status: 'ok' }, { label: '质量控制', time: '08:45', operator: '王药师', status: 'ok' }, { label: '药房入库', time: '08:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '09:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '09:05', operator: '陈护士', status: 'ok' }], notes: '肾动态显像，注意注射速度' },
  { id: 'IT008', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, examType: 'PET/CT', examItem: '阿尔茨海默病评估', drugBatch: '18F-20260503-001', drugName: '18F-AV45', preparedBy: '刘药师', preparedTime: '09:00', injectedBy: '陈护士', injectedTime: '09:35', prescribedDose: 450, actualDose: 445, residualVolume: 0.2, injectionSite: '左肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '09:00', operator: '刘药师', status: 'ok' }, { label: '冷链运输', time: '09:15', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '09:20', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '09:30', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '09:35', operator: '陈护士', status: 'ok' }], notes: 'AV45 amyloid示踪剂，认知评估专用' },
  { id: 'IT009', patientId: 'P013', patientName: '马建军', gender: '男', age: 45, examType: 'PET/CT', examItem: '结直肠癌术后复查', drugBatch: '18F-20260504-001', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '07:30', injectedBy: '陈护士', injectedTime: '08:05', prescribedDose: 520, actualDose: 515, residualVolume: 0.3, injectionSite: '右肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '07:30', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '07:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '07:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '08:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '08:05', operator: '陈护士', status: 'ok' }], notes: '早高峰后首例，药物新鲜' },
  { id: 'IT010', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, examType: 'PET/CT', examItem: '胰腺癌分期', drugBatch: '18F-20260504-002', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '08:30', injectedBy: '陈护士', injectedTime: '09:05', prescribedDose: 415, actualDose: 410, residualVolume: 0.2, injectionSite: '左贵要静脉', extravasation: true, status: '异常', chainSteps: [{ label: '药物制备', time: '08:30', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '08:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '08:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '09:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '09:05', operator: '陈护士', status: 'ok' }], notes: '发现轻度外渗，已重新注射' },
  { id: 'IT011', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, examType: 'PET/CT', examItem: '食管癌术后评估', drugBatch: '18F-20260505-001', drugName: '18F-FDG', preparedBy: '刘药师', preparedTime: '07:30', injectedBy: '陈护士', injectedTime: '08:05', prescribedDose: 485, actualDose: 480, residualVolume: 0.2, injectionSite: '右肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '07:30', operator: '刘药师', status: 'ok' }, { label: '冷链运输', time: '07:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '07:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '08:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '08:05', operator: '陈护士', status: 'ok' }], notes: '食管癌术后，吞咽困难注意' },
  { id: 'IT012', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, examType: 'PET/CT', examItem: '甲状腺癌碘治疗后评估', drugBatch: '18F-20260505-002', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '09:30', injectedBy: '陈护士', injectedTime: '10:05', prescribedDose: 540, actualDose: 535, residualVolume: 0.3, injectionSite: '左肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '09:30', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '09:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '09:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '10:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '10:05', operator: '陈护士', status: 'ok' }], notes: '甲癌碘治疗后，TG升高待查' },
  { id: 'IT013', patientId: 'P021', patientName: '周明', gender: '男', age: 49, examType: 'SPECT', examItem: '心肌灌注显像', drugBatch: '99mTc-20260506-001', drugName: '99mTc-MIBI', preparedBy: '王药师', preparedTime: '08:00', injectedBy: '陈护士', injectedTime: '08:35', prescribedDose: 1140, actualDose: 1135, residualVolume: 0.5, injectionSite: '右贵要静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物标记', time: '08:00', operator: '王药师', status: 'ok' }, { label: '质量控制', time: '08:15', operator: '王药师', status: 'ok' }, { label: '药房入库', time: '08:20', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '08:30', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '08:35', operator: '陈护士', status: 'ok' }], notes: '负荷心肌灌注，隔日 rest 显像' },
  { id: 'IT014', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, examType: 'PET/CT', examItem: '宫颈癌分期', drugBatch: '18F-20260506-001', drugName: '18F-FDG', preparedBy: '刘药师', preparedTime: '08:30', injectedBy: '陈护士', injectedTime: '09:05', prescribedDose: 345, actualDose: 340, residualVolume: 0.2, injectionSite: '左足背静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '08:30', operator: '刘药师', status: 'ok' }, { label: '冷链运输', time: '08:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '08:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '09:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '09:05', operator: '陈护士', status: 'ok' }], notes: '年轻女性，剂量按体重偏低' },
  { id: 'IT015', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, examType: 'PET/CT', examItem: '胃癌术前分期', drugBatch: '18F-20260507-001', drugName: '18F-FDG', preparedBy: '张药师', preparedTime: '07:30', injectedBy: '陈护士', injectedTime: '08:05', prescribedDose: 525, actualDose: 520, residualVolume: 0.3, injectionSite: '右肘正中静脉', extravasation: false, status: '已完成', chainSteps: [{ label: '药物制备', time: '07:30', operator: '张药师', status: 'ok' }, { label: '冷链运输', time: '07:45', operator: '王配送', status: 'ok' }, { label: '药房入库', time: '07:50', operator: '李药师', status: 'ok' }, { label: '护士接收', time: '08:00', operator: '陈护士', status: 'ok' }, { label: '注射完成', time: '08:05', operator: '陈护士', status: 'ok' }], notes: '胃癌术前，评估淋巴结转移' },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  filterRow: { display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' as const },
  searchInput: { flex: '1 1 240px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 },
  badgeGreen: { background: '#d1fae5', color: '#047857' },
  badgeYellow: { background: '#fef3c7', color: '#b45309' },
  badgeBlue: { background: '#dbeafe', color: '#1e40af' },
  badgeRed: { background: '#fee2e2', color: '#dc2626' },
  chainCard: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', marginTop: '12px' },
  chainTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' },
  chainSteps: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' as const },
  chainStep: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', minWidth: '80px' },
  chainStepOk: { background: '#d1fae5', borderColor: '#047857' },
  chainArrow: { color: '#9ca3af' },
};

const InjectionTrackingPage: React.FC = () => {
  const [records] = useState<InjectionRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = records.filter(r => r.patientName.includes(search) || r.patientId.includes(search));
  const completedCount = records.filter(r => r.status === '已完成').length;
  const extravasationCount = records.filter(r => r.extravasation).length;

  const getStatusBadge = (status: string) => {
    if (status === '已完成') return <span style={{ ...styles.badge, ...styles.badgeGreen }}>已完成</span>;
    if (status === '注射中') return <span style={{ ...styles.badge, ...styles.badgeYellow }}>注射中</span>;
    if (status === '异常') return <span style={{ ...styles.badge, ...styles.badgeRed }}>异常</span>;
    return <span style={{ ...styles.badge, ...styles.badgeBlue }}>待注射</span>;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>注射追踪记录</h2>
        <p style={styles.subtitle}>核素药物注射全流程追溯链管理</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Syringe size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>总记录</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={styles.statValue}>{completedCount}</div><div style={styles.statLabel}>已完成</div></div>
        <div style={styles.statCard}><ShieldCheck size={16} style={{ color: '#3b82f6', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length - extravasationCount}</div><div style={styles.statLabel}>正常注射</div></div>
        <div style={styles.statCard}><User size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={styles.statValue}>{extravasationCount}</div><div style={styles.statLabel}>外渗异常</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>药物批次</th>
              <th style={styles.th}>调配者</th>
              <th style={styles.th}>注射者</th>
              <th style={styles.th}>处方剂量</th>
              <th style={styles.th}>实际剂量</th>
              <th style={styles.th}>残余量</th>
              <th style={styles.th}>状态</th>
              <th style={styles.th}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <React.Fragment key={r.id}>
                <tr>
                  <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div></td>
                  <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examType}</div></td>
                  <td style={styles.td}><Package size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.drugBatch}</td>
                  <td style={styles.td}>{r.preparedBy}<div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.preparedTime}</div></td>
                  <td style={styles.td}>{r.injectedBy}<div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.injectedTime}</div></td>
                  <td style={{ ...styles.td, color: '#1e40af', fontWeight: 600 }}>{r.prescribedDose} MBq</td>
                  <td style={styles.td}>{r.actualDose} MBq</td>
                  <td style={styles.td}>{r.residualVolume} ml</td>
                  <td style={styles.td}>{getStatusBadge(r.status)}</td>
                  <td style={styles.td}><button onClick={() => setExpandedId(expandedId === r.id ? null : r.id)} style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>{expandedId === r.id ? '收起' : '追溯'}</button></td>
                </tr>
                {expandedId === r.id && (
                  <tr>
                    <td colSpan={10} style={{ background: '#f9fafb', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#6b7280' }}>
                        <Clock size={14} />追溯链：{r.patientName} - {r.drugName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {r.chainSteps.map((step, i) => (
                          <React.Fragment key={i}>
                            <div style={{ ...styles.chainStep, ...(step.status === 'ok' ? styles.chainStepOk : {}) }}>
                              <CheckCircle size={14} color={step.status === 'ok' ? '#047857' : '#9ca3af'} />
                              <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>{step.label}</span>
                              <span style={{ fontSize: '10px', color: '#6b7280' }}>{step.time}</span>
                              <span style={{ fontSize: '10px', color: '#9ca3af' }}>{step.operator}</span>
                            </div>
                            {i < r.chainSteps.length - 1 && <ArrowRight size={16} style={styles.chainArrow} />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '12px', color: r.extravasation ? '#dc2626' : '#6b7280' }}>
                        {r.extravasation ? '⚠️ 发现外渗，已处理' : '✓ 无外渗'} | 注射部位：{r.injectionSite} | {r.notes}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InjectionTrackingPage;
