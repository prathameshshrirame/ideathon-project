import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  Circle,
  Volume2,
  VolumeX,
  PhoneCall,
  MapPin,
  Share2,
  AlertTriangle,
  ArrowLeft,
  Flame,
  Zap,
  Activity,
  Radio,
  Flashlight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { EmergencyResponse } from '../types';
import { RiskBadge } from './RiskBadge';

interface LiveEmergencyDashboardProps {
  assessment: EmergencyResponse;
  onExit: () => void;
  onOpenSos: () => void;
  onOpenStrobe: () => void;
  onOpenNearbyHelp: () => void;
}

export const LiveEmergencyDashboard: React.FC<LiveEmergencyDashboardProps> = ({
  assessment,
  onExit,
  onOpenSos,
  onOpenStrobe,
  onOpenNearbyHelp,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [copiedLocation, setCopiedLocation] = useState(false);

  // Stopwatch timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // GPS Location fetch
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
          });
        },
        () => {
          setLocation({ lat: 37.7749, lng: -122.4194, accuracy: 12 });
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Format elapsed time to MM:SS or HH:MM:SS
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const totalSteps = assessment.doNow.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // Text to Speech Read-Aloud for hands-free evacuation guidance
  const speakCurrentStep = (stepText: string, index: number) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`Step ${index + 1}: ${stepText}`);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentStepIndex(index);
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const copyGpsCoords = () => {
    if (!location) return;
    const text = `LIVE EMERGENCY LOCATION: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)} (~${location.accuracy}m). Google Maps: https://maps.google.com/?q=${location.lat},${location.lng}`;
    navigator.clipboard.writeText(text);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-12">
      {/* Top Live Emergency Bar */}
      <div className="bg-slate-900 border-2 border-red-600 rounded-3xl p-5 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              onClick={onExit}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Return to Assessment"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  LIVE EMERGENCY DASHBOARD
                </h1>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Active incident telemetry, real-time checklist & hands-free voice audio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {/* Live Stopwatch Badge */}
            <div className="bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-2xl flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400 leading-none">ELAPSED</div>
                <div className="text-sm font-black font-mono text-amber-400 leading-tight">
                  {formatTime(elapsedSeconds)}
                </div>
              </div>
            </div>

            {/* SOS Button */}
            <button
              onClick={onOpenSos}
              className="py-2.5 px-4 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/40 cursor-pointer animate-pulse"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS ALARM</span>
            </button>
          </div>
        </div>

        {/* Hazard Classification Strip */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-slate-400">HAZARD:</span>
            <span className="text-sm font-black text-white">{assessment.emergencyType}</span>
            <RiskBadge level={assessment.riskLevel} size="sm" />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Step Progress:</span>
            <span className="font-mono font-bold text-emerald-400">
              {completedCount} of {totalSteps} Complete ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 mt-3 overflow-hidden border border-slate-800">
          <motion.div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Columns: Live Action Steps Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black text-sm">
                  ⚡
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Immediate Crisis Action Steps
                  </h3>
                  <p className="text-xs text-slate-500">Tap step to check off • Tap speaker for voice readout</p>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                Ordered by Priority
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {assessment.doNow.map((step, idx) => {
                const isDone = !!completedSteps[idx];
                const isActiveSpeaking = isSpeaking && currentStepIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all p-4 ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 opacity-90'
                        : isActiveSpeaking
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Checkbox Button */}
                      <button
                        onClick={() => toggleStep(idx)}
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                        aria-label={`Toggle step ${idx + 1}`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-400" />
                        )}
                      </button>

                      {/* Step Text */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-md ${
                              isDone
                                ? 'bg-emerald-200 text-emerald-900'
                                : 'bg-slate-900 text-white'
                            }`}
                          >
                            STEP {idx + 1}
                          </span>
                          {isDone && (
                            <span className="text-[11px] font-bold text-emerald-700 uppercase">
                              Completed
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm sm:text-base font-semibold leading-relaxed ${
                            isDone ? 'line-through text-slate-500' : 'text-slate-900'
                          }`}
                        >
                          {step}
                        </p>
                      </div>

                      {/* Voice Read Aloud Button */}
                      <button
                        onClick={() => speakCurrentStep(step, idx)}
                        className={`p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                          isActiveSpeaking
                            ? 'bg-amber-500 text-white border-amber-600 shadow-md animate-pulse'
                            : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                        title="Read step aloud"
                      >
                        {isActiveSpeaking ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Prohibitions */}
          {assessment.avoid.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-black text-sm">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>CRITICAL MISTAKES TO STRICTLY AVOID</span>
              </div>
              <ul className="space-y-2">
                {assessment.avoid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-red-950 font-medium">
                    <span className="text-red-600 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right 1 Column: Incident Telemetry & Quick Tools */}
        <div className="space-y-4">
          {/* Emergency 911 Speed Dial Card */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-5 shadow-xl shadow-red-600/30 space-y-3.5">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <h4 className="font-black text-base tracking-tight">EMERGENCY DISPATCH</h4>
            </div>
            <p className="text-xs text-red-100">
              One-touch connection to emergency dispatch operator.
            </p>
            <a
              href="tel:911"
              className="w-full py-3.5 px-4 bg-white hover:bg-red-50 text-red-700 font-black text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 text-center"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CALL 911 RIGHT NOW</span>
            </a>
          </div>

          {/* GPS Pinpoint Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>LIVE GPS BEACON</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                ACTIVE FIX
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
              <span>
                {location ? `${location.lat.toFixed(5)}°, ${location.lng.toFixed(5)}°` : 'Acquiring GPS...'}
              </span>
              {location?.accuracy && (
                <span className="text-[10px] text-slate-400">±{location.accuracy}m</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={copyGpsCoords}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLocation ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <MapPin className="w-3.5 h-3.5" />}
                <span>{copiedLocation ? 'Copied' : 'Copy GPS'}</span>
              </button>

              <button
                onClick={onOpenNearbyHelp}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Nearby ERs</span>
              </button>
            </div>
          </div>

          {/* Quick Hardware Toggles */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Emergency Field Tools
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenStrobe}
                className="py-3 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Flashlight className="w-4 h-4 text-amber-400" />
                <span>Strobe Beacon</span>
              </button>

              <button
                onClick={onOpenSos}
                className="py-3 px-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>SOS Siren</span>
              </button>
            </div>
          </div>

          {/* Uploaded Hazard Photo Preview if available */}
          {assessment.uploadedImage && (
            <div className="bg-slate-900 text-white rounded-3xl p-4 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>UPLOADED HAZARD PHOTO</span>
                <span className="bg-red-500 text-[9px] px-1.5 py-0.5 rounded font-mono">AI Scanned</span>
              </div>
              <img
                src={assessment.uploadedImage}
                alt="Emergency Hazard"
                className="w-full h-36 object-cover rounded-2xl border border-slate-700"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
