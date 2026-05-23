// ReportTemplatePage.tsx - 报告模板管理
import React, { useState } from 'react';
import { FileText, Printer, Search, CheckCircle, Clock, Edit3, Trash2, Copy, Download, Plus } from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  modality: string;
  language: string;
  version: string;
  author: string;
  lastModified: string;
  usageCount: number;
  lastUsed: string;
  department: string;
  tags: string[];
  description: string;
  isDefault: boolean;
  isActive: boolean;
}

const mockData: ReportTemplate[] = [
  { id: 'T001', name: 'PET/CT全身肿瘤筛查报告模板', category: '肿瘤筛查', modality: 'PET/CT', language: '中文', version: '3.2', author: '张明华', lastModified: '2026-04-15', usageCount: 856, lastUsed: '2026-05-07', department: '核医学科', tags: ['肿瘤', '全身', '18F-FDG'], description: '适用于全身18F-FDG PET/CT肿瘤筛查的标准报告模板', isDefault: true, isActive: true },
  { id: 'T002', name: 'PET/CT肺癌分期报告模板', category: '肿瘤分期', modality: 'PET/CT', language: '中文', version: '2.1', author: '李晓东', lastModified: '2026-04-10', usageCount: 423, lastUsed: '2026-05-07', department: '核医学科', tags: ['肺癌', '分期', '18F-FDG'], description: '专用于肺癌TNM分期的PET/CT报告模板', isDefault: false, isActive: true },
  { id: 'T003', name: 'PET/CT淋巴瘤疗效评估模板', category: '疗效评估', modality: 'PET/CT', language: '中文', version: '2.0', author: '张明华', lastModified: '2026-03-20', usageCount: 218, lastUsed: '2026-05-06', department: '核医学科', tags: ['淋巴瘤', 'Deauville', '疗效'], description: '淋巴瘤Deauville评分专用报告模板，含5分制评估', isDefault: false, isActive: true },
  { id: 'T004', name: 'PET/CT前列腺癌PSMA报告模板', category: '肿瘤分期', modality: 'PET/CT', language: '中文', version: '1.5', author: '李晓东', lastModified: '2026-04-05', usageCount: 156, lastUsed: '2026-05-05', department: '核医学科', tags: ['前列腺癌', 'PSMA', '18F'], description: '18F-PSMA PET/CT前列腺癌专用报告模板', isDefault: false, isActive: true },
  { id: 'T005', name: 'PET/CT癫痫灶定位报告模板', category: '功能神经', modality: 'PET/CT', language: '中文', version: '1.8', author: '王丽华', lastModified: '2026-03-28', usageCount: 89, lastUsed: '2026-05-04', department: '核医学科', tags: ['癫痫', '脑PET', 'FDG'], description: '癫痫患者脑FDG PET代谢分析报告模板', isDefault: false, isActive: true },
  { id: 'T006', name: '阿尔茨海默病AV45 PET报告模板', category: '神经退行', modality: 'PET/CT', language: '中文', version: '2.2', author: '李晓东', lastModified: '2026-04-18', usageCount: 67, lastUsed: '2026-05-03', department: '核医学科', tags: ['阿尔茨海默', 'AV45', 'β-淀粉样蛋白'], description: 'β-淀粉样蛋白PET显像评估阿尔茨海默病专用模板', isDefault: false, isActive: true },
  { id: 'T007', name: 'SPECT心肌灌注显像报告模板', category: '心脏疾病', modality: 'SPECT', language: '中文', version: '3.0', author: '王丽华', lastModified: '2026-04-12', usageCount: 512, lastUsed: '2026-05-07', department: '核医学科', tags: ['心肌灌注', 'SPECT', 'MIBI'], description: '静息/负荷心肌灌注SPECT报告模板，含17段法分析', isDefault: true, isActive: true },
  { id: 'T008', name: 'SPECT全身骨显像报告模板', category: '骨骼系统', modality: 'SPECT', language: '中文', version: '2.5', author: '王丽华', lastModified: '2026-04-08', usageCount: 634, lastUsed: '2026-05-07', department: '核医学科', tags: ['骨显像', '99mTc', 'MDP'], description: '99mTc-MDP全身骨显像标准报告模板', isDefault: true, isActive: true },
  { id: 'T009', name: 'SPECT肾动态显像报告模板', category: '泌尿系统', modality: 'SPECT', language: '中文', version: '2.0', author: '王丽华', lastModified: '2026-03-15', usageCount: 298, lastUsed: '2026-05-06', department: '核医学科', tags: ['肾动态', 'GFR', 'DTPA'], description: '肾动态显像及GFR计算报告模板', isDefault: true, isActive: true },
  { id: 'T010', name: 'SPECT甲状腺静态显像报告模板', category: '内分泌', modality: 'SPECT', language: '中文', version: '1.8', author: '王丽华', lastModified: '2026-03-10', usageCount: 187, lastUsed: '2026-05-05', department: '核医学科', tags: ['甲状腺', 'TcO4', '凉结节'], description: '甲状腺静态显像报告模板，含摄锝率计算', isDefault: false, isActive: true },
  { id: 'T011', name: 'SPECT肺通气/灌注显像报告模板', category: '呼吸系统', modality: 'SPECT', language: '中文', version: '2.2', author: '王丽华', lastModified: '2026-04-20', usageCount: 145, lastUsed: '2026-05-04', department: '核医学科', tags: ['肺V/Q', '通气', '灌注'], description: '肺通气/灌注(V/Q)显像报告模板，含不匹配分析', isDefault: false, isActive: true },
  { id: 'T012', name: 'DXA骨密度测定报告模板', category: '骨密度', modality: 'DXA', language: '中文', version: '1.5', author: '刘欣', lastModified: '2026-03-25', usageCount: 234, lastUsed: '2026-05-06', department: '核医学科', tags: ['骨密度', 'DXA', 'T-score'], description: 'DXA骨密度测定报告，含T-score和Z-score分析', isDefault: true, isActive: true },
  { id: 'T013', name: '131I甲亢治疗报告模板', category: '核素治疗', modality: 'OT', language: '中文', version: '2.0', author: '张明华', lastModified: '2026-04-25', usageCount: 78, lastUsed: '2026-05-05', department: '核医学科', tags: ['131I', '甲亢', '治疗'], description: '131I甲状腺功能亢进治疗专用报告模板', isDefault: false, isActive: true },
  { id: 'T014', name: '89Sr骨转移瘤治疗报告模板', category: '核素治疗', modality: 'OT', language: '中文', version: '1.3', author: '张明华', lastModified: '2026-04-22', usageCount: 42, lastUsed: '2026-05-03', department: '核医学科', tags: ['89Sr', '骨转移', '镇痛'], description: '89Sr治疗骨转移瘤疼痛镇痛报告模板', isDefault: false, isActive: true },
  { id: 'T015', name: 'PET/CT食管癌分期报告模板', category: '肿瘤分期', modality: 'PET/CT', language: '中文', version: '1.8', author: '李晓东', lastModified: '2026-04-15', usageCount: 98, lastUsed: '2026-05-06', department: '核医学科', tags: ['食管癌', '分期', '18F-FDG'], description: '食管癌PET/CT分期专用报告模板', isDefault: false, isActive: true },
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
  tag: { display: 'inline-block', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: '#eff6ff', color: '#1e40af', marginRight: '4px', marginBottom: '2px' },
};

