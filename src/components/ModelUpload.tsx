import React, { useState } from 'react';
import './ModelUpload.css';

const ModelUpload = () => {
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'api'

  return (
    <div className="file-upload-section">
      <div className="upload-mode-selector">
        <button 
          className={uploadMode === 'file' ? 'active' : ''}
          onClick={() => setUploadMode('file')}
        >
          上传模型文件
        </button>
        <button 
          className={uploadMode === 'api' ? 'active' : ''}
          onClick={() => setUploadMode('api')}
        >
          使用API接口
        </button>
      </div>

      {uploadMode === 'file' && (
        <div className="upload-content">
          <p>支持 .pth, .h5, .pb 等格式的模型文件。</p>
          <input type="file" accept=".pth,.h5,.pb" />
        </div>
      )}

      {uploadMode === 'api' && (
        <div className="upload-content">
          <input type="text" placeholder="API 端点 URL" className="api-input" />
          <textarea placeholder="认证信息 (例如, API Key)" className="api-input"></textarea>
        </div>
      )}
    </div>
  );
};

export default ModelUpload;
