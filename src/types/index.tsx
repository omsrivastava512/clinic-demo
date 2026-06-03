
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
    patientId?: string;
}

