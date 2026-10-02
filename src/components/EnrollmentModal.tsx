import React, { useState, useEffect } from 'react';
import { X, Check, Copy, CheckCircle2, ArrowRight, ArrowLeft, Printer, ShieldAlert, Sparkles, MessageSquare, Clock, Lock } from 'lucide-react';
import { COURSES, ACADEMY_INFO } from '../data/courses';
import { CourseDuration, StudentEnrollment } from '../types';
import { generateStudentId, saveEnrollment } from '../utils/storage';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
  initialDuration?: CourseDuration;
  onEnrollmentComplete?: (enrollment: StudentEnrollment) => void;
  lang: 'bn' | 'en';
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialCourseId,
  initialDuration,
  onEnrollmentComplete,
  lang
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId || COURSES[0].id);
  const [selectedDuration, setSelectedDuration] = useState<CourseDuration>(initialDuration || '2-months');
  
  // Student Information
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('ঢাকা');
  const [goal, setGoal] = useState('ফ্রিল্যান্সিং (Upwork / Fiverr)');
  const [batchPreference, setBatchPreference] = useState('সন্ধ্যার ব্যাচ (রাত ৮:০০ - ৯:৩০)');

  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Confirmed Enrollment Result
  const [confirmedEnrollment, setConfirmedEnrollment] = useState<StudentEnrollment | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
    if (initialDuration) {
      setSelectedDuration(initialDuration);
    }
  }, [initialCourseId, initialDuration]);

  if (!isOpen) return null;

  const currentCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  const currentPlan = currentCourse.pricing.find(p => p.durationKey === selectedDuration) || currentCourse.pricing[0];

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(ACADEMY_INFO.bkashNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const validateStep2 = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'আপনার পূর্ণ নাম লিখুন';
    if (!phoneNumber.trim()) {
      err.phoneNumber = 'মোবাইল নম্বর লিখুন';
    } else if (phoneNumber.replace(/[^0-9]/g, '').length < 11) {
      err.phoneNumber = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)';
    }
    if (!email.trim() || !email.includes('@')) {
      err.email = 'সঠিক ইমেইল এড্রেস লিখুন';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = () => {
    const err: Record<string, string> = {};
    if (!senderNumber.trim() || senderNumber.replace(/[^0-9]/g, '').length < 11) {
      err.senderNumber = 'যে নম্বর থেকে পেমেন্ট করেছেন সেই নম্বরটি লিখুন';
    }
    if (!transactionId.trim() || transactionId.trim().length < 6) {
      err.transactionId = 'বিকাশ SMS থেকে পাওয়া সঠিক Transaction ID লিখুন';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        if (!senderNumber) setSenderNumber(phoneNumber);
        setStep(3);
      }
    } else if (step === 3) {
      if (validateStep3()) {
        const studentId = generateStudentId();
        const newEnrollment: StudentEnrollment = {
          id: `enr-${Date.now()}`,
          studentId,
          courseId: currentCourse.id,
          courseTitleBn: currentCourse.titleBn,
          courseTitleEn: currentCourse.titleEn,
          durationKey: currentPlan.durationKey,
          durationLabelBn: currentPlan.durationLabelBn,
          amount: currentPlan.price,
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
          city: city.trim(),
          goal,
          batchPreference,
          paymentMethod,
          senderNumber: senderNumber.trim(),
          transactionId: transactionId.trim().toUpperCase(),
          status: 'pending_verification',
          createdAt: new Date().toISOString()
        };

        saveEnrollment(newEnrollment);
        setConfirmedEnrollment(newEnrollment);
        if (onEnrollmentComplete) {
          onEnrollmentComplete(newEnrollment);
        }
        setStep(4);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div>
            <div className="text-xs text-emerald-400 font-medium">SKILL HOUSE ADMISSION</div>
            <h3 className="text-lg font-bold font-serif">
              {lang === 'bn' ? 'অনলাইন ভর্তি ফরম' : 'Online Admission Form'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Step Progress Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 no-print">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className={`py-1 rounded ${step >= 1 ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : 'text-slate-400'}`}>
              ১. কোর্স পছন্দ
            </div>
            <div className={`py-1 rounded ${step >= 2 ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : 'text-slate-400'}`}>
              ২. আপনার তথ্য
            </div>
            <div className={`py-1 rounded ${step >= 3 ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : 'text-slate-400'}`}>
              ৩. বিকাশ পেমেন্ট
            </div>
            <div className={`py-1 rounded ${step >= 4 ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : 'text-slate-400'}`}>
              ৪. ভর্তি নিশ্চিতকরণ
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: COURSE & DURATION SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  ধাপ ১: আপনার পছন্দের কোর্সটি বেছে নিন
                </h4>
                <div className="space-y-2">
                  {COURSES.map(course => (
                    <label
                      key={course.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedCourseId === course.id
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="courseSelect"
                        value={course.id}
                        checked={selectedCourseId === course.id}
                        onChange={() => setSelectedCourseId(course.id)}
                        className="mt-1 accent-emerald-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 text-sm">{course.titleBn}</span>
                          <span className="text-xs text-slate-500 font-mono">আগামী ব্যাচ: {course.nextBatchBn}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{course.summaryBn}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  প্রশিক্ষণের মেয়াদ ও ফি নির্বাচন করুন
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentCourse.pricing.map(plan => (
                    <button
                      key={plan.durationKey}
                      type="button"
                      onClick={() => setSelectedDuration(plan.durationKey)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedDuration === plan.durationKey
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-semibold text-slate-700">{plan.durationLabelBn}</div>
                      <div className="text-lg font-bold font-mono text-emerald-700 my-1">
                        {plan.priceFormattedBn}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-2">
                        {plan.featuresBn[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300">নির্বাচিত কোর্সের মোট ফি</div>
                  <div className="text-xs text-emerald-400 font-medium">{currentCourse.titleBn} ({currentPlan.durationLabelBn})</div>
                </div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {currentPlan.priceFormattedBn}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: STUDENT DETAILS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  ধাপ ২: অনলাইন ভর্তি ফরম পূরণ করুন
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  সঠিক তথ্য দিন, এই তথ্যের ভিত্তিতে আপনার ভেরিফায়েড সার্টিফিকেট ইস্যু হবে।
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  আপনার পূর্ণ নাম (সার্টিফিকেট অনুযায়ী) *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    মোবাইল নম্বর (হোয়াটসঅ্যাপ সচল) *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    ইমেইল এড্রেস *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    আপনার বর্তমান জেলা / শহর
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="যেমন: ঢাকা / চট্টগ্রাম / সিলেট"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    শেখার মূল লক্ষ্য
                  </label>
                  <select
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                  >
                    <option value="ফ্রিল্যান্সিং (Upwork / Fiverr)">ফ্রিল্যান্সিং (Upwork / Fiverr)</option>
                    <option value="আন্তর্জাতিক রিমোট জব">আন্তর্জাতিক রিমোট জব</option>
                    <option value="নিজস্ব ব্যবসার ডিজিটাল মার্কেটিং">নিজস্ব ব্যবসার ডিজিটাল মার্কেটিং</option>
                    <option value="লোকাল এজেন্সি জব / ক্যারিয়ার সুইচ">লোকাল এজেন্সি জব / ক্যারিয়ার সুইচ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  পছন্দের ক্লাস শিডিউল
                </label>
                <select
                  value={batchPreference}
                  onChange={e => setBatchPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                >
                  <option value="সন্ধ্যার ব্যাচ (রাত ৮:০০ - ৯:৩০)">সন্ধ্যার ব্যাচ (রাত ৮:০০ - ৯:৩০)</option>
                  <option value="বিকালের ব্যাচ (বিকাল ৪:০০ - ৫:৩০)">বিকালের ব্যাচ (বিকাল ৪:০০ - ৫:৩০)</option>
                  <option value="উইকেন্ড স্পেশাল ব্যাচ (শুক্র ও শনিবার)">উইকেন্ড স্পেশাল ব্যাচ (শুক্র ও শনিবার)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: BKASH PAYMENT */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  ধাপ ৩: বিকাশের মাধ্যমে পেমেন্ট সম্পন্ন করুন
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  আপনার নির্বাচিত কোর্সের ফি পরিশোধ করে Transaction ID নিচে দিন।
                </p>
              </div>

              {/* Payment Method Switcher */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'bKash'
                      ? 'border-pink-600 bg-pink-50 text-pink-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                  <span>bKash (বিকাশ)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'Nagad'
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                  <span>Nagad (নগদ)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Rocket')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'Rocket'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  <span>Rocket (রকেট)</span>
                </button>
              </div>

              {/* Payment Box Instructions */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">
                    অ্যাকাউন্ট নম্বর ({paymentMethod} পার্সোনাল/মার্চেন্ট):
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-slate-900">
                      {ACADEMY_INFO.bkashNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="p-1 text-slate-500 hover:text-emerald-700 text-xs flex items-center gap-1 rounded bg-white border border-slate-200 px-1.5"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? 'কপি হয়েছে' : 'কপি'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
                  <span className="text-slate-600">প্রদেয় ফি পরিমাণ:</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    {currentPlan.priceFormattedBn} (BDT {currentPlan.price})
                  </span>
                </div>

                {/* Step by Step payment instructions */}
                <div className="bg-white p-3 rounded-lg border border-slate-200/80 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <p className="font-semibold text-slate-800">পেমেন্ট করার নিয়মাবলী:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>আপনার {paymentMethod} অ্যাপ ওপেন করুন বা *247# ডায়াল করুন</li>
                    <li><strong>Send Money</strong> অথবা <strong>Payment</strong> অপশন নির্বাচন করুন</li>
                    <li>প্রাপক নম্বরে <strong className="text-slate-900 font-mono">{ACADEMY_INFO.bkashNumber}</strong> দিন</li>
                    <li>টাকার পরিমাণ <strong>{currentPlan.price}</strong> টাকা দিন</li>
                    <li>রেফারেন্সে আপনার নাম বা মোবাইল নম্বর দিন</li>
                    <li>পেমেন্ট কনফার্মেশনের পর প্রাপ্ত <strong>Transaction ID</strong> নিচে লিখে সাবমিট করুন</li>
                  </ol>
                </div>
              </div>

              {/* Sender & TrxID Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    যে নম্বর থেকে পেমেন্ট করেছেন *
                  </label>
                  <input
                    type="tel"
                    value={senderNumber}
                    onChange={e => setSenderNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                  {errors.senderNumber && <p className="text-xs text-red-600 mt-1">{errors.senderNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Transaction ID (TrxID) *
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={e => setTransactionId(e.target.value.toUpperCase())}
                    placeholder="যেমন: BLA9X192K"
                    className="w-full px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                  {errors.transactionId && <p className="text-xs text-red-600 mt-1">{errors.transactionId}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ADMISSION CONFIRMED / OFFICIAL SLIP */}
          {step === 4 && confirmedEnrollment && (
            <div className="space-y-6">
              
              {/* Pending Verification Notice */}
              <div className="text-center space-y-2 no-print">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Clock className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-serif">
                  আবেদন গৃহীত হয়েছে — পেমেন্ট অনুমোদনের অপেক্ষায়
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  আপনার ট্রানজেকশন আইডি (<strong className="font-mono text-slate-900">{confirmedEnrollment.transactionId}</strong>) সিস্টেমে জমা হয়েছে। <span className="text-amber-800 font-semibold">অ্যাডমিন বা সাব-অ্যাডমিন প্যানেল থেকে পেমেন্ট যাচাই ও অনুমোদন না দেওয়া পর্যন্ত আপনার ভর্তি অপেক্ষমাণ (Pending) থাকবে।</span>
                </p>
              </div>

              {/* Printable Official Admission Receipt Slip with Status Indicator */}
              <div className="border border-slate-300 rounded-xl p-5 bg-white space-y-4 shadow-xs" id="admission-receipt">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-base font-bold text-slate-900 font-serif">SKILL HOUSE ACADEMY</div>
                    <div className="text-xs text-slate-500">শিক্ষার্থী ভর্তি আবেদন ও প্রভিশনাল স্লিপ</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">ট্র্যাকিং স্টুডেন্ট আইডি:</div>
                    <div className="text-sm font-mono font-bold text-emerald-700">
                      {confirmedEnrollment.studentId}
                    </div>
                  </div>
                </div>

                {/* Prominent Pending Banner */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-medium">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>পেমেন্ট স্ট্যাটাস: <strong>অনুমোদনের অপেক্ষায় (Pending Approval)</strong></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded">
                    যাচাই প্রক্রিয়াধীন
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">শিক্ষার্থীর নাম:</span>
                    <span className="font-semibold text-slate-900">{confirmedEnrollment.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">মোবাইল নম্বর:</span>
                    <span className="font-semibold text-slate-900 font-mono">{confirmedEnrollment.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">কোর্সের নাম:</span>
                    <span className="font-semibold text-slate-900">{confirmedEnrollment.courseTitleBn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">কোর্সের মেয়াদ:</span>
                    <span className="font-semibold text-slate-900">{confirmedEnrollment.durationLabelBn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">পেমেন্ট মেথড:</span>
                    <span className="font-semibold text-slate-900">{confirmedEnrollment.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Transaction ID:</span>
                    <span className="font-semibold font-mono text-slate-900">{confirmedEnrollment.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">পরিশোধিত ফি:</span>
                    <span className="font-bold font-mono text-emerald-700 text-sm">৳{confirmedEnrollment.amount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">আবেদনের তারিখ:</span>
                    <span className="text-slate-700">{new Date(confirmedEnrollment.createdAt).toLocaleDateString('bn-BD')}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>ঠিকানা: {ACADEMY_INFO.addressBn}</span>
                  <span>হেল্পলাইন: {ACADEMY_INFO.phone}, {ACADEMY_INFO.phoneAlt}</span>
                </div>
              </div>

              {/* Action Links after confirmation */}
              <div className="space-y-2 no-print">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
                  <div className="text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>অরিয়েন্টেশন ও ক্লাস গ্রুপ লিংক (অনুমোদন সাপেক্ষ)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    অ্যাডমিন কর্তৃক পেমেন্ট অনুমোদন করার পর স্টুডেন্ট পোর্টাল থেকে লাইভ ক্লাস লিংক স্বয়ংক্রিয়ভাবে সক্রিয় হবে।
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="py-2.5 px-3 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>রসিদ প্রিন্ট / PDF সেভ</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 text-center"
                  >
                    সম্পন্ন করুন
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between no-print">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>পূর্ববর্তী ধাপ</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>
                {step === 1 && 'পরবর্তী: আপনার তথ্য দিন'}
                {step === 2 && 'পরবর্তী: বিকাশ পেমেন্ট তথ্য'}
                {step === 3 && 'ভর্তি নিশ্চিত করুন'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
