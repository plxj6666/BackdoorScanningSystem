import React from 'react';
import './LoadingOverlay.css';

interface LoadingOverlayProps {
  progress: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ progress }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="scanning-circle">
            <div className="inner-circle"></div>
            <div className="outer-circle"></div>
          </div>
          <div className="scanning-beam"></div>
        </div>
        
        <div className="loading-text">
          <h3>正在扫描模型...</h3>
          <p>AI后门检测算法正在分析您的模型</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-percentage">{progress}%</span>
        </div>
        
        <div className="scanning-stages">
          <div className={`stage ${progress >= 20 ? 'completed' : progress >= 10 ? 'active' : ''}`}>
            <span className="stage-icon">📄</span>
            <span className="stage-text">代码分析</span>
          </div>
          <div className={`stage ${progress >= 50 ? 'completed' : progress >= 30 ? 'active' : ''}`}>
            <span className="stage-icon">⚖️</span>
            <span className="stage-text">权重检测</span>
          </div>
          <div className={`stage ${progress >= 80 ? 'completed' : progress >= 60 ? 'active' : ''}`}>
            <span className="stage-icon">🧠</span>
            <span className="stage-text">行为分析</span>
          </div>
          <div className={`stage ${progress >= 100 ? 'completed' : progress >= 90 ? 'active' : ''}`}>
            <span className="stage-icon">📊</span>
            <span className="stage-text">结果生成</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
