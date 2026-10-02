import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Shield, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Award, 
  DollarSign, 
  Users, 
  Download, 
  Trash2, 
  Key, 
  LogOut, 
  Building2, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Phone, 
  Printer, 
  Check, 
  AlertTriangle,
  QrCode,
  ExternalLink
} from 'lucide-react';
import { StudentEnrollment, AdminUser, AdminRole, ActivityLog } from '../types';
import { 
  authenticateAdmin, 
  getEnrollments, 
  updateEnrollmentStatus, 
  issueCertificate, 
  revokeCertificate, 
  deleteEnrollment, 
  generateCertificateId, 
  getAdminAccounts, 
  createSubAdmin, 
  deleteSubAdmin, 
  getActivityLogs 
} from '../utils/storage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

type AdminTab = 'payments' | 'certificates' | 'subadmins' | 'logs';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotUsernameInput, setForgotUsernameInput] = useState('');
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'success'>('idle');

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState<AdminTab>('payments');
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>([]);
  const [subAdminsList, setSubAdminsList] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');

  // Certificate Modal State
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<StudentEnrollment | null>(null);
  const [certGradeInput, setCertGradeInput] = useState('Distinction (A+ · ৯৫%+)');
  const [newCertIdInput, setNewCertIdInput] = useState('');

  // Sub Admin Creation State
  const [newSubUsername, setNewSubUsername] = useState('');
  const [newSubPassword, setNewSubPassword] = useState('');
  const [newSubNameBn, setNewSubNameBn] = useState('');
  const [newSubDept, setNewSubDept] = useState('স্টুডেন্ট সাপোর্ট ও ভেরিফিকেশন');
  const [subAdminError, setSubAdminError] = useState('');
  const [subAdminSuccess, setSubAdminSuccess] = useState('');

  // Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    setEnrollments(getEnrollments());
    setSubAdminsList(getAdminAccounts());
    setActivityLogs(getActivityLogs());
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const user = authenticateAdmin(usernameInput, passwordInput);
    if (user) {
      setCurrentUser(user);
      setUsernameInput('');
      setPasswordInput('');
      refreshData();
      showToast(`স্বাগতম ${user.nameBn}! আপনি সফলভাবে লগইন করেছেন।`);
    } else {
      setLoginError('ভুল ইউজার আইডি অথবা পাসওয়ার্ড! পুনরায় চেষ্টা করুন।');
    }
  };

  const handleQuickDemoLogin = (role: 'super_admin' | 'sub_admin') => {
    if (role === 'super_admin') {
      const user = authenticateAdmin('admin', 'admin123');
      if (user) {
        setCurrentUser(user);
        refreshData();
        showToast('প্রধান অ্যাডমিন (Super Admin) হিসেবে লগইন সম্পন্ন!');
      }
    } else {
      const user = authenticateAdmin('subadmin', 'subadmin123');
      if (user) {
        setCurrentUser(user);
        refreshData();
        showToast('সহকারী অ্যাডমিন (Sub Admin) হিসেবে লগইন সম্পন্ন!');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('payments');
  };

  // Transaction Verification Actions
  const handleApproveTransaction = (id: string, name: string) => {
    if (!currentUser) return;
    const ok = updateEnrollmentStatus(id, 'confirmed', currentUser.username);
    if (ok) {
      refreshData();
      showToast(`শিক্ষার্থী ${name}-এর পেমেন্ট ট্রানজেকশন সফলভাবে ভেরিফাই ও অনুমোদিত হয়েছে।`);
    }
  };

  const handleRejectTransaction = (id: string, name: string) => {
    if (!currentUser) return;
    const reason = prompt('বাতিলের কারণ লিখুন (যেমন: ভুল ট্রানজেকশন আইডি বা অপর্যাপ্ত পেমেন্ট):', 'ভুল ট্রানজেকশন আইডি');
    if (reason === null) return;

    const ok = updateEnrollmentStatus(id, 'rejected', currentUser.username, reason);
    if (ok) {
      refreshData();
      showToast(`শিক্ষার্থী ${name}-এর পেমেন্ট বাতিল করা হয়েছে।`);
    }
  };

  const handleDeleteEnrollmentRecord = (id: string, name: string) => {
    if (!currentUser || currentUser.role !== 'super_admin') {
      alert('শুধুমাত্র প্রধান অ্যাডমিন (Super Admin) ভর্তি রেকর্ড মুছে ফেলতে পারবেন!');
      return;
    }
    if (confirm(`আপনি কি নিশ্চিত যে ${name}-এর ভর্তি রেকর্ডটি মুছে ফেলতে চান?`)) {
      const ok = deleteEnrollment(id, currentUser.username);
      if (ok) {
        refreshData();
        showToast('ভর্তি রেকর্ড সফলভাবে মুছে ফেলা হয়েছে।');
      }
    }
  };

  // Certificate Issuance Actions
  const handleOpenCertModal = (student: StudentEnrollment) => {
    setSelectedStudentForCert(student);
    setNewCertIdInput(student.certificateId || generateCertificateId());
  };

  const handleConfirmIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedStudentForCert) return;

    const ok = issueCertificate(
      selectedStudentForCert.id,
      newCertIdInput.trim() || generateCertificateId(),
      certGradeInput,
      currentUser.username
    );

    if (ok) {
      refreshData();
      setSelectedStudentForCert(null);
      showToast(`শিক্ষার্থী ${selectedStudentForCert.fullName}-কে সফলভাবে সার্টিফিকেট ইস্যু করা হয়েছে!`);
    }
  };

  const handleRevokeCert = (student: StudentEnrollment) => {
    if (!currentUser) return;
    if (confirm(`আপনি কি নিশ্চিত যে ${student.fullName}-এর সার্টিফিকেট (${student.certificateId}) বাতিল করবেন?`)) {
      const ok = revokeCertificate(student.id, currentUser.username);
      if (ok) {
        refreshData();
        showToast('সার্টিফিকেট সফলভাবে বাতিল করা হয়েছে।');
      }
    }
  };

  // Sub Admin Creation Actions
  const handleCreateSubAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubAdminError('');
    setSubAdminSuccess('');

    if (!newSubUsername || !newSubPassword || !newSubNameBn) {
      setSubAdminError('সকল তথ্য প্রদান করা আবশ্যক!');
      return;
    }

    if (!currentUser || currentUser.role !== 'super_admin') {
      setSubAdminError('শুধুমাত্র প্রধান অ্যাডমিন নতুন সাব অ্যাডমিন যোগ করতে পারেন!');
      return;
    }

    const ok = createSubAdmin(
      {
        username: newSubUsername.trim().toLowerCase(),
        password: newSubPassword,
        nameBn: newSubNameBn.trim(),
        nameEn: newSubNameBn.trim(),
        departmentBn: newSubDept
      },
      currentUser.username
    );

    if (ok) {
      setSubAdminSuccess(`নতুন সাব-অ্যাডমিন '${newSubNameBn}' সফলভাবে তৈরি হয়েছে!`);
      setNewSubUsername('');
      setNewSubPassword('');
      setNewSubNameBn('');
      refreshData();
      showToast('নতুন সাব-অ্যাডমিন যুক্ত করা হয়েছে!');
    } else {
      setSubAdminError('এই ইউজার আইডিটি ইতিমধ্যে বিদ্যমান! অন্য আইডি দিন।');
    }
  };

  const handleDeleteSubAdmin = (id: string, name: string) => {
    if (!currentUser || currentUser.role !== 'super_admin') return;
    if (confirm(`আপনি কি নিশ্চিত যে সাব-অ্যাডমিন '${name}' একাউন্ট মুছে ফেলবেন?`)) {
      deleteSubAdmin(id, currentUser.username);
      refreshData();
      showToast(`সাব-অ্যাডমিন '${name}' মুছে ফেলা হয়েছে।`);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = 'Student ID,Full Name,Phone,Email,Course,Amount,Payment Method,TrxID,Status,Certificate ID,Created At\n';
    const rows = enrollments.map(e => 
      `"${e.studentId}","${e.fullName}","${e.phoneNumber}","${e.email}","${e.courseTitleBn}",${e.amount},"${e.paymentMethod}","${e.transactionId}","${e.status}","${e.certificateId || 'N/A'}","${e.createdAt}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `skill_house_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('সকল শিক্ষার্থীর ডাটা CSV ফাইলে এক্সপোর্ট হয়েছে!');
  };

  // Filtered List
  const filteredEnrollments = enrollments.filter(e => {
    const matchQuery = 
      e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phoneNumber.includes(searchQuery) ||
      e.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.certificateId && e.certificateId.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchQuery) return false;

    if (paymentFilter === 'pending') return e.status === 'pending_verification';
    if (paymentFilter === 'confirmed') return e.status === 'confirmed';
    if (paymentFilter === 'rejected') return e.status === 'rejected';
    return true;
  });

  const totalCollected = enrollments
    .filter(e => e.status === 'confirmed')
    .reduce((sum, e) => sum + e.amount, 0);

  const pendingCount = enrollments.filter(e => e.status === 'pending_verification').length;
  const certifiedCount = enrollments.filter(e => Boolean(e.certificateId)).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-60 bg-emerald-900 border border-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold font-serif flex items-center gap-2">
                <span>স্কিল হাউস কন্ট্রোল প্যানেল</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  ADMIN & SUB ADMIN
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                পেমেন্ট ভেরিফিকেশন, সার্টিফিকেট ইস্যু ও অ্যাডমিন এক্সেস
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {/* VIEW 1: LOGIN SCREEN (If not authenticated) */}
          {!currentUser ? (
            <div className="max-w-md mx-auto my-6 space-y-6">
              
              {!showForgotPassword ? (
                <>
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto shadow-lg border border-slate-700">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">
                      অ্যাডমিন প্যানেলে লগইন করুন
                    </h3>
                    <p className="text-xs text-slate-500">
                      অনুমোদিত ইউজার আইডি ও পাসওয়ার্ড ব্যবহার করে প্রবেশ করুন।
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    
                    {loginError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        ইউজার আইডি (User ID)
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={usernameInput}
                          onChange={e => setUsernameInput(e.target.value)}
                          placeholder="ইউজার আইডি লিখুন"
                          className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        পাসওয়ার্ড (Password)
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={passwordInput}
                          onChange={e => setPasswordInput(e.target.value)}
                          placeholder="পাসওয়ার্ড লিখুন"
                          className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>লগইন করুন</span>
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(true);
                          setForgotStatus('idle');
                        }}
                        className="text-xs text-slate-500 hover:text-emerald-700 font-medium transition-colors cursor-pointer hover:underline"
                      >
                        forgot password
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Forgot Password View */
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
                      <Key className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">
                      পাসওয়ার্ড পুনরুদ্ধার (Forgot Password)
                    </h3>
                    <p className="text-xs text-slate-500">
                      আপনার ইউজার আইডি প্রদান করুন অথবা হেল্পলাইনে যোগাযোগ করুন।
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    {forgotStatus === 'success' ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>পাসওয়ার্ড রিসেট রিকোয়েস্ট সফল হয়েছে!</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-emerald-700">
                          নিরাপত্তার স্বার্থে সিস্টেম অ্যাডমিনের অনুমোদনের পর রেজিস্টার্ড ইমেইল/নম্বরে অস্থায়ী পাসওয়ার্ড পাঠানো হবে। জরুরি প্রয়োজনে হেল্পলাইনে কল করুন: <strong>01956-434722</strong>
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (forgotUsernameInput.trim()) {
                            setForgotStatus('success');
                          }
                        }}
                        className="space-y-3.5"
                      >
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 block">
                            আপনার ইউজার আইডি (User ID)
                          </label>
                          <input
                            type="text"
                            required
                            value={forgotUsernameInput}
                            onChange={(e) => setForgotUsernameInput(e.target.value)}
                            placeholder="যেমন: admin অথবা subadmin"
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          পাসওয়ার্ড রিসেট রিকোয়েস্ট পাঠান
                        </button>
                      </form>
                    )}

                    <div className="text-center pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setForgotStatus('idle');
                        }}
                        className="text-xs text-slate-600 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
                      >
                        ← লগইনে ফিরে যান (Back to login)
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            
            /* VIEW 2: LOGGED IN DASHBOARD */
            <div className="space-y-5">
              
              {/* User Header & Role Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                    currentUser.role === 'super_admin'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {currentUser.role === 'super_admin' ? '👑' : '🛡️'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 font-serif">
                        {currentUser.nameBn}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        @{currentUser.username}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentUser.role === 'super_admin'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {currentUser.roleTitleBn}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      বিভাগ: <span className="font-medium text-slate-700">{currentUser.departmentBn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={refreshData}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    title="ডাটা রিফ্রেশ করুন"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">রিফ্রেশ</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 border border-red-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>লগআউট</span>
                  </button>
                </div>

              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-xs font-medium">মোট শিক্ষার্থী</span>
                    <Users className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900">
                    {enrollments.length} জন
                  </div>
                  <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">নিবন্ধিত আবেদনকারী</div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-xs font-medium">যাচাই অপেক্ষমান</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl font-bold font-mono text-amber-600">
                    {pendingCount} টি
                  </div>
                  <div className="text-[10px] text-amber-700 mt-0.5 font-medium">পেমেন্ট ভেরিফিকেশন প্রয়োজন</div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-xs font-medium">মোট পেমেন্ট কালেকশন</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-700">
                    ৳{totalCollected.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">অনুমোদিত ফি</div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-xs font-medium">ইস্যুকৃত সার্টিফিকেট</span>
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xl font-bold font-mono text-blue-700">
                    {certifiedCount} টি
                  </div>
                  <div className="text-[10px] text-blue-600 mt-0.5 font-medium">অনলাইনে ভেরিফায়েড</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl text-xs overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab('payments')}
                  className={`py-2 px-3.5 rounded-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'payments'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>পেমেন্ট ও ট্রানজেকশন ভেরিফিকেশন</span>
                  {pendingCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-mono font-bold text-[10px] rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('certificates')}
                  className={`py-2 px-3.5 rounded-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'certificates'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>সার্টিফিকেট এক্সেস ও প্রদান</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('subadmins')}
                  className={`py-2 px-3.5 rounded-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'subadmins'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>সাব-অ্যাডমিন ব্যবস্থাপনা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logs')}
                  className={`py-2 px-3.5 rounded-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'logs'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>অ্যাক্টিভিটি হিস্ট্রি ও রিপোর্ট</span>
                </button>
              </div>

              {/* TAB 1: PAYMENTS & TRANSACTION VERIFICATION */}
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="নাম, ফোন বা TrxID দিয়ে খুঁজুন..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setPaymentFilter('all')}
                          className={`px-2.5 py-1.5 rounded-lg font-medium cursor-pointer ${
                            paymentFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          সকল ({enrollments.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentFilter('pending')}
                          className={`px-2.5 py-1.5 rounded-lg font-medium cursor-pointer ${
                            paymentFilter === 'pending' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          অপেক্ষমান ({pendingCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentFilter('confirmed')}
                          className={`px-2.5 py-1.5 rounded-lg font-medium cursor-pointer ${
                            paymentFilter === 'confirmed' ? 'bg-emerald-600 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          অনুমোদিত
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="p-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center gap-1 cursor-pointer"
                        title="CSV ফাইলে এক্সপোর্ট করুন"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">CSV এক্সপোর্ট</span>
                      </button>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="p-3">শিক্ষার্থী ও আইডি</th>
                            <th className="p-3">কোর্স ও ফি</th>
                            <th className="p-3">পেমেন্ট মেথড</th>
                            <th className="p-3">Transaction ID (TrxID)</th>
                            <th className="p-3">স্ট্যাটাস</th>
                            <th className="p-3 text-right">ভেরিফিকেশন অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredEnrollments.map(enr => (
                            <tr key={enr.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="p-3">
                                <div className="font-bold text-slate-900 font-serif">{enr.fullName}</div>
                                <div className="text-[11px] font-mono text-emerald-800 font-bold">{enr.studentId}</div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{enr.phoneNumber}</span>
                                </div>
                              </td>

                              <td className="p-3">
                                <div className="font-medium text-slate-800">{enr.courseTitleBn}</div>
                                <div className="text-[11px] text-slate-500">{enr.durationLabelBn}</div>
                                <div className="text-xs font-bold font-mono text-emerald-700 mt-0.5">৳{enr.amount.toLocaleString()}</div>
                              </td>

                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  enr.paymentMethod === 'bKash' ? 'bg-pink-100 text-pink-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {enr.paymentMethod}
                                </span>
                                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                  প্রেরক: {enr.senderNumber}
                                </div>
                              </td>

                              <td className="p-3">
                                <div className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded inline-block">
                                  {enr.transactionId}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  {new Date(enr.createdAt).toLocaleDateString('bn-BD')}
                                </div>
                              </td>

                              <td className="p-3">
                                {enr.status === 'confirmed' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>অনুমোদিত</span>
                                  </span>
                                )}
                                {enr.status === 'pending_verification' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                                    <Clock className="w-3 h-3" />
                                    <span>অপেক্ষমান</span>
                                  </span>
                                )}
                                {enr.status === 'rejected' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
                                    <XCircle className="w-3 h-3" />
                                    <span>বাতিল</span>
                                  </span>
                                )}
                              </td>

                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {enr.status !== 'confirmed' && (
                                    <button
                                      type="button"
                                      onClick={() => handleApproveTransaction(enr.id, enr.fullName)}
                                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                                      title="পেমেন্ট অনুমোদন করুন"
                                    >
                                      <Check className="w-3 h-3" />
                                      <span>অনুমোদন</span>
                                    </button>
                                  )}

                                  {enr.status !== 'rejected' && (
                                    <button
                                      type="button"
                                      onClick={() => handleRejectTransaction(enr.id, enr.fullName)}
                                      className="px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                                      title="পেমেন্ট বাতিল করুন"
                                    >
                                      বাতিল
                                    </button>
                                  )}

                                  {currentUser.role === 'super_admin' && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteEnrollmentRecord(enr.id, enr.fullName)}
                                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                      title="স্থায়ীভাবে মুছুন (Super Admin Only)"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: CERTIFICATES ACCESS & ISSUANCE */}
              {activeTab === 'certificates' && (
                <div className="space-y-4">
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="space-y-0.5 text-center sm:text-left">
                      <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>অফিসিয়াল ডিজিটাল সার্টিফিকেট ব্যবস্থাপনা ও অনলাইন এক্সেস</span>
                      </h4>
                      <p className="text-[11px] text-blue-800">
                        শিক্ষার্থী কোর্স সম্পন্ন করলে ইউনিক আইডি সহ ভেরিফায়েড সার্টিফিকেট ইস্যু বা প্রত্যাহার করুন।
                      </p>
                    </div>

                    <div className="text-xs font-mono font-bold text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200">
                      ইস্যুকৃত: {certifiedCount} জন
                    </div>
                  </div>

                  {/* Students Certificate Roster */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {enrollments.map(st => (
                      <div
                        key={st.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          st.certificateId
                            ? 'bg-white border-blue-200 shadow-xs'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-bold text-slate-900 font-serif">{st.fullName}</div>
                            <div className="text-xs text-slate-500">{st.courseTitleBn}</div>
                            <div className="text-[11px] font-mono font-semibold text-emerald-800 mt-0.5">
                              আইডি: {st.studentId} · ফোন: {st.phoneNumber}
                            </div>
                          </div>

                          {st.certificateId ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1 shrink-0">
                              <ShieldCheck className="w-3 h-3 text-blue-600" />
                              <span>সার্টিফায়েড</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 shrink-0">
                              সার্টিফিকেট বাকি
                            </span>
                          )}
                        </div>

                        {/* Certificate Details If Issued */}
                        {st.certificateId && (
                          <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-mono">
                              <span className="text-slate-500 text-[10px]">সার্টিফিকেট আইডি:</span>
                              <span className="font-bold text-blue-700">{st.certificateId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 text-[10px]">অনার গ্রেড:</span>
                              <span className="font-medium text-slate-800">{st.certificateGrade || 'Distinction'}</span>
                            </div>
                          </div>
                        )}

                        {/* Certificate Action Buttons */}
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          {st.certificateId ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenCertModal(st)}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                              >
                                এডিট / রি-ইস্যু
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRevokeCert(st)}
                                className="px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                সার্টিফিকেট প্রত্যাহার (Revoke)
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenCertModal(st)}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>সার্টিফিকেট ইস্যু করুন</span>
                            </button>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 3: SUB ADMIN MANAGEMENT */}
              {activeTab === 'subadmins' && (
                <div className="space-y-6">
                  
                  {/* Super Admin Notice */}
                  {currentUser.role !== 'super_admin' ? (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>সীমিত অনুমতি (Restricted Role):</strong> আপনি সহকারী অ্যাডমিন (Sub Admin) হিসেবে লগইন আছেন। শুধুমাত্র প্রধান অ্যাডমিন (Super Admin) নতুন সাব-অ্যাডমিন যোগ বা মুছে ফেলতে পারেন।
                      </div>
                    </div>
                  ) : (
                    /* Create New Sub Admin Form */
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 font-serif">
                            নতুন সহকারী অ্যাডমিন (Sub Admin) তৈরি করুন
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            পেমেন্ট যাচাইকরণ ও কোর্স সার্টিফিকেট এক্সেসের জন্য সহকারী কর্মী নিযুক্ত করুন।
                          </p>
                        </div>
                      </div>

                      {subAdminError && (
                        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                          {subAdminError}
                        </div>
                      )}
                      {subAdminSuccess && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                          {subAdminSuccess}
                        </div>
                      )}

                      <form onSubmit={handleCreateSubAdmin} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <label className="font-semibold text-slate-700">নাম (বাংলায়)</label>
                          <input
                            type="text"
                            required
                            value={newSubNameBn}
                            onChange={e => setNewSubNameBn(e.target.value)}
                            placeholder="যেমন: সায়মা আক্তার"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-slate-700">ইউজার আইডি (User ID)</label>
                          <input
                            type="text"
                            required
                            value={newSubUsername}
                            onChange={e => setNewSubUsername(e.target.value)}
                            placeholder="যেমন: staff_support"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-slate-700">পাসওয়ার্ড (Password)</label>
                          <input
                            type="text"
                            required
                            value={newSubPassword}
                            onChange={e => setNewSubPassword(e.target.value)}
                            placeholder="সিক্রেট পাসওয়ার্ড"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-slate-700">দায়িত্ব / বিভাগ</label>
                          <input
                            type="text"
                            required
                            value={newSubDept}
                            onChange={e => setNewSubDept(e.target.value)}
                            placeholder="যেমন: অ্যাকাউন্টস ও পেমেন্ট ভেরিফিকেশন"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="sm:col-span-2 pt-1">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>সাব-অ্যাডমিন অ্যাকাউন্ট তৈরি করুন</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* List of Admins & Sub Admins */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 font-serif">
                      বর্তমান অ্যাডমিন ও সাব-অ্যাডমিন তালিকা:
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subAdminsList.map(admin => {
                        const isSuper = admin.role === 'super_admin';
                        return (
                          <div
                            key={admin.id}
                            className={`p-4 rounded-2xl border ${
                              isSuper ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-0.5">
                                <div className="text-xs font-bold text-slate-900 font-serif flex items-center gap-1.5">
                                  <span>{admin.nameBn}</span>
                                  {isSuper && <span title="সুপার অ্যাডমিন">👑</span>}
                                </div>
                                <div className="text-[11px] font-mono text-slate-500">
                                  ইউজার আইডি: <strong className="text-slate-800">@{admin.username}</strong>
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  বিভাগ: {admin.departmentBn}
                                </div>
                              </div>

                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isSuper ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {isSuper ? 'Super Admin' : 'Sub Admin'}
                              </span>
                            </div>

                            {currentUser.role === 'super_admin' && !isSuper && (
                              <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSubAdmin(admin.id, admin.nameBn)}
                                  className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>অ্যাকাউন্ট মুছুন</span>
                                </button>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: ACTIVITY LOGS & AUDIT TRAIL */}
              {activeTab === 'logs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-serif">
                        অ্যাডমিন ও সাব-অ্যাডমিন অ্যাক্টিভিটি অডিট লগ
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        কে কোন পেমেন্ট ভেরিফাই করেছেন বা সার্টিফিকেট ইস্যু করেছেন তার ট্র্যাকিং হিস্ট্রি।
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>রিপোর্ট ডাউনলোড</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2 shadow-xs">
                    {activityLogs.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-400">
                        এখনো কোনো অ্যাক্টিভিটি রেকর্ড নেই।
                      </div>
                    ) : (
                      activityLogs.map(log => (
                        <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs">
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-800">
                              {log.actionBn}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2">
                              <span>অ্যাডমিন: <strong>@{log.adminUsername}</strong></span>
                              <span aria-hidden="true">·</span>
                              <span>ভূমিকা: {log.adminRole}</span>
                            </div>
                          </div>

                          <div className="text-[10px] font-mono text-slate-400 shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* POPUP MODAL: ISSUE CERTIFICATE MODAL */}
      {selectedStudentForCert && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900 font-serif">
                  অফিসিয়াল সার্টিফিকেট ইস্যু করুন
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudentForCert(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmIssueCert} className="space-y-3.5 text-xs">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-900 space-y-0.5">
                <div className="font-bold">{selectedStudentForCert.fullName}</div>
                <div className="text-[11px]">{selectedStudentForCert.courseTitleBn}</div>
                <div className="text-[10px] font-mono">আইডি: {selectedStudentForCert.studentId}</div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">
                  ইউনিক সার্টিফিকেট আইডি (Unique Credential ID)
                </label>
                <input
                  type="text"
                  required
                  value={newCertIdInput}
                  onChange={e => setNewCertIdInput(e.target.value)}
                  className="w-full px-3 py-2 font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">
                  গ্রেড ও সম্মাননা (Honor Grade)
                </label>
                <select
                  value={certGradeInput}
                  onChange={e => setCertGradeInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-600"
                >
                  <option value="Distinction (A+ · ৯৫%+)">Distinction (A+ · ৯৫%+)</option>
                  <option value="Excellence (A · ৯০-৯৪%)">Excellence (A · ৯০-৯৪%)</option>
                  <option value="First Division (B+ · ৮০-৮৯%)">First Division (B+ · ৮০-৮৯%)</option>
                  <option value="Professional Passed">Professional Passed</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForCert(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>ইস্যু নিশ্চিত করুন</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
