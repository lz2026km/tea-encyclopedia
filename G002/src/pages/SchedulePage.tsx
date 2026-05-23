import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';

const styles = {
  page: { padding: '0' },
  header: { marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 700, color: '#1e40af', margin: 0 },
  subtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
  tabBar: {
    display: 'flex', gap: '4px', background: '#fff', borderRadius: '10px',
    padding: '6px', border: '1px solid #e5e7eb', marginBottom: '20px', width: 'fit-content'
  },
  weekNav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '16px'
  },
  weekLabel: { fontSize: '16px', fontWeight: 600, color: '#1e40af' },
  navBtn: {
    background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px',
    padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '13px', color: '#374151'
  },
  calendar: {
    background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  weekHeader: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
    background: '#f8fafc', borderBottom: '1px solid #e5e7eb'
  },
  dayLabel: {
    padding: '10px 8px', textAlign: 'center' as const, fontSize: '12px', fontWeight: 600,
    color: '#6b7280'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
  },
  cell: {
    minHeight: '100px', padding: '8px', borderRight: '1px solid #f3f4f6',
    borderBottom: '1px solid #f3f4f6', verticalAlign: 'top'
  },
  staffCard: {
    padding: '12px', background: '#f8fafc', borderRadius: '8px',
    border: '1px solid #e5e7eb', marginBottom: '8px'
  },
  staffName: { fontSize: '13px', fontWeight: 600, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px' },
  staffRole: { fontSize: '11px', color: '#6b7280', marginTop: '2px' },
  emptyCell: { textAlign: 'center' as const, padding: '20px', color: '#d1d5db', fontSize: '12px' },
};

function tab(active: boolean): React.CSSProperties {
  return {
    padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
    fontWeight: active ? 600 : 400, background: active ? '#1e40af' : 'transparent',
    color: active ? '#fff' : '#6b7280', border: 'none', display: 'flex', alignItems: 'center', gap: '6px'
  };
}

function dayName(today: boolean): React.CSSProperties {
  return {
    padding: '6px', textAlign: 'center', fontSize: '11px', fontWeight: today ? 600 : 400,
    color: today ? '#1e40af' : '#9ca3af'
  };
}

function dateNum(today: boolean, off: boolean): React.CSSProperties {
  return {
    fontSize: '13px', fontWeight: 600, marginBottom: '6px',
    color: off ? '#d1d5db' : today ? '#1e40af' : '#374151',
    background: today ? '#dbeafe' : 'transparent',
    width: '24px', height: '24px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  };
}

function scheduleItem(color: string): React.CSSProperties {
  return {
    fontSize: '11px', padding: '4px 6px', borderRadius: '4px', marginBottom: '4px',
    background: color, color: '#fff', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
  };
}

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const WEEK_OFFSET = 0; // current week

// Mock schedule data
const doctorSchedule = [
  { day: 0, name: '张明华', shift: '上午班', tasks: ['PET/CT-01(张志明)', 'PET/CT-02(赵德明)'] },
  { day: 0, name: '李晓东', shift: '下午班', tasks: ['SPECT(陈丽华)'] },
  { day: 1, name: '张明华', shift: '全天班', tasks: ['PET/CT-01(李建国)', 'PET/CT-02(王秀英)', 'PET/CT-01(孙强)'] },
  { day: 2, name: '王丽华', shift: '上午班', tasks: ['SPECT-01(吴敏)'] },
  { day: 2, name: '李晓东', shift: '下午班', tasks: ['骨密度(郑晓燕)'] },
  { day: 3, name: '张明华', shift: '全天班', tasks: ['PET/CT-01(黄建国)', 'PET/CT-02(林美红)'] },
  { day: 4, name: '王丽华', shift: '上午班', tasks: ['SPECT-01(周伟)'] },
];

const nurseSchedule = [
  { day: 0, name: '陈护士', shift: '全天班', tasks: ['注射: 18F-FDG(张志明)', '注射: 18F-PSMA(赵德明)'] },
  { day: 1, name: '陈护士', shift: '全天班', tasks: ['注射: 18F-FDG(李建国)', '注射: 18F-FDG(王秀英)', '注射: 18F-FDG(孙强)'] },
  { day: 2, name: '陈护士', shift: '上午班', tasks: ['注射: 99mTc-MIBI(吴敏)'] },
  { day: 3, name: '陈护士', shift: '全天班', tasks: ['注射: 99mTc-MDP(黄建国)', '注射: 99mTc-DTPA(林美红)'] },
  { day: 4, name: '陈护士', shift: '上午班', tasks: ['注射: 99mTc-MIBI(周伟)'] },
];

const COLOR_MAP = ['#1e40af', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'];

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<'doctor' | 'nurse'>('doctor');
  const schedule = activeTab === 'doctor' ? doctorSchedule : nurseSchedule;

  // Generate days for current week
  const today = new Date('2026-05-02');
  const todayDayOfWeek = today.getDay(); // 0=Sun, convert to Mon=0
  const mondayOffset = todayDayOfWeek === 0 ? -6 : 1 - todayDayOfWeek;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + mondayOffset + i);
    return d;
  });

  const weekLabel = `${weekDays[0].getMonth() + 1}月${weekDays[0].getDate()}日 - ${weekDays[6].getMonth() + 1}月${weekDays[6].getDate()}日`;

  const getDaySchedule = (dayIndex: number) => {
    return schedule.filter(s => s.day === dayIndex);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>排班管理</h1>
        <p style={styles.subtitle}>核医学科医护人员排班表</p>
      </div>

      {/* Tab */}
      <div style={styles.tabBar}>
        <button style={tab(activeTab === 'doctor')} onClick={() => setActiveTab('doctor')}>
          <User size={14} /> 医生
        </button>
        <button style={tab(activeTab === 'nurse')} onClick={() => setActiveTab('nurse')}>
          <User size={14} /> 护士
        </button>
      </div>

      {/* Week Navigation */}
      <div style={styles.weekNav}>
        <button style={styles.navBtn}>
          <ChevronLeft size={16} /> 上一周
        </button>
        <span style={styles.weekLabel}>{weekLabel}</span>
        <button style={styles.navBtn}>
          下一周 <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar */}
      <div style={styles.calendar}>
        {/* Week Header */}
        <div style={styles.weekHeader}>
          {DAYS.map((d, i) => {
            const day = weekDays[i];
            const isToday = day.toDateString() === today.toDateString();
            return (
              <div key={d} style={styles.dayLabel}>
                <div>{d}</div>
                <div style={dayName(isToday)}>{day.getDate()}日</div>
              </div>
            );
          })}
        </div>

        {/* Grid */}
        <div style={styles.grid}>
          {weekDays.map((day, dayIdx) => {
            const isToday = day.toDateString() === today.toDateString();
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            const daySchedule = getDaySchedule(dayIdx);

            return (
              <div key={dayIdx} style={styles.cell}>
                <div style={dateNum(isToday, false)}>{day.getDate()}</div>
                {daySchedule.length === 0 ? (
                  <div style={styles.emptyCell}>休</div>
                ) : (
                  daySchedule.map((s, i) => (
                    <div key={i} style={scheduleItem(COLOR_MAP[i % COLOR_MAP.length])} title={s.name}>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div>{s.shift}</div>
                      {s.tasks.map((t, j) => (
                        <div key={j} style={{ fontSize: '10px', opacity: 0.9 }}>{t}</div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
