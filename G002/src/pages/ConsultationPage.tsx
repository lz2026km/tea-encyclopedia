// ConsultationPage.tsx - 会诊协作管理
import React, { useState } from 'react';
import { Users, FileText, Clock, CheckCircle, AlertTriangle, Search, Plus, MessageSquare, ArrowRight } from 'lucide-react';

interface Consultation {
  id: string;
  caseId: string;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  examType: string;
  examItem: string;
  examDate: string;
  requestDept: string;
  requestDoctor: string;
  requestReason: string;
  consultedDept: string;
  consultedDoctor: string;
  consultedDate: string;
  responseDate: string;
  priority: '常规' | '紧急' | ' STAT';
  status: '待响应' | '会诊中' | '已完成' | '已取消';
  imageQuality: '优' | '良' | '差';
  findings: string;
  impression: string;
  suggestion: string;
  responseDays: number;
  notes: string;
}

const mockData: Consultation[] = [
  { id: 'C001', caseId: 'CASE2026050201', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '全身肿瘤筛查', examDate: '2026-05-02', requestDept: '肿瘤科', requestDoctor: '王主任', requestReason: '体检发现肺结节，需评估良恶性', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-02', responseDate: '2026-05-03', priority: '紧急', status: '已完成', imageQuality: '优', findings: '右肺上叶前段见一枚代谢增高结节，大小约1.8×1.5cm，SUVmax 5.2，延迟扫描代谢进一步增高。纵隔及右肺门未见明显肿大淋巴结。', impression: '右肺上叶恶性病变可能性大，建议穿刺活检', suggestion: '建议PET/CT引导下穿刺活检明确诊断，同时完善肿瘤标志物及胸部CT', responseDays: 1, notes: '' },
  { id: 'C002', caseId: 'CASE2026050202', patientId: 'P002', patientName: '王秀英', gender: '女', age: 55, examType: 'PET/CT', examItem: '肺部肿瘤分期', examDate: '2026-05-02', requestDept: '胸外科', requestDoctor: '李主任', requestReason: '左肺占位待分期，评估手术可能性', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-02', responseDate: '2026-05-03', priority: '紧急', status: '已完成', imageQuality: '优', findings: '左肺上叶见代谢显著增高肿块，大小约3.5×2.8cm，SUVmax 12.6。纵隔4R/5/6区见多发代谢增高淋巴结，大者约2.0×1.5cm。左肺门淋巴结转移。', impression: '左肺癌并纵隔淋巴结转移（cT2aN2M0，IIIA期）', suggestion: '建议新辅助化疗后重新评估手术可能性', responseDays: 1, notes: '' },
  { id: 'C003', caseId: 'CASE2026050203', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌评估', examDate: '2026-05-02', requestDept: '泌尿外科', requestDoctor: '赵主任', requestReason: '前列腺癌，评估PSMA表达及转移情况', consultedDept: '核医学科', consultedDoctor: '李晓东', consultedDate: '2026-05-02', responseDate: '2026-05-04', priority: '常规', status: '已完成', imageQuality: '良', findings: '前列腺明显增大，PSMA代谢不均匀增高，SUVmax 9.8。骨盆诸骨见多发PSMA高表达灶，符合骨转移。', impression: '前列腺癌伴骨转移（mCRPC）', suggestion: '建议行镥-177 PSMA治疗或化疗', responseDays: 2, notes: '图像有腹部呼吸运动伪影' },
  { id: 'C004', caseId: 'CASE2026050301', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'PET/CT', examItem: '淋巴瘤疗效评估', examDate: '2026-05-02', requestDept: '血液科', requestDoctor: '刘主任', requestReason: '弥漫大B细胞淋巴瘤4周期化疗后，评估疗效', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-02', responseDate: '2026-05-03', priority: '常规', status: '已完成', imageQuality: '优', findings: '与治疗前相比，原腹腔及腹膜后多发代谢增高灶明显缩小、代谢显著减低。Deauville评分2分。骨髓未见代谢异常。', impression: '淋巴瘤部分缓解（PR），疗效评价PR', suggestion: '继续当前治疗方案，2周期后再次评估', responseDays: 1, notes: '' },
  { id: 'C005', caseId: 'CASE2026050302', patientId: 'P008', patientName: '吴敏', gender: '女', age: 52, examType: 'PET/CT', examItem: '癫痫灶定位', examDate: '2026-05-02', requestDept: '神经内科', requestDoctor: '陈主任', requestReason: '难治性癫痫患者，术前评估致痫灶', consultedDept: '核医学科', consultedDoctor: '李晓东', consultedDate: '2026-05-03', responseDate: '2026-05-05', priority: '紧急', status: '已完成', imageQuality: '优', findings: '右侧颞叶内侧局部代谢减低SUV 3.2，余脑区代谢大致对称。双侧海马结构未见明确异常代谢改变。', impression: '右侧颞叶内侧致痫灶可能，建议结合EEG及MRI综合判断', suggestion: '建议发作期EEG及高分辨率海马MRI进一步评估', responseDays: 2, notes: '' },
  { id: 'C006', caseId: 'CASE2026050303', patientId: 'P011', patientName: '黄建国', gender: '男', age: 75, examType: 'PET/CT', examItem: '阿尔茨海默病评估', examDate: '2026-05-03', requestDept: '神经内科', requestDoctor: '陈主任', requestReason: '认知功能下降3年，评估脑β-淀粉样蛋白沉积', consultedDept: '核医学科', consultedDoctor: '李晓东', consultedDate: '2026-05-04', responseDate: '2026-05-06', priority: '常规', status: '已完成', imageQuality: '优', findings: '双侧额顶叶及扣带回后部脑皮质AV45代谢显著增高，SUV 2.1。尾状核代谢轻度增高。SUV比值1.11。', impression: '脑β-淀粉样蛋白阳性，符合阿尔茨海默病早期改变', suggestion: '结合临床量表评估，建议多奈哌齐治疗', responseDays: 2, notes: '' },
  { id: 'C007', caseId: 'CASE2026050304', patientId: 'P014', patientName: '李秀兰', gender: '女', age: 67, examType: 'PET/CT', examItem: '胰腺癌分期', examDate: '2026-05-04', requestDept: '消化内科', requestDoctor: '张主任', requestReason: 'CA19-9升高，胰腺占位待分期', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-05', responseDate: '2026-05-06', priority: '紧急', status: '已完成', imageQuality: '优', findings: '胰腺体部见代谢显著增高肿块，大小约3.2×2.5cm，SUVmax 7.8。肝S5段见一枚代谢增高小结节，大小约0.8cm，SUVmax 6.2。余未见明确转移。', impression: '胰腺体部癌并肝转移（cT2N0M1，IV期）', suggestion: '建议姑息化疗，不宜手术切除', responseDays: 1, notes: '' },
  { id: 'C008', caseId: 'CASE2026050401', patientId: 'P017', patientName: '陈志强', gender: '男', age: 73, examType: 'PET/CT', examItem: '食管癌术后评估', examDate: '2026-05-05', requestDept: '胸外科', requestDoctor: '李主任', requestReason: '食管癌术后3月，评估有无复发转移', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-06', responseDate: '2026-05-07', priority: '常规', status: '已完成', imageQuality: '良', findings: '食管癌术后改变，吻合口区未见明确代谢异常增高三周。未见明确区域淋巴结转移或远处转移征象。', impression: '食管癌术后未见明确复发或转移征象', suggestion: '定期随访，3月后再次PET/CT评估', responseDays: 1, notes: '食管支架金属伪影，局部评估受限' },
  { id: 'C009', caseId: 'CASE2026050402', patientId: 'P022', patientName: '吴芳', gender: '女', age: 42, examType: 'PET/CT', examItem: '宫颈癌分期', examDate: '2026-05-06', requestDept: '妇科', requestDoctor: '孙主任', requestReason: '宫颈鳞癌术后病理，评估分期及预后', consultedDept: '核医学科', consultedDoctor: '李晓东', consultedDate: '2026-05-07', responseDate: '2026-05-08', priority: '紧急', status: '已完成', imageQuality: '优', findings: '宫颈局部未见明确代谢异常。盆腔及腹主动脉旁未见肿大淋巴结。全身其余部位未见明确转移征象。', impression: '宫颈癌术后改变，未见明确复发或转移（IIIC1p期待确认）', suggestion: '建议补充放疗，定期随访', responseDays: 1, notes: '' },
  { id: 'C010', caseId: 'CASE2026050403', patientId: 'P025', patientName: '徐志远', gender: '男', age: 58, examType: 'PET/CT', examItem: '胃癌术前分期', examDate: '2026-05-07', requestDept: '普外科', requestDoctor: '周主任', requestReason: '胃镜确诊胃腺癌，评估术前分期', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-07', responseDate: '', priority: '紧急', status: '会诊中', imageQuality: '优', findings: '', impression: '', suggestion: '', responseDays: 0, notes: '已发送会诊请求，等待核医学科反馈' },
  { id: 'C011', caseId: 'CASE2026050404', patientId: 'P001', patientName: '李建国', gender: '男', age: 62, examType: 'PET/CT', examItem: '肺癌疗效评估', examDate: '2026-05-07', requestDept: '肿瘤科', requestDoctor: '王主任', requestReason: '右肺癌靶向治疗2月后，评估疗效', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-07', responseDate: '', priority: '紧急', status: '待响应', imageQuality: '优', findings: '', impression: '', suggestion: '', responseDays: 0, notes: '紧急会诊，需48小时内完成' },
  { id: 'C012', caseId: 'CASE2026050405', patientId: 'P003', patientName: '张志明', gender: '男', age: 71, examType: 'PET/CT', examItem: '前列腺癌复查', examDate: '2026-05-07', requestDept: '泌尿外科', requestDoctor: '赵主任', requestReason: '前列腺癌ADT治疗后3月，评估治疗反应', consultedDept: '核医学科', consultedDoctor: '李晓东', consultedDate: '2026-05-07', responseDate: '2026-05-08', priority: '常规', status: '已完成', imageQuality: '优', findings: '前列腺PSMA代谢较前略有减低，SUVmax 8.2（前次9.8）。骨转移灶PSMA表达未见明确变化。', impression: '前列腺癌ADT治疗部分有效，PSA及PSMA代谢均有所下降', suggestion: '继续当前ADT方案，1月后复查PSA', responseDays: 1, notes: '' },
  { id: 'C013', caseId: 'CASE2026050501', patientId: 'P004', patientName: '陈丽华', gender: '女', age: 48, examType: 'SPECT', examItem: '静息心肌灌注显像', examDate: '2026-05-08', requestDept: '心内科', requestDoctor: '胡主任', requestReason: '胸闷待查，评估心肌缺血情况', consultedDept: '核医学科', consultedDoctor: '王丽华', consultedDate: '2026-05-08', responseDate: '2026-05-08', priority: '紧急', status: '已完成', imageQuality: '优', findings: '静息心肌灌注显像示左心室各壁未见明确灌注缺损。前壁、前侧壁、后壁及后侧壁代谢分布均匀。', impression: '静息心肌灌注显像未见明确异常', suggestion: '建议结合负荷心肌显像综合评估，或行冠脉CTA检查', responseDays: 0, notes: '' },
  { id: 'C014', caseId: 'CASE2026050502', patientId: 'P005', patientName: '赵德明', gender: '男', age: 59, examType: 'NM', examItem: '淋巴瘤复查', examDate: '2026-05-08', requestDept: '血液科', requestDoctor: '刘主任', requestReason: '弥漫大B细胞淋巴瘤6周期化疗后，评估疗效及骨髓状态', consultedDept: '核医学科', consultedDoctor: '王丽华', consultedDate: '2026-05-08', responseDate: '2026-05-08', priority: '常规', status: '已完成', imageQuality: '优', findings: '全身骨显像未见明确异常骨代谢灶。骨髓未见明确放射性分布异常。', impression: '骨髓未见明确淋巴瘤侵犯征象', suggestion: '结合PET/CT综合评估淋巴瘤活性', responseDays: 0, notes: '' },
  { id: 'C015', caseId: 'CASE2026050503', patientId: 'P007', patientName: '黄婷', gender: '女', age: 36, examType: 'PET/CT', examItem: '不孕症评估', examDate: '2026-05-09', requestDept: '生殖医学科', requestDoctor: '罗主任', requestReason: '不孕症患者，评估子宫内膜及附件情况', consultedDept: '核医学科', consultedDoctor: '张明华', consultedDate: '2026-05-09', responseDate: '', priority: '常规', status: '待响应', imageQuality: '优', findings: '', impression: '', suggestion: '', responseDays: 0, notes: '' },
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

const ConsultationPage: React.FC = () => {
  const [records] = useState<Consultation[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const statuses = ['全部', '待响应', '会诊中', '已完成', '已取消'];
  const filtered = records.filter(r => {
    const matchSearch = r.patientName.includes(search) || r.caseId.includes(search) || r.requestDept.includes(search);
    const matchStatus = statusFilter === '全部' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const completedCount = records.filter(r => r.status === '已完成').length;
  const pendingCount = records.filter(r => r.status === '待响应' || r.status === '会诊中').length;
  const avgResponseDays = (records.filter(r => r.responseDays > 0).reduce((s, r) => s + r.responseDays, 0) / records.filter(r => r.responseDays > 0).length).toFixed(1);

  const statusBadge = (s: string) => {
    if (s === '已完成') return { bg: '#d1fae5', color: '#047857' };
    if (s === '会诊中') return { bg: '#fef3c7', color: '#b45309' };
    if (s === '待响应') return { bg: '#dbeafe', color: '#1e40af' };
    return { bg: '#f3f4f6', color: '#6b7280' };
  };

  const priorityBadge = (p: string) => {
    if (p === '紧急') return { bg: '#fee2e2', color: '#dc2626' };
    if (p === 'STAT') return { bg: '#dc2626', color: '#fff' };
    return { bg: '#f3f4f6', color: '#6b7280' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>会诊协作管理</h2>
        <p style={styles.subtitle}>多学科会诊 · 影像诊断协作 · 会诊时效追踪</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><Users size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{records.length}</div><div style={styles.statLabel}>会诊总数</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{completedCount}</div><div style={styles.statLabel}>已完成</div></div>
        <div style={styles.statCard}><Clock size={16} style={{ color: '#3b82f6', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#3b82f6' }}>{pendingCount}</div><div style={styles.statLabel}>待完成</div></div>
        <div style={styles.statCard}><MessageSquare size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{avgResponseDays}天</div><div style={styles.statLabel}>平均响应时间</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索患者/会诊ID/科室..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {statuses.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: statusFilter === s ? '#1e40af' : '#d1d5db', background: statusFilter === s ? '#1e40af' : '#fff', color: statusFilter === s ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{s}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>患者</th>
              <th style={styles.th}>检查项目</th>
              <th style={styles.th}>会诊科室</th>
              <th style={styles.th}>申请医生</th>
              <th style={styles.th}>会诊医生</th>
              <th style={styles.th}>优先级</th>
              <th style={styles.th}>响应天数</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.patientName}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.patientId} · {r.gender} · {r.age}岁</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.caseId}</div></td>
                <td style={styles.td}><div style={{ fontWeight: 500 }}>{r.examItem}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.examType} · {r.examDate}</div><div style={{ fontSize: '11px', color: '#6b7280' }}>{r.requestReason.substring(0, 30)}...</div></td>
                <td style={styles.td}>{r.requestDept}<ArrowRight size={12} color="#9ca3af" style={{ margin: '2px' }} />{r.consultedDept}</td>
                <td style={styles.td}><div>{r.requestDoctor}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.consultedDate}</div></td>
                <td style={styles.td}><div>{r.consultedDoctor}</div>{r.responseDate && <div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.responseDate}</div>}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...priorityBadge(r.priority) }}>{r.priority}</span></td>
                <td style={styles.td}>{r.responseDays > 0 ? <span style={{ fontWeight: 600, color: r.responseDays > 2 ? '#dc2626' : '#374151' }}>{r.responseDays}天</span> : '-'}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, ...statusBadge(r.status) }}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationPage;
