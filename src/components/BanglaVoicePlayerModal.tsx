import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  Radio, 
  Gauge, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PROMO_VOICE_SLIDES, BanglaVoiceController, VoiceSlide } from '../utils/banglaVoice';

interface BanglaVoicePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnrollment: () => void;
}

export const BanglaVoicePlayerModal: React.FC<BanglaVoicePlayerModalProps> = ({
  isOpen,
  onClose,
  onOpenEnrollment
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female');
  const [voiceEngine, setVoiceEngine] = useState<'ai' | 'browser'>('ai');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const controllerRef = useRef<BanglaVoiceController | null>(null);
  const timerRef = useRef<any>(null);
  const audioObjRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    controllerRef.current = new BanglaVoiceController();
    return () => {
      stopPlayback();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopPlayback();
    }
  }, [isOpen]);

  const totalDurationSec = 38;

  const stopPlayback = () => {
    if (controllerRef.current) {
      controllerRef.current.stop();
    }
    if (audioObjRef.current) {
      audioObjRef.current.pause();
      audioObjRef.current.currentTime = 0;
      audioObjRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const playSlide = async (slideIndex: number) => {
    if (slideIndex >= PROMO_VOICE_SLIDES.length) {
      stopPlayback();
      setCurrentSlideIndex(0);
      setProgress(100);
      return;
    }

    const slide = PROMO_VOICE_SLIDES[slideIndex];
    setCurrentSlideIndex(slideIndex);

    // Try AI voice first if requested
    if (voiceEngine === 'ai') {
      setIsLoadingAudio(true);
      const voiceName = voiceGender === 'female' ? 'Kore' : 'Puck';
      const audioUrl = await controllerRef.current?.fetchServerTTS(slide.textBn, voiceName);
      setIsLoadingAudio(false);

      if (audioUrl) {
        if (audioObjRef.current) {
          audioObjRef.current.pause();
        }
        const audio = new Audio(audioUrl);
        audio.playbackRate = playbackSpeed;
        audio.muted = isMuted;
        audioObjRef.current = audio;

        audio.onended = () => {
          if (slideIndex + 1 < PROMO_VOICE_SLIDES.length) {
            playSlide(slideIndex + 1);
          } else {
            stopPlayback();
          }
        };

        audio.onerror = () => {
          // Fallback to browser voice if server fails
          fallbackBrowserVoice(slide, slideIndex);
        };

        try {
          await audio.play();
          return;
        } catch {
          // Autoplay policy or error, fallback to browser voice
          fallbackBrowserVoice(slide, slideIndex);
          return;
        }
      } else {
        // Fallback
        fallbackBrowserVoice(slide, slideIndex);
        return;
      }
    }

    fallbackBrowserVoice(slide, slideIndex);
  };

  const fallbackBrowserVoice = (slide: VoiceSlide, slideIndex: number) => {
    const pitch = voiceGender === 'female' ? 1.15 : 0.85;
    controllerRef.current?.playNativeBengali(slide.textBn, playbackSpeed, pitch, () => {
      if (slideIndex + 1 < PROMO_VOICE_SLIDES.length) {
        playSlide(slideIndex + 1);
      } else {
        stopPlayback();
      }
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      setIsPlaying(true);
      playSlide(currentSlideIndex);

      // Scrubber progress tracker
      const intervalMs = 200;
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          const next = prev + (intervalMs / (totalDurationSec * 1000)) * 100 * playbackSpeed;
          return next >= 100 ? 100 : next;
        });
      }, intervalMs);
    }
  };

  const handleRestart = () => {
    stopPlayback();
    setProgress(0);
    setCurrentSlideIndex(0);
    setIsPlaying(true);
    playSlide(0);
  };

  const handleSelectSlide = (idx: number) => {
    stopPlayback();
    setCurrentSlideIndex(idx);
    setProgress((idx / PROMO_VOICE_SLIDES.length) * 100);
    setIsPlaying(true);
    playSlide(idx);
  };

  if (!isOpen) return null;

  const currentSlide = PROMO_VOICE_SLIDES[currentSlideIndex] || PROMO_VOICE_SLIDES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white my-6">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-xs font-mono font-medium text-emerald-400 tracking-wider">
                SKILL HOUSE AUDIO PROMO
              </div>
              <h3 className="text-base font-bold font-serif">
                বাংলা ভয়েস ওভারভিউ ও প্রমো ধারাভাষ্য
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              stopPlayback();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Styled Visual Screen */}
        <div className="p-6 space-y-6">
          
          {/* Main Visual Presentation Card */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col justify-between p-6 sm:p-8">
            
            {/* Background ambient lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-950/80 to-slate-950 pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
                দৃশ্য ০{currentSlide.id} / ০{PROMO_VOICE_SLIDES.length}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-red-400 animate-pulse' : 'text-slate-500'}`} />
                <span>{isPlaying ? 'ভয়েস প্লে হচ্ছে...' : 'প্লে করতে বাটনে চাপুন'}</span>
              </div>
            </div>

            {/* Main Center Headline & Synchronized Subtitle */}
            <div className="relative z-10 my-auto text-center space-y-3">
              <div className="text-xs text-emerald-400 font-mono tracking-wider uppercase">
                {currentSlide.subBn}
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white leading-snug max-w-xl mx-auto text-balance">
                {currentSlide.textBn}
              </h4>
            </div>

            {/* Animated Audio Spectrum Waveform */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 h-8">
              {[40, 75, 20, 90, 60, 100, 45, 80, 30, 95, 70, 50, 85, 35, 65, 90, 55, 75].map((height, i) => (
                <span
                  key={i}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * Math.random()) + 10)}%` : '20%',
                    transition: 'height 150ms ease'
                  }}
                  className={`w-1 rounded-full ${
                    isPlaying ? 'bg-emerald-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Audio Controls Bar */}
          <div className="space-y-4">
            
            {/* Scrubber Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden cursor-pointer">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>{Math.floor((progress / 100) * totalDurationSec)}s</span>
                <span>{totalDurationSec}s</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              
              {/* Voice Options (Gender & Engine) */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      setVoiceGender('female');
                      if (isPlaying) {
                        stopPlayback();
                      }
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      voiceGender === 'female' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    নারী কণ্ঠ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVoiceGender('male');
                      if (isPlaying) {
                        stopPlayback();
                      }
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      voiceGender === 'male' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    পুরুষ কণ্ঠ
                  </button>
                </div>

                {/* Speed selector */}
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed(s => s === 1.0 ? 1.2 : s === 1.2 ? 0.9 : 1.0)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-medium text-slate-300 border border-slate-700"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>
              </div>

              {/* Center Play / Pause Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                  title="আবার শুরু থেকে শুনুন"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  disabled={isLoadingAudio}
                  className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                >
                  {isLoadingAudio ? (
                    <span className="text-xs">ভয়েস লোড হচ্ছে...</span>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-slate-950" />
                      <span className="text-xs">পজ করুন</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span className="text-xs">বাংলা ভয়েস শুনুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mute button */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

            </div>

            {/* Quick Scene Jumper Grid */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                ভিডিওর দৃশ্যসমূহ (যেকোনোটিতে ক্লিক করে সরাসরি শুনুন):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PROMO_VOICE_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelectSlide(idx)}
                    className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                      currentSlideIndex === idx
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-medium shadow-xs'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-emerald-400">দৃশ্য ০{slide.id}</div>
                    <div className="line-clamp-1 mt-0.5">{slide.highlightWords?.join(' · ') || slide.textBn}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Callout */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              ভয়েস শোনা শেষে এখনই ভর্তি প্রক্রিয়া শুরু করতে চান?
            </div>
            <button
              type="button"
              onClick={() => {
                stopPlayback();
                onClose();
                onOpenEnrollment();
              }}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <span>অনলাইন ভর্তি ফরম</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
