import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Award, ArrowRight, Check } from 'lucide-react';
import { COURSES } from '../data/courses';
import { CourseDuration } from '../types';

interface RoiCalculatorProps {
  onEnroll: (courseId: string, duration: CourseDuration) => void;
  lang: 'bn' | 'en';
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onEnroll, lang }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('google-ads');
  const [selectedDuration, setSelectedDuration] = useState<CourseDuration>('2-months');
  const [careerPath, setCareerPath] = useState<'freelance' | 'remote' | 'business'>('freelance');

  const course = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  const plan = course.pricing.find(p => p.durationKey === selectedDuration) || course.pricing[0];

  // Calculated estimates
  const estimates = {
    freelance: {
      hourlyRate: '$15 - $30 / ঘণ্টা',
      firstMonthReturn: '৳৩৫,০০০ - ৳৭০,০০০',
      breakEven: 'প্রথম ১টি সফল ক্লায়েন্ট প্রজেক্টেই ফি উঠে আসে',
      detailsBn: 'Upwork ও Fiverr-এ Google Ads বা Local SEO-র একটি ফিক্সড প্রাইস অডিট বা ক্যাম্পেইন সেটআপের রেট $150-$400।'
    },
    remote: {
      hourlyRate: '$500 - $1,200 / মাস',
      firstMonthReturn: '৳৬০,০০০ - ৳১,৪০,০০০',
      breakEven: 'চাকরির প্রথম ১৫ দিনেই কোর্স ফি উশুল',
      detailsBn: 'ইউএস, ইউকে ও দুবাইয়ের এসএমবি কোম্পানিগুলোতে পার্ট-টাইম বা ফুল-টাইম রিমোট ডিজিটাল মার্কেটার হিসেবে কাজ।'
    },
    business: {
      hourlyRate: 'এজেন্সি খরচ সাশ্রয়',
      firstMonthReturn: '৳৪০,০০০+ সাশ্রয় / মাস',
      breakEven: 'প্রথম ৩টি নতুন সেলস বা কনভার্সনে বিনিয়োগ ফেরত',
      detailsBn: 'অন্য এজেন্সিকে মাসে ২০-৩০ হাজার টাকা ফি না দিয়ে নিজের ব্যবসা নিজেই পরিচালনা ও লিড বৃদ্ধি।'
    }
  }[careerPath];

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>ইনভেস্টমেন্ট ও ক্যারিয়ার ক্যালকুলেটর</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-serif">
            আপনার দক্ষতার বিনিয়োগ ও সম্ভাব্য আয়ের বিশ্লেষণ
          </h2>
          <p className="mt-3 text-base text-slate-600">
            দেখুন সামান্য ফি-র একটি প্রফেশনাল প্রশিক্ষণ কীভাবে আপনার পরবর্তী মাসে আয়ের শক্তিশালী দরজা খুলে দিতে পারে।
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            
            {/* 1. Choose Course */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                ১. আপনি কোন কোর্সটি শিখতে চান?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COURSES.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCourseId(c.id)}
                    className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                      selectedCourseId === c.id
                        ? 'border-emerald-600 bg-white text-slate-900 shadow-xs font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold">{c.titleBn}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                ২. প্রশিক্ষণের মেয়াদ নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {course.pricing.map(p => (
                  <button
                    key={p.durationKey}
                    type="button"
                    onClick={() => setSelectedDuration(p.durationKey)}
                    className={`py-2 px-3 rounded-lg border text-center text-xs font-medium transition-all ${
                      selectedDuration === p.durationKey
                        ? 'border-emerald-600 bg-white text-emerald-700 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div>{p.durationLabelBn}</div>
                    <div className="font-mono text-slate-900 font-bold mt-0.5">{p.priceFormattedBn}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Choose Career Track */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                ৩. আপনার মূল ক্যারিয়ার গোল কোনটি?
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setCareerPath('freelance')}
                  className={`p-3 rounded-lg border text-center font-medium transition-all ${
                    careerPath === 'freelance'
                      ? 'border-emerald-600 bg-white text-emerald-800 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  মার্কেটপ্লেস ফ্রিল্যান্সিং
                </button>
                <button
                  type="button"
                  onClick={() => setCareerPath('remote')}
                  className={`p-3 rounded-lg border text-center font-medium transition-all ${
                    careerPath === 'remote'
                      ? 'border-emerald-600 bg-white text-emerald-800 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  রিমোট / ফুল-টাইম জব
                </button>
                <button
                  type="button"
                  onClick={() => setCareerPath('business')}
                  className={`p-3 rounded-lg border text-center font-medium transition-all ${
                    careerPath === 'business'
                      ? 'border-emerald-600 bg-white text-emerald-800 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  নিজের ব্যবসার গ্রোথ
                </button>
              </div>
            </div>

          </div>

          {/* Results Summary Box (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-emerald-400 font-mono tracking-wider">
                INVESTMENT ANALYSIS
              </span>
              <h3 className="text-xl font-bold font-serif text-white mt-1">
                বিনিয়োগ ও রিটার্ন সারাংশ
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-xs text-slate-400">কোর্সের মোট ফি:</span>
                <span className="text-xl font-bold font-mono text-white tabular-nums">
                  {plan.priceFormattedBn}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-xs text-slate-400">প্রত্যাশিত সম্ভাব্য আয়:</span>
                <span className="text-base font-bold text-emerald-400">
                  {estimates.firstMonthReturn}
                </span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400 block">ইনভেস্টমেন্ট রিকভারি:</span>
                <span className="text-xs font-medium text-slate-200">
                  {estimates.breakEven}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {estimates.detailsBn}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onEnroll(course.id, plan.durationKey)}
              className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{course.titleBn}-এ ভর্তি শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 text-center">
              পেমেন্ট কনফার্মেশনের পর সাথে সাথে ইনস্ট্যান্ট ভর্তি স্লিপ পাবেন
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
