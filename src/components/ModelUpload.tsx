import React, { useState } from 'react';
import './ModelUpload.css';

const ModelUpload = () => {
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'api'
  const [modelName, setModelName] = useState('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [uploadStatus, setUploadStatus] = useState(''); // '', 'uploading', 'success', 'error'
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setModelFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (uploadMode === 'file') {
      if (modelFile) { // We only need the file to proceed
        setUploadStatus('uploading');
        setUploadMessage('正在上传模型...');
        const formData = new FormData();
        formData.append('modelFile', modelFile);
        // Pass the modelName as 'user'
        formData.append('user', modelName || '匿名用户');

        try {
          const response = await fetch('http://localhost:5001/api/upload', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();

          if (response.ok && result.success) {
            setUploadStatus('success');
            setUploadMessage(`模型上传成功！ID: ${result.model.id}`);
            setModelName('');
            setModelFile(null);
          } else {
            setUploadStatus('error');
            setUploadMessage(`上传失败: ${result.error || '未知错误'}`);
          }
        } catch (error) {
          setUploadStatus('error');
          setUploadMessage(`上传出错: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else {
        alert('请选择一个文件。');
      }
    } else {
      if (modelName && apiUrl) {
        console.log('Submitting API:', { modelName, apiUrl, apiKey });
        // Here you would typically save the API info
        alert(`API 模型 '${modelName}' 已提交.`);
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
          placeholder="请输入上传者信息"
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

      <button className="submit-button" onClick={handleSubmit} disabled={uploadStatus === 'uploading'}>
        {uploadStatus === 'uploading' ? '上传中...' : '提交'}
      </button>
      {uploadMessage && (
        <div className={`upload-status-message ${uploadStatus}`}>
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default ModelUpload;
