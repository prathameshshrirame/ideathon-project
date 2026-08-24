import React from 'react';
import { ArrowRight, ShieldCheck, Milestone, Compass } from 'lucide-react';

interface NextStepCardProps {
  nextStep: string;
  onGoToNextStep?: () => void;
  title?: string;
  buttonLabel?: string;
  className?: string;
}

export const NextStepCard: React.FC<NextStepCardProps> = ({
  nextStep,
  onGoToNextStep,
  title = 'NEXT STEP — SECONDARY DIRECTIVE',
  buttonLabel = 'VIEW SECONDARY ACTION PROTOCOL',
  className = '',
}) => {
  return (
    <div
      id="card-next-step"
      className={`bg-slate-900 border border-sky-900/60 rounded-3xl p-5 sm:p-6 shadow-xl text-white flex flex-col justify-between space-y-4 relative overflow-hidden ${className}`}
    >
      {/* Sky Blue Glow Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500 animate-pulse" />

      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-sky-950 border border-sky-700/60 flex items-center justify-center text-sky-400">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sky-400 font-mono font-black uppercase tracking-wider text-xs sm:text-sm">
              {title}
            </h4>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded-md border border-sky-800">
            PHASE 2
          </span>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-sky-950 text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">
          {nextStep}
        </div>
      </div>

      {onGoToNextStep && (
        <button
          id="btn-trigger-next-step"
          type="button"
          onClick={onGoToNextStep}
          className="w-full py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>{buttonLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};
