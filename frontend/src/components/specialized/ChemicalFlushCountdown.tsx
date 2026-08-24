import React, { useState, useEffect } from 'react';
import { Biohazard, Play, Pause, RotateCcw, AlertTriangle, Droplets } from 'lucide-react';

export const ChemicalFlushCountdown: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60); // 15 mins
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(15 * 60);
  };

  return (
    <div className="bg-emerald-950/90 text-white rounded-2xl p-5 sm:p-6 border border-emerald-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black">
            <Biohazard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                15-Minute Continuous Chemical Decontamination Flush
              </h3>
              <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-500/40">
                ANSI Z358.1 Eyewash Standard
              </span>
            </div>
            <p className="text-xs text-emerald-300 font-medium">
              Immediate, unceasing irrigation with clean water for minimum 15 continuous minutes.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-800 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/40 p-4 rounded-xl border border-emerald-800/60 items-center">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
            Flush Time Remaining
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-300">
            {formatTime(secondsLeft)}
          </div>
          <p className="text-[11px] text-slate-300">
            Keep eyelids held wide open under flowing stream.
          </p>
        </div>

        <div className="text-xs space-y-1 bg-emerald-900/20 p-3 rounded-lg border border-emerald-800/40">
          <span className="font-extrabold text-emerald-300 uppercase text-[10px] block">
            Critical Directives:
          </span>
          <p className="text-slate-200">• Remove contact lenses immediately while flushing.</p>
          <p className="text-slate-200">• Brush dry powders off skin BEFORE applying water.</p>
          <p className="text-slate-200">• Do not apply neutralizers or vinegar to eyes.</p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isRunning ? 'Pause Flush Timer' : 'Start 15-Min Flush'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
