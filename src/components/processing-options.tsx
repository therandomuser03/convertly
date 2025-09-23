import React from "react";
import { Settings, Loader2 } from "lucide-react";
import {
  ProcessingOptions as ProcessingOptionsType,
  SupportedFormat,
} from "@/../types/index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";

interface ProcessingOptionsProps {
  options: ProcessingOptionsType;
  onOptionsChange: (options: ProcessingOptionsType) => void;
  onProcess: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}

export const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  options,
  onOptionsChange,
  onProcess,
  isProcessing,
  disabled = false,
}) => {
  const handleFormatChange = (format: SupportedFormat) => {
    onOptionsChange({ ...options, format });
  };

  const handleQualityChange = (quality: number) => {
    onOptionsChange({ ...options, quality });
  };

  const handleWidthChange = (width: string) => {
    const numWidth = width ? parseInt(width) : undefined;
    onOptionsChange({ ...options, width: numWidth });
  };

  // const handleHeightChange = (height: string) => {
  //   const numHeight = height ? parseInt(height) : undefined;
  //   onOptionsChange({ ...options, height: numHeight });
  // };

  return (
    <div className="grid md:grid-cols-4 gap-4 p-4 bg-accent 50 rounded-lg">
      {/* Format Selection */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Output Format
        </label>
        <Select
          value={options.format}
          onValueChange={(value: SupportedFormat) => handleFormatChange(value)}
          disabled={disabled}
        >
          <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Formats</SelectLabel>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Quality Slider */}
      <div>
        <label className="block text-sm font-medium text-primary mb-5">
          Quality: {options.quality}%
        </label>
        <Slider
          value={[options.quality]}
          max={100}
          min={10}
          step={1}
          onValueChange={(value: number[]) => handleQualityChange(value[0])}
          disabled={disabled}
          className="w-full"
        />
      </div>

      {/* Width Input */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Width (px)
        </label>
        <input
          type="number"
          placeholder="Auto"
          value={options.width || ""}
          onChange={(e) => handleWidthChange(e.target.value)}
          disabled={disabled}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Process Button */}
      <div className="flex items-end">
        <button
          onClick={onProcess}
          disabled={isProcessing || disabled}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Settings className="h-4 w-4" />
              Process Image
            </>
          )}
        </button>
      </div>
    </div>
  );
};
