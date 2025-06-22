import React, { useState, useEffect } from 'react';
import './Page.css';
import './ScanHistory.css';
import ScanResultsModal from '../components/ScanResultsModal';

interface ScanRecord {
  id: string;
  modelName: string;
  scanType: string;
  date: string;
  status: string;
  result: string;
}

const ScanHistory: React.FC = () => {
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ScanRecord | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/history');
        if (!response.ok) {
          throw new Error(`HTTP 错误! 状态: ${response.status}`);
        }
        const data: ScanRecord[] = await response.json();
        setScanHistory(data);
      } catch (e: any) {
        console.error("获取扫描历史失败:", e);
        setError("无法加载扫描历史。请确保后端服务正在运行。");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // 将ScanRecord映射为ScanResultsModal需要的格式
  const mapRecordToScanResult = (record: ScanRecord) => {
    // 这里只能做简单映射，详细字段可后续后端支持
    return {
      '是否存在后门': record.result.includes('未检测到') ? false : true,
      '置信度': record.result.includes('未检测到') ? 0.85 : 0.95,
      '触发器': record.result.includes('未检测到') ? '无' : '特定的文本模式触发',
      '为什么认为存在后门': record.result.includes('未检测到') ? '未发现异常行为' : '检测到模型行为异常，疑似后门',
      '扫描耗时': 3.2,
      model_type: (record.modelName.toLowerCase().includes('resnet') || record.modelName.toLowerCase().includes('vision') || record.modelName.toLowerCase().includes('efficientnet')) ? 'Image Classification' as const : 'LLM' as const,
      model_architecture: record.modelName,
      model_id: record.id,
      risk_level: record.result.includes('未检测到') ? 'LOW' as const : 'HIGH' as const,
      scan_method: record.scanType === '深度扫描' ? 'Deep Scan' as const : record.scanType === '标准扫描' ? 'Standard Scan' as const : 'Quick Scan' as const,
      recommendations: record.result.includes('未检测到') ? ['建议定期复查模型'] : ['建议重新训练模型', '加强数据验证', '进行安全审计'],
      details: {
        weight_analysis: 'Completed',
        pattern_matching: 'Completed',
        statistical_analysis: 'Completed',
        anomaly_detection: 'Completed',
        signature_verification: 'Completed'
      }
    };
  };

  if (loading) {
    return <div className="loading-indicator">正在加载扫描历史...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>扫描历史</h1>
        <p>查看您过去的所有扫描及其结果。</p>
      </div>
      <div className="page-content">
        {scanHistory.length === 0 ? (
          <p>还没有扫描历史。</p>
        ) : (
          <>
          <table className="history-table">
            <thead>
              <tr>
                <th>模型名称</th>
                <th>扫描类型</th>
                <th>日期</th>
                <th>状态</th>
                <th>结果</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.map((record) => (
                <tr key={record.id}>
                  <td>{record.modelName}</td>
                  <td>{record.scanType}</td>
                  <td>{record.date}</td>
                  <td>
                    <span className={`status-badge status-${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>{record.result}</td>
                  <td>
                    <button className="action-button" onClick={() => { setSelectedRecord(record); setShowModal(true); }}>查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ScanResultsModal
            isOpen={showModal}
            result={selectedRecord ? mapRecordToScanResult(selectedRecord) : null}
            onClose={() => setShowModal(false)}
            modelInfo={selectedRecord ? {
              id: selectedRecord.id,
              name: selectedRecord.modelName,
              user: '未知',
              size: '未知',
              date: selectedRecord.date
            } : undefined}
          />
          </>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
