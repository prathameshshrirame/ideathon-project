import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, PhoneCall, Sparkles, CheckCircle2, Cpu, Eye, Radio, AlertOctagon, Zap } from 'lucide-react';

interface LoadingStateProps {
  onComplete?: () => void;
  title?: string;
  subtitle?: string;
  duration?: number;
  showEmergencyCall?: boolean;
  userQuery?: string;
  uploadedImage?: string | null;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  onComplete,
  title = 'AI TRIAGE SITUATIONAL SCAN',
  subtitle = 'Analyzing acute threats & synthesizing tactical crisis instructions...',
  duration = 1600,
  showEmergencyCall = true,
  userQuery,
  uploadedImage,
}) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage(1);
      setProgress(45);
    }, 400);

    const t2 = setTimeout(() => {
      setStage(2);
      setProgress(75);
    }, 850);

    const t3 = setTimeout(() => {
      setStage(3);
      setProgress(100);
    }, 1300);

    const t4 = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, duration]);

  const steps = [
    { text: 'Ingesting environmental hazards & severity telemetry', icon: Eye },
    { text: 'Neural classification of threat level & immediate danger', icon: Cpu },
    { text: 'Synthesizing verified emergency action steps & exclusions', icon: ShieldAlert },
    { text: 'Generating tactical action checklist & 911 dispatch brief', icon: Sparkles },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-white">
      {/* Top AI Scanner Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden text-center space-y-5">
        {/* Animated Scanning Beam */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-rose-600 animate-pulse" />

        {/* Central Radar Pulse */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-red-600/20 animate-ping absolute" />
          <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-red-500/80 flex items-center justify-center relative shadow-xl shadow-red-600/30">
            <Radio className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/90 border border-red-700/80 text-red-300 text-[11px] font-mono font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            AI Decision Engine Active
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        {/* User Query / Image Scan Box */}
        {(userQuery || uploadedImage) && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-left flex items-center gap-3">
            {uploadedImage && (
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                <img src={uploadedImage} alt="Scanning" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                {uploadedImage ? 'MULTIMODAL SCAN: OPTICAL + TEXT' : 'ANALYZING INCIDENT TELEMETRY'}
              </div>
              <p className="text-xs text-white font-medium truncate mt-0.5">
                "{userQuery || 'Hazard optical scan'}"
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Triage Computation</span>
            <span className="text-red-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <motion.div
              className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-full rounded-full"
              initial={{ width: '15%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Analysis Stages */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 shadow-xl space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
          Live Triage Telemetry
        </div>
        {steps.map((step, idx) => {
          const isDone = stage > idx;
          const isCurrent = stage === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                  : isCurrent
                  ? 'bg-red-950/50 border-red-500/80 text-white ring-2 ring-red-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <div className="w-5 h-5 rounded-full border-2 border-red-500 border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-700 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-bold">{step.text}</span>
            </div>
          );
        })}
      </div>

      {/* Immediate Override Call Button */}
      {showEmergencyCall && (
        <div className="text-center pt-2">
          <p className="text-xs text-slate-400 mb-2 font-semibold font-mono">
            Immediate life danger? Bypass AI and dial directly:
          </p>
          <a
            id="loading-call-911"
            href="tel:911"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-red-600/40 transition-transform active:scale-95 border border-red-400/40 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>DIAL 911 RIGHT NOW</span>
          </a>
        </div>
      )}
    </div>
  );
};
