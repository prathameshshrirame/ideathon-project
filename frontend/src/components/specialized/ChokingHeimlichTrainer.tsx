import React, { useState } from 'react';
import { Activity, ShieldAlert, Check, ChevronRight, RotateCcw } from 'lucide-react';

export const ChokingHeimlichTrainer: React.FC = () => {
  const [phase, setPhase] = useState<'blows' | 'thrusts'>('blows');
  const [blowsCount, setBlowsCount] = useState<number>(0);
  const [thrustsCount, setThrustsCount] = useState<number>(0);

  const handleBlow = () => {
    if (blowsCount < 5) {
      setBlowsCount((c) => c + 1);
      if (blowsCount + 1 === 5) {
        setPhase('thrusts');
      }
    }
  };

  const handleThrust = () => {
    if (thrustsCount < 5) {
      setThrustsCount((c) => c + 1);
    }
  };

  const handleReset = () => {
    setBlowsCount(0);
    setThrustsCount(0);
    setPhase('blows');
  };

  return (
    <div className="bg-amber-950/90 text-white rounded-2xl p-5 sm:p-6 border border-amber-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                5-and-5 Choking Airway Clearance Protocol
              </h3>
              <span className="bg-amber-500/30 text-amber-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-500/40">
                Red Cross Standard
              </span>
            </div>
            <p className="text-xs text-amber-300 font-medium">
              Deliver 5 firm back blows followed by 5 upward abdominal thrusts until obstruction dislodges.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold bg-amber-900/60 hover:bg-amber-900 text-amber-200 px-3 py-1.5 rounded-lg border border-amber-800 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Cycle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Phase 1: 5 Back Blows */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            phase === 'blows'
              ? 'bg-amber-900/60 border-amber-400 ring-2 ring-amber-400/40'
              : 'bg-black/30 border-amber-800/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-amber-300">Phase 1: 5 Back Blows</span>
            <span className="font-mono text-sm font-bold text-white">{blowsCount} / 5 Done</span>
          </div>
          <p className="text-xs text-slate-200 mb-3">
            Lean victim forward. Deliver sharp blows with the heel of your hand between shoulder blades.
          </p>
          <button
            type="button"
            onClick={handleBlow}
            disabled={blowsCount >= 5}
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            {blowsCount >= 5 ? '5 Blows Complete ✓' : `Deliver Back Blow (${blowsCount + 1}/5)`}
          </button>
        </div>

        {/* Phase 2: 5 Abdominal Thrusts (Heimlich) */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            phase === 'thrusts'
              ? 'bg-red-900/60 border-red-400 ring-2 ring-red-400/40'
              : 'bg-black/30 border-amber-800/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-red-300">Phase 2: 5 Inward/Upward Thrusts</span>
            <span className="font-mono text-sm font-bold text-white">{thrustsCount} / 5 Done</span>
          </div>
          <p className="text-xs text-slate-200 mb-3">
            Place fist thumb-side against abdomen just above navel. Grasp with other hand and pull inward & upward.
          </p>
          <button
            type="button"
            onClick={handleThrust}
            disabled={thrustsCount >= 5}
            className="w-full py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            {thrustsCount >= 5 ? '5 Thrusts Complete ✓' : `Deliver Abdominal Thrust (${thrustsCount + 1}/5)`}
          </button>
        </div>
      </div>
    </div>
  );
};
