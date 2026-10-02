import React, { useState } from 'react';
import { X, Check, Calendar, Clock, ArrowRight, Laptop, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Course, CourseDuration } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseId: string, duration: CourseDuration) => void;
  lang: 'bn' | 'en';
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onEnroll,
  lang
}) => {
  const [selectedDuration, setSelectedDuration] = useState<CourseDuration>('2-months');

  if (!course) return null;

  const currentPlan = course.pricing.find(p => p.durationKey === selectedDuration) || course.pricing[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header Visual Banner */}
        <div className="relative h-48 sm:h-56 bg-slate-950 overflow-hidden">
          <img
            src={course.heroImage}
            alt={course.titleEn}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-slate-900/60 backdrop-blur-md rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs text-emerald-400 font-mono tracking-wider">
              {lang === 'bn' ? course.badgeBn : course.badgeEn}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight mt-1">
              {course.titleBn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {course.summaryBn}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Schedule & Batch Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">পরবর্তী ব্যাচ শুরু:</span>
              <span className="font-semibold text-slate-900">{course.nextBatchBn}</span>
            </div>
            <div>
              <span className="text-slate-500 block">ক্লাসের সময়সূচি:</span>
              <span className="font-semibold text-slate-900">{course.scheduleBn}</span>
            </div>
            <div>
              <span className="text-slate-500 block">প্রয়োজনীয় যোগ্যতা:</span>
              <span className="font-semibold text-slate-900">{course.prerequisitesBn}</span>
            </div>
          </div>

          {/* Complete 10 Topic Syllabus Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-serif">
                সম্পূর্ণ কোর্স কারিকুলাম ও মডিউলসমূহ ({course.topics.length}টি অধ্যায়):
              </h4>
              <span className="text-xs text-emerald-700 font-medium">হাতে-কলমে প্র্যাকটিস</span>
            </div>

            <div className="space-y-2.5">
              {course.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900">
                        {topic.titleBn}
                      </h5>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {topic.detailsBn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Covered */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              প্রশিক্ষণে ব্যবহৃত প্রফেশনাল টুলস:
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-md border border-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Duration & Fee selector */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              কোর্সের মেয়াদ ও ফি নির্বাচন করুন:
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {course.pricing.map(plan => (
                <button
                  key={plan.durationKey}
                  type="button"
                  onClick={() => setSelectedDuration(plan.durationKey)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedDuration === plan.durationKey
                      ? 'border-emerald-600 bg-emerald-50 text-slate-900 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold">{plan.durationLabelBn}</div>
                  <div className="text-base font-bold font-mono text-emerald-700 mt-0.5">
                    {plan.priceFormattedBn}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Plan Features */}
            <div className="pt-2">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                {currentPlan.featuresBn.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400">নির্বাচিত প্যাকেজ ফি:</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {currentPlan.priceFormattedBn}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700"
            >
              বন্ধ করুন
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course.id, selectedDuration);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{course.id === 'google-ads' ? 'Enroll in Google Ads' : course.id === 'local-seo' ? 'Enroll in Local SEO' : course.id === 'professional-seo' ? 'Enroll in SEO' : 'Enroll in CRM'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
