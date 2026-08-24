import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ImageUploadBoxProps {
  imagePreview: string | null;
  onImageSelected: (base64: string, mimeType: string) => void;
  onImageRemoved: () => void;
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  imagePreview,
  onImageSelected,
  onImageRemoved,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mimeType = file.type || 'image/jpeg';
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageSelected(result, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const mimeType = file.type || 'image/jpeg';
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageSelected(result, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (imagePreview) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/60 bg-slate-950 p-2 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={imagePreview}
            alt="Hazard Preview"
            className="w-14 h-14 object-cover rounded-xl border border-slate-700 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>HAZARD IMAGE ATTACHED</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
              Multimodal AI optical hazard analysis ready
            </p>
          </div>
          <button
            type="button"
            onClick={onImageRemoved}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer mr-1"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-slate-800 hover:border-red-500/60 bg-slate-950/60 hover:bg-slate-900/90 rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition-all flex items-center justify-center gap-3 group"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-red-500/60 flex items-center justify-center text-slate-400 group-hover:text-red-400 transition-colors shrink-0">
        <Camera className="w-4 h-4" />
      </div>
      <div className="text-left">
        <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
          Upload or Snap Hazard Photo
        </p>
        <p className="text-[10px] text-slate-400 font-mono">
          Smoke, flames, downed wires, burns, chemical labels
        </p>
      </div>
    </div>
  );
};
