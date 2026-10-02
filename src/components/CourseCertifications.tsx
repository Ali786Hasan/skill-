import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  Search, 
  Building2, 
  Sparkles, 
  BadgeCheck, 
  Globe, 
  FileCheck,
  GraduationCap
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/courses';

interface CourseCertificationsProps {
  onOpenEnrollment: (courseId?: string) => void;
  lang: 'bn' | 'en';
}

interface CertificationBadge {
  id: string;
  nameBn: string;
  nameEn: string;
  organization: string;
  category: string;
  iconBg: string;
  borderColor: string;
  descriptionBn: string;
  credentialUrl: string;
  officialTag: string;
}

const INDUSTRY_BADGES: CertificationBadge[] = [
  {
    id: 'google-ads-cert',
    nameBn: 'Google Ads সার্টিফায়েড প্রফেশনাল',
    nameEn: 'Google Ads Search & Display Certified',
    organization: 'Google Skillshop Alignment',
    category: 'PPC & Ad Tech',
    iconBg: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-200',
    descriptionBn: 'গুগল সার্চ নেটওয়ার্ক, পারফরম্যান্স ম্যাক্স ও কনভার্সন অপ্টিমাইজেশনের আন্তর্জাতিক সিলেবাস অন্তর্ভুক্ত।',
    credentialUrl: 'https://skillshop.exceedlms.com/',
    officialTag: 'গুগল স্কিলশপ স্ট্যান্ডার্ড'
  },
  {
    id: 'google-maps-cert',
    nameBn: 'Google My Business ও Local SEO মাস্টার',
    nameEn: 'Google Business Profile Optimization Master',
    organization: 'Local Search Association Standard',
    category: 'Local Search & Maps',
    iconBg: 'bg-emerald-50 text-emerald-600',
    borderColor: 'border-emerald-200',
    descriptionBn: 'গুগল ম্যাপস ৩-প্যাক র্যাঙ্কিং, NAP সাইটেশন ও লোকাল বিজনেসের গ্রাহক আকর্ষণ কৌশলের ভেরিফায়েড স্বীকৃতি।',
    credentialUrl: 'https://support.google.com/business',
    officialTag: 'লোকাল সার্চ অথরিটি'
  },
  {
    id: 'hubspot-crm-cert',
    nameBn: 'HubSpot CRM ও মার্কেটিং অটোমেশন স্পেশালিস্ট',
    nameEn: 'HubSpot Inbound & Sales Automation',
    organization: 'HubSpot Academy Alignment',
    category: 'CRM & Pipeline',
    iconBg: 'bg-amber-50 text-amber-600',
    borderColor: 'border-amber-200',
    descriptionBn: 'মাল্টি-চ্যানেল লিড নার্চারিং, ড্রিপ ইমেইল অটোমেশন ও এন্টারপ্রাইজ সিআরএম পরিচালনার স্বীকৃতি।',
    credentialUrl: 'https://academy.hubspot.com/',
    officialTag: 'ইনবাউন্ড অটোমেশন'
  },
  {
    id: 'seo-growth-cert',
    nameBn: 'প্রফেশনাল এসইও ও অর্গানিক সার্চ স্ট্র্যাটেজিস্ট',
    nameEn: 'Advanced SEO & Technical Audit Specialist',
    organization: 'Ahrefs & SEMrush Audit Standard',
    category: 'SEO & Analytics',
    iconBg: 'bg-purple-50 text-purple-600',
    borderColor: 'border-purple-200',
    descriptionBn: 'টেকনিক্যাল সাইট অডিট, কিওয়ার্ড রিসার্চ এবং গুগল অ্যালগরিদম কমপ্লায়েন্স পরিচালনার সার্টিফিকেট।',
    credentialUrl: 'https://www.semrush.com/academy/',
    officialTag: 'সার্চ র্যাঙ্কিং স্ট্যান্ডার্ড'
  }
];

