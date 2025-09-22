export interface ProcessedImage {
  file: File;
  originalSize: number;
  processedSize: number;
  originalUrl: string;
  processedUrl: string;
  format: string;
  quality: number;
}

export interface ProcessingOptions {
  format: 'jpeg' | 'png' | 'webp';
  quality: number;
  width?: number;
  height?: number;
}

export type SupportedFormat = 'jpeg' | 'png' | 'webp';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}