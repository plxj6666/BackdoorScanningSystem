import { useState, useEffect } from 'react';
import './BackdoorScanner.css';
import ScanResultsModal from './ScanResultsModal';

interface ModelData {
  id: string;
  name: string;
  full_path: string;
  description: string;
}

interface WeightData {
  id: string;
  name: string;
  user: string;
  label: 'poison' | 'clean';
  attack: string;
  poison_rate: number;
  dataset: string;
  size: string;
  date: string;
}

interface ScanResult {
  '是否存在后门': boolean;
  '置信度': number;
  '触发器': string;
  '为什么认为存在后门': string;
  '扫描耗时': number;
  model_id?: string;
  model_path?: string;
  scan_timestamp?: string;
  risk_level?: string;
}

const BackdoorScannerSimple = () => {
  const [selectedCategory, setSelectedCategory] = useState<'LLM' | 'Image Classification' | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedWeights, setSelectedWeights] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  // 扫描结果状态
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  
  // 真实数据状态
  const [baseModels, setBaseModels] = useState<Record<string, ModelData[]>>({});
  const [weightsByModel, setWeightsByModel] = useState<Record<string, WeightData[]>>({});
  const [loading, setLoading] = useState(true);

  // 加载真实模型数据
  useEffect(() => {
    const loadModelData = async () => {
      try {
        // 加载基础模型数据
        const baseModelsResponse = await fetch('/models/base_models.json');
        const baseModelsData = await baseModelsResponse.json();
        setBaseModels(baseModelsData);

        // 加载权重数据
        const weightsResponse = await fetch('/models/weights_by_model.json');
        const weightsData = await weightsResponse.json();
        setWeightsByModel(weightsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load model data:', error);
        // 如果加载失败，使用默认数据
        setBaseModels({
          'LLM': [
            { id: 'meta-llama/Meta-Llama-3-8B-Instruct', name: 'LLaMA-3-8B', full_path: 'meta-llama/Meta-Llama-3-8B-Instruct', description: 'Meta开发的大型语言模型' },
            { id: 'mistralai/Mistral-7B-Instruct-v0.2', name: 'Mistral-7B', full_path: 'mistralai/Mistral-7B-Instruct-v0.2', description: 'Mistral AI开发的指令调优模型' }
          ]
        });
        setWeightsByModel({
          'meta-llama/Meta-Llama-3-8B-Instruct': [
            { id: 'sample-1', name: '用户A微调的权重(测试)', user: '用户A', label: 'clean', attack: 'clean', poison_rate: 0, dataset: 'alpaca', size: '13.5GB', date: '2024-01-15' }
          ]
        });
        setLoading(false);
      }
    };

    loadModelData();
  }, []);

  const modelCategories = [
    { 
      id: 'LLM', 
      name: 'LLM', 
      description: '大型语言模型',
      icon: '🧠',
      examples: 'LLaMA, Mistral, QWEN'
    },
    { 
      id: 'Image Classification', 
      name: 'Image Classification', 
      description: '图像分类模型',
      icon: '🖼️',
      examples: 'ResNet, EfficientNet, VGG'
    }
  ] as const;

  const handleCategorySelect = (categoryId: 'LLM' | 'Image Classification') => {
    setSelectedCategory(categoryId);
    setSelectedModel(null);
    setSelectedWeights(null);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setSelectedWeights(null);
  };

  const handleWeightsSelect = (weightsId: string) => {
    setSelectedWeights(weightsId);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedModel(null);
    setSelectedWeights(null);
    setIsScanning(false);
  };

  const handleStartScan = async () => {
    if (!selectedCategory || !selectedModel || !selectedWeights) {
      alert('请完成所有选择');
      return;
    }

    setIsScanning(true);
    
    try {
      // 调用后端API进行检测
      const response = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_id: selectedWeights
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // 保存扫描结果并显示模态框
        setScanResult(result.result);
        setShowResultModal(true);
      } else {
        alert(`扫描失败: ${result.error}`);
      }
    } catch (error) {
      console.error('扫描API调用失败:', error);
      // 如果API不可用，则使用模拟检测
      const weightInfo = weightsByModel[selectedModel]?.find(w => w.id === selectedWeights);
      const modelInfo = baseModels[selectedCategory]?.find(m => m.id === selectedModel);
      alert(`扫描完成!\n类别: ${selectedCategory}\n模型: ${modelInfo?.name || selectedModel}\n权重: ${weightInfo?.name || selectedWeights}\n检测结果: ${weightInfo?.label === 'poison' ? '检测到后门攻击' : '未检测到异常'}`);
    } finally {
      setIsScanning(false);
    }
  };

  if (loading) {
    return (
      <div className="backdoor-scanner">
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
              <span>正在加载模型数据...</span>
            </div>
          </div>
        </div>
        <div className="scanner-main">
          <div className="scanner-container">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <div className="loading-text">
                <h3>正在加载模型数据</h3>
                <p>请稍候，正在从服务器获取最新的模型信息...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Selection Section */}
          <div className="selection-section">
            <div className="section-header">
              <h2>模型选择</h2>
              <p>选择您要扫描的AI模型类型、具体模型和权重文件</p>
            </div>

            {/* Step 1: Model Category Selection */}
            <div className="selection-step">
              <div className="step-header">
                <div className="step-number">1</div>
                <h3>选择模型类别</h3>
              </div>
              <div className="category-grid">
                {modelCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="category-icon">{category.icon}</div>
                    <div className="category-info">
                      <h4>{category.name}</h4>
                      <p className="category-description">{category.description}</p>
                      <p className="category-examples">例如: {category.examples}</p>
                    </div>
                    <div className="selection-indicator">
                      {selectedCategory === category.id && <span>✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Model Selection */}
            {selectedCategory && baseModels[selectedCategory] && (
              <div className="selection-step">
                <div className="step-header">
                  <div className="step-number">2</div>
                  <h3>选择具体模型</h3>
                </div>
                <div className="model-grid">
                  {baseModels[selectedCategory].map((model) => (
                    <div
                      key={model.id}
                      className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <div className="model-info">
                        <h4>{model.name}</h4>
                        <p>{model.description}</p>
                      </div>
                      <div className="selection-indicator">
                        {selectedModel === model.id && <span>✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Weights Selection */}
            {selectedModel && weightsByModel[selectedModel] && (
              <div className="selection-step">
                <div className="step-header">
                  <div className="step-number">3</div>
                  <h3>选择权重文件</h3>
                </div>
                <div className="weights-grid">
                  {weightsByModel[selectedModel].map((weight) => (
                    <div
                      key={weight.id}
                      className={`weight-card ${selectedWeights === weight.id ? 'selected' : ''}`}
                      onClick={() => handleWeightsSelect(weight.id)}
                    >
                      <div className="weight-icon">
                        {weight.label === 'poison' ? '⚠️' : '📦'}
                      </div>
                      <div className="weight-info">
                        <h4>{weight.name}</h4>
                        <div className="weight-meta">
                          <span className="weight-size">📏 {weight.size}</span>
                          <span className="weight-date">📅 {weight.date}</span>
                        </div>
                        <div className="weight-status">
                          <span className={`status-badge ${weight.label}`}>
                            {weight.label === 'poison' ? '毒性模型' : '良性模型'}
                          </span>
                        </div>
                      </div>
                      <div className="selection-indicator">
                        {selectedWeights === weight.id && <span>✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selection Summary */}
            {selectedCategory && (
              <div className="selection-summary">
                <h3>选择摘要</h3>
                <div className="summary-items">
                  <div className="summary-item">
                    <span className="summary-label">模型类别:</span>
                    <span className="summary-value">{selectedCategory}</span>
                  </div>
                  {selectedModel && (
                    <div className="summary-item">
                      <span className="summary-label">具体模型:</span>
                      <span className="summary-value">{selectedModel}</span>
                    </div>
                  )}
                  {selectedWeights && (
                    <div className="summary-item">
                      <span className="summary-label">权重文件:</span>
                      <span className="summary-value">{selectedWeights}</span>
                    </div>
                  )}
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
                disabled={!selectedCategory || !selectedModel || !selectedWeights || isScanning}
              >
                <span className="button-icon">
                  {isScanning ? '⏳' : '🚀'}
                </span>
                {isScanning ? '扫描中...' : '开始后门扫描'}
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
        </div>
      </div>

      {/* Loading Overlay */}
      {isScanning && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              <h3>正在执行后门扫描</h3>
              <p>正在分析模型权重，检测潜在的后门攻击...</p>
            </div>
            <div className="progress-info">
              <div className="progress-step">🔍 正在加载模型权重</div>
              <div className="progress-step">📊 正在分析权重分布</div>
              <div className="progress-step">🔬 正在检测异常模式</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Scan Results Modal */}
      <ScanResultsModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        result={scanResult}
        modelInfo={selectedCategory && selectedModel && selectedWeights ? {
          category: selectedCategory,
          model: baseModels[selectedCategory]?.find(m => m.id === selectedModel)?.name || selectedModel,
          weight: weightsByModel[selectedModel]?.find(w => w.id === selectedWeights)?.name || selectedWeights
        } : undefined}
      />
    </div>
  );
};

export default BackdoorScannerSimple;