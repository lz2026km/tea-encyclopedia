import React from 'react';
import { TrendingUp, Activity, Radio, Bone, BarChart3 } from 'lucide-react';
import { workloadStats } from '../data/initialData';

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' },
  kpiCard: { background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' },
  kpiLabel: { fontSize: '13px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' },
  kpiValue: { fontSize: '28px', fontWeight: 700, color: '#1e40af' },
  kpiUnit: { fontSize: '14px', color: '#6b7280', marginLeft: '4px' },
  kpiTrend: { fontSize: '12px', color: '#047857', marginTop: '4px' },
  chartGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' },
  chartCard: { background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' },
  chartTitle: { fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '20px' },
  lineChart: { height: '280px', position: 'relative' },
  chartArea: { position: 'relative', height: '240px', paddingTop: '20px' },
  gridLines: { position: 'absolute', left: '0', right: '0', top: '20px', bottom: '30px', borderLeft: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' },
  gridLabel: { position: 'absolute', left: '-30px', fontSize: '10px', color: '#9ca3af' },
  dataLine: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  linePath: { fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
  dot: { cx: '0', cy: '0', r: '4', strokeWidth: '2' },
  pieContainer: { display: 'flex', alignItems: 'center', gap: '24px' },
  pieChart: { width: '180px', height: '180px', position: 'relative' },
  pieLegend: { flex: 1 },
  legendItem: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' },
  legendDot: { width: '12px', height: '12px', borderRadius: '2px' },
  legendLabel: { flex: 1, fontSize: '13px', color: '#374151' },
  legendValue: { fontSize: '14px', fontWeight: 600, color: '#374151' },
  legendPercent: { fontSize: '12px', color: '#6b7280', marginLeft: '8px' },
  monthLabels: { display: 'flex', justifyContent: 'space-between', padding: '0 10px', marginTop: '8px' },
  monthLabel: { fontSize: '11px', color: '#6b7280' },
};

const colors = {
  petct: '#1e40af',
  spect: '#3b82f6',
  bone: '#60a5fa',
  therapy: '#a855f7',
};

export default function StatisticsPage() {
  const months = workloadStats.map(s => s.month);
  const maxY = Math.max(...workloadStats.map(s => Math.max(s.petct, s.spect, s.boneDensity, s.nuclearTherapy)));
  const chartHeight = 200;
  const chartPadding = { top: 20, right: 20, bottom: 30, left: 40 };
  
  const totalPETCT = workloadStats.reduce((sum, s) => sum + s.petct, 0);
  const totalSPECT = workloadStats.reduce((sum, s) => sum + s.spect, 0);
  const totalBone = workloadStats.reduce((sum, s) => sum + s.boneDensity, 0);
  const totalTherapy = workloadStats.reduce((sum, s) => sum + s.nuclearTherapy, 0);
  const grandTotal = totalPETCT + totalSPECT + totalBone + totalTherapy;
  
  const pieData = [
    { label: 'PET/CT', value: totalPETCT, color: colors.petct },
    { label: 'SPECT', value: totalSPECT, color: colors.spect },
    { label: '骨密度', value: totalBone, color: colors.bone },
    { label: '核素治疗', value: totalTherapy, color: colors.therapy },
  ];

  const getY = (value: number) => chartHeight - ((value / maxY) * (chartHeight - chartPadding.top - chartPadding.bottom)) - chartPadding.bottom;

  const getLinePath = (data: number[]) => {
    const width = 100;
    const step = width / (data.length - 1);
    return data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${getY(v)}`).join(' ');
  };

  const getDots = (data: number[]) => {
    const width = 100;
    const step = width / (data.length - 1);
    return data.map((v, i) => ({ x: i * step, y: getY(v) }));
  };

  const petctDots = getDots(workloadStats.map(s => s.petct));
  const spectDots = getDots(workloadStats.map(s => s.spect));

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>统计分析</h1>
        <p style={styles.subtitle}>核医学科工作量统计与趋势分析</p>
      </div>

      <div style={styles.kpiRow}>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}><Activity size={14} color="#1e40af" /> PET/CT</div>
          <div><span style={styles.kpiValue}>{totalPETCT}</span><span style={styles.kpiUnit}>例</span></div>
          <div style={styles.kpiTrend}>↑ 较上月 +7.4%</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}><Radio size={14} color="#3b82f6" /> SPECT</div>
          <div><span style={{ ...styles.kpiValue, color: '#3b82f6' }}>{totalSPECT}</span><span style={styles.kpiUnit}>例</span></div>
          <div style={styles.kpiTrend}>↑ 较上月 +5.6%</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}><Bone size={14} color="#60a5fa" /> 骨密度</div>
          <div><span style={{ ...styles.kpiValue, color: '#60a5fa' }}>{totalBone}</span><span style={styles.kpiUnit}>例</span></div>
          <div style={styles.kpiTrend}>↑ 较上月 +8.3%</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}><TrendingUp size={14} color="#a855f7" /> 核素治疗</div>
          <div><span style={{ ...styles.kpiValue, color: '#a855f7' }}>{totalTherapy}</span><span style={styles.kpiUnit}>例</span></div>
          <div style={styles.kpiTrend}>↑ 较上月 +10%</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}><BarChart3 size={14} color="#047857" /> 总工作量</div>
          <div><span style={{ ...styles.kpiValue, color: '#047857' }}>{grandTotal}</span><span style={styles.kpiUnit}>例</span></div>
          <div style={styles.kpiTrend}>月均 {Math.round(grandTotal / workloadStats.length)} 例</div>
        </div>
      </div>

      <div style={styles.chartGrid}>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>工作量趋势 (近6个月)</div>
          <div style={styles.chartArea}>
            <div style={styles.gridLines}>
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                <div key={i} style={{ position: 'absolute', left: 0, right: 0, bottom: `${p * 100}%`, borderTop: p < 1 ? '1px dashed #f3f4f6' : 'none' }}>
                  <span style={{ ...styles.gridLabel, bottom: 0 }}>{Math.round(maxY * (1 - p))}</span>
                </div>
              ))}
            </div>
            <svg viewBox={`0 0 100 ${chartHeight}`} preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: '40px', right: '20px', bottom: '30px', height: chartHeight }}>
              <path d={getLinePath(workloadStats.map(s => s.petct))} stroke={colors.petct} style={styles.linePath} />
              <path d={getLinePath(workloadStats.map(s => s.spect))} stroke={colors.spect} style={styles.linePath} />
              <path d={getLinePath(workloadStats.map(s => s.boneDensity))} stroke={colors.bone} style={styles.linePath} />
              <path d={getLinePath(workloadStats.map(s => s.nuclearTherapy))} stroke={colors.therapy} style={styles.linePath} />
              {petctDots.map((d, i) => <circle key={`petct-${i}`} cx={`${d.x}%`} cy={d.y} r="2" fill={colors.petct} />)}
              {spectDots.map((d, i) => <circle key={`spect-${i}`} cx={`${d.x}%`} cy={d.y} r="2" fill={colors.spect} />)}
            </svg>
          </div>
          <div style={styles.monthLabels}>
            {months.map(m => <span key={m} style={styles.monthLabel}>{m}</span>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' }}>
              <div style={{ width: '16px', height: '2px', background: colors.petct }} />
              PET/CT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' }}>
              <div style={{ width: '16px', height: '2px', background: colors.spect }} />
              SPECT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' }}>
              <div style={{ width: '16px', height: '2px', background: colors.bone }} />
              骨密度
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' }}>
              <div style={{ width: '16px', height: '2px', background: colors.therapy }} />
              核素治疗
            </div>
          </div>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>检查类型分布</div>
          <div style={styles.pieContainer}>
            <svg viewBox="0 0 100 100" style={styles.pieChart}>
              {(() => {
                let currentAngle = 0;
                const radius = 40;
                const cx = 50;
                const cy = 50;
                const total = pieData.reduce((sum, d) => sum + d.value, 0);
                
                return pieData.map((item, idx) => {
                  const percent = item.value / total;
                  const angle = percent * 360;
                  const startAngle = currentAngle;
                  const endAngle = currentAngle + angle;
                  currentAngle = endAngle;
                  
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = cx + radius * Math.cos(startRad);
                  const y1 = cy + radius * Math.sin(startRad);
                  const x2 = cx + radius * Math.cos(endRad);
                  const y2 = cy + radius * Math.sin(endRad);
                  
                  const largeArc = angle > 180 ? 1 : 0;
                  
                  return (
                    <path
                      key={idx}
                      d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                    />
                  );
                });
              })()}
              <circle cx="50" cy="50" r="20" fill="#fff" />
              <text x="50" y="52" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="600">{grandTotal}</text>
            </svg>
            <div style={styles.pieLegend}>
              {pieData.map((item, idx) => (
                <div key={idx} style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, background: item.color }} />
                  <span style={styles.legendLabel}>{item.label}</span>
                  <span style={styles.legendValue}>{item.value}</span>
                  <span style={styles.legendPercent}>{((item.value / grandTotal) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
