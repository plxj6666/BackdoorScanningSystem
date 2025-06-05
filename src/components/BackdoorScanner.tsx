import React, { useState, useCallback } from 'react';
import { ScanRequest, UploadedFile, ScanResult } from '../types';
import Header from './Header.tsx';
import FileUploadSection from './FileUploadSection.tsx';
import ScanConfiguration from './ScanConfiguration.tsx';
import ScanResults from './ScanResults.tsx';
import LoadingOverlay from './LoadingOverlay.tsx';
import './BackdoorScanner.css';

const BackdoorScanner: React.FC = () => {
  const [scanRequest, setScanRequest] = useState<ScanRequest>({
    modelCode: null,
    modelWeights: null,
    validationData: null,
  });
  
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleFileUpload = useCallback((fileType: keyof ScanRequest, file: File) => {
    const uploadedFile: UploadedFile = {
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
    };

    setScanRequest(prev => ({
      ...prev,
      [fileType]: uploadedFile,
    }));
  }, []);

  const handleStartScan = useCallback(async () => {
    if (!scanRequest.modelCode || !scanRequest.modelWeights || !scanRequest.validationData) {
      alert('请上传所有必需的文件');
      return;
    }

    setIsScanning(true);
    setScanResult({
      id: Math.random().toString(36).substr(2, 9),
      status: 'running',
      progress: 0,
    });

    // 模拟扫描过程
    try {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setScanResult(prev => prev ? { ...prev, progress } : null);
      }

      // 模拟扫描结果
      setScanResult(prev => prev ? {
        ...prev,
        status: 'completed',
        progress: 100,
        results: {
          backdoorDetected: Math.random() > 0.5,
          confidence: Math.random() * 100,
          threats: [
            {
              type: '数据投毒',
              severity: 'high',
              description: '检测到可能的训练数据投毒迹象',
              confidence: 85.6,
              location: 'layer_3.weights',
            },
            {
              type: '权重异常',
              severity: 'medium',
              description: '发现异常的权重分布模式',
              confidence: 72.3,
              location: 'dense_layer.bias',
            },
          ],
          scanDuration: 5.2,
          scanTimestamp: new Date(),
        },
      } : null);
    } catch (error) {
      setScanResult(prev => prev ? {
        ...prev,
        status: 'failed',
        error: '扫描过程中发生错误',
      } : null);
    } finally {
      setIsScanning(false);
    }
  }, [scanRequest]);

  const handleReset = useCallback(() => {
    setScanRequest({
      modelCode: null,
      modelWeights: null,
      validationData: null,
    });
    setScanResult(null);
    setIsScanning(false);
  }, []);

  // Debug helper to show current state
  const debugInfo = {
    hasModelCode: !!scanRequest.modelCode,
    hasModelWeights: !!scanRequest.modelWeights,
    hasValidationData: !!scanRequest.validationData,
    isScanning,
    scanStatus: scanResult?.status || 'none'
  };

  console.log('BackdoorScanner State:', debugInfo);

  return (
    <div className="backdoor-scanner">
      {isScanning && <LoadingOverlay progress={scanResult?.progress || 0} />}
      
      <Header />
      
      <main className="scanner-main">
        <div className="scanner-container">
          <div className="scanner-content">
            <FileUploadSection
              scanRequest={scanRequest}
              onFileUpload={handleFileUpload}
            />
            
            <ScanConfiguration />
            
            <div className="control-section">
              <h3>扫描控制</h3>
              <div className="control-buttons">
                <button
                  className="scan-button"
                  onClick={handleStartScan}
                  disabled={!scanRequest.modelCode || !scanRequest.modelWeights || !scanRequest.validationData || isScanning}
                >
                  <span className="button-icon">🔍</span>
                  开始扫描
                </button>
                
                <button
                  className="reset-button"
                  onClick={handleReset}
                  disabled={isScanning}
                >
                  <span className="button-icon">🔄</span>
                  重置
                </button>
              </div>
            </div>
          </div>
          
          {scanResult && (
            <ScanResults result={scanResult} />
          )}
        </div>
      </main>
    </div>
  );
};

export default BackdoorScanner;
