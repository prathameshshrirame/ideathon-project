import React, { useState } from 'react';
import { Flame, DoorClosed, AlertTriangle, ShieldCheck, PhoneCall, Wind, EyeOff } from 'lucide-react';

export const FireEvacuationProtocol: React.FC = () => {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const protocols = [
    {
      id: 'low_crawl',
      icon: '🧎',
      title: 'Stay Below Smoke Layer (<3 ft)',
      desc: 'Toxic gases (CO, HCN) and lethal superheated air rise to ceiling. Crawl on hands and knees with head 1-2 feet above floor where oxygen is cleanest.',
      critical: 'DO NOT WALK UPRIGHT THROUGH SMOKE — One inhalation of hot toxic smoke can cause immediate airway spasm and unconsciousness.',
    },
    {
      id: 'door_check',
      icon: '🚪',
      title: 'Check Doors with Back of Hand',
      desc: 'Before opening any closed door, touch the door surface and metal knob with the BACK OF YOUR HAND. If warm or hot, fire is directly on the other side.',
      critical: 'If door is hot: DO NOT OPEN. Use secondary window exit or shelter in place and seal gaps.',
    },
    {
      id: 'compartmentalize',
      icon: '🔒',
      title: 'Close Doors Behind You as You Escape',
      desc: 'Closing interior and exterior doors as you leave starves the fire of incoming oxygen and delays structural smoke penetration by up to 20 minutes.',
      critical: 'Never use elevators during a fire alarm — power cuts can trap occupants in shafts acting as thermal chimneys.',
    },
    {
      id: 'grease_rule',
      icon: '🍳',
      title: 'Kitchen Grease Rule: Zero Water',
      desc: 'If cooking oil ignites in a pan: Turn off the stove burner if safe. Slide a flat metal lid or baking sheet over the pan to smother oxygen. Keep lid on until cool.',
      critical: 'NEVER pour water or throw flour on hot grease fires — water instantly flashes into steam, creating a catastrophic fireball explosion.',
    },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-red-900/80 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40 text-white font-black text-xl shrink-0">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                Fire & Thermal Evacuation Protocol
              </h3>
              <span className="bg-red-500/30 text-red-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-red-500/40">
                Evacuation Protocol
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Real-world life preservation directives for residential and commercial fire emergencies.
            </p>
          </div>
        </div>

        <a
          href="tel:911"
          className="self-start sm:self-center px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call 911 Dispatch</span>
        </a>
      </div>

      {/* Real-World Protocol Directive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {protocols.map((p) => {
          const isDone = !!checkedSteps[p.id];
          return (
            <div
              key={p.id}
              onClick={() => toggleCheck(p.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                isDone
                  ? 'bg-slate-950 border-emerald-500/60 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.icon}</span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-100">{p.title}</h4>
                  </div>
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {}}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-amber-300 font-semibold flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{p.critical}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trapped Indoors Contingency Banner */}
      <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl space-y-1.5 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-red-300 font-black uppercase text-[11px] tracking-wide">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>If Trapped in a Room (Exit Path Blocked by Fire):</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li><strong>Keep door closed:</strong> Stuff towels, sheets, or clothing under and around door cracks (wet if water is available) to block smoke.</li>
          <li><strong>Signal rescuers:</strong> Open window slightly from top for fresh air. Hang a bright sheet or shine phone light out window to signal rescue teams.</li>
          <li><strong>Call 911 immediately:</strong> Give dispatch your exact building address and specific room number or floor location.</li>
        </ul>
      </div>
    </div>
  );
};
