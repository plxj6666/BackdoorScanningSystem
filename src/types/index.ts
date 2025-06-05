export interface UploadedFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface ScanRequest {
  modelCode: UploadedFile | null;
  modelWeights: UploadedFile | null;
  validationData: UploadedFile | null;
  scanConfig?: ScanConfig;
}

export interface ScanConfig {
  sensitivity: 'low' | 'medium' | 'high';
  algorithms: string[];
  timeout: number;
}

export interface ScanResult {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  results?: {
    backdoorDetected: boolean;
    confidence: number;
    threats: ThreatInfo[];
    scanDuration: number;
    scanTimestamp: Date;
  };
  error?: string;
}

export interface ThreatInfo {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  confidence: number;
  location?: string;
}

export interface FileUploadProps {
  accept: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  onFileUpload: (file: File) => void;
  uploadedFile: UploadedFile | null;
  required?: boolean;
}
