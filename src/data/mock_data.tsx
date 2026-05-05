import type {
  ComplaintCourse,
  InvoiceRecord,
  LedgerEntry,
  MedicalComplaint,
  Patient,
  PatientProfile,
  Procedure,
  PurchaseRecord,
  Service,
  Visit,
  VisitRecord,
} from '@/types';

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
    { id: 'LE02', time: '10:30 AM', patientName: 'Priya Kapoor', treatment: 'Ankle Sprain (Taping)', status: 'In Therapy', patientId: 'uuid-p01' },
    { id: 'LE01', time: '10:15 AM', patientName: 'Vikram Singh', treatment: 'Frozen Shoulder (IFT + US)', status: 'Paid', patientId: 'uuid-p02' },
    { id: 'LE04', time: '11:00 AM', patientName: 'Anjali Devi', treatment: 'Shoulder Impingement (US)', status: 'Paid', patientId: 'uuid-p03' },
    { id: 'LE05', time: '11:15 AM', patientName: 'Suresh Menon', treatment: 'Cervical Spondylosis (TENS)', status: 'In Therapy', patientId: 'uuid-p04' },
    { id: 'LE09', time: '12:15 PM', patientName: 'Vijay Kumar', treatment: 'Sciatica (SWD)', status: 'Paid', patientId: 'uuid-p05' },
    { id: 'LE03', time: '10:45 AM', patientName: 'Rahul Sharma', treatment: 'Knee Pain (IFT)', status: 'Waiting', patientId: 'uuid-p06' },
    { id: 'LE06', time: '11:30 AM', patientName: 'Meena Kumari', treatment: 'Back Strain (Manual Therapy)', status: 'Paid', patientId: 'uuid-p07' },
    { id: 'LE07', time: '11:45 AM', patientName: 'Arjun Reddy', treatment: 'Tennis Elbow (US)', status: 'Waiting', patientId: 'uuid-p08' },
    { id: 'LE08', time: '12:00 PM', patientName: 'Nisha Singh', treatment: 'Plantar Fasciitis (IFT)', status: 'In Therapy', patientId: 'uuid-p09' },
    { id: 'LE10', time: '12:30 PM', patientName: 'Pooja Sharma', treatment: 'Frozen Shoulder (Cervical Traction)', status: 'Waiting', patientId: 'uuid-p10' },
    { id: 'LE11', time: '01:00 PM', patientName: 'Ravi Verma', treatment: 'Post-Op Knee Rehab (Kinesio Taping)', status: 'In Therapy', patientId: 'uuid-p11' },
    { id: 'LE16', time: '02:15 PM', patientName: 'Deepa Mehta', treatment: 'Rotator Cuff Injury (US)', status: 'Waiting', patientId: 'uuid-p12' },
    { id: 'LE12', time: '01:15 PM', patientName: 'Geeta Devi', treatment: 'Wrist Sprain (US)', status: 'Paid', patientId: 'uuid-p13' },
    { id: 'LE13', time: '01:30 PM', patientName: 'Mohan Lal', treatment: 'Neck Pain (TENS)', status: 'Waiting', patientId: 'uuid-p14' },
    { id: 'LE14', time: '01:45 PM', patientName: 'Kavita Rao', treatment: 'Hip Bursitis (IFT)', status: 'In Therapy', patientId: 'uuid-p15' },
    { id: 'LE17', time: '02:30 PM', patientName: 'Ashok Kumar', treatment: 'Lumbar Spondylosis (SWD)', status: 'In Therapy', patientId: 'uuid-p16' },
    { id: 'LE19', time: '03:00 PM', patientName: 'Rajesh Khanna', treatment: 'Achilles Tendonitis (Kinesio Taping)', status: 'Waiting', patientId: 'uuid-p17' },
    { id: 'LE18', time: '02:45 PM', patientName: 'Shalini Gupta', treatment: 'Migraine (Cervical Traction)', status: 'Paid', patientId: 'uuid-p18' },
    { id: 'LE21', time: '03:30 PM', patientName: 'Gaurav Singh', treatment: 'Groin Strain (IFT)', status: 'Paid', patientId: 'uuid-p19' },
    { id: 'LE15', time: '02:00 PM', patientName: 'Sanjay Dutt', treatment: 'Ankle Fracture Rehab (Manual Therapy)', status: 'Paid', patientId: 'uuid-p20' },
    { id: 'LE20', time: '03:15 PM', patientName: 'Smita Patil', treatment: 'Carpal Tunnel Syndrome (US)', status: 'In Therapy', patientId: 'uuid-p21' },
    { id: 'LE22', time: '03:45 PM', patientName: 'Priya Kapoor', treatment: 'Ankle Sprain (Taping)', status: 'In Therapy', patientId: 'uuid-p22' },
];




