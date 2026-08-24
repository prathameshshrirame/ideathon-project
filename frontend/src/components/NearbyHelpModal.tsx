import React from 'react';
import { motion } from 'motion/react';
import { Hospital, X, ShieldAlert } from 'lucide-react';
import { NearbyLocationsFinder, EmergencyFacility } from './NearbyLocationsFinder';

interface NearbyHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  emergencyType?: string;
}

export const NearbyHelpModal: React.FC<NearbyHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-4 sm:p-6 text-white shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/40 text-white shrink-0">
              <Hospital className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                NEARBY EMERGENCY LOCATIONS
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  REAL-TIME GPS RADAR
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Trauma ERs, Fire & Hazmat Rescue, Police Stations & 24/7 Urgent Care near your position
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Nearby Help"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-3 pr-1">
          <NearbyLocationsFinder />
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Always dial 911 for immediate dispatch during life-threatening crises.
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </motion.div>
    </div>
  );
};

