import React from 'react';
import { ScanResult } from '../types';
import './ScanResults.css';

interface ScanResultsProps {
  result: ScanResult;
}

const ScanResults: React.FC<ScanResultsProps> = ({ result }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff4757';
      case 'high': return '#ff6b7a';
      case 'medium': return '#ffa726';
      case 'low': return '#66bb6a';
      default: return '#90a4ae';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'failed': return '#f44336';
      case 'running': return '#2196f3';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="scan-results">
      <div className="results-header">
        <h2>扫描结果</h2>
        <div className={`status-badge ${result.status}`}>
          <span className="status-dot" style={{ backgroundColor: getStatusColor(result.status) }}></span>
          {result.status === 'running' ? '扫描中' : 
           result.status === 'completed' ? '扫描完成' : 
           result.status === 'failed' ? '扫描失败' : '等待中'}
        </div>
      </div>

      {result.status === 'running' && (
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${result.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{result.progress}%</span>
        </div>
      )}

      {result.status === 'failed' && result.error && (
        <div className="error-section">
          <div className="error-message">
            <span className="error-icon">❌</span>
            {result.error}
          </div>
        </div>
      )}

      {result.status === 'completed' && result.results && (
        <div className="results-content">
          <div className="summary-section">
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-icon">
                  {result.results.backdoorDetected ? '🚨' : '✅'}
                </div>
                <div className="summary-content">
                  <h3>检测结果</h3>
                  <p className={result.results.backdoorDetected ? 'threat-detected' : 'no-threat'}>
                    {result.results.backdoorDetected ? '检测到后门威胁' : '未发现后门威胁'}
                  </p>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">📊</div>
                <div className="summary-content">
                  <h3>置信度</h3>
                  <p>{result.results.confidence.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">⏱️</div>
                <div className="summary-content">
                  <h3>扫描时长</h3>
                  <p>{result.results.scanDuration.toFixed(1)}s</p>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">🔍</div>
                <div className="summary-content">
                  <h3>威胁数量</h3>
                  <p>{result.results.threats.length}个</p>
                </div>
              </div>
            </div>
          </div>

          {result.results.threats.length > 0 && (
            <div className="threats-section">
              <h3>威胁详情</h3>
              <div className="threats-list">
                {result.results.threats.map((threat, index) => (
                  <div key={index} className="threat-item">
                    <div className="threat-header">
                      <div className="threat-type">{threat.type}</div>
                      <div 
                        className="threat-severity"
                        style={{ backgroundColor: getSeverityColor(threat.severity) }}
                      >
                        {threat.severity === 'critical' ? '严重' :
                         threat.severity === 'high' ? '高' :
                         threat.severity === 'medium' ? '中' : '低'}
                      </div>
                    </div>
                    <div className="threat-description">{threat.description}</div>
                    <div className="threat-details">
                      <span className="threat-confidence">置信度: {threat.confidence.toFixed(1)}%</span>
                      {threat.location && (
                        <span className="threat-location">位置: {threat.location}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanResults;
