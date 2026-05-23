// ReagentQCPage.tsx - 试剂盒/放射性试剂QC
import React, { useState } from 'react';
import { Activity, CheckCircle, AlertTriangle, Clock, Search, FileText, TrendingUp } from 'lucide-react';

interface ReagentQC {
  id: string;
  reagentName: string;
  batchNo: string;
  kitType: string;
  testDate: string;
  testType: string;
  operator: string;
  result: '合格' | '不合格' | '待定';
  radiochemicalPurity: number;
  chemicalPurity: number;
  pH: number;
  sterility: '通过' | '未通过' | '待检';
  endotoxin: number;
  reference: string;
  expirationDate: string;
  notes: string;
}

const mockData: ReagentQC[] = [
  { id: 'RQC001', reagentName: '18F-FDG注射液', batchNo: '18F-20260507-01', kitType: '正电子药物', testDate: '2026-05-07', testType: '放化纯度', operator: '张药师', result: '合格', radiochemicalPurity: 98.5, chemicalPurity: 99.2, pH: 7.2, sterility: '通过', endotoxin: 0.05, reference: '≥95%', expirationDate: '2026-05-07', notes: '合格，允许发放' },
  { id: 'RQC002', reagentName: '18F-FDG注射液', batchNo: '18F-20260507-02', kitType: '正电子药物', testDate: '2026-05-07', testType: '放化纯度', operator: '张药师', result: '合格', radiochemicalPurity: 98.2, chemicalPurity: 99.0, pH: 7.1, sterility: '通过', endotoxin: 0.04, reference: '≥95%', expirationDate: '2026-05-07', notes: '合格，允许发放' },
  { id: 'RQC003', reagentName: '99mTc-MIBI注射液', batchNo: '99mTc-MIBI-20260506', kitType: 'SPECT药物', testDate: '2026-05-06', testType: '标记率', operator: '王药师', result: '合格', radiochemicalPurity: 97.8, chemicalPurity: 98.5, pH: 5.8, sterility: '通过', endotoxin: 0.08, reference: '≥95%', expirationDate: '2026-05-06', notes: '合格，新鲜配制' },
  { id: 'RQC004', reagentName: '99mTc-DTPA注射液', batchNo: '99mTc-DTPA-20260506', kitType: 'SPECT药物', testDate: '2026-05-06', testType: '标记率', operator: '王药师', result: '合格', radiochemicalPurity: 98.1, chemicalPurity: 99.1, pH: 6.2, sterility: '通过', endotoxin: 0.03, reference: '≥95%', expirationDate: '2026-05-06', notes: '合格，肾动态显像用' },
  { id: 'RQC005', reagentName: '99mTc-MDP注射液', batchNo: '99mTc-MDP-20260506', kitType: 'SPECT药物', testDate: '2026-05-06', testType: '标记率', operator: '王药师', result: '合格', radiochemicalPurity: 97.5, chemicalPurity: 98.8, pH: 5.5, sterility: '通过', endotoxin: 0.06, reference: '≥95%', expirationDate: '2026-05-06', notes: '合格，骨显像用' },
  { id: 'RQC006', reagentName: '18F-PSMA注射液', batchNo: '18F-PSMA-20260507-01', kitType: '正电子药物', testDate: '2026-05-07', testType: '放化纯度', operator: '刘药师', result: '合格', radiochemicalPurity: 96.8, chemicalPurity: 97.5, pH: 7.0, sterility: '通过', endotoxin: 0.12, reference: '≥95%', expirationDate: '2026-05-07', notes: '合格，PSMA PET用' },
  { id: 'RQC007', reagentName: '18F-AV45注射液', batchNo: '18F-AV45-20260506-01', kitType: '正电子药物', testDate: '2026-05-06', testType: '放化纯度', operator: '刘药师', result: '合格', radiochemicalPurity: 96.2, chemicalPurity: 97.0, pH: 7.3, sterility: '通过', endotoxin: 0.09, reference: '≥95%', expirationDate: '2026-05-06', notes: '合格，AV45 amyloid显像' },
  { id: 'RQC008', reagentName: '99mTc-ECD注射液', batchNo: '99mTc-ECD-20260505', kitType: 'SPECT药物', testDate: '2026-05-05', testType: '标记率', operator: '王药师', result: '合格', radiochemicalPurity: 96.5, chemicalPurity: 97.8, pH: 6.8, sterility: '通过', endotoxin: 0.07, reference: '≥95%', expirationDate: '2026-05-05', notes: '合格，脑血流显像' },
  { id: 'RQC009', reagentName: '18F-FLT注射液', batchNo: '18F-FLT-20260505-01', kitType: '正电子药物', testDate: '2026-05-05', testType: '放化纯度', operator: '张药师', result: '合格', radiochemicalPurity: 95.8, chemicalPurity: 96.5, pH: 7.1, sterility: '通过', endotoxin: 0.10, reference: '≥95%', expirationDate: '2026-05-05', notes: '合格，细胞增殖显像' },
  { id: 'RQC010', reagentName: '99mTcO4-高锝酸钠', batchNo: '99mTcO4-20260507-01', kitType: 'SPECT药物', testDate: '2026-05-07', testType: '放化纯度', operator: '王药师', result: '合格', radiochemicalPurity: 99.5, chemicalPurity: 99.8, pH: 6.0, sterility: '通过', endotoxin: 0.02, reference: '≥99%', expirationDate: '2026-05-07', notes: '合格，发生器淋洗液' },
  { id: 'RQC011', reagentName: '11C-胆碱注射液', batchNo: '11C-Choline-20260507-01', kitType: '正电子药物', testDate: '2026-05-07', testType: '放化纯度', operator: '刘药师', result: '合格', radiochemicalPurity: 97.5, chemicalPurity: 98.2, pH: 7.4, sterility: '通过', endotoxin: 0.06, reference: '≥95%', expirationDate: '2026-05-07', notes: '合格，前列腺癌/肝癌用' },
  { id: 'RQC012', reagentName: '99mTc-DMSA注射液', batchNo: '99mTc-DMSA-20260504', kitType: 'SPECT药物', testDate: '2026-05-04', testType: '标记率', operator: '王药师', result: '合格', radiochemicalPurity: 96.0, chemicalPurity: 97.2, pH: 5.9, sterility: '通过', endotoxin: 0.05, reference: '≥95%', expirationDate: '2026-05-04', notes: '合格，肾静态显像' },
  { id: 'RQC013', reagentName: '18F-FDG注射液', batchNo: '18F-20260506-01', kitType: '正电子药物', testDate: '2026-05-06', testType: '放化纯度', operator: '张药师', result: '不合格', radiochemicalPurity: 91.2, chemicalPurity: 94.5, pH: 6.8, sterility: '待检', endotoxin: 0.35, reference: '≥95%', expirationDate: '2026-05-06', notes: '⚠️ 放化纯度不达标，已销毁，不得使用' },
  { id: 'RQC014', reagentName: '99mTc-MIBI注射液', batchNo: '99mTc-MIBI-20260503', kitType: 'SPECT药物', testDate: '2026-05-03', testType: '标记率', operator: '王药师', result: '合格', radiochemicalPurity: 97.2, chemicalPurity: 98.0, pH: 5.6, sterility: '通过', endotoxin: 0.09, reference: '≥95%', expirationDate: '2026-05-03', notes: '合格' },
  { id: 'RQC015', reagentName: '68Ga-PSMA注射液', batchNo: '68Ga-PSMA-20260507-01', kitType: '正电子药物', testDate: '2026-05-07', testType: '放化纯度', operator: '刘药师', result: '合格', radiochemicalPurity: 97.8, chemicalPurity: 98.5, pH: 7.0, sterility: '通过', endotoxin: 0.08, reference: '≥95%', expirationDate: '2026-05-07', notes: '合格，前列腺癌PSMA PET用' },
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
};

