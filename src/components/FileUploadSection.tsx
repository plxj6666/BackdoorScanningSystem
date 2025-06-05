import React from 'react';
import { ScanRequest } from '../types';
import FileUpload from './FileUpload.tsx';
import './FileUploadSection.css';

interface FileUploadSectionProps {
  scanRequest: ScanRequest;
  onFileUpload: (fileType: keyof ScanRequest, file: File) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  scanRequest,
  onFileUpload,
}) => {
  return (
    <section className="file-upload-section">
      <div className="section-header">
        <h2>上传文件</h2>
        <p>请上传模型代码、权重文件和验证数据进行后门检测</p>
      </div>
      
      <div className="upload-grid">
        <FileUpload
          accept=".py,.ipynb,.zip"
          label="模型代码"
          description="支持 Python 文件、Jupyter Notebook 或压缩包"
          icon="📄"
          onFileUpload={(file) => onFileUpload('modelCode', file)}
          uploadedFile={scanRequest.modelCode}
          required
        />
        
        <FileUpload
          accept=".pth,.pt,.ckpt,.h5,.pb,.onnx,.safetensors"
          label="模型权重"
          description="支持 PyTorch、TensorFlow、ONNX 等格式"
          icon="⚖️"
          onFileUpload={(file) => onFileUpload('modelWeights', file)}
          uploadedFile={scanRequest.modelWeights}
          required
        />
        
        <FileUpload
          accept=".csv,.json,.npz,.pkl,.zip"
          label="验证数据"
          description="用于验证的小规模测试数据集"
          icon="📊"
          onFileUpload={(file) => onFileUpload('validationData', file)}
          uploadedFile={scanRequest.validationData}
          required
        />
      </div>
    </section>
  );
};

export default FileUploadSection;
