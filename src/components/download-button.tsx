// components/DownloadButton.tsx
import React from 'react';
import { Download } from 'lucide-react';
import { ProcessedImage } from '@/../types/index';
import { downloadFile } from '../lib/utils';

interface DownloadButtonProps {
  processedImage: ProcessedImage;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  processedImage,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  const handleDownload = () => {
    downloadFile(processedImage.processedUrl, processedImage.file.name);
  };

  const baseClasses = 'flex items-center gap-2 font-medium rounded-lg transition-colors';
  
  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      onClick={handleDownload}
      className={classes}
      title={`Download ${processedImage.file.name}`}
    >
      <Download className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`} />
      Download Processed Image
    </button>
  );
};