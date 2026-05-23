// TeachingCasePage.tsx - 教学病例库
import React, { useState } from 'react';
import { BookOpen, Search, Star, Clock, User, Eye, CheckCircle, FileText } from 'lucide-react';

interface TeachingCase {
  id: string;
  caseNo: string;
  category: string;
  diseaseName: string;
  modality: string;
  keyFindings: string;
  differentialDiagnosis: string;
  teachingPoints: string[];
  difficulty: '基础' | '进阶' | '高级';
  age: number;
  gender: string;
  chiefComplaint: string;
  clinicalHistory: string;
  petFindings: string;
  spectFindings: string;
  finalDiagnosis: string;
  author: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
  status: '已发布' | '待审核' | '草稿';
  comments: number;
}

const mockData: TeachingCase[] = [
  { id: 'TC001', caseNo: 'NM-TEACH-2026-001', category: '肿瘤PET/CT', diseaseName: '右肺癌并纵隔淋巴结转移', modality: 'PET/CT', keyFindings: '右肺上叶代谢显著增高肿块SUVmax 12.6，纵隔4R/5/6区淋巴结转移', differentialDiagnosis: '需与结核性淋巴结炎、结节病鉴别', teachingPoints: ['肺癌PET/CT分期标准', '纵隔淋巴结分区', 'SUVmax阈值意义', 'FDG PET/CT在肺癌TNM分期中的应用'], difficulty: '进阶', age: 55, gender: '女', chiefComplaint: '体检发现肺占位2周', clinicalHistory: '无吸烟史，肿瘤标志物CA125升高', petFindings: '右肺上叶前段代谢增高肿块3.5×2.8cmSUVmax12.6，纵隔多发淋巴结转移', spectFindings: '无', finalDiagnosis: '左肺癌（腺癌）并纵隔淋巴结转移IIIA期', author: '张明华', createdDate: '2026-04-15', viewCount: 256, likeCount: 45, tags: ['肺癌', '纵隔淋巴结', 'SUVmax', 'TNM分期'], status: '已发布', comments: 12 },
  { id: 'TC002', caseNo: 'NM-TEACH-2026-002', category: '神经PET', diseaseName: '右侧颞叶癫痫灶定位', modality: 'PET/CT', keyFindings: '右侧颞叶内侧局部代谢减低SUV 3.2，对侧正常SUV 4.5', differentialDiagnosis: '需与生理性非对称、创伤后改变鉴别', teachingPoints: ['脑FDG PET正常代谢分布', '癫痫发作期与发作间期PET代谢变化', 'SUV在脑PET中的参考价值有限'], difficulty: '高级', age: 42, gender: '女', chiefComplaint: '反复意识丧失伴四肢抽搐3年', clinicalHistory: '药物难治性癫痫，MRI未见明确结构异常', petFindings: '右侧颞叶内侧局部代谢减低SUV 3.2（较对侧减低约29%）', spectFindings: '无', finalDiagnosis: '右侧颞叶内侧癫痫灶（MRI阴性PET阳性病例）', author: '李晓东', createdDate: '2026-04-18', viewCount: 198, likeCount: 38, tags: ['癫痫', '脑PET', '代谢减低', '术前定位'], status: '已发布', comments: 8 },
  { id: 'TC003', caseNo: 'NM-TEACH-2026-003', category: '前列腺癌PSMA', diseaseName: '前列腺癌多发骨转移（mCRPC）', modality: 'PET/CT', keyFindings: '前列腺PSMA代谢不均匀增高SUVmax 9.8，骨盆及脊柱多发PSMA高表达转移灶', differentialDiagnosis: '需与良性骨病变、退行性变鉴别', teachingPoints: ['PSMA PET与FDG PET在前列腺癌中的互补价值', '骨转移的PSMA表达异质性', '去势抵抗性前列腺癌(CRPC)的分子影像'], difficulty: '进阶', age: 71, gender: '男', chiefComplaint: 'PSA升高2月余', clinicalHistory: '前列腺癌根治术后生化复发，睾酮去势水平', petFindings: '前列腺区PSMA代谢增高SUVmax 9.8，骨盆骨多发PSMA高表达灶', spectFindings: '骨显像：多发骨转移', finalDiagnosis: '前列腺癌去势抵抗性(mCRPC)伴多发骨转移', author: '张明华', createdDate: '2026-04-20', viewCount: 165, likeCount: 32, tags: ['前列腺癌', 'PSMA', '骨转移', 'mCRPC'], status: '已发布', comments: 6 },
  { id: 'TC004', caseNo: 'NM-TEACH-2026-004', category: '淋巴瘤疗效评估', diseaseName: '弥漫大B细胞淋巴瘤化疗后部分缓解', modality: 'PET/CT', keyFindings: 'Deauville评分2分，原代谢活跃灶明显缩小、代谢显著减低', differentialDiagnosis: '完全缓解(CR) vs 部分缓解(PR) vs 疾病进展(PD)', teachingPoints: ['Deauville五分制评分标准', 'Lugano 2014淋巴瘤疗效评估标准', 'PET/CT在淋巴瘤治疗中期评估中的价值'], difficulty: '进阶', age: 59, gender: '男', chiefComplaint: '弥漫大B细胞淋巴瘤4周期化疗后评估', clinicalHistory: '2周期化疗后PET示部分缓解，继续当前方案2周期后再评', petFindings: '腹腔及腹膜后多发代谢灶明显缩小SUVmax从8.2降至2.8，Deauville 2分', spectFindings: '无', finalDiagnosis: '淋巴瘤部分缓解(PR)，建议继续当前方案', author: '李晓东', createdDate: '2026-04-22', viewCount: 142, likeCount: 28, tags: ['淋巴瘤', 'Deauville', '疗效评估', '五分制'], status: '已发布', comments: 5 },
  { id: 'TC005', caseNo: 'NM-TEACH-2026-005', category: '阿尔茨海默病', diseaseName: '脑β-淀粉样蛋白阳性（AD早期）', modality: 'PET/CT', keyFindings: '双侧额顶叶及扣带回后部AV45代谢显著增高SUV 2.1', differentialDiagnosis: '需与路易体痴呆、血管性痴呆鉴别', teachingPoints: ['AV45 amyloid PET显像原理', 'AD早期典型PET代谢模式', 'Amyloid PET阴性排除价值'], difficulty: '高级', age: 75, gender: '男', chiefComplaint: '记忆力下降3年，加重半年', clinicalHistory: 'MMSE评分22分，日常生活基本自理', petFindings: '双侧额顶叶AV45代谢显著增高SUV 2.1，符合β-淀粉样蛋白沉积', spectFindings: '无', finalDiagnosis: '阿尔茨海默病（早期）', author: '王丽华', createdDate: '2026-04-25', viewCount: 188, likeCount: 42, tags: ['阿尔茨海默', 'AV45', 'β-淀粉样蛋白', ' amyloid PET'], status: '已发布', comments: 9 },
  { id: 'TC006', caseNo: 'NM-TEACH-2026-006', category: '心肌SPECT', diseaseName: '心肌灌注正常（筛查案例）', modality: 'SPECT', keyFindings: '静息心肌灌注分布均匀，无明确灌注缺损', differentialDiagnosis: '排除心肌缺血', teachingPoints: ['正常心肌SPECT灌注图像特征', '负荷+静息心肌灌注显像判读流程', '伪影识别（女性乳房衰减伪影）'], difficulty: '基础', age: 48, gender: '女', chiefComplaint: '间断胸闷1年余', clinicalHistory: '心电图运动试验阴性，冠脉CTA未见狭窄', petFindings: '无', spectFindings: '静息心肌灌注显像：左心室各壁灌注分布均匀，无明确灌注缺损', finalDiagnosis: '心肌灌注显像未见明显异常', author: '王丽华', createdDate: '2026-04-28', viewCount: 320, likeCount: 55, tags: ['心肌灌注', 'SPECT', '正常变异', '伪影识别'], status: '已发布', comments: 15 },
  { id: 'TC007', caseNo: 'NM-TEACH-2026-007', category: '骨显像', diseaseName: '多发骨转移瘤（乳腺癌术后）', modality: 'SPECT', keyFindings: '全身多发骨代谢异常灶，以中轴骨为著', differentialDiagnosis: '需与骨质疏松症、退行性变、骨结核鉴别', teachingPoints: ['乳腺癌骨转移典型分布', '骨显像阳性病灶定性分析', '骨扫描在恶性肿瘤分期中的应用'], difficulty: '基础', age: 52, gender: '女', chiefComplaint: '右乳腺癌术后2年，腰背痛2月', clinicalHistory: '右乳腺癌改良根治术，ER+/HER2-，术后他莫昔芬治疗', petFindings: '无', spectFindings: '全身骨显像：颅骨、胸腰椎、骨盆、双侧肋骨见多发骨代谢异常灶，符合转移', finalDiagnosis: '右乳腺癌术后多发骨转移', author: '王丽华', createdDate: '2026-05-02', viewCount: 95, likeCount: 18, tags: ['乳腺癌', '骨转移', '骨显像', 'SPECT'], status: '已发布', comments: 3 },
  { id: 'TC008', caseNo: 'NM-TEACH-2026-008', category: '核素治疗', diseaseName: '甲状腺功能亢进131I治疗', modality: 'OT', keyFindings: 'Graves病，甲状腺摄碘率显著增高，治疗剂量计算', differentialDiagnosis: '毒性多结节性甲状腺肿', teachingPoints: ['131I治疗甲亢的适应证', '剂量计算公式（Thyroid Uptake Therapy）', '治疗前准备与治疗后随访'], difficulty: '进阶', age: 38, gender: '女', chiefComplaint: '心悸、多汗、手抖3月', clinicalHistory: '甲亢病史1年，药物治疗效果欠佳', petFindings: '无', spectFindings: '甲状腺摄碘率：2小时45%，24小时72%，符合甲亢诊断', finalDiagnosis: 'Graves病，建议131I治疗', author: '张明华', createdDate: '2026-05-05', viewCount: 78, likeCount: 22, tags: ['甲亢', '131I', '核素治疗', '摄碘率'], status: '已发布', comments: 4 },
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
  caseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' },
  caseCard: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.2s' },
  caseCardHover: { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  tag: { display: 'inline-block', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: '#eff6ff', color: '#1e40af', marginRight: '4px', marginBottom: '4px' },
};

const difficultyColor: Record<string, string> = {
  '基础': '#047857',
  '进阶': '#1e40af',
  '高级': '#dc2626',
};

const TeachingCasePage: React.FC = () => {
  const [cases] = useState<TeachingCase[]>(mockData);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('全部');

  const filtered = cases.filter(c => {
    const matchSearch = c.diseaseName.includes(search) || c.category.includes(search) || c.tags.some(t => t.includes(search));
    const matchDiff = diffFilter === '全部' || c.difficulty === diffFilter;
    return matchSearch && matchDiff;
  });

  const totalViews = cases.reduce((s, c) => s + c.viewCount, 0);
  const totalLikes = cases.reduce((s, c) => s + c.likeCount, 0);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>教学病例库</h2>
        <p style={styles.subtitle}>核医学典型/疑难病例教学资源 · 诊断思路训练</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><BookOpen size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{cases.length}</div><div style={styles.statLabel}>教学病例</div></div>
        <div style={styles.statCard}><Eye size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalViews}</div><div style={styles.statLabel}>总浏览</div></div>
        <div style={styles.statCard}><Star size={16} style={{ color: '#f59e0b', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#f59e0b' }}>{totalLikes}</div><div style={styles.statLabel}>总收藏</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={styles.statValue}>{cases.filter(c => c.status === '已发布').length}</div><div style={styles.statLabel}>已发布</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索疾病/分类/标签..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {['全部', '基础', '进阶', '高级'].map(d => (
          <button key={d} onClick={() => setDiffFilter(d)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: diffFilter === d ? '#1e40af' : '#d1d5db', background: diffFilter === d ? '#1e40af' : '#fff', color: diffFilter === d ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{d === '全部' ? '全部难度' : `难度${d}`}</button>
        ))}
      </div>

      <div style={styles.caseGrid}>
        {filtered.map(c => (
          <div key={c.id} style={styles.caseCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: '#eff6ff', color: '#1e40af', marginRight: '6px' }}>{c.modality}</span>
                <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: difficultyColor[c.difficulty] === '#047857' ? '#d1fae5' : difficultyColor[c.difficulty] === '#1e40af' ? '#dbeafe' : '#fee2e2', color: difficultyColor[c.difficulty] }}>{c.difficulty}</span>
              </div>
              <span style={{ fontSize: '10px', color: '#9ca3af' }}>{c.caseNo}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e40af', marginBottom: '6px' }}>{c.diseaseName}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}><User size={11} style={{ marginRight: '4px' }} />{c.gender} · {c.age}岁 · {c.chiefComplaint}</div>
            <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: '1.5' }}>
              <div style={{ fontWeight: 500, color: '#1e40af' }}>影像所见：</div>
              <div>{c.petFindings || c.spectFindings}</div>
            </div>
            <div style={{ fontSize: '11px', color: '#047857', marginBottom: '8px', fontWeight: 500 }}>最终诊断：{c.finalDiagnosis}</div>
            <div style={{ marginBottom: '8px' }}>{c.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: '8px' }}>
              <span>{c.author} · {c.createdDate}</span>
              <span><Eye size={11} style={{ marginRight: '2px' }} />{c.viewCount} <Star size={11} style={{ marginRight: '2px', marginLeft: '8px' }} />{c.likeCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingCasePage;
