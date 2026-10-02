import React from 'react';
import { 
  Briefcase, 
  Smile, 
  MousePointerClick, 
  Building2, 
  Wrench, 
  FolderKanban, 
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface WhyChooseUsProps {
  lang: 'bn' | 'en';
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const points = [
    {
      icon: Briefcase,
      titleBn: 'বাস্তব কাজের ওপর ভিত্তি করে প্রশিক্ষণ',
      descBn: 'শুধু মুখস্থ থিওরি নয়, আন্তর্জাতিক ক্লায়েন্টের অ্যাকাউন্টে যেভাবে কাজ হয় ঠিক সেই স্ট্যান্ডার্ডেই প্রতিটি টপিক হাতে-কলমে শেখানো হয়।'
    },
    {
      icon: Smile,
      titleBn: 'Beginner-friendly learning system',
      descBn: 'যাদের কোনো পূর্ব অভিজ্ঞতা নেই তারাও যেন খুব সহজে ধাপে ধাপে প্রতিটি মডিউল আত্মস্থ করতে পারেন, সেই উপযোগী স্ট্রাকচার্ড কারিকুলাম।'
    },
    {
      icon: MousePointerClick,
      titleBn: 'হাতে-কলমে প্র্যাকটিস',
      descBn: 'লাইভ ক্লাসের প্রতিটি স্টেপ আপনার নিজের কম্পিউটারে প্র্যাকটিস করানো হয় এবং প্রশিক্ষক সরাসরি স্ক্রিন শেয়ারে সমাধান করে দেন।'
    },
    {
      icon: Building2,
      titleBn: 'বাস্তব ব্যবসার উদাহরণ দিয়ে শেখানো',
      descBn: 'ই-কমার্স ব্র্যান্ড, রিয়েল এস্টেট কোম্পানি ও লোকাল ক্লিনিকের আসল বিজনেস ডাটা এবং রিটার্ন অন অ্যাড স্পেন্ড (ROAS) কেস স্টাডি।'
    },
    {
      icon: Wrench,
      titleBn: 'আধুনিক ডিজিটাল মার্কেটিং টুলের ব্যবহার',
      descBn: 'Google Ads Manager, GA4, GTM, SEMrush, Ahrefs, HubSpot ও Make.com এর মতো ইন্ডাস্ট্রি-স্ট্যান্ডার্ড প্রিমিয়াম টুলের সরাসরি ব্যবহার।'
    },
    {
      icon: FolderKanban,
      titleBn: 'প্রজেক্টভিত্তিক শেখার সুযোগ',
      descBn: 'কোর্স চলাকালীন ২টি পূর্ণাঙ্গ ইন্ডাস্ট্রি প্রজেক্ট সম্পন্ন করবেন, যা আপনার আপওয়ার্ক, ফাইভার বা জবের ইন্টারভিউতে পোর্টফোলিও হিসেবে জমা দিতে পারবেন।'
    },
    {
      icon: Globe2,
      titleBn: 'ফ্রিল্যান্সিং ও রিমোট জবের প্রস্তুতি',
      descBn: 'ক্লায়েন্ট কমিউনিকেশন, প্রপোজাল রাইটিং, ইন্টারভিউ হ্যান্ডলিং এবং রিমোট মার্কেটপ্লেসে নিজের ভ্যালু প্রপোজিশন উপস্থাপনের বিশেষ ট্রেনিং।'
    }
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            আমাদের বিশেষত্ব
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-serif">
            কেন আমাদের প্রশিক্ষণ প্রোগ্রামে ভর্তি হবেন?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            আমরা শিক্ষার্থীদের কেবল কোর্স শেষ করানোয় বিশ্বাসী নই, বরং প্রতিটি শিক্ষার্থীকে একজন সফল ডিজিটাল মার্কেটার হিসেবে আত্মপ্রকাশে সহায়তা করি।
          </p>
        </div>

        {/* Feature Grid with Bento feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            const isMarquee = index === 0;

            return (
              <div
                key={index}
                className={`p-6 rounded-xl border bg-white shadow-xs hover:border-emerald-300 transition-all ${
                  isMarquee
                    ? 'lg:col-span-2 border-emerald-200/90 bg-gradient-to-br from-white via-white to-emerald-50/40'
                    : 'border-slate-200'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif mb-2">
                  {point.titleBn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {point.descBn}
                </p>
                
                {isMarquee && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-medium text-emerald-800">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      লাইভ ক্লায়েন্ট বাজেট সাপোর্ট
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ১০০% প্র্যাকটিক্যাল ওয়ার্কস্টেশন
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ক্লাস মিস হলে ব্যাকআপ সেশন
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
