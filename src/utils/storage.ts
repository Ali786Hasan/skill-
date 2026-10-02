import { StudentEnrollment, AdminUser, ActivityLog, AdminRole } from '../types';

const ENROLLMENTS_STORAGE_KEY = 'skill_house_enrollments';
const SUB_ADMINS_STORAGE_KEY = 'skill_house_sub_admins';
const ACTIVITY_LOGS_STORAGE_KEY = 'skill_house_activity_logs';

export const DEFAULT_ADMINS = [
  {
    id: 'admin-super-1',
    username: 'admin',
    password: 'admin123',
    nameBn: 'মোঃ রাশেদুল ইসলাম',
    nameEn: 'Md. Rashedul Islam',
    role: 'super_admin' as AdminRole,
    roleTitleBn: 'প্রধান অ্যাডমিন (Super Admin)',
    departmentBn: 'একাডেমিক ডিরেক্টরেট ও ফাইন্যান্স'
  },
  {
    id: 'admin-sub-1',
    username: 'subadmin',
    password: 'subadmin123',
    nameBn: 'সায়মা আক্তার',
    nameEn: 'Sayma Akter',
    role: 'sub_admin' as AdminRole,
    roleTitleBn: 'সহকারী অ্যাডমিন (Sub Admin)',
    departmentBn: 'অ্যাকাউন্টস ও স্টুডেন্ট সাপোর্ট'
  }
];

const INITIAL_ENROLLMENTS: StudentEnrollment[] = [
  {
    id: 'enr-sample-1',
    studentId: 'SH-81042',
    courseId: 'google-ads',
    courseTitleBn: 'Google Ads Professional Training',
    courseTitleEn: 'Google Ads Professional Training',
    durationKey: '2-months',
    durationLabelBn: '২ মাসের কোর্স',
    amount: 8000,
    fullName: 'তানভীর হাসান',
    phoneNumber: '01812345678',
    email: 'tanveer.ad@gmail.com',
    city: 'ঢাকা',
    goal: 'ফ্রিল্যান্সিং ও রিমোট জব',
    batchPreference: 'শনি ও সোম (রাত ৮:০০)',
    paymentMethod: 'bKash',
    senderNumber: '01812345678',
    transactionId: 'BLA9X192K',
    status: 'confirmed',
    certificateId: 'SKH-CERT-2026-9812',
    certificateIssuedAt: '2026-09-28T10:00:00.000Z',
    certificateGrade: 'Distinction (A+ · ৯৬%)',
    verifiedBy: 'admin',
    verifiedAt: '2026-09-20T12:00:00.000Z',
    createdAt: '2026-09-18T14:30:00.000Z'
  },
  {
    id: 'enr-sample-2',
    studentId: 'SH-84105',
    courseId: 'local-seo',
    courseTitleBn: 'Google My Business ও Local SEO',
    courseTitleEn: 'Google My Business & Local SEO',
    durationKey: '1-month',
    durationLabelBn: '১ মাসের কোর্স',
    amount: 4000,
    fullName: 'নাজমুল ইসলাম',
    phoneNumber: '01711223344',
    email: 'nazmul.seo@gmail.com',
    city: 'রংপুর',
    goal: 'লোকাল বিজনেসের ক্লায়েন্ট সার্ভিস',
    batchPreference: 'রবি ও মঙ্গল (বিকাল ৫:০০)',
    paymentMethod: 'bKash',
    senderNumber: '01711223344',
    transactionId: 'BK773099X',
    status: 'pending_verification',
    createdAt: '2026-10-02T05:15:00.000Z'
  },
  {
    id: 'enr-sample-3',
    studentId: 'SH-85521',
    courseId: 'crm-automation',
    courseTitleBn: 'CRM ও মার্কেটিং অটোমেশন',
    courseTitleEn: 'CRM & Marketing Automation',
    durationKey: '3-months',
    durationLabelBn: '৩ মাসের কোর্স',
    amount: 12000,
    fullName: 'জান্নাতুল ফেরদৌস',
    phoneNumber: '01955667788',
    email: 'jannat.crm@yahoo.com',
    city: 'চট্টগ্রাম',
    goal: 'ইউএস এজেন্সিতে রিমোট জব',
    batchPreference: 'শনি ও সোম (রাত ৮:০০)',
    paymentMethod: 'Nagad',
    senderNumber: '01955667788',
    transactionId: 'NGD9824PL',
    status: 'pending_verification',
    createdAt: '2026-10-02T06:40:00.000Z'
  },
  {
    id: 'enr-sample-4',
    studentId: 'SH-82319',
    courseId: 'professional-seo',
    courseTitleBn: 'Professional SEO Training',
    courseTitleEn: 'Professional SEO Training',
    durationKey: '2-months',
    durationLabelBn: '২ মাসের কোর্স',
    amount: 7000,
    fullName: 'ফাহমিদা সুলতানা',
    phoneNumber: '01511223355',
    email: 'fahmida.seo@gmail.com',
    city: 'রাজশাহী',
    goal: 'Fiverr ও Upwork এসইও কনসালটেন্ট',
    batchPreference: 'বুধ ও শুক্র (রাত ৯:০০)',
    paymentMethod: 'bKash',
    senderNumber: '01511223355',
    transactionId: 'BLA89921M',
    status: 'confirmed',
    certificateId: 'SKH-CERT-2026-7731',
    certificateIssuedAt: '2026-09-29T15:20:00.000Z',
    certificateGrade: 'Distinction (A+ · ৯৪%)',
    verifiedBy: 'subadmin',
    verifiedAt: '2026-09-22T08:30:00.000Z',
    createdAt: '2026-09-21T09:00:00.000Z'
  }
];

