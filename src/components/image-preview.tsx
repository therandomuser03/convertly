import React from 'react';
import { ImageIcon, FileType, HardDrive, ArrowRight, ArrowDown } from 'lucide-react';
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
  return (
    <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
      {/* Original Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <span className="bg-muted px-2 py-0.5 rounded text-xs font-mono text-muted-foreground uppercase tracking-wider">Before</span>
            Original
          </h3>
        </div>

        <div className="border border-border/50 rounded-xl overflow-hidden bg-muted/20 aspect-video shadow-sm relative group">
          <div className="absolute inset-0 bg-[url('/checker-pattern.png')] opacity-5" />
          <img
            src={URL.createObjectURL(originalFile)}
            alt="Original"
            className="w-full h-full object-contain relative z-10 p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-secondary-foreground">
            <HardDrive className="w-3.5 h-3.5 opacity-70" />
            {formatFileSize(originalFile.size)}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-secondary-foreground uppercase">
            <FileType className="w-3.5 h-3.5 opacity-70" />
            {originalFile.type.split('/')[1] || 'UNKNOWN'}
          </div>
        </div>
      </motion.div>

      {/* Processed Image */}
      <div className="space-y-4 relative">
        {/* Arrow for desktop */}
        <div className="hidden md:flex absolute -left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
          <div className="bg-background rounded-full p-1.5 shadow-sm border border-border/50 text-muted-foreground">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <span className="bg-primary/10 px-2 py-0.5 rounded text-xs font-mono text-primary uppercase tracking-wider">After</span>
            Processed
          </h3>
        </div>

        <div className="border border-border/50 rounded-xl overflow-hidden bg-muted/20 aspect-video relative shadow-sm group">
          <div className="absolute inset-0 bg-[url('/checker-pattern.png')] opacity-5" />
          <AnimatePresence mode="wait">
            {processedImage ? (
              <motion.div
                key="processed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full relative z-10"
              >
                <Image
                  src={processedImage.processedUrl}
                  alt="Processed"
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40 z-10 relative"
              >
                <ImageIcon className="h-16 w-16 mb-4 stroke-1" />
                <p className="text-sm font-medium">Waiting for processing...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {processedImage ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-secondary-foreground">
                <HardDrive className="w-3.5 h-3.5 opacity-70" />
                {formatFileSize(processedImage.processedSize)}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-secondary-foreground uppercase">
                <FileType className="w-3.5 h-3.5 opacity-70" />
                {processedImage.format}
              </div>

              {(() => {
                const diff = processedImage.processedSize - processedImage.originalSize;
                const isReduced = diff < 0;
                const byteDiff = Math.abs(diff);
                const percent = ((byteDiff / processedImage.originalSize) * 100).toFixed(1) + '%';

                return (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${isReduced
                    ? 'bg-green-500/10 text-green-600 border-green-500/20'
                    : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    }`}>
                    {isReduced ? <ArrowDown className="w-3.5 h-3.5" /> : null}
                    {isReduced ? 'Saved ' : 'Increased '} {percent} ({formatFileSize(byteDiff)})
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            <motion.div
              key="empty-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-8 flex items-center"
            >
              <span className="text-xs text-muted-foreground/50 italic">params ready...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
