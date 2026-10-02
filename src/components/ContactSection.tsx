import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { ACADEMY_INFO } from '../data/courses';

interface ContactSectionProps {
  onOpenEnrollment: () => void;
  lang: 'bn' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenEnrollment, lang }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCourse, setInquiryCourse] = useState('Google Ads Professional Training');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Block */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-950 to-slate-950 pointer-events-none" />

          <div className="relative max-w-3xl space-y-4">
            <span className="text-xs font-mono font-medium text-emerald-400 tracking-wider">
              TAKE ACTION TODAY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif">
              আজই আপনার প্রশিক্ষণ শুরু করুন!
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              ডিজিটাল মার্কেটিংয়ের দক্ষতা অর্জনের জন্য অপেক্ষা না করে আজই আপনার পছন্দের কোর্সে ভর্তি হোন। আপনার ভবিষ্যৎ দক্ষতা তৈরির প্রথম পদক্ষেপ নিন আজই।
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenEnrollment}
                className="px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll Now – ভর্তি হতে ক্লিক করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 pt-2">
              কোর্সের ফি, মেয়াদ, ক্লাসের সময়সূচি এবং অন্যান্য শর্ত ভর্তি হওয়ার আগে নিশ্চিত করে নিন।
            </p>
          </div>
        </div>

        {/* Contact Info & Callback Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                যোগাযোগ ও একাডেমি ঠিকানা
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-950 mt-1">
                যেকোনো তথ্যের জন্য সরাসরি কথা বলুন
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                কোর্স সিলেকশন, ফি পেমেন্ট অথবা ক্লাস টাইমিং নিয়ে কোনো দ্বিধা থাকলে আমাদের সাথে যোগাযোগ করুন।
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">মোবাইল হেল্পলাইন (সরাসরি কল):</div>
                  <div className="font-semibold text-slate-900 mt-0.5 flex flex-wrap gap-x-2">
                    <a href={`tel:${ACADEMY_INFO.phone}`} className="hover:text-emerald-700 font-mono">{ACADEMY_INFO.phone}</a>
                    <span className="text-slate-300">|</span>
                    <a href={`tel:${ACADEMY_INFO.phoneAlt}`} className="hover:text-emerald-700 font-mono">{ACADEMY_INFO.phoneAlt}</a>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{ACADEMY_INFO.officeHoursBn}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">অফিসিয়াল ইমেইল:</div>
                  <a href={`mailto:${ACADEMY_INFO.email}`} className="font-semibold text-slate-900 mt-0.5 font-mono hover:text-emerald-700 block">
                    {ACADEMY_INFO.email}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">যেকোনো জিজ্ঞাসা বা ভর্তি পরামর্শের জন্য লিখুন</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">একাডেমি ক্যাম্পাস ও অফিস:</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{ACADEMY_INFO.addressBn}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{ACADEMY_INFO.officeHoursBn}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/8801956434722?text=Hello%20Skill%20House,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন (01956434722)</span>
              </a>
            </div>
          </div>

          {/* Right: Quick Callback Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h4 className="text-base font-bold text-slate-900 font-serif mb-1">
              দ্রুত পরামর্শ অথবা কল-ব্যাক অনুরোধ
            </h4>
            <p className="text-xs text-slate-600 mb-6">
              আপনার তথ্য রেখে যান, আমাদের সিনিয়র মেন্টর আপনাকে ফ্রি কাউন্সেলিং প্রদান করবেন।
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-sm font-bold text-slate-900">আপনার বার্তা সফলভাবে গৃহীত হয়েছে!</h5>
                <p className="text-xs text-slate-600">
                  আমাদের একাডেমি টিম শীঘ্রই আপনার নম্বরে যোগাযোগ করবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={e => setInquiryName(e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={e => setInquiryPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    আগ্রহী কোর্স
                  </label>
                  <select
                    value={inquiryCourse}
                    onChange={e => setInquiryCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  >
                    <option value="Google Ads Professional Training">Google Ads Professional Training</option>
                    <option value="Google My Business & Local SEO">Google My Business & Local SEO</option>
                    <option value="Professional SEO Training">Professional SEO Training</option>
                    <option value="CRM & Marketing Automation">CRM & Marketing Automation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    আপনার কোনো নির্দিষ্ট প্রশ্ন থাকলে লিখুন
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={e => setInquiryMessage(e.target.value)}
                    placeholder="যেমন: কোর্সের টাইমিং বা ল্যাপটপের প্রয়োজনীয়তা জানতে চাই..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>পরামর্শ অনুরোধ পাঠান</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