export function getEnrollments(): StudentEnrollment[] {
  try {
    const raw = localStorage.getItem(ENROLLMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(INITIAL_ENROLLMENTS));
      return INITIAL_ENROLLMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ENROLLMENTS;
  }
}

export function saveEnrollment(enrollment: StudentEnrollment): void {
  const current = getEnrollments();
  const updated = [enrollment, ...current];
  localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(updated));
}

export function updateEnrollmentStatus(
  id: string,
  newStatus: 'confirmed' | 'pending_verification' | 'rejected',
  adminUsername: string,
  rejectionReason?: string
): boolean {
  try {
    const current = getEnrollments();
    const index = current.findIndex(e => e.id === id);
    if (index === -1) return false;

    current[index] = {
      ...current[index],
      status: newStatus,
      verifiedBy: adminUsername,
      verifiedAt: new Date().toISOString(),
      rejectionReason: newStatus === 'rejected' ? (rejectionReason || 'ভুল ট্রানজেকশন আইডি') : undefined
    };

    localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(current));

    logActivity({
      id: `act-${Date.now()}`,
      adminUsername,
      adminRole: adminUsername === 'admin' ? 'super_admin' : 'sub_admin',
      actionBn: `শিক্ষার্থী ${current[index].fullName} (${current[index].studentId})-এর পেমেন্ট স্ট্যাটাস '${newStatus === 'confirmed' ? 'যাচাইকৃত (Approved)' : 'বাতিল (Rejected)'}' করেছেন।`,
      timestamp: new Date().toISOString(),
      targetStudentId: current[index].studentId
    });

    return true;
  } catch {
    return false;
  }
}

export function issueCertificate(
  id: string,
  certificateId: string,
  grade: string,
  adminUsername: string
): boolean {
  try {
    const current = getEnrollments();
    const index = current.findIndex(e => e.id === id);
    if (index === -1) return false;

    current[index] = {
      ...current[index],
      certificateId,
      certificateGrade: grade,
      certificateIssuedAt: new Date().toISOString()
    };

    localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(current));

    logActivity({
      id: `act-${Date.now()}`,
      adminUsername,
      adminRole: adminUsername === 'admin' ? 'super_admin' : 'sub_admin',
      actionBn: `শিক্ষার্থী ${current[index].fullName} (${current[index].studentId})-কে অফিসিয়াল সার্টিফিকেট (${certificateId}) ইস্যু করা হয়েছে।`,
      timestamp: new Date().toISOString(),
      targetStudentId: current[index].studentId
    });

    return true;
  } catch {
    return false;
  }
}

export function revokeCertificate(id: string, adminUsername: string): boolean {
  try {
    const current = getEnrollments();
    const index = current.findIndex(e => e.id === id);
    if (index === -1) return false;

    const oldCert = current[index].certificateId;
    delete current[index].certificateId;
    delete current[index].certificateGrade;
    delete current[index].certificateIssuedAt;

    localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(current));

    logActivity({
      id: `act-${Date.now()}`,
      adminUsername,
      adminRole: adminUsername === 'admin' ? 'super_admin' : 'sub_admin',
      actionBn: `শিক্ষার্থী ${current[index].fullName} (${current[index].studentId})-এর সার্টিফিকেট (${oldCert}) বাতিল (Revoked) করা হয়েছে।`,
      timestamp: new Date().toISOString(),
      targetStudentId: current[index].studentId
    });

    return true;
  } catch {
    return false;
  }
}

