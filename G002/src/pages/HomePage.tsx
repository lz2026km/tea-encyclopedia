import React from 'react';
import {
  Activity, ClipboardCheck, Pill, ShieldCheck,
  AlertTriangle, CheckCircle2, Clock, Scan,
  TrendingUp, Users, Calendar
} from 'lucide-react';
import {
  dashboardKPIs, appointments, nuclearDrugs,
  qcRecords, radiationDoses, workloadStats, examRecords
} from '../data/initialData';

const styles = {
  page: { padding: '0' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 700, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' },
  card: { background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #e5e7eb' },
  cardLabel: { fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' },
  cardValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  cardSub: { fontSize: '11px', color: '#9ca3af', marginTop: '4px' },
  sectionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' },
  section: { background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #e5e7eb' },
  sectionTitle: { fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px' },
  th: { textAlign: 'left' as const, padding: '10px 8px', color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #e5e7eb' },
  td: { padding: '10px 8px', borderBottom: '1px solid #f3f4f6', color: '#374151' },
  warnItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #f3f4f6' },
  warnText: { fontSize: '13px', color: '#374151' },
  warnSub: { fontSize: '11px', color: '#9ca3af' },
  deviceItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' },
  deviceName: { fontSize: '13px', color: '#374151' },
  doseItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' },
  doseName: { fontSize: '13px', color: '#374151' },
  doseValue: { fontSize: '13px', fontWeight: 600, color: '#1e40af' },
  chartContainer: { background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #e5e7eb' },
  chartTitle: { fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' },
  barGroup: { display: 'flex', alignItems: 'flex-end', gap: '24px', height: '160px', padding: '0 8px' },
  barLabel: { fontSize: '10px', color: '#6b7280', textAlign: 'center' as const, marginTop: '6px' },
  legend: { display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6b7280' },
};

function statusBadge(status: string): React.CSSProperties {
  return {
    padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 500,
    background: status === '已完成' ? '#dcfce7' : status === '检查中' ? '#fef3c7' : '#dbeafe',
    color: status === '已完成' ? '#166534' : status === '检查中' ? '#92400e' : '#1e40af',
  };
}

function warnDot(color: string): React.CSSProperties {
  return { width: '8px', height: '8px', borderRadius: '50%', background: color };
}

function deviceStatus(ok: boolean): React.CSSProperties {
  return {
    padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 500,
    background: ok ? '#dcfce7' : '#fef3c7', color: ok ? '#166534' : '#92400e',
  };
}

function bar(height: number, color: string): React.CSSProperties {
  return { width: '32px', height: `${height}px`, background: color, borderRadius: '4px 4px 0 0', position: 'relative' };
}

function legendDot(color: string): React.CSSProperties {
  return { width: '10px', height: '10px', borderRadius: '2px', background: color };
}

const today = '2026-05-02';
const todayAppointments = appointments.filter(a => a.scheduledDate === today);

export default function HomePage() {
  const kpis = [
    { label: '今日检查', value: dashboardKPIs.today.totalExams, sub: `已完成 ${dashboardKPIs.today.completed} | 检查中 ${dashboardKPIs.today.inProgress}`, icon: ClipboardCheck, color: '#1e40af' },
    { label: 'PET/CT', value: dashboardKPIs.today.petct, sub: '占比最高', icon: Scan, color: '#7c3aed' },
    { label: '药品库存', value: dashboardKPIs.drug.f18Stock, sub: '18F-FDG (mCi)', icon: Pill, color: '#0891b2' },
    { label: '辐射安全', value: dashboardKPIs.dose.staffAboveThreshold === 0 ? '正常' : '关注', sub: `${dashboardKPIs.dose.staffAttention}人需关注`, icon: ShieldCheck, color: '#059669' },
  ];

  const expiringDrugs = nuclearDrugs.filter(d => {
    const exp = new Date(d.expiryDate);
    const now = new Date(today);
    const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 2;
  });

  const deviceStatusList = [
    { name: 'PET/CT-01', status: qcRecords.find(q => q.deviceName === 'PET/CT-01')?.result === '合格' },
    { name: 'PET/CT-02', status: qcRecords.find(q => q.deviceName === 'PET/CT-02')?.result === '合格' },
    { name: 'SPECT-01', status: qcRecords.find(q => q.deviceName === 'SPECT-01')?.result === '合格' },
  ];

  const maxWorkload = Math.max(...workloadStats.map(w => Math.max(w.petct, w.spect, w.boneDensity, w.nuclearTherapy)));

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>首页概览</h1>
        <p style={styles.subtitle}>核医学科日常工作概览 — {today}</p>
      </div>

      {/* KPI Cards */}
      <div style={styles.grid}>
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} style={styles.card}>
              <div style={styles.cardLabel}>
                <Icon size={14} color={kpi.color} />
                {kpi.label}
              </div>
              <div style={styles.cardValue}>{kpi.value}</div>
              <div style={styles.cardSub}>{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Today's Exams + Drug Warnings + Device Status */}
      <div style={styles.sectionGrid}>
        {/* Today's Exam List */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <Calendar size={16} color="#1e40af" />
            今日检查列表
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>患者</th>
                <th style={styles.th}>类型</th>
                <th style={styles.th}>状态</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map(apt => (
                <tr key={apt.id}>
                  <td style={styles.td}>{apt.patientName}</td>
                  <td style={styles.td}>{apt.examType}</td>
                  <td style={styles.td}>
                    <span style={statusBadge(apt.status)}>{apt.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drug Warnings */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <AlertTriangle size={16} color="#f59e0b" />
            药品预警
          </div>
          {expiringDrugs.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>暂无临近过期药品</p>
          ) : (
            expiringDrugs.map(drug => (
              <div key={drug.id} style={styles.warnItem}>
                <div style={warnDot('#f59e0b')} />
                <div>
                  <div style={styles.warnText}>{drug.name}</div>
                  <div style={styles.warnSub}>批次: {drug.batchNo} | 有效期: {drug.expiryDate}</div>
                </div>
              </div>
            ))
          )}
          {nuclearDrugs.filter(d => d.inventoryCount < 500).map(drug => (
            <div key={drug.id} style={styles.warnItem}>
              <div style={warnDot('#ef4444')} />
              <div>
                <div style={styles.warnText}>{drug.name} 库存不足</div>
                <div style={styles.warnSub}>当前: {drug.inventoryCount} {drug.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Device Status */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <Activity size={16} color="#1e40af" />
            设备状态
          </div>
          {deviceStatusList.map(dev => (
            <div key={dev.name} style={styles.deviceItem}>
              <span style={styles.deviceName}>{dev.name}</span>
              <span style={deviceStatus(dev.status)}>{dev.status ? '正常' : '待维护'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radiation Dose + Workload Trend */}
      <div style={styles.sectionGrid}>
        {/* Radiation Dose */}
        <div style={{ ...styles.section, gridColumn: 'span 1' }}>
          <div style={styles.sectionTitle}>
            <ShieldCheck size={16} color="#1e40af" />
            辐射剂量监测
          </div>
          {radiationDoses.slice(0, 5).map(dose => (
            <div key={dose.id} style={styles.doseItem}>
              <span style={styles.doseName}>{dose.staffName}</span>
              <span style={styles.doseValue}>{dose.cumulativeYear} mSv</span>
            </div>
          ))}
        </div>

        {/* Workload Trend Chart */}
        <div style={{ ...styles.chartContainer, gridColumn: 'span 2' }}>
          <div style={styles.chartTitle}>工作量趋势 (月)</div>
          <div style={styles.barGroup}>
            {workloadStats.map((stat, i) => {
              const h = (v: number) => Math.round((v / maxWorkload) * 130);
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
                    <div style={bar(h(stat.petct), '#1e40af')} title={`PET/CT: ${stat.petct}`} />
                    <div style={bar(h(stat.spect), '#7c3aed')} title={`SPECT: ${stat.spect}`} />
                    <div style={bar(h(stat.boneDensity), '#0891b2')} title={`骨密度: ${stat.boneDensity}`} />
                    <div style={bar(h(stat.nuclearTherapy), '#f59e0b')} title={`核素治疗: ${stat.nuclearTherapy}`} />
                  </div>
                  <div style={styles.barLabel}>{stat.month.slice(5)}月</div>
                </div>
              );
            })}
          </div>
          <div style={styles.legend}>
            <div style={styles.legendItem}><div style={legendDot('#1e40af')} />PET/CT</div>
            <div style={styles.legendItem}><div style={legendDot('#7c3aed')} />SPECT</div>
            <div style={styles.legendItem}><div style={legendDot('#0891b2')} />骨密度</div>
            <div style={styles.legendItem}><div style={legendDot('#f59e0b')} />核素治疗</div>
          </div>
        </div>
      </div>
    </div>
  );
}
