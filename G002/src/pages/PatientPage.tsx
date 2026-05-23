// PatientPage.tsx - 患者管理页面
import React, { useState } from 'react';
import { Search, User, Phone, Calendar, AlertTriangle } from 'lucide-react';
import { patients } from '../data/initialData';
import type { Patient } from '../types';

const PatientPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.includes(searchTerm) ||
    p.id.includes(searchTerm) ||
    p.phone.includes(searchTerm) ||
    p.idCard.includes(searchTerm)
  );

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case '高': return '#dc2626';
      case '中': return '#f59e0b';
      case '低': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRiskBgColor = (risk?: string) => {
    switch (risk) {
      case '高': return '#fef2f2';
      case '中': return '#fffbeb';
      case '低': return '#ecfdf5';
      default: return '#f9fafb';
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f4f6f9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
          患者管理
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          管理患者信息，查看辐射风险等级
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="搜索患者姓名、ID、电话或身份证号..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '44px',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Patient Table */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>患者ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>姓名</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>性别</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>年龄</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>电话</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>身份证号</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>地址</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>PET/CT号</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>最近访问</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>辐射风险</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={patient.id} style={{ borderBottom: index < filteredPatients.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e40af' }}>{patient.id}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={16} style={{ color: '#9ca3af' }} />
                    {patient.name}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>{patient.gender}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>{patient.age}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} style={{ color: '#9ca3af' }} />
                    {patient.phone}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px', fontFamily: 'monospace' }}>{patient.idCard}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>{patient.address}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: patient.petctNo ? '#1e40af' : '#9ca3af' }}>
                  {patient.petctNo || '-'}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} style={{ color: '#9ca3af' }} />
                    {patient.lastVisit || '-'}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  {patient.radiationRisk ? (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getRiskBgColor(patient.radiationRisk),
                      color: getRiskColor(patient.radiationRisk)
                    }}>
                      <AlertTriangle size={12} />
                      {patient.radiationRisk}风险
                    </span>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPatients.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
            未找到匹配的患者
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
        <span>总患者数: <strong style={{ color: '#1e40af' }}>{patients.length}</strong></span>
        <span>高风险: <strong style={{ color: '#dc2626' }}>{patients.filter(p => p.radiationRisk === '高').length}</strong></span>
        <span>中风险: <strong style={{ color: '#f59e0b' }}>{patients.filter(p => p.radiationRisk === '中').length}</strong></span>
        <span>低风险: <strong style={{ color: '#10b981' }}>{patients.filter(p => p.radiationRisk === '低').length}</strong></span>
      </div>
    </div>
  );
};

export default PatientPage;