export function deleteEnrollment(id: string, adminUsername: string): boolean {
  try {
    const current = getEnrollments();
    const target = current.find(e => e.id === id);
    const updated = current.filter(e => e.id !== id);
    localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(updated));

    if (target) {
      logActivity({
        id: `act-${Date.now()}`,
        adminUsername,
        adminRole: 'super_admin',
        actionBn: `শিক্ষার্থী ${target.fullName} (${target.studentId})-এর ভর্তি রেকর্ড স্থায়ীভাবে মুছে ফেলা হয়েছে।`,
        timestamp: new Date().toISOString(),
        targetStudentId: target.studentId
      });
    }

    return true;
  } catch {
    return false;
  }
}

export function findEnrollmentByQuery(query: string): StudentEnrollment | undefined {
  const list = getEnrollments();
  const clean = query.trim().toLowerCase();
  return list.find(
    e =>
      e.studentId.toLowerCase() === clean ||
      e.phoneNumber.replace(/[^0-9]/g, '') === clean.replace(/[^0-9]/g, '') ||
      e.transactionId.toLowerCase() === clean ||
      (e.certificateId && e.certificateId.toLowerCase() === clean)
  );
}

export function generateStudentId(): string {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `SH-${random}`;
}

export function generateCertificateId(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SKH-CERT-2026-${random}`;
}

export interface StoredAdminAccount {
  id: string;
  username: string;
  password: string;
  nameBn: string;
  nameEn: string;
  role: AdminRole;
  roleTitleBn: string;
  departmentBn: string;
}

// Authentication & Admin Accounts
export function authenticateAdmin(usernameInput: string, passwordInput: string): AdminUser | null {
  const cleanUser = usernameInput.trim().toLowerCase();
  const admins = getAdminAccounts();

  const found = admins.find((a: StoredAdminAccount) => a.username.toLowerCase() === cleanUser && a.password === passwordInput);
  if (!found) return null;

  return {
    id: found.id,
    username: found.username,
    nameBn: found.nameBn,
    nameEn: found.nameEn,
    role: found.role,
    roleTitleBn: found.roleTitleBn,
    departmentBn: found.departmentBn,
    lastLogin: new Date().toISOString()
  };
}

export function getAdminAccounts(): StoredAdminAccount[] {
  try {
    const raw = localStorage.getItem(SUB_ADMINS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SUB_ADMINS_STORAGE_KEY, JSON.stringify(DEFAULT_ADMINS));
      return DEFAULT_ADMINS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ADMINS;
  }
}

export function createSubAdmin(
  newAdmin: {
    username: string;
    password: string;
    nameBn: string;
    nameEn: string;
    departmentBn: string;
  },
  creatorAdmin: string
): boolean {
  try {
    const list = getAdminAccounts();
    if (list.some((a: any) => a.username.toLowerCase() === newAdmin.username.toLowerCase())) {
      return false;
    }

    const created = {
      id: `admin-sub-${Date.now()}`,
      username: newAdmin.username,
      password: newAdmin.password,
      nameBn: newAdmin.nameBn,
      nameEn: newAdmin.nameEn,
      role: 'sub_admin' as AdminRole,
      roleTitleBn: 'সহকারী অ্যাডমিন (Sub Admin)',
      departmentBn: newAdmin.departmentBn
    };

    const updated = [...list, created];
    localStorage.setItem(SUB_ADMINS_STORAGE_KEY, JSON.stringify(updated));

    logActivity({
      id: `act-${Date.now()}`,
      adminUsername: creatorAdmin,
      adminRole: 'super_admin',
      actionBn: `নতুন সাব অ্যাডমিন '${newAdmin.nameBn} (@${newAdmin.username})' তৈরি করা হয়েছে।`,
      timestamp: new Date().toISOString()
    });

    return true;
  } catch {
    return false;
  }
}

export function deleteSubAdmin(id: string, creatorAdmin: string): boolean {
  try {
    const list = getAdminAccounts();
    const target = list.find((a: any) => a.id === id);
    if (!target || target.role === 'super_admin') return false;

    const updated = list.filter((a: any) => a.id !== id);
    localStorage.setItem(SUB_ADMINS_STORAGE_KEY, JSON.stringify(updated));

    logActivity({
      id: `act-${Date.now()}`,
      adminUsername: creatorAdmin,
      adminRole: 'super_admin',
      actionBn: `সাব অ্যাডমিন '${target.nameBn} (@${target.username})' একাউন্ট মুছে ফেলা হয়েছে।`,
      timestamp: new Date().toISOString()
    });

    return true;
  } catch {
    return false;
  }
}

// Activity Logs
export function getActivityLogs(): ActivityLog[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_LOGS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function logActivity(log: ActivityLog): void {
  try {
    const current = getActivityLogs();
    const updated = [log, ...current].slice(0, 100);
    localStorage.setItem(ACTIVITY_LOGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}
