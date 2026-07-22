'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { validateFile } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, className = '' }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateFile(file);
    if (validation.isValid) {
      onFileSelect(file);
    } else {
      alert(validation.error);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      whileHover="hover"
      animate={dragOver ? "drag" : "idle"}
      variants={{
        idle: { scale: 1 },
        hover: { scale: 1.01 },
        drag: { scale: 1.02 }
      }}
      className={`relative overflow-hidden border border-hairline/60 dark:border-white/10 rounded-[14px] p-6 sm:p-12 text-center cursor-pointer flex flex-col items-center justify-center min-h-[320px] bg-surface-soft/40 hover:bg-canvas/50 backdrop-blur-lg transition-all duration-300
        ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <motion.div
        variants={{
          idle: { y: 0, scale: 1 },
          hover: { y: -5, scale: 1.05 },
          drag: { y: -10, scale: 1.1 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 bg-canvas/60 dark:bg-white/10 backdrop-blur-md p-5 rounded-full mb-6 border border-hairline/60 dark:border-white/10 shadow-sm"
      >
        <Upload className="h-10 w-10 text-ink" strokeWidth={1.5} />
      </motion.div>
      
      <div className="relative z-10 space-y-2">
        <h3 className="text-xl font-medium text-ink tracking-tight">
          Click to upload or drag and drop
        </h3>
        <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
          Supports WebP, JPEG, PNG, and AVIF up to 50MB.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </motion.div>
  );
};