export const CourseCertifications: React.FC<CourseCertificationsProps> = ({
  onOpenEnrollment,
  lang
}) => {
  const [verifyId, setVerifyId] = useState('SKH-CERT-2026-9812');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{
    status: 'valid' | 'invalid' | null;
    studentName?: string;
    courseName?: string;
    issueDate?: string;
    grade?: string;
    certId?: string;
  } | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyId.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (verifyId.trim().toUpperCase() === 'SKH-CERT-2026-9812' || verifyId.includes('SH-') || verifyId.includes('SKH')) {
        setVerifyResult({
          status: 'valid',
          certId: verifyId.trim().toUpperCase(),
          studentName: 'তানভীর হাসান (Tanvir Hasan)',
          courseName: 'Google Ads প্রফেশনাল ট্রেনিং ও কনভার্সন অপ্টিমাইজেশন',
          issueDate: '২৮ সেপ্টেম্বর, ২০২৬',
          grade: 'Distinction (A+ · ৯৬% প্রজেক্ট স্কোর)'
        });
      } else {
        setVerifyResult({
          status: 'invalid'
        });
      }
    }, 600);
  };

  return (
    <section id="certifications" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>ভেরিফায়েড প্রফেশনাল সার্টিফিকেট</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif tracking-tight">
            কোর্স সম্পন্ন করে অর্জন করুন আন্তর্জাতিক মানের স্বীকৃত সার্টিফিকেট
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            স্কিল হাউস একাডেমির প্রতিটি সার্টিফিকেট কিউআর কোড (QR Code) এবং অনলাইন ডিজিটাল ভেরিফিকেশন আইডি সমৃদ্ধ। দেশীয় ও আন্তর্জাতিক ফ্রিল্যান্স মার্কেটপ্লেস ও কর্পোরেট চাকরিতে সরাসরি ব্যবহারযোগ্য।
          </p>
        </div>

        {/* 2-Column Showcase: Certificate Card Preview + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Interactive Realistic Certificate Preview Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl">
              
              {/* Certificate Inner Frame */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-4 border-amber-600/20 relative overflow-hidden text-center space-y-4">
                
                {/* Certificate Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                  <GraduationCap className="w-80 h-80 text-slate-950" />
                </div>

                {/* Academy Header */}
                <div className="border-b border-amber-200 pb-3 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-mono tracking-widest text-amber-800 uppercase block font-semibold">
                      OFFICIAL CREDENTIAL
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-serif">
                      SKILL HOUSE DIGITAL MARKETING ACADEMY
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-mono font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Certificate Main Title */}
                <div className="pt-2">
                  <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">
                    CERTIFICATE OF PROFESSIONAL EXCELLENCE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
                    সনদপত্র ও পেশাদার প্রশিক্ষণ স্বীকৃতি
                  </h3>
                  <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-2" />
                </div>

                {/* Recipient Details */}
                <div className="space-y-1 pt-1">
                  <span className="text-xs text-slate-500 block">এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, সফলতার সাথে সম্পন্ন করেছেন:</span>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 font-serif underline decoration-amber-400 decoration-2 underline-offset-4">
                    তানভীর হাসান (Tanvir Hasan)
                  </div>
                  <div className="text-xs text-slate-600 font-medium pt-1">
                    কোর্স: <strong className="text-emerald-800">Google Ads ও ডিজিটাল মার্কেটিং প্রফেশনাল প্রোগ্রাম</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    গ্রেড: Distinction (A+ · ৯৬% অ্যাসাইনমেন্ট ও লাইভ প্রজেক্ট স্কোর)
                  </div>
                </div>

                {/* Signatures & QR Code Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-end justify-between text-left">
                  
                  {/* Left: Lead Instructor Signature */}
                  <div className="space-y-1">
                    <div className="text-xs font-serif italic text-slate-800 font-bold">
                      Sadia Rahman
                    </div>
                    <div className="w-24 h-px bg-slate-300" />
                    <div className="text-[10px] text-slate-500 font-medium">সাদিয়া রহমান</div>
                    <div className="text-[9px] text-slate-400">লিড ট্রেনার, স্কিল হাউস একাডেমি</div>
                  </div>

                  {/* Center: Gold Foil Academy Seal Badge */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 text-slate-950 flex flex-col items-center justify-center shadow-lg border-2 border-amber-100 shrink-0">
                    <Award className="w-5 h-5 text-amber-950 fill-amber-950" />
                    <span className="text-[8px] font-bold font-mono uppercase tracking-tighter text-amber-950">
                      SEAL
                    </span>
                  </div>

                  {/* Right: QR Code for Verification */}
                  <div className="text-right space-y-1">
                    <div className="p-1 bg-slate-100 border border-slate-300 rounded inline-block">
                      <QrCode className="w-7 h-7 text-slate-800" />
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">ID: SKH-CERT-2026-9812</div>
                    <div className="text-[8px] text-emerald-700 font-semibold">স্ক্যান করে অনলাইনে যাচাইযোগ্য</div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Key Benefits & Online Verification Search (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-900 font-serif">
                কেন স্কিল হাউস একাডেমির সার্টিফিকেট বিশ্বস্ত?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                আমাদের প্রতিটি সনদপত্র আন্তর্জাতিক প্রমিত সিলেবাস অনুযায়ী ক্লায়েন্ট প্রজেক্ট জমা দেওয়ার পর মূল্যায়ন কমিটির যাচাইয়ের মাধ্যমে ইস্যু করা হয়।
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">ইউনিক ডিজিটাল ভেরিফিকেশন আইডি</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    যেকোনো নিয়োগকর্তা বা ক্লায়েন্ট আমাদের পোর্টালে সরাসরি আইডি সার্চ করে সার্টিফিকেটের সত্যতা যাচাই করতে পারবেন।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">LinkedIn ও ফ্রিল্যান্স প্রোফাইলে যুক্ত করার সুবিধা</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Upwork, Fiverr এবং LinkedIn প্রোফাইলের 'Licenses & Certifications' সেকশনে সরাসরি ভেরিফিকেশন লিঙ্ক যুক্ত করা যায়।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">হার্ডকপি ও অফিসিয়াল সিলযুক্ত প্রিন্টেড সার্টিফিকেট</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    রংপুরের ধাপ একাডেমি অফিস থেকে মূল সনদপত্র গ্রহণ করতে পারবেন অথবা সুন্দরবন কুরিয়ারে নিজ ঠিকানায় পৌঁছানো হয়।
                  </p>
                </div>
              </div>
            </div>

            {/* Instant Online Verification Input Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-emerald-600" />
                  <span>সার্টিফিকেট আইডি যাচাই করুন (Instant Verification)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">DEMO READY</span>
              </div>

              <form onSubmit={handleVerify} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verifyId}
                    onChange={e => setVerifyId(e.target.value)}
                    placeholder="যেমন: SKH-CERT-2026-9812"
                    className="flex-1 px-3 py-2 text-xs font-mono uppercase bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    {isVerifying ? 'যাচাই হচ্ছে...' : 'যাচাই করুন'}
                  </button>
                </div>
              </form>

              {/* Verification Result Feedback */}
              {verifyResult && verifyResult.status === 'valid' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>সার্টিফিকেটটি বৈধ ও স্কিল হাউস একাডেমি কর্তৃক অনুমোদিত</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-700 pt-1">
                    <div>শিক্ষার্থী: <strong>{verifyResult.studentName}</strong></div>
                    <div>ইস্যু তারিখ: <strong className="font-mono">{verifyResult.issueDate}</strong></div>
                    <div className="col-span-2">কোর্স: <strong>{verifyResult.courseName}</strong></div>
                    <div className="col-span-2 text-emerald-800 font-medium">গ্রেড: {verifyResult.grade}</div>
                  </div>
                </div>
              )}

              {verifyResult && verifyResult.status === 'invalid' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                  কোনো ভেরিফায়েড সার্টিফিকেট পাওয়া যায়নি। অনুগ্রহ করে আইডি সঠিক কিনা তা পুনরায় চেক করুন।
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Industry Standards & Partner Alignment Badges */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-serif">
                আন্তর্জাতিক ইন্ডাস্ট্রি স্ট্যান্ডার্ড ও প্ল্যাটফর্ম সিলেবাস
              </h4>
              <p className="text-xs text-slate-500">
                আমাদের প্রতিটি কোর্সের সিলেবাস বিশ্ববিখ্যাত প্ল্যাটফর্মগুলোর অফিসিয়াল সার্টিফিকেশনের সাথে শতভাগ সামঞ্জস্যপূর্ণ।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRY_BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 bg-white rounded-2xl border ${badge.borderColor} shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`p-2 rounded-xl ${badge.iconBg} font-mono font-bold text-xs`}>
                      <BadgeCheck className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {badge.officialTag}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {badge.nameBn}
                    </h5>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {badge.organization}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {badge.descriptionBn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{badge.category}</span>
                  <a
                    href={badge.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>সিলেবাস স্ট্যান্ডার্ড</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 p-6 sm:p-8 bg-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
              দক্ষতা অর্জন করে নিজের স্বীকৃত ভেরিফায়েড সার্টিফিকেট পান
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              অনলাইনে ভর্তি ফরম পূরণ করুন এবং পরবর্তী ব্যাচে আপনার আসন নিশ্চিত করে ক্যারিয়ার গড়ে তুলুন।
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnrollment()}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
          >
            ভর্তি নিশ্চিত করুন
          </button>
        </div>

      </div>
    </section>
  );
};
