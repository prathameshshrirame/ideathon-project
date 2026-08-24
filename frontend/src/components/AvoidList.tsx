import React from 'react';
import { AlertOctagon, XCircle, Ban } from 'lucide-react';

interface AvoidListProps {
  items: string[];
  title?: string;
  className?: string;
}

export const AvoidList: React.FC<AvoidListProps> = ({
  items,
  title = 'DO NOT DO — CRITICAL HAZARDS',
  className = '',
}) => {
  return (
    <div
      id="card-avoid-list"
      className={`bg-slate-900 border border-rose-900/60 rounded-3xl p-5 sm:p-6 shadow-xl text-white space-y-4 relative overflow-hidden ${className}`}
    >
      {/* Red Warning Glow Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600 animate-pulse" />

      {title && (
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400">
              <Ban className="w-4 h-4" />
            </div>
            <h4 className="text-rose-400 font-mono font-black uppercase tracking-wider text-xs sm:text-sm">
              {title}
            </h4>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-800">
            PROHIBITED
          </span>
        </div>
      )}

      <ul className="space-y-3 pt-1">
        {items.map((item, index) => (
          <li
            key={index}
            id={`avoid-item-${index + 1}`}
            className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/70 border border-rose-950/80 text-xs sm:text-sm text-rose-100 font-bold leading-relaxed"
          >
            <div className="w-5 h-5 rounded-full bg-rose-950 border border-rose-600 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
