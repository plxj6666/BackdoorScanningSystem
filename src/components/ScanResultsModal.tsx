import React from 'react';
import './ScanResultsModal.css';

interface ScanResult {
  '是否存在后门': boolean;
  '置信度': number;
  '触发器': string;
  '为什么认为存在后门': string;
  '扫描耗时': number;
  model_id?: string;
  model_type?: 'LLM' | 'Image Classification' | 'Unknown';
  model_architecture?: string;
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH';
  scan_method?: 'Quick Scan' | 'Deep Scan' | 'Standard Scan';
  recommendations?: string[];
  details?: {
    weight_analysis?: string;
    pattern_matching?: string;
    statistical_analysis?: string;
    anomaly_detection?: string;
    signature_verification?: string;
  };
}

interface UserModel {
  id: string;
  name: string;
  user: string;
  size: string;
  date: string;
}

interface ScanResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ScanResult | null;
  modelInfo?: UserModel;
}

const ScanResultsModal: React.FC<ScanResultsModalProps> = ({
  isOpen,
  onClose,
  result,
  modelInfo
}) => {
  if (!isOpen || !result) return null;

  const isBackdoor = result['是否存在后门'];
  const confidence = result['置信度'];
  const trigger = result['触发器'];
  const reasoning = result['为什么认为存在后门'];
  const scanTime = result['扫描耗时'];
  const recommendations = result.recommendations || [];
  const details = result.details || {};

  const getRiskLevel = () => {
    if (result.risk_level) return result.risk_level;
    if (!isBackdoor) return 'LOW';
    if (confidence > 0.9) return 'HIGH';
    return 'MEDIUM';
  };

  const getRiskColor = () => {
    const risk = getRiskLevel();
    switch (risk) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = () => {
    return isBackdoor ? '⚠️' : '✅';
  };

  const getStatusText = () => {
    return isBackdoor ? '检测到后门攻击' : '未检测到异常';
  };

  const exportReport = () => {
    const reportData = {
      scan_timestamp: new Date().toISOString(),
      model_info: modelInfo,
      result: result,
      generated_at: new Date().toLocaleString('zh-CN')
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `backdoor_scan_report_${result.model_id || 'unknown'}_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const getSecurityScore = () => {
    if (!isBackdoor) return 90 + (confidence * 10);
    return Math.max(10, 100 - (confidence * 100));
  };

  const getDetailSteps = () => {
    return [
      { key: 'weight_analysis', label: '权重分析', icon: '⚖️' },
      { key: 'pattern_matching', label: '模式匹配', icon: '🔍' },
      { key: 'statistical_analysis', label: '统计分析', icon: '📊' },
      { key: 'anomaly_detection', label: '异常检测', icon: '🚨' },
      { key: 'signature_verification', label: '签名验证', icon: '🔐' }
    ];
  };

  return (
    <div className="scan-results-overlay" onClick={onClose}>
      <div className="scan-results-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="status-icon">{getStatusIcon()}</div>
            <div className="header-text">
              <h2>扫描结果</h2>
              <p className={`status-text ${isBackdoor ? 'danger' : 'safe'}`}>
                {getStatusText()}
              </p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Model Info */}
        {modelInfo && result && (
          <div className="model-info-section">
            <h3>扫描信息</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">模型来源:</span>
                <span className="info-value">{modelInfo.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">模型类型:</span>
                <span className="info-value">{result.model_type || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">模型架构:</span>
                <span className="info-value">{result.model_architecture || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">扫描策略:</span>
                <span className="info-value">{result.scan_method || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">扫描耗时:</span>
                <span className="info-value">{scanTime.toFixed(1)} 秒</span>
              </div>
            </div>
          </div>
        )}

        {/* Model Architecture Details */}
        {result && result.model_type && result.model_architecture && (
          <div className="model-architecture-section">
            <div className="result-card architecture-card">
              <div className="result-header">
                <span className="result-icon">🏗️</span>
                <span className="result-title">模型架构详情</span>
              </div>
              <div className="architecture-content">
                <div className="architecture-info">
                  <div className="arch-item">
                    <div className="arch-label">模型类型</div>
                    <div className="arch-value">
                      <span className={`model-type-badge ${result.model_type.toLowerCase().replace(' ', '-')}`}>
                        {result.model_type}
                      </span>
                    </div>
                  </div>
                  <div className="arch-item">
                    <div className="arch-label">架构名称</div>
                    <div className="arch-value">{result.model_architecture}</div>
                  </div>
                  <div className="arch-item">
                    <div className="arch-label">检测方法</div>
                    <div className="arch-value">
                      {result.model_type === 'LLM' ? 'Transformer注意力分析' : 'CNN特征图分析'}
                    </div>
                  </div>
                  <div className="arch-item">
                    <div className="arch-label">安全特性</div>
                    <div className="arch-value">
                      {result.model_type === 'LLM' ? '注意力权重监控' : '卷积层权重检测'}
                    </div>
                  </div>
                </div>
                <div className="architecture-description">
                  <p>
                    {result.model_type === 'LLM' 
                      ? '大型语言模型采用Transformer架构，通过注意力机制处理序列数据。后门检测重点关注注意力权重的异常分布和特定token的响应模式。'
                      : '图像分类模型通常基于CNN架构，通过卷积层提取特征。后门检测主要关注卷积核的异常模式和特征图的激活异常。'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Results */}
        <div className="results-section">
          <h3>检测详情</h3>
          
          {/* Security Score Overview */}
          <div className="result-card security-overview">
            <div className="result-header">
              <span className="result-icon">🛡️</span>
              <span className="result-title">安全性评分</span>
            </div>
            <div className="security-score-display">
              <div className="score-circle">
                <div className="score-value">{getSecurityScore().toFixed(0)}</div>
                <div className="score-label">安全分</div>
              </div>
              <div className="score-details">
                <div className="score-item">
                  <span className="score-metric">检测精度</span>
                  <span className="score-number">{(confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="score-item">
                  <span className="score-metric">扫描时间</span>
                  <span className="score-number">{scanTime.toFixed(1)}s</span>
                </div>
                <div className="score-item">
                  <span className="score-metric">风险等级</span>
                  <span className="score-number" style={{ color: getRiskColor() }}>
                    {getRiskLevel()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Confidence Score */}
          <div className="result-card">
            <div className="result-header">
              <span className="result-icon">📊</span>
              <span className="result-title">置信度评分</span>
            </div>
            <div className="confidence-display">
              <div className="confidence-bar-container">
                <div 
                  className="confidence-bar"
                  style={{ 
                    width: `${confidence * 100}%`,
                    backgroundColor: getRiskColor()
                  }}
                ></div>
              </div>
              <div className="confidence-text">
                <span className="confidence-value">{(confidence * 100).toFixed(1)}%</span>
                <span 
                  className="risk-level"
                  style={{ color: getRiskColor() }}
                >
                  {getRiskLevel()}风险
                </span>
              </div>
            </div>
          </div>

          {/* Detection Process */}
          <div className="result-card">
            <div className="result-header">
              <span className="result-icon">🔬</span>
              <span className="result-title">检测流程</span>
            </div>
            <div className="detection-steps">
              {getDetailSteps().map((step) => (
                <div key={step.key} className="detection-step">
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <div className="step-label">{step.label}</div>
                    <div className="step-status">
                      {details[step.key as keyof typeof details] || '已完成'}
                    </div>
                  </div>
                  <div className="step-indicator">✓</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger Information */}
          <div className="result-card">
            <div className="result-header">
              <span className="result-icon">🎯</span>
              <span className="result-title">检测到的触发器</span>
            </div>
            <div className="trigger-content">
              {trigger && trigger.endsWith('.png') ? (
                <img src={trigger} alt="Trigger" style={{ maxWidth: '100%', borderRadius: '4px' }} />
              ) : (
                <code className="trigger-text">{trigger}</code>
              )}
              {isBackdoor && (
                <div className="trigger-warning">
                  <span className="warning-icon">⚠️</span>
                  <span>检测到可疑触发器模式，建议进一步验证</span>
                </div>
              )}
            </div>
          </div>

          {/* Reasoning */}
          <div className="result-card">
            <div className="result-header">
              <span className="result-icon">🔍</span>
              <span className="result-title">分析说明</span>
            </div>
            <div className="reasoning-content">
              <p>{reasoning}</p>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="result-card">
              <div className="result-header">
                <span className="result-icon">💡</span>
                <span className="result-title">安全建议</span>
              </div>
              <div className="recommendations-content">
                {recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="rec-bullet">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          <div className="result-card risk-assessment">
            <div className="result-header">
              <span className="result-icon">⚡</span>
              <span className="result-title">风险评估</span>
            </div>
            <div className="risk-content">
              <div 
                className="risk-indicator"
                style={{ backgroundColor: getRiskColor() }}
              >
                {getRiskLevel()}
              </div>
              <div className="risk-description">
                {isBackdoor 
                  ? "检测到潜在的后门攻击，建议谨慎使用此模型" 
                  : "模型安全性良好，可以正常使用"
                }
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="action-button secondary" onClick={onClose}>
            <span className="button-icon">✕</span>
            关闭
          </button>
          <button 
            className="action-button primary"
            onClick={exportReport}
          >
            <span className="button-icon">📊</span>
            导出报告
          </button>
          <button 
            className="action-button info"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(result, null, 2));
              alert('扫描结果已复制到剪贴板');
            }}
          >
            <span className="button-icon">📋</span>
            复制结果
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanResultsModal;
