import React from 'react';
import { Users, Shield, Key, UserPlus, Settings, CheckCircle } from 'lucide-react';

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', textAlign: 'center' },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' },
  card: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  cardHeader: { padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '6px 12px', borderRadius: '4px', background: '#1e40af', color: '#fff', border: 'none', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  userCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 },
  userName: { fontWeight: 500 },
  userId: { fontSize: '11px', color: '#9ca3af' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 },
  badgeAdmin: { background: '#fee2e2', color: '#dc2626' },
  badgeDoctor: { background: '#dbeafe', color: '#1e40af' },
  badgeNurse: { background: '#fce7f3', color: '#be185d' },
  badgeTechnician: { background: '#d1fae5', color: '#047857' },
  badgePhysicist: { background: '#fef3c7', color: '#b45309' },
  permissionDot: { display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '6px' },
  permissionFull: { background: '#047857' },
  permissionPartial: { background: '#f59e0b' },
  permissionNone: { background: '#d1d5db' },
  permissionLabel: { fontSize: '12px', color: '#6b7280' },
  settingsSection: { marginBottom: '24px' },
  settingsTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
  settingsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' },
  settingItem: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  settingHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  settingLabel: { fontSize: '13px', fontWeight: 500, color: '#374151' },
  toggle: { width: '40px', height: '22px', borderRadius: '11px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' },
  toggleOn: { background: '#1e40af' },
  toggleOff: { background: '#d1d5db' },
  toggleKnob: { position: 'absolute', top: '2px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' },
  settingDesc: { fontSize: '12px', color: '#6b7280' },
  roleCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  roleHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  roleIcon: { width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  roleName: { fontSize: '14px', fontWeight: 600, color: '#374151' },
  roleCount: { fontSize: '12px', color: '#6b7280' },
  permissionList: { fontSize: '12px', color: '#6b7280' },
  permissionItem: { display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 0' },
};

const users = [
  { id: 'U001', name: '张明华', role: '医生', dept: '核医学科', permissions: ['read', 'write', 'approve'], lastLogin: '2026-05-02 08:00' },
  { id: 'U002', name: '李晓东', role: '医生', dept: '核医学科', permissions: ['read', 'write'], lastLogin: '2026-05-02 09:15' },
  { id: 'U003', name: '王丽华', role: '医生', dept: '核医学科', permissions: ['read', 'write'], lastLogin: '2026-05-01 14:30' },
  { id: 'U004', name: '陈护士', role: '护士', dept: '核医学科', permissions: ['read', 'write'], lastLogin: '2026-05-02 07:45' },
  { id: 'U005', name: '刘技师', role: '技师', dept: '核医学科', permissions: ['read'], lastLogin: '2026-05-01 16:00' },
  { id: 'U006', name: '王物理师', role: '物理师', dept: '核医学科', permissions: ['read', 'write', 'admin'], lastLogin: '2026-05-02 08:30' },
  { id: 'U007', name: '李主任', role: '管理员', dept: '核医学科', permissions: ['read', 'write', 'admin'], lastLogin: '2026-05-02 10:00' },
  { id: 'U008', name: '赵系统', role: '系统管理员', dept: '信息科', permissions: ['read', 'write', 'admin', 'superadmin'], lastLogin: '2026-05-01 09:00' },
];

const roles = [
  { name: '管理员', icon: '🛡️', count: 1, color: '#fee2e2', bgIcon: '#dc2626', permissions: ['系统设置', '用户管理', '数据备份', '权限分配'] },
  { name: '医生', icon: '👨‍⚕️', count: 3, color: '#dbeafe', bgIcon: '#1e40af', permissions: ['患者管理', '检查申请', '报告书写', '报告审核'] },
  { name: '护士', icon: '👩‍⚕️', count: 1, color: '#fce7f3', bgIcon: '#be185d', permissions: ['患者管理', '药品分发', '注射操作'] },
  { name: '技师', icon: '🔧', count: 1, color: '#d1fae5', bgIcon: '#047857', permissions: ['设备操作', '图像采集', '设备质控'] },
  { name: '物理师', icon: '⚛️', count: 1, color: '#fef3c7', bgIcon: '#b45309', permissions: ['设备质控', '剂量监测', '辐射防护'] },
];

const getRoleBadgeStyle = (role: string) => {
  switch (role) {
    case '管理员':
    case '系统管理员': return styles.badgeAdmin;
    case '医生': return styles.badgeDoctor;
    case '护士': return styles.badgeNurse;
    case '技师': return styles.badgeTechnician;
    case '物理师': return styles.badgePhysicist;
    default: return styles.badgeDoctor;
  }
};

const getPermissionStyle = (level: string) => {
  switch (level) {
    case 'full': return styles.permissionFull;
    case 'partial': return styles.permissionPartial;
    default: return styles.permissionNone;
  }
};

export default function AdminPage() {
  const adminCount = users.filter(u => u.role === '管理员' || u.role === '系统管理员').length;
  const doctorCount = users.filter(u => u.role === '医生').length;
  const nurseCount = users.filter(u => u.role === '护士').length;
  const techCount = users.filter(u => u.role === '技师' || u.role === '物理师').length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>系统管理</h1>
        <p style={styles.subtitle}>用户权限管理与系统设置</p>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{users.length}</div>
          <div style={styles.statLabel}>总用户数</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: '#dc2626' }}>{adminCount}</div>
          <div style={styles.statLabel}>管理员</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: '#1e40af' }}>{doctorCount}</div>
          <div style={styles.statLabel}>医生</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: '#be185d' }}>{nurseCount}</div>
          <div style={styles.statLabel}>护士</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: '#047857' }}>{techCount}</div>
          <div style={styles.statLabel}>技师/物理师</div>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}><Users size={16} color="#1e40af" /> 用户列表</div>
            <button style={styles.addBtn}><UserPlus size={12} /> 添加用户</button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>用户</th>
                <th style={styles.th}>角色</th>
                <th style={styles.th}>部门</th>
                <th style={styles.th}>权限级别</th>
                <th style={styles.th}>最后登录</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={styles.td}>
                    <div style={styles.userCell}>
                      <div style={styles.avatar}>{user.name.charAt(0)}</div>
                      <div>
                        <div style={styles.userName}>{user.name}</div>
                        <div style={styles.userId}>{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...getRoleBadgeStyle(user.role) }}>{user.role}</span>
                  </td>
                  <td style={styles.td}>{user.dept}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {user.permissions.includes('superadmin') && <span style={{ ...styles.permissionDot, ...styles.permissionFull }} />}
                      {user.permissions.includes('admin') && <span style={{ ...styles.permissionDot, ...(user.permissions.includes('superadmin') ? styles.permissionPartial : styles.permissionFull) }} />}
                      {!user.permissions.includes('admin') && !user.permissions.includes('superadmin') && <span style={{ ...styles.permissionDot, ...styles.permissionPartial }} />}
                      <span style={styles.permissionLabel}>
                        {user.permissions.includes('superadmin') ? '超级管理员' : user.permissions.includes('admin') ? '管理员' : '普通用户'}
                      </span>
                    </div>
                  </td>
                  <td style={styles.td}>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div style={{ ...styles.card, marginBottom: '20px' }}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}><Shield size={16} color="#1e40af" /> 角色配置</div>
            </div>
            {roles.map((role, idx) => (
              <div key={idx} style={{ ...styles.roleCard, borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', borderRadius: idx === 0 ? '8px 8px 0 0' : '0', borderBottom: idx === roles.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                <div style={styles.roleHeader}>
                  <div style={{ ...styles.roleIcon, background: role.color }}>
                    <span style={{ fontSize: '18px' }}>{role.icon}</span>
                  </div>
                  <div>
                    <div style={styles.roleName}>{role.name}</div>
                    <div style={styles.roleCount}>{role.count}人</div>
                  </div>
                </div>
                <div style={styles.permissionList}>
                  {role.permissions.map((p, i) => (
                    <div key={i} style={styles.permissionItem}>
                      <CheckCircle size={12} color="#047857" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.settingsSection}>
        <div style={styles.settingsTitle}><Settings size={16} color="#1e40af" /> 系统设置</div>
        <div style={styles.settingsGrid}>
          <div style={styles.settingItem}>
            <div style={styles.settingHeader}>
              <span style={styles.settingLabel}>双签审核功能</span>
              <div style={{ ...styles.toggle, ...styles.toggleOn }}>
                <div style={{ ...styles.toggleKnob, left: '20px' }} />
              </div>
            </div>
            <div style={styles.settingDesc}>报告审核需要两名医师确认</div>
          </div>
          <div style={styles.settingItem}>
            <div style={styles.settingHeader}>
              <span style={styles.settingLabel}>剂量告警阈值</span>
              <div style={{ ...styles.toggle, ...styles.toggleOn }}>
                <div style={{ ...styles.toggleKnob, left: '20px' }} />
              </div>
            </div>
            <div style={styles.settingDesc}>个人累计剂量超过50mSv时告警</div>
          </div>
          <div style={styles.settingItem}>
            <div style={styles.settingHeader}>
              <span style={styles.settingLabel}>效期预警推送</span>
              <div style={{ ...styles.toggle, ...styles.toggleOn }}>
                <div style={{ ...styles.toggleKnob, left: '20px' }} />
              </div>
            </div>
            <div style={styles.settingDesc}>药品效期3天内自动推送提醒</div>
          </div>
          <div style={styles.settingItem}>
            <div style={styles.settingHeader}>
              <span style={styles.settingLabel}>审计日志</span>
              <div style={{ ...styles.toggle, ...styles.toggleOn }}>
                <div style={{ ...styles.toggleKnob, left: '20px' }} />
              </div>
            </div>
            <div style={styles.settingDesc}>记录所有关键操作的审计日志</div>
          </div>
        </div>
      </div>
    </div>
  );
}
