import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  FileText, 
  Video, 
  Sparkles,
  BookOpen,
  ChevronRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { StudentEnrollment } from '../types';
import { COURSES } from '../data/courses';

interface StudentProgressProps {
  enrollment: StudentEnrollment;
}

interface ModuleProgressItem {
  moduleId: number;
  percentage: number; // 0 to 100
  status: 'completed' | 'in_progress' | 'locked';
  quizScore?: number;
  assignmentSubmitted?: boolean;
}

// Reusable Circular Progress Bar component
interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showText?: boolean;
  textColor?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 52,
  strokeWidth = 5,
  color = '#059669', // emerald-600
  showText = true,
  textColor = 'text-slate-800'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showText && (
        <span className={`absolute text-[11px] font-mono font-bold tabular-nums ${textColor}`}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

export const StudentProgress: React.FC<StudentProgressProps> = ({ enrollment }) => {
  const course = COURSES.find(c => c.id === enrollment.courseId) || COURSES[0];
  const storageKey = `skill_house_progress_${enrollment.studentId}_${course.id}`;

  // Default initial module progress state
  const getDefaultProgress = (): ModuleProgressItem[] => {
    return course.topics.map((_, idx) => {
      if (idx === 0) {
        return { moduleId: idx + 1, percentage: 100, status: 'completed', quizScore: 95, assignmentSubmitted: true };
      } else if (idx === 1) {
        return { moduleId: idx + 1, percentage: 100, status: 'completed', quizScore: 90, assignmentSubmitted: true };
      } else if (idx === 2) {
        return { moduleId: idx + 1, percentage: 75, status: 'in_progress', quizScore: 85, assignmentSubmitted: false };
      } else if (idx === 3) {
        return { moduleId: idx + 1, percentage: 40, status: 'in_progress', assignmentSubmitted: false };
      } else {
        return { moduleId: idx + 1, percentage: 0, status: 'locked' };
      }
    });
  };

  const [moduleProgress, setModuleProgress] = useState<ModuleProgressItem[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return getDefaultProgress();
  });

  // Save to local storage on update
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(moduleProgress));
    } catch {
      // ignore
    }
  }, [moduleProgress, storageKey]);

  // Overall calculations
  const totalModules = course.topics.length;
  const completedCount = moduleProgress.filter(m => m.percentage >= 100).length;
  const inProgressCount = moduleProgress.filter(m => m.percentage > 0 && m.percentage < 100).length;
  const averagePercentage = Math.round(
    moduleProgress.reduce((sum, item) => sum + item.percentage, 0) / (totalModules || 1)
  );

  // Toggle progress on click for interactivity
  const handleToggleModule = (index: number) => {
    setModuleProgress(prev => {
      const copy = [...prev];
      const current = copy[index];
      let newPercent = 0;
      let newStatus: 'completed' | 'in_progress' | 'locked' = 'locked';

      if (current.percentage === 0) {
        newPercent = 50;
        newStatus = 'in_progress';
      } else if (current.percentage === 50) {
        newPercent = 100;
        newStatus = 'completed';
      } else {
        newPercent = 0;
        newStatus = 'locked';
      }

      copy[index] = {
        ...current,
        percentage: newPercent,
        status: newStatus,
        assignmentSubmitted: newPercent === 100
      };
      return copy;
    });
  };

  const handleResetProgress = () => {
    const defaults = getDefaultProgress();
    setModuleProgress(defaults);
  };

  return (
    <div className="space-y-6">
      
      {/* Overall Progress Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                COURSE PROGRESS TRACKER
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs text-slate-300">
                {course.titleBn}
              </span>
            </div>
            
            <h4 className="text-xl font-bold font-serif text-white">
              সার্বিক কোর্স সম্পন্নতার অগ্রগতি
            </h4>

            <p className="text-xs text-slate-300 max-w-md">
              প্রতিটি মডিউল সম্পন্ন করার সাথে সাথে আপনার প্রগ্রেস বার বৃদ্ধি পাবে এবং ৮০% সম্পন্ন হলে সার্টিফিকেট স্বয়ংক্রিয়ভাবে আনলক হবে।
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completedCount}টি মডিউল সম্পন্ন</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{inProgressCount}টি চলমান</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>মোট {totalModules}টি মডিউল</span>
              </span>
            </div>
          </div>

          {/* Master Circular Progress Meter */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 shrink-0">
            <CircularProgressBar
              percentage={averagePercentage}
              size={84}
              strokeWidth={8}
              color={averagePercentage >= 80 ? '#10B981' : averagePercentage >= 40 ? '#059669' : '#F59E0B'}
              textColor="text-white font-mono text-base font-bold"
            />
            <span className="text-[11px] font-medium text-slate-300 mt-2">
              গড় অগ্রগতি
            </span>
          </div>

        </div>
      </div>

      {/* Module-by-Module Progress List with Circular Progress Bars */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h5 className="text-sm font-bold text-slate-900 font-serif">
              প্রতিটি মডিউলের প্রগ্রেস বার (Module Progress)
            </h5>
            <p className="text-xs text-slate-500">
              মডিউলে ক্লিক করে অগ্রগতি পরিবর্তন (০% → ৫০% → ১০০%) করতে পারেন।
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetProgress}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 p-1 rounded hover:bg-slate-100 transition-colors"
            title="রিসেট করুন"
          >
            <RotateCcw className="w-3 h-3" />
            <span>রিসেট</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {course.topics.map((topic, index) => {
            const item = moduleProgress[index] || { moduleId: index + 1, percentage: 0, status: 'locked' };
            const isCompleted = item.percentage >= 100;
            const isInProgress = item.percentage > 0 && item.percentage < 100;

            const circleColor = isCompleted 
              ? '#059669' // emerald-600
              : isInProgress 
                ? '#F59E0B' // amber-500
                : '#CBD5E1'; // slate-300

            return (
              <div
                key={index}
                onClick={() => handleToggleModule(index)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70'
                    : isInProgress
                      ? 'border-amber-200 bg-amber-50/30 hover:bg-amber-50/60'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                
                {/* Module Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h6 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {topic.titleBn}
                      </h6>
                      
                      {isCompleted && (
                        <span className="hidden sm:inline-flex text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          সম্পন্ন
                        </span>
                      )}
                      {isInProgress && (
                        <span className="hidden sm:inline-flex text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          চলমান
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {topic.detailsBn}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-slate-400" />
                        <span>লাইভ ক্লাস ও রেকর্ডিং</span>
                      </span>
                      {item.quizScore && (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>কুইজ: {item.quizScore}%</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Circular Progress Bar on right */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-semibold text-slate-800">
                      {isCompleted ? '১০০% সম্পন্ন' : isInProgress ? 'চলমান' : 'আসন্ন'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      মডিউল ০{index + 1}
                    </div>
                  </div>

                  <CircularProgressBar
                    percentage={item.percentage}
                    size={46}
                    strokeWidth={4.5}
                    color={circleColor}
                    textColor={isCompleted ? 'text-emerald-700' : isInProgress ? 'text-amber-700' : 'text-slate-400'}
                  />
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Unlocking Status Banner */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Award className={`w-5 h-5 shrink-0 ${averagePercentage >= 80 ? 'text-emerald-600' : 'text-slate-400'}`} />
          <div>
            <div className="font-semibold text-slate-900">
              {averagePercentage >= 80 ? 'ভেরিফায়েড কোর্স সার্টিফিকেট আনলক হয়েছে!' : 'কোর্স সার্টিফিকেটের যোগ্যতা:'}
            </div>
            <div className="text-slate-500">
              {averagePercentage >= 80
                ? 'আপনার সার্টিফিকেট প্রস্তুত। একাডেমি অফিস থেকে মূল সনদপত্র গ্রহণ করতে পারবেন।'
                : `কমপক্ষে ৮০% সম্পন্ন করতে হবে। বর্তমান অগ্রগতি: ${averagePercentage}%`}
            </div>
          </div>
        </div>

        {averagePercentage >= 80 && (
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 shrink-0"
          >
            সার্টিফিকেট স্লিপ প্রিন্ট
          </button>
        )}
      </div>

    </div>
  );
};
