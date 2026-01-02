"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ProcessedImage, ProcessingOptions } from "@/../types";
import { FileUpload } from "@/components/file-upload";
import { ProcessingOptions as ProcessingOptionsComponent } from "@/components/processing-options";
import { ImagePreview } from "@/components/image-preview";
import { DownloadButton } from "@/components/download-button";
import { useImageProcessor } from "@/../hooks/useImageProcessor";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center p-6">
        {/* Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('/bg-gradient.png')] dark:bg-[url('/bg-gradient-dark.png')] transition-all duration-500"
        />

        {/* Content Layer */}
        <div className="relative w-full">
          <motion.div
            layout
            className={`w-full mx-auto ${selectedFile ? "max-w-5xl" : "max-w-2xl"}`}
          >
            <AnimatePresence mode="wait">
              {!selectedFile ? (
                <motion.div
                  key="upload"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-accent/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center hover:border-blue-400/50 transition duration-300"
                >
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                      Image Tools & Converter
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Free, fast, and secure local image processing
                    </p>
                  </div>
                  <FileUpload onFileSelect={handleFileSelect} />
                </motion.div>
              ) : (
                <motion.div
                  key="processing"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-border/50 bg-muted/30">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Processing Image</h2>
                      <p className="text-muted-foreground text-sm mt-1 font-mono">
                        {selectedFile.name}
                      </p>
                    </div>
                    <motion.button
                      layout
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClear}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                      title="Clear and upload new image"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Options */}
                  <div className="p-6 border-b border-border/50 bg-card/50">
                    <ProcessingOptionsComponent
                      options={options}
                      onOptionsChange={handleOptionsChange}
                      onProcess={handleProcess}
                      isProcessing={isProcessing}
                      disabled={isProcessing}
                    />
                  </div>

                  {/* Preview */}
                  <div className="p-6 bg-background/50">
                    <ImagePreview originalFile={selectedFile} processedImage={processedImage} />
                  </div>

                  {/* Download */}
                  <AnimatePresence>
                    {processedImage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 border-t border-border/50 bg-green-50/10"
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-sm font-medium">Processing complete!</p>
                          </div>
                          <DownloadButton processedImage={processedImage} size="md" />
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

      <Footer />
    </div >
  );
}
