// RejectManagePage.tsx - 废片管理与图像质量追踪
import React, { useState } from 'react';
import { XCircle, AlertTriangle, Image, FileText, Search, CheckCircle, Clock, User } from 'lucide-react';

interface RejectRecord {
  id: string;
  accessionNo: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  examDate: string;
  device: string;
  doctor: string;
  rejectReason: '运动伪影' | '呼吸伪影' | '金属伪影' | '注射外渗' | '射线硬化' | '患者移动' | '设备故障' | '参数设置错误' | '定位错误';
  severity: '轻度' | '中度' | '重度';
  imageCount: number;
  seriesCount: number;
  retakeDate: string;
  retakeSeries: number;
  retakeDoctor: string;
  diagnosticImpact: '无影响' | '部分受限' | '无法诊断';
  costImpact: number;
  status: '已重拍' | '未处理' | '无法重拍';
  notes: string;
}

const mockData: RejectRecord[] = [
  { id: 'RJ001', accessionNo: 'PET20260502005', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤疗效评估', examDate: '2026-05-02', device: 'PET/CT-01', doctor: '张明华', rejectReason: '患者移动', severity: '中度', imageCount: 280, seriesCount: 2, retakeDate: '2026-05-02', retakeSeries: 2, retakeDoctor: '李技师', diagnosticImpact: '部分受限', costImpact: 450, status: '已重拍', notes: '患者无法保持体位10分钟' },
  { id: 'RJ002', accessionNo: 'PET20260502006', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'PET/CT', examItem: '肿瘤标志物升高查因', examDate: '2026-05-02', device: 'PET/CT-02', doctor: '李晓东', rejectReason: '注射外渗', severity: '重度', imageCount: 450, seriesCount: 4, retakeDate: '2026-05-03', retakeSeries: 4, retakeDoctor: '陈护士', diagnosticImpact: '无法诊断', costImpact: 1200, status: '已重拍', notes: '左手背外渗，SUV定量严重失真' },
  { id: 'RJ003', accessionNo: 'PET20260503001', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '癫痫灶定位', examDate: '2026-05-03', device: 'PET/CT-01', doctor: '李晓东', rejectReason: '呼吸伪影', severity: '轻度', imageCount: 180, seriesCount: 1, retakeDate: '2026-05-03', retakeSeries: 1, retakeDoctor: '王技师', diagnosticImpact: '无影响', costImpact: 280, status: '已重拍', notes: '下肺野外带轻度呼吸伪影' },
  { id: 'RJ004', accessionNo: 'NM20260503001', patientId: 'P015', patientName: '王磊', gender: '男', age: 52, examType: 'SPECT', examItem: '肺通气显像', examDate: '2026-05-04', device: 'SPECT-01', doctor: '王丽华', rejectReason: '患者移动', severity: '中度', imageCount: 160, seriesCount: 2, retakeDate: '2026-05-04', retakeSeries: 2, retakeDoctor: '张技师', diagnosticImpact: '部分受限', costImpact: 320, status: '已重拍', notes: '通气显像时患者说话移动' },
  { id: 'RJ005', accessionNo: 'PET20260503002', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, examType: 'PET/CT', examItem: '阿尔茨海默病评估', examDate: '2026-05-03', device: 'PET/CT-01', doctor: '李晓东', rejectReason: '金属伪影', severity: '中度', imageCount: 220, seriesCount: 2, retakeDate: '2026-05-03', retakeSeries: 2, retakeDoctor: '李技师', diagnosticImpact: '部分受限', costImpact: 380, status: '已重拍', notes: '牙套金属伪影，小脑定量受限' },
  { id: 'RJ006', accessionNo: 'NM20260503002', patientId: 'P018', patientName: '赵雅琴', gender: '女', age: 61, examType: 'SPECT', examItem: '肝胆动态显像', examDate: '2026-05-05', device: 'SPECT-01', doctor: '王丽华', rejectReason: '射线硬化', severity: '轻度', imageCount: 120, seriesCount: 1, retakeDate: '2026-05-05', retakeSeries: 1, retakeDoctor: '张技师', diagnosticImpact: '无影响', costImpact: 180, status: '已重拍', notes: '肝区射线硬化伪影' },
  { id: 'RJ007', accessionNo: 'PET20260503003', patientId: 'P013', patientName: '马建军', gender: '男', age: 45, examType: 'PET/CT', examItem: '结直肠癌术后复查', examDate: '2026-05-04', device: 'PET/CT-02', doctor: '张明华', rejectReason: '呼吸伪影', severity: '轻度', imageCount: 150, seriesCount: 1, retakeDate: '2026-05-04', retakeSeries: 1, retakeDoctor: '王技师', diagnosticImpact: '无影响', costImpact: 250, status: '已重拍', notes: '腹部呼吸运动轻度伪影' },
  { id: 'RJ008', accessionNo: 'NM20260505001', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'NM', examItem: '淋巴瘤复查', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', rejectReason: '设备故障', severity: '重度', imageCount: 0, seriesCount: 0, retakeDate: '', retakeSeries: 0, retakeDoctor: '', diagnosticImpact: '无法诊断', costImpact: 0, status: '无法重拍', notes: '⚠️ SPECT-02探测器故障，无法完成检查' },
  { id: 'RJ009', accessionNo: 'PET20260505001', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, examType: 'PET/CT', examItem: '食管癌术后评估', examDate: '2026-05-05', device: 'PET/CT-01', doctor: '张明华', rejectReason: '参数设置错误', severity: '中度', imageCount: 300, seriesCount: 3, retakeDate: '2026-05-05', retakeSeries: 3, retakeDoctor: '李技师', diagnosticImpact: '部分受限', costImpact: 480, status: '已重拍', notes: '床位重叠率设置过低' },
  { id: 'RJ010', accessionNo: 'PET20260505002', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, examType: 'PET/CT', examItem: '甲状腺癌碘治疗后评估', examDate: '2026-05-05', device: 'PET/CT-02', doctor: '李晓东', rejectReason: '注射外渗', severity: '重度', imageCount: 380, seriesCount: 3, retakeDate: '2026-05-06', retakeSeries: 3, retakeDoctor: '陈护士', diagnosticImpact: '无法诊断', costImpact: 1100, status: '已重拍', notes: '右肘正中静脉外渗，延迟扫描后完成' },
  { id: 'RJ011', accessionNo: 'NM20260505002', patientId: 'P012', patientName: '林美红', gender: '女', age: 58, examType: 'NM', examItem: '甲状腺静态显像', examDate: '2026-05-05', device: 'SPECT-01', doctor: '王丽华', rejectReason: '定位错误', severity: '轻度', imageCount: 60, seriesCount: 1, retakeDate: '2026-05-05', retakeSeries: 1, retakeDoctor: '张技师', diagnosticImpact: '无影响', costImpact: 150, status: '已重拍', notes: '甲状腺未完全包括在视野内' },
  { id: 'RJ012', accessionNo: 'PET20260505003', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, examType: 'PET/CT', examItem: '宫颈癌分期', examDate: '2026-05-06', device: 'PET/CT-01', doctor: '李晓东', rejectReason: '患者移动', severity: '中度', imageCount: 200, seriesCount: 2, retakeDate: '2026-05-06', retakeSeries: 2, retakeDoctor: '王技师', diagnosticImpact: '部分受限', costImpact: 350, status: '已重拍', notes: '盆腔扫描时患者轻微移动' },
  { id: 'RJ013', accessionNo: 'NM20260506001', patientId: 'P015', patientName: '王磊', gender: '男', age: 52, examType: 'NM', examItem: '肺灌注显像', examDate: '2026-05-06', device: 'SPECT-01', doctor: '王丽华', rejectReason: '注射外渗', severity: '重度', imageCount: 280, seriesCount: 2, retakeDate: '2026-05-06', retakeSeries: 2, retakeDoctor: '陈护士', diagnosticImpact: '无法诊断', costImpact: 950, status: '已重拍', notes: '右足背静脉外渗，重新注射完成' },
  { id: 'RJ014', accessionNo: 'PET20260506001', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, examType: 'PET/CT', examItem: '胃癌术前分期', examDate: '2026-05-07', device: 'PET/CT-01', doctor: '张明华', rejectReason: '射线硬化', severity: '轻度', imageCount: 100, seriesCount: 1, retakeDate: '2026-05-07', retakeSeries: 1, retakeDoctor: '李技师', diagnosticImpact: '无影响', costImpact: 200, status: '已重拍', notes: '肩部射线硬化伪影，不影响诊断' },
  { id: 'RJ015', accessionNo: 'NM20260507001', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'NM', examItem: '全身骨显像', examDate: '2026-05-08', device: 'SPECT-01', doctor: '王丽华', rejectReason: '患者移动', severity: '轻度', imageCount: 120, seriesCount: 1, retakeDate: '2026-05-08', retakeSeries: 1, retakeDoctor: '张技师', diagnosticImpact: '无影响', costImpact: 160, status: '已重拍', notes: '四肢骨扫描时患者轻微移动' },
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

const severityColor = (s: string) => {
  if (s === '重度') return { bg: '#fee2e2', color: '#dc2626' };
  if (s === '中度') return { bg: '#fef3c7', color: '#b45309' };
  return { bg: '#dbeafe', color: '#1e40af' };
};

const impactColor = (s: string) => {
  if (s === '无法诊断') return { bg: '#fee2e2', color: '#dc2626' };
  if (s === '部分受限') return { bg: '#fef3c7', color: '#b45309' };
  return { bg: '#d1fae5', color: '#047857' };
};

const RejectManagePage: React.FC = () => {
  const [records] = useState<RejectRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [reasonFilter, setReasonFilter] = useState('全部');

  const reasons = ['全部', ...Array.from(new Set(records.map(r => r.rejectReason)))];
  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.accessionNo.includes(search);
    const matchReason = reasonFilter === '全部' || r.rejectReason === reasonFilter;
    return matchSearch && matchReason;
  });

  const totalCost = records.reduce((s, r) => s + r.costImpact, 0);
  const retakeRate = ((records.filter(r => r.status === '已重拍').length / records.length) * 100).toFixed(1);
  const failRate = ((records.filter(r => r.diagnosticImpact === '无法诊断').length / records.length) * 100).toFixed(1);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>废片管理与图像质量追踪</h2>
        <p style={styles.subtitle}>伪影分类统计 · 重拍成本分析 · 质量改进追踪</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><XCircle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{records.length}</div><div style={styles.statLabel}>废片总数</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{retakeRate}%</div><div style={styles.statLabel}>重拍成功率</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{failRate}%</div><div style={styles.statLabel}>无法诊断率</div></div>
        <div style={styles.statCard}><FileText size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>¥{totalCost.toLocaleString()}</div><div style={styles.statLabel}>重拍总成本</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者/预约号..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {reasons.map(r => (
          <button key={r} onClick={() => setReasonFilter(r)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: reasonFilter === r ? '#1e40af' : '#d1d5db', background: reasonFilter === r ? '#1e40af' : '#fff', color: reasonFilter === r ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{r}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>废片原因</th>
              <th style={styles.th}>严重程度</th>
              <th style={styles.th}>图像损失</th>
              <th style={styles.th}>诊断影响</th>
              <th style={styles.th}>重拍日期</th>
              <th style={styles.th}>重拍操作者</th>
              <th style={styles.th}>成本</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.accessionNo}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examType} · {r.examDate}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.device} · {r.doctor}</div></td>
                <td style={{ ...styles.td, color: '#b45309', fontWeight: 500 }}>{r.rejectReason}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, ...severityColor(r.severity) }}>{r.severity}</span></td>
                <td style={styles.td}>{r.imageCount}帧 / {r.seriesCount}序列</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...impactColor(r.diagnosticImpact) }}>{r.diagnosticImpact}</span></td>
                <td style={styles.td}>{r.retakeDate || '-'}</td>
                <td style={styles.td}>{r.retakeDoctor || '-'}</td>
                <td style={{ ...styles.td, fontWeight: 600, color: r.costImpact > 800 ? '#dc2626' : '#374151' }}>{r.costImpact > 0 ? `¥${r.costImpact}` : '-'}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, background: r.status === '已重拍' ? '#d1fae5' : r.status === '无法重拍' ? '#fee2e2' : '#fef3c7', color: r.status === '已重拍' ? '#047857' : r.status === '无法重拍' ? '#dc2626' : '#b45309' }}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectManagePage;
