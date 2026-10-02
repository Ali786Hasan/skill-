import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  lang: 'bn' | 'en';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'কোর্সে ভর্তি হওয়ার জন্য কি আগের কোনো ডিজিটাল মার্কেটিং অভিজ্ঞতা লাগবে?',
      aBn: 'না, কোনো পূর্ব অভিজ্ঞতার প্রয়োজন নেই। আমাদের প্রতিটি কোর্স একদম শূন্য (বেসিক লেভেল) থেকে শুরু করে ধাপে ধাপে অ্যাডভান্সড লেভেল পর্যন্ত শেখানো হয়। সাধারণ কম্পিউটার ও ব্রাউজিং জানা থাকলেই যে কেউ শিখতে পারবেন।'
    },
    {
      qBn: '১ মাস, ২ মাস এবং ৩ মাসের কোর্সের মধ্যে পার্থক্য কী?',
      aBn: '১ মাসের কোর্স হলো ফাস্ট-ট্র্যাক ফাউন্ডেশন যেখানে মূল বিষয়গুলো শেখানো হয়। ২ মাসের কোর্সে অ্যাডভান্সড টুলস (যেমন GA4, GTM ট্র্যাকিং বা টেকনিক্যাল এসইও) ও মার্কেটপ্লেস গাইডলাইন অন্তর্ভুক্ত থাকে। ৩ মাসের মাস্টারক্লাস হলো ক্লায়েন্টের রিয়েল লাইভ অ্যাড স্পেন্ড বাজেট দিয়ে সরাসরি লাইভ প্রজেক্ট পরিচালনা এবং ১-অন-১ ক্যারিয়ার মেন্টরিং।'
    },
    {
      qBn: 'লাইভ ক্লাসে অংশ নিতে না পারলে কি ক্লাসের রেকর্ডিং পাওয়া যাবে?',
      aBn: 'হ্যাঁ, প্রতিটি লাইভ ক্লাসের ফুল HD রেকর্ডিং ক্লাস শেষ হওয়ার ২ ঘণ্টার মধ্যে স্টুডেন্ট পোর্টালে যুক্ত হয়। আপনি আজীবন এই রেকর্ডিং ও রিসোর্স শিট এক্সেস করতে পারবেন।'
    },
    {
      qBn: 'বিকাশ বা নগদে পেমেন্ট করার পর কী করতে হবে?',
      aBn: 'পেমেন্ট সম্পন্ন করার পর প্রাপ্ত Transaction ID (TrxID) আমাদের অনলাইন ভর্তি ফরমে দিয়ে সাবমিট করলেই তাৎক্ষণিক অফিসিয়াল ভর্তি স্লিপ পেয়ে যাবেন। এরপর আমাদের একাডেমি কো-অর্ডিনেটর আপনাকে ফোন করে ব্যাচ ও ওরিয়েন্টেশনের বিস্তারিত কনফার্ম করবেন।'
    },
    {
      qBn: 'কোর্স সমাপ্তির পর কি কোনো সার্টিফিকেট প্রদান করা হয়?',
      aBn: 'হ্যাঁ, কোর্স সমাপ্তির পর প্র্যাকটিক্যাল প্রজেক্ট মূল্যায়নের ভিত্তিতে স্কিল হাউস একাডেমির পক্ষ থেকে আন্তর্জাতিক মানসম্পন্ন ভেরিফায়েবল ডিজিটাল ও প্রিন্টেড সার্টিফিকেট প্রদান করা হয়।'
    },
    {
      qBn: 'ফ্রিল্যান্সিং বা চাকরি পাওয়ার জন্য একাডেমি কীভাবে সহায়তা করে?',
      aBn: 'আমাদের কোর্সে সরাসরি Upwork ও Fiverr একাউন্ট অপ্টিমাইজেশন, উইনিং প্রপোজাল লেখার কৌশল, লিঙ্কডইন ব্র্যান্ডিং এবং রিমোট জব ইন্টারভিউয়ের বাস্তব টিপস ও ওয়ান-টু-ওয়ান সিভি রিভিউ দেওয়া হয়।'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>সচরাচর জিজ্ঞাসিত প্রশ্নাবলী</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-serif">
            সাধারণ প্রশ্ন ও উত্তর (FAQ)
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            কোর্সের ফি, মেয়াদ ও ভর্তির নিয়মাবলী সংক্রান্ত সাধারণ প্রশ্নের স্পষ্ট উত্তর।
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {faq.qBn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.aBn}
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
