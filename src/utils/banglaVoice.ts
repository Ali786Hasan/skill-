// Bengali Voice Utility for Skill House Academy Promo Narration

export interface VoiceSlide {
  id: number;
  timeSec: number;
  textBn: string;
  subBn: string;
  imageKey?: string;
  highlightWords?: string[];
}

export const PROMO_VOICE_SLIDES: VoiceSlide[] = [
  {
    id: 1,
    timeSec: 0,
    textBn: 'স্কিল হাউজ — ডিজিটাল মার্কেটিং ট্রেনিং একাডেমি। আপনার দক্ষতাই হতে পারে আপনার আয়ের নতুন পথ!',
    subBn: 'Skill House · Digital Marketing Training Academy',
    highlightWords: ['স্কিল হাউজ', 'ডিজিটাল মার্কেটিং', 'আয়ের নতুন পথ']
  },
  {
    id: 2,
    timeSec: 5,
    textBn: 'আপনি কি Google Ads, Google My Business, Local SEO এবং CRM শিখে নিজের ক্যারিয়ার গড়তে চান?',
    subBn: 'Learn Google Ads, GMB, Local SEO & CRM',
    highlightWords: ['Google Ads', 'Local SEO', 'CRM', 'ক্যারিয়ার']
  },
  {
    id: 3,
    timeSec: 11,
    textBn: 'ফ্রিল্যান্সিং, রিমোট জব অথবা নিজের ব্যবসার ডিজিটাল মার্কেটিং পরিচালনা করতে চান?',
    subBn: 'Freelancing · Remote Jobs · Business Growth',
    highlightWords: ['ফ্রিল্যান্সিং', 'রিমোট জব', 'ডিজিটাল মার্কেটিং']
  },
  {
    id: 4,
    timeSec: 16,
    textBn: 'আমাদের প্রফেশনাল প্রশিক্ষণ প্রোগ্রামে থাকছে হাতে-কলমে প্রশিক্ষণ, বাস্তব ক্লায়েন্ট প্রজেক্ট এবং প্রয়োজনীয় টুলস ব্যবহারের শিক্ষা।',
    subBn: 'Hands-on Practical Training & Live Client Accounts',
    highlightWords: ['হাতে-কলমে', 'বাস্তব ক্লায়েন্ট প্রজেক্ট', 'টুলস']
  },
  {
    id: 5,
    timeSec: 23,
    textBn: 'ভর্তির ৪টি সহজ ধাপ: ১. কোর্স নির্বাচন করুন, ২. অনলাইন ভর্তি ফরম পূরণ করুন, ৩. বিকাশের মাধ্যমে পেমেন্ট করুন, ৪. ভর্তি নিশ্চিত করুন।',
    subBn: '1. Select Course · 2. Online Form · 3. bKash · 4. Confirm',
    highlightWords: ['কোর্স নির্বাচন', 'অনলাইন ভর্তি ফরম', 'বিকাশের মাধ্যমে পেমেন্ট', 'ভর্তি নিশ্চিত']
  },
  {
    id: 6,
    timeSec: 32,
    textBn: 'ডিজিটাল মার্কেটিংয়ে আপনার ক্যারিয়ারের প্রথম পদক্ষেপ নিন আজই। এখনই স্কিল হাউজে ভর্তি হোন!',
    subBn: 'Take your next career step today. Enroll at Skill House.',
    highlightWords: ['প্রথম পদক্ষেপ', 'স্কিল হাউজে ভর্তি হোন']
  }
];

export const FULL_PROMO_TEXT = PROMO_VOICE_SLIDES.map(s => s.textBn).join(' ');

// Speech synthesis controller with Bengali voice selection
export class BanglaVoiceController {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private onSlideChangeCallback?: (slideIndex: number) => void;
  private onEndCallback?: () => void;
  private intervalTimer: any = null;

  constructor() {
    // preload voices if supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  // Play using Web Speech API with fallback
  public playNativeBengali(
    text: string, 
    rate: number = 0.95, 
    pitch: number = 1.0, 
    onEnd?: () => void
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    // Look for Bengali voices (e.g., bn-BD, bn-IN, Bangla)
    const banglaVoice = voices.find(v => 
      v.lang.toLowerCase().includes('bn') || 
      v.name.toLowerCase().includes('bengali') ||
      v.name.toLowerCase().includes('bangla')
    );

    if (banglaVoice) {
      utterance.voice = banglaVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
      if (this.onEndCallback) this.onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  // Request audio from server Gemini TTS
  public async fetchServerTTS(text: string, voice: string = 'Kore'): Promise<string | null> {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice })
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.audio) {
        return `data:audio/wav;base64,${data.audio}`;
      }
      return null;
    } catch {
      return null;
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
      this.audioEl = null;
    }
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  }
}
