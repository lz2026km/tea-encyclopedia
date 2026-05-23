// NuclearStatsPage.tsx - 核医学科室专项统计
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Activity, Radio, Pill, Monitor } from 'lucide-react';

const monthlyData = [
  { month: '2025-06', petct: 85, spect: 120, therapy: 18, dxa: 45 },
  { month: '2025-07', petct: 92, spect: 135, therapy: 22, dxa: 52 },
  { month: '2025-08', petct: 88, spect: 128, therapy: 19, dxa: 48 },
  { month: '2025-09', petct: 95, spect: 142, therapy: 25, dxa: 55 },
  { month: '2025-10', petct: 102, spect: 150, therapy: 28, dxa: 60 },
  { month: '2025-11', petct: 108, spect: 155, therapy: 30, dxa: 58 },
  { month: '2025-12', petct: 115, spect: 162, therapy: 32, dxa: 62 },
  { month: '2026-01', petct: 98, spect: 140, therapy: 26, dxa: 50 },
  { month: '2026-02', petct: 105, spect: 148, therapy: 29, dxa: 56 },
  { month: '2026-03', petct: 118, spect: 165, therapy: 35, dxa: 65 },
  { month: '2026-04', petct: 122, spect: 170, therapy: 38, dxa: 68 },
  { month: '2026-05', petct: 128, spect: 178, therapy: 42, dxa: 72 },
];

const drugConsumption = [
  { month: '2025-06', fdg: 3200, tc99m: 8500, i131: 180, other: 450 },
  { month: '2025-07', fdg: 3500, tc99m: 9200, i131: 200, other: 480 },
  { month: '2025-08', fdg: 3300, tc99m: 8800, i131: 185, other: 460 },
  { month: '2025-09', fdg: 3600, tc99m: 9500, i131: 210, other: 500 },
  { month: '2025-10', fdg: 3800, tc99m: 10000, i131: 230, other: 520 },
  { month: '2025-11', fdg: 4000, tc99m: 10500, i131: 245, other: 540 },
  { month: '2025-12', fdg: 4200, tc99m: 10800, i131: 260, other: 560 },
  { month: '2026-01', fdg: 3650, tc99m: 9600, i131: 220, other: 510 },
  { month: '2026-02', fdg: 3900, tc99m: 10200, i131: 240, other: 535 },
  { month: '2026-03', fdg: 4350, tc99m: 11200, i131: 280, other: 580 },
  { month: '2026-04', fdg: 4500, tc99m: 11500, i131: 295, other: 600 },
  { month: '2026-05', fdg: 4700, tc99m: 12000, i131: 310, other: 620 },
];

const deviceUtilization = [
  { device: 'PET/CT-01', hours: 185, exams: 95, utilization: 78 },
  { device: 'PET/CT-02', hours: 168, exams: 88, utilization: 72 },
  { device: 'SPECT-01', hours: 195, exams: 130, utilization: 82 },
  { device: 'SPECT-02', hours: 45, exams: 28, utilization: 18 },
  { device: 'DXA-01', hours: 120, exams: 72, utilization: 50 },
];

const positiveRate = [
  { month: '2025-06', petct: 62, spect: 38, therapy: 95 },
  { month: '2025-07', petct: 58, spect: 42, therapy: 92 },
  { month: '2025-08', petct: 65, spect: 40, therapy: 94 },
  { month: '2025-09', petct: 60, spect: 45, therapy: 96 },
  { month: '2025-10', petct: 63, spect: 43, therapy: 93 },
  { month: '2025-11', petct: 68, spect: 48, therapy: 97 },
  { month: '2025-12', petct: 70, spect: 50, therapy: 95 },
  { month: '2026-01', petct: 65, spect: 44, therapy: 94 },
  { month: '2026-02', petct: 67, spect: 46, therapy: 96 },
  { month: '2026-03', petct: 72, spect: 52, therapy: 97 },
  { month: '2026-04', petct: 75, spect: 55, therapy: 98 },
  { month: '2026-05', petct: 78, spect: 58, therapy: 97 },
];

