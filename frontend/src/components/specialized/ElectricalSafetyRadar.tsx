import React, { useState } from 'react';
import { Zap, AlertTriangle, ShieldCheck, Check, Radio } from 'lucide-react';

export const ElectricalSafetyRadar: React.FC<{ isDownedLine?: boolean }> = ({ isDownedLine = false }) => {
  const [dryFloorChecked, setDryFloorChecked] = useState(false);
  const [breakerLocated, setBreakerLocated] = useState(false);
  const [noWaterApplied, setNoWaterApplied] = useState(false);

  return (
    <div className="bg-amber-950/90 text-white rounded-2xl p-5 sm:p-6 border border-amber-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Electrical Arc & Step-Potential Isolation Protocol
              </h3>
              <span className="bg-amber-500/30 text-amber-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-500/40">
                OSHA Standard 1910
              </span>
            </div>
            <p className="text-xs text-amber-300 font-medium">
              Maintain critical perimeter to prevent ground-voltage gradient shock.
            </p>
          </div>
        </div>
      </div>

      {/* Perimeter Range Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/40 p-4 rounded-xl border border-amber-800/60">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
            Mandatory Isolation Perimeter
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300">
            {isDownedLine ? '35 FEET (11m)' : '10 FEET (3m)'}
          </div>
          <p className="text-xs text-slate-300">
            {isDownedLine
              ? 'Voltage radiates outward in concentric ripples. Shuffle-slide feet together — never lift heels.'
              : 'Keep children, pets, and bystanders away from hot drywall or buzzing circuits.'}
          </p>
        </div>

        {/* Rapid Pre-Breaker Verification Checklist */}
        <div className="space-y-2 bg-amber-900/30 p-3 rounded-lg border border-amber-800/40 text-xs">
          <div className="font-extrabold text-amber-300 uppercase text-[10px]">
            Pre-Breaker Safety Interlocks:
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dryFloorChecked}
              onChange={(e) => setDryFloorChecked(e.target.checked)}
              className="rounded accent-amber-500 w-4 h-4"
            />
            <span className={dryFloorChecked ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              Floor and panel surface are 100% bone-dry
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={noWaterApplied}
              onChange={(e) => setNoWaterApplied(e.target.checked)}
              className="rounded accent-amber-500 w-4 h-4"
            />
            <span className={noWaterApplied ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              NO water or Class A liquids applied
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
