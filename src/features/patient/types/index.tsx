
// TODO: add an 'ok' fn for each property to display a green ring in the input when the validation meets (Created on 2026-01-04)
// TODO: if the patient is minor don't allow intake unless guardian present (Created on 2026-01-04)
// ❗ Guardian Required
// Patient is under 18 and no parent/guardian is recorded as present.
// Do not continue intake until guardian identity and consent are verified.

export type FormData = {
    name: string;
    phone: string;
    sex: 'M' | 'F' | 'X';
    age: string; // DEBT: Change to DOB and implement a datepicker
    address: string;
    clinicalNotes?: ClinicalNote[];
} & ({ referral: 'WALKIN' | 'GOOGLE'; doctorInfo?: never; } |
{ referral: 'DOCTOR'; doctorInfo: string; });

export interface ClinicalNote {
  category: string;
  observation: string;
  isCritical: boolean;
}

