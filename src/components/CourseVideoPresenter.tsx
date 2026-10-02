import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Radio,
  Subtitles,
  GraduationCap
} from 'lucide-react';
import { COURSES } from '../data/courses';
import { Course, CourseDuration } from '../types';
import { BanglaVoiceController } from '../utils/banglaVoice';

interface CourseVideoPresenterProps {
  onOpenEnrollment: (courseId?: string, duration?: CourseDuration) => void;
  onSelectCourseDetails: (course: Course) => void;
  lang: 'bn' | 'en';
}

interface VideoPresentationTrack {
  courseId: string;
  courseTitleBn: string;
  badgeBn: string;
  durationSec: number;
  scenes: {
    timeSec: number;
    titleBn: string;
    descriptionBn: string;
    speechTextBn: string;
    visualImage: string;
    screenCaptionBn: string;
    toolsList: string[];
  }[];
}

const VIDEO_TRACKS: VideoPresentationTrack[] = [
  {
    courseId: 'google-ads',
    courseTitleBn: 'Google Ads প্রফেশনাল ট্রেনিং',
    badgeBn: 'গুগল সার্টিফায়েড কোর্স',
    durationSec: 42,
    scenes: [
      {
        timeSec: 0,
        titleBn: 'কোর্স পরিচিতি ও সুযোগসমূহ',
        descriptionBn: 'আমি সাদিয়া রহমান, স্কিল হাউস একাডেমির লিড ট্রেনার। Google Ads শিখে কীভাবে আন্তর্জাতিক ও স্থানীয় বিজনেসের অ্যাডস সফলভাবে পরিচালনা করবেন, তা হাতে-কলমে এই কোর্সে শেখানো হয়।',
        speechTextBn: 'হ্যালো! আমি সাদিয়া রহমান, স্কিল হাউস একাডেমির লিড ট্রেনার। আমাদের Google Ads প্রফেশনাল ট্রেনিংয়ে আপনাকে স্বাগতম। এই কোর্সে একদম শূন্য থেকে শুরু করে গুগল সার্চ ক্যাম্পেইন, ডিসপ্লে নেটওয়ার্ক, পারফরম্যান্স ম্যাক্স ও ইউটিউব বিজ্ঞাপন তৈরি এবং অপ্টিমাইজেশন শেখানো হয়।',
        visualImage: '/src/assets/images/bangladeshi_female_instructor_presentation_1790951086671.jpg',
        screenCaptionBn: 'সাদিয়া রহমান — লিড ট্রেনার, স্কিল হাউস একাডেমি',
        toolsList: ['Google Ads', 'GA4', 'GTM', 'Looker Studio']
      },
      {
        timeSec: 14,
        titleBn: 'বাস্তব ক্যাম্পেইন ও কনভার্সন ট্র্যাকিং',
        descriptionBn: 'Google Tag Manager ও Google Analytics 4 ব্যবহার করে ওয়েবসাইটের প্রতিটি সেলস ও লিড ট্র্যাক করার আন্তর্জাতিক স্ট্যান্ডার্ড পদ্ধতি।',
        speechTextBn: 'আমরা শুধু থিওরি শেখাই না, ক্লাসেই সরাসরি Google Ads ম্যানেজার ও Google Tag Manager-এর মাধ্যমে লাইভ ক্যাম্পেইন রান ও রূপান্তর ট্র্যাকিং প্র্যাকটিস করানো হয়।',
        visualImage: '/src/assets/images/instructor_explaining_digital_courses_1790951106227.jpg',
        screenCaptionBn: 'লাইভ সার্চ অ্যাডস ও GA4 কনভার্সন ট্র্যাকিং ড্যাশবোর্ড',
        toolsList: ['Conversion Tracking', 'Server-Side GTM', 'ROAS Optimization']
      },
      {
        timeSec: 28,
        titleBn: 'ক্যারিয়ার, ফ্রিল্যান্সিং ও ফি প্যাকেজ',
        descriptionBn: '১ মাস (৳৫,০০০), ২ মাস (৳৮,০০০) এবং ৩ মাস (৳১২,০০০) মেয়াদী প্যাকেজ। আপওয়ার্ক, ফাইভার এবং রিমোট জব ইন্টারভিউয়ের পূর্ণাঙ্গ গাইডলাইন।',
        speechTextBn: 'কোর্স চলাকালীন লাইভ ক্লায়েন্ট প্রজেক্টের অভিজ্ঞতা আপনার আপওয়ার্ক ও রিমোট জবের ইন্টারভিউতে নিশ্চিত করবে বিশাল সুবিধা। ১ মাস, ২ মাস বা ৩ মাসের প্যাকেজে আজই যুক্ত হোন।',
        visualImage: '/src/assets/images/course_google_ads_analytics_1790946047596.jpg',
        screenCaptionBn: '১ মাস ৳৫,০০০ · ২ মাস ৳৮,০০০ · ৩ মাস ৳১২,০০০',
        toolsList: ['Upwork Ready', 'Fiverr Gigs', 'Remote Job Prep']
      }
    ]
  },
  {
    courseId: 'local-seo',
    courseTitleBn: 'Google My Business ও Local SEO',
    badgeBn: 'লোকাল ক্লায়েন্টের জন্য সেরা',
    durationSec: 38,
    scenes: [
      {
        timeSec: 0,
        titleBn: 'Google Maps 3-Pack র্যাঙ্কিং সিক্রেটস',
        descriptionBn: 'স্থানীয় যেকোনো ফিজিক্যাল শপ, রেস্টুরেন্ট বা ক্লিনিককে গুগল ম্যাপে শীর্ষ তিন নম্বরে তুলে আনার প্রমাণিত মেথড।',
        speechTextBn: 'আমাদের লোকাল এসইও কোর্সে আমি আপনাকে দেখাবো কীভাবে একটি Google Business Profile সফলভাবে ভেরিফাই করবেন এবং লোকাল কিওয়ার্ড রিসার্চ ও সাইটেশন দিয়ে গুগল ম্যাপে শীর্ষ তিনে র্যাংক করাবেন।',
        visualImage: '/src/assets/images/bangladeshi_female_instructor_presentation_1790951086671.jpg',
        screenCaptionBn: 'Google Maps ৩-প্যাক র্যাঙ্কিং ও সাইটেশন গাইড',
        toolsList: ['Google Business Profile', 'Google Maps', 'BrightLocal']
      },
      {
        timeSec: 13,
        titleBn: 'NAP সাইটেশন ও রিভিউ গ্রোথ ফানেল',
        descriptionBn: 'নাম, ঠিকানা ও ফোন নম্বরের সমতা রক্ষা করে ৫০+ টপ ডিরেক্টরি সাবমিশন এবং ৫-স্টার রিভিউ অর্জনের অটোমেশন।',
        speechTextBn: 'স্থানীয় প্রতিদ্বন্দ্বীদের প্রোফাইল অ্যানালাইসিস করে রিভিউ বৃদ্ধির কার্যকর ফানেল তৈরি ও নেতিবাচক রিভিউ ম্যানেজমেন্ট শিখবেন হাতে-কলমে।',
        visualImage: '/src/assets/images/course_local_seo_maps_1790946061939.jpg',
        screenCaptionBn: 'স্থানীয় ক্লায়েন্টের আসল বিজনেসে লাইভ অপ্টিমাইজেশন',
        toolsList: ['Whitespark', 'PlePer Tool', 'Local Citation']
      },
      {
        timeSec: 26,
        titleBn: 'ফি ও অনলাইন ভর্তি প্রক্রিয়া',
        descriptionBn: '১ মাস ৳৪,০০০, ২ মাস ৳৭,০০০ এবং ৩ মাস ৳১০,০০০। বিকাশে ফি পরিশোধ করে ঘরে বসেই অনলাইন ভর্তি নিশ্চিত করুন।',
        speechTextBn: 'আমেরিকা, কানাডা বা বাংলাদেশের যেকোনো লোকাল ক্লায়েন্টের কাজ করে আয় শুরু করতে এখনই ভর্তি হতে পারেন।',
        visualImage: '/src/assets/images/instructor_explaining_digital_courses_1790951106227.jpg',
        screenCaptionBn: '১ মাস ৳৪,০০০ · ২ মাস ৳৭,০০০ · ৩ মাস ৳১০,০০০',
        toolsList: ['Local Agency Model', 'US Client Hunting']
      }
    ]
  },
  {
    courseId: 'professional-seo',
    courseTitleBn: 'Professional SEO Training',
    badgeBn: 'হাই-ডিমান্ড লং-টার্ম ক্যারিয়ার',
    durationSec: 40,
    scenes: [
      {
        timeSec: 0,
        titleBn: 'অর্গানিক ট্রাফিক ও সার্চ র্যাঙ্কিং',
        descriptionBn: 'ওয়েবসাইটের টেকনিক্যাল, অন-পেজ ও অফ-পেজ এসইও-র মাধ্যমে গুগলের ১ম পেজে আসার সমন্বিত কোর্স।',
        speechTextBn: 'এসইও হলো দীর্ঘমেয়াদী আয়ের সবচেয়ে স্থিতিশীল মাধ্যম। এই প্রশিক্ষণে আমরা কিওয়ার্ড রিসার্চ, টেকনিক্যাল অডিট, গুগল সার্চ কনসোল ও হোয়াইট-হ্যাট ব্যাকলিংক স্ট্র্যাটেজি বিস্তারিতভাবে শেখাই।',
        visualImage: '/src/assets/images/bangladeshi_female_instructor_presentation_1790951086671.jpg',
        screenCaptionBn: 'ওয়েবসাইটের ১০০% অর্গানিক গ্রোথ আর্কিটেকচার',
        toolsList: ['Google Search Console', 'Ahrefs', 'SEMrush']
      },
      {
        timeSec: 14,
        titleBn: 'Ahrefs ও SEMrush অডিট',
        descriptionBn: 'টপ কম্পিটিটর অ্যানালাইসিস, কন্টেন্ট অপ্টিমাইজেশন ও টেকনিক্যাল বাগ ফিক্সিং মেথড।',
        speechTextBn: 'ক্লাসে সরাসরি প্রিমিয়াম এসইও সফটওয়্যার দিয়ে কম্পিটিটর অডিট এবং লাইভ ওয়েবসাইটে সরাসরি কাজ করে র‍্যাঙ্কিং বৃদ্ধির অভিজ্ঞতা অর্জন করবেন।',
        visualImage: '/src/assets/images/instructor_explaining_digital_courses_1790951106227.jpg',
        screenCaptionBn: 'লাইভ প্রজেক্টে এসইও অডিট রিপোর্ট প্রস্তুতকরণ',
        toolsList: ['Screaming Frog', 'Technical Schema', 'RankMath']
      },
      {
        timeSec: 27,
        titleBn: 'ক্যারিয়ার ও ভর্তি প্যাকেজ',
        descriptionBn: '১ মাস ৳৪,০০০, ২ মাস ৳৭,০০০ ও ৩ মাস ৳১০,০০০। সম্পন্ন করার পর ভেরিফায়েড সার্টিফিকেট প্রদান।',
        speechTextBn: 'আন্তর্জাতিক ফ্রিল্যান্স মার্কেটপ্লেস ও দেশী-বিদেশী আইটি এজেন্সিতে এসইও স্পেশালিস্ট হিসেবে ক্যারিয়ার গড়তে আজই ভর্তি হোন।',
        visualImage: '/src/assets/images/course_google_ads_analytics_1790946047596.jpg',
        screenCaptionBn: '১ মাস ৳৪,০০০ · ২ মাস ৳৭,০০০ · ৩ মাস ৳১০,০০০',
        toolsList: ['Freelance Profile', 'SEO Consultant Prep']
      }
    ]
  },
  {
    courseId: 'crm-automation',
    courseTitleBn: 'CRM ও মার্কেটিং অটোমেশন',
    badgeBn: 'আধুনিক গ্লোবাল ক্যারিয়ার',
    durationSec: 40,
    scenes: [
      {
        timeSec: 0,
        titleBn: 'কাস্টমার ডাটাবেজ ও সেলস পাইপলাইন',
        descriptionBn: 'HubSpot, Brevo ও Zapier-এর মাধ্যমে আধুনিক বিজনেসের সেলস এবং লিড স্বয়ংক্রিয় করার প্রশিক্ষণ।',
        speechTextBn: 'সিআরএম ও মার্কেটিং অটোমেশন বর্তমানে বিশ্বের সবচেয়ে দ্রুত বর্ধনশীল ক্ষেত্র। এই প্রশিক্ষণে আমরা কাস্টমার ডাটাবেজ তৈরি, সেলস পাইপলাইন ট্র্যাকিং এবং লিড নার্চারিং শেখাই।',
        visualImage: '/src/assets/images/bangladeshi_female_instructor_presentation_1790951086671.jpg',
        screenCaptionBn: 'HubSpot ও Brevo সিআরএম সেটআপ ও সেলস পাইপলাইন',
        toolsList: ['HubSpot CRM', 'Brevo', 'Zapier Automation']
      },
      {
        timeSec: 14,
        titleBn: 'অটোমেটেড ইমেইল ও হোয়াটসঅ্যাপ ড্রিপ ক্যাম্পেইন',
        descriptionBn: 'ওয়েবসাইট ফর্ম বা অ্যাড থেকে লিড আসার সাথে সাথে অটোমেটিক ইমেইল ও এসএমএস নোটিফিকেশন ফানেল।',
        speechTextBn: 'বিজ্ঞাপন বা ওয়েবসাইট থেকে আসা প্রতিটি লিড কীভাবে স্বয়ংক্রিয়ভাবে ড্রিপ ইমেইল সিরিজ ও নোটিফিকেশনের মাধ্যমে কাস্টমারে রূপান্তর করা যায়, তা হাতে-কলমে দেখাবো।',
        visualImage: '/src/assets/images/course_crm_automation_1790946074708.jpg',
        screenCaptionBn: 'মাল্টি-চ্যানেল লিড অটোমেশন ও নার্চারিং ইঞ্জিন',
        toolsList: ['Email Drip Workflows', 'Lead Scoring', 'Analytics']
      },
      {
        timeSec: 27,
        titleBn: 'ক্যারিয়ার প্লেসমেন্ট ও ভর্তি',
        descriptionBn: '১ মাস ৳৫,০০০, ২ মাস ৳৮,০০০ এবং ৩ মাস ৳১২,০০০। আন্তর্জাতিক এসএমবি রিমোট জবের সরাসরি প্রস্তুতি।',
        speechTextBn: 'ইউএস এবং ইউরোপের কোম্পানিতে রিমোট সিআরএম ম্যানেজার হিসেবে কাজ করার পূর্ণাঙ্গ দক্ষতা অর্জন করুন স্কিল হাউজে।',
        visualImage: '/src/assets/images/instructor_explaining_digital_courses_1790951106227.jpg',
        screenCaptionBn: '১ মাস ৳৫,০০০ · ২ মাস ৳৮,০০০ · ৩ মাস ৳১২,০০০',
        toolsList: ['Remote CRM Specialist', 'Enterprise Pipeline']
      }
    ]
  }
];

