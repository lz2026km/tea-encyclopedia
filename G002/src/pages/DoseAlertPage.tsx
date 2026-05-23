// DoseAlertPage.tsx - 辐射剂量阈值预警
import React, { useState } from 'react';
import { AlertTriangle, Shield, Clock, Users, Bell, CheckCircle, XCircle } from 'lucide-react';

interface PatientDoseRecord {
  id: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  examDate: string;
  dose: number;
  doseUnit: string;
  threshold: number;
  exceeded: boolean;
  doctor: string;
  notes: string;
}

interface StaffDoseRecord {
  id: string;
  staffId: string;
  name: string;
  department: string;
  role: string;
  year: number;
  totalDose: number;
  quarterDose: number;
  monthDose: number;
  status: 'normal' | 'warning' | 'exceeded';
  records: { month: string; dose: number }[];
}

const patientRecords: PatientDoseRecord[] = [
  { id: 'PD001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '全身肿瘤筛查', examDate: '2026-05-02', dose: 8.5, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '正常范围内' },
  { id: 'PD002', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, examType: 'PET/CT', examItem: '肺部肿瘤分期', examDate: '2026-05-02', dose: 7.2, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '正常范围内' },
  { id: 'PD003', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌评估', examDate: '2026-05-02', dose: 9.8, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '李晓东', notes: '接近阈值' },
  { id: 'PD004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤疗效评估', examDate: '2026-05-02', dose: 8.1, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '正常范围内' },
  { id: 'PD005', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'SPECT', examItem: '骨显像', examDate: '2026-05-02', dose: 4.5, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '王丽华', notes: 'SPECT剂量较低' },
  { id: 'PD006', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '癫痫灶定位', examDate: '2026-05-02', dose: 6.8, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '李晓东', notes: '正常范围内' },
  { id: 'PD007', patientId: 'P009', patientName: '孙强', gender: '男', age: 68, examType: '核素治疗', examItem: '甲亢碘-131治疗', examDate: '2026-05-03', dose: 15.0, doseUnit: 'mSv', threshold: 10, exceeded: true, doctor: '张明华', notes: '⚠️ 超过阈值！核素治疗有效剂量较高' },
  { id: 'PD008', patientId: 'P010', patientName: '郑晓燕', gender: '女', age: 39, examType: 'SPECT', examItem: '肾动态显像', examDate: '2026-05-03', dose: 3.2, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '王丽华', notes: '正常范围内' },
  { id: 'PD009', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, examType: 'PET/CT', examItem: '阿尔茨海默病评估', examDate: '2026-05-03', dose: 12.5, doseUnit: 'mSv', threshold: 10, exceeded: true, doctor: '李晓东', notes: '⚠️ 超过阈值！AV45剂量较高' },
  { id: 'PD010', patientId: 'P013', patientName: '马建军', gender: '男', age: 45, examType: 'PET/CT', examItem: '结直肠癌术后复查', examDate: '2026-05-04', dose: 8.2, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '正常范围内' },
  { id: 'PD011', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, examType: 'PET/CT', examItem: '胰腺癌分期', examDate: '2026-05-04', dose: 7.5, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '李晓东', notes: '正常范围内' },
  { id: 'PD012', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, examType: 'PET/CT', examItem: '食管癌术后评估', examDate: '2026-05-05', dose: 9.2, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '接近阈值' },
  { id: 'PD013', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, examType: 'PET/CT', examItem: '甲状腺癌碘治疗后评估', examDate: '2026-05-05', dose: 6.8, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '李晓东', notes: '正常范围内' },
  { id: 'PD014', patientId: 'P020', patientName: '孙丽娟', gender: '女', age: 70, examType: '核素治疗', examItem: '骨转移瘤89Sr治疗', examDate: '2026-05-05', dose: 35.0, doseUnit: 'mSv', threshold: 10, exceeded: true, doctor: '张明华', notes: '⚠️ 严重超标！89Sr治疗大剂量' },
  { id: 'PD015', patientId: 'P021', patientName: '周明', gender: '男', age: 49, examType: 'SPECT', examItem: '心肌灌注显像', examDate: '2026-05-06', dose: 6.5, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '王丽华', notes: '正常范围内' },
  { id: 'PD016', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, examType: 'PET/CT', examItem: '宫颈癌分期', examDate: '2026-05-06', dose: 7.8, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '李晓东', notes: '正常范围内' },
  { id: 'PD017', patientId: 'P023', patientName: '郑海', gender: '男', age: 64, examType: 'PET/CT', examItem: '膀胱癌术后复发监测', examDate: '2026-05-06', dose: 8.5, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '正常范围内' },
  { id: 'PD018', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, examType: 'PET/CT', examItem: '胃癌术前分期', examDate: '2026-05-07', dose: 8.0, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '正常范围内' },
  { id: 'PD019', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌复查', examDate: '2026-05-07', dose: 9.8, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '李晓东', notes: '累计接近阈值' },
  { id: 'PD020', patientId: 'P009', patientName: '孙强', gender: '男', age: 68, examType: '核素治疗', examItem: '甲亢复查', examDate: '2026-05-07', dose: 5.0, doseUnit: 'mSv', threshold: 10, exceeded: false, doctor: '张明华', notes: '131I治疗后复查' },
];

const staffRecords: StaffDoseRecord[] = [
  { id: 'SD001', staffId: 'S001', name: '张明华', department: '核医学科', role: '主任医师', year: 2026, totalDose: 12.5, quarterDose: 3.2, monthDose: 1.1, status: 'warning', records: [{ month: '2026-01', dose: 3.2 }, { month: '2026-02', dose: 4.1 }, { month: '2026-03', dose: 3.0 }, { month: '2026-04', dose: 1.5 }, { month: '2026-05', dose: 0.7 }] },
  { id: 'SD002', staffId: 'S002', name: '李晓东', department: '核医学科', role: '主治医师', year: 2026, totalDose: 8.5, quarterDose: 2.1, monthDose: 0.8, status: 'normal', records: [{ month: '2026-01', dose: 2.5 }, { month: '2026-02', dose: 2.2 }, { month: '2026-03', dose: 1.8 }, { month: '2026-04', dose: 1.2 }, { month: '2026-05', dose: 0.8 }] },
  { id: 'SD003', staffId: 'S003', name: '王丽华', department: '核医学科', role: '副主任医师', year: 2026, totalDose: 6.2, quarterDose: 1.5, monthDose: 0.5, status: 'normal', records: [{ month: '2026-01', dose: 1.8 }, { month: '2026-02', dose: 1.5 }, { month: '2026-03', dose: 1.4 }, { month: '2026-04', dose: 1.0 }, { month: '2026-05', dose: 0.5 }] },
  { id: 'SD004', staffId: 'S004', name: '陈护士', department: '核医学科', role: '主管护师', year: 2026, totalDose: 18.5, quarterDose: 5.2, monthDose: 2.1, status: 'exceeded', records: [{ month: '2026-01', dose: 4.5 }, { month: '2026-02', dose: 4.8 }, { month: '2026-03', dose: 4.0 }, { month: '2026-04', dose: 3.2 }, { month: '2026-05', dose: 2.1 }] },
  { id: 'SD005', staffId: 'S005', name: '刘欣', department: '核医学科', role: '技师', year: 2026, totalDose: 22.0, quarterDose: 6.5, monthDose: 2.8, status: 'exceeded', records: [{ month: '2026-01', dose: 5.5 }, { month: '2026-02', dose: 5.2 }, { month: '2026-03', dose: 4.5 }, { month: '2026-04', dose: 4.0 }, { month: '2026-05', dose: 2.8 }] },
  { id: 'SD006', staffId: 'S006', name: '李技师', department: '核医学科', role: '技师', year: 2026, totalDose: 9.2, quarterDose: 2.5, monthDose: 0.9, status: 'normal', records: [{ month: '2026-01', dose: 2.8 }, { month: '2026-02', dose: 2.5 }, { month: '2026-03', dose: 2.0 }, { month: '2026-04', dose: 1.0 }, { month: '2026-05', dose: 0.9 }] },
  { id: 'SD007', staffId: 'S007', name: '王技师', department: '核医学科', role: '技师', year: 2026, totalDose: 11.5, quarterDose: 3.0, monthDose: 1.2, status: 'warning', records: [{ month: '2026-01', dose: 3.5 }, { month: '2026-02', dose: 3.0 }, { month: '2026-03', dose: 2.5 }, { month: '2026-04', dose: 1.3 }, { month: '2026-05', dose: 1.2 }] },
  { id: 'SD008', staffId: 'S008', name: '张技师', department: '核医学科', role: '技师', year: 2026, totalDose: 8.8, quarterDose: 2.2, monthDose: 0.7, status: 'normal', records: [{ month: '2026-01', dose: 2.8 }, { month: '2026-02', dose: 2.5 }, { month: '2026-03', dose: 2.0 }, { month: '2026-04', dose: 0.8 }, { month: '2026-05', dose: 0.7 }] },
  { id: 'SD009', staffId: 'S009', name: '赵技师', department: '核医学科', role: '技师', year: 2026, totalDose: 45.0, quarterDose: 12.0, monthDose: 5.0, status: 'exceeded', records: [{ month: '2026-01', dose: 8.5 }, { month: '2026-02', dose: 9.0 }, { month: '2026-03', dose: 10.5 }, { month: '2026-04', dose: 12.0 }, { month: '2026-05', dose: 5.0 }] },
  { id: 'SD010', staffId: 'S010', name: '刘技师', department: '核医学科', role: '技师', year: 2026, totalDose: 7.5, quarterDose: 1.8, monthDose: 0.6, status: 'normal', records: [{ month: '2026-01', dose: 2.2 }, { month: '2026-02', dose: 2.0 }, { month: '2026-03', dose: 1.5 }, { month: '2026-04', dose: 1.2 }, { month: '2026-05', dose: 0.6 }] },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  alertBanner: { background: '#fee2e2', border: '2px solid #dc2626', borderRadius: '8px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
  alertBannerWarn: { background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '8px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  tableContainer: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: '24px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  badgeRed: { background: '#fee2e2', color: '#dc2626' },
  badgeOrange: { background: '#fef3c7', color: '#b45309' },
  badgeGreen: { background: '#d1fae5', color: '#047857' },
};

const DoseAlertPage: React.FC = () => {
  const [tab, setTab] = useState<'patient' | 'staff'>('patient');

  const exceededCount = patientRecords.filter(r => r.exceeded).length;
  const warningCount = staffRecords.filter(r => r.status === 'exceeded').length;
  const staffWarningCount = staffRecords.filter(r => r.status === 'warning').length;
  const exceededStaff = staffRecords.filter(r => r.status === 'exceeded');

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>辐射剂量阈值预警</h2>
        <p style={styles.subtitle}>患者单次剂量监测 · 职业人员年度累计剂量追踪</p>
      </div>

      {/* Alert Banners */}
      {exceededCount > 0 && (
        <div style={styles.alertBanner}>
          <Bell size={20} color="#dc2626" />
          <div>
            <div style={{ fontWeight: 600, color: '#dc2626' }}>患者剂量超标预警</div>
            <div style={{ fontSize: '13px', color: '#991b1b' }}>本月有 {exceededCount} 例患者单次检查剂量超过10mSv阈值，需评估临床必要性</div>
          </div>
        </div>
      )}
      {warningCount > 0 && (
        <div style={styles.alertBannerWarn}>
          <AlertTriangle size={20} color="#b45309" />
          <div>
            <div style={{ fontWeight: 600, color: '#b45309' }}>职业人员超剂量预警</div>
            <div style={{ fontSize: '13px', color: '#92400e' }}>有 {warningCount} 名工作人员年度累计剂量超过50mSv上限，{staffWarningCount} 人接近预警线</div>
          </div>
        </div>
      )}

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Users size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{patientRecords.length}</div><div style={styles.statLabel}>患者记录</div></div>
        <div style={styles.statCard}><XCircle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={styles.statValue}>{exceededCount}</div><div style={styles.statLabel}>患者超标</div></div>
        <div style={styles.statCard}><Shield size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{staffRecords.length}</div><div style={styles.statLabel}>职业人员</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{warningCount}</div><div style={styles.statLabel}>超剂量(&gt;50mSv)</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#b45309' }}>{staffWarningCount}</div><div style={styles.statLabel}>预警(&gt;40mSv)</div></div>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {(['patient', 'staff'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid', borderColor: tab === t ? '#1e40af' : '#d1d5db', background: tab === t ? '#1e40af' : '#fff', color: tab === t ? '#fff' : '#374151', cursor: 'pointer', fontSize: '13px' }}>{t === 'patient' ? '患者剂量记录' : '职业人员档案'}</button>
        ))}
      </div>

      {tab === 'patient' ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>患者</th>
                <th style={styles.th}>检查项目</th>
                <th style={styles.th}>检查日期</th>
                <th style={styles.th}>剂量</th>
                <th style={styles.th}>阈值</th>
                <th style={styles.th}>状态</th>
                <th style={styles.th}>主治医生</th>
                <th style={styles.th}>备注</th>
              </tr>
            </thead>
            <tbody>
              {patientRecords.map(r => (
                <tr key={r.id}>
                  <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div></td>
                  <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examType}</div></td>
                  <td style={styles.td}>{r.examDate}</td>
                  <td style={{ ...styles.td, fontWeight: 700, color: r.exceeded ? '#dc2626' : '#374151' }}>{r.dose} {r.doseUnit}</td>
                  <td style={styles.td}>{r.threshold} {r.doseUnit}</td>
                  <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, background: r.exceeded ? '#fee2e2' : '#d1fae5', color: r.exceeded ? '#dc2626' : '#047857' }}>{r.exceeded ? '⚠ 超标' : '✓ 正常'}</span></td>
                  <td style={styles.td}>{r.doctor}</td>
                  <td style={styles.td}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>姓名</th>
                <th style={styles.th}>科室/职位</th>
                <th style={styles.th}>年度累计</th>
                <th style={styles.th}>季度累计</th>
                <th style={styles.th}>本月</th>
                <th style={styles.th}>状态</th>
                <th style={styles.th}>2026年月度趋势</th>
              </tr>
            </thead>
            <tbody>
              {staffRecords.map(r => (
                <tr key={r.id}>
                  <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.name}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.staffId}</div></td>
                  <td style={styles.td}><div>{r.department}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.role}</div></td>
                  <td style={{ ...styles.td, fontWeight: 700, color: r.status === 'exceeded' ? '#dc2626' : r.status === 'warning' ? '#b45309' : '#047857' }}>{r.totalDose} mSv</td>
                  <td style={styles.td}>{r.quarterDose} mSv</td>
                  <td style={styles.td}>{r.monthDose} mSv</td>
                  <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, background: r.status === 'exceeded' ? '#fee2e2' : r.status === 'warning' ? '#fef3c7' : '#d1fae5', color: r.status === 'exceeded' ? '#dc2626' : r.status === 'warning' ? '#b45309' : '#047857' }}>{r.status === 'exceeded' ? '⚠ 超剂量' : r.status === 'warning' ? '⚠ 预警' : '✓ 正常'}</span></td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                      {r.records.map((rec, i) => (
                        <div key={i} style={{ width: '28px', textAlign: 'center' }}>
                          <div style={{ background: rec.dose > 12.5 ? '#dc2626' : rec.dose > 10 ? '#f59e0b' : '#3b82f6', borderRadius: '2px', height: `${Math.min(rec.dose * 3, 30)}px`, marginBottom: '2px' }} />
                          <div style={{ fontSize: '8px', color: '#9ca3af' }}>{rec.month.split('-')[1]}月</div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoseAlertPage;
