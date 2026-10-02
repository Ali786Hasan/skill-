import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Award, PlayCircle } from 'lucide-react';
import { ACADEMY_INFO } from '../data/courses';
import { Logo3D } from './Logo3D';

interface HeroProps {
  onOpenEnrollment: () => void;
  onOpenVoicePlayer?: () => void;
  lang: 'bn' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnrollment, onOpenVoicePlayer, lang }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background subtle mesh glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3D Logo & Editorial kicker */}
            <div className="flex items-center gap-3.5">
              <Logo3D size="lg" glow interactive />
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <span className="tracking-wide font-mono font-bold">SKILL HOUSE 3D</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300">
                    {lang === 'bn' ? ACADEMY_INFO.taglineBn : ACADEMY_INFO.taglineEn}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Dhap, Rangpur City Corporation · Bangladesh
                </div>
              </div>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif text-balance">
              {lang === 'bn' ? (
                <>
                  আপনার দক্ষতাই হতে পারে <br className="hidden sm:inline" />
                  <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">
                    আপনার আয়ের নতুন পথ!
                  </span>
                </>
              ) : (
                <>
                  Your In-Demand Skills <br className="hidden sm:inline" />
                  <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">
                    Your Pathway to Financial Growth
                  </span>
                </>
              )}
            </h1>

            {/* Sub-paragraph directly from the user's brief */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {lang === 'bn' ? (
                <>
                  আপনি কি <strong>Google Ads, Google My Business, Local SEO এবং CRM</strong> শিখে নিজের ক্যারিয়ার গড়তে চান? ফ্রিল্যান্সিং, রিমোট জব অথবা নিজের ব্যবসার ডিজিটাল মার্কেটিং পরিচালনা করতে আমাদের প্রফেশনাল প্রোগ্রামে যুক্ত হোন।
                </>
              ) : (
                <>
                  Master <strong>Google Ads, Google My Business, Local SEO, and CRM Marketing Automation</strong>. Built for high-paying freelance clients, remote international roles, and scaling your own business.
                </>
              )}
            </p>

            {/* Key feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bn' ? 'বাস্তব ক্লায়েন্ট প্রজেক্ট ও লাইভ ক্যাম্পেইন' : 'Live Client Projects & Real Spend'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bn' ? 'হাতে-কলমে টুলস ব্যবহার (GA4, GTM, HubSpot)' : 'Hands-on Tools (GA4, GTM, HubSpot)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bn' ? 'Upwork ও আন্তর্জাতিক রিমোট জব গাইডলাইন' : 'Upwork & Global Remote Job Guidance'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bn' ? '১ম মাস থেকেই ব্যবহারিক প্র্যাকটিস' : 'Practical Practice from Month 1'}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={onOpenEnrollment}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'Enroll Now – ভর্তি হতে ক্লিক করুন' : 'Enroll Now – Start Training'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenVoicePlayer && (
                <button
                  type="button"
                  onClick={onOpenVoicePlayer}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 rounded-lg border border-emerald-500/40 transition-colors shadow-xs"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? 'বাংলা ভয়েস শুনুন (ভিডিও প্রমো)' : 'Listen to Bengali Voice Promo'}</span>
                </button>
              )}

              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
              >
                <span>{lang === 'bn' ? 'কোর্স ও সিলেবাস' : 'Courses & Syllabus'}</span>
              </a>
            </div>

            {/* Notice text */}
            <p className="text-xs text-slate-400">
              {lang === 'bn' 
                ? 'আপনার লক্ষ্য হোক দক্ষতা অর্জন। আপনার পরবর্তী পদক্ষেপ হোক আজই ভর্তি হওয়া।' 
                : 'Commit to skill excellence. Take your next step by enrolling today.'}
            </p>
          </div>

          {/* Right Column: Visual Frame & Trust Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              {/* Generated image with fallback container */}
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900 relative">
                <img
                  src="/src/assets/images/hero_digital_marketing_academy_1790946033152.jpg"
                  alt="Skill House Digital Marketing Training Academy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Graceful fallback to styled visual canvas
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {onOpenVoicePlayer && (
                  <button
                    type="button"
                    onClick={onOpenVoicePlayer}
                    className="absolute bottom-3 right-3 px-3 py-1.5 bg-slate-950/90 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold backdrop-blur-md border border-slate-700/80 flex items-center gap-1.5 shadow-lg transition-colors cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>বাংলা ভয়েস শুনুন</span>
                  </button>
                )}
              </div>

              {/* Card Footer Highlights */}
              <div className="p-5 bg-slate-900/95 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{lang === 'bn' ? 'বর্তমান ভর্তি সেশন' : 'Current Batch'}</span>
                  <span className="text-emerald-400 font-medium">
                    {lang === 'bn' ? 'অক্টোবর ২০২৬ ব্যাচে সীমিত আসন' : 'October 2026 Batch Open'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                    <div className="text-xl font-bold text-white font-mono tabular-nums">১,২৫০+</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {lang === 'bn' ? 'সফল গ্র্যাজুয়েট' : 'Trained Graduates'}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                    <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">৳৪,০০০ - ১২,০০০</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {lang === 'bn' ? 'সাধ্যের মধ্যে কোর্স ফি' : 'Affordable Course Fee'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Accent Badge (Quiet, Non-cluttered) */}
            <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? '১০০% ভেরিফায়েড সার্টিফিকেট' : '100% Verified Certificate'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'লাইফটাইম মেন্টর এক্সেস' : 'Lifetime Mentorship'}</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
