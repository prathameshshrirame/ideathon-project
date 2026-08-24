import React, { useState } from 'react';
import { Lightbulb, Volume2, ShieldAlert, Sparkles, X, ChevronRight } from 'lucide-react';

interface StrobeProps {
  emergencyType: string;
}

export const VisualStrobeSignal: React.FC<StrobeProps> = ({ emergencyType }) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'strobe' | 'high-contrast'>('strobe');

  const triggerTorchFlashlight = async () => {
    try {
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        const track = stream.getVideoTracks()[0];
        const imageCapture = (track as unknown as { applyConstraints?: (c: unknown) => Promise<void> });
        if (imageCapture.applyConstraints) {
          await imageCapture.applyConstraints({
            advanced: [{ torch: true }],
          });
        }
      }
    } catch {
      // Torch hardware unavailable / denied in preview
    }
  };

  return (
    <div className="bg-amber-950/80 text-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-800/80 shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white">
              Optical SOS Strobe & Screen Flare
            </h4>
            <p className="text-[11px] text-amber-200">
              High-visibility rescue beacon for dark environments, smoke, or rubble extraction.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsActive(true);
            triggerTorchFlashlight();
          }}
          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Launch Strobe Flare</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Fullscreen Strobe Overlay */}
      {isActive && (
        <div
          onClick={() => setIsActive(false)}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 cursor-pointer select-none transition-colors duration-75 ${
            mode === 'strobe'
              ? 'animate-pulse bg-white text-black'
              : 'bg-red-600 text-white'
          }`}
        >
          <div className="text-center space-y-4 max-w-md bg-black/80 text-white p-6 rounded-2xl border border-white/20 backdrop-blur-md">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto animate-ping">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              SOS RESCUE BEACON ACTIVE
            </h2>
            <p className="text-xs font-mono text-amber-300">
              EMERGENCY: {emergencyType.toUpperCase()}
            </p>
            <p className="text-xs text-slate-300">
              Hold device facing windows, search helicopters, or first responders.
            </p>
            <p className="text-[11px] uppercase tracking-widest text-slate-400 pt-2 font-bold">
              [ TAP ANYWHERE TO DISMISS FLASHER ]
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
