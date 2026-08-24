import React from 'react';
import { X, ShieldAlert, BookOpen, AlertTriangle, PhoneCall, CheckCircle2 } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-emergency-guidelines"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Emergency Decision Guidelines
              </h2>
              <p className="text-xs text-slate-500">Universal Safety & Response Protocols</p>
            </div>
          </div>
          <button
            id="btn-close-guidelines-modal"
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* Section 1: Golden Rule */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-red-700 font-bold uppercase tracking-wider text-xs">
              <AlertTriangle className="w-4 h-4" />
              The Primary Golden Rule
            </div>
            <p className="text-slate-900 font-medium">
              Human safety takes absolute priority over property or belongings. Evacuate immediately if there is any doubt about your safety.
            </p>
          </div>

          {/* Section 2: Core Protocols */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Protocol by Category
            </h3>
            
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <span>🔥</span> Fire & Heavy Smoke
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Stay low below the 3-foot smoke layer. Test doors with the back of your hand before opening. Close doors behind you to compartmentalize toxic gases. Never use elevators.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <span>⚡</span> Electrical Hazards
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Keep clear of energized equipment. Never throw water on electrical fires. Cut main power at breaker only if the panel is dry and accessible.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <span>🌊</span> Structural Flooding
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Move to higher ground. Avoid standing or moving water due to submerged electrical currents and structural collapse hazards.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <span>⚠️</span> Gas Leaks (Rotten Egg / Sulfur Smell)
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Do not touch light switches, doorbells, or mobile phones inside. Leave doors open, evacuate immediately on foot, and call from outside.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: When to call 911 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              When to Dispatch 911 / Emergency Services
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Visible flame spread or persistent acrid smoke
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Suspected gas odors or carbon monoxide detector activations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Unresponsive individuals, difficulty breathing, or severe trauma
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Any hazard that cannot be safely isolated from a safe distance
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            id="btn-modal-call-911"
            href="tel:911"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-red-200 hover:bg-red-700 active:bg-red-800 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 911 Immediately</span>
          </a>
          <button
            id="btn-close-guidelines-modal-bottom"
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors cursor-pointer"
          >
            Close Guidelines
          </button>
        </div>
      </div>
    </div>
  );
};
