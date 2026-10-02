import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoursesSection } from './components/CoursesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AdmissionSteps } from './components/AdmissionSteps';
import { RoiCalculator } from './components/RoiCalculator';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { CourseModal } from './components/CourseModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { BanglaVoicePlayerModal } from './components/BanglaVoicePlayerModal';
import { CourseVideoPresenter } from './components/CourseVideoPresenter';
import { CourseCertifications } from './components/CourseCertifications';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Course, CourseDuration, StudentEnrollment } from './types';
import { MessageSquare, Phone, Volume2 } from 'lucide-react';
import { ACADEMY_INFO } from './data/courses';

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Modal states
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [targetCourseId, setTargetCourseId] = useState<string | undefined>(undefined);
  const [targetDuration, setTargetDuration] = useState<CourseDuration | undefined>(undefined);

  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [voicePlayerOpen, setVoicePlayerOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Quick toast on successful admission
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenEnrollment = (courseId?: string, duration?: CourseDuration) => {
    setTargetCourseId(courseId);
    setTargetDuration(duration);
    setEnrollmentOpen(true);
  };

  const handleToggleLang = () => {
    setLang(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleEnrollmentComplete = (enrollment: StudentEnrollment) => {
    setToastMessage(`ভর্তি সফল! আপনার স্টুডেন্ট আইডি: ${enrollment.studentId}`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline text-slate-400">
            {lang === 'bn' ? 'অক্টোবর ২০২৬ নতুন ব্যাচ ভর্তি চলছে' : 'October 2026 Batch Admissions Open'}
          </span>
          <span className="mx-auto sm:mx-0 font-medium text-emerald-400">
            {lang === 'bn' ? 'সীমিত আসনে দ্রুত ভর্তি চলছে — সরাসরি লাইভ প্রজেক্ট সাপোর্ট' : 'Limited Seats Available — Hands-on Live Project Training'}
          </span>
          <a
            href={`tel:${ACADEMY_INFO.phone}`}
            className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>হেল্পলাইন: {ACADEMY_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <Navbar
        onOpenEnrollment={() => handleOpenEnrollment()}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
        onOpenVoicePlayer={() => setVoicePlayerOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onOpenEnrollment={() => handleOpenEnrollment()}
          onOpenVoicePlayer={() => setVoicePlayerOpen(true)}
          lang={lang}
        />

        <div id="video-presentation">
          <CourseVideoPresenter
            onOpenEnrollment={(cId, dur) => handleOpenEnrollment(cId, dur)}
            onSelectCourseDetails={course => setSelectedCourseForDetails(course)}
            lang={lang}
          />
        </div>

        <CoursesSection
          onOpenEnrollment={(cId, dur) => handleOpenEnrollment(cId, dur)}
          onSelectCourseDetails={course => setSelectedCourseForDetails(course)}
          lang={lang}
        />

        <WhyChooseUs lang={lang} />

        <CourseCertifications
          onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
          lang={lang}
        />

        <AdmissionSteps
          onStartAdmission={() => handleOpenEnrollment()}
          lang={lang}
        />

        <RoiCalculator
          onEnroll={(cId, dur) => handleOpenEnrollment(cId, dur)}
          lang={lang}
        />

        <FaqSection lang={lang} />

        <ContactSection
          onOpenEnrollment={() => handleOpenEnrollment()}
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenEnrollment={() => handleOpenEnrollment()}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
        lang={lang}
      />

      {/* Floating Buttons: Voice Player + WhatsApp */}
      <div className="fixed bottom-6 right-6 z-40 no-print flex flex-col gap-2.5 items-end">
        {/* Floating Voice Narration Button */}
        <button
          type="button"
          onClick={() => setVoicePlayerOpen(true)}
          className="group flex items-center gap-2 bg-slate-900/95 hover:bg-slate-900 text-emerald-400 border border-emerald-500/40 px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md"
          title="বাংলা ভয়েস শুনুন (ভিডিও প্রমো)"
        >
          <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs font-semibold text-white whitespace-nowrap">
            বাংলা ভয়েস শুনুন
          </span>
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/8801956434722?text=Hello%20Skill%20House,%20I%20am%20interested%20in%20admission"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          title="WhatsApp Support"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span className="text-xs font-semibold hidden group-hover:inline transition-all whitespace-nowrap">
            হোয়াটসঅ্যাপ
          </span>
        </a>
      </div>

      {/* Global Success Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500/40 text-xs sm:text-sm font-medium flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Bengali Voice Narration Modal */}
      <BanglaVoicePlayerModal
        isOpen={voicePlayerOpen}
        onClose={() => setVoicePlayerOpen(false)}
        onOpenEnrollment={() => handleOpenEnrollment()}
      />

      {/* 4-Step Interactive Admission Modal */}
      <EnrollmentModal
        isOpen={enrollmentOpen}
        onClose={() => setEnrollmentOpen(false)}
        initialCourseId={targetCourseId}
        initialDuration={targetDuration}
        onEnrollmentComplete={handleEnrollmentComplete}
        lang={lang}
      />

      {/* Detailed Syllabus Modal */}
      <CourseModal
        course={selectedCourseForDetails}
        onClose={() => setSelectedCourseForDetails(null)}
        onEnroll={(cId, dur) => {
          setSelectedCourseForDetails(null);
          handleOpenEnrollment(cId, dur);
        }}
        lang={lang}
      />

      {/* Student Portal Modal */}
      <StudentPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        onOpenEnrollment={() => {
          setPortalOpen(false);
          handleOpenEnrollment();
        }}
        lang={lang}
      />

      {/* Admin & Sub Admin Control Panel Modal */}
      <AdminPanelModal
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        lang={lang}
      />
    </div>
  );
}