const resultBadge = (r: string) => {
  if (r === '合格') return { background: '#d1fae5', color: '#047857' };
  if (r === '不合格') return { background: '#fee2e2', color: '#dc2626' };
  return { background: '#fef3c7', color: '#b45309' };
};

const ReagentQCPage: React.FC = () => {
  const [records] = useState<ReagentQC[]>(mockData);
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState('全部');

  const filtered = records.filter(r => {
    const matchSearch = r.reagentName.includes(search) || r.batchNo.includes(search);
    const matchResult = resultFilter === '全部' || r.result === resultFilter;
    return matchSearch && matchResult;
  });

  const passCount = records.filter(r => r.result === '合格').length;
  const failCount = records.filter(r => r.result === '不合格').length;
  const avgPurity = (records.filter(r => r.result === '合格').reduce((s, r) => s + r.radiochemicalPurity, 0) / Math.max(passCount, 1)).toFixed(1);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>放射性试剂质量控制</h2>
        <p style={styles.subtitle}>放化纯度检测 · 标记率测试 · 无菌/内毒素检测记录</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Activity size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>QC记录</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{passCount}</div><div style={styles.statLabel}>合格</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{failCount}</div><div style={styles.statLabel}>不合格</div></div>
        <div style={styles.statCard}><TrendingUp size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{avgPurity}%</div><div style={styles.statLabel}>平均放化纯度</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索试剂名称/批次号..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '合格', '不合格', '待定'].map(r => (
          <button key={r} onClick={() => setResultFilter(r)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: resultFilter === r ? '#1e40af' : '#d1d5db', background: resultFilter === r ? '#1e40af' : '#fff', color: resultFilter === r ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{r}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>试剂名称</th>
              <th style={styles.th}>批次号</th>
              <th style={styles.th}>检测类型</th>
              <th style={styles.th}>检测日期</th>
              <th style={styles.th}>操作者</th>
              <th style={styles.th}>放化纯度</th>
              <th style={styles.th}>化学纯度</th>
              <th style={styles.th}>pH</th>
              <th style={styles.th}>无菌</th>
              <th style={styles.th}>内毒素</th>
              <th style={styles.th}>参考值</th>
              <th style={styles.th}>有效期</th>
              <th style={styles.th}>结果</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 600, color: '#374151' }}>{r.reagentName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.kitType}</div></td>
                <td style={styles.td}><div style={{ fontSize: '11px', fontFamily: 'monospace' }}>{r.batchNo}</div></td>
                <td style={styles.td}>{r.testType}</td>
                <td style={styles.td}>{r.testDate}</td>
                <td style={styles.td}>{r.operator}</td>
                <td style={{ ...styles.td, fontWeight: 600, color: r.radiochemicalPurity >= 95 ? '#047857' : '#dc2626' }}>{r.radiochemicalPurity}%</td>
                <td style={styles.td}>{r.chemicalPurity}%</td>
                <td style={styles.td}>{r.pH}</td>
                <td style={styles.td}><span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: r.sterility === '通过' ? '#d1fae5' : r.sterility === '未通过' ? '#fee2e2' : '#fef3c7', color: r.sterility === '通过' ? '#047857' : r.sterility === '未通过' ? '#dc2626' : '#b45309' }}>{r.sterility}</span></td>
                <td style={{ ...styles.td, color: r.endotoxin > 0.2 ? '#dc2626' : '#374151' }}>{r.endotoxin} EU/ml</td>
                <td style={styles.td}>{r.reference}</td>
                <td style={styles.td}><Clock size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.expirationDate}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, ...resultBadge(r.result) }}>{r.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReagentQCPage;
