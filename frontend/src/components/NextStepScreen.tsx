import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, PhoneCall, RotateCcw, ShieldCheck, AlertTriangle, MapPin, Users, FileText, Check } from 'lucide-react';
import { AssessmentResult } from '../types';

interface NextStepScreenProps {
  assessment: AssessmentResult;
  onBackToResult: () => void;
  onNewAssessment: () => void;
}

export const NextStepScreen: React.FC<NextStepScreenProps> = ({
  assessment,
  onBackToResult,
  onNewAssessment,
}) => {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setCompletedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const stepsList = assessment.detailedNextSteps || [
    'Confirm all individuals and pets have safely evacuated to the muster point.',
    'Keep a minimum safe perimeter distance from the affected structure or zone.',
    'Brief arriving emergency responders with specific hazard details and structural access points.',
    'Do not re-enter the building until official first responders give all-clear clearance.',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 text-white">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="btn-nextstep-back-to-result"
          type="button"
          onClick={onBackToResult}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 shadow-md transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Primary Action Plan</span>
        </button>

        <button
          id="btn-nextstep-restart"
          type="button"
          onClick={onNewAssessment}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 shadow-md transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-6 sm:p-8 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-emerald-500 animate-pulse" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Phase 2 Protocol Sequence
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Secondary & Follow-Up Procedures
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Post-immediate stabilization for <span className="text-white font-bold">{assessment.emergencyType}</span>
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300 self-start sm:self-center max-w-sm">
              <p className="font-mono font-bold text-amber-400 uppercase tracking-wider text-[11px]">Primary Phase 2 Directive:</p>
              <p className="text-slate-200 mt-1 font-semibold">{assessment.nextStep}</p>
            </div>
          </div>
        </div>

        {/* Content Checklist */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Follow-Up Action Protocol Checklist
              </h3>
              <span className="text-[11px] font-mono text-slate-500 font-medium">Tap items to mark verified</span>
            </div>

            <div className="space-y-3">
              {stepsList.map((step, idx) => {
                const isChecked = !!completedItems[idx];
                return (
                  <button
                    key={idx}
                    id={`btn-nextstep-item-${idx}`}
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-slate-950/60 border-emerald-800/60 text-slate-500 line-through'
                        : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-100'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                        isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isChecked ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="flex-1 text-sm sm:text-base font-bold leading-snug pt-0.5">
                      {step}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guidelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Muster Point
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Stay at the outdoor assembly location. Never wander back toward the perimeter until certified all-clear.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                Accountability
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Take head count of all family members, occupants, or coworkers. Relay missing persons immediately to 911.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400 font-mono font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                Incident Briefing
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Be ready to inform first responders of the hazard origin, electrical breaker status, or gas shut-off valve state.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Safety priority: Do not attempt physical re-entry or repairs until emergency personnel authorize it.
          </p>
          <span className="font-mono text-emerald-400 font-bold">Phase 2 Directive Complete</span>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          id="btn-nextstep-call-911"
          href="tel:911"
          className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-colors cursor-pointer border border-red-400/40"
        >
          <PhoneCall className="w-4 h-4" />
          Call 911 Dispatch Now
        </a>

        <button
          id="btn-nextstep-new-assessment"
          type="button"
          onClick={onNewAssessment}
          className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 border border-slate-800 text-slate-200 font-bold text-sm sm:text-base tracking-wide shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          Start New Assessment
        </button>
      </div>
    </div>
  );
};
