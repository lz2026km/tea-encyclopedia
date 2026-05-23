// ImageArchivePage.tsx - 图像存档与调取
import React, { useState } from 'react';
import { HardDrive, Archive, Trash2, Download, Clock, Search, Image, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface ArchiveRecord {
  id: string;
  accessionNo: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  studyDate: string;
  device: string;
  studyInstanceUID: string;
  seriesCount: number;
  imageCount: number;
  storageSize: number; // MB
  archiveStatus: '已存档' | '存档中' | '调取中' | '已删除';
  archiveDate: string;
  expireDate: string;
  retention: string;
  location: string;
  notes: string;
}

const mockData: ArchiveRecord[] = [
  { id: 'ARC001', accessionNo: 'PET20260502001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '全身肿瘤筛查', studyDate: '2026-05-02', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050201', seriesCount: 8, imageCount: 1200, storageSize: 850, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC002', accessionNo: 'PET20260502002', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, examType: 'PET/CT', examItem: '肺部肿瘤分期', studyDate: '2026-05-02', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050202', seriesCount: 7, imageCount: 1100, storageSize: 780, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC003', accessionNo: 'PET20260502003', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌评估', studyDate: '2026-05-02', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050203', seriesCount: 9, imageCount: 1350, storageSize: 920, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC004', accessionNo: 'PET20260502004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤疗效评估', studyDate: '2026-05-02', device: 'PET/CT-02', studyInstanceUID: '1.2.840.113619.2.55.3.2026050204', seriesCount: 8, imageCount: 1180, storageSize: 810, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-B', notes: '' },
  { id: 'ARC005', accessionNo: 'PET20260502005', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '癫痫灶定位', studyDate: '2026-05-02', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050301', seriesCount: 7, imageCount: 1050, storageSize: 720, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC006', accessionNo: 'PET20260503001', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, examType: 'PET/CT', examItem: '阿尔茨海默病评估', studyDate: '2026-05-03', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050303', seriesCount: 9, imageCount: 1300, storageSize: 880, archiveStatus: '已存档', archiveDate: '2026-05-03', expireDate: '2031-05-03', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC007', accessionNo: 'PET20260503002', patientId: 'P013', patientName: '马建军', gender: '男', age: 45, examType: 'PET/CT', examItem: '结直肠癌术后复查', studyDate: '2026-05-04', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050304', seriesCount: 8, imageCount: 1180, storageSize: 805, archiveStatus: '已存档', archiveDate: '2026-05-04', expireDate: '2031-05-04', retention: '永久', location: 'PACS存储池-B', notes: '' },
  { id: 'ARC008', accessionNo: 'PET20260503003', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, examType: 'PET/CT', examItem: '胰腺癌分期', studyDate: '2026-05-04', device: 'PET/CT-02', studyInstanceUID: '1.2.840.113619.2.55.3.2026050305', seriesCount: 8, imageCount: 1150, storageSize: 790, archiveStatus: '已存档', archiveDate: '2026-05-04', expireDate: '2031-05-04', retention: '永久', location: 'PACS存储池-B', notes: '' },
  { id: 'ARC009', accessionNo: 'PET20260503004', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, examType: 'PET/CT', examItem: '食管癌术后评估', studyDate: '2026-05-05', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050306', seriesCount: 8, imageCount: 1220, storageSize: 835, archiveStatus: '已存档', archiveDate: '2026-05-05', expireDate: '2031-05-05', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC010', accessionNo: 'PET20260503005', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, examType: 'PET/CT', examItem: '甲状腺癌碘治疗后评估', studyDate: '2026-05-05', device: 'PET/CT-02', studyInstanceUID: '1.2.840.113619.2.55.3.2026050307', seriesCount: 7, imageCount: 1080, storageSize: 745, archiveStatus: '已存档', archiveDate: '2026-05-05', expireDate: '2031-05-05', retention: '永久', location: 'PACS存储池-B', notes: '' },
  { id: 'ARC011', accessionNo: 'NM20260503001', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, examType: 'SPECT', examItem: '心肌灌注显像', studyDate: '2026-05-02', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050201', seriesCount: 4, imageCount: 320, storageSize: 180, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC012', accessionNo: 'NM20260503002', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'SPECT', examItem: '骨显像', studyDate: '2026-05-02', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050202', seriesCount: 5, imageCount: 480, storageSize: 250, archiveStatus: '已存档', archiveDate: '2026-05-02', expireDate: '2031-05-02', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC013', accessionNo: 'PET20260503006', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, examType: 'PET/CT', examItem: '宫颈癌分期', studyDate: '2026-05-06', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050309', seriesCount: 8, imageCount: 1200, storageSize: 820, archiveStatus: '已存档', archiveDate: '2026-05-06', expireDate: '2031-05-06', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC014', accessionNo: 'PET20260503007', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, examType: 'PET/CT', examItem: '胃癌术前分期', studyDate: '2026-05-07', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050310', seriesCount: 8, imageCount: 1220, storageSize: 835, archiveStatus: '存档中', archiveDate: '2026-05-07', expireDate: '2031-05-07', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC015', accessionNo: 'NM20260505001', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, examType: 'SPECT', examItem: '静息心肌灌注显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050501', seriesCount: 4, imageCount: 300, storageSize: 165, archiveStatus: '调取中', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '患者复查调取' },
  { id: 'ARC016', accessionNo: 'PET20260504001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '肺癌疗效评估', studyDate: '2026-05-07', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050311', seriesCount: 8, imageCount: 1180, storageSize: 810, archiveStatus: '已存档', archiveDate: '2026-05-07', expireDate: '2031-05-07', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC017', accessionNo: 'PET20260504002', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌复查', studyDate: '2026-05-07', device: 'PET/CT-02', studyInstanceUID: '1.2.840.113619.2.55.3.2026050312', seriesCount: 9, imageCount: 1320, storageSize: 900, archiveStatus: '已存档', archiveDate: '2026-05-07', expireDate: '2031-05-07', retention: '永久', location: 'PACS存储池-B', notes: '' },
  { id: 'ARC018', accessionNo: 'NM20260508001', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, examType: 'NM', examItem: '静息心肌灌注显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050801', seriesCount: 4, imageCount: 300, storageSize: 165, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC019', accessionNo: 'NM20260508002', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'NM', examItem: '淋巴瘤复查', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050802', seriesCount: 6, imageCount: 520, storageSize: 280, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC020', accessionNo: 'DX20260508001', patientId: 'P007', patientName: '周伟', gender: '男', age: 43, examType: 'DXA', examItem: '骨密度测定', studyDate: '2026-05-08', device: 'DXA-01', studyInstanceUID: '1.2.840.113619.2.55.5.2026050801', seriesCount: 2, imageCount: 80, storageSize: 45, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC021', accessionNo: 'NM20260508003', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'NM', examItem: '全身骨显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050803', seriesCount: 5, imageCount: 480, storageSize: 260, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC022', accessionNo: 'NM20260508004', patientId: 'P010', patientName: '郑晓燕', gender: '女', age: 39, examType: 'NM', examItem: '肾动态显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050804', seriesCount: 4, imageCount: 380, storageSize: 200, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC023', accessionNo: 'NM20260508005', patientId: 'P012', patientName: '林美红', gender: '女', age: 58, examType: 'NM', examItem: '甲状腺静态显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050805', seriesCount: 3, imageCount: 180, storageSize: 95, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC024', accessionNo: 'NM20260508006', patientId: 'P015', patientName: '王磊', gender: '男', age: 52, examType: 'NM', examItem: '肺通气/灌注显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050806', seriesCount: 8, imageCount: 640, storageSize: 340, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC025', accessionNo: 'NM20260508007', patientId: 'P018', patientName: '赵雅琴', gender: '女', age: 61, examType: 'NM', examItem: '肝胆动态显像', studyDate: '2026-05-08', device: 'SPECT-01', studyInstanceUID: '1.2.840.113619.2.55.4.2026050807', seriesCount: 5, imageCount: 420, storageSize: 220, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-C', notes: '' },
  { id: 'ARC026', accessionNo: 'PET20260504003', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤复查', studyDate: '2026-05-08', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050314', seriesCount: 8, imageCount: 1160, storageSize: 795, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC027', accessionNo: 'PET20260504004', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'PET/CT', examItem: '乳腺癌术后复查', studyDate: '2026-05-08', device: 'PET/CT-02', studyInstanceUID: '1.2.840.113619.2.55.3.2026050315', seriesCount: 8, imageCount: 1140, storageSize: 780, archiveStatus: '已存档', archiveDate: '2026-05-08', expireDate: '2031-05-08', retention: '永久', location: 'PACS存储池-B', notes: '' },
  { id: 'ARC028', accessionNo: 'PET20260505001', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌复查', studyDate: '2026-05-09', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050501', seriesCount: 9, imageCount: 1340, storageSize: 910, archiveStatus: '已存档', archiveDate: '2026-05-09', expireDate: '2031-05-09', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC029', accessionNo: 'PET20260505002', patientId: 'P007', patientName: '黄婷', gender: '女', age: 36, examType: 'PET/CT', examItem: '不孕症评估', studyDate: '2026-05-09', device: 'PET/CT-01', studyInstanceUID: '1.2.840.113619.2.55.3.2026050502', seriesCount: 7, imageCount: 1020, storageSize: 700, archiveStatus: '已存档', archiveDate: '2026-05-09', expireDate: '2031-05-09', retention: '永久', location: 'PACS存储池-A', notes: '' },
  { id: 'ARC030', accessionNo: 'PET20260505003', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '神经系统肿瘤', studyDate: '2026-05-09', device: 'PET/CT-02', studyInstanceUID: '1.2.840.113619.2.55.3.2026050503', seriesCount: 8, imageCount: 1180, storageSize: 805, archiveStatus: '已存档', archiveDate: '2026-05-09', expireDate: '2031-05-09', retention: '永久', location: 'PACS存储池-B', notes: '' },
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
  storageBar: { background: '#e5e7eb', borderRadius: '4px', height: '6px', marginTop: '4px' },
};

const ImageArchivePage: React.FC = () => {
  const [records] = useState<ArchiveRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.accessionNo.includes(search);
    const matchStatus = statusFilter === '全部' || r.archiveStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalStorage = (records.reduce((s, r) => s + r.storageSize, 0) / 1024).toFixed(2);
  const archivedCount = records.filter(r => r.archiveStatus === '已存档').length;
  const archivedStorage = (records.filter(r => r.archiveStatus === '已存档').reduce((s, r) => s + r.storageSize, 0) / 1024).toFixed(2);

  const statusBadge = (s: string) => {
    if (s === '已存档') return { background: '#d1fae5', color: '#047857' };
    if (s === '存档中') return { background: '#dbeafe', color: '#1e40af' };
    if (s === '调取中') return { background: '#fef3c7', color: '#b45309' };
    return { background: '#f3f4f6', color: '#6b7280' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>图像存档与调取</h2>
        <p style={styles.subtitle}>DICOM图像归档 · 存储空间管理 · 长期保留策略</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><HardDrive size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>存档记录</div></div>
        <div style={styles.statCard}><Archive size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{archivedCount}</div><div style={styles.statLabel}>已存档</div></div>
        <div style={styles.statCard}><HardDrive size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{archivedStorage} GB</div><div style={styles.statLabel}>已用存储</div></div>
        <div style={styles.statCard}><HardDrive size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalStorage} GB</div><div style={styles.statLabel}>总容量</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者/预约号..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '已存档', '存档中', '调取中', '已删除'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: statusFilter === s ? '#1e40af' : '#d1d5db', background: statusFilter === s ? '#1e40af' : '#fff', color: statusFilter === s ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{s}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>Study UID</th>
              <th style={styles.th}>序列/图像数</th>
              <th style={styles.th}>存储大小</th>
              <th style={styles.th}>存档日期</th>
              <th style={styles.th}>保留期限</th>
              <th style={styles.th}>存储位置</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.accessionNo}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examType} · {r.studyDate} · {r.device}</div></td>
                <td style={styles.td}><div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6b7280' }}>{r.studyInstanceUID.substring(0, 30)}...</div></td>
                <td style={styles.td}>{r.seriesCount}序列 / {r.imageCount}帧</td>
                <td style={{ ...styles.td, fontWeight: 600, color: '#1e40af' }}>{r.storageSize} MB</td>
                <td style={styles.td}>{r.archiveDate}</td>
                <td style={styles.td}><Clock size={12} color="#6b7280" style={{ marginRight: '4px' }} />{r.expireDate}<div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.retention}</div></td>
                <td style={styles.td}>{r.location}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...statusBadge(r.archiveStatus) }}>{r.archiveStatus}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageArchivePage;
