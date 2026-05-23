// AppointmentPage.tsx - 检查预约页面
import React, { useState } from 'react';
import { Calendar, Clock, User, Filter, CheckCircle, XCircle, AlertCircle, FileQuestionMark } from 'lucide-react';
import { appointments } from '../data/initialData';
import type { Appointment } from '../types';

const AppointmentPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('全部');

  const statuses = ['全部', '待确认', '已确认', '检查中', '已完成', '已取消'];

  const filteredAppointments = statusFilter === '全部'
    ? appointments
    : appointments.filter(a => a.status === statusFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已完成': return <CheckCircle size={14} style={{ color: '#10b981' }} />;
      case '已确认': return <CheckCircle size={14} style={{ color: '#3b82f6' }} />;
      case '检查中': return <AlertCircle size={14} style={{ color: '#f59e0b' }} />;
      case '已取消': return <XCircle size={14} style={{ color: '#6b7280' }} />;
      case '待确认': return <FileQuestionMark size={14} style={{ color: '#f59e0b' }} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return { bg: '#ecfdf5', text: '#10b981' };
      case '已确认': return { bg: '#eff6ff', text: '#3b82f6' };
      case '检查中': return { bg: '#fffbeb', text: '#f59e0b' };
      case '已取消': return { bg: '#f3f4f6', text: '#6b7280' };
      case '待确认': return { bg: '#fffbeb', text: '#d97706' };
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
          检查预约
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          管理检查预约，查看预约状态
        </p>
      </div>

      {/* Status Filter */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Filter size={18} style={{ color: '#6b7280' }} />
        <span style={{ fontSize: '14px', color: '#6b7280' }}>状态筛选:</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                border: '1px solid',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: statusFilter === status ? '#1e40af' : '#fff',
                borderColor: statusFilter === status ? '#1e40af' : '#e5e7eb',
                color: statusFilter === status ? '#fff' : '#6b7280'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Table */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>预约ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>患者姓名</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查类型</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查项目</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>预约日期</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>预约时间</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>放射性药物</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>注射剂量</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>负责医生</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>状态</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt, index) => {
              const statusStyle = getStatusColor(apt.status);
              return (
                <tr key={apt.id} style={{ borderBottom: index < filteredAppointments.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e40af', fontFamily: 'monospace' }}>{apt.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} style={{ color: '#9ca3af' }} />
                      {apt.patientName}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getExamTypeColor(apt.examType) + '15',
                      color: getExamTypeColor(apt.examType)
                    }}>
                      {apt.examType}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{apt.examItem}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} style={{ color: '#9ca3af' }} />
                      {apt.scheduledDate}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={14} style={{ color: '#9ca3af' }} />
                      {apt.scheduledTime}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: apt.radiopharmaceutical ? '#1e40af' : '#9ca3af' }}>
                    {apt.radiopharmaceutical || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {apt.injectedDose || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{apt.doctor}</td>
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
                      {getStatusIcon(apt.status)}
                      {apt.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredAppointments.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
            未找到匹配的预约记录
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '16px',
        padding: '12px 16px',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        display: 'flex',
        gap: '24px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <span>总预约数: <strong style={{ color: '#1e40af' }}>{appointments.length}</strong></span>
        <span>待确认: <strong style={{ color: '#d97706' }}>{appointments.filter(a => a.status === '待确认').length}</strong></span>
        <span>已确认: <strong style={{ color: '#3b82f6' }}>{appointments.filter(a => a.status === '已确认').length}</strong></span>
        <span>检查中: <strong style={{ color: '#f59e0b' }}>{appointments.filter(a => a.status === '检查中').length}</strong></span>
        <span>已完成: <strong style={{ color: '#10b981' }}>{appointments.filter(a => a.status === '已完成').length}</strong></span>
      </div>
    </div>
  );
};

export default AppointmentPage;
