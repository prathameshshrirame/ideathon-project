import React, { useState } from 'react';
import { PhoneCall, Copy, Check, Volume2, VolumeX, MessageSquare, ShieldAlert } from 'lucide-react';
import { EmergencyResponse } from '../types';

interface ScriptProps {
  assessment: EmergencyResponse;
}

export const Emergency911DispatchScript: React.FC<ScriptProps> = ({ assessment }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getVerbatimScript = () => {
    if (assessment.dispatchScript) {
      return assessment.dispatchScript;
    }

    return `OPERATOR SCRIPT: "Emergency Operator, this is an urgent call regarding a ${assessment.riskLevel} risk ${assessment.emergencyType}. Location coordinates locked. Critical hazard present: ${assessment.summary} Immediate safety action underway: ${assessment.doNow[0]}. Please dispatch fire / rescue / EMS units immediately."`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getVerbatimScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(getVerbatimScript());
    u.rate = 1.0;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black shadow-md shadow-red-600/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Verbatim 911 Dispatcher Spoken Script
              </h3>
              <span className="bg-red-500/20 text-red-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-red-500/30">
                Stress-Proof Speech
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Read these exact words clearly to the 911 operator to accelerate first-responder triage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {'speechSynthesis' in window && (
            <button
              type="button"
              onClick={handleReadAloud}
              className={`p-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Practice speech pronunciation"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Script'}</span>
          </button>
        </div>
      </div>

      {/* Script Box */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed space-y-2 select-all">
        <p className="text-slate-400 text-[11px] font-sans font-bold uppercase tracking-wider">
          READ VERBATIM TO OPERATOR:
        </p>
        <p className="font-semibold">{getVerbatimScript()}</p>
      </div>

      {/* 3 Vital Operator Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-300 pt-1">
        <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
          <strong className="text-white block font-bold">1. Address / GPS First:</strong>
          State exact location before describing the hazard.
        </div>
        <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
          <strong className="text-white block font-bold">2. Trapped Victims:</strong>
          State total count of injured or unable to evacuate.
        </div>
        <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
          <strong className="text-white block font-bold">3. Stay on Line:</strong>
          Never hang up until the operator tells you to disconnect.
        </div>
      </div>
    </div>
  );
};
