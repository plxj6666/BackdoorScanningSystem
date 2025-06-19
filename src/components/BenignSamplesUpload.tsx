import React from 'react';
import './BenignSamplesUpload.css';

const BenignSamplesUpload = () => {
  return (
    <div className="benign-samples-upload-section">
      <h4>上传良性样本集</h4>
      <p>为了提高深度扫描的准确性，请上传一个小的、可信的良性样本集（例如，每类10-20个样本）。</p>
      <input type="file" multiple />
    </div>
  );
};

export default BenignSamplesUpload;
