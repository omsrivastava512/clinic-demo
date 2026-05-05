
// ==========================================
// 1. TYPES & INTERFACES (types.ts)
// ==========================================

import type { ClinicalNote, FormData } from '@/features/patient/types';



export interface Patient {
  id: string;
  mrn: string;
  fullName: string;
  dateOfBirth: string;     // date
  lastVisitAt: string;     // timestamp
  phone: string;
  address: string;
  gender: string;
  notes?: ClinicalNote;
  referralMode: FormData['referral'];
  referralDoctorInfo?: string | never;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface MedicalComplaint {
    id: string;
    title: string; // e.g., "Cervical Spondylosis"
    doctor?: string;
    isActive: boolean;
    type: 'EXISTING' | 'NEW';
}

export interface Procedure {
    id: string;
    name: string; // e.g., "Ultrasonic Therapy"
    code: string; // e.g., "97035"
    cost: number;
}

export interface InvoiceItem {
    procedureId: string;
    complaintId: string; // Links the procedure to a specific body part/issue
    name: string;
    complaintName: string;
    cost: number;
}

export interface LedgerEntry {
    id: string;
    time: string;
    patientName: string;
    treatment: string;
    status: 'Paid' | 'In Therapy' | 'Waiting';
    patientId?: string;
}

// ==========================================
// 2. PATIENT PASSPORT TYPES
// ==========================================

export interface PatientAlert {
    type: 'ALLERGY' | 'FALL_RISK' | 'DNR' | 'OTHER';
    label: string;
}

export interface VitalSign {
    type: 'BP' | 'HR' | 'TEMP' | 'SPO2';
    value: string;
    unit: string;
    recordedAt: string;
    trend: 'NORMAL' | 'HIGH' | 'LOW';
}

export interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    doctorName: string;
    doctorInitials: string;
    category: 'PHYSIO' | 'CONSULT' | 'LAB' | 'MEDICATION' | 'SURGERY' | 'NOTE';
}

export interface PatientProfile extends Patient {
    bloodType: string;
    insurerName: string;
    alerts: PatientAlert[];
    vitals: VitalSign[];
    timeline: TimelineEvent[];
    photoUrl?: string;
}

// ==========================================
// BILLING MODEL
// ==========================================

// A service/procedure with a category that drives billing logic
export interface Service {
    id: string;
    name: string;                        // "IFT", "TENS", "Cupping", "ISTM"
    standalonePrice: number;             // price when charged (machine-only or premium)
    category: 'STANDARD' | 'PREMIUM';   // STANDARD = free in consult; PREMIUM = always charged
}

// One row per service used in a visit (junction table)
export interface VisitService {
    id: string;
    visitId: string;
    serviceId: string;
    serviceName: string;                 // denormalised for display
    serviceCategory: 'STANDARD' | 'PREMIUM';
    isCharged: boolean;                  // derived: true if MACHINE_ONLY or PREMIUM
    chargedAmount: number;               // 0 if not charged
}

// A visit — one per complaint per session
export interface Visit {
    id: string;
    patientId: string;
    date: string;                        // YYYY-MM-DD
    complaint: string;                   // display name
    complaintId: string;                 // FK → ComplaintCourse.id
    visitType: 'CONSULTATION' | 'MACHINE_ONLY';
    // Only for CONSULTATION:
    consultationType?: 'FIRST' | 'SUBSEQUENT';
    consultationFee: number;             // 300 (FIRST) | 200 (SUBSEQUENT) | 0 (MACHINE_ONLY)
    services: VisitService[];            // all services used this session
    servicesTotal: number;               // sum of charged VisitServices
    grandTotal: number;                  // consultationFee + servicesTotal
}

// ── Legacy VisitRecord kept for backward compat during transition ──────────────
export interface VisitRecord {
    id: string;
    patientId: string;
    date: string;
    complaint: string;
    visitType: 'CONSULT' | 'MACHINE_ONLY';
    therapies: string[];
    amount: number;
}

// ── Complaint course: one entry per complaint/treatment course ─────────────────
// Represents the full arc of a complaint — from first session to last.
export interface ComplaintCourse {
    id: string;
    patientId: string;
    complaintName: string;               // e.g. "Ankle Sprain", "Knee Injury"
    startDate: string;                   // YYYY-MM-DD — date of first session
    endDate: string;                     // YYYY-MM-DD — date of last session (or ongoing)
    totalSessions: number;
    status: 'Active' | 'Completed';
}

export interface PurchaseRecord {
    id: string;
    patientId: string;
    name: string;
    sessionsUsed: number;
    sessionsTotal: number;
    status: 'Active' | 'Completed' | 'Expired';
}

export interface InvoiceRecord {
    id: string;
    patientId: string;
    amount: number;
    date: string;
    paymentStatus: 'Paid' | 'Pending' | 'Overdue';
}

