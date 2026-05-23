// ExamPage.tsx - 检查执行页面
import React, { useState } from 'react';
import { Play, Pause, CheckCircle, Clock, User, Monitor, ArrowRight } from 'lucide-react';
import { examRecords } from '../data/initialData';
import type { ExamRecord } from '../types';

const ExamPage: React.FC = () => {
  const [records, setRecords] = useState<ExamRecord[]>(examRecords);

  const statusFlow: Record<string, string[]> = {
    '待检查': ['准备中'],
    '准备中': ['检查中'],
    '检查中': ['图像采集中'],
    '图像采集中': ['处理中'],
    '处理中': ['已完成'],
    '已完成': []
  };

  const getNextStatus = (currentStatus: string): string | null => {
    for (const [key, values] of Object.entries(statusFlow)) {
      if (values.includes(currentStatus)) {
        return key;
      }
      if (currentStatus === key && values.length > 0) {
        return values[0];
      }
    }
    return null;
  };

  const advanceStatus = (recordId: string) => {
    setRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        const nextStatus = getNextStatus(r.status);
        return nextStatus ? { ...r, status: nextStatus as ExamRecord['status'] } : r;
      }
      return r;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已完成': return <CheckCircle size={14} style={{ color: '#10b981' }} />;
      case '检查中': return <Play size={14} style={{ color: '#3b82f6' }} />;
      case '图像采集中': return <Monitor size={14} style={{ color: '#8b5cf6' }} />;
      case '处理中': return <Pause size={14} style={{ color: '#f59e0b' }} />;
      case '准备中': return <Clock size={14} style={{ color: '#6b7280' }} />;
      default: return <Clock size={14} style={{ color: '#9ca3af' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return { bg: '#ecfdf5', text: '#10b981' };
      case '检查中': return { bg: '#eff6ff', text: '#3b82f6' };
      case '图像采集中': return { bg: '#f5f3ff', text: '#8b5cf6' };
      case '处理中': return { bg: '#fffbeb', text: '#f59e0b' };
      case '准备中': return { bg: '#f3f4f6', text: '#6b7280' };
      case '待检查': return { bg: '#fef3c7', text: '#d97706' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'PET/CT': return '#1e40af';
      case 'SPECT': return '#7c3aed';
      case '核素治疗': return '#dc2626';
      case '骨密度': return '#059669';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f4f6f9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
          检查执行
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          管理检查执行流程，推进检查状态
        </p>
      </div>

      {/* Exam Records Table */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>患者姓名</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查类型</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查项目</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查日期</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>设备</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>医生</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>放射性药物</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>SUVmax</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>状态</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const statusStyle = getStatusColor(record.status);
              const nextStatus = getNextStatus(record.status);
              return (
                <tr key={record.id} style={{ borderBottom: index < records.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e40af', fontFamily: 'monospace' }}>{record.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} style={{ color: '#9ca3af' }} />
                      {record.patientName}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getExamTypeColor(record.examType) + '15',
                      color: getExamTypeColor(record.examType)
                    }}>
                      {record.examType}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{record.examItem}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={14} style={{ color: '#9ca3af' }} />
                      {record.examDate}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Monitor size={14} style={{ color: '#6b7280' }} />
                      {record.device}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{record.doctor}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: record.radiopharmaceutical ? '#1e40af' : '#9ca3af' }}>
                    {record.radiopharmaceutical || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: record.SUVmax ? '500' : '400', color: record.SUVmax ? '#dc2626' : '#9ca3af' }}>
                    {record.SUVmax || '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text
                    }}>
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {nextStatus ? (
                      <button
                        onClick={() => advanceStatus(record.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          backgroundColor: '#1e40af',
                          color: '#fff',
                          transition: 'all 0.2s'
                        }}
                      >
                        <ArrowRight size={14} />
                        推进至{nextStatus}
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>
                        已完成
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {records.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
            暂无检查记录
          </div>
        )}
      </div>

      {/* Status Flow Legend */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>状态流转流程</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '13px' }}>
          {['待检查', '准备中', '检查中', '图像采集中', '处理中', '已完成'].map((status, index) => (
            <React.Fragment key={status}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '4px',
                backgroundColor: getStatusColor(status).bg,
                color: getStatusColor(status).text
              }}>
                {status}
              </span>
              {index < 5 && <ArrowRight size={14} style={{ color: '#9ca3af' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
