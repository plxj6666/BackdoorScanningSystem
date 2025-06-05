import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">🛡️</div>
              <div className="logo-text">
                <h1>AI模型后门扫描系统</h1>
                <p>Advanced Backdoor Detection System</p>
              </div>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-label">检测精度</span>
              <span className="stat-value">99.7%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">支持模型</span>
              <span className="stat-value">50+</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">扫描次数</span>
              <span className="stat-value">10,247</span>
            </div>
          </div>
        </div>
        
        <div className="header-bg-effect"></div>
      </div>
    </header>
  );
};

export default Header;
