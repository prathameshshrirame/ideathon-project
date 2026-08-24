import React, { useState } from 'react';
import { Globe, Volume2, VolumeX, AlertTriangle, Check } from 'lucide-react';
import { EmergencyResponse, EmergencyTranslation } from '../types';

interface Props {
  assessment: EmergencyResponse;
}

const DEFAULT_TRANSLATIONS: Record<string, EmergencyTranslation[]> = {
  default: [
    {
      lang: 'Spanish',
      langCode: 'es-ES',
      nativeName: 'Español',
      flag: '🇪🇸',
      headline: '¡EMERGENCIA! EVACÚEN DE INMEDIATO',
      primaryAction: 'Salgan del edificio ahora mismo y no usen los ascensores.',
      warning: 'Peligro inminente: manténganse agachados y sigan las señales de salida.',
    },
    {
      lang: 'Mandarin',
      langCode: 'zh-CN',
      nativeName: '中文 (Mandarin)',
      flag: '🇨🇳',
      headline: '紧急警报！立即撤离',
      primaryAction: '请立即离开建筑物，切勿乘坐电梯。',
      warning: '严重危险：请低姿前行并前往最近的安全出口。',
    },
    {
      lang: 'French',
      langCode: 'fr-FR',
      nativeName: 'Français',
      flag: '🇫🇷',
      headline: 'URGENCE ! ÉVACUEZ IMMÉDIATEMENT',
      primaryAction: 'Quittez le bâtiment immédiatement et n\'utilisez pas les ascenseurs.',
      warning: 'Danger grave : restez près du sol et dirigez-vous vers la sortie.',
    },
    {
      lang: 'Hindi',
      langCode: 'hi-IN',
      nativeName: 'हिन्दी (Hindi)',
      flag: '🇮🇳',
      headline: 'आपातकालीन चेतावनी! तुरंत बाहर निकलें',
      primaryAction: 'कृपया तुरंत इमारत से बाहर निकलें और लिफ्ट का उपयोग न करें।',
      warning: 'खतरा: नीचे झुककर चलें और निकटतम सुरक्षित निकास की ओर बढ़ें।',
    },
    {
      lang: 'Arabic',
      langCode: 'ar-SA',
      nativeName: 'العربية (Arabic)',
      flag: '🇸🇦',
      headline: 'تنبيه طوارئ! إخلاء فوري',
      primaryAction: 'غادروا المبنى فوراً ولا تستخدموا المصاعد.',
      warning: 'خطر وشيك: ابقوا منخفضين وتوجهوا نحو مخرج الطوارئ.',
    },
    {
      lang: 'Tagalog',
      langCode: 'fil-PH',
      nativeName: 'Tagalog',
      flag: '🇵🇭',
      headline: 'EMERHENSIYA! LUMIKAS KAAGAD',
      primaryAction: 'Lumabas agad ng gusali at huwag gamitin ang elevator.',
      warning: 'Panganib: Gumapang nang mababa at pumunta sa pinakamalapit na labasan.',
    },
  ],
};

export const MultilingualCrisisAlert: React.FC<Props> = ({ assessment }) => {
  const translations = assessment.translations || DEFAULT_TRANSLATIONS.default;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeTranslation = translations[selectedIdx] || translations[0];

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${activeTranslation.headline}. ${activeTranslation.primaryAction}. ${activeTranslation.warning}`);
    u.lang = activeTranslation.langCode;
    u.rate = 0.95;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-600/30">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Multilingual Emergency Alert Placard & Audio
              </h3>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-500/30">
                6 Global Languages
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Broadcast critical evacuation commands to non-English speaking occupants or neighbors.
            </p>
          </div>
        </div>

        {'speechSynthesis' in window && (
          <button
            type="button"
            onClick={handleSpeak}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Stop Voice' : `Play in ${activeTranslation.lang}`}</span>
          </button>
        )}
      </div>

      {/* Language Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {translations.map((t, idx) => (
          <button
            key={t.lang}
            type="button"
            onClick={() => {
              if (isPlaying) window.speechSynthesis.cancel();
              setIsPlaying(false);
              setSelectedIdx(idx);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedIdx === idx
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <span>{t.flag}</span>
            <span>{t.nativeName}</span>
          </button>
        ))}
      </div>

      {/* Large Translated Placard */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-2 text-center sm:text-left">
        <h4 className="text-lg sm:text-xl font-black text-amber-400 tracking-tight">
          {activeTranslation.headline}
        </h4>
        <p className="text-sm font-semibold text-white leading-relaxed">
          {activeTranslation.primaryAction}
        </p>
        <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800">
          ⚠️ {activeTranslation.warning}
        </p>
      </div>
    </div>
  );
};
