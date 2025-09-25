"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "next-themes"; // ✅ Import theme hook
import { ProcessedImage, ProcessingOptions } from "@/../types";
import { FileUpload } from "@/components/file-upload";
import { ProcessingOptions as ProcessingOptionsComponent } from "@/components/processing-options";
import { ImagePreview } from "@/components/image-preview";
import { DownloadButton } from "@/components/download-button";
import { useImageProcessor } from "@/../hooks/useImageProcessor";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ConvertlyApp() {
  const { theme } = useTheme(); // ✅ Get current theme (light/dark)

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

  // ✅ Dynamically choose background image
  const backgroundImage = theme === "dark" 
    ? "url('/bg-gradient-dark.png')" 
    : "url('/bg-gradient.png')";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center p-6">
        {/* Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage }}
        />

        {/* Content Layer */}
        <div className="relative w-full">
          <div
            className={`w-full mx-auto transition-all duration-500 ${
              selectedFile ? "max-w-5xl" : "max-w-2xl"
            }`}
          >
            <AnimatePresence mode="wait">
              {!selectedFile ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-accent/80 rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 text-center hover:border-blue-400 hover:bg-blue-50/30 transition"
                >
                  <p className="text-primary text-lg mb-6">
                    Free image compression and format conversion
                  </p>
                  <FileUpload onFileSelect={handleFileSelect} />
                </motion.div>
              ) : (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-background/90 rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-accent/80">
                    <div>
                      <h2 className="text-xl font-semibold text-primary">Processing Image</h2>
                      <p className="text-accent-foreground text-sm mt-1">
                        {selectedFile.name}
                      </p>
                    </div>
                    <button
                      onClick={handleClear}
                      className="text-primary hover:text-red-500 transition-colors p-1 rounded"
                      title="Clear and upload new image"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Options */}
                  <div className="p-6 border-b border-gray-200">
                    <ProcessingOptionsComponent
                      options={options}
                      onOptionsChange={handleOptionsChange}
                      onProcess={handleProcess}
                      isProcessing={isProcessing}
                      disabled={isProcessing}
                    />
                  </div>

                  {/* Preview */}
                  <div className="p-6">
                    <ImagePreview originalFile={selectedFile} processedImage={processedImage} />
                  </div>

                  {/* Download */}
                  {processedImage && (
                    <div className="p-6 border-t border-gray-200 bg-accent/80">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-accent-foreground text-center sm:text-left">
                          Image processed successfully! Ready to download.
                        </p>
                        <DownloadButton processedImage={processedImage} size="md" />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <CanvasElement />
        </div>
      </main>

      <Footer />
    </div>
  );
}