const ReportTemplatePage: React.FC = () => {
  const [templates] = useState<ReportTemplate[]>(mockData);
  const [search, setSearch] = useState('');
  const [modalityFilter, setModalityFilter] = useState('全部');

  const modalities = ['全部', 'PET/CT', 'SPECT', 'OT', 'DXA'];
  const filtered = templates.filter(t => {
    const matchSearch = t.name.includes(search) || t.category.includes(search) || t.tags.some(tag => tag.includes(search));
    const matchModality = modalityFilter === '全部' || t.modality === modalityFilter;
    return matchSearch && matchModality;
  });

  const totalUsage = templates.reduce((s, t) => s + t.usageCount, 0);
  const defaultCount = templates.filter(t => t.isDefault).length;
  const activeCount = templates.filter(t => t.isActive).length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>报告模板管理</h2>
        <p style={styles.subtitle}>核医学各类检查报告模板 · 版本控制 · 使用统计</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><FileText size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{templates.length}</div><div style={styles.statLabel}>模板总数</div></div>
        <div style={styles.statCard}><Printer size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalUsage.toLocaleString()}</div><div style={styles.statLabel}>累计使用</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#047857', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#047857' }}>{defaultCount}</div><div style={styles.statLabel}>默认模板</div></div>
        <div style={styles.statCard}><CheckCircle size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{activeCount}</div><div style={styles.statLabel}>活跃模板</div></div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchInput}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="搜索模板名称/分类/标签..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>
        {modalities.map(m => (
          <button key={m} onClick={() => setModalityFilter(m)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: modalityFilter === m ? '#1e40af' : '#d1d5db', background: modalityFilter === m ? '#1e40af' : '#fff', color: modalityFilter === m ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>{m}</button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>模板名称</th>
              <th style={styles.th}>分类</th>
              <th style={styles.th}>检查类型</th>
              <th style={styles.th}>版本</th>
              <th style={styles.th}>作者</th>
              <th style={styles.th}>使用次数</th>
              <th style={styles.th}>最后使用</th>
              <th style={styles.th}>标签</th>
              <th style={styles.th}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td style={styles.td}>
                  <div style={{ fontWeight: 600, color: '#1e40af' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{t.description.substring(0, 40)}...</div>
                </td>
                <td style={styles.td}>{t.category}</td>
                <td style={styles.td}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: '#eff6ff', color: '#1e40af' }}>{t.modality}</span></td>
                <td style={styles.td}>v{t.version}</td>
                <td style={styles.td}>{t.author}</td>
                <td style={styles.td}><div style={{ fontWeight: 600, color: '#1e40af' }}>{t.usageCount.toLocaleString()}</div></td>
                <td style={styles.td}>{t.lastUsed}</td>
                <td style={styles.td}>{t.tags.map(tag => <span key={tag} style={styles.tag}>{tag}</span>)}</td>
                <td style={styles.td}>
                  {t.isDefault && <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: '#d1fae5', color: '#047857', marginRight: '4px' }}>默认</span>}
                  <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: t.isActive ? '#d1fae5' : '#f3f4f6', color: t.isActive ? '#047857' : '#9ca3af' }}>{t.isActive ? '启用' : '停用'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTemplatePage;
