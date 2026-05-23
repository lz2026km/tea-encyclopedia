// ReportWritePage.tsx - PET/CT报告书写页面
import React, { useState } from 'react';
import { FileText, Save, Send, User, Activity, Crosshair, TrendingUp } from 'lucide-react';
import { examRecords } from '../data/initialData';

const ReportWritePage: React.FC = () => {
  const [formData, setFormData] = useState({
    examId: 'EX003',
    patientName: '张志明',
    examType: 'PET/CT',
    examItem: '前列腺癌评估',
    examDate: '2026-05-02',
    indication: '',
    technique: 'PET/CT全身扫描，屏气CT，迭代重建',
    findings: '',
    conclusion: '',
    SUVmax: '',
    SUVpeak: '',
    liverBackground: '',
    imageCount: '',
    seriesCount: '',
    reviewer: '李主任'
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('保存报告:', formData);
    alert('报告已保存');
  };

  const handleSubmit = () => {
    console.log('提交报告:', formData);
    alert('报告已提交待审核');
  };

  return (
    <div style={{ padding: '24px', background: '#f4f6f9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
          PET/CT 报告书写
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          填写PET/CT结构化报告，包含SUV值等定量指标
        </p>
      </div>

      {/* Basic Info Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} style={{ color: '#1e40af' }} />
          基本信息
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>检查ID</label>
            <input
              type="text"
              value={formData.examId}
              onChange={(e) => handleChange('examId', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#f9fafb',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>患者姓名</label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>检查类型</label>
            <input
              type="text"
              value={formData.examType}
              readOnly
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#eff6ff',
                color: '#1e40af',
                fontWeight: '500',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>检查项目</label>
            <input
              type="text"
              value={formData.examItem}
              readOnly
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#f9fafb',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Clinical Info Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: '#1e40af' }} />
          临床信息
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>检查指征 (Indication)</label>
            <textarea
              value={formData.indication}
              onChange={(e) => handleChange('indication', e.target.value)}
              placeholder="请输入检查指征..."
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>检查技术 (Technique)</label>
            <textarea
              value={formData.technique}
              onChange={(e) => handleChange('technique', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* SUV Values Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} style={{ color: '#dc2626' }} />
          SUV定量指标
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              <Crosshair size={12} style={{ marginRight: '4px' }} />
              SUVmax
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.SUVmax}
              onChange={(e) => handleChange('SUVmax', e.target.value)}
              placeholder="0.0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: formData.SUVmax ? '#dc2626' : '#374151',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              <Activity size={12} style={{ marginRight: '4px' }} />
              SUVpeak
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.SUVpeak}
              onChange={(e) => handleChange('SUVpeak', e.target.value)}
              placeholder="0.0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              <Activity size={12} style={{ marginRight: '4px' }} />
              肝脏背景值
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.liverBackground}
              onChange={(e) => handleChange('liverBackground', e.target.value)}
              placeholder="0.0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              <FileText size={12} style={{ marginRight: '4px' }} />
              肝脏SUV参考值
            </label>
            <div style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#f9fafb',
              color: '#6b7280'
            }}>
              正常范围: 1.5-2.5
            </div>
          </div>
        </div>

        {/* SUV Analysis Guide */}
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: '#fef2f2',
          borderRadius: '6px',
          border: '1px solid #fecaca'
        }}>
          <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>SUV值临床意义</h4>
          <div style={{ fontSize: '12px', color: '#6b7280', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div>• SUVmax &lt; 2.5: 良性可能性大</div>
            <div>• SUVmax 2.5-4.0: 需密切随访</div>
            <div>• SUVmax &gt; 4.0: 恶性可能性大</div>
          </div>
        </div>
      </div>

      {/* Image Info Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: '#1e40af' }} />
          图像信息
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>图像数量</label>
            <input
              type="number"
              value={formData.imageCount}
              onChange={(e) => handleChange('imageCount', e.target.value)}
              placeholder="0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>系列数量</label>
            <input
              type="number"
              value={formData.seriesCount}
              onChange={(e) => handleChange('seriesCount', e.target.value)}
              placeholder="0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Findings Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: '#1e40af' }} />
          影像所见 (Findings)
        </h2>
        <textarea
          value={formData.findings}
          onChange={(e) => handleChange('findings', e.target.value)}
          placeholder="请详细描述影像所见..."
          rows={6}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Conclusion Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: '#1e40af' }} />
          诊断结论 (Conclusion)
        </h2>
        <textarea
          value={formData.conclusion}
          onChange={(e) => handleChange('conclusion', e.target.value)}
          placeholder="请输入诊断结论..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Reviewer & Actions */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>审核医生</label>
            <input
              type="text"
              value={formData.reviewer}
              onChange={(e) => handleChange('reviewer', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '16px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px'
      }}>
        <button
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#fff',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Save size={16} />
          保存
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#1e40af',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Send size={16} />
          提交审核
        </button>
      </div>
    </div>
  );
};

export default ReportWritePage;
