import React from 'react';
import { ImageIcon } from 'lucide-react';
import { ProcessedImage } from '@/../types/index';
import { formatFileSize, calculateCompressionRatio } from '../lib/utils';
import Image from 'next/image';

interface ImagePreviewProps {
  originalFile: File;
  processedImage?: ProcessedImage;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalFile,
  processedImage,
  className = ''
}) => {
  return (
    <div className={`grid md:grid-cols-2 gap-6 ${className}`}>
      {/* Original Image */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-primary">Original</h3>
        <div className="border rounded-lg overflow-hidden bg-background aspect-video">
          <img
            src={URL.createObjectURL(originalFile)}
            alt="Original"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-1">
          <div className="text-sm text-accent-foreground">
            <span className="font-medium">Size:</span> {formatFileSize(originalFile.size)}
          </div>
          <div className="text-sm text-accent-foreground">
            <span className="font-medium">Type:</span> {originalFile.type}
          </div>
        </div>
      </div>

      {/* Processed Image */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-primary">Processed</h3>
        <div className="border rounded-lg overflow-hidden bg-background aspect-video relative">
          {processedImage ? (
            <Image
              src={processedImage.processedUrl}
              alt="Processed"
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Processed image will appear here</p>
              </div>
            </div>
          )}
        </div>

        {processedImage ? (() => {
  const diff = processedImage.processedSize - processedImage.originalSize;
  const isReduced = diff < 0; // reduced if processed is smaller
  const byteDiff = Math.abs(diff);
  const percent = ((byteDiff / processedImage.originalSize) * 100).toFixed(1) + '%';

  return (
    <div className="space-y-1">
      <div className="text-sm text-accent-foreground">
        <span className="font-medium">Size:</span> {formatFileSize(processedImage.processedSize)}
      </div>
      <div className="text-sm text-accent-foreground">
        <span className="font-medium">Format:</span> {processedImage.format.toUpperCase()}
      </div>
      <div className={`text-sm font-medium ${isReduced ? 'text-red-600' : 'text-green-600'}`}>
        <span className="text-accent-foreground font-medium">
          {isReduced ? 'Reduced by:' : 'Increased by:'}
        </span>{' '}
        {percent} ({formatFileSize(byteDiff)})
      </div>
    </div>
  );
})() : (
  <div className="space-y-1">
    <div className="text-sm text-gray-400">Click &ldquo;Process Image&rdquo; to see results</div>
  </div>
)}

      </div>
    </div>
  );
};
