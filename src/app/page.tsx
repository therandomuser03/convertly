"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { ProcessedImage, ProcessingOptions } from "@/../types";
import { FileUpload } from "@/components/file-upload";
import { ProcessingOptions as ProcessingOptionsComponent } from "@/components/processing-options";
import { ImagePreview } from "@/components/image-preview";
import { DownloadButton } from "@/components/download-button";
import { useImageProcessor } from "@/../hooks/useImageProcessor";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Silk from "@/components/Silk";

export default function ConvertlyApp() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<ProcessingOptions>({
    format: "jpeg",
    quality: 80,
  });

  const { processImage, CanvasElement } = useImageProcessor();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProcessedImage(undefined);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const result = await processImage(selectedFile, options);
      if (result) setProcessedImage(result);
    } catch (error) {
      console.error("Processing failed:", error);
      alert("Image processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setProcessedImage(undefined);
  };

  const handleOptionsChange = (newOptions: ProcessingOptions) => {
    setOptions(newOptions);
    setProcessedImage(undefined);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 relative">
      {/* Upper Page Container containing Navbar and Main area */}
      <div className="relative flex flex-col flex-1 overflow-hidden">
        {/* Ambient Silk Background Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30 overflow-hidden z-0">
          <Silk
            speed={5}
            scale={1}
            color="#cc785c"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        <Navbar />

        <main className="relative flex-1 flex flex-col items-center justify-center p-6 md:py-24 z-10">
          {/* Content Layer */}
          <div className="relative w-full z-10">
            <motion.div
              layout
              className={`w-full mx-auto ${selectedFile ? "max-w-5xl" : "max-w-2xl"}`}
            >
              <AnimatePresence mode="wait">
                {!selectedFile ? (
                  <motion.div
                    key="upload"
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-surface-card/40 dark:bg-surface-dark-elevated/40 backdrop-blur-3xl rounded-[20px] p-10 md:p-12 border border-hairline/60 dark:border-white/10 text-center relative overflow-hidden shadow-2xl transition-all duration-300"
                  >
                    <div className="mb-10 space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-medium uppercase tracking-widest shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Easy & simple compression
                      </div>
                      <h2 className="text-4xl md:text-[56px] font-serif tracking-tight leading-[1.05] text-ink pb-2">
                        Meet your <br />image partner
                      </h2>
                      <p className="text-body text-lg max-w-lg mx-auto">
                        Compress, resize, and convert formats directly in your browser. No data leaves your device.
                      </p>
                    </div>
                    <FileUpload onFileSelect={handleFileSelect} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="processing"
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-surface-card/40 dark:bg-surface-dark-elevated/40 backdrop-blur-3xl text-ink rounded-[20px] shadow-2xl overflow-hidden border border-hairline/60 dark:border-white/10 flex flex-col relative transition-all duration-300"
                  >
                    {/* Header with filename and clear button */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-hairline/40 bg-surface-soft/40 backdrop-blur-md transition-colors duration-300">
                      <h2 className="text-sm font-medium tracking-wide font-mono text-ink truncate max-w-[200px] md:max-w-xs">
                        {selectedFile.name}
                      </h2>
                      <motion.button
                        layout
                        whileHover={{ scale: 1.05, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClear}
                        className="text-muted hover:text-error transition-colors p-1.5 rounded-md hover:bg-error/10"
                        title="Clear and upload new image"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    </div>

                    <div className="flex flex-col md:flex-row">
                      {/* Options Panel */}
                      <div className="md:w-80 border-b md:border-b-0 md:border-r border-hairline/40 bg-surface-card/30 backdrop-blur-md p-6 transition-colors duration-300">
                        <div className="text-ink">
                          <ProcessingOptionsComponent
                            options={options}
                            onOptionsChange={handleOptionsChange}
                            onProcess={handleProcess}
                            isProcessing={isProcessing}
                            disabled={isProcessing}
                          />
                        </div>
                      </div>

                      {/* Preview Area */}
                      <div className="flex-1 bg-surface-soft/30 backdrop-blur-md p-6 md:p-8 flex items-center justify-center min-h-[400px] transition-colors duration-300">
                        <ImagePreview originalFile={selectedFile} processedImage={processedImage} />
                      </div>
                    </div>

                    {/* Download Bar */}
                    <AnimatePresence>
                      {processedImage && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 py-4 border-t border-hairline bg-success/10 transition-colors duration-300"
                        >
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                              </div>
                              <p className="font-mono text-sm tracking-wide text-success">Output Ready</p>
                            </div>
                            <DownloadButton processedImage={processedImage} size="lg" className="shadow-none bg-primary hover:bg-primary-active text-on-primary font-medium tracking-wide rounded-md px-6 py-2 transition-colors" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <CanvasElement />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
