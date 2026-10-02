import React from 'react';
import { BookCheck, UserCheck, Smartphone, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdmissionStepsProps {
  onStartAdmission: () => void;
  lang: 'bn' | 'en';
}

export const AdmissionSteps: React.FC<AdmissionStepsProps> = ({ onStartAdmission, lang }) => {
  const steps = [
    {
      stepBn: 'ধাপ ১',
      titleBn: 'কোর্স নির্বাচন করুন',
      descBn: 'আপনার পছন্দ অনুযায়ী কোর্স এবং ১, ২ অথবা ৩ মাসের প্রশিক্ষণ প্যাকেজ বেছে নিন।',
      icon: BookCheck,
      badgeBn: 'পছন্দ করুন'
    },
    {
      stepBn: 'ধাপ ২',
      titleBn: 'অনলাইন ভর্তি ফরম পূরণ করুন',
      descBn: 'আপনার নাম, মোবাইল নম্বর, ইমেইল এবং অন্যান্য প্রয়োজনীয় তথ্য দিয়ে ভর্তি ফরম পূরণ করুন।',
      icon: UserCheck,
      badgeBn: 'তথ্য দিন'
    },
    {
      stepBn: 'ধাপ ৩',
      titleBn: 'বিকাশের মাধ্যমে পেমেন্ট করুন',
      descBn: 'আপনার নির্বাচিত কোর্সের ফি বিকাশের মাধ্যমে পরিশোধ করুন। পেমেন্ট সম্পন্ন হলে Transaction ID সংরক্ষণ করুন।',
      icon: Smartphone,
      badgeBn: 'ফি পরিশোধ'
    },
    {
      stepBn: 'ধাপ ৪',
      titleBn: 'ভর্তি নিশ্চিত করুন',
      descBn: 'পেমেন্টের তথ্য যাচাইয়ের পর আমাদের টিম আপনার সঙ্গে যোগাযোগ করবে এবং ক্লাস শুরুর বিস্তারিত জানিয়ে দেবে।',
      icon: CheckCircle,
      badgeBn: 'ক্লাস শুরু'
    }
  ];

  return (
    <section id="process" className="py-16 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            সহজ ৪ ধাপের প্রক্রিয়া
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-serif">
            ভর্তি প্রক্রিয়া
          </h2>
          <p className="mt-3 text-base text-slate-600">
            খুব সহজে ঘরে বসেই আপনার পছন্দের কোর্সে ভর্তি হয়ে যান মাত্র কয়েক মিনিটে।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="relative bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded">
                      {item.stepBn}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
                      <IconComponent className="w-5 h-5 text-emerald-700" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-serif mb-2">
                    {item.titleBn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.descBn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{item.badgeBn}</span>
                  <span className="font-mono">Step 0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout action */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartAdmission}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-all shadow-md hover:shadow cursor-pointer"
          >
            <span>ভর্তি ফরম পূরণ করতে এখানে ক্লিক করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>নিরাপদ পেমেন্ট ট্র্যাকিং ও তাৎক্ষণিক রসিদ জেনারেটর</span>
          </div>
        </div>

      </div>
    </section>
  );
};
