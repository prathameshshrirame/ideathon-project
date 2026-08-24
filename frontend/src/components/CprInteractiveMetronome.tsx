import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle, Heart } from 'lucide-react';

interface MetronomeProps {
  initialBpm?: number;
  emergencyType?: string;
}

export const CprInteractiveMetronome: React.FC<MetronomeProps> = ({ initialBpm = 110, emergencyType }) => {
  const [bpm, setBpm] = useState(initialBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [compressionsCount, setCompressionsCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cycleCount, setCycleCount] = useState(1);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize Web Audio API safely on user gesture
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch crisp beat
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio not supported in environment
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = (60 / bpm) * 1000;
    timerRef.current = window.setInterval(() => {
      setPulseAnimation((p) => !p);
      setCompressionsCount((prev) => {
        const next = prev + 1;
        if (next > 0 && next % 30 === 0) {
          setCycleCount((c) => c + 1);
        }
        return next;
      });
      playBeep();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, soundEnabled]);

  const handleReset = () => {
    setIsPlaying(false);
    setCompressionsCount(0);
    setCycleCount(1);
  };

  return (
    <div className="bg-rose-950/90 text-rose-50 rounded-2xl p-5 sm:p-6 border border-rose-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/40 text-white">
            <Heart className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-white">
                Hands-Only CPR Audio Guide & Compression Pacer
              </h3>
              <span className="bg-rose-500/30 text-rose-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-rose-500/40">
                100–120 BPM Gold Standard
              </span>
            </div>
            <p className="text-xs text-rose-300 font-medium">
              Maintain rhythm to the beat of "Stayin' Alive" (2 inches depth in center of chest).
            </p>
          </div>
        </div>

        {/* Sound toggle */}
        <button
          type="button"
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="text-xs font-bold bg-rose-900/60 hover:bg-rose-900 text-rose-200 p-2 rounded-lg border border-rose-800 transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute Audio Beep' : 'Unmute Audio Beep'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
        </button>
      </div>

      {/* Main Counter & Visual Metronome Pulse */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-rose-900/40 p-4 rounded-xl border border-rose-800/80 items-center">
        {/* Visual Pulse Indicator */}
        <div className="flex flex-col items-center justify-center p-3 bg-rose-950/60 rounded-xl border border-rose-800/60">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-75 shadow-lg ${
              pulseAnimation
                ? 'scale-110 bg-rose-500 shadow-rose-500/50 ring-4 ring-rose-300'
                : 'scale-95 bg-rose-700 shadow-rose-900/40'
            }`}
          >
            <span className="font-black text-xs text-white uppercase tracking-widest">
              PUSH
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 mt-2">
            Visual Depth Guide
          </span>
        </div>

        {/* Live Stat Trackers */}
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
            Total Compressions
          </span>
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {compressionsCount}
          </div>
          <p className="text-[11px] text-rose-300 font-semibold">
            Cycle #{cycleCount} (Every 30 pumps = check airway/breaths)
          </p>
        </div>

        {/* BPM Selector */}
        <div className="space-y-1.5 flex flex-col justify-center">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
            Compression Cadence:
          </span>
          <div className="flex items-center gap-2">
            {[100, 110, 120].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setBpm(rate)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  bpm === rate
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-rose-900/50 hover:bg-rose-800 text-rose-300 border border-rose-800'
                }`}
              >
                {rate} BPM
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Control Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className={`flex-1 py-3.5 px-5 rounded-xl font-black text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>PAUSE PACER</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>START CPR PACER (AUDIO + VISUAL)</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-3.5 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-rose-200 border border-rose-800 transition-colors cursor-pointer"
          title="Reset Compressions Count"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
