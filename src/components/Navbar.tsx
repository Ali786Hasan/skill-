import React, { useState } from 'react';
import { Menu, X, Phone, ReceiptText, Globe, Volume2, Shield } from 'lucide-react';
import { ACADEMY_INFO } from '../data/courses';
import { Logo3D } from './Logo3D';

interface NavbarProps {
  onOpenEnrollment: (courseId?: string) => void;
  onOpenPortal: () => void;
  onOpenAdmin?: () => void;
  onOpenVoicePlayer?: () => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnrollment,
  onOpenPortal,
  onOpenAdmin,
  onOpenVoicePlayer,
  lang,
  onToggleLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark with 3D Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <Logo3D size="sm" interactive glow={false} />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-950 font-serif leading-none group-hover:text-emerald-700 transition-colors">
                  Skill House
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">
                  ACADEMY
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#video-presentation" className="hover:text-emerald-700 font-semibold text-emerald-800 transition-colors">
              {lang === 'bn' ? 'ভিডিও পরিচিতি' : 'Video Tour'}
            </a>
            <a href="#courses" className="hover:text-slate-950 transition-colors">
              {lang === 'bn' ? 'কোর্সসমূহ' : 'Courses'}
            </a>
            <a href="#certifications" className="hover:text-emerald-700 font-semibold text-emerald-800 transition-colors">
              {lang === 'bn' ? 'সার্টিফিকেট' : 'Certifications'}
            </a>
            <a href="#why-us" className="hover:text-slate-950 transition-colors">
              {lang === 'bn' ? 'কেন আমরা' : 'Why Us'}
            </a>
            <a href="#process" className="hover:text-slate-950 transition-colors">
              {lang === 'bn' ? 'ভর্তি প্রক্রিয়া' : 'Admission Steps'}
            </a>
            <a href="#calculator" className="hover:text-slate-950 transition-colors">
              {lang === 'bn' ? 'ফি ও ইনভেস্টমেন্ট' : 'ROI Calculator'}
            </a>
            <a href="#contact" className="hover:text-slate-950 transition-colors">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenVoicePlayer && (
              <button
                onClick={onOpenVoicePlayer}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors whitespace-nowrap"
                title="বাংলা ভয়েস প্রমো শুনুন"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>বাংলা ভয়েস</span>
              </button>
            )}

            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-950 rounded border border-slate-200 hover:border-slate-300 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
            >
              <ReceiptText className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'bn' ? 'ভর্তি তথ্য' : 'Check Admission'}</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                title="অ্যাডমিন ও সাব-অ্যাডমিন কন্ট্রোল প্যানেল"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
              </button>
            )}

            <button
              onClick={() => onOpenEnrollment()}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-all shadow-sm hover:shadow whitespace-nowrap"
            >
              {lang === 'bn' ? 'ভর্তি হতে ক্লিক করুন' : 'Enroll Now'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#video-presentation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {lang === 'bn' ? 'ভিডিও পরিচিতি' : 'Video Tour'}
            </a>
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-600"
            >
              {lang === 'bn' ? 'কোর্সসমূহ' : 'Courses'}
            </a>
            <a
              href="#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {lang === 'bn' ? 'সার্টিফিকেট' : 'Certifications'}
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-600"
            >
              {lang === 'bn' ? 'কেন আমরা' : 'Why Us'}
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-600"
            >
              {lang === 'bn' ? 'ভর্তি প্রক্রিয়া' : 'Admission Steps'}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-600"
            >
              {lang === 'bn' ? 'ফি ও ইনভেস্টমেন্ট' : 'ROI Calculator'}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-600"
            >
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {onOpenVoicePlayer && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVoicePlayer();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>বাংলা ভয়েস প্রমো শুনুন</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md"
            >
              <ReceiptText className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ভর্তি তথ্য ও রসিদ যাচাই' : 'Check Admission'}</span>
            </button>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md"
              >
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'অ্যাডমিন ও সাব-অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md text-center"
            >
              {lang === 'bn' ? 'ভর্তি হতে ক্লিক করুন' : 'Enroll Now'}
            </button>
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex items-center justify-center gap-2 text-xs text-slate-500 py-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{ACADEMY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
