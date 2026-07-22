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

  return (
    <div className="grid md:grid-cols-1 gap-6">
      {/* Format Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink">
          Output Format
        </label>
        <Select
          value={options.format}
          onValueChange={(value: SupportedFormat) => handleFormatChange(value)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full bg-canvas border-hairline focus:ring-primary/40 transition-all rounded-[8px] h-10 text-ink">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent className="rounded-[8px] border-hairline shadow-xl bg-canvas text-ink">
            <SelectGroup>
              <SelectLabel className="text-muted text-xs uppercase tracking-widest font-medium">Formats</SelectLabel>
              <SelectItem value="jpeg" className="rounded-md cursor-pointer hover:bg-surface-soft focus:bg-surface-soft focus:text-ink">JPEG</SelectItem>
              <SelectItem value="png" className="rounded-md cursor-pointer hover:bg-surface-soft focus:bg-surface-soft focus:text-ink">PNG</SelectItem>
              <SelectItem value="webp" className="rounded-md cursor-pointer hover:bg-surface-soft focus:bg-surface-soft focus:text-ink">WEBP</SelectItem>
              <SelectItem value="avif" className="rounded-md cursor-pointer hover:bg-surface-soft focus:bg-surface-soft focus:text-ink">AVIF</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Quality Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink flex items-center gap-2">
            Quality
            {options.format === 'png' && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono border border-primary/20 font-medium">LOSSLESS</span>
            )}
          </label>
          <span className="text-sm font-mono text-muted bg-canvas border border-hairline px-2 py-0.5 rounded-[4px]">
            {options.quality}%
          </span>
        </div>
        <Slider
          value={[options.quality]}
          max={100}
          min={10}
          step={1}
          onValueChange={(value: number[]) => handleQualityChange(value[0])}
          disabled={disabled || options.format === 'png'}
          className="w-full py-2 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-none [&_[role=slider]]:bg-primary"
        />
      </div>

      {/* Width Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink">
          Width (px)
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="Auto"
            value={options.width || ""}
            onChange={(e) => handleWidthChange(e.target.value)}
            disabled={disabled}
            className="w-full h-10 px-3 bg-canvas border border-hairline rounded-[8px] focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-50 text-ink placeholder:text-muted"
          />
          {!options.width && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] tracking-wider font-mono text-muted pointer-events-none bg-surface-soft px-1.5 py-0.5 rounded">AUTO</span>
          )}
        </div>
      </div>

      {/* Process Button */}
      <div className="flex items-end mt-4">
        <button
          onClick={onProcess}
          disabled={isProcessing || disabled}
          className="w-full h-10 bg-primary text-on-primary font-medium rounded-[8px] hover:bg-primary-active transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 overflow-hidden relative"
        >
          {isProcessing && (
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
          )}
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