export const CourseVideoPresenter: React.FC<CourseVideoPresenterProps> = ({
  onOpenEnrollment,
  onSelectCourseDetails,
  lang
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('google-ads');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [progressSec, setProgressSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  const voiceCtrlRef = useRef<BanglaVoiceController | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    voiceCtrlRef.current = new BanglaVoiceController();
    return () => {
      stopVideo();
    };
  }, []);

  const activeTrack = VIDEO_TRACKS.find(t => t.courseId === selectedCourseId) || VIDEO_TRACKS[0];
  const activeScene = activeTrack.scenes[currentSceneIdx] || activeTrack.scenes[0];
  const activeCourseObj = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];

  const stopVideo = () => {
    if (voiceCtrlRef.current) {
      voiceCtrlRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const playScene = (sceneIndex: number) => {
    if (sceneIndex >= activeTrack.scenes.length) {
      stopVideo();
      setCurrentSceneIdx(0);
      setProgressSec(0);
      return;
    }

    setCurrentSceneIdx(sceneIndex);
    const scene = activeTrack.scenes[sceneIndex];

    if (!isMuted) {
      // Bangladeshi female instructor voice (pitch: 1.15, rate: 0.95)
      voiceCtrlRef.current?.playNativeBengali(scene.speechTextBn, 0.95, 1.15, () => {
        if (sceneIndex + 1 < activeTrack.scenes.length) {
          playScene(sceneIndex + 1);
        } else {
          stopVideo();
        }
      });
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopVideo();
    } else {
      setIsPlaying(true);
      playScene(currentSceneIdx);

      // Progress clock
      timerRef.current = setInterval(() => {
        setProgressSec(prev => {
          const next = prev + 1;
          if (next >= activeTrack.durationSec) {
            stopVideo();
            return 0;
          }
          return next;
        });
      }, 1000);
    }
  };

  const handleSelectTrack = (courseId: string) => {
    stopVideo();
    setSelectedCourseId(courseId);
    setCurrentSceneIdx(0);
    setProgressSec(0);
  };

  const handleRestart = () => {
    stopVideo();
    setCurrentSceneIdx(0);
    setProgressSec(0);
    setIsPlaying(true);
    playScene(0);
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ভিডিও প্রেজেন্টেশন ও কোর্স পরিচিতি</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">INSTRUCTOR SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-serif">
              সাদিয়া রহমানের উপস্থাপনায় কোর্সের ভিডিও পরিচিতি
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              আমাদের সিনিয়র প্রশিক্ষক সাদিয়া রহমান প্রতিটি কোর্সের বিষয়বস্তু, লাইভ প্রজেক্টের চিত্র এবং ক্যারিয়ার গাইডলাইন বাংলায় তুলে ধরছেন।
            </p>
          </div>

          {/* Presenter Profile Pill */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0">
              <img
                src="/src/assets/images/bangladeshi_female_instructor_presentation_1790951086671.jpg"
                alt="Sadia Rahman"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>সাদিয়া রহমান</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] text-emerald-400">লিড ট্রেনার ও ডিজিটাল মার্কেটার</div>
            </div>
          </div>
        </div>

        {/* Course Video Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {VIDEO_TRACKS.map(track => {
            const isSelected = track.courseId === selectedCourseId;
            return (
              <button
                key={track.courseId}
                type="button"
                onClick={() => handleSelectTrack(track.courseId)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{track.courseTitleBn}</span>
                {isSelected && <span className="text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded font-mono">ভিডিও প্লে</span>}
              </button>
            );
          })}
        </div>

        {/* Video Player Display Screen */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          
          {/* Main Visual Display (16:9 Aspect Ratio) */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
            
            {/* Visual Screen Scene Image */}
            <img
              src={activeScene.visualImage}
              alt={activeScene.titleBn}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />

            {/* Top Bar Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-xs font-mono font-medium text-emerald-400 border border-slate-700/60">
                  {activeTrack.badgeBn}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 backdrop-blur-md rounded-full text-xs font-mono font-medium text-red-300 border border-red-800/60">
                  <Radio className={`w-3 h-3 ${isPlaying ? 'animate-pulse text-red-400' : 'text-slate-400'}`} />
                  <span>{isPlaying ? 'সরাসরি ভিডিও লেকচার চলছে' : 'ভিডিও পজ করা আছে'}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded text-[11px] font-mono text-slate-300 border border-slate-700/60">
                  1080p HD
                </span>
              </div>
            </div>

            {/* Center Big Play Button (When Paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-20 h-20 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer group"
                  aria-label="Play Course Video"
                >
                  <Play className="w-8 h-8 fill-slate-950 ml-1 transition-transform group-hover:scale-110" />
                </button>
              </div>
            )}

            {/* Picture-in-Picture (PiP) Presenter Video Feed in Corner */}
            <div className="absolute top-4 right-4 sm:top-14 sm:right-6 w-28 sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-2xl bg-slate-900 z-20 hidden md:block">
              <img
                src="/src/assets/images/bangladeshi_female_instructor_presentation_1790951086671.jpg"
                alt="Sadia Rahman Live Feed"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between text-[10px] text-white bg-slate-950/80 px-1.5 py-0.5 rounded backdrop-blur-xs">
                <span className="truncate">সাদিয়া রহমান</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Synchronized Closed Captions / Subtitles [CC] */}
            {showSubtitles && (
              <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 sm:left-10 sm:right-10 z-20 text-center">
                <div className="inline-block bg-slate-950/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/60 text-xs sm:text-base font-medium text-white max-w-2xl shadow-xl leading-relaxed text-balance">
                  <span className="text-emerald-400 font-bold mr-2 font-serif">সাদিয়া:</span>
                  <span>{activeScene.speechTextBn}</span>
                </div>
              </div>
            )}

            {/* Bottom Scene Indicators & Tools Strip */}
            <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 z-20 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-semibold text-xs sm:text-sm drop-shadow">
                  {activeScene.screenCaptionBn}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {activeScene.toolsList.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[11px] rounded border border-slate-700/50"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Video Player Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 space-y-3">
            
            {/* Timeline Scrubber */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden cursor-pointer">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(progressSec / activeTrack.durationSec) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>0:{progressSec < 10 ? `0${progressSec}` : progressSec}</span>
                <span className="text-slate-500">{activeScene.titleBn} (দৃশ্য ০{currentSceneIdx + 1}/০{activeTrack.scenes.length})</span>
                <span>0:{activeTrack.durationSec}</span>
              </div>
            </div>

            {/* Player Controls Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
              
              {/* Left: Play / Pause / Rewind / Sound / Subtitles */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlaying ? 'পজ করুন' : 'প্লে করুন'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  title="পুনরায় শুরু থেকে দেখুন"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  title={isMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড বন্ধ করুন'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
                    showSubtitles
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title="সাবটাইটেল / ক্যাপশন চালু/বন্ধ করুন"
                >
                  <Subtitles className="w-4 h-4" />
                  <span className="text-[11px]">CC</span>
                </button>
              </div>

              {/* Center Scene Quick Jumpers */}
              <div className="flex items-center gap-1.5 text-xs">
                {activeTrack.scenes.map((scene, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      stopVideo();
                      setCurrentSceneIdx(sIdx);
                      setProgressSec(scene.timeSec);
                      setIsPlaying(true);
                      playScene(sIdx);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      currentSceneIdx === sIdx
                        ? 'border-emerald-500 bg-emerald-950/70 text-emerald-300 font-bold'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    দৃশ্য {sIdx + 1}
                  </button>
                ))}
              </div>

              {/* Right: Direct Actions to Enroll or View Syllabus */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onSelectCourseDetails(activeCourseObj)}
                  className="w-1/2 sm:w-auto px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>সিলেবাস দেখুন</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenEnrollment(activeTrack.courseId)}
                  className="w-1/2 sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>ভর্তি নিশ্চিত করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* 3 Presentation Key Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">বাংলাদেশি প্রশিক্ষক দ্বারা লাইভ মেন্টরিং</div>
              <div className="text-xs text-slate-400 mt-0.5">সহজ ও সাবলীল বাংলায় হাতে-কলমে সরাসরি স্ক্রিন শেয়ার করে সমাধান।</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">বাস্তব ক্লায়েন্ট অ্যাকাউন্টে লাইভ কাজ</div>
              <div className="text-xs text-slate-400 mt-0.5">শুধুমাত্র ডামি ডেমো নয়, রিয়েল অ্যাড বাজেট ও লোকাল বিজনেসে লাইভ কাজ।</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">মার্কেটপ্লেস ও ডিরেক্ট ক্লায়েন্ট হান্টিং</div>
              <div className="text-xs text-slate-400 mt-0.5">কোর্স শেষে Upwork, Fiverr এবং লিঙ্কডইনে সফল ক্লায়েন্ট আউটরিচ প্রশিক্ষণ।</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
