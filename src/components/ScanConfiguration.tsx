import React, { useState } from 'react';
import './ScanConfiguration.css';

const ScanConfiguration: React.FC = () => {
  const [sensitivity, setSensitivity] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(['neural_cleanse', 'activation_clustering']);

  const algorithms = [
    { id: 'neural_cleanse', name: 'Neural Cleanse', description: '基于神经元激活的后门检测' },
    { id: 'activation_clustering', name: 'Activation Clustering', description: '激活聚类分析检测' },
    { id: 'grad_cam', name: 'Grad-CAM', description: '梯度激活映射检测' },
    { id: 'spectral_signature', name: 'Spectral Signature', description: '频谱特征分析' },
  ];

  const handleAlgorithmToggle = (algorithmId: string) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algorithmId)
        ? prev.filter(id => id !== algorithmId)
        : [...prev, algorithmId]
    );
  };

  return (
    <section className="scan-configuration">
      <div className="section-header">
        <h2>扫描配置</h2>
        <p>选择检测算法和敏感度设置</p>
      </div>
      
      <div className="config-content">
        <div className="sensitivity-config">
          <h3>检测敏感度</h3>
          <div className="sensitivity-options">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <label key={level} className={`sensitivity-option ${sensitivity === level ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="sensitivity"
                  value={level}
                  checked={sensitivity === level}
                  onChange={(e) => setSensitivity(e.target.value as any)}
                />
                <div className="option-content">
                  <span className="option-level">
                    {level === 'low' ? '低' : level === 'medium' ? '中' : '高'}
                  </span>
                  <span className="option-description">
                    {level === 'low' && '快速扫描，可能遗漏隐蔽后门'}
                    {level === 'medium' && '平衡速度和准确性'}
                    {level === 'high' && '深度分析，检测率最高'}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="algorithms-config">
          <h3>检测算法</h3>
          <div className="algorithms-grid">
            {algorithms.map((algorithm) => (
              <label
                key={algorithm.id}
                className={`algorithm-option ${selectedAlgorithms.includes(algorithm.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.includes(algorithm.id)}
                  onChange={() => handleAlgorithmToggle(algorithm.id)}
                />
                <div className="algorithm-content">
                  <div className="algorithm-name">{algorithm.name}</div>
                  <div className="algorithm-description">{algorithm.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanConfiguration;
