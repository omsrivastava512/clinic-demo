import type { LedgerEntry, MedicalComplaint, Patient, Procedure } from '@/types';

export const MOCK_PATIENTS: Patient[] = [
    {
        "id": "uuid-p01",
        "mrn": "MED-992",
        "fullName": "Amitabh Bachchan",
        "dateOfBirth": "1942-10-11",
        "lastVisitAt": "2026-01-28T10:00:00Z",
        "phone": "9876543210",
        "address": "Prateeksha, Juhu",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p02",
        "mrn": "MED-881",
        "fullName": "Sania Mirza",
        "dateOfBirth": "1986-11-15",
        "lastVisitAt": "2024-05-22T10:00:00Z",
        "phone": "9988776655",
        "address": "Banjara Hills, Hyderabad",
        "gender": "female",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p03",
        "mrn": "MED-774",
        "fullName": "Virat Kohli",
        "dateOfBirth": "1988-11-05",
        "lastVisitAt": "2024-05-31T10:00:00Z",
        "phone": "9123456789",
        "address": "DLF Phase 1, Gurgaon",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p04",
        "mrn": "MED-663",
        "fullName": "Priyanka Chopra",
        "dateOfBirth": "1982-07-18",
        "lastVisitAt": "2024-05-01T10:00:00Z",
        "phone": "9898989898",
        "address": "Versova, Andheri West",
        "gender": "female",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p05",
        "mrn": "MED-552",
        "fullName": "Shah Rukh Khan",
        "dateOfBirth": "1965-11-02",
        "lastVisitAt": "2024-05-11T10:00:00Z",
        "phone": "9000011111",
        "address": "Bandstand, Bandra West",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p06",
        "mrn": "MED-441",
        "fullName": "Deepika Padukone",
        "dateOfBirth": "1986-01-05",
        "lastVisitAt": "2024-05-27T10:00:00Z",
        "phone": "9222233333",
        "address": "Pali Hill, Bandra",
        "gender": "female",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p07",
        "mrn": "MED-330",
        "fullName": "Ranveer Singh",
        "dateOfBirth": "1985-07-06",
        "lastVisitAt": "2024-06-01T10:00:00Z",
        "phone": "9444455555",
        "address": "Carter Road, Bandra West",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p08",
        "mrn": "MED-229",
        "fullName": "Rohit Sharma",
        "dateOfBirth": "1987-04-30",
        "lastVisitAt": "2024-04-01T10:00:00Z",
        "phone": "9666677777",
        "address": "Worli Sea Face",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p09",
        "mrn": "MED-118",
        "fullName": "Alia Bhatt",
        "dateOfBirth": "1993-03-15",
        "lastVisitAt": "2024-05-25T10:00:00Z",
        "phone": "9888899999",
        "address": "Juhu Tara Road",
        "gender": "female",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p10",
        "mrn": "MED-007",
        "fullName": "Ranbir Kapoor",
        "dateOfBirth": "1982-09-28",
        "lastVisitAt": "2024-05-28T10:00:00Z",
        "phone": "9111122222",
        "address": "Hill Road, Bandra",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p11",
        "mrn": "MED-123",
        "fullName": "Kareena Kapoor",
        "dateOfBirth": "1980-09-21",
        "lastVisitAt": "2024-06-01T09:59:00Z",
        "phone": "9333344444",
        "address": "Fortune Heights, Bandra West",
        "gender": "female",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p12",
        "mrn": "MED-456",
        "fullName": "Saif Ali Khan",
        "dateOfBirth": "1970-08-16",
        "lastVisitAt": "2024-05-31T10:00:00Z",
        "phone": "9555566666",
        "address": "Pataudi House, Gurgaon, HR",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p13",
        "mrn": "MED-789",
        "fullName": "Katrina Kaif",
        "dateOfBirth": "1983-07-16",
        "lastVisitAt": "2024-05-30T10:00:00Z",
        "phone": "9777788888",
        "address": "Palm Beach Road, Navi Mumbai",
        "gender": "female",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p14",
        "mrn": "MED-101",
        "fullName": "Vicky Kaushal",
        "dateOfBirth": "1988-05-16",
        "lastVisitAt": "2024-05-29T10:00:00Z",
        "phone": "9999900000",
        "address": "Lokhandwala Complex",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "id": "uuid-p15",
        "mrn": "MED-202",
        "fullName": "Hrithik Roshan",
        "dateOfBirth": "1974-01-10",
        "lastVisitAt": "2024-05-01T10:00:00Z",
        "phone": "9222211111",
        "address": "Juhu Scheme",
        "gender": "male",
        "isActive": true,
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    }
]


export const MOCK_CONTEXTS: MedicalComplaint[] = [
    { id: 'CTX_01', title: 'Chronic Lower Back Pain (L4-L5)', doctor: 'Dr. R. Sharma', isActive: true, type: 'EXISTING' },
    { id: 'CTX_02', title: 'Post-Op ACL Rehab (Right Knee)', doctor: 'Dr. A. Gupta', isActive: true, type: 'EXISTING' },
    { id: 'CTX_03', title: 'Femur Fracture (Right Leg)', doctor: 'Dr. A. Gupta', isActive: true, type: 'EXISTING' },
];

