import React from 'react';
import ModelUpload from '../components/ModelUpload';
import './Page.css';
import './UploadModel.css';

const UploadModel = () => {
  return (
    <div className="page-container upload-model-page">
      <div className="upload-model-card">
      <div className="page-header">
        <h1>上传模型</h1>
        <p>在此处上传您的模型文件或提供 API 端点以进行安全扫描。</p>
      </div>
      <div className="page-content">
        <ModelUpload />
        </div>
      </div>
    </div>
  );
};

export default UploadModel;
