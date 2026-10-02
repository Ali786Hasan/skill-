import React from 'react';
import { ACADEMY_INFO } from '../data/courses';
import { Logo3D } from './Logo3D';

interface FooterProps {
  onOpenEnrollment: () => void;
  onOpenPortal: () => void;
  onOpenAdmin?: () => void;
  lang: 'bn' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnrollment, onOpenPortal, onOpenAdmin, lang }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo3D size="sm" interactive glow={false} />
              <div>
                <span className="text-base font-bold text-white font-serif block leading-tight">
                  Skill House
                </span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
                  ACADEMY 3D
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {ACADEMY_INFO.mottoBn}
            </p>
            <p className="text-[11px] text-slate-500">
              ডিজিটাল মার্কেটিং ট্রেনিং একাডেমি, ধাপ, রংপুর সিটি কর্পোরেশন, রংপুর।
            </p>
          </div>

          {/* Courses links */}
          <div className="space-y-2">
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              কোর্সসমূহ
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#courses" className="hover:text-white transition-colors">Google Ads Professional Training</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Google My Business & Local SEO</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Professional SEO Training</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">CRM & Marketing Automation</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              প্রয়োজনীয় লিংক
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors text-left">
                  ভর্তি যাচাই ও রসিদ ডাউনলোড
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button onClick={onOpenAdmin} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-left flex items-center gap-1 cursor-pointer">
                    <span>🛡️ অ্যাডমিন ও সাব-অ্যাডমিন প্যানেল</span>
                  </button>
                </li>
              )}
              <li><a href="#process" className="hover:text-white transition-colors">৪ ধাপের ভর্তি নির্দেশিকা</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">ইনভেস্টমেন্ট ও ROI ক্যালকুলেটর</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">কেন আমাদের বেছে নেবেন</a></li>
            </ul>
          </div>

          {/* Payment & Support */}
          <div className="space-y-2">
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              পেমেন্ট মাধ্যম ও হেল্পলাইন
            </h5>
            <p className="text-slate-400 text-xs">
              বিকাশ / নগদ / রকেট মার্চেন্ট ও পার্সোনাল:
            </p>
            <div className="font-mono text-xs font-bold text-emerald-400 space-y-0.5">
              <div>{ACADEMY_INFO.bkashNumber} (প্রধান)</div>
              <div>{ACADEMY_INFO.bkashNumberAlt} (বিকল্প)</div>
            </div>
            <div className="pt-1 text-slate-400 text-xs">
              সরাসরি কল: {ACADEMY_INFO.phone} | {ACADEMY_INFO.phoneAlt}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Skill House Digital Marketing Training Academy. All rights reserved.
          </div>
          <div className="text-slate-500">
            কোর্সের ফি, মেয়াদ, ক্লাসের সময়সূচি এবং অন্যান্য শর্ত ভর্তি হওয়ার আগে নিশ্চিত করে নিন।
          </div>
        </div>

      </div>
    </footer>
  );
};
