import type { LedgerEntry, MedicalComplaint, Patient, Procedure } from '@/types';

export const MOCK_PATIENTS: Patient[] = [
  // 1
  {
    id: "uuid-p01",
    mrn: "MED-001",
    fullName: "Priya Kapoor",
    dateOfBirth: "1988-03-12",
    lastVisitAt: "2024-02-11T09:45:00Z",
    phone: "9000000001",
    address: "Flat 12A, Lokhandwala, Mumbai",
    gender: "female",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 2
  {
    id: "uuid-p02",
    mrn: "MED-002",
    fullName: "Vikram Singh",
    dateOfBirth: "1985-01-22",
    lastVisitAt: "2024-03-18T10:30:00Z",
    phone: "9000000002",
    address: "House 44, Rajouri Garden, Delhi",
    gender: "male",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 3
  {
    id: "uuid-p03",
    mrn: "MED-003",
    fullName: "Anjali Devi",
    dateOfBirth: "1990-11-04",
    lastVisitAt: "2024-01-29T08:55:00Z",
    phone: "9000000003",
    address: "Plot 9, Besant Nagar, Chennai",
    gender: "female",
    referralMode: "DOCTOR",
    referralDoctorInfo: "Dr. Rao – Orthopedics",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 4
  {
    id: "uuid-p04",
    mrn: "MED-004",
    fullName: "Suresh Menon",
    dateOfBirth: "1978-07-18",
    lastVisitAt: "2024-02-02T09:10:00Z",
    phone: "9000000004",
    address: "Villa 21, HSR Layout, Bangalore",
    gender: "male",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 5
  {
    id: "uuid-p05",
    mrn: "MED-005",
    fullName: "Vijay Kumar",
    dateOfBirth: "1980-10-10",
    lastVisitAt: "2024-03-07T10:40:00Z",
    phone: "9000000005",
    address: "Flat 204, Jubilee Hills, Hyderabad",
    gender: "male",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 6
  {
    id: "uuid-p06",
    mrn: "MED-006",
    fullName: "Rahul Sharma",
    dateOfBirth: "1986-01-05",
    lastVisitAt: "2024-01-20T07:55:00Z",
    phone: "9000000006",
    address: "Block C2, Koregaon Park, Pune",
    gender: "male",
    referralMode: "DOCTOR",
    referralDoctorInfo: "Dr. Mehta – Sports Physio",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 7
  {
    id: "uuid-p07",
    mrn: "MED-007",
    fullName: "Meena Kumari",
    dateOfBirth: "1985-05-11",
    lastVisitAt: "2024-02-28T09:20:00Z",
    phone: "9000000007",
    address: "Lane 5, Old Palasia, Indore",
    gender: "female",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 8
  {
    id: "uuid-p08",
    mrn: "MED-008",
    fullName: "Arjun Reddy",
    dateOfBirth: "1987-04-30",
    lastVisitAt: "2024-03-11T10:10:00Z",
    phone: "9000000008",
    address: "Sector 7, MVP Colony, Vizag",
    gender: "male",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 9
  {
    id: "uuid-p09",
    mrn: "MED-009",
    fullName: "Nisha Singh",
    dateOfBirth: "1993-03-15",
    lastVisitAt: "2024-02-06T09:35:00Z",
    phone: "9000000009",
    address: "House 78, Malviya Nagar, Jaipur",
    gender: "female",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 10
  {
    id: "uuid-p10",
    mrn: "MED-010",
    fullName: "Pooja Sharma",
    dateOfBirth: "1982-09-28",
    lastVisitAt: "2024-01-26T08:50:00Z",
    phone: "9000000010",
    address: "Ghod Dod Road, Surat",
    gender: "female",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 11
  {
    id: "uuid-p11",
    mrn: "MED-011",
    fullName: "Ravi Verma",
    dateOfBirth: "1980-09-21",
    lastVisitAt: "2024-03-05T09:05:00Z",
    phone: "9000000011",
    address: "Sector 10, Panchkula",
    gender: "male",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 12
  {
    id: "uuid-p12",
    mrn: "MED-012",
    fullName: "Deepa Mehta",
    dateOfBirth: "1970-08-16",
    lastVisitAt: "2024-02-24T09:15:00Z",
    phone: "9000000012",
    address: "Sector 62, Noida",
    gender: "female",
    referralMode: "DOCTOR",
    referralDoctorInfo: "Dr. Kapoor – Spine Specialist",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 13
  {
    id: "uuid-p13",
    mrn: "MED-013",
    fullName: "Geeta Devi",
    dateOfBirth: "1983-07-16",
    lastVisitAt: "2024-02-17T10:20:00Z",
    phone: "9000000013",
    address: "Sector 14, Lucknow",
    gender: "female",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 14
  {
    id: "uuid-p14",
    mrn: "MED-014",
    fullName: "Mohan Lal",
    dateOfBirth: "1988-05-16",
    lastVisitAt: "2024-01-31T08:40:00Z",
    phone: "9000000014",
    address: "Trimurti Chowk, Nagpur",
    gender: "male",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 15
  {
    id: "uuid-p15",
    mrn: "MED-015",
    fullName: "Kavita Rao",
    dateOfBirth: "1974-01-10",
    lastVisitAt: "2024-03-01T09:00:00Z",
    phone: "9000000015",
    address: "Zone 1, MP Nagar, Bhopal",
    gender: "female",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 16
  {
    id: "uuid-p16",
    mrn: "MED-016",
    fullName: "Ashok Kumar",
    dateOfBirth: "1976-02-11",
    lastVisitAt: "2024-02-22T09:25:00Z",
    phone: "9000000016",
    address: "Ghodbunder Road, Thane",
    gender: "male",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 17
  {
    id: "uuid-p17",
    mrn: "MED-017",
    fullName: "Rajesh Khanna",
    dateOfBirth: "1968-04-19",
    lastVisitAt: "2024-02-14T10:15:00Z",
    phone: "9000000017",
    address: "Salt Lake Sector 1, Kolkata",
    gender: "male",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 18
  {
    id: "uuid-p18",
    mrn: "MED-018",
    fullName: "Shalini Gupta",
    dateOfBirth: "1991-12-02",
    lastVisitAt: "2024-03-09T09:30:00Z",
    phone: "9000000018",
    address: "Rajendra Nagar, Patna",
    gender: "female",
    referralMode: "DOCTOR",
    referralDoctorInfo: "Dr. Singh – Rehabilitation",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 19
  {
    id: "uuid-p19",
    mrn: "MED-019",
    fullName: "Gaurav Singh",
    dateOfBirth: "1984-09-17",
    lastVisitAt: "2024-02-08T08:35:00Z",
    phone: "9000000019",
    address: "Sector 8, Panchkula",
    gender: "male",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 20
  {
    id: "uuid-p20",
    mrn: "MED-020",
    fullName: "Sanjay Dutt",
    dateOfBirth: "1972-08-01",
    lastVisitAt: "2024-03-03T10:05:00Z",
    phone: "9000000020",
    address: "Aundh, Pune",
    gender: "male",
    referralMode: "GOOGLE",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 21
  {
    id: "uuid-p21",
    mrn: "MED-021",
    fullName: "Smita Patil",
    dateOfBirth: "1980-12-09",
    lastVisitAt: "2024-02-19T09:50:00Z",
    phone: "9000000021",
    address: "College Road, Nashik",
    gender: "female",
    referralMode: "DOCTOR",
    referralDoctorInfo: "Dr. Nair – Neuro Physio",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  },

  // 22 (duplicate name preserved)
  {
    id: "uuid-p22",
    mrn: "MED-022",
    fullName: "Priya Kapoor",
    dateOfBirth: "1992-02-28",
    lastVisitAt: "2024-03-12T10:25:00Z",
    phone: "9000000022",
    address: "Satellite Road, Ahmedabad",
    gender: "female",
    referralMode: "WALKIN",
    isActive: true,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z"
  }
];




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
  gender enum,
  last_visit_at timestamptz,
  notes text,
  is_active boolean default true,
  referral_mode enum,
  referral_doctor_info text

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