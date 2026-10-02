import React, { useState, useRef } from 'react';
import { Check, Clock, Calendar, ArrowRight, BookOpen, Layers, Sparkles, Volume2 } from 'lucide-react';
import { COURSES } from '../data/courses';
import { Course, CourseDuration } from '../types';
import { BanglaVoiceController } from '../utils/banglaVoice';

interface CoursesSectionProps {
  onOpenEnrollment: (courseId?: string, duration?: CourseDuration) => void;
  onSelectCourseDetails: (course: Course) => void;
  lang: 'bn' | 'en';
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onOpenEnrollment,
  onSelectCourseDetails,
  lang
}) => {
  // Global or per-card selected duration
  const [selectedDurations, setSelectedDurations] = useState<Record<string, CourseDuration>>({
    'google-ads': '2-months',
    'local-seo': '2-months',
    'professional-seo': '2-months',
    'crm-automation': '2-months'
  });

  const [speakingCourseId, setSpeakingCourseId] = useState<string | null>(null);
  const voiceCtrlRef = useRef<BanglaVoiceController | null>(null);

  const handleDurationChange = (courseId: string, duration: CourseDuration) => {
    setSelectedDurations(prev => ({ ...prev, [courseId]: duration }));
  };

  const handleSpeakCourse = (course: Course) => {
    if (speakingCourseId === course.id) {
      voiceCtrlRef.current?.stop();
      setSpeakingCourseId(null);
      return;
    }
    if (!voiceCtrlRef.current) {
      voiceCtrlRef.current = new BanglaVoiceController();
    }
    setSpeakingCourseId(course.id);
    const speechText = `${course.titleBn}। ${course.summaryBn}। এই কোর্সে থাকছে ${course.topics.slice(0, 4).map(t => t.titleBn).join(', ')} সহ লাইভ ক্লায়েন্ট প্রজেক্ট।`;
    voiceCtrlRef.current.playNativeBengali(speechText, 0.95, 1.0, () => {
      setSpeakingCourseId(null);
    });
  };

  return (
    <section id="courses" className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <span>কোর্সসমূহ</span>
            <span aria-hidden="true">·</span>
            <span>PROFESSIONAL CURRICULUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-serif">
            {lang === 'bn' ? 'আমাদের প্রশিক্ষণ কোর্সসমূহ' : 'Our Professional Training Courses'}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'বাস্তব প্রজেক্ট, ক্যাম্পেইন সেটআপ ও আধুনিক টুলের ব্যবহারে তৈরি চারটি ক্যারিয়ার-কেন্দ্রিক স্পেশালাইজড প্রোগ্রাম।'
              : 'Four career-defining training tracks with hands-on client projects, real campaign setups, and industry tool mastery.'}
          </p>
        </div>

        {/* 2x2 Clean Grid of Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {COURSES.map((course, idx) => {
            const currentDuration = selectedDurations[course.id] || '2-months';
            const currentPlan = course.pricing.find(p => p.durationKey === currentDuration) || course.pricing[0];

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                {/* Course Header & Visual */}
                <div>
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                    <img
                      src={course.heroImage}
                      alt={course.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Badge and Number */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-white/90 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded">
                        {idx === 0 && '১. Google Ads'}
                        {idx === 1 && '২. Local SEO'}
                        {idx === 2 && '৩. Professional SEO'}
                        {idx === 3 && '৪. CRM Automation'}
                      </span>
                      <span className="text-xs font-medium text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded">
                        {lang === 'bn' ? course.badgeBn : course.badgeEn}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                        {course.titleBn}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-1">
                        {course.summaryBn}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Course Summary & Next Batch Info */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>আগামী ব্যাচ: <strong className="text-slate-700 font-semibold">{course.nextBatchBn}</strong></span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.scheduleBn}</span>
                      </span>
                      <span className="text-amber-700 font-medium ml-auto">
                        আর মাত্র {course.seatsLeft}টি আসন বাকি
                      </span>
                    </div>

                    {/* Topics Highlights Preview */}
                    <div className="py-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          কোর্সের প্রধান বিষয়বস্তু ({course.topics.length}টি মডিউল):
                        </span>
                        <button
                          onClick={() => onSelectCourseDetails(course)}
                          className="text-xs text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2"
                        >
                          সম্পূর্ণ সিলেবাস দেখুন
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {course.topics.slice(0, 6).map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                            <span className="line-clamp-1">{topic.titleBn}</span>
                          </div>
                        ))}
                      </div>
                      {course.topics.length > 6 && (
                        <div className="mt-2 text-xs text-slate-500 italic">
                          + আরও ৪টি প্র্যাকটিক্যাল মডিউল ও ক্লায়েন্ট লাইভ প্রজেক্ট
                        </div>
                      )}
                    </div>

                    {/* Tools Covered (Quiet tags) */}
                    <div className="pt-2 pb-4">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                        প্রয়োজনীয় টুল ব্যবহারের শিক্ষা:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {course.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Selector Tabs */}
                    <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6">
                      <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                        কোর্সের মেয়াদ ও ফি নির্বাচন করুন:
                      </div>
                      
                      {/* 3 Duration Pills as interactive segmented controls */}
                      <div className="grid grid-cols-3 gap-2 p-1 bg-slate-200/70 rounded-lg text-xs">
                        {course.pricing.map(plan => {
                          const isActive = plan.durationKey === currentDuration;
                          return (
                            <button
                              key={plan.durationKey}
                              type="button"
                              onClick={() => handleDurationChange(course.id, plan.durationKey)}
                              className={`py-2 px-2 rounded-md font-medium text-center transition-all ${
                                isActive
                                  ? 'bg-white text-slate-950 shadow-sm font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <div>{plan.durationLabelBn.replace(' কোর্স', '')}</div>
                              <div className="font-mono text-[11px] text-emerald-700 font-bold mt-0.5">
                                {plan.priceFormattedBn}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Plan Details */}
                      <div className="mt-4 flex items-baseline justify-between">
                        <div>
                          <div className="text-xs text-slate-500 font-medium">নির্বাচিত ফি</div>
                          <div className="text-2xl font-bold font-mono text-slate-950 tabular-nums">
                            {currentPlan.priceFormattedBn}
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">
                          <span>{currentPlan.durationLabelBn}</span>
                          <span className="block text-emerald-700 font-medium">এককালীন বা কিস্তিতে প্রদেয়</span>
                        </div>
                      </div>

                      {/* Plan Included Features */}
                      <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                        {currentPlan.featuresBn.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Course Bengali Voice Overview Button */}
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => handleSpeakCourse(course)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                            speakingCourseId === course.id
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold'
                              : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${speakingCourseId === course.id ? 'animate-pulse text-emerald-600' : 'text-slate-500'}`} />
                          <span>
                            {speakingCourseId === course.id
                              ? 'বাংলা ভয়েস চলছে (বন্ধ করতে চাপুন)'
                              : 'এই কোর্সের বাংলা ভয়েস শুনুন'}
                          </span>
                        </button>
                      </div>

                      {/* Direct CTA Buttons matching prompt */}
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectCourseDetails(course)}
                          className="px-3 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                          <span>সিলেবাস দেখুন</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenEnrollment(course.id, currentDuration)}
                          className="px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
                        >
                          <span>ভর্তি নিশ্চিত করুন</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Action Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xl font-bold font-serif">
              কোন কোর্সটি আপনার ক্যারিয়ারের জন্য উপযুক্ত?
            </h4>
            <p className="text-sm text-slate-300">
              আমাদের ফ্রি ক্যারিয়ার কাউন্সিলিং নিতে সরাসরি হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করুন।
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/8801956434722?text=Hello%20Skill%20House,%20I%20want%20to%20know%20about%20your%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors"
            >
              ফ্রি কাউন্সিলিং (হোয়াটসঅ্যাপ)
            </a>
            <button
              onClick={() => onOpenEnrollment()}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              আজই ভর্তি হোন
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
