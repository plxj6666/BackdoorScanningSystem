import { useState } from 'react';
import './BackdoorScanner.css';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  file: File;
}

const BackdoorScannerSimple = () => {
  const [modelCode, setModelCode] = useState<UploadedFile | null>(null);
  const [modelWeights, setModelWeights] = useState<UploadedFile | null>(null);
  const [validationData, setValidationData] = useState<UploadedFile | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleFileUpload = (fileType: string, file: File) => {
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      file
    };

    if (fileType === 'modelCode') setModelCode(uploadedFile);
    if (fileType === 'modelWeights') setModelWeights(uploadedFile);
    if (fileType === 'validationData') setValidationData(uploadedFile);
  };

  const handleStartScan = () => {
    if (!modelCode || !modelWeights || !validationData) {
      alert('请上传所有必需的文件');
      return;
    }

    setIsScanning(true);
    
    // 模拟扫描过程
    setTimeout(() => {
      setIsScanning(false);
      alert('扫描完成！未发现后门威胁。');
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent, fileType: string) => {
    e.preventDefault();
    setDragOver(fileType);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, fileType: string) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(fileType, files[0]);
    }
  };

  const handleReset = () => {
    setModelCode(null);
    setModelWeights(null);
    setValidationData(null);
    setIsScanning(false);
  };

  return (
    <div className="backdoor-scanner">
      {/* Header */}
      <div className="scanner-header">
        <div className="header-content">
          <div className="scanner-logo">
            <div className="logo-icon">🔍</div>
            <div className="logo-text">
              <h1>AI后门扫描系统</h1>
              <p>Advanced Backdoor Detection for AI Models</p>
            </div>
          </div>
          <div className="system-status">
            <div className="status-indicator"></div>
            <span>系统就绪</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="scanner-main">
        <div className="scanner-container">
          {/* File Upload Section */}
          <div className="upload-section">
            <div className="section-header">
              <h2>📁 文件上传</h2>
              <p>请上传您的AI模型文件进行后门检测</p>
            </div>

            <div className="upload-grid">
              {/* Model Code Upload */}
              <div className="file-upload">
                <div className="upload-header">
                  <div className="upload-icon">📄</div>
                  <div className="upload-title">
                    <h3>模型代码</h3>
                    <span className="required">*</span>
                  </div>
                </div>
                <div 
                  className={`upload-area ${dragOver === 'modelCode' ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 'modelCode')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'modelCode')}
                  onClick={() => document.getElementById('modelCodeInput')?.click()}
                  style={{ borderColor: dragOver === 'modelCode' ? '#007bff' : undefined }}
                >
                  {modelCode ? (
                    <div className="file-info">
                      <div className="file-icon">✅</div>
                      <div className="file-details">
                        <div className="file-name">{modelCode.name}</div>
                        <div className="file-meta">
                          <span className="file-size">{(modelCode.size / 1024).toFixed(2)} KB</span>
                          <span className="file-type">{modelCode.type}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <div className="upload-icon-large">📄</div>
                      <p>拖拽或点击上传模型代码文件</p>
                      <p className="file-types">支持: .py, .ipynb, .txt</p>
                    </div>
                  )}
                  <input 
                    id="modelCodeInput"
                    type="file" 
                    accept=".py,.ipynb,.txt" 
                    style={{ display: 'none' }} 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('modelCode', e.target.files[0])}
                  />
                </div>
              </div>

              {/* Model Weights Upload */}
              <div className="file-upload">
                <div className="upload-header">
                  <div className="upload-icon">⚖️</div>
                  <div className="upload-title">
                    <h3>模型权重</h3>
                    <span className="required">*</span>
                  </div>
                </div>
                <div 
                  className={`upload-area ${dragOver === 'modelWeights' ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 'modelWeights')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'modelWeights')}
                  onClick={() => document.getElementById('modelWeightsInput')?.click()}
                  style={{ borderColor: dragOver === 'modelWeights' ? '#007bff' : undefined }}
                >
                  {modelWeights ? (
                    <div className="file-info">
                      <div className="file-icon">✅</div>
                      <div className="file-details">
                        <div className="file-name">{modelWeights.name}</div>
                        <div className="file-meta">
                          <span className="file-size">{(modelWeights.size / 1024 / 1024).toFixed(2)} MB</span>
                          <span className="file-type">{modelWeights.type}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <div className="upload-icon-large">⚖️</div>
                      <p>拖拽或点击上传模型权重文件</p>
                      <p className="file-types">支持: .pth, .h5, .ckpt, .pkl</p>
                    </div>
                  )}
                  <input 
                    id="modelWeightsInput"
                    type="file" 
                    accept=".pth,.h5,.ckpt,.pkl" 
                    style={{ display: 'none' }} 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('modelWeights', e.target.files[0])}
                  />
                </div>
              </div>

              {/* Validation Data Upload */}
              <div className="file-upload">
                <div className="upload-header">
                  <div className="upload-icon">📊</div>
                  <div className="upload-title">
                    <h3>验证数据</h3>
                    <span className="required">*</span>
                  </div>
                </div>
                <div 
                  className={`upload-area ${dragOver === 'validationData' ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 'validationData')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'validationData')}
                  onClick={() => document.getElementById('validationDataInput')?.click()}
                  style={{ borderColor: dragOver === 'validationData' ? '#007bff' : undefined }}
                >
                  {validationData ? (
                    <div className="file-info">
                      <div className="file-icon">✅</div>
                      <div className="file-details">
                        <div className="file-name">{validationData.name}</div>
                        <div className="file-meta">
                          <span className="file-size">{(validationData.size / 1024).toFixed(2)} KB</span>
                          <span className="file-type">{validationData.type}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <div className="upload-icon-large">📊</div>
                      <p>拖拽或点击上传验证数据文件</p>
                      <p className="file-types">支持: .csv, .json, .xlsx</p>
                    </div>
                  )}
                  <input 
                    id="validationDataInput"
                    type="file" 
                    accept=".csv,.json,.xlsx" 
                    style={{ display: 'none' }} 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('validationData', e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Control Section */}
          <div className="control-section">
            <div className="control-buttons">
              <button 
                className="scan-button primary" 
                onClick={handleStartScan}
                disabled={!modelCode || !modelWeights || !validationData || isScanning}
              >
                {isScanning ? '🔄 扫描中...' : '🚀 开始扫描'}
              </button>
              <button 
                className="reset-button secondary" 
                onClick={handleReset}
                disabled={isScanning}
              >
                🔄 重置
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isScanning && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              <h3>正在扫描模型...</h3>
              <p>AI后门检测算法正在分析您的模型文件</p>
              <div className="progress-info">
                <div className="progress-step">✓ 分析模型结构</div>
                <div className="progress-step">⟲ 检测后门特征</div>
                <div className="progress-step">⧗ 验证数据一致性</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackdoorScannerSimple;