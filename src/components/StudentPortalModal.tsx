import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Printer, MessageSquare, AlertCircle, Phone, TrendingUp, FileText, Trophy, Lock, XCircle } from 'lucide-react';
import { findEnrollmentByQuery } from '../utils/storage';
import { StudentEnrollment } from '../types';
import { ACADEMY_INFO } from '../data/courses';
import { StudentProgress } from './StudentProgress';
import { TopPerformers } from './TopPerformers';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnrollment: () => void;
  lang: 'bn' | 'en';
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenEnrollment,
  lang
}) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<StudentEnrollment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'progress' | 'leaderboard' | 'receipt'>('progress');
  const [showLeaderboardBeforeSearch, setShowLeaderboardBeforeSearch] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = findEnrollmentByQuery(query);
    setResult(found || null);
    setHasSearched(true);
    setActiveTab('progress');
    setShowLeaderboardBeforeSearch(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div>
            <div className="text-xs text-emerald-400 font-medium font-mono">STUDENT PORTAL</div>
            <h3 className="text-lg font-bold font-serif">
              শিক্ষার্থী পোর্টাল ও কোর্স প্রগ্রেস
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleSearch} className="no-print space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              আপনার মোবাইল নম্বর অথবা স্টুডেন্ট আইডি দিন:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="যেমন: 01812345678 বা SH-88412"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
              >
                খুঁজুন
              </button>
            </div>
            <div className="text-[11px] text-slate-400">
              ডেমো চেক করতে দিন: <span className="font-mono font-medium text-slate-600">01812345678</span>
            </div>
          </form>

          {/* Quick Leaderboard Toggle Before Search */}
          {!hasSearched && (
            <div className="pt-1 no-print">
              <button
                type="button"
                onClick={() => setShowLeaderboardBeforeSearch(!showLeaderboardBeforeSearch)}
                className="w-full py-2.5 px-3.5 rounded-xl border border-amber-200 bg-amber-50/80 hover:bg-amber-100/90 text-amber-950 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>একাডেমির শীর্ষ ৫ পারফর্মার লিডারবোর্ড দেখুন</span>
                </div>
                <span className="text-[11px] text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded font-mono font-medium">
                  {showLeaderboardBeforeSearch ? 'লুকান' : 'ওপেন করুন'}
                </span>
              </button>

              {showLeaderboardBeforeSearch && (
                <div className="mt-4 pt-1">
                  <TopPerformers />
                </div>
              )}
            </div>
          )}

          {/* Search Result */}
          {hasSearched && result && (
            <div className="space-y-4 pt-2">
              
              {/* STATUS 1: PENDING VERIFICATION BANNER */}
              {result.status === 'pending_verification' && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2 no-print">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-950 text-xs font-bold">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
                      <span>ভর্তি স্ট্যাটাস: <strong>পেমেন্ট অনুমোদনের অপেক্ষায় (Pending Approval)</strong></span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                      {result.studentId}
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    আপনার সাবমিট করা ট্রানজেকশন আইডি (<strong className="font-mono text-slate-900">{result.transactionId}</strong>) অ্যাকাউন্টে অপেক্ষমাণ রয়েছে। <span className="font-semibold text-amber-950">অ্যাডমিন বা সাব-অ্যাডমিন প্যানেল থেকে ট্রানজেকশন যাচাই করে অনুমোদন না দেওয়া পর্যন্ত কোর্স অ্যাক্সেস, ক্লাস লিংক ও মূল সার্টিফিকেট প্রদান স্থগিত ও অপেক্ষায় থাকবে।</span>
                  </p>
                </div>
              )}

              {/* STATUS 2: REJECTED BANNER */}
              {result.status === 'rejected' && (
                <div className="p-4 bg-red-50 border border-red-300 rounded-2xl space-y-1.5 no-print">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-red-900 font-bold">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>ভর্তি স্ট্যাটাস: <strong>পেমেন্ট বাতিলকৃত (Rejected)</strong></span>
                    </div>
                    <span className="font-mono text-xs font-bold text-red-700">{result.studentId}</span>
                  </div>
                  <p className="text-xs text-red-800 leading-relaxed">
                    কারণ: <span className="font-semibold">{result.rejectionReason || 'ভুল ট্রানজেকশন আইডি বা অপর্যাপ্ত ফি'}</span>। সঠিক তথ্য দিয়ে পুনরায় পেমেন্ট করুন অথবা হেল্পলাইনে যোগাযোগ করুন।
                  </p>
                </div>
              )}

              {/* STATUS 3: CONFIRMED & ACTIVE BANNER */}
              {result.status === 'confirmed' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between no-print">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ভর্তি স্ট্যাটাস: <strong>অনুমোদিত ও সক্রিয় (Approved)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">স্টুডেন্ট আইডি:</span>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                      {result.studentId}
                    </span>
                  </div>
                </div>
              )}

              {/* View Switcher 3 Tabs (Progress, Leaderboard, Slip) */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs no-print">
                <button
                  type="button"
                  onClick={() => setActiveTab('progress')}
                  className={`flex-1 py-2 px-2.5 rounded-md font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'progress'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কোর্স প্রগ্রেস</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('leaderboard')}
                  className={`flex-1 py-2 px-2.5 rounded-md font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'leaderboard'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>টপ ৫ পারফর্মার</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('receipt')}
                  className={`flex-1 py-2 px-2.5 rounded-md font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'receipt'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>ভর্তি রসিদ</span>
                </button>
              </div>

              {/* Tab 1: Module Circular Progress Tracker */}
              {activeTab === 'progress' && (
                <div className="pt-1">
                  {result.status === 'pending_verification' ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-serif">
                        পেমেন্ট অনুমোদন সাপেক্ষে কোর্স প্রগ্রেস উন্মুক্ত হবে
                      </h4>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        আপনার ট্রানজেকশনটি বর্তমানে অ্যাডমিন ভেরিফিকেশন কিউতে রয়েছে। অ্যাডমিন অনুমোদন দেওয়া মাত্রই আপনার ব্যাচ শিডিউল, ক্লাস মডিউল ও প্রগ্রেস ট্র্যাকার স্বয়ংক্রিয়ভাবে আনলক হয়ে যাবে।
                      </p>
                      <div className="pt-1">
                        <span className="text-[11px] font-mono text-amber-700 bg-amber-100 px-3 py-1 rounded-full font-semibold">
                          স্ট্যাটাস: অপেক্ষমাণ (Pending Admin Verification)
                        </span>
                      </div>
                    </div>
                  ) : result.status === 'rejected' ? (
                    <div className="p-6 bg-red-50 rounded-2xl border border-red-200 text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-red-900 font-serif">
                        ভর্তি প্রক্রিয়া বাতিল করা হয়েছে
                      </h4>
                      <p className="text-xs text-red-700 max-w-sm mx-auto">
                        পেমেন্ট যাচাইয়ে অসংগতি থাকায় প্রগ্রেস অ্যাক্সেস বন্ধ রয়েছে। অনুগ্রহ করে হেল্পলাইনে যোগাযোগ করুন।
                      </p>
                    </div>
                  ) : (
                    <StudentProgress enrollment={result} />
                  )}
                </div>
              )}

              {/* Tab 2: Top Performers Leaderboard */}
              {activeTab === 'leaderboard' && (
                <div className="pt-1">
                  <TopPerformers currentStudentId={result.studentId} />
                </div>
              )}

              {/* Tab 3: Printable Slip */}
              {activeTab === 'receipt' && (
                <div className="space-y-4">
                  <div className="border border-slate-300 rounded-xl p-5 bg-white space-y-3.5 shadow-xs" id="printable-portal-slip">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <div className="text-sm font-bold text-slate-900 font-serif">SKILL HOUSE ACADEMY</div>
                        <div className="text-xs text-slate-500">
                          {result.status === 'pending_verification' ? 'শিক্ষার্থী ভর্তি বিবরণী ও প্রভিশনাল স্লিপ' : 'শিক্ষার্থী ভর্তি বিবরণী ও অফিসিয়াল রসিদ'}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">স্টুডেন্ট আইডি:</span>
                        <span className="font-mono text-sm font-bold text-slate-900">{result.studentId}</span>
                      </div>
                    </div>

                    {/* Status Strip inside slip */}
                    <div className={`p-2.5 rounded-lg text-xs flex items-center justify-between ${
                      result.status === 'pending_verification' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
                      result.status === 'rejected' ? 'bg-red-50 text-red-900 border border-red-200' :
                      'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}>
                      <span className="font-semibold flex items-center gap-1.5">
                        {result.status === 'pending_verification' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                        {result.status === 'confirmed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {result.status === 'rejected' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                        <span>
                          পেমেন্ট স্ট্যাটাস: {result.status === 'pending_verification' ? 'অনুমোদনের অপেক্ষায় (Pending)' : result.status === 'rejected' ? 'বাতিলকৃত (Rejected)' : 'অনুমোদিত ও সক্রিয় (Confirmed)'}
                        </span>
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold">
                        {result.status === 'pending_verification' ? 'যাচাই প্রক্রিয়াধীন' : result.status === 'rejected' ? 'বাতিল' : 'ভেরিফায়েড'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2.5 text-xs">
                      <div>
                        <span className="text-slate-400 block">নাম:</span>
                        <span className="font-semibold text-slate-900">{result.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">মোবাইল:</span>
                        <span className="font-semibold text-slate-900 font-mono">{result.phoneNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">কোর্স:</span>
                        <span className="font-semibold text-slate-900">{result.courseTitleBn}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">মেয়াদ:</span>
                        <span className="font-semibold text-slate-900">{result.durationLabelBn}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ব্যাচ শিডিউল:</span>
                        <span className="text-slate-700">{result.batchPreference}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">পরিশোধিত ফি:</span>
                        <span className="font-mono font-bold text-emerald-700 text-sm">৳{result.amount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">পেমেন্ট মেথড:</span>
                        <span className="text-slate-700">{result.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">TrxID:</span>
                        <span className="font-mono font-semibold text-slate-900">{result.transactionId}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>ঠিকানা: {ACADEMY_INFO.addressBn}</span>
                      <span>হেল্পলাইন: {ACADEMY_INFO.phone}, {ACADEMY_INFO.phoneAlt}</span>
                    </div>
                  </div>

                  {/* Action Buttons for Receipt */}
                  <div className="flex items-center gap-3 no-print">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="flex-1 py-2.5 px-3 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>রসিদ প্রিন্ট করুন</span>
                    </button>

                    {result.status === 'confirmed' ? (
                      <a
                        href="https://chat.whatsapp.com/sample-skill-house-batch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>হোয়াটসঅ্যাপ গ্রুপ</span>
                      </a>
                    ) : (
                      <a
                        href={`tel:${ACADEMY_INFO.phone}`}
                        className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                        title="পেমেন্ট ভেরিফিকেশন হেল্পলাইন"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>হেল্পলাইন কল করুন</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Not Found State */}
          {hasSearched && !result && (
            <div className="p-6 text-center space-y-3 bg-slate-50 rounded-xl border border-slate-200">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="text-sm font-semibold text-slate-900">
                এই তথ্য দিয়ে কোনো সক্রিয় ভর্তি রেকর্ড পাওয়া যায়নি
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                অনুগ্রহ করে আপনার সঠিক মোবাইল নম্বর বা ট্রানজেকশন আইডি দিয়ে পুনরায় চেষ্টা করুন অথবা এখনই নতুন ভর্তি ফরম পূরণ করুন।
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnrollment();
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                >
                  এখনই ভর্তি ফরম পূরণ করুন
                </button>
                <a
                  href={`tel:${ACADEMY_INFO.phone}`}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-white flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>হেল্পলাইনে কল করুন</span>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
