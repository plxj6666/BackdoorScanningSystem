import { useState, useEffect } from 'react';
import './BackdoorScanner.css';
import ScanResultsModal from './ScanResultsModal';

// Interface for user-facing model data
interface UserModel {
  id: string;
  name: string; // e.g., "Model developed by Company A"
  user: string;
  size: string;
  date: string;
}

// Interface for scan results, including model architecture info
interface ScanResult {
  '是否存在后门': boolean;
  '置信度': number;
  '触发器': string;
  '为什么认为存在后门': string;
  '扫描耗时': number;
  model_id?: string;
  model_type?: 'LLM' | 'Image Classification' | 'Unknown';
  model_architecture?: string;
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH';
  scan_method?: 'Quick Scan' | 'Deep Scan';
}

const BackdoorScannerSimple = () => {
  const [userModels, setUserModels] = useState<UserModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedScanType, setSelectedScanType] = useState<'quick' | 'deep' | null>(null);
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
        const data: UserModel[] = await response.json();
        setUserModels(data);
      } catch (e) {
        console.error("Failed to load user models:", e);
        setError("无法加载模型列表，请检查网络连接或联系管理员。");
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId === selectedModel ? null : modelId);
  };

  const handleScanTypeSelect = (scanType: 'quick' | 'deep') => {
    setSelectedScanType(scanType === selectedScanType ? null : scanType);
  };

  const handleReset = () => {
    setSelectedModel(null);
    setSelectedScanType(null);
    setIsScanning(false);
    setScanResult(null);
    setShowResultModal(false);
  };

  const handleStartScan = async () => {
    if (!selectedModel || !selectedScanType) {
      alert('请选择一个模型和扫描类型。');
      return;
    }

    setIsScanning(true);
    setScanResult(null);

    try {
      // Simulate API call to the backend
      await new Promise(resolve => setTimeout(resolve, 2500)); // Fake network delay

      // Mock backend logic based on model ID and scan type
      const modelDetailsResponse = await fetch('/model_mapping.json');
      const modelMapping = await modelDetailsResponse.json();
      
      const selectedModelKey = Object.keys(modelMapping).find(key => modelMapping[key].id === selectedModel);
      const modelDetails = selectedModelKey ? modelMapping[selectedModelKey] : null;

      if (!modelDetails) {
        throw new Error("无法找到所选模型的详细信息。");
      }

      const isPoison = modelDetails.label === 'poison';
      const isLLM = modelDetails.base_model.includes('Llama') || modelDetails.base_model.includes('Mistral');

      // Simulate different results based on scan type
      let result: ScanResult;
      if (selectedScanType === 'quick') {
        result = {
          '是否存在后门': isPoison,
          '置信度': isPoison ? 0.75 + Math.random() * 0.15 : 0.1 + Math.random() * 0.1,
          '触发器': isPoison ? "特定文本模式 'James Bond'" : "无",
          '为什么认为存在后门': isPoison ? "快速扫描在模型激活中检测到与已知后门签名匹配的异常模式。" : "未发现明显异常。",
          '扫描耗时': 15 + Math.random() * 5,
          model_id: selectedModel,
          model_type: isLLM ? 'LLM' : 'Image Classification',
          model_architecture: modelDetails.base_model,
          risk_level: isPoison ? 'MEDIUM' : 'LOW',
          scan_method: 'Quick Scan',
        };
      } else { // Deep Scan
        result = {
          '是否存在后门': isPoison,
          '置信度': isPoison ? 0.92 + Math.random() * 0.07 : 0.05 + Math.random() * 0.05,
          '触发器': isPoison ? "更复杂的触发器，例如图像中的特定像素补丁或文本中的语义模式。" : "无",
          '为什么认为存在后门': isPoison ? "深度分析揭示了与中毒数据相关的隐藏神经元激活，这些激活在正常输入下保持休眠状态。" : "对模型进行了全面的神经元和激活分析，未发现后门活动的证据。",
          '扫描耗时': 120 + Math.random() * 30,
          model_id: selectedModel,
          model_type: isLLM ? 'LLM' : 'Image Classification',
          model_architecture: modelDetails.base_model,
          risk_level: isPoison ? 'HIGH' : 'LOW',
          scan_method: 'Deep Scan',
        };
      }
      
      setScanResult(result);
      setShowResultModal(true);

    } catch (e) {
      console.error("扫描过程中出错:", e);
      alert(`扫描失败: ${e instanceof Error ? e.message : "未知错误"}`);
    } finally {
      setIsScanning(false);
    }
  };

  const renderLoading = () => (
    <div className="loading-content">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <h3>正在加载可用模型...</h3>
        <p>请稍候，我们正在准备您的模型列表。</p>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="error-content">
      <h3>加载出错</h3>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="backdoor-scanner">
      <div className="scanner-header">
        <div className="header-content">
          <div className="scanner-logo">
            <div className="logo-icon">🛡️</div>
            <div className="logo-text">
              <h1>AI模型安全扫描</h1>
              <p>选择模型，一键检测潜在后门</p>
            </div>
          </div>
          <div className="system-status">
            <div className="status-indicator"></div>
            <span>系统准备就绪</span>
          </div>
        </div>
      </div>

      <div className="scanner-main">
        <div className="scanner-container">
          {loading ? renderLoading() : error ? renderError() : (
            <>
              <div className="selection-section">
                {/* Step 1: Model Selection */}
                <div className="selection-step">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h3>选择要扫描的模型</h3>
                  </div>
                  <div className="model-grid-new">
                    {userModels.map((model) => (
                      <div
                        key={model.id}
                        className={`model-card-new ${selectedModel === model.id ? 'selected' : ''}`}
                        onClick={() => handleModelSelect(model.id)}
                      >
                        <div className="model-card-new-icon">📦</div>
                        <div className="model-card-new-info">
                          <h4>{model.name}</h4>
                          <div className="model-meta">
                            <span>{model.size}</span>
                            <span>{model.date}</span>
                          </div>
                        </div>
                        <div className="selection-indicator">
                          {selectedModel === model.id && <span>✓</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Scan Type Selection */}
                {selectedModel && (
                  <div className="selection-step">
                    <div className="step-header">
                      <div className="step-number">2</div>
                      <h3>选择扫描策略</h3>
                    </div>
                    <div className="scan-type-grid">
                      <div
                        className={`scan-type-card ${selectedScanType === 'quick' ? 'selected' : ''}`}
                        onClick={() => handleScanTypeSelect('quick')}
                      >
                        <div className="scan-type-icon">⚡️</div>
                        <div className="scan-type-info">
                          <h4>快速扫描</h4>
                          <p>快速检测已知后门模式，耗时较短。</p>
                        </div>
                        <div className="selection-indicator">
                          {selectedScanType === 'quick' && <span>✓</span>}
                        </div>
                      </div>
                      <div
                        className={`scan-type-card ${selectedScanType === 'deep' ? 'selected' : ''}`}
                        onClick={() => handleScanTypeSelect('deep')}
                      >
                        <div className="scan-type-icon">🔬</div>
                        <div className="scan-type-info">
                          <h4>深度扫描</h4>
                          <p>全面分析模型权重和激活，检测未知和高级威胁。</p>
                        </div>
                        <div className="selection-indicator">
                          {selectedScanType === 'deep' && <span>✓</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Section */}
              <div className="control-section">
                <h3>扫描控制</h3>
                <div className="control-buttons">
                  <button
                    className={`scan-button ${isScanning ? 'loading' : ''}`}
                    onClick={handleStartScan}
                    disabled={!selectedModel || !selectedScanType || isScanning}
                  >
                    <span className="button-icon">{isScanning ? '⏳' : '🚀'}</span>
                    {isScanning ? '扫描中...' : '开始扫描'}
                  </button>
                  <button
                    className="reset-button"
                    onClick={handleReset}
                    disabled={isScanning}
                  >
                    <span className="button-icon">🔄</span>
                    重置选择
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isScanning && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              <h3>正在执行 {selectedScanType === 'deep' ? '深度' : '快速'} 扫描...</h3>
              <p>请稍候，这可能需要几分钟时间。</p>
            </div>
          </div>
        </div>
      )}

      <ScanResultsModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        result={scanResult}
        modelInfo={userModels.find(m => m.id === selectedModel)}
      />
    </div>
  );
};

export default BackdoorScannerSimple;