const suvStats = [
  { range: '0-2', count: 8 }, { range: '2-4', count: 22 },
  { range: '4-6', count: 35 }, { range: '6-8', count: 28 },
  { range: '8-10', count: 15 }, { range: '>10', count: 12 },
];

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  card: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' },
  statCard: { background: '#fff', borderRadius: '8px', padding: '14px', border: '1px solid #e5e7eb', textAlign: 'center' as const },
  statValue: { fontSize: '22px', fontWeight: 700, color: '#1e40af' },
  statLabel: { fontSize: '12px', color: '#6b7280', marginTop: '4px' },
  barChart: { display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', padding: '16px 0' },
  barGroup: { display: 'flex', gap: '4px', alignItems: 'flex-end', flex: 1 },
  bar: { flex: 1, borderRadius: '3px 3px 0 0', minWidth: '8px' },
  barLabel: { fontSize: '9px', color: '#9ca3af', textAlign: 'center', marginTop: '4px' },
  legend: { display: 'flex', gap: '12px', flexWrap: 'wrap' as const, marginTop: '12px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' },
  legendDot: { width: '10px', height: '10px', borderRadius: '50%' },
  lineChart: { position: 'relative', height: '160px', padding: '16px 0' },
  gridLine: { borderTop: '1px dashed #e5e7eb', position: 'absolute', left: '40px', right: '0' },
};

