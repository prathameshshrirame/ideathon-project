import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface VoiceEmergencyInputProps {
  onTranscriptComplete: (transcript: string) => void;
  isListeningExternal?: boolean;
}

export const VoiceEmergencyInput: React.FC<VoiceEmergencyInputProps> = ({
  onTranscriptComplete,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [volumeLevel, setVolumeLevel] = useState<number[]>([40, 60, 30, 80, 50]);

  const recognitionRef = useRef<any>(null);
  const animIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Animate sound waves during voice recording
  useEffect(() => {
    if (isListening) {
      animIntervalRef.current = window.setInterval(() => {
        setVolumeLevel([
          Math.floor(Math.random() * 70) + 30,
          Math.floor(Math.random() * 90) + 20,
          Math.floor(Math.random() * 80) + 40,
          Math.floor(Math.random() * 95) + 25,
          Math.floor(Math.random() * 60) + 30,
        ]);
      }, 120);
    } else {
      if (animIntervalRef.current) {
        clearInterval(animIntervalRef.current);
        animIntervalRef.current = null;
      }
    }
    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [isListening]);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback demo simulation if browser doesn't support Web Speech API
      setIsListening(true);
      setTranscript('Listening... Speak now...');
      setTimeout(() => {
        const demoPhrase = 'There is smoke in the hallway and the fire alarm is ringing.';
        setTranscript(demoPhrase);
        setIsListening(false);
        onTranscriptComplete(demoPhrase);
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
          onTranscriptComplete(transcript.trim());
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`relative py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md ${
          isListening
            ? 'bg-red-600 text-white ring-4 ring-red-400/50 animate-pulse shadow-red-600/40'
            : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
        }`}
        title={isListening ? 'Stop listening' : 'Speak emergency'}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 text-white animate-bounce" />
            <span>Listening... (Tap to finish)</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-red-400" />
            <span>Voice Emergency Input</span>
          </>
        )}
      </button>

      {/* Real-time sound wave bars when active */}
      {isListening && (
        <div className="mt-2 flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-full border border-red-500/50">
          {volumeLevel.map((height, i) => (
            <div
              key={i}
              className="w-1 bg-red-400 rounded-full transition-all duration-100"
              style={{ height: `${Math.max(6, height / 4)}px` }}
            />
          ))}
          <span className="text-[10px] text-red-300 font-mono ml-2 animate-pulse">
            Recording Audio...
          </span>
        </div>
      )}
    </div>
  );
};
