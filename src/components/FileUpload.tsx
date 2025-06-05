import React, { useCallback, useState } from 'react';
import { FileUploadProps } from '../types';
import './FileUpload.css';

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  label,
  description,
  icon,
  onFileUpload,
  uploadedFile,
  required = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`file-upload ${uploadedFile ? 'uploaded' : ''}`}>
      <div className="upload-header">
        <div className="upload-icon">{icon}</div>
        <div className="upload-title">
          <h3>{label}</h3>
          {required && <span className="required">*</span>}
        </div>
      </div>
      
      <div
        className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="uploaded-file">
            <div className="file-info">
              <div className="file-name">{uploadedFile.name}</div>
              <div className="file-details">
                <span className="file-size">{formatFileSize(uploadedFile.size)}</span>
                <span className="file-date">
                  {uploadedFile.uploadedAt.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="file-status">
              <span className="status-icon">✅</span>
              <span className="status-text">上传成功</span>
            </div>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-text">
              <p>拖拽文件到此处或</p>
              <label className="upload-button" htmlFor={`file-${label}`}>
                选择文件
              </label>
            </div>
            <p className="upload-description">{description}</p>
          </div>
        )}
        
        <input
          id={`file-${label}`}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default FileUpload;
