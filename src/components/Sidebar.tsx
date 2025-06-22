import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>深瞳</h3>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/upload" className="nav-item">
          <span className="nav-icon">📤</span>
          <span className="nav-text">上传模型</span>
        </NavLink>
        <NavLink to="/scan" className="nav-item">
          <span className="nav-icon">🔍</span>
          <span className="nav-text">扫描模型</span>
        </NavLink>
        <NavLink to="/history" className="nav-item">
          <span className="nav-icon">📜</span>
          <span className="nav-text">扫描历史</span>
        </NavLink>
        <NavLink to="/profile" className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-text">用户信息</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
