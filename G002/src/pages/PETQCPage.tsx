// PETQCPage.tsx - PET图像质量评价
import React, { useState } from 'react';
import { Image, Star, AlertTriangle, CheckCircle, Search, Gauge, Eye, XCircle } from 'lucide-react';

interface PETQCRecord {
  id: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  examDate: string;
  device: string;
  doctor: string;
  seriesCount: number;
  imageCount: number;
  suvMax: number;
  suvPeak: number;
  liverSUV: number;
  suvRatio: number;
  qualityGrade: 'A' | 'B' | 'C' | 'D';
  artifactType: '无' | '运动' | '呼吸' | '金属' | '射线' | '注射外渗' | '设备';
  artifactNote: string;
  fdgUptake: 0 | 1 | 2 | 3 | 4;
  diagnosis: string;
  status: '待评价' | '已评价';
}

const mockData: PETQCRecord[] = [
  { id: 'PQ001', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '全身肿瘤筛查', examDate: '2026-05-02', device: 'PET/CT-01', doctor: '张明华', seriesCount: 8, imageCount: 1200, suvMax: 8.2, suvPeak: 6.5, liverSUV: 2.1, suvRatio: 3.90, qualityGrade: 'A', artifactType: '无', artifactNote: '图像质量优良', fdgUptake: 4, diagnosis: '右肺上叶恶性病变可能性大', status: '已评价' },
  { id: 'PQ002', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, examType: 'PET/CT', examItem: '肺部肿瘤分期', examDate: '2026-05-02', device: 'PET/CT-01', doctor: '张明华', seriesCount: 7, imageCount: 1100, suvMax: 12.6, suvPeak: 10.2, liverSUV: 2.0, suvRatio: 6.30, qualityGrade: 'A', artifactType: '无', artifactNote: '代谢明显增高，图像清晰', fdgUptake: 4, diagnosis: '左肺癌并纵隔淋巴结转移', status: '已评价' },
  { id: 'PQ003', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌评估', examDate: '2026-05-02', device: 'PET/CT-01', doctor: '李晓东', seriesCount: 9, imageCount: 1350, suvMax: 9.8, suvPeak: 8.1, liverSUV: 2.2, suvRatio: 4.45, qualityGrade: 'B', artifactType: '运动', artifactNote: '腹部轻度呼吸运动伪影', fdgUptake: 3, diagnosis: '前列腺癌，PSMA高表达', status: '已评价' },
  { id: 'PQ004', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤疗效评估', examDate: '2026-05-02', device: 'PET/CT-02', doctor: '张明华', seriesCount: 8, imageCount: 1180, suvMax: 5.6, suvPeak: 4.8, liverSUV: 2.0, suvRatio: 2.80, qualityGrade: 'A', artifactType: '无', artifactNote: 'Deauville评分2分，治疗有效', fdgUptake: 2, diagnosis: '淋巴瘤部分缓解', status: '已评价' },
  { id: 'PQ005', patientId: 'P006', patientName: '刘芳', gender: '女', age: 66, examType: 'PET/CT', examItem: '肿瘤标志物升高查因', examDate: '2026-05-02', device: 'PET/CT-01', doctor: '李晓东', seriesCount: 7, imageCount: 1050, suvMax: 3.2, suvPeak: 2.8, liverSUV: 1.9, suvRatio: 1.68, qualityGrade: 'C', artifactType: '注射外渗', artifactNote: '左手背外渗，部分图像定量受影响', fdgUptake: 1, diagnosis: '图像质量欠佳，SUV仅供参考', status: '已评价' },
  { id: 'PQ006', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '癫痫灶定位', examDate: '2026-05-02', device: 'PET/CT-01', doctor: '李晓东', seriesCount: 7, imageCount: 1050, suvMax: 9.8, suvPeak: 7.5, liverSUV: 2.0, suvRatio: 4.90, qualityGrade: 'A', artifactType: '无', artifactNote: '脑部PET图像清晰', fdgUptake: 4, diagnosis: '右侧颞叶内侧代谢减低，致痫灶可能', status: '已评价' },
  { id: 'PQ007', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, examType: 'PET/CT', examItem: '阿尔茨海默病评估', examDate: '2026-05-03', device: 'PET/CT-01', doctor: '李晓东', seriesCount: 9, imageCount: 1300, suvMax: 2.1, suvPeak: 1.8, liverSUV: 1.9, suvRatio: 1.11, qualityGrade: 'A', artifactType: '无', artifactNote: '脑部AV45图像质量优良', fdgUptake: 0, diagnosis: '脑β-淀粉样蛋白阳性，符合AD早期', status: '已评价' },
  { id: 'PQ008', patientId: 'P013', patientName: '马建军', gender: '男', age: 45, examType: 'PET/CT', examItem: '结直肠癌术后复查', examDate: '2026-05-04', device: 'PET/CT-01', doctor: '张明华', seriesCount: 8, imageCount: 1180, suvMax: 3.2, suvPeak: 2.8, liverSUV: 2.0, suvRatio: 1.60, qualityGrade: 'B', artifactType: '呼吸', artifactNote: '下肺野外带轻度呼吸伪影', fdgUptake: 1, diagnosis: '肝S5小结节，转移不除外', status: '已评价' },
  { id: 'PQ009', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, examType: 'PET/CT', examItem: '胰腺癌分期', examDate: '2026-05-04', device: 'PET/CT-02', doctor: '李晓东', seriesCount: 8, imageCount: 1150, suvMax: 7.8, suvPeak: 6.2, liverSUV: 1.9, suvRatio: 4.11, qualityGrade: 'A', artifactType: '无', artifactNote: '胰腺病变显示清晰', fdgUptake: 4, diagnosis: '胰腺体部癌并肝转移', status: '已评价' },
  { id: 'PQ010', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, examType: 'PET/CT', examItem: '食管癌术后评估', examDate: '2026-05-05', device: 'PET/CT-01', doctor: '张明华', seriesCount: 8, imageCount: 1220, suvMax: 4.5, suvPeak: 3.8, liverSUV: 2.1, suvRatio: 2.14, qualityGrade: 'B', artifactType: '金属', artifactNote: '食管支架金属伪影，局部定量受限', fdgUptake: 2, diagnosis: '食管癌术后未见明确复发', status: '已评价' },
  { id: 'PQ011', patientId: 'P019', patientName: '刘建华', gender: '男', age: 55, examType: 'PET/CT', examItem: '甲状腺癌碘治疗后评估', examDate: '2026-05-05', device: 'PET/CT-02', doctor: '李晓东', seriesCount: 7, imageCount: 1080, suvMax: 5.6, suvPeak: 4.5, liverSUV: 1.8, suvRatio: 3.11, qualityGrade: 'A', artifactType: '无', artifactNote: '颈部淋巴结SUV偏高', fdgUptake: 3, diagnosis: '左颈部淋巴结转移', status: '已评价' },
  { id: 'PQ012', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, examType: 'PET/CT', examItem: '宫颈癌分期', examDate: '2026-05-06', device: 'PET/CT-01', doctor: '李晓东', seriesCount: 8, imageCount: 1200, suvMax: 8.5, suvPeak: 6.8, liverSUV: 1.9, suvRatio: 4.47, qualityGrade: 'A', artifactType: '无', artifactNote: '盆腔图像质量优良', fdgUptake: 4, diagnosis: '宫颈癌术后复发', status: '已评价' },
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
  gradeA: { background: '#d1fae5', color: '#047857' },
  gradeB: { background: '#dbeafe', color: '#1e40af' },
  gradeC: { background: '#fef3c7', color: '#b45309' },
  gradeD: { background: '#fee2e2', color: '#dc2626' },
  uptakeDot: { display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', textAlign: 'center' as const, lineHeight: '20px', fontSize: '11px', fontWeight: 700 },
  artifactBadge: { display: 'inline-block', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' },
};

const gradeColors: Record<string, React.CSSProperties> = {
  A: styles.gradeA,
  B: styles.gradeB,
  C: styles.gradeC,
  D: styles.gradeD,
};

const uptakeColors: Record<number, string> = {
  0: '#9ca3af', 1: '#3b82f6', 2: '#10b981', 3: '#f59e0b', 4: '#dc2626'
};

const PETQCPage: React.FC = () => {
  const [records] = useState<PETQCRecord[]>(mockData);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('全部');

  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.patientId.includes(search);
    const matchGrade = gradeFilter === '全部' || r.qualityGrade === gradeFilter;
    return matchSearch && matchGrade;
  });

  const gradeACount = records.filter(r => r.qualityGrade === 'A').length;
  const avgSUV = (records.reduce((sum, r) => sum + r.suvMax, 0) / records.length).toFixed(1);
  const artifactCount = records.filter(r => r.artifactType !== '无').length;
  const failCount = records.filter(r => r.qualityGrade === 'D').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>PET图像质量评价</h2>
        <p style={styles.subtitle}>SUV定量分析、伪影记录、FDG摄取分级</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Image size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>总评价数</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={styles.statValue}>{gradeACount}</div><div style={styles.statLabel}>优质(A级)</div></div>
        <div style={styles.statCard}><Gauge size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{avgSUV}</div><div style={styles.statLabel}>平均SUVmax</div></div>
        <div style={styles.statCard}><AlertTriangle size={16} style={{ color: '#b45309', marginBottom: '4px' }} /><div style={styles.statValue}>{artifactCount}</div><div style={styles.statLabel}>有伪影</div></div>
        <div style={styles.statCard}><XCircle size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={styles.statValue}>{failCount}</div><div style={styles.statLabel}>不合格</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', 'A', 'B', 'C', 'D'].map(g => (
          <button key={g} onClick={() => setGradeFilter(g)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: gradeFilter === g ? '#1e40af' : '#d1d5db', background: gradeFilter === g ? '#1e40af' : '#fff', color: gradeFilter === g ? '#fff' : '#374151', cursor: 'pointer', fontSize: '13px' }}>{g === '全部' ? '全部' : `A级(${g})`}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查</th>
              <th style={styles.th}>SUVmax</th>
              <th style={styles.th}>SUVpeak</th>
              <th style={styles.th}>肝SUV</th>
              <th style={styles.th}>T/L比值</th>
              <th style={styles.th}>等级</th>
              <th style={styles.th}>伪影</th>
              <th style={styles.th}>FDG摄取</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examDate} · {r.device}</div></td>
                <td style={{ ...styles.td, color: r.suvMax > 4.5 ? '#dc2626' : '#374151', fontWeight: 600, fontSize: '14px' }}>{r.suvMax}</td>
                <td style={styles.td}>{r.suvPeak}</td>
                <td style={styles.td}>{r.liverSUV}</td>
                <td style={{ ...styles.td, color: r.suvRatio > 2.5 ? '#dc2626' : '#374151', fontWeight: r.suvRatio > 2.5 ? 600 : 400 }}>{r.suvRatio.toFixed(2)}</td>
                <td style={styles.td}><span style={{ ...styles.artifactBadge, ...gradeColors[r.qualityGrade] }}>A级</span></td>
                <td style={styles.td}>
                  {r.artifactType === '无' ? <span style={{ color: '#047857', fontSize: '12px' }}>✓ 无</span> : <span style={{ color: '#b45309', fontSize: '12px' }}>⚠ {r.artifactType}</span>}
                </td>
                <td style={styles.td}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <span key={i} style={{ ...styles.uptakeDot, background: i <= r.fdgUptake ? uptakeColors[r.fdgUptake] : '#f3f4f6', color: i <= r.fdgUptake ? '#fff' : '#9ca3af', marginRight: '2px' }}>{i}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PETQCPage;
