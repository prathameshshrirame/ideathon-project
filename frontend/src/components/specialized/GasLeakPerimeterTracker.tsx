import React, { useState } from 'react';
import { Wind, AlertOctagon, Compass, CheckCircle2, Flame } from 'lucide-react';

export const GasLeakPerimeterTracker: React.FC = () => {
  const [switchesAvoided, setSwitchesAvoided] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [upwindConfirmed, setUpwindConfirmed] = useState(false);

  return (
    <div className="bg-orange-950/90 text-white rounded-2xl p-5 sm:p-6 border border-orange-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Gas Vapor & Lower Explosive Limit (LEL) Safety Matrix
              </h3>
              <span className="bg-orange-500/30 text-orange-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-orange-500/40">
                Zero-Spark Zone
              </span>
            </div>
            <p className="text-xs text-orange-300 font-medium">
              Natural gas mixed at 5% to 15% concentration ignites from microscopic static arcs.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/40 p-4 rounded-xl border border-orange-800/60 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400">
            Evacuation Distance
          </span>
          <div className="text-2xl font-mono font-black text-amber-300">
            300+ FEET
          </div>
          <p className="text-slate-300 text-[11px]">
            Move directly <strong>UPWIND</strong> from the building.
          </p>
        </div>

        <div className="space-y-1 sm:col-span-2 bg-orange-900/20 p-3 rounded-lg border border-orange-800/40">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-300 block mb-1">
            Zero-Spark Compliance Checks:
          </span>
          <label className="flex items-center gap-2 cursor-pointer mb-1.5">
            <input
              type="checkbox"
              checked={switchesAvoided}
              onChange={(e) => setSwitchesAvoided(e.target.checked)}
              className="rounded accent-orange-500 w-4 h-4"
            />
            <span className={switchesAvoided ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              NO light switches, thermostats, doorbells, or garage openers touched
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer mb-1.5">
            <input
              type="checkbox"
              checked={doorsOpen}
              onChange={(e) => setDoorsOpen(e.target.checked)}
              className="rounded accent-orange-500 w-4 h-4"
            />
            <span className={doorsOpen ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              Left entry door wide open on exit to vent vapors
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={upwindConfirmed}
              onChange={(e) => setUpwindConfirmed(e.target.checked)}
              className="rounded accent-orange-500 w-4 h-4"
            />
            <span className={upwindConfirmed ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
              Phone calls made exclusively from outdoors at safe perimeter
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
