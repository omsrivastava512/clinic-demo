
// ==========================================
// 1. TYPES & INTERFACES (types.ts)
// ==========================================

import type { ClinicalNote } from '@/features/patient/types';



// Ref: ADR-PP-01 — Patient is a discriminated intersection type to enforce referralDoctorInfo constraints.
export type Patient = {
  id: string;
  mrn: string;
  fullName: string;
  dateOfBirth: string;     // date
  lastVisitAt: string;     // timestamp
  phone: string;
  address: string;
  gender: string;
  notes?: ClinicalNote;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} & (
  | { referralMode: 'WALKIN' | 'GOOGLE'; referralDoctorInfo?: never }
  | { referralMode: 'DOCTOR'; referralDoctorInfo: string }
);


export interface MedicalComplaint {
    id: string;
    title: string; // e.g., "Cervical Spondylosis"
    doctor?: string;
    isActive: boolean;
    type: 'EXISTING' | 'NEW';
    // Optional: set for catalog entries so region chips can filter them.
    // Patient-level complaints (EXISTING / NEW) don't carry a region.
    region?: string;
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
    // TODO: Make patientId required once the database and backend integration is complete
    // and patient profiles exist for all ledger entries (currently some mock entries lack profiles).
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

// Ref: ADR-PP-02 — type alias required; interfaces cannot extend discriminated union types.
export type PatientProfile = Patient & {
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
    // DEBT: isCharged and chargedAmount should be derived at read time, not stored
    // Use shouldChargeService() and calculateServiceCharge() from patientUtils instead
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
    // DEBT: These billing fields should be derived at read time, not stored
    // Use calculateConsultationFee() from patientUtils instead
    consultationFee: number;             // 300 (FIRST) | 200 (SUBSEQUENT) | 0 (MACHINE_ONLY)
    services: VisitService[];            // all services used this session
    servicesTotal: number;               // sum of charged VisitServices
    grandTotal: number;                  // consultationFee + servicesTotal
}

// ── Legacy VisitRecord kept for backward compat during transition ──────────────
// REMOVE: Legacy type, migrate all code to Visit model
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
    lastDate: string;                    // YYYY-MM-DD — date of last session (or ongoing)
    totalSessions: number;
    status: 'Active' | 'Completed';
}

// DECISION: dayLog stores per-day attendance status for the full package duration.
// Max 30 elements (clinic's max package length). This lets the UI show *which* specific
// days were missed (not just how many), enabling streak-style visualization.
// attendedDays / missedDays are kept as denormalised aggregates for cheap filtering/display.
export type DayStatus = 'attended' | 'missed' | 'upcoming';

export interface PackageRecord {
    id: string;
    patientId: string;
    linkedComplaintId: string;
    linkedComplaintName: string;
    packageName: string;
    purchaseDate: string;
    durationDays: number;
    expiryDate: string;
    excludeSundays: boolean;
    attendedDays: number;
    missedDays: number;
    amountPaid: number;
    status: 'Active' | 'Completed' | 'Expired';
    // Per-day log — length === durationDays, index 0 = day 1 of package
    dayLog: DayStatus[];
}

export interface InvoiceRecord {
    id: string;
    patientId: string;
    amount: number;
    date: string;
    paymentStatus: 'Paid' | 'Pending' | 'Overdue';
}

