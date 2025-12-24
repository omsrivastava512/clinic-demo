
// ==========================================
// 1. TYPES & INTERFACES (types.ts)
// ==========================================

export interface Patient {
    id: string;
    name: string; // e.g., "Rajesh Kumar"
    mrn: string;
    phone: string;
    address:string;
    lastVisit?: string;
}

export interface MedicalContext {
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
    contextId: string; // Links the procedure to a specific body part/issue
    name: string;
    contextName: string;
    cost: number;
}

export interface LedgerEntry {
    id: string;
    time: string;
    patientName: string;
    treatment: string;
    status: 'Paid' | 'In Therapy' | 'Waiting';
}

