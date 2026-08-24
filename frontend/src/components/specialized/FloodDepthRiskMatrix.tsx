import React, { useState } from 'react';
import { Droplets, AlertTriangle, ShieldCheck, Car, Footprints } from 'lucide-react';

export const FloodDepthRiskMatrix: React.FC<{ isBurstPipe?: boolean }> = ({ isBurstPipe = false }) => {
  const [selectedDepth, setSelectedDepth] = useState<number>(6);

  const depthThresholds = [
    {
      inches: 6,
      label: '6 Inches (15 cm)',
      impact: 'Sweeps adult pedestrians off their feet. Enters lower car chassis and knocks down wading persons.',
      danger: 'High Pedestrian Risk',
    },
    {
      inches: 12,
      label: '12 Inches (30 cm)',
      impact: 'Floats most sedans and passenger cars, causing loss of steering control and engine stalling.',
      danger: 'Severe Vehicle Stalling',
    },
    {
      inches: 24,
      label: '24 Inches (60 cm)',
      impact: 'Sweeps away heavy SUVs, pickup trucks, and large utility vans in swift currents.',
      danger: 'Lethal Displacement',
    },
  ];

  return (
    <div className="bg-blue-950/90 text-white rounded-2xl p-5 sm:p-6 border border-blue-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                {isBurstPipe ? 'Main Water Isolation & Flood Inundation Index' : 'Flash Flood Hydrodynamic Risk Matrix'}
              </h3>
              <span className="bg-blue-500/30 text-blue-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-500/40">
                NOAA / NWS Benchmark
              </span>
            </div>
            <p className="text-xs text-blue-300 font-medium">
              {isBurstPipe
                ? 'Locate clockwise main quarter-turn ball valve or street curb stop immediately.'
                : 'Turn Around, Don’t Drown — water exerts hundreds of pounds of lateral force.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {depthThresholds.map((t) => (
          <button
            key={t.inches}
            type="button"
            onClick={() => setSelectedDepth(t.inches)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              selectedDepth === t.inches
                ? 'bg-blue-600 border-blue-400 text-white shadow-md ring-2 ring-blue-400/40'
                : 'bg-blue-900/30 border-blue-800/60 text-blue-200 hover:bg-blue-900/60'
            }`}
          >
            <div className="text-xs font-black mb-1">{t.label}</div>
            <div className="text-[10px] uppercase font-bold text-amber-300 mb-1">{t.danger}</div>
            <p className="text-[11px] text-slate-200 line-clamp-2">{t.impact}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
