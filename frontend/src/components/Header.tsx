import React, { useEffect, useState } from 'react';
import {
  PhoneCall,
  RotateCcw,
  Zap,
  FileText,
  BookOpen,
  AlertOctagon,
  Hospital,
  Activity,
  Radio,
  MapPin,
  Shield,
} from 'lucide-react';
import { ScreenState } from '../types';

interface HeaderProps {
  currentScreen: ScreenState;
  onReset: () => void;
  onQuickHelp?: () => void;
  onOpenGuidelines?: () => void;
  onOpenIceModal?: () => void;
  onOpenSos?: () => void;
  onOpenNearbyHelp?: () => void;
  onOpenLiveDashboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onReset,
  onOpenGuidelines,
  onOpenIceModal,
  onOpenSos,
  onOpenNearbyHelp,
  onOpenLiveDashboard,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 text-white shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Mission Status */}
        <div className="flex items-center gap-3">
          <button
            id="btn-header-home"
            type="button"
            onClick={onReset}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl p-1 transition hover:opacity-95 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/40 text-white shrink-0 border border-red-500/50 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white leading-none">
                  CrisisMate
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-600/50 text-[9px] font-mono font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  READY
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-bold mt-0.5 font-mono">
                Emergency AI • Crisis Copilot
              </p>
            </div>
          </button>
        </div>

        {/* Center Live Telemetry (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5 text-red-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>911 DISPATCH LINK</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-bold">{timeStr || 'LIVE'} UTC</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Shield className="w-3 h-3" /> OFFLINE READY
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Nearby Help */}
          {onOpenNearbyHelp && (
            <button
              id="btn-header-nearby"
              type="button"
              onClick={onOpenNearbyHelp}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 rounded-xl transition-all cursor-pointer border border-emerald-700/60 shadow-xs"
              title="Nearby Trauma Centers & Emergency Facilities"
            >
              <Hospital className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Nearby ER</span>
            </button>
          )}

          {/* Medical ID Card */}
          {onOpenIceModal && (
            <button
              id="btn-header-ice"
              type="button"
              onClick={onOpenIceModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-700/80"
              title="In Case of Emergency (ICE) Profile"
            >
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>Medical ID</span>
            </button>
          )}

          {/* Guidelines */}
          {currentScreen === 'home' && onOpenGuidelines && (
            <button
              id="btn-header-guidelines"
              type="button"
              onClick={onOpenGuidelines}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-700/80"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Protocols</span>
            </button>
          )}

          {/* Reset / Home Button when not on home */}
          {currentScreen !== 'home' && (
            <button
              id="btn-header-reset"
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-700/80"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>New Scan</span>
            </button>
          )}

          {/* SOS High-Alert Action Button */}
          {onOpenSos ? (
            <button
              id="btn-header-sos"
              type="button"
              onClick={onOpenSos}
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:from-red-700 active:to-rose-700 text-white px-3.5 sm:px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-red-600/40 border border-red-400/50 transition-all cursor-pointer animate-pulse"
            >
              <AlertOctagon className="w-4 h-4 fill-white text-red-600" />
              <span>SOS ALARM</span>
            </button>
          ) : (
            <a
              id="btn-header-call-911"
              href="tel:911"
              className="flex items-center gap-1.5 bg-red-600 text-white px-3.5 sm:px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-red-600/30 hover:bg-red-500 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>911</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
