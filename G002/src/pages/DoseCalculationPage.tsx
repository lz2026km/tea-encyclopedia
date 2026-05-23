// DoseCalculationPage.tsx - 个体剂量计算
import React, { useState } from 'react';
import { Calculator, Clock, Activity, AlertCircle, User, Search } from 'lucide-react';

interface DoseRecord {
  id: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  bmi: number;
  bloodSugar: number;
  radiopharmaceutical: string;
  calculatedDose: number;
  actualDose: number;
  injectionTime: string;
  halfLifeCorrected: number;
  unit: string;
  status: '待注射' | '已注射' | '已完成';
  notes: string;
}

const mockData: DoseRecord[] = [
  { id: 'DC001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, weight: 68, height: 170, bmi: 23.5, bloodSugar: 5.2, radiopharmaceutical: '18F-FDG', calculatedDose: 476, actualDose: 480, injectionTime: '08:05', halfLifeCorrected: 465, unit: 'MBq', status: '已完成', notes: '血糖正常' },
  { id: 'DC002', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, weight: 55, height: 158, bmi: 22.0, bloodSugar: 5.8, radiopharmaceutical: '18F-FDG', calculatedDose: 385, actualDose: 380, injectionTime: '08:35', halfLifeCorrected: 372, unit: 'MBq', status: '已完成', notes: '血糖略高' },
  { id: 'DC003', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, weight: 72, height: 168, bmi: 25.5, bloodSugar: 6.1, radiopharmaceutical: '18F-PSMA', calculatedDose: 504, actualDose: 500, injectionTime: '09:05', halfLifeCorrected: 488, unit: 'MBq', status: '已完成', notes: '前列腺癌特异性示踪剂' },
  { id: 'DC004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, weight: 80, height: 175, bmi: 26.1, bloodSugar: 5.5, radiopharmaceutical: '18F-FDG', calculatedDose: 560, actualDose: 555, injectionTime: '10:35', halfLifeCorrected: 542, unit: 'MBq', status: '已完成', notes: '淋巴瘤疗效评估' },
  { id: 'DC005', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, weight: 58, height: 162, bmi: 22.1, bloodSugar: 5.3, radiopharmaceutical: '99mTc-MIBI', calculatedDose: 812, actualDose: 800, injectionTime: '10:05', halfLifeCorrected: 780, unit: 'MBq', status: '已完成', notes: '心肌灌注显像' },
  { id: 'DC006', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, weight: 52, height: 160, bmi: 20.3, bloodSugar: 4.9, radiopharmaceutical: '18F-FDG', calculatedDose: 364, actualDose: 360, injectionTime: '12:35', halfLifeCorrected: 350, unit: 'MBq', status: '已完成', notes: '癫痫灶定位' },
  { id: 'DC007', patientId: 'P010', patientName: '郑晓燕', gender: '女', age: 39, weight: 48, height: 155, bmi: 20.0, bloodSugar: 5.1, radiopharmaceutical: '99mTc-DTPA', calculatedDose: 672, actualDose: 660, injectionTime: '09:05', halfLifeCorrected: 645, unit: 'MBq', status: '已完成', notes: '肾动态显像' },
  { id: 'DC008', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, weight: 65, height: 165, bmi: 23.9, bloodSugar: 5.6, radiopharmaceutical: '18F-AV45', calculatedDose: 455, actualDose: 450, injectionTime: '09:35', halfLifeCorrected: 440, unit: 'MBq', status: '已完成', notes: '阿尔茨海默病评估' },
  { id: 'DC009', patientId: 'P013', patientName: '马建军', gender: '男', age: 45, weight: 75, height: 172, bmi: 25.4, bloodSugar: 5.4, radiopharmaceutical: '18F-FDG', calculatedDose: 525, actualDose: 520, injectionTime: '08:05', halfLifeCorrected: 505, unit: 'MBq', status: '已完成', notes: '结直肠癌术后复查' },
  { id: 'DC010', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, weight: 60, height: 158, bmi: 24.0, bloodSugar: 5.9, radiopharmaceutical: '18F-FDG', calculatedDose: 420, actualDose: 415, injectionTime: '09:05', halfLifeCorrected: 407, unit: 'MBq', status: '已完成', notes: '胰腺癌分期，血糖偏高注意' },
  { id: 'DC011', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, weight: 70, height: 168, bmi: 24.8, bloodSugar: 5.7, radiopharmaceutical: '18F-FDG', calculatedDose: 490, actualDose: 485, injectionTime: '08:05', halfLifeCorrected: 471, unit: 'MBq', status: '已完成', notes: '食管癌术后评估' },
  { id: 'DC012', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, weight: 78, height: 170, bmi: 27.0, bloodSugar: 5.3, radiopharmaceutical: '18F-FDG', calculatedDose: 546, actualDose: 540, injectionTime: '10:05', halfLifeCorrected: 528, unit: 'MBq', status: '已完成', notes: '甲状腺癌碘治疗后评估' },
  { id: 'DC013', patientId: 'P021', patientName: '周明', gender: '男', age: 49, weight: 82, height: 178, bmi: 25.9, bloodSugar: 5.5, radiopharmaceutical: '99mTc-MIBI', calculatedDose: 1148, actualDose: 1140, injectionTime: '08:35', halfLifeCorrected: 1095, unit: 'MBq', status: '已完成', notes: '心肌灌注显像' },
  { id: 'DC014', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, weight: 50, height: 162, bmi: 19.1, bloodSugar: 4.8, radiopharmaceutical: '18F-FDG', calculatedDose: 350, actualDose: 345, injectionTime: '09:05', halfLifeCorrected: 338, unit: 'MBq', status: '已完成', notes: '宫颈癌分期' },
  { id: 'DC015', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, weight: 76, height: 172, bmi: 25.7, bloodSugar: 6.3, radiopharmaceutical: '18F-FDG', calculatedDose: 532, actualDose: 525, injectionTime: '08:05', halfLifeCorrected: 515, unit: 'MBq', status: '已完成', notes: '胃癌术前分期，血糖偏高' },
];

const HALF_LIFE_18F = 109.8; // minutes
const DOSE_PER_KG_18F = 7; // MBq/kg

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  calcCard: { background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #e5e7eb', marginBottom: '20px' },
  calcTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
  calcRow: { display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' as const },
  calcInput: { flex: '1 1 200px', display: 'flex', flexDirection: 'column' as const, gap: '4px' },
  calcLabel: { fontSize: '12px', color: '#6b7280' },
  calcField: { padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' },
  calcResult: { background: '#eff6ff', border: '2px solid #1e40af', borderRadius: '8px', padding: '16px', marginTop: '12px' },
  calcResultValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  calcResultUnit: { fontSize: '14px', color: '#6b7280', marginLeft: '8px' },
  calcFormula: { fontSize: '12px', color: '#9ca3af', marginTop: '8px' },
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
  warning: { background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' },
};

const DoseCalculationPage: React.FC = () => {
  const [records] = useState<DoseRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [calcWeight, setCalcWeight] = useState(70);
  const [calcTime, setCalcTime] = useState(60);

  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.patientId.includes(search);
    const matchStatus = statusFilter === '全部' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const completedCount = records.filter(r => r.status === '已完成').length;
  const injectedCount = records.filter(r => r.status === '已注射').length;
  const pendingCount = records.filter(r => r.status === '待注射').length;

  // Dose calculation: MBq = weight(kg) × 7
  const calculatedDose = Math.round(calcWeight * DOSE_PER_KG_18F);
  // Half-life correction: remaining activity after time (minutes)
  const remainingFraction = Math.pow(0.5, calcTime / HALF_LIFE_18F);
  const correctedDose = Math.round(calculatedDose * remainingFraction);

  const getStatusBadge = (status: string) => {
    if (status === '已完成') return <span style={{ ...styles.badge, ...styles.badgeGreen }}>已完成</span>;
    if (status === '已注射') return <span style={{ ...styles.badge, ...styles.badgeYellow }}>已注射</span>;
    return <span style={{ ...styles.badge, ...styles.badgeBlue }}>待注射</span>;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>个体剂量计算</h2>
        <p style={styles.subtitle}>18F-FDG 按体重计算注射剂量，半衰期自动修正</p>
      </div>

      {/* Calculator */}
      <div style={styles.calcCard}>
        <div style={styles.calcTitle}>
          <Calculator size={16} color="#1e40af" />
          快速剂量计算器
        </div>
        <div style={styles.calcRow}>
          <div style={styles.calcInput}>
            <span style={styles.calcLabel}>患者体重 (kg)</span>
            <input type="number" value={calcWeight} onChange={e => setCalcWeight(Number(e.target.value))} style={styles.calcField} />
          </div>
          <div style={styles.calcInput}>
            <span style={styles.calcLabel}>注射前等待时间 (分钟)</span>
            <input type="number" value={calcTime} onChange={e => setCalcTime(Number(e.target.value))} style={styles.calcField} />
          </div>
        </div>
        <div style={styles.calcResult}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={styles.calcResultValue}>{calculatedDose}</span>
            <span style={styles.calcResultUnit}>MBq</span>
            <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '16px' }}>等待{calcTime}分钟后实际注射量</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1e40af', marginLeft: '8px' }}>{correctedDose}</span>
            <span style={styles.calcResultUnit}>MBq</span>
          </div>
          <div style={styles.calcFormula}>
            公式: 剂量(MBq) = 体重(kg) × 7 | 18F半衰期: {HALF_LIFE_18F}分钟 | 衰减因子: {remainingFraction.toFixed(3)}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#1e40af' }}><User size={16} /></div>
          <div style={styles.statValue}>{records.length}</div>
          <div style={styles.statLabel}>总记录</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#047857' }}><Activity size={16} /></div>
          <div style={styles.statValue}>{completedCount}</div>
          <div style={styles.statLabel}>已完成</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#b45309' }}><Clock size={16} /></div>
          <div style={styles.statValue}>{injectedCount}</div>
          <div style={styles.statLabel}>已注射</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#3b82f6' }}><AlertCircle size={16} /></div>
          <div style={styles.statValue}>{pendingCount}</div>
          <div style={styles.statLabel}>待注射</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者姓名/ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '待注射', '已注射', '已完成'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: statusFilter === s ? '#1e40af' : '#d1d5db', background: statusFilter === s ? '#1e40af' : '#fff', color: statusFilter === s ? '#fff' : '#374151', cursor: 'pointer', fontSize: '13px' }}>{s}</button>
        ))}
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>体重</th>
              <th style={styles.th}>示踪剂</th>
              <th style={styles.th}>计算剂量</th>
              <th style={styles.th}>实际注射</th>
              <th style={styles.th}>注射时间</th>
              <th style={styles.th}>半衰期修正</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div></td>
                <td style={styles.td}>{r.weight}kg</td>
                <td style={styles.td}>{r.radiopharmaceutical}</td>
                <td style={{ ...styles.td, color: '#1e40af', fontWeight: 600 }}>{r.calculatedDose} MBq</td>
                <td style={styles.td}>{r.actualDose} MBq</td>
                <td style={styles.td}>{r.injectionTime}</td>
                <td style={styles.td}>{r.halfLifeCorrected} MBq</td>
                <td style={styles.td}>{getStatusBadge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoseCalculationPage;