// ==========================================
// PATIENT PASSPORT MOCK DATA
// ==========================================

export const MOCK_PATIENT_PROFILES: PatientProfile[] = [
  // Priya Kapoor (uuid-p01)
  {
    id: 'uuid-p01',
    mrn: 'MED-001',
    fullName: 'Priya Kapoor',
    dateOfBirth: '1988-03-12',
    lastVisitAt: '2024-02-11T09:45:00Z',
    phone: '9000000001',
    address: 'Flat 12A, Lokhandwala, Mumbai',
    gender: 'female',
    referralMode: 'WALKIN',
    isActive: true,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    bloodType: 'B+',
    insurerName: 'Star Health Insurance',
    alerts: [
      { type: 'ALLERGY', label: 'Penicillin Allergy' },
    ],
    vitals: [
      { type: 'BP', value: '118/76', unit: 'mmHg', recordedAt: '2024-02-11T09:30:00Z', trend: 'NORMAL' },
      { type: 'HR', value: '78', unit: 'bpm', recordedAt: '2024-02-11T09:30:00Z', trend: 'NORMAL' },
      { type: 'TEMP', value: '98.4', unit: '°F', recordedAt: '2024-02-11T09:30:00Z', trend: 'NORMAL' },
      { type: 'SPO2', value: '98', unit: '%', recordedAt: '2024-02-11T09:30:00Z', trend: 'NORMAL' },
    ],
    timeline: [
      {
        id: 'TL-p01-01',
        title: 'Ankle Sprain',
        description: 'Grade II lateral ankle sprain. Taping, IFT, and strengthening protocol.',
        timestamp: '2024-01-15T09:00:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
      {
        id: 'TL-p01-02',
        title: 'Cervical Spondylosis',
        description: 'Neck stiffness and radiating pain. TENS and cervical traction applied.',
        timestamp: '2024-01-15T09:30:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
      {
        id: 'TL-p01-03',
        title: 'Plantar Fasciitis',
        description: 'Heel pain on weight bearing. US and manual therapy. Fully resolved.',
        timestamp: '2023-06-01T09:00:00Z',
        doctorName: 'Dr. A. Gupta',
        doctorInitials: 'AG',
        category: 'PHYSIO',
      },
    ],
  },

  // Vikram Singh (uuid-p02)
  {
    id: 'uuid-p02',
    mrn: 'MED-002',
    fullName: 'Vikram Singh',
    dateOfBirth: '1985-01-22',
    lastVisitAt: '2024-03-18T10:30:00Z',
    phone: '9000000002',
    address: 'House 44, Rajouri Garden, Delhi',
    gender: 'male',
    referralMode: 'GOOGLE',
    isActive: true,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    bloodType: 'O+',
    insurerName: 'HDFC ERGO Health',
    alerts: [
      { type: 'FALL_RISK', label: 'Post-Op Fall Risk' },
    ],
    vitals: [
      { type: 'BP', value: '138/88', unit: 'mmHg', recordedAt: '2024-03-18T10:15:00Z', trend: 'HIGH' },
      { type: 'HR', value: '82', unit: 'bpm', recordedAt: '2024-03-18T10:15:00Z', trend: 'NORMAL' },
      { type: 'TEMP', value: '99.1', unit: '°F', recordedAt: '2024-03-18T10:15:00Z', trend: 'HIGH' },
      { type: 'SPO2', value: '97', unit: '%', recordedAt: '2024-03-18T10:15:00Z', trend: 'NORMAL' },
    ],
    timeline: [
      {
        id: 'TL-p02-01',
        title: 'Frozen Shoulder (Adhesive Capsulitis)',
        description: 'Conservative management with IFT, ultrasound, and mobilisation. Referred by Dr. Mehta.',
        timestamp: '2024-02-20T10:00:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
      {
        id: 'TL-p02-02',
        title: 'Lumbar Spondylosis',
        description: 'Lower back stiffness and radiating pain. SWD, TENS, and manual therapy.',
        timestamp: '2024-02-20T10:30:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
      {
        id: 'TL-p02-03',
        title: 'Tennis Elbow (Right)',
        description: 'Lateral epicondylitis. US and manual therapy. Resolved after 8 sessions.',
        timestamp: '2023-03-10T09:00:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
    ],
  },

  // Anjali Devi (uuid-p03)
  {
    id: 'uuid-p03',
    mrn: 'MED-003',
    fullName: 'Anjali Devi',
    dateOfBirth: '1990-11-04',
    lastVisitAt: '2024-01-29T08:55:00Z',
    phone: '9000000003',
    address: 'Plot 9, Besant Nagar, Chennai',
    gender: 'female',
    referralMode: 'DOCTOR',
    referralDoctorInfo: 'Dr. Rao – Orthopedics',
    isActive: true,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    bloodType: 'A-',
    insurerName: 'New India Assurance',
    alerts: [
      { type: 'ALLERGY', label: 'NSAIDs Allergy' },
      { type: 'OTHER', label: 'Diabetic — Monitor Glucose' },
    ],
    vitals: [
      { type: 'BP', value: '122/80', unit: 'mmHg', recordedAt: '2024-01-29T08:40:00Z', trend: 'NORMAL' },
      { type: 'HR', value: '68', unit: 'bpm', recordedAt: '2024-01-29T08:40:00Z', trend: 'NORMAL' },
      { type: 'TEMP', value: '97.8', unit: '°F', recordedAt: '2024-01-29T08:40:00Z', trend: 'LOW' },
      { type: 'SPO2', value: '99', unit: '%', recordedAt: '2024-01-29T08:40:00Z', trend: 'NORMAL' },
    ],
    timeline: [
      {
        id: 'TL-p03-01',
        title: 'Shoulder Impingement Syndrome',
        description: 'Ultrasound and manual therapy for supraspinatus impingement. Referred by Dr. Rao.',
        timestamp: '2024-01-10T09:00:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
      {
        id: 'TL-p03-02',
        title: 'Knee Osteoarthritis',
        description: 'Bilateral knee OA. IFT and manual therapy. Long-running chronic management.',
        timestamp: '2023-04-12T10:00:00Z',
        doctorName: 'Dr. R. Sharma',
        doctorInitials: 'RS',
        category: 'PHYSIO',
      },
      {
        id: 'TL-p03-03',
        title: 'Cervical Radiculopathy',
        description: 'Nerve root compression at C5-C6. TENS, traction, and manual therapy. Resolved.',
        timestamp: '2022-11-01T09:00:00Z',
        doctorName: 'Dr. A. Gupta',
        doctorInitials: 'AG',
        category: 'PHYSIO',
      },
    ],
  },
];

// ==========================================
// VISITS
// One row = one session for one complaint.
// Same day + two complaints = two separate rows.
// Therapies belong to that specific complaint's session.
// ==========================================

export const MOCK_VISITS: VisitRecord[] = [

  // ── Priya Kapoor (uuid-p01) ──────────────────────────────────────────────────
  // Ankle Sprain + Cervical Spondylosis running in parallel.
  // Some days she comes for both (separate rows), some days only one.

  // Jan 15 — consult for both complaints (separate rows)
  { id: 'V-p01-01', patientId: 'uuid-p01', date: '2024-01-15', complaint: 'Ankle Sprain',        visitType: 'CONSULT',      therapies: [],                                  amount: 500 },
  { id: 'V-p01-02', patientId: 'uuid-p01', date: '2024-01-15', complaint: 'Cervical Spondylosis', visitType: 'CONSULT',      therapies: [],                                  amount: 500 },
  // Jan 17 — machine sessions, different procedures per complaint
  { id: 'V-p01-03', patientId: 'uuid-p01', date: '2024-01-17', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p01-04', patientId: 'uuid-p01', date: '2024-01-17', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'Cervical Traction'],         amount: 450 },
  // Jan 19 — only ankle sprain
  { id: 'V-p01-05', patientId: 'uuid-p01', date: '2024-01-19', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'Kinesio Taping'],             amount: 450 },
  // Jan 22 — both complaints
  { id: 'V-p01-06', patientId: 'uuid-p01', date: '2024-01-22', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p01-07', patientId: 'uuid-p01', date: '2024-01-22', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'Cervical Traction'],         amount: 450 },
  // Jan 24 — only ankle
  { id: 'V-p01-08', patientId: 'uuid-p01', date: '2024-01-24', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['US', 'Manual Therapy'],              amount: 650 },
  // Jan 26 — only cervical
  { id: 'V-p01-09', patientId: 'uuid-p01', date: '2024-01-26', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'SWD'],                       amount: 550 },
  // Jan 29 — both complaints
  { id: 'V-p01-10', patientId: 'uuid-p01', date: '2024-01-29', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p01-11', patientId: 'uuid-p01', date: '2024-01-29', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['Cervical Traction', 'Manual Therapy'], amount: 650 },
  // Jan 31 — only ankle
  { id: 'V-p01-12', patientId: 'uuid-p01', date: '2024-01-31', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'Kinesio Taping'],             amount: 450 },
  // Feb 02 — only cervical
  { id: 'V-p01-13', patientId: 'uuid-p01', date: '2024-02-02', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'Cervical Traction', 'SWD'],  amount: 700 },
  // Feb 05 — only ankle
  { id: 'V-p01-14', patientId: 'uuid-p01', date: '2024-02-05', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['US', 'Kinesio Taping'],              amount: 400 },
  // Feb 07 — both complaints
  { id: 'V-p01-15', patientId: 'uuid-p01', date: '2024-02-07', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p01-16', patientId: 'uuid-p01', date: '2024-02-07', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'SWD'],                       amount: 550 },
  // Feb 09 — only cervical
  { id: 'V-p01-17', patientId: 'uuid-p01', date: '2024-02-09', complaint: 'Cervical Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['Cervical Traction', 'Manual Therapy'], amount: 650 },
  // Feb 11 — only ankle
  { id: 'V-p01-18', patientId: 'uuid-p01', date: '2024-02-11', complaint: 'Ankle Sprain',        visitType: 'MACHINE_ONLY', therapies: ['IFT', 'Kinesio Taping'],             amount: 450 },

  // ── Vikram Singh (uuid-p02) ──────────────────────────────────────────────────
  // Frozen Shoulder + Lumbar Spondylosis. 3x/week, different procedures per complaint.

  { id: 'V-p02-01', patientId: 'uuid-p02', date: '2024-02-20', complaint: 'Frozen Shoulder',    visitType: 'CONSULT',      therapies: [],                                  amount: 500 },
  { id: 'V-p02-02', patientId: 'uuid-p02', date: '2024-02-20', complaint: 'Lumbar Spondylosis', visitType: 'CONSULT',      therapies: [],                                  amount: 500 },
  { id: 'V-p02-03', patientId: 'uuid-p02', date: '2024-02-22', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p02-04', patientId: 'uuid-p02', date: '2024-02-22', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['SWD', 'TENS'],                       amount: 500 },
  { id: 'V-p02-05', patientId: 'uuid-p02', date: '2024-02-24', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US', 'Manual Therapy'],       amount: 750 },
  { id: 'V-p02-06', patientId: 'uuid-p02', date: '2024-02-26', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['SWD', 'Manual Therapy'],             amount: 650 },
  { id: 'V-p02-07', patientId: 'uuid-p02', date: '2024-02-28', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['US', 'Manual Therapy'],              amount: 650 },
  { id: 'V-p02-08', patientId: 'uuid-p02', date: '2024-02-28', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'Manual Therapy'],            amount: 600 },
  { id: 'V-p02-09', patientId: 'uuid-p02', date: '2024-03-01', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p02-10', patientId: 'uuid-p02', date: '2024-03-04', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US', 'Manual Therapy'],       amount: 750 },
  { id: 'V-p02-11', patientId: 'uuid-p02', date: '2024-03-04', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['SWD', 'TENS', 'Manual Therapy'],     amount: 700 },
  { id: 'V-p02-12', patientId: 'uuid-p02', date: '2024-03-06', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['US', 'Manual Therapy'],              amount: 650 },
  { id: 'V-p02-13', patientId: 'uuid-p02', date: '2024-03-08', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['SWD', 'Manual Therapy'],             amount: 650 },
  { id: 'V-p02-14', patientId: 'uuid-p02', date: '2024-03-11', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p02-15', patientId: 'uuid-p02', date: '2024-03-11', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['SWD', 'TENS'],                       amount: 500 },
  { id: 'V-p02-16', patientId: 'uuid-p02', date: '2024-03-13', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'Manual Therapy'],             amount: 700 },
  { id: 'V-p02-17', patientId: 'uuid-p02', date: '2024-03-15', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['SWD', 'Manual Therapy'],             amount: 650 },
  { id: 'V-p02-18', patientId: 'uuid-p02', date: '2024-03-18', complaint: 'Frozen Shoulder',    visitType: 'MACHINE_ONLY', therapies: ['IFT', 'US'],                        amount: 550 },
  { id: 'V-p02-19', patientId: 'uuid-p02', date: '2024-03-18', complaint: 'Lumbar Spondylosis', visitType: 'MACHINE_ONLY', therapies: ['TENS', 'SWD'],                       amount: 500 },

  // ── Anjali Devi (uuid-p03) ──────────────────────────────────────────────────
  // Shoulder Impingement (newer) + Knee OA (long-running chronic).
  // Some days she skips shoulder and only does knee.

  { id: 'V-p03-01', patientId: 'uuid-p03', date: '2024-01-10', complaint: 'Shoulder Impingement', visitType: 'CONSULT',      therapies: [],                                  amount: 500 },
  { id: 'V-p03-02', patientId: 'uuid-p03', date: '2024-01-12', complaint: 'Shoulder Impingement', visitType: 'MACHINE_ONLY', therapies: ['US', 'IFT'],                        amount: 550 },
  { id: 'V-p03-03', patientId: 'uuid-p03', date: '2024-01-12', complaint: 'Knee Osteoarthritis',  visitType: 'MACHINE_ONLY', therapies: ['IFT', 'TENS'],                       amount: 500 },
  { id: 'V-p03-04', patientId: 'uuid-p03', date: '2024-01-15', complaint: 'Knee Osteoarthritis',  visitType: 'MACHINE_ONLY', therapies: ['IFT', 'TENS', 'Manual Therapy'],     amount: 650 },
  { id: 'V-p03-05', patientId: 'uuid-p03', date: '2024-01-17', complaint: 'Shoulder Impingement', visitType: 'MACHINE_ONLY', therapies: ['US', 'Manual Therapy'],              amount: 650 },
  { id: 'V-p03-06', patientId: 'uuid-p03', date: '2024-01-17', complaint: 'Knee Osteoarthritis',  visitType: 'MACHINE_ONLY', therapies: ['IFT', 'TENS'],                       amount: 500 },
  { id: 'V-p03-07', patientId: 'uuid-p03', date: '2024-01-19', complaint: 'Shoulder Impingement', visitType: 'MACHINE_ONLY', therapies: ['US', 'IFT'],                        amount: 550 },
  { id: 'V-p03-08', patientId: 'uuid-p03', date: '2024-01-22', complaint: 'Shoulder Impingement', visitType: 'MACHINE_ONLY', therapies: ['US', 'Manual Therapy'],              amount: 650 },
  { id: 'V-p03-09', patientId: 'uuid-p03', date: '2024-01-22', complaint: 'Knee Osteoarthritis',  visitType: 'MACHINE_ONLY', therapies: ['IFT', 'Manual Therapy'],             amount: 600 },
  { id: 'V-p03-10', patientId: 'uuid-p03', date: '2024-01-24', complaint: 'Knee Osteoarthritis',  visitType: 'MACHINE_ONLY', therapies: ['TENS', 'Manual Therapy'],            amount: 600 },
  { id: 'V-p03-11', patientId: 'uuid-p03', date: '2024-01-26', complaint: 'Shoulder Impingement', visitType: 'MACHINE_ONLY', therapies: ['US', 'TENS'],                        amount: 500 },
  { id: 'V-p03-12', patientId: 'uuid-p03', date: '2024-01-29', complaint: 'Shoulder Impingement', visitType: 'MACHINE_ONLY', therapies: ['US', 'IFT'],                        amount: 550 },
  { id: 'V-p03-13', patientId: 'uuid-p03', date: '2024-01-29', complaint: 'Knee Osteoarthritis',  visitType: 'MACHINE_ONLY', therapies: ['IFT', 'TENS', 'Manual Therapy'],     amount: 650 },
];

// ==========================================
// COMPLAINT COURSES — one entry per complaint arc
// ==========================================

export const MOCK_COMPLAINT_COURSES: ComplaintCourse[] = [
  // ── Priya Kapoor — 2 active + 4 past ──
  { id: 'CC-p01-01', patientId: 'uuid-p01', complaintName: 'Ankle Sprain',          startDate: '2024-01-15', endDate: '2024-02-11', totalSessions: 10, status: 'Active' },
  { id: 'CC-p01-02', patientId: 'uuid-p01', complaintName: 'Cervical Spondylosis',  startDate: '2024-01-15', endDate: '2024-02-09', totalSessions: 9,  status: 'Active' },
  { id: 'CC-p01-03', patientId: 'uuid-p01', complaintName: 'Plantar Fasciitis',     startDate: '2023-06-01', endDate: '2023-07-15', totalSessions: 12, status: 'Completed' },
  { id: 'CC-p01-04', patientId: 'uuid-p01', complaintName: 'Lower Back Pain',       startDate: '2023-01-10', endDate: '2023-02-28', totalSessions: 14, status: 'Completed' },
  { id: 'CC-p01-05', patientId: 'uuid-p01', complaintName: 'Tennis Elbow (Left)',   startDate: '2022-08-05', endDate: '2022-09-10', totalSessions: 8,  status: 'Completed' },
  { id: 'CC-p01-06', patientId: 'uuid-p01', complaintName: 'Knee Pain (Right)',     startDate: '2021-11-20', endDate: '2022-01-05', totalSessions: 18, status: 'Completed' },

  // ── Vikram Singh — 2 active + 3 past ──
  { id: 'CC-p02-01', patientId: 'uuid-p02', complaintName: 'Frozen Shoulder',       startDate: '2024-02-20', endDate: '2024-03-18', totalSessions: 10, status: 'Active' },
  { id: 'CC-p02-02', patientId: 'uuid-p02', complaintName: 'Lumbar Spondylosis',    startDate: '2024-02-20', endDate: '2024-03-18', totalSessions: 9,  status: 'Active' },
  { id: 'CC-p02-03', patientId: 'uuid-p02', complaintName: 'Tennis Elbow (Right)',  startDate: '2023-03-10', endDate: '2023-04-20', totalSessions: 8,  status: 'Completed' },
  { id: 'CC-p02-04', patientId: 'uuid-p02', complaintName: 'Sciatica',              startDate: '2022-07-01', endDate: '2022-08-30', totalSessions: 16, status: 'Completed' },
  { id: 'CC-p02-05', patientId: 'uuid-p02', complaintName: 'Neck Stiffness',        startDate: '2021-09-15', endDate: '2021-10-20', totalSessions: 6,  status: 'Completed' },

  // ── Anjali Devi — 2 active + 3 past ──
  { id: 'CC-p03-01', patientId: 'uuid-p03', complaintName: 'Shoulder Impingement',  startDate: '2024-01-10', endDate: '2024-01-29', totalSessions: 7,  status: 'Active' },
  { id: 'CC-p03-02', patientId: 'uuid-p03', complaintName: 'Knee Osteoarthritis',   startDate: '2023-04-12', endDate: '2024-01-29', totalSessions: 24, status: 'Active' },
  { id: 'CC-p03-03', patientId: 'uuid-p03', complaintName: 'Cervical Radiculopathy',startDate: '2022-11-01', endDate: '2022-12-20', totalSessions: 15, status: 'Completed' },
  { id: 'CC-p03-04', patientId: 'uuid-p03', complaintName: 'Hip Bursitis',          startDate: '2022-03-05', endDate: '2022-04-15', totalSessions: 10, status: 'Completed' },
  { id: 'CC-p03-05', patientId: 'uuid-p03', complaintName: 'Wrist Sprain',          startDate: '2021-06-20', endDate: '2021-07-10', totalSessions: 5,  status: 'Completed' },
];

export const MOCK_PURCHASES: PurchaseRecord[] = [
  { id: 'PKG-001', patientId: 'uuid-p01', name: 'Ankle Rehab Package (10 sessions)', sessionsUsed: 6, sessionsTotal: 10, status: 'Active' },
  { id: 'PKG-002', patientId: 'uuid-p01', name: 'IFT Therapy Package (5 sessions)', sessionsUsed: 5, sessionsTotal: 5, status: 'Completed' },
  { id: 'PKG-003', patientId: 'uuid-p02', name: 'Frozen Shoulder Package (12 sessions)', sessionsUsed: 8, sessionsTotal: 12, status: 'Active' },
  { id: 'PKG-004', patientId: 'uuid-p02', name: 'US Therapy Package (6 sessions)', sessionsUsed: 6, sessionsTotal: 6, status: 'Completed' },
  { id: 'PKG-005', patientId: 'uuid-p03', name: 'Shoulder Impingement Package (8 sessions)', sessionsUsed: 3, sessionsTotal: 8, status: 'Active' },
];

export const MOCK_INVOICES: InvoiceRecord[] = [
  { id: 'INV-001', patientId: 'uuid-p01', amount: 2500, date: '2024-02-11', paymentStatus: 'Paid' },
  { id: 'INV-002', patientId: 'uuid-p01', amount: 1800, date: '2024-01-28', paymentStatus: 'Paid' },
  { id: 'INV-003', patientId: 'uuid-p01', amount: 500, date: '2024-01-15', paymentStatus: 'Paid' },
  { id: 'INV-004', patientId: 'uuid-p02', amount: 3200, date: '2024-03-18', paymentStatus: 'Pending' },
  { id: 'INV-005', patientId: 'uuid-p02', amount: 2800, date: '2024-03-04', paymentStatus: 'Paid' },
  { id: 'INV-006', patientId: 'uuid-p02', amount: 1500, date: '2024-02-20', paymentStatus: 'Paid' },
  { id: 'INV-007', patientId: 'uuid-p03', amount: 2200, date: '2024-01-29', paymentStatus: 'Paid' },
  { id: 'INV-008', patientId: 'uuid-p03', amount: 1200, date: '2024-01-22', paymentStatus: 'Overdue' },
];


/**
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

// ==========================================
// SERVICE CATALOGUE
// STANDARD = included free in CONSULTATION visits
// PREMIUM  = always charged regardless of visit type
// ==========================================

export const MOCK_SERVICES: Service[] = [
  { id: 'SVC-01', name: 'SWD',              standalonePrice: 80,  category: 'STANDARD' },
  { id: 'SVC-02', name: 'Traction',         standalonePrice: 80,  category: 'STANDARD' },
  { id: 'SVC-03', name: 'UST',              standalonePrice: 70,  category: 'STANDARD' },
  { id: 'SVC-04', name: 'Physical Exercise',standalonePrice: 60,  category: 'STANDARD' },
  { id: 'SVC-05', name: 'Wax',              standalonePrice: 50,  category: 'STANDARD' },
  { id: 'SVC-06', name: 'EMS',              standalonePrice: 50,  category: 'STANDARD' },
  { id: 'SVC-07', name: 'IFT',              standalonePrice: 50,  category: 'STANDARD' },
  { id: 'SVC-08', name: 'TENS',             standalonePrice: 40,  category: 'STANDARD' },
  { id: 'SVC-09', name: 'Infrared',         standalonePrice: 30,  category: 'STANDARD' },
  { id: 'SVC-10', name: 'Massage Gun',      standalonePrice: 20,  category: 'STANDARD' },
  { id: 'SVC-11', name: 'Cupping',          standalonePrice: 500, category: 'PREMIUM'  },
  { id: 'SVC-12', name: 'ISTM',             standalonePrice: 600, category: 'PREMIUM'  },
  { id: 'SVC-13', name: 'Dry Needling',     standalonePrice: 700, category: 'PREMIUM'  },
];

// ==========================================
// VISITS V2 — full billing model
// One Visit per complaint per session.
// isCharged derived: MACHINE_ONLY → always charged; CONSULTATION + STANDARD → free
// ==========================================

const _S = Object.fromEntries(MOCK_SERVICES.map(s => [s.name, s])) as Record<string, Service>;

function _vs(visitId: string, vsId: string, svc: Service, vt: 'CONSULTATION' | 'MACHINE_ONLY') {
  const isCharged = vt === 'MACHINE_ONLY' || svc.category === 'PREMIUM';
  return { id: vsId, visitId, serviceId: svc.id, serviceName: svc.name, serviceCategory: svc.category, isCharged, chargedAmount: isCharged ? svc.standalonePrice : 0 };
}

function _mv(id: string, patientId: string, date: string, complaint: string, complaintId: string, vt: 'CONSULTATION' | 'MACHINE_ONLY', ct: 'FIRST' | 'SUBSEQUENT' | undefined, names: string[]): Visit {
  const consultationFee = vt === 'CONSULTATION' ? (ct === 'FIRST' ? 300 : 200) : 0;
  const services = names.map((n, i) => _vs(id, `${id}-s${i + 1}`, _S[n], vt));
  const servicesTotal = services.reduce((sum, s) => sum + s.chargedAmount, 0);
  return { id, patientId, date, complaint, complaintId, visitType: vt, consultationType: ct, consultationFee, services, servicesTotal, grandTotal: consultationFee + servicesTotal };
}

export const MOCK_VISITS_V2: Visit[] = [
  // ── Priya Kapoor — Ankle Sprain (CC-p01-01) + Cervical Spondylosis (CC-p01-02) ──
  _mv('VP01-01','uuid-p01','2024-01-15','Ankle Sprain',        'CC-p01-01','CONSULTATION','FIRST',      ['IFT','UST']),
  _mv('VP01-02','uuid-p01','2024-01-15','Cervical Spondylosis','CC-p01-02','CONSULTATION','FIRST',      ['TENS','Traction']),
  _mv('VP01-03','uuid-p01','2024-01-17','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP01-04','uuid-p01','2024-01-17','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['TENS','Traction']),
  _mv('VP01-05','uuid-p01','2024-01-19','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','Wax']),
  _mv('VP01-06','uuid-p01','2024-01-22','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP01-07','uuid-p01','2024-01-22','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['TENS','Traction']),
  _mv('VP01-08','uuid-p01','2024-01-24','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['UST','EMS']),
  _mv('VP01-09','uuid-p01','2024-01-26','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['TENS','SWD']),
  _mv('VP01-10','uuid-p01','2024-01-29','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP01-11','uuid-p01','2024-01-29','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['Traction','Physical Exercise']),
  _mv('VP01-12','uuid-p01','2024-01-31','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','Infrared']),
  _mv('VP01-13','uuid-p01','2024-02-02','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['TENS','Traction','SWD']),
  // Follow-up consult (Dry Needling = PREMIUM, charged even in consult)
  _mv('VP01-14','uuid-p01','2024-02-05','Ankle Sprain',        'CC-p01-01','CONSULTATION','SUBSEQUENT', ['IFT','UST','Dry Needling']),
  _mv('VP01-15','uuid-p01','2024-02-07','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP01-16','uuid-p01','2024-02-07','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['TENS','SWD']),
  _mv('VP01-17','uuid-p01','2024-02-09','Cervical Spondylosis','CC-p01-02','MACHINE_ONLY', undefined,   ['Traction','Physical Exercise']),
  // Dense visit — stress-test tag wrapping
  _mv('VP01-18','uuid-p01','2024-02-11','Ankle Sprain',        'CC-p01-01','MACHINE_ONLY', undefined,   ['IFT','TENS','UST','SWD','EMS','Infrared','Wax','Massage Gun','Physical Exercise']),

  // ── Vikram Singh — Frozen Shoulder (CC-p02-01) + Lumbar Spondylosis (CC-p02-02) ──
  _mv('VP02-01','uuid-p02','2024-02-20','Frozen Shoulder',   'CC-p02-01','CONSULTATION','FIRST',      ['IFT','UST']),
  _mv('VP02-02','uuid-p02','2024-02-20','Lumbar Spondylosis','CC-p02-02','CONSULTATION','FIRST',      ['SWD','TENS']),
  _mv('VP02-03','uuid-p02','2024-02-22','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP02-04','uuid-p02','2024-02-22','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['SWD','TENS']),
  _mv('VP02-05','uuid-p02','2024-02-24','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','UST','Physical Exercise']),
  _mv('VP02-06','uuid-p02','2024-02-26','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['SWD','Physical Exercise']),
  // Follow-up consult with Cupping (PREMIUM)
  _mv('VP02-07','uuid-p02','2024-02-28','Frozen Shoulder',   'CC-p02-01','CONSULTATION','SUBSEQUENT', ['IFT','UST','Cupping']),
  _mv('VP02-08','uuid-p02','2024-02-28','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['TENS','Physical Exercise']),
  _mv('VP02-09','uuid-p02','2024-03-01','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP02-10','uuid-p02','2024-03-04','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','UST','Physical Exercise']),
  _mv('VP02-11','uuid-p02','2024-03-04','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['SWD','TENS','Physical Exercise']),
  _mv('VP02-12','uuid-p02','2024-03-06','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['UST','Physical Exercise']),
  _mv('VP02-13','uuid-p02','2024-03-08','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['SWD','Physical Exercise']),
  _mv('VP02-14','uuid-p02','2024-03-11','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP02-15','uuid-p02','2024-03-11','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['SWD','TENS']),
  _mv('VP02-16','uuid-p02','2024-03-13','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','Physical Exercise']),
  _mv('VP02-17','uuid-p02','2024-03-15','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['SWD','Physical Exercise']),
  _mv('VP02-18','uuid-p02','2024-03-18','Frozen Shoulder',   'CC-p02-01','MACHINE_ONLY', undefined,   ['IFT','UST']),
  _mv('VP02-19','uuid-p02','2024-03-18','Lumbar Spondylosis','CC-p02-02','MACHINE_ONLY', undefined,   ['TENS','SWD']),

  // ── Anjali Devi — Shoulder Impingement (CC-p03-01) + Knee OA (CC-p03-02) ──
  _mv('VP03-01','uuid-p03','2024-01-10','Shoulder Impingement','CC-p03-01','CONSULTATION','FIRST',      ['UST','IFT','Physical Exercise']),
  _mv('VP03-02','uuid-p03','2024-01-12','Shoulder Impingement','CC-p03-01','MACHINE_ONLY', undefined,   ['UST','IFT']),
  _mv('VP03-03','uuid-p03','2024-01-12','Knee Osteoarthritis', 'CC-p03-02','MACHINE_ONLY', undefined,   ['IFT','TENS']),
  _mv('VP03-04','uuid-p03','2024-01-15','Knee Osteoarthritis', 'CC-p03-02','MACHINE_ONLY', undefined,   ['IFT','TENS','Physical Exercise']),
  // Follow-up consult with ISTM (PREMIUM)
  _mv('VP03-05','uuid-p03','2024-01-17','Shoulder Impingement','CC-p03-01','CONSULTATION','SUBSEQUENT', ['UST','Physical Exercise','ISTM']),
  _mv('VP03-06','uuid-p03','2024-01-17','Knee Osteoarthritis', 'CC-p03-02','MACHINE_ONLY', undefined,   ['IFT','TENS']),
  _mv('VP03-07','uuid-p03','2024-01-19','Shoulder Impingement','CC-p03-01','MACHINE_ONLY', undefined,   ['UST','IFT']),
  _mv('VP03-08','uuid-p03','2024-01-22','Shoulder Impingement','CC-p03-01','MACHINE_ONLY', undefined,   ['UST','Physical Exercise']),
  _mv('VP03-09','uuid-p03','2024-01-22','Knee Osteoarthritis', 'CC-p03-02','MACHINE_ONLY', undefined,   ['IFT','Physical Exercise']),
  _mv('VP03-10','uuid-p03','2024-01-24','Knee Osteoarthritis', 'CC-p03-02','MACHINE_ONLY', undefined,   ['TENS','Physical Exercise']),
  _mv('VP03-11','uuid-p03','2024-01-26','Shoulder Impingement','CC-p03-01','MACHINE_ONLY', undefined,   ['UST','TENS']),
  _mv('VP03-12','uuid-p03','2024-01-29','Shoulder Impingement','CC-p03-01','MACHINE_ONLY', undefined,   ['UST','IFT']),
  _mv('VP03-13','uuid-p03','2024-01-29','Knee Osteoarthritis', 'CC-p03-02','MACHINE_ONLY', undefined,   ['IFT','TENS','Physical Exercise']),
];
