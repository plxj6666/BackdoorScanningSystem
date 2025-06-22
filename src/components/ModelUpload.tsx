import React, { useState } from 'react';
import './ModelUpload.css';

const ModelUpload = () => {
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'api'
  const [modelName, setModelName] = useState('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setModelFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (uploadMode === 'file') {
      if (modelName && modelFile) {
        console.log('Uploading file:', { modelName, modelFile });
        // Here you would typically send the file to a server
        // For now, we'll just log it
        alert(`模型 '${modelName}' 已上传 (模拟).`);
        setModelName('');
        setModelFile(null);
      } else {
        alert('请输入模型名称并选择一个文件。');
      }
    } else {
      if (modelName && apiUrl) {
        console.log('Submitting API:', { modelName, apiUrl, apiKey });
        // Here you would typically save the API info
        alert(`API 模型 '${modelName}' 已提交 (模拟).`);
        setModelName('');
        setApiUrl('');
        setApiKey('');
      } else {
        alert('请输入模型名称和 API URL。');
      }
    }
  };

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

      <div className="model-name-input">
        <input 
          type="text" 
          placeholder="为您的模型命名"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />
      </div>

      {uploadMode === 'file' && (
        <div className="upload-content">
          <p>支持 .pth, .h5, .pb 等格式的模型文件。</p>
          <input type="file" accept=".pth,.h5,.pb" onChange={handleFileChange} />
        </div>
      )}

      {uploadMode === 'api' && (
        <div className="upload-content">
          <input 
            type="text" 
            placeholder="API 端点 URL" 
            className="api-input" 
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
          <textarea 
            placeholder="认证信息 (例如, API Key)" 
            className="api-input"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          ></textarea>
        </div>
      )}

      <button className="submit-button" onClick={handleSubmit}>提交</button>
    </div>
  );
};

export default ModelUpload;
