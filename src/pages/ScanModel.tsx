import React, { useState, useEffect } from 'react';
import ScanResultsModal from '../components/ScanResultsModal';
import BenignSamplesUpload from '../components/BenignSamplesUpload';
import './ScanModel.css';

interface Model {
  id: string;
  name: string;
  user: string;
  size: string;
  date: string;
}

// This interface must be compatible with the props for ScanResultsModal.
// The modal's props define a more extensive interface, but the extra fields are optional.
interface ScanResult {
  '是否存在后门': boolean;
  '置信度': number;
  '触发器': string;
  '为什么认为存在后门': string;
  '扫描耗时': number;
  model_type?: 'LLM' | 'Image Classification' | 'Unknown';
  model_architecture?: string;
  model_id?: string;
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH';
  scan_method?: 'Quick Scan' | 'Deep Scan' | 'Standard Scan';
  recommendations?: string[];
  details?: {
    weight_analysis?: string;
    pattern_matching?: string;
    statistical_analysis?: string;
    anomaly_detection?: string;
    signature_verification?: string;
  };
}

const ScanModel: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedScanType, setSelectedScanType] = useState<'quick' | 'deep' | 'standard' | null>('quick');
  const [benignSamples, setBenignSamples] = useState<FileList | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/all_models_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Model[] = await response.json();
        setModels(data);
        if (data.length > 0) {
          setSelectedModel(data[0].id);
        }
      } catch (e: any) {
        console.error("Failed to load models:", e);
        setError("无法加载模型列表，请检查 public/all_models_data.json 是否存在。");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const handleStartScan = async () => {
    if (!selectedModel || !selectedScanType) {
      alert('请选择一个模型和扫描类型。');
      return;
    }

    if (selectedScanType === 'deep' && (!benignSamples || benignSamples.length === 0)) {
      alert('深度扫描需要上传良性样本文件。');
      return;
    }

    setIsScanning(true);
    setScanResult(null);
    setError(null); // 重置错误状态

    try {
      const response = await fetch('http://localhost:5001/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_id: selectedModel,
          scan_type: selectedScanType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP 错误! 状态: ${response.status}`);
      }

      if (data.success) {
        // 转换后端数据格式为前端需要的格式
        const backendResult = data.result;
        const frontendResult: ScanResult = {
          '是否存在后门': backendResult.backdoor_detected,
          '置信度': backendResult.confidence,
          '触发器': backendResult.trigger,
          '为什么认为存在后门': backendResult.reasoning,
          '扫描耗时': backendResult.scan_time,
          model_type: backendResult.model_type,
          model_architecture: backendResult.model_architecture,
          model_id: backendResult.model_id,
          risk_level: backendResult.risk_level,
          scan_method: backendResult.scan_method,
          recommendations: backendResult.recommendations,
          details: backendResult.details
        };
        
        setScanResult(frontendResult);
        setShowResultModal(true);
      } else {
        throw new Error(data.error || '扫描失败，但未返回具体错误信息。');
      }
    } catch (e: any) {
      console.error("扫描失败:", e);
      alert(`扫描出错: ${e.message}`);
      setError(`扫描出错: ${e.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
  };

  const getModelIcon = () => {
    return '📦'; // Generic model icon
  };

  if (loading) {
    return <div className="loading-indicator">正在加载模型...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="scan-model-container">
      <div className="scan-model-header">
        <h1>扫描新模型</h1>
      </div>

      <div className="scan-section">
        <h3>1. 选择一个模型</h3>
        <div className="models-grid">
          {models.map(model => (
            <div 
              key={model.id} 
              className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
              onClick={() => setSelectedModel(model.id)}
            >
              <div className="model-icon">{getModelIcon()}</div>
              <div className="model-name">{model.name}</div>
              <div className="model-details">由 {model.user} 上传</div>
              <div className="model-details">{model.size}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scan-section">
        <h3>2. 选择扫描类型</h3>
        <div className="scan-options">
          <button 
            className={`scan-option-button ${selectedScanType === 'quick' ? 'selected' : ''}`}
            onClick={() => setSelectedScanType('quick')}
          >
            快速扫描
          </button>
          <button 
            className={`scan-option-button ${selectedScanType === 'standard' ? 'selected' : ''}`}
            onClick={() => setSelectedScanType('standard')}
          >
            标准扫描
          </button>
          <button 
            className={`scan-option-button ${selectedScanType === 'deep' ? 'selected' : ''}`}
            onClick={() => setSelectedScanType('deep')}
          >
            深度扫描
          </button>
        </div>
      </div>

      {selectedScanType === 'deep' && (
        <div className="scan-section">
          <h3>3. 上传良性样本 (深度扫描需要)</h3>
          <BenignSamplesUpload onFileSelect={setBenignSamples} />
        </div>
      )}

      <button 
        className="start-scan-button" 
        onClick={handleStartScan} 
        disabled={isScanning || !selectedModel || !selectedScanType}
      >
        {isScanning ? '扫描中...' : '开始扫描'}
      </button>

      <ScanResultsModal 
        isOpen={showResultModal} 
        result={scanResult} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default ScanModel;
