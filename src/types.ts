export type CourseDuration = '1-month' | '2-months' | '3-months';

export interface PricingPlan {
  durationKey: CourseDuration;
  durationLabelBn: string;
  durationLabelEn: string;
  price: number;
  priceFormattedBn: string;
  featuresBn: string[];
  featuresEn: string[];
  isPopular?: boolean;
}

export interface Course {
  id: string;
  titleEn: string;
  titleBn: string;
  badgeBn: string;
  badgeEn: string;
  summaryBn: string;
  summaryEn: string;
  heroImage: string;
  topics: {
    titleBn: string;
    titleEn: string;
    detailsBn: string;
  }[];
  pricing: PricingPlan[];
  tools: string[];
  nextBatchBn: string;
  seatsLeft: number;
  scheduleBn: string;
  prerequisitesBn: string;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  courseTitleBn: string;
  courseTitleEn: string;
  durationKey: CourseDuration;
  durationLabelBn: string;
  amount: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  goal: string;
  batchPreference: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket';
  senderNumber: string;
  transactionId: string;
  status: 'confirmed' | 'pending_verification' | 'rejected';
  rejectionReason?: string;
  certificateId?: string;
  certificateIssuedAt?: string;
  certificateGrade?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
}

export type AdminRole = 'super_admin' | 'sub_admin';

export interface AdminUser {
  id: string;
  username: string; // User ID
  nameBn: string;
  nameEn: string;
  role: AdminRole;
  roleTitleBn: string;
  departmentBn: string;
  lastLogin?: string;
}

export interface ActivityLog {
  id: string;
  adminUsername: string;
  adminRole: AdminRole;
  actionBn: string;
  timestamp: string;
  targetStudentId?: string;
}
