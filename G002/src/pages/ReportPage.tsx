// ReportPage.tsx - 报告管理页面
import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Edit, Eye, Send, User } from 'lucide-react';
import { reports } from '../data/initialData';
import type { Report } from '../types';

const ReportPage: React.FC = () => {
  const [reportList, setReportList] = useState<Report[]>(reports);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已发布': return <CheckCircle size={14} style={{ color: '#10b981' }} />;
      case '已审核': return <CheckCircle size={14} style={{ color: '#3b82f6' }} />;
      case '待审核': return <Clock size={14} style={{ color: '#f59e0b' }} />;
      case '待书写': return <Edit size={14} style={{ color: '#6b7280' }} />;
      default: return <Clock size={14} style={{ color: '#9ca3af' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已发布': return { bg: '#ecfdf5', text: '#10b981' };
      case '已审核': return { bg: '#eff6ff', text: '#3b82f6' };
      case '待审核': return { bg: '#fffbeb', text: '#f59e0b' };
      case '待书写': return { bg: '#f3f4f6', text: '#6b7280' };
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

  const handleReview = (reportId: string) => {
    setReportList(prev => prev.map(r => {
      if (r.id === reportId && r.status === '待审核') {
        return { ...r, status: '已审核' as Report['status'] };
      }
      return r;
    }));
  };

  const handlePublish = (reportId: string) => {
    setReportList(prev => prev.map(r => {
      if (r.id === reportId && r.status === '已审核') {
        return { ...r, status: '已发布' as Report['status'] };
      }
      return r;
    }));
  };

  return (
    <div style={{ padding: '24px', background: '#f4f6f9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
          报告管理
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          管理检查报告，审核并发布报告
        </p>
      </div>

      {/* Reports Table */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>报告ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>患者姓名</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查类型</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查项目</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>检查日期</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>报告日期</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>报告医生</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>审核医生</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>SUVmax</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>状态</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((report, index) => {
              const statusStyle = getStatusColor(report.status);
              return (
                <tr key={report.id} style={{ borderBottom: index < reportList.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e40af', fontFamily: 'monospace' }}>{report.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} style={{ color: '#9ca3af' }} />
                      {report.patientName}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getExamTypeColor(report.examType) + '15',
                      color: getExamTypeColor(report.examType)
                    }}>
                      {report.examType}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{report.status}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={14} style={{ color: '#9ca3af' }} />
                      {report.examDate}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {report.reportDate || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{report.doctor}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: report.reviewer ? '#1e40af' : '#9ca3af' }}>
                    {report.reviewer || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: report.SUVmax ? '500' : '400', color: report.SUVmax ? '#dc2626' : '#9ca3af' }}>
                    {report.SUVmax || '-'}
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
                      {getStatusIcon(report.status)}
                      {report.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          fontSize: '12px',
                          cursor: 'pointer',
                          backgroundColor: '#fff',
                          color: '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={14} />
                        查看
                      </button>
                      {report.status === '待审核' && (
                        <button
                          onClick={() => handleReview(report.id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer',
                            backgroundColor: '#3b82f6',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle size={14} />
                          审核
                        </button>
                      )}
                      {report.status === '已审核' && (
                        <button
                          onClick={() => handlePublish(report.id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer',
                            backgroundColor: '#10b981',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Send size={14} />
                          发布
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {reportList.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
            暂无报告记录
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
        <span>总报告数: <strong style={{ color: '#1e40af' }}>{reportList.length}</strong></span>
        <span>待书写: <strong style={{ color: '#6b7280' }}>{reportList.filter(r => r.status === '待书写').length}</strong></span>
        <span>待审核: <strong style={{ color: '#f59e0b' }}>{reportList.filter(r => r.status === '待审核').length}</strong></span>
        <span>已审核: <strong style={{ color: '#3b82f6' }}>{reportList.filter(r => r.status === '已审核').length}</strong></span>
        <span>已发布: <strong style={{ color: '#10b981' }}>{reportList.filter(r => r.status === '已发布').length}</strong></span>
      </div>

      {/* Review Workflow */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>审核流程</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '13px' }}>
          {['待书写', '待审核', '已审核', '已发布'].map((status, index) => (
            <React.Fragment key={status}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '4px',
                backgroundColor: getStatusColor(status).bg,
                color: getStatusColor(status).text
              }}>
                {status}
              </span>
              {index < 3 && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#9ca3af' }}>
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
