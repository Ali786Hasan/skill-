import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { CircularProgressBar } from './StudentProgress';

export interface TopStudent {
  rank: number;
  studentId: string;
  nameBn: string;
  avatarUrl: string;
  courseId: 'google-ads' | 'local-seo' | 'professional-seo' | 'crm-automation';
  courseNameBn: string;
  batchBn: string;
  moduleCompletionPercent: number; // 0 to 100
  modulesCompleted: number; // out of 10
  assignmentAvgScore: number; // 0 to 100
  totalXpPoints: number;
  projectStatusBn: string;
  marketplaceSuccessBn?: string;
  badgeBn: string;
}

export const TOP_STUDENTS_DATA: TopStudent[] = [
  {
    rank: 1,
    studentId: 'SH-81042',
    nameBn: 'তানভীর হাসান',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    courseId: 'google-ads',
    courseNameBn: 'Google Ads প্রফেশনাল ট্রেনিং',
    batchBn: 'আগস্ট ২০২৬ ব্যাচ',
    moduleCompletionPercent: 100,
    modulesCompleted: 10,
    assignmentAvgScore: 98,
    totalXpPoints: 1950,
    projectStatusBn: 'ইউএস ই-কমার্স লাইভ ক্যাম্পেইন সম্পন্ন',
    marketplaceSuccessBn: 'Upwork এ প্রথম ক্লায়েন্ট থেকে $৪৫০ আয়',
    badgeBn: 'একাডেমি গোল্ড টপার'
  },
  {
    rank: 2,
    studentId: 'SH-82319',
    nameBn: 'ফাহমিদা সুলতানা',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    courseId: 'professional-seo',
    courseNameBn: 'Professional SEO Training',
    batchBn: 'আগস্ট ২০২৬ ব্যাচ',
    moduleCompletionPercent: 100,
    modulesCompleted: 10,
    assignmentAvgScore: 96,
    totalXpPoints: 1880,
    projectStatusBn: 'লোকাল আইটি ফার্মে এসইও অডিট রিপোর্ট তৈরি',
    marketplaceSuccessBn: 'Fiverr এ লেভেল-১ সেলার ব্যাজ প্রাপ্ত',
    badgeBn: 'স্টার এসইও অ্যানালিস্ট'
  },
  {
    rank: 3,
    studentId: 'SH-84105',
    nameBn: 'নাজমুল ইসলাম',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    courseId: 'local-seo',
    courseNameBn: 'Google My Business ও Local SEO',
    batchBn: 'সেপ্টেম্বর ২০২৬ ব্যাচ',
    moduleCompletionPercent: 95,
    modulesCompleted: 9,
    assignmentAvgScore: 94,
    totalXpPoints: 1790,
    projectStatusBn: '৩টি রেস্টুরেন্টের গুগল ম্যাপস ৩-প্যাক র্যাঙ্কিং সফল',
    marketplaceSuccessBn: 'স্থানীয় ক্লিনিকে মাসিক ৳২০,০০০ রিটেইনার প্রজেক্ট',
    badgeBn: 'লোকাল এসইও মাস্টার'
  },
  {
    rank: 4,
    studentId: 'SH-85521',
    nameBn: 'জান্নাতুল ফেরদৌস',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    courseId: 'crm-automation',
    courseNameBn: 'CRM ও মার্কেটিং অটোমেশন',
    batchBn: 'সেপ্টেম্বর ২০২৬ ব্যাচ',
    moduleCompletionPercent: 90,
    modulesCompleted: 9,
    assignmentAvgScore: 93,
    totalXpPoints: 1720,
    projectStatusBn: 'HubSpot এ মাল্টি-স্টেজ সেলস পাইপলাইন সেটআপ',
    marketplaceSuccessBn: 'রিমোট অস্ট্রেলিয়ান এজেন্সিতে ইন্টার্নশিপ অফার',
    badgeBn: 'অটোমেশন স্পেশালিস্ট'
  },
  {
    rank: 5,
    studentId: 'SH-86934',
    nameBn: 'আরিফুল হক',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    courseId: 'google-ads',
    courseNameBn: 'Google Ads প্রফেশনাল ট্রেনিং',
    batchBn: 'সেপ্টেম্বর ২০২৬ ব্যাচ',
    moduleCompletionPercent: 90,
    modulesCompleted: 9,
    assignmentAvgScore: 91,
    totalXpPoints: 1670,
    projectStatusBn: 'YouTube এবং PMax রিমার্কেটিং ফানেল তৈরি',
    marketplaceSuccessBn: 'লোকাল ফ্যাশন ব্র্যান্ডের সেলস ROAS ৪.২x অর্জন',
    badgeBn: 'হাই-কনভার্সন মার্কেটার'
  }
];

