// MWLPage.tsx - DICOM Modality Worklist (MWM)
import React, { useState } from 'react';
import { Monitor, Search, Clock, User, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

interface MWLRecord {
  id: string;
  accessionNo: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  modality: string;
  procedure: string;
  scheduledDate: string;
  scheduledTime: string;
  referringPhysician: string;
  device: string;
  status: '待执行' | '执行中' | '已完成' | '已取消';
  priority: '常规' | '紧急' | 'STAT';
  studyInstanceUID: string;
  notes: string;
}

const mockData: MWLRecord[] = [
  { id: 'MWL001', accessionNo: 'MWL20260502001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, modality: 'PET/CT', procedure: '全身肿瘤筛查(18F-FDG PET/CT)', scheduledDate: '2026-05-02', scheduledTime: '08:30', referringPhysician: '王主任', device: 'PET/CT-01', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050201', notes: '' },
  { id: 'MWL002', accessionNo: 'MWL20260502002', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, modality: 'PET/CT', procedure: '肺部肿瘤分期(18F-FDG PET/CT)', scheduledDate: '2026-05-02', scheduledTime: '09:00', referringPhysician: '李主任', device: 'PET/CT-01', status: '已完成', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.3.2026050202', notes: '胸片发现肺占位' },
  { id: 'MWL003', accessionNo: 'MWL20260502003', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, modality: 'PET/CT', procedure: '前列腺癌评估(18F-PSMA PET/CT)', scheduledDate: '2026-05-02', scheduledTime: '09:30', referringPhysician: '赵主任', device: 'PET/CT-01', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050203', notes: 'PSA升高待查' },
  { id: 'MWL004', accessionNo: 'MWL20260502004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, modality: 'PET/CT', procedure: '淋巴瘤疗效评估(18F-FDG PET/CT)', scheduledDate: '2026-05-02', scheduledTime: '10:30', referringPhysician: '刘主任', device: 'PET/CT-02', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050204', notes: '2周期化疗后评估' },
  { id: 'MWL005', accessionNo: 'MWL20260503001', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, modality: 'PET/CT', procedure: '癫痫灶定位(18F-FDG PET/CT)', scheduledDate: '2026-05-02', scheduledTime: '13:00', referringPhysician: '孙主任', device: 'PET/CT-01', status: '已完成', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.3.2026050301', notes: '难治性癫痫手术前评估' },
  { id: 'MWL006', accessionNo: 'MWL20260503002', patientId: 'P009', patientName: '黄建国', gender: '男', age: 68, modality: 'OT', procedure: '甲亢131I治疗', scheduledDate: '2026-05-03', scheduledTime: '08:00', referringPhysician: '胡主任', device: '核素治疗室', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050302', notes: '甲亢131I治疗剂量计算' },
  { id: 'MWL007', accessionNo: 'MWL20260503003', patientId: 'P011', patientName: '马秀英', gender: '女', age: 75, modality: 'PET/CT', procedure: '阿尔茨海默病评估(18F-AV45 PET)', scheduledDate: '2026-05-03', scheduledTime: '10:00', referringPhysician: '陈主任', device: 'PET/CT-01', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050303', notes: '认知功能下降3年' },
  { id: 'MWL008', accessionNo: 'MWL20260504001', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, modality: 'PET/CT', procedure: '胰腺癌分期(18F-FDG PET/CT)', scheduledDate: '2026-05-04', scheduledTime: '08:30', referringPhysician: '张主任', device: 'PET/CT-01', status: '已完成', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.3.2026050401', notes: 'CA19-9升高待查' },
  { id: 'MWL009', accessionNo: 'MWL20260504002', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, modality: 'PET/CT', procedure: '食管癌术后评估(18F-FDG PET/CT)', scheduledDate: '2026-05-05', scheduledTime: '08:30', referringPhysician: '李主任', device: 'PET/CT-01', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050402', notes: '食管癌术后3月复查' },
  { id: 'MWL010', accessionNo: 'MWL20260504003', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, modality: 'PET/CT', procedure: '甲状腺癌碘治疗后评估(18F-FDG PET/CT)', scheduledDate: '2026-05-05', scheduledTime: '10:00', referringPhysician: '赵主任', device: 'PET/CT-02', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050403', notes: '甲癌碘治疗后TG升高' },
  { id: 'MWL011', accessionNo: 'MWL20260505001', patientId: 'P021', patientName: '周明', gender: '男', age: 49, modality: 'SPECT', procedure: '心肌灌注负荷+静息显像(99mTc-MIBI)', scheduledDate: '2026-05-06', scheduledTime: '08:00', referringPhysician: '胡主任', device: 'SPECT-01', status: '已完成', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.4.2026050501', notes: '胸闷待查，评估心肌缺血' },
  { id: 'MWL012', accessionNo: 'MWL20260505002', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, modality: 'PET/CT', procedure: '宫颈癌分期(18F-FDG PET/CT)', scheduledDate: '2026-05-06', scheduledTime: '13:30', referringPhysician: '孙主任', device: 'PET/CT-01', status: '已完成', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.3.2026050502', notes: '病理确诊宫颈癌' },
  { id: 'MWL013', accessionNo: 'MWL20260505003', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, modality: 'PET/CT', procedure: '胃癌术前分期(18F-FDG PET/CT)', scheduledDate: '2026-05-07', scheduledTime: '08:30', referringPhysician: '周主任', device: 'PET/CT-01', status: '执行中', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.3.2026050503', notes: '胃镜确诊胃腺癌' },
  { id: 'MWL014', accessionNo: 'MWL20260506001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, modality: 'PET/CT', procedure: '肺癌疗效评估(18F-FDG PET/CT)', scheduledDate: '2026-05-07', scheduledTime: '10:00', referringPhysician: '王主任', device: 'PET/CT-02', status: '待执行', priority: '紧急', studyInstanceUID: '1.2.840.113619.2.55.3.2026050601', notes: '靶向治疗2月后评估' },
  { id: 'MWL015', accessionNo: 'MWL20260506002', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, modality: 'PET/CT', procedure: '前列腺癌复查(18F-PSMA PET/CT)', scheduledDate: '2026-05-07', scheduledTime: '13:30', referringPhysician: '赵主任', device: 'PET/CT-01', status: '待执行', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050602', notes: 'ADT治疗后3月复查' },
  { id: 'MWL016', accessionNo: 'MWL20260506003', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, modality: 'SPECT', procedure: '心肌灌注静息显像(99mTc-MIBI)', scheduledDate: '2026-05-08', scheduledTime: '08:00', referringPhysician: '胡主任', device: 'SPECT-01', status: '待执行', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.4.2026050603', notes: '负荷显像后静息复查' },
  { id: 'MWL017', accessionNo: 'MWL20260506004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, modality: 'NM', procedure: '淋巴瘤复查(全身骨显像)', scheduledDate: '2026-05-08', scheduledTime: '09:00', referringPhysician: '刘主任', device: 'SPECT-01', status: '待执行', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.4.2026050604', notes: '6周期化疗后骨髓评估' },
  { id: 'MWL018', accessionNo: 'MWL20260506005', patientId: 'P007', patientName: '黄婷', gender: '女', age: 36, modality: 'PET/CT', procedure: '不孕症评估(18F-FDG PET/CT)', scheduledDate: '2026-05-09', scheduledTime: '13:00', referringPhysician: '罗主任', device: 'PET/CT-01', status: '待执行', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050605', notes: '不孕症患者子宫内膜评估' },
  { id: 'MWL019', accessionNo: 'MWL20260507001', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, modality: 'PET/CT', procedure: '神经系统肿瘤(18F-FDG PET/CT)', scheduledDate: '2026-05-09', scheduledTime: '10:00', referringPhysician: '孙主任', device: 'PET/CT-02', status: '待执行', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050701', notes: '脑MRI发现占位待定性' },
  { id: 'MWL020', accessionNo: 'MWL20260507002', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, modality: 'PET/CT', procedure: '乳腺癌术后复查(18F-FDG PET/CT)', scheduledDate: '2026-05-08', scheduledTime: '13:00', referringPhysician: '李主任', device: 'PET/CT-02', status: '已完成', priority: '常规', studyInstanceUID: '1.2.840.113619.2.55.3.2026050801', notes: '乳腺癌术后2年常规复查' },
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

const statusBadge = (s: string) => {
  if (s === '已完成') return { background: '#d1fae5', color: '#047857' };
  if (s === '执行中') return { background: '#fef3c7', color: '#b45309' };
  if (s === '待执行') return { background: '#dbeafe', color: '#1e40af' };
  return { background: '#f3f4f6', color: '#6b7280' };
};

const priorityBadge = (p: string) => {
  if (p === 'STAT') return { background: '#dc2626', color: '#fff' };
  if (p === '紧急') return { background: '#fee2e2', color: '#dc2626' };
  return { background: '#f3f4f6', color: '#6b7280' };
};

const MWLPage: React.FC = () => {
  const [records] = useState<MWLRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.accessionNo.includes(search) || r.procedure.includes(search);
    const matchStatus = statusFilter === '全部' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const completedCount = records.filter(r => r.status === '已完成').length;
  const pendingCount = records.filter(r => r.status === '待执行' || r.status === '执行中').length;
  const urgentCount = records.filter(r => r.priority === '紧急' || r.priority === 'STAT').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>DICOM Modality Worklist</h2>
        <p style={styles.subtitle}>DICOM MWL工作清单 · 设备预约调度 · HL7消息同步</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Monitor size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>工单总数</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{completedCount}</div><div style={styles.statLabel}>已完成</div></div>
        <div style={styles.statCard}><Clock size={16} style={{ color: '#3b82f6', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#3b82f6' }}>{pendingCount}</div><div style={styles.statLabel}>待执行</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{urgentCount}</div><div style={styles.statLabel}>紧急/STAT</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者/预约号/检查项目..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '待执行', '执行中', '已完成', '已取消'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: statusFilter === s ? '#1e40af' : '#d1d5db', background: statusFilter === s ? '#1e40af' : '#fff', color: statusFilter === s ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{s}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>预约时间</th>
              <th style={styles.th}>申请医生</th>
              <th style={styles.th}>设备</th>
              <th style={styles.th}>优先级</th>
              <th style={styles.th}>状态</th>
              <th style={styles.th}>备注</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.accessionNo}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500, color: '#1e40af' }}>{r.procedure}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.modality}</div></td>
                <td style={styles.td}><div>{r.scheduledDate}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.scheduledTime}</div></td>
                <td style={styles.td}><User size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.referringPhysician}</td>
                <td style={styles.td}><Monitor size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.device}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...priorityBadge(r.priority) }}>{r.priority}</span></td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...statusBadge(r.status) }}>{r.status}</span></td>
                <td style={styles.td}><div style={{ fontSize: '12px', color: '#6b7280', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.notes}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MWLPage;
