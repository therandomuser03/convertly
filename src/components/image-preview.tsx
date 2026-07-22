import React from 'react';
import { ImageIcon, FileType, HardDrive, ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import { ProcessedImage } from '@/../types/index';
import { formatFileSize } from '../lib/utils';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
  const originalFormat = originalFile.type.split('/')[1] || 'UNKNOWN';

  return (
    <div className={`grid md:grid-cols-2 gap-6 w-full ${className}`}>
      {/* Original Image Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full bg-surface-card rounded-[12px] border border-hairline overflow-hidden transition-colors duration-300 shadow-sm"
      >
        {/* Top Header: BEFORE badge, Original label, Format */}
        <div className="flex flex-wrap items-center justify-start gap-2 p-3.5 border-b border-hairline bg-surface-soft transition-colors duration-300">
          <span className="bg-canvas px-2 py-0.5 rounded-[4px] text-[10px] font-mono text-muted uppercase tracking-wider border border-hairline">
            Before
          </span>
          <h3 className="text-sm font-medium text-ink">Original</h3>
          <span className="text-muted-soft text-xs">•</span>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-canvas text-[11px] font-medium text-muted uppercase border border-hairline">
            <FileType className="w-3 h-3 opacity-70" />
            {originalFormat}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 bg-canvas p-4 flex items-center justify-center min-h-[260px] group transition-colors duration-300">
          <div className="absolute inset-0 bg-[url('/checker-pattern.png')] opacity-[0.03] pointer-events-none" />
          <div className="relative w-full h-full min-h-[240px] rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={URL.createObjectURL(originalFile)}
              alt="Original preview"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom Footer: File Size */}
        <div className="flex flex-wrap items-center justify-start gap-2 p-3 border-t border-hairline bg-surface-soft transition-colors duration-300">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-canvas text-[11px] font-mono font-medium text-muted border border-hairline">
            <HardDrive className="w-3.5 h-3.5 opacity-70" />
            {formatFileSize(originalFile.size)}
          </div>
        </div>
      </motion.div>

      {/* Processed Image Card */}
      <div className="relative flex flex-col">
        {/* Arrow for desktop */}
        <div className="hidden md:flex absolute -left-3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
          <div className="bg-surface-soft rounded-full p-2 border border-hairline text-muted shadow-sm transition-colors duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col h-full bg-surface-card rounded-[12px] border border-hairline overflow-hidden transition-colors duration-300 shadow-sm"
        >
          {/* Top Header: AFTER badge, Processed label, Format */}
          <div className="flex flex-wrap items-center justify-start gap-2 p-3.5 border-b border-hairline bg-surface-soft transition-colors duration-300 min-h-[49px]">
            <span className="bg-primary/10 px-2 py-0.5 rounded-[4px] text-[10px] font-mono text-primary uppercase tracking-wider border border-primary/20">
              After
            </span>
            <h3 className="text-sm font-medium text-ink">Processed</h3>
            {processedImage && (
              <>
                <span className="text-muted-soft text-xs">•</span>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-canvas text-[11px] font-medium text-muted uppercase border border-hairline">
                  <FileType className="w-3 h-3 opacity-70" />
                  {processedImage.format}
                </div>
              </>
            )}
          </div>

          {/* Image Container */}
          <div className="relative flex-1 bg-canvas p-4 flex items-center justify-center min-h-[260px] group transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('/checker-pattern.png')] opacity-[0.03] pointer-events-none" />
            <AnimatePresence mode="wait">
              {processedImage ? (
                <motion.div
                  key="processed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative w-full h-full min-h-[240px] rounded-lg overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={processedImage.processedUrl}
                    alt="Processed preview"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-muted/50 z-10 relative space-y-4"
                >
                  <div className="relative">
                    <ImageIcon className="h-10 w-10 stroke-[1.5]" />
                    <motion.div 
                      className="absolute inset-0 border border-primary/40 rounded-lg"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-sm font-medium tracking-wide">Awaiting processing...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Footer: File Size & Percentage change */}
          <div className="flex flex-wrap items-center justify-start gap-2 p-3 border-t border-hairline bg-surface-soft transition-colors duration-300 min-h-[49px]">
            {processedImage ? (
              <>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-canvas text-[11px] font-mono font-medium text-muted border border-hairline">
                  <HardDrive className="w-3.5 h-3.5 opacity-70" />
                  {formatFileSize(processedImage.processedSize)}
                </div>
                {(() => {
                  const diff = processedImage.processedSize - processedImage.originalSize;
                  const isReduced = diff < 0;
                  const byteDiff = Math.abs(diff);
                  const percent = ((byteDiff / processedImage.originalSize) * 100).toFixed(1) + '%';
                  
                  return (
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] border text-[11px] font-mono font-bold ${isReduced ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                      {isReduced ? <ArrowDown className="w-3.5 h-3.5" /> : <ArrowUp className="w-3.5 h-3.5" />}
                      {isReduced ? `-${percent}` : `+${percent}`}
                    </div>
                  );
                })()}
              </>
            ) : (
              <span className="text-xs text-muted-soft font-mono">Size calculated after processing</span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