interface TopPerformersProps {
  currentStudentId?: string;
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ currentStudentId }) => {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');

  const filteredPerformers = selectedCourseFilter === 'all'
    ? TOP_STUDENTS_DATA
    : TOP_STUDENTS_DATA.filter(s => s.courseId === selectedCourseFilter);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-bold font-mono shadow-md">
            <Trophy className="w-4 h-4 fill-slate-950" />
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-900 flex items-center justify-center font-bold font-mono shadow-md border border-slate-300">
            <Medal className="w-4 h-4 text-slate-700" />
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center font-bold font-mono shadow-md">
            <Award className="w-4 h-4 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold font-mono text-xs border border-slate-200">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-950 text-white p-5 rounded-2xl border border-amber-800/40 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ACADEMY LEADERBOARD
              </span>
              <span className="text-xs text-slate-400">শীর্ষ শিক্ষার্থী তালিকা</span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
              স্কিল হাউস একাডেমির সেরা ৫ পারফর্মার
            </h4>

            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              মডিউল সম্পন্নতা, সাপ্তাহিক অ্যাসাইনমেন্ট স্কোর এবং লাইভ ক্লায়েন্ট প্রজেক্টের কার্যকারিতার ওপর ভিত্তি করে প্রতি মাসে শীর্ষ পারফর্মারদের সম্মানিত করা হয়।
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-slate-800/80 rounded-xl border border-slate-700 shrink-0 text-center">
            <Trophy className="w-7 h-7 text-amber-400 mb-1" />
            <div className="text-xs font-bold text-white">মাসিক এক্সিলেন্স অ্যাওয়ার্ড</div>
            <div className="text-[10px] text-emerald-400 font-medium">নগদ স্কলারশিপ ও রিকমেন্ডেশন</div>
          </div>
        </div>
      </div>

      {/* Course Filter Tabs */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Filter className="w-3.5 h-3.5" />
          <span>ফিল্টার:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'সকল কোর্স' },
            { id: 'google-ads', label: 'Google Ads' },
            { id: 'local-seo', label: 'Local SEO' },
            { id: 'professional-seo', label: 'SEO' },
            { id: 'crm-automation', label: 'CRM' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCourseFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCourseFilter === tab.id
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Cards List */}
      <div className="space-y-3">
        {filteredPerformers.map((student) => {
          const isRank1 = student.rank === 1;
          const isCurrentStudent = currentStudentId && currentStudentId.toLowerCase() === student.studentId.toLowerCase();

          return (
            <div
              key={student.studentId}
              className={`p-4 rounded-2xl border transition-all ${
                isRank1
                  ? 'bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border-amber-300 shadow-sm'
                  : isCurrentStudent
                    ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left: Rank, Avatar & Basic Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  
                  {/* Rank Badge */}
                  <div className="shrink-0 pt-0.5 sm:pt-0">
                    {getRankBadge(student.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={student.avatarUrl}
                      alt={student.nameBn}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    {isRank1 && (
                      <span className="absolute -top-1.5 -right-1 text-xs" title="র‍্যাঙ্ক ১">
                        👑
                      </span>
                    )}
                  </div>

                  {/* Name & Course Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="text-sm font-bold text-slate-900 font-serif">
                        {student.nameBn}
                      </h5>
                      <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {student.studentId}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {student.badgeBn}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-emerald-700">{student.courseNameBn}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-400">{student.batchBn}</span>
                    </div>

                    {/* Practical accomplishment */}
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{student.projectStatusBn}</span>
                      </span>
                      {student.marketplaceSuccessBn && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{student.marketplaceSuccessBn}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right: Scores & Circular Progress */}
                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  
                  {/* Assignment & XP Stats */}
                  <div className="text-left sm:text-right space-y-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">অ্যাসাইনমেন্ট স্কোর</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {student.assignmentAvgScore}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:justify-end text-[11px] text-amber-700 font-medium font-mono">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{student.totalXpPoints} XP</span>
                    </div>
                  </div>

                  {/* Circular Progress for Modules */}
                  <div className="flex flex-col items-center">
                    <CircularProgressBar
                      percentage={student.moduleCompletionPercent}
                      size={46}
                      strokeWidth={4.5}
                      color={student.moduleCompletionPercent >= 100 ? '#059669' : '#10B981'}
                      textColor="text-slate-900 text-xs font-bold"
                    />
                    <span className="text-[10px] text-slate-400 font-mono mt-1">
                      {student.modulesCompleted}/১০ মডিউল
                    </span>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Criteria Footer Card */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>শীর্ষ পারফর্মার লিডারবোর্ড মূল্যায়ন নীতি:</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>১০০% মডিউল লেকচার সম্পন্নকরণ</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>সাপ্তাহিক প্র্যাকটিক্যাল অ্যাসাইনমেন্টে ৯০%+ মার্কস</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>ক্লায়েন্ট প্রজেক্ট ও লাইভ ক্যাম্পেইনে সফল সম্পাদন</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
