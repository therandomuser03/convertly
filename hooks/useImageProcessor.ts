'use client';

import React, { useRef, useCallback, JSX } from 'react';
import { ProcessedImage, ProcessingOptions } from '../types';

export const useImageProcessor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(
    async (file: File, options: ProcessingOptions): Promise<ProcessedImage | null> => {
      if (!canvasRef.current) return null;

      return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        img.onload = () => {
          try {
            let { width, height } = img;

            if (options.width || options.height) {
              const aspectRatio = width / height;
              if (options.width && options.height) {
                width = options.width;
                height = options.height;
              } else if (options.width) {
                width = options.width;
                height = width / aspectRatio;
              } else if (options.height) {
                height = options.height;
                width = height * aspectRatio;
              }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const mimeType = `image/${options.format}`;
            const quality = options.quality / 100;

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const processedFile = new File(
                    [blob],
                    `processed_${file.name.split('.')[0]}.${options.format}`,
                    { type: mimeType }
                  );

                  const processedUrl = URL.createObjectURL(blob);
                  const originalUrl = URL.createObjectURL(file);

                  const result: ProcessedImage = {
                    file: processedFile,
                    originalSize: file.size,
                    processedSize: blob.size,
                    originalUrl,
                    processedUrl,
                    format: options.format,
                    quality: options.quality,
                  };

                  resolve(result);
                } else {
                  reject(new Error('Failed to create blob from canvas'));
                }
              },
              mimeType,
              quality
            );
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
      });
    },
    []
  );

  // ✅ Correct way — define as a simple component
  const CanvasElement: React.FC = () => {
    return React.createElement('canvas', {
      ref: canvasRef,
      className: "hidden"
    });
  };

  return {
    processImage,
    CanvasElement,
  };
};
