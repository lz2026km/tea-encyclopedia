import React from 'react';
import { Book, Video, FileText, Clock, CheckCircle, PlayCircle, Download } from 'lucide-react';

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  section: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '20px' },
  sectionTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' },
  resourceGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '16px' },
  resourceCard: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', transition: 'box-shadow 0.2s' },
  resourceHeader: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' },
  resourceIcon: { width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  iconVideo: { background: '#fce7f3', color: '#be185d' },
  iconDoc: { background: '#dbeafe', color: '#1e40af' },
  iconBook: { background: '#d1fae5', color: '#047857' },
  resourceTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '4px' },
  resourceMeta: { fontSize: '12px', color: '#6b7280' },
  resourceDesc: { fontSize: '13px', color: '#6b7280', marginBottom: '12px', lineHeight: 1.5 },
  resourceFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  resourceTags: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  tag: { fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#f3f4f6', color: '#6b7280' },
  tagRequired: { background: '#fef3c7', color: '#b45309' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '4px' },
  badgeNew: { background: '#fee2e2', color: '#dc2626' },
  badgeUpdated: { background: '#dbeafe', color: '#1e40af' },
  actionBtn: { display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none' },
  btnPrimary: { background: '#1e40af', color: '#fff' },
  btnSecondary: { background: '#f3f4f6', color: '#374151' },
  trainingList: { padding: '16px' },
  trainingItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: '1px solid #e5e7eb' },
  trainingIcon: { width: '36px', height: '36px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' },
  trainingInfo: { flex: 1 },
  trainingTitle: { fontSize: '14px', fontWeight: 500, color: '#374151' },
  trainingMeta: { fontSize: '12px', color: '#6b7280', marginTop: '2px' },
  trainingStatus: { fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '4px' },
};

const resources = [
  { id: 1, title: 'PET/CT原理与临床应用', type: 'video', duration: '45分钟', author: '李主任', desc: '详细介绍PET/CT成像原理、设备操作规范及临床应用要点', category: '设备操作', required: true, date: '2026-04-15' },
  { id: 2, title: '放射性药品管理规范', type: 'document', pages: 32, author: '王物理师', desc: '核医学科放射性药品采购、存储、分发及废弃处理全流程管理', category: '药品管理', required: true, date: '2026-04-20' },
  { id: 3, title: '辐射防护基础教程', type: 'book', pages: 156, author: '张教授', desc: '辐射防护基本原则、个人剂量监测、防护措施及应急处理', category: '辐射防护', required: true, date: '2026-03-10' },
  { id: 4, title: 'SPECT操作培训视频', type: 'video', duration: '38分钟', author: '刘技师', desc: 'SPECT设备标准操作流程、图像采集参数设置及常见问题处理', category: '设备操作', required: false, date: '2026-05-01', isNew: true },
  { id: 5, title: '图像质量控制标准', type: 'document', pages: 24, author: '王物理师', desc: 'PET/CT及SPECT图像质量评估标准、伪影识别与解决方案', category: '质量控制', required: false, date: '2026-04-28', isUpdated: true },
  { id: 6, title: '核素治疗患者护理', type: 'book', pages: 89, author: '陈护士长', desc: '131I治疗患者围手术期护理要点、隔离病房管理及辐射防护', category: '临床护理', required: false, date: '2026-04-05' },
];

const trainingSchedule = [
  { title: '辐射安全培训', date: '2026-05-10', time: '14:00-16:00', location: '会议室A', speaker: '李主任', type: '必修' },
  { title: '新设备操作考核', date: '2026-05-15', time: '09:00-12:00', location: 'PET/CT室', speaker: '刘技师', type: '考核' },
  { title: '图像分析研讨会', date: '2026-05-20', time: '15:00-17:00', location: '会议室B', speaker: '王物理师', type: '选修' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video size={20} />;
    case 'document': return <FileText size={20} />;
    case 'book': return <Book size={20} />;
    default: return <FileText size={20} />;
  }
};

export default function EducationPage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>教育培训</h1>
        <p style={styles.subtitle}>核医学科教学资源与培训计划</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{resources.length}</div>
          <div style={styles.statLabel}>教学资源</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{resources.filter(r => r.required).length}</div>
          <div style={styles.statLabel}>必修课程</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: '#047857' }}>{trainingSchedule.length}</div>
          <div style={styles.statLabel}>近期培训</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>12</div>
          <div style={styles.statLabel}>已参加培训</div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}><Book size={16} color="#1e40af" /> 教学资源库</div>
        <div style={styles.resourceGrid}>
          {resources.map(resource => (
            <div key={resource.id} style={styles.resourceCard}>
              <div style={styles.resourceHeader}>
                <div style={{ ...styles.resourceIcon, ...(resource.type === 'video' ? styles.iconVideo : resource.type === 'book' ? styles.iconBook : styles.iconDoc) }}>
                  {getIcon(resource.type)}
                </div>
                <div>
                  <div style={styles.resourceTitle}>{resource.title}</div>
                  <div style={styles.resourceMeta}>
                    {resource.type === 'video' && <><Clock size={12} /> {resource.duration} </>}
                    {resource.type === 'document' && <>{resource.pages}页 </>}
                    {resource.type === 'book' && <>{resource.pages}页 </>}
                    | {resource.author}
                  </div>
                </div>
              </div>
              <div style={styles.resourceDesc}>{resource.desc}</div>
              <div style={styles.resourceFooter}>
                <div style={styles.resourceTags}>
                  <span style={styles.tag}>{resource.category}</span>
                  {resource.required && <span style={{ ...styles.tag, ...styles.tagRequired }}>必修</span>}
                  {resource.isNew && <span style={{ ...styles.badge, ...styles.badgeNew }}>新增</span>}
                  {resource.isUpdated && <span style={{ ...styles.badge, ...styles.badgeUpdated }}>更新</span>}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ ...styles.actionBtn, ...styles.btnSecondary }}>
                    <Download size={12} /> 下载
                  </button>
                  {resource.type === 'video' && (
                    <button style={{ ...styles.actionBtn, ...styles.btnPrimary }}>
                      <PlayCircle size={12} /> 播放
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}><Clock size={16} color="#1e40af" /> 培训计划</div>
        <div style={styles.trainingList}>
          {trainingSchedule.map((training, idx) => (
            <div key={idx} style={{ ...styles.trainingItem, borderBottom: idx === trainingSchedule.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
              <div style={styles.trainingIcon}><CheckCircle size={18} /></div>
              <div style={styles.trainingInfo}>
                <div style={styles.trainingTitle}>{training.title}</div>
                <div style={styles.trainingMeta}>{training.date} {training.time} | {training.location} | 主讲: {training.speaker}</div>
              </div>
              <div style={{ ...styles.trainingStatus, background: training.type === '必修' ? '#fee2e2' : training.type === '考核' ? '#fef3c7' : '#e0e7ff', color: training.type === '必修' ? '#dc2626' : training.type === '考核' ? '#b45309' : '#4338ca' }}>
                {training.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
