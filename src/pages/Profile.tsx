import React, { useState, useEffect } from 'react';
import './Page.css';
import './Profile.css';

const Profile: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 通过API获取当前用户信息
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/user/admin');
        if (!response.ok) throw new Error('获取用户信息失败');
        const data = await response.json();
        setNickname(data.nickname || '');
      } catch (e) {
        alert('无法获取用户信息，请检查后端服务');
      } finally {
        setLoading(false);
    }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      alert('新密码和确认密码不匹配。');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/user/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          password: password || undefined
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert('用户信息已更新！');
    setPassword('');
    setConfirmPassword('');
      } else {
        alert(data.error || '更新失败');
      }
    } catch (e) {
      alert('更新失败，请检查网络或后端服务');
    }
  };

  if (loading) {
    return <div className="page-container profile-page"><div className="profile-card">正在加载用户信息...</div></div>;
  }

  return (
    <div className="page-container profile-page">
      <div className="profile-card">
      <div className="page-header">
        <h1>用户信息</h1>
        <p>管理您的个人资料信息。</p>
      </div>
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="nickname">昵称</label>
            <input 
              type="text" 
              id="nickname" 
              className="profile-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">新密码</label>
            <input 
              type="password" 
              id="password" 
              className="profile-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="留空则不修改"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">确认新密码</label>
            <input 
              type="password" 
              id="confirmPassword"
              className="profile-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="profile-submit-button" onClick={handleUpdate}>更新信息</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
