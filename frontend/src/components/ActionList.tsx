import React, { useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ActionListProps {
  actions: string[];
  title?: string;
  className?: string;
  completedSteps?: number[] | Record<number, boolean>;
  onToggleStep?: (stepNumber: number) => void;
  allowToggle?: boolean;
}

export const ActionList: React.FC<ActionListProps> = ({
  actions,
  title = 'DO THIS NOW — IMMEDIATE ACTIONS',
  className = '',
  completedSteps: externalCompleted,
  onToggleStep: externalToggle,
  allowToggle = true,
}) => {
  const [internalCompleted, setInternalCompleted] = useState<Record<number, boolean>>({});

  const isStepCompleted = (stepNum: number): boolean => {
    if (externalCompleted) {
      if (Array.isArray(externalCompleted)) {
        return externalCompleted.includes(stepNum);
      }
      return !!externalCompleted[stepNum];
    }
    return !!internalCompleted[stepNum];
  };

  const handleToggle = (stepNumber: number) => {
    if (!allowToggle) return;
    if (externalToggle) {
      externalToggle(stepNumber);
    } else {
      setInternalCompleted((prev) => ({
        ...prev,
        [stepNumber]: !prev[stepNumber],
      }));
    }
  };

  const completedCount = actions.filter((_, idx) => isStepCompleted(idx + 1)).length;
  const progressPercent = Math.round((completedCount / (actions.length || 1)) * 100);

  return (
    <div id="card-action-list" className={`space-y-4 ${className}`}>
      {/* Header with Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-red-500 font-black uppercase tracking-wider text-base sm:text-lg font-mono">
              {title}
            </h3>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
            {completedCount} / {actions.length} COMPLETED
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        {actions.map((step, index) => {
          const stepNum = index + 1;
          const isDone = isStepCompleted(stepNum);

          return (
            <li
              key={index}
              id={`action-step-${stepNum}`}
              onClick={() => handleToggle(stepNum)}
              className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none group relative overflow-hidden ${
                isDone
                  ? 'bg-slate-900/60 border-emerald-800/60 text-slate-400 opacity-70'
                  : 'bg-slate-900 border-slate-800 hover:border-red-500/60 hover:bg-slate-850 text-white shadow-md'
              }`}
            >
              {/* Number Badge */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 transition-transform group-hover:scale-105 shadow-md ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                    : 'bg-red-600 text-white shadow-red-900/40 border border-red-400/40'
                }`}
              >
                {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : stepNum}
              </div>

              {/* Action Directive */}
              <div className="flex-1 pt-1">
                <p
                  className={`text-sm sm:text-base font-bold leading-snug tracking-tight ${
                    isDone ? 'line-through text-slate-400 font-medium' : 'text-slate-100'
                  }`}
                >
                  {step}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500">
                    Priority Directive {stepNum}
                  </span>
                  {isDone && (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      • Action Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Status Checkbox */}
              <div className="shrink-0 pt-1.5 hidden sm:block">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-red-400 transition-colors" />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
