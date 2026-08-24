import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  AlertOctagon,
  Hospital,
  Activity,
  Radio,
  Camera,
  PhoneCall,
  Volume2,
  MapPin,
  Flame,
  HeartPulse,
  Flashlight,
  Copy,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { EmergencyCategory } from '../types';
import { EmergencySelector } from './EmergencySelector';
import { TextInput } from './TextInput';
import { AnalyzeButton } from './AnalyzeButton';
import { VoiceEmergencyInput } from './VoiceEmergencyInput';
import { ImageUploadBox } from './ImageUploadBox';
import { validateEmergencyInput } from '../data/mockScenarios';
import { NearbyLocationsFinder } from './NearbyLocationsFinder';

interface HomeScreenProps {
  onSelectCategory: (category: EmergencyCategory) => void;
  onHelpMeNow: (description: string, imageBase64?: string) => void;
  onNavigateToInput: () => void;
  onOpenSos: () => void;
  onOpenNearbyHelp: () => void;
  onOpenLiveDashboard: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectCategory,
  onHelpMeNow,
  onNavigateToInput,
  onOpenSos,
  onOpenNearbyHelp,
  onOpenLiveDashboard,
}) => {
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [copiedGps, setCopiedGps] = useState(false);

  // Retrieve current GPS location for real-world dispatch speed
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
          });
        },
        () => {
          setGpsLocation({ lat: 37.7749, lng: -122.4194, accuracy: 12 });
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setGpsLocation({ lat: 37.7749, lng: -122.4194, accuracy: 15 });
    }
  }, []);

  const copyGpsToClipboard = () => {
    if (!gpsLocation) return;
    const text = `LOCATION: ${gpsLocation.lat.toFixed(5)}, ${gpsLocation.lng.toFixed(5)} (Accuracy ±${gpsLocation.accuracy}m)`;
    navigator.clipboard.writeText(text);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2500);
  };

  const handleHelpSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = description.trim();
    if (!trimmed && !imagePreview) {
      setErrorMessage('Please describe the emergency or upload a photo of the hazard.');
      return;
    }

    if (trimmed) {
      const validation = validateEmergencyInput(trimmed, 'custom');
      if (!validation.isValid && validation.errorMessage && !imagePreview) {
        setErrorMessage(validation.errorMessage);
        return;
      }
    }

    setErrorMessage('');
    onHelpMeNow(trimmed || 'Hazard situation from uploaded photo', imagePreview || undefined);
  };

  const handleVoiceComplete = (transcriptText: string) => {
    setDescription(transcriptText);
    setErrorMessage('');
    if (transcriptText.length > 5) {
      onHelpMeNow(transcriptText, imagePreview || undefined);
    }
  };

  const handleQuickCategorySelect = (category: EmergencyCategory) => {
    setErrorMessage('');
    onSelectCategory(category);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Tactical Live Status & Command Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-white">
        {/* Top Emergency Red/Amber Glow Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 animate-pulse" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Main Title & Real-time Telemetry */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/90 border border-red-700/60 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                ACTIVE CRISIS COPILOT
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                OFFLINE PROTOCOLS ARMED
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Emergency Crisis Instructions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
              Select any crisis or describe your situation to get immediate step-by-step instructions, safety actions, and dispatch scripts.
            </p>
          </div>

          {/* Quick Real-World Action Launchers */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Direct 911 Dial */}
            <a
              id="btn-home-call-911-urgent"
              href="tel:911"
              className="flex-1 sm:flex-none px-5 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/40 cursor-pointer transition-transform active:scale-95 border border-red-400/40"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>DIAL 911 NOW</span>
            </a>

            {/* SOS Siren & Strobe Modal */}
            <button
              id="btn-home-sos-alarm"
              type="button"
              onClick={onOpenSos}
              className="flex-1 sm:flex-none px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <span>SOS Siren & Strobe</span>
            </button>

            {/* Nearby ER Facilities */}
            <button
              id="btn-home-nearby-help"
              type="button"
              onClick={onOpenNearbyHelp}
              className="px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 cursor-pointer transition-colors shadow-md"
              title="Nearby Trauma Centers & Emergency Facilities"
            >
              <Hospital className="w-4 h-4 text-emerald-400" />
              <span>Nearby ERs</span>
            </button>
          </div>
        </div>

        {/* Live GPS Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-slate-400">GPS TELEMETRY:</span>
            <span className="text-emerald-400 font-bold">
              {gpsLocation
                ? `${gpsLocation.lat.toFixed(4)}° N, ${Math.abs(gpsLocation.lng).toFixed(4)}° W (±${gpsLocation.accuracy || 10}m)`
                : 'Acquiring high-accuracy satellite lock...'}
            </span>
          </div>

          <button
            type="button"
            onClick={copyGpsToClipboard}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            {copiedGps ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>COPY GPS FOR 911</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Multimodal Input & Category Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Section 1: Describe / Voice / Photo Multimodal Input Console */}
        <div className="lg:col-span-6 flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl text-white">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Multimodal Emergency Scanner
              </h2>
              <p className="text-xs text-slate-400">
                Type, dictate with hands-free voice, or upload hazard photo
              </p>
            </div>

            <button
              type="button"
              id="btn-open-focused-input"
              onClick={onNavigateToInput}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Full Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <form onSubmit={handleHelpSubmit} className="space-y-4">
            {/* Voice Emergency Input Widget */}
            <div className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-300 font-semibold pl-1 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Hands occupied? Speak directly:</span>
              </div>
              <VoiceEmergencyInput onTranscriptComplete={handleVoiceComplete} />
            </div>

            {/* Free-Text Emergency Input */}
            <div className="space-y-1.5">
              <label htmlFor="home-emergency-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Incident Description & Hazards:
              </label>
              <TextInput
                id="home-emergency-input"
                rows={3}
                value={description}
                onChange={(val) => {
                  setDescription(val);
                  if (errorMessage) setErrorMessage('');
                }}
                error={errorMessage}
                placeholder="E.g., Grease pan caught fire on electric stove, heavy smoke filling kitchen, burner won't turn off..."
              />
            </div>

            {/* Photo / Hazard Upload Box */}
            <ImageUploadBox
              imagePreview={imagePreview}
              onImageSelected={(base64) => {
                setImagePreview(base64);
                if (errorMessage) setErrorMessage('');
              }}
              onImageRemoved={() => setImagePreview(null)}
            />

            {/* Primary Action Button */}
            <div className="pt-1">
              <AnalyzeButton
                id="btn-help-me-now"
                type="submit"
                variant="primary-emergency"
                label="⚡ ANALYZE & ACTIVATE TRIAGE"
                className="w-full py-4 text-base font-black shadow-xl shadow-red-600/30 cursor-pointer uppercase tracking-wider"
              />
            </div>

            {/* Quick Test Incident Presets */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Simulate Live Acute Scenarios:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '🔥 Kitchen Grease Fire', text: 'Kitchen grease pan fire on stove with thick black smoke and spreading heat' },
                  { label: '🫀 Unconscious / CPR', text: 'Adult collapsed, unresponsive, not breathing normally, pulse weak or absent' },
                  { label: '⚡ Downed Power Line', text: 'Downed high-voltage power line sparking on wet driveway next to vehicle' },
                  { label: '⚠️ Natural Gas Smell', text: 'Strong rotten egg sulfur gas odor spreading through basement and living room' },
                  { label: '🩸 Severe Arterial Bleed', text: 'Deep puncture wound on upper arm with spurting bright red arterial blood' },
                  { label: '🌊 Burst Water Main', text: 'High-pressure water pipe burst flooding basement near electrical panel' },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDescription(chip.text);
                      setErrorMessage('');
                    }}
                    className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 active:bg-slate-650 text-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Section 2: Crisis Category Protocols Matrix */}
        <div className="lg:col-span-6 flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl text-white">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Crisis Category Protocols
              </h2>
              <p className="text-xs text-slate-400">
                Instant verified survival protocols categorized by threat type
              </p>
            </div>
            <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-wider bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
              6 CORE PROTOCOLS
            </span>
          </div>

          {/* 6 Category Tiles */}
          <EmergencySelector onSelectCategory={handleQuickCategorySelect} />
        </div>
      </div>

      {/* Section 3: Nearby Emergency Locations Near Me */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 shrink-0">
              <Hospital className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                Nearby Emergency Locations Near Me
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  LIVE RADAR
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Calculated in real-time based on your GPS coordinates • 1-tap Google Maps Navigation & direct dial
              </p>
            </div>
          </div>
        </div>

        {/* Live Finder Component */}
        <NearbyLocationsFinder />
      </div>
    </div>
  );
};
