
import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { connectLiveAssistant, createPcmBlob, decode, decodeAudioData } from '../services/geminiService';
import { Language } from '../types';

interface VoiceAssistantOverlayProps {
  language: Language;
  onClose: () => void;
}

const VoiceAssistantOverlay: React.FC<VoiceAssistantOverlayProps> = ({ language, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<any>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    startSession();
    return () => stopSession();
  }, []);

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      inputAudioCtxRef.current = new AudioContext({ sampleRate: 16000 });
      outputAudioCtxRef.current = new AudioContext({ sampleRate: 24000 });

      const sessionPromise = connectLiveAssistant(language, {
        onopen: () => {
          setIsActive(true);
          const source = inputAudioCtxRef.current!.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioCtxRef.current!.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBlob = createPcmBlob(inputData);
            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioCtxRef.current!.destination);
        },
        onmessage: async (message: any) => {
          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && outputAudioCtxRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioCtxRef.current.currentTime);
            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioCtxRef.current, 24000, 1);
            const source = outputAudioCtxRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioCtxRef.current.destination);
            source.addEventListener('ended', () => sourcesRef.current.delete(source));
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }
          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onerror: (e: any) => {
          console.error("Live Error", e);
          setError("Connection lost. Please try again.");
        },
        onclose: () => setIsActive(false),
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setError("Microphone access required.");
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    inputAudioCtxRef.current?.close();
    outputAudioCtxRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/95 backdrop-blur-sm p-6 text-white text-center">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full">
        <X size={24} />
      </button>

      <div className="flex flex-col items-center max-w-xs w-full">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 relative ${isActive ? 'animate-pulse-custom' : ''}`}>
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-125"></div>
          <div className="relative z-10 bg-white text-green-700 p-8 rounded-full shadow-2xl">
            {isActive ? <Mic size={48} /> : <MicOff size={48} />}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">
          {language === 'kn' ? 'ಮಾತನಾಡಿ...' : 'Listening...'}
        </h2>
        <p className="text-sm opacity-80 mb-8 leading-relaxed">
          {language === 'kn' 
            ? 'ರೇಷ್ಮೆ ಸಾಕಾಣಿಕೆ ಬಗ್ಗೆ ನಿಮಗೆ ಬೇಕಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ. ತಜ್ಞರು ಉತ್ತರಿಸುತ್ತಾರೆ.' 
            : 'Ask anything about silkworm rearing. Our expert is ready to help.'}
        </p>

        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-xs mb-4">{error}</div>}

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-300">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
          Live Assistant Active
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantOverlay;
