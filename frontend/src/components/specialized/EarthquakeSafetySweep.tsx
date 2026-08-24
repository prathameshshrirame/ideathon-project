import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, CheckSquare, Play, RotateCcw, AlertTriangle } from 'lucide-react';

export const EarthquakeSafetySweep: React.FC = () => {
  const [shakingTimer, setShakingTimer] = useState<number>(60);
  const [isTremorActive, setIsTremorActive] = useState<boolean>(false);
  const [gasChecked, setGasChecked] = useState<boolean>(false);
  const [waterChecked, setWaterChecked] = useState<boolean>(false);
  const [cracksChecked, setCracksChecked] = useState<boolean>(false);

  useEffect(() => {
    let t: number;
    if (isTremorActive && shakingTimer > 0) {
      t = window.setInterval(() => {
        setShakingTimer((prev) => prev - 1);
      }, 1000);
    } else if (shakingTimer === 0) {
      setIsTremorActive(false);
    }
    return () => clearInterval(t);
  }, [isTremorActive, shakingTimer]);

  const handleStartTremor = () => {
    setIsTremorActive(true);
  };

  const handleReset = () => {
    setIsTremorActive(false);
    setShakingTimer(60);
  };

  return (
    <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 border border-stone-700 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-black">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Seismic Shaking Hold & Post-Quake Safety Sweep
              </h3>
              <span className="bg-amber-500/30 text-amber-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-500/40">
                FEMA Earthquake Standard
              </span>
            </div>
            <p className="text-xs text-stone-300 font-medium">
              DROP, COVER, and HOLD ON during shaking. Execute structural sweep once tremors cease.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/40 p-4 rounded-xl border border-stone-800 items-center">
        {/* Shaking Hold Counter */}
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
            Active Tremor Hold
          </span>
          <div className="text-3xl font-mono font-black text-amber-300">
            {shakingTimer}s
          </div>
          <button
            type="button"
            onClick={handleStartTremor}
            disabled={isTremorActive || shakingTimer === 0}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold tracking-wide cursor-pointer"
          >
            {isTremorActive ? 'HOLDING UNDER COVER...' : 'Simulate Shaking Timer'}
          </button>
        </div>

        {/* Post-Quake Safety Sweep Interlocks */}
        <div className="space-y-1.5 sm:col-span-2 bg-stone-800/50 p-3 rounded-lg border border-stone-700 text-xs">
          <span className="font-extrabold text-amber-300 uppercase text-[10px] block">
            Post-Quake 3-Point Sweep Checklist:
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gasChecked}
              onChange={(e) => setGasChecked(e.target.checked)}
              className="rounded accent-amber-500 w-4 h-4"
            />
            <span className={gasChecked ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              Check for rotten egg gas odor — shut meter valve 1/4 turn if smelled
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={waterChecked}
              onChange={(e) => setWaterChecked(e.target.checked)}
              className="rounded accent-amber-500 w-4 h-4"
            />
            <span className={waterChecked ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              Inspect plumbing connections and water heater bracing
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cracksChecked}
              onChange={(e) => setCracksChecked(e.target.checked)}
              className="rounded accent-amber-500 w-4 h-4"
            />
            <span className={cracksChecked ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              Check brick chimneys & load-bearing foundation cracks
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
