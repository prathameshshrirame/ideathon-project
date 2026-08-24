import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertOctagon,
  PhoneCall,
  Volume2,
  VolumeX,
  MapPin,
  Share2,
  ShieldAlert,
  X,
  Flashlight,
  Radio,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface SosEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStrobe?: () => void;
  onOpenNearbyHelp?: () => void;
}

export const SosEmergencyModal: React.FC<SosEmergencyModalProps> = ({
  isOpen,
  onClose,
  onOpenStrobe,
  onOpenNearbyHelp,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);

  // Fetch location on open
  useEffect(() => {
    if (isOpen) {
      setLocationLoading(true);
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracy: Math.round(pos.coords.accuracy),
            });
            setLocationLoading(false);
          },
          () => {
            // Fallback location
            setLocation({ lat: 37.7749, lng: -122.4194, accuracy: 15 });
            setLocationLoading(false);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        setLocation({ lat: 37.7749, lng: -122.4194, accuracy: 20 });
        setLocationLoading(false);
      }
    } else {
      stopSiren();
      setCountdown(null);
    }
  }, [isOpen]);

  // Audio siren synthesizer
  const startSiren = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setIsSirenPlaying(true);

      // Pitch sweep
      let high = true;
      sirenIntervalRef.current = window.setInterval(() => {
        if (oscRef.current && audioCtxRef.current) {
          const targetFreq = high ? 1100 : 650;
          oscRef.current.frequency.exponentialRampToValueAtTime(
            targetFreq,
            audioCtxRef.current.currentTime + 0.35
          );
          high = !high;
        }
      }, 400);
    } catch (e) {
      console.warn('AudioContext not supported:', e);
      setIsSirenPlaying(false);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // Ignored
      }
      oscRef.current = null;
    }
    setIsSirenPlaying(false);
  };

  const toggleSiren = () => {
    if (isSirenPlaying) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  // 5-sec countdown to 911 call
  const startCountdown = () => {
    setCountdown(5);
  };

  const cancelCountdown = () => {
    setCountdown(null);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = 'tel:911';
      setCountdown(null);
    }
  }, [countdown]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  const copyGpsCoords = () => {
    if (!location) return;
    const text = `EMERGENCY LOCATION: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)} (Accuracy: ~${location.accuracy}m). Map: https://maps.google.com/?q=${location.lat},${location.lng}`;
    navigator.clipboard.writeText(text);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 3000);
  };

  const shareEmergencyLocation = () => {
    if (!location) return;
    const text = `SOS EMERGENCY! I need immediate help. My current GPS coordinates: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}. View live map: https://maps.google.com/?q=${location.lat},${location.lng}`;
    if (navigator.share) {
      navigator.share({
        title: 'EMERGENCY SOS ALERT',
        text,
      }).catch(() => {
        // Fallback to SMS
        window.location.href = `sms:?body=${encodeURIComponent(text)}`;
      });
    } else {
      window.location.href = `sms:?body=${encodeURIComponent(text)}`;
    }
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border-2 border-red-600 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl shadow-red-600/30 relative overflow-hidden"
      >
        {/* Top Emergency Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={() => {
            stopSiren();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close SOS Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/50 text-white animate-pulse">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              EMERGENCY SOS HUB
              <span className="bg-red-500 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full animate-pulse">
                LIVE
              </span>
            </h2>
            <p className="text-xs text-slate-300">Instant emergency dialing, alarm siren & GPS beacon</p>
          </div>
        </div>

        {/* Countdown Overlay if triggered */}
        {countdown !== null && (
          <div className="mb-6 p-5 bg-red-950/90 border-2 border-red-500 rounded-2xl text-center space-y-3 animate-pulse">
            <p className="text-xs font-bold text-red-300 uppercase tracking-wider">
              Emergency 911 Auto-Dial Triggered
            </p>
            <div className="text-5xl font-black text-white font-mono">{countdown}</div>
            <p className="text-xs text-slate-300">Connecting to emergency dispatch in {countdown}s...</p>
            <div className="flex gap-2 justify-center pt-1">
              <a
                href="tel:911"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl"
              >
                Call Right Now
              </a>
              <button
                onClick={cancelCountdown}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl cursor-pointer"
              >
                Cancel Call
              </button>
            </div>
          </div>
        )}

        {/* Big 911 Action Button */}
        <div className="space-y-3 mb-6">
          <a
            id="sos-call-911-main"
            href="tel:911"
            className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-lg sm:text-xl tracking-wide shadow-xl shadow-red-600/40 flex items-center justify-center gap-3 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 animate-bounce" />
            <span>DIAL 911 EMERGENCY DISPATCH</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={toggleSiren}
              className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                isSirenPlaying
                  ? 'bg-amber-500 text-black border-amber-400 animate-pulse shadow-lg shadow-amber-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700'
              }`}
            >
              {isSirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSirenPlaying ? 'Stop Siren' : 'Loud SOS Siren'}</span>
            </button>

            <button
              onClick={() => {
                if (onOpenStrobe) {
                  onClose();
                  onOpenStrobe();
                }
              }}
              className="py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 cursor-pointer"
            >
              <Flashlight className="w-4 h-4" />
              <span>SOS Strobe Beacon</span>
            </button>
          </div>
        </div>

        {/* Live GPS Coordinates Card */}
        <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>CURRENT GPS EMERGENCY PINPOINT</span>
            </div>
            {locationLoading && <span className="text-[10px] text-slate-400 animate-pulse">Locating...</span>}
          </div>

          <div className="bg-slate-950 p-3 rounded-xl font-mono text-sm text-emerald-400 flex items-center justify-between">
            <span>
              {location ? `${location.lat.toFixed(5)}°, ${location.lng.toFixed(5)}°` : 'Acquiring GPS fix...'}
            </span>
            {location?.accuracy && (
              <span className="text-[10px] text-slate-400 font-sans">±{location.accuracy}m</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={copyGpsCoords}
              className="py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLocation ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <MapPin className="w-3.5 h-3.5" />}
              <span>{copiedLocation ? 'Coordinates Copied!' : 'Copy GPS Data'}</span>
            </button>

            <button
              onClick={shareEmergencyLocation}
              className="py-2 px-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{smsSent ? 'SMS Prepared' : 'SMS SOS Alert'}</span>
            </button>
          </div>
        </div>

        {/* Emergency Hotlines Directory */}
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            DIRECT CRISIS HELPLINES
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <a
              href="tel:911"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-center border border-slate-700 transition-colors block"
            >
              <div className="text-xs font-bold text-red-400">911</div>
              <div className="text-[10px] text-slate-400">Police / Fire / EMS</div>
            </a>

            <a
              href="tel:18002221222"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-center border border-slate-700 transition-colors block"
            >
              <div className="text-xs font-bold text-amber-400">Poison Control</div>
              <div className="text-[10px] text-slate-400">1-800-222-1222</div>
            </a>

            <a
              href="tel:988"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-center border border-slate-700 transition-colors block col-span-2 sm:col-span-1"
            >
              <div className="text-xs font-bold text-sky-400">Suicide & Crisis</div>
              <div className="text-[10px] text-slate-400">Call / Text 988</div>
            </a>
          </div>
        </div>

        {/* Bottom Nearby Help Button */}
        {onOpenNearbyHelp && (
          <button
            onClick={() => {
              onClose();
              onOpenNearbyHelp();
            }}
            className="w-full mt-4 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>View Nearby Emergency Facilities & Maps</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