const LineChartSVG: React.FC<{ data: { month: string; value: number }[]; color: string; max: number }> = ({ data, color, max }) => {
  const w = 800, h = 140, pad = 40;
  const points = data.map((d, i) => `${pad + (i / (data.length - 1)) * (w - pad * 2)},${h - pad - (d.value / max) * (h - pad * 2)}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '140px' }}>
      {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
        <line key={i} x1={pad} y1={pad + r * (h - pad * 2)} x2={w - pad} y2={pad + r * (h - pad * 2)} stroke="#e5e7eb" strokeDasharray="4,4" />
      ))}
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2.5" />
      {data.map((d, i) => (
        <circle key={i} cx={pad + (i / (data.length - 1)) * (w - pad * 2)} cy={h - pad - (d.value / max) * (h - pad * 2)} r="3" fill={color} />
      ))}
    </svg>
  );
};

const NuclearStatsPage: React.FC = () => {
  const [tab, setTab] = useState<'overview' | 'exams' | 'drugs' | 'equipment' | 'positive' | 'suv'>('overview');

  const totalExams = monthlyData.reduce((s, d) => s + d.petct + d.spect + d.therapy + d.dxa, 0);
  const totalDrug = drugConsumption[drugConsumption.length - 1];
  const avgUtil = Math.round(deviceUtilization.reduce((s, d) => s + d.utilization, 0) / deviceUtilization.length);
  const latestPositive = positiveRate[positiveRate.length - 1];
  const totalPatients = monthlyData.reduce((s, d) => s + d.petct + d.spect + d.therapy + d.dxa, 0);
  const avgSUV = 6.2;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>核医学科室专项统计</h2>
        <p style={styles.subtitle}>检查数量 · 药物消耗 · 设备利用率 · 阳性率 · SUV统计</p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}><BarChart3 size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalPatients}</div><div style={styles.statLabel}>总检查量</div></div>
        <div style={styles.statCard}><Pill size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{totalDrug.fdg}</div><div style={styles.statLabel}>18F-FDG(MBq)</div></div>
        <div style={styles.statCard}><Monitor size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{avgUtil}%</div><div style={styles.statLabel}>设备平均利用率</div></div>
        <div style={styles.statCard}><Activity size={16} style={{ color: '#dc2626', marginBottom: '4px' }} /><div style={{ ...styles.statValue, color: '#dc2626' }}>{latestPositive.petct}%</div><div style={styles.statLabel}>PET/CT阳性率</div></div>
        <div style={styles.statCard}><TrendingUp size={16} style={{ color: '#1e40af', marginBottom: '4px' }} /><div style={styles.statValue}>{avgSUV}</div><div style={styles.statLabel}>平均SUVmax</div></div>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
        {(['overview', 'exams', 'drugs', 'equipment', 'positive', 'suv'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid', borderColor: tab === t ? '#1e40af' : '#d1d5db', background: tab === t ? '#1e40af' : '#fff', color: tab === t ? '#fff' : '#374151', cursor: 'pointer', fontSize: '12px' }}>
            {t === 'overview' ? '总览' : t === 'exams' ? '检查数量' : t === 'drugs' ? '药物消耗' : t === 'equipment' ? '设备利用率' : t === 'positive' ? '阳性率' : 'SUV统计'}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}><TrendingUp size={16} color="#1e40af" />12个月检查量趋势</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            {monthlyData.map((d, i) => {
              const maxVal = Math.max(...monthlyData.map(x => x.petct + x.spect));
              const total = d.petct + d.spect + d.therapy + d.dxa;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <div style={{ height: `${(total / maxVal) * 120}px`, width: '100%', display: 'flex', gap: '1px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, background: '#1e40af', borderRadius: '2px 2px 0 0', minHeight: '4px' }} />
                    <div style={{ flex: 1.5, background: '#3b82f6', borderRadius: '2px 2px 0 0', minHeight: '4px' }} />
                  </div>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{d.month.split('-')[1]}月</span>
                </div>
              );
            })}
          </div>
          <div style={styles.legend}>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#1e40af' }} />PET/CT</div>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#3b82f6' }} />SPECT</div>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#047857' }} />核素治疗</div>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#f59e0b' }} />骨密度</div>
          </div>
        </div>
      )}

      {tab === 'exams' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}><BarChart3 size={16} color="#1e40af" />检查类型分布（5月）</div>
          <div style={{ display: 'flex', gap: '24px', padding: '20px 0' }}>
            {[['PET/CT', monthlyData[11].petct, '#1e40af'], ['SPECT', monthlyData[11].spect, '#3b82f6'], ['核素治疗', monthlyData[11].therapy, '#047857'], ['骨密度', monthlyData[11].dxa, '#f59e0b']].map(([name, val, color]) => (
              <div key={name as string} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: `${(val as number / 180) * 140}px`, background: color, borderRadius: '6px', marginBottom: '8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{val}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{name}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>占 {Math.round((val as number / (monthlyData[11].petct + monthlyData[11].spect + monthlyData[11].therapy + monthlyData[11].dxa)) * 100)}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'drugs' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}><Pill size={16} color="#1e40af" />放射性药物月消耗（5月）</div>
          <div style={{ display: 'flex', gap: '24px', padding: '20px 0' }}>
            {[['18F-FDG', totalDrug.fdg, '#1e40af'], ['99mTc', totalDrug.tc99m, '#3b82f6'], ['131I', totalDrug.i131, '#dc2626'], ['其他', totalDrug.other, '#f59e0b']].map(([name, val, color]) => (
              <div key={name as string} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: color as string }}>{val}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{name}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>MBq</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'equipment' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}><Monitor size={16} color="#1e40af" />设备利用率（5月）</div>
          {deviceUtilization.map(d => (
            <div key={d.device} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' }}>
                <span style={{ fontWeight: 500, color: '#374151' }}>{d.device}</span>
                <span style={{ color: d.utilization < 30 ? '#dc2626' : '#047857', fontWeight: 600 }}>{d.utilization}%</span>
              </div>
              <div style={{ background: '#e5e7eb', borderRadius: '4px', height: '8px' }}>
                <div style={{ width: `${d.utilization}%`, background: d.utilization < 30 ? '#dc2626' : '#1e40af', borderRadius: '4px', height: '8px', transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{d.hours}小时 · {d.exams}例检查</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'positive' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}><Activity size={16} color="#1e40af" />阳性率趋势（%）</div>
          <LineChartSVG data={positiveRate.map(d => ({ month: d.month, value: d.petct }))} color="#1e40af" max={100} />
          <div style={styles.legend}>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#1e40af' }} />PET/CT</div>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#3b82f6' }} />SPECT</div>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#047857' }} />核素治疗</div>
          </div>
        </div>
      )}

      {tab === 'suv' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}><TrendingUp size={16} color="#1e40af" />SUVmax分布统计</div>
          <div style={{ display: 'flex', gap: '12px', padding: '20px 0', alignItems: 'flex-end' }}>
            {suvStats.map(s => (
              <div key={s.range} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ background: s.range === '>10' ? '#dc2626' : '#1e40af', borderRadius: '4px 4px 0 0', height: `${s.count * 2.5}px`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{s.count}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>{s.range}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>肿瘤SUVmax&gt;2.5通常提示恶性病变，&gt;4.5恶性可能性大</div>
        </div>
      )}
    </div>
  );
};

export default NuclearStatsPage;
