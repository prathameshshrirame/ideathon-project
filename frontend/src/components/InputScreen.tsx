import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ArrowRight, ShieldCheck, Volume2 } from 'lucide-react';
import { EmergencyCategory } from '../types';
import { TextInput } from './TextInput';
import { VoiceEmergencyInput } from './VoiceEmergencyInput';
import { ImageUploadBox } from './ImageUploadBox';
import { validateEmergencyInput } from '../data/mockScenarios';

interface InputScreenProps {
  selectedCategory?: EmergencyCategory;
  initialValue?: string;
  onSelectCategory?: (cat: EmergencyCategory) => void;
  onAnalyze: (description: string, imageBase64?: string) => void;
  onBack: () => void;
}

const QUICK_EXAMPLES = [
  { label: '🔥 Kitchen Grease Fire', text: 'Cooking oil caught fire on the stove, thick smoke rising, need immediate containment advice' },
  { label: '⚡ Downed Power Line', text: 'A tree branch fell and knocked down a live buzzing power wire onto the wet driveway near my car' },
  { label: '🌊 Indoor Burst Pipe', text: 'Pressurized water is gushing from a ruptured copper pipe in the basement ceiling' },
  { label: '⚠️ Natural Gas Leak', text: 'Strong smell of sulfur and rotten eggs in the utility room with a hissing sound near the furnace' },
  { label: '🫀 Cardiac / CPR', text: 'Family member collapsed on the floor, unconscious and not breathing normally' },
  { label: '🏚️ Earthquake Tremors', text: 'Heavy shaking, items falling off walls and bookcases, windows rattling violently' },
  { label: '☣️ Chemical Spill', text: 'Household pool chlorine and cleaning solvent mixed together producing sharp toxic choking fumes' },
];

const CATEGORY_NAMES: Record<EmergencyCategory, { label: string; icon: string; badgeClass: string }> = {
  fire: { label: 'Fire & Smoke', icon: '🔥', badgeClass: 'bg-red-950/80 text-red-400 border-red-800' },
  electrical: { label: 'Electrical Hazard', icon: '⚡', badgeClass: 'bg-amber-950/80 text-amber-400 border-amber-800' },
  flood: { label: 'Flood & Water Breach', icon: '🌊', badgeClass: 'bg-blue-950/80 text-blue-400 border-blue-800' },
  gas: { label: 'Gas Leak & CO', icon: '⚠️', badgeClass: 'bg-purple-950/80 text-purple-400 border-purple-800' },
  medical: { label: 'Medical Emergency', icon: '🫀', badgeClass: 'bg-emerald-950/80 text-emerald-400 border-emerald-800' },
  earthquake: { label: 'Earthquake & Tremors', icon: '🏚️', badgeClass: 'bg-slate-800 text-slate-300 border-slate-700' },
  chemical: { label: 'Chemical / Toxic Vapor', icon: '☣️', badgeClass: 'bg-rose-950/80 text-rose-400 border-rose-800' },
  custom: { label: 'General Emergency', icon: '🚨', badgeClass: 'bg-slate-800 text-slate-300 border-slate-700' },
};

export const InputScreen: React.FC<InputScreenProps> = ({
  selectedCategory = 'custom',
  initialValue = '',
  onSelectCategory,
  onAnalyze,
  onBack,
}) => {
  const [text, setText] = useState(initialValue);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  const currentCategoryInfo = CATEGORY_NAMES[selectedCategory] || CATEGORY_NAMES.custom;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed && selectedCategory === 'custom' && !imagePreview) {
      setError('Please describe what is happening or upload a hazard photo.');
      return;
    }

    if (trimmed) {
      const validation = validateEmergencyInput(trimmed, selectedCategory);
      if (!validation.isValid && validation.errorMessage && !imagePreview) {
        setError(validation.errorMessage);
        return;
      }
    }

    setError('');
    const effectiveText = trimmed || `Emergency scenario: ${currentCategoryInfo.label}`;
    onAnalyze(effectiveText, imagePreview || undefined);
  };

  const handleSelectExample = (exampleText: string) => {
    setText(exampleText);
    setError('');
  };

  const handleVoiceComplete = (transcript: string) => {
    setText(transcript);
    setError('');
    if (transcript.length > 5) {
      onAnalyze(transcript, imagePreview || undefined);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 text-white">
      {/* Top Back Navigation Button */}
      <button
        id="btn-input-back"
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-800 shadow-md transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Main Cockpit</span>
      </button>

      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 animate-pulse" />

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${currentCategoryInfo.badgeClass}`}
            >
              <span>{currentCategoryInfo.icon}</span>
              <span>Selected: {currentCategoryInfo.label}</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              PRIORITY SCAN
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Incident Diagnosis & Situational Scan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Describe observable hazards, smoke coloration, sparking wires, unconscious individuals, or trapped occupants.
          </p>
        </div>

        {/* Crisis Type Selector Quick-Switch Buttons */}
        {onSelectCategory && (
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-400 block">
              Switch Crisis Category:
            </span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_NAMES) as EmergencyCategory[])
                .filter((cat) => cat !== 'custom')
                .map((cat) => {
                  const info = CATEGORY_NAMES[cat];
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat);
                        setError('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                      }`}
                    >
                      <span>{info.icon}</span>
                      <span>{info.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Voice Input Action */}
          <div className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-300 font-semibold pl-1 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Hands occupied? Speak directly:</span>
            </div>
            <VoiceEmergencyInput onTranscriptComplete={handleVoiceComplete} />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="emergency-detailed-input"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400"
            >
              Emergency Details & Hazard Observations:
            </label>

            <TextInput
              id="emergency-detailed-input"
              rows={3}
              value={text}
              onChange={(val) => {
                setText(val);
                if (error) setError('');
              }}
              error={error}
              placeholder="Example: Kitchen stove fire with black smoke spreading to cabinets, flame won't extinguish..."
              autoFocus
            />
          </div>

          {/* Image Upload Box */}
          <ImageUploadBox
            imagePreview={imagePreview}
            onImageSelected={(base64) => {
              setImagePreview(base64);
              if (error) setError('');
            }}
            onImageRemoved={() => setImagePreview(null)}
          />

          {/* Quick Scenario Examples tailored for different crises */}
          <div className="space-y-2.5 pt-3 border-t border-slate-800">
            <p className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Select scenario preset for immediate simulation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUICK_EXAMPLES.map((ex, idx) => (
                <button
                  key={idx}
                  id={`btn-example-${idx}`}
                  type="button"
                  onClick={() => handleSelectExample(ex.text)}
                  className="text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer flex flex-col gap-1 group"
                >
                  <span className="text-xs font-black text-white group-hover:text-red-400">
                    {ex.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    "{ex.text}"
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Situation Button */}
          <button
            id="btn-analyze-emergency"
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:from-red-700 text-white font-black text-base tracking-wider uppercase shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-400/40"
          >
            <span>⚡ ANALYZE & ACTIVATE TRIAGE PROTOCOL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