export const PHYSIO_PROCEDURES: Procedure[] = [
    { id: 'PROC_01', name: 'Consultation', code: 'CON01', cost: 500 },
    { id: 'PROC_02', name: 'Ultrasonic Therapy (US)', code: 'US001', cost: 250 },
    { id: 'PROC_03', name: 'Interferential Therapy (IFT)', code: 'IFT01', cost: 300 },
    { id: 'PROC_04', name: 'TENS', code: 'TENS1', cost: 200 },
    { id: 'PROC_05', name: 'Manual Therapy / Mob', code: 'MAN01', cost: 400 },
    { id: 'PROC_06', name: 'Short Wave Diathermy', code: 'SWD01', cost: 300 },
    { id: 'PROC_07', name: 'Cervical Traction', code: 'TRAC1', cost: 250 },
    { id: 'PROC_08', name: 'Kinesio Taping', code: 'KT001', cost: 150 },
];

export const MOCK_LEDGER_ENTRIES: LedgerEntry[] = [
    { id: 'LE02', time: '10:30 AM', patientName: 'Priya Kapoor', treatment: 'Ankle Sprain (Taping)', status: 'In Therapy' },
    { id: 'LE01', time: '10:15 AM', patientName: 'Vikram Singh', treatment: 'Frozen Shoulder (IFT + US)', status: 'Paid' },
    { id: 'LE04', time: '11:00 AM', patientName: 'Anjali Devi', treatment: 'Shoulder Impingement (US)', status: 'Paid' },
    { id: 'LE05', time: '11:15 AM', patientName: 'Suresh Menon', treatment: 'Cervical Spondylosis (TENS)', status: 'In Therapy' },
    { id: 'LE09', time: '12:15 PM', patientName: 'Vijay Kumar', treatment: 'Sciatica (SWD)', status: 'Paid' },
    { id: 'LE03', time: '10:45 AM', patientName: 'Rahul Sharma', treatment: 'Knee Pain (IFT)', status: 'Waiting' },
    { id: 'LE06', time: '11:30 AM', patientName: 'Meena Kumari', treatment: 'Back Strain (Manual Therapy)', status: 'Paid' },
    { id: 'LE07', time: '11:45 AM', patientName: 'Arjun Reddy', treatment: 'Tennis Elbow (US)', status: 'Waiting' },
    { id: 'LE08', time: '12:00 PM', patientName: 'Nisha Singh', treatment: 'Plantar Fasciitis (IFT)', status: 'In Therapy' },
    { id: 'LE10', time: '12:30 PM', patientName: 'Pooja Sharma', treatment: 'Frozen Shoulder (Cervical Traction)', status: 'Waiting' },
    { id: 'LE11', time: '01:00 PM', patientName: 'Ravi Verma', treatment: 'Post-Op Knee Rehab (Kinesio Taping)', status: 'In Therapy' },
    { id: 'LE16', time: '02:15 PM', patientName: 'Deepa Mehta', treatment: 'Rotator Cuff Injury (US)', status: 'Waiting' },
    { id: 'LE12', time: '01:15 PM', patientName: 'Geeta Devi', treatment: 'Wrist Sprain (US)', status: 'Paid' },
    { id: 'LE13', time: '01:30 PM', patientName: 'Mohan Lal', treatment: 'Neck Pain (TENS)', status: 'Waiting' },
    { id: 'LE14', time: '01:45 PM', patientName: 'Kavita Rao', treatment: 'Hip Bursitis (IFT)', status: 'In Therapy' },
    { id: 'LE17', time: '02:30 PM', patientName: 'Ashok Kumar', treatment: 'Lumbar Spondylosis (SWD)', status: 'In Therapy' },
    { id: 'LE19', time: '03:00 PM', patientName: 'Rajesh Khanna', treatment: 'Achilles Tendonitis (Kinesio Taping)', status: 'Waiting' },
    { id: 'LE18', time: '02:45 PM', patientName: 'Shalini Gupta', treatment: 'Migraine (Cervical Traction)', status: 'Paid' },
    { id: 'LE21', time: '03:30 PM', patientName: 'Gaurav Singh', treatment: 'Groin Strain (IFT)', status: 'Paid' },
    { id: 'LE15', time: '02:00 PM', patientName: 'Sanjay Dutt', treatment: 'Ankle Fracture Rehab (Manual Therapy)', status: 'Paid' },
    { id: 'LE20', time: '03:15 PM', patientName: 'Smita Patil', treatment: 'Carpal Tunnel Syndrome (US)', status: 'In Therapy' },
    { id: 'LE22', time: '03:45 PM', patientName: 'Priya Kapoor', treatment: 'Ankle Sprain (Taping)', status: 'In Therapy' },
];




/**
 * 
 * 
  create table patients (
  id uuid primary key default gen_random_uuid(),
  mrn text not null unique,
  full_name text not null,
  phone text,
  address text,
  date_of_birth date,
  gender text,
  last_visit_at timestamptz,
  notes text,
  is_active boolean default true,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep updated_at fresh
create trigger update_timestamp
before update on patients
for each row
execute procedure trigger_set_timestamp();

 */

/**
 * 
 * function toCamel(row: any): Patient {
  return {
    id: row.id,
    mrn: row.mrn,
    fullName: row.full_name,
    dateOfBirth: row.date_of_birth,
    lastVisitAt: row.last_visit_at,
    phone: row.phone,
    address: row.address,
    gender: row.gender,
    notes: row.notes,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

 */