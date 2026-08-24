import React, { useState, useEffect } from 'react';
import { Timer, AlertCircle, Play, Pause, RotateCcw, Check, Droplets } from 'lucide-react';

export const TourniquetPressureClock: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [markedTime, setMarkedTime] = useState<string | null>(null);
  const [pressureLevel, setPressureLevel] = useState<'moderate' | 'arterial_stop'>('arterial_stop');

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning && seconds === 0) {
      setMarkedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMarkedTime(null);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-rose-950/90 text-white rounded-2xl p-5 sm:p-6 border border-rose-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/40 text-white font-black">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Live Tourniquet Application & Ischemia Clock
              </h3>
              <span className="bg-rose-500/30 text-rose-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-rose-500/40">
                Paramedic Hand-off Critical
              </span>
            </div>
            <p className="text-xs text-rose-300 font-medium">
              Paramedics and trauma surgeons must know the exact minute a tourniquet was tightened.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold bg-rose-900/60 hover:bg-rose-900 text-rose-200 px-3 py-1.5 rounded-lg border border-rose-800 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-rose-900/30 p-4 rounded-xl border border-rose-800/80 items-center">
        {/* Big Clock */}
        <div className="text-center sm:text-left space-y-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
            Tourniquet Duration
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
            {formatTime(seconds)}
          </div>
          {markedTime && (
            <p className="text-[11px] text-emerald-400 font-bold">
              Applied At: {markedTime}
            </p>
          )}
        </div>

        {/* Anatomical Rules */}
        <div className="text-xs space-y-1 bg-black/30 p-3 rounded-lg border border-rose-800/50">
          <div className="font-extrabold text-rose-300 uppercase text-[10px]">
            Placement Checklist:
          </div>
          <p className="text-slate-200 font-medium">
            • Apply <strong>2 to 3 inches</strong> above the bleeding wound.
          </p>
          <p className="text-slate-200 font-medium">
            • <strong>Never</strong> place directly over a joint (elbow/knee).
          </p>
          <p className="text-slate-200 font-medium">
            • Twist windlass rod until bright red spurting stops completely.
          </p>
        </div>

        {/* Control Button */}
        <div className="flex flex-col justify-center gap-2">
          {!isRunning ? (
            <button
              type="button"
              onClick={handleStart}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Application Clock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRunning(false)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>Pause Clock</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
