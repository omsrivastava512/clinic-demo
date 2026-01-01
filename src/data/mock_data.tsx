import type { LedgerEntry, MedicalContext, Patient, Procedure } from '@/types';

export const MOCK_PATIENTS: Patient[] = [
    { id: 'P01', name: 'Amitabh Bachchan', mrn: 'MED-992', phone: '9876543210', lastVisit: '2 days ago', address: 'Prateeksha, Juhu' },
    { id: 'P02', name: 'Sania Mirza', mrn: 'MED-881', phone: '9988776655', lastVisit: '10 days ago', address: 'Banjara Hills, Hyderabad' },
    { id: 'P03', name: 'Virat Kohli', mrn: 'MED-774', phone: '9123456789', lastVisit: 'Yesterday', address: 'DLF Phase 1, Gurgaon' },
    { id: 'P04', name: 'Priyanka Chopra', mrn: 'MED-663', phone: '9898989898', lastVisit: '1 month ago', address: 'Versova, Andheri West' },
    { id: 'P05', name: 'Shah Rukh Khan', mrn: 'MED-552', phone: '9000011111', lastVisit: '3 weeks ago', address: 'Bandstand, Bandra West' },
    { id: 'P06', name: 'Deepika Padukone', mrn: 'MED-441', phone: '9222233333', lastVisit: '5 days ago', address: 'Pali Hill, Bandra' },
    { id: 'P07', name: 'Ranveer Singh', mrn: 'MED-330', phone: '9444455555', lastVisit: 'Today', address: 'Carter Road, Bandra West' },
    { id: 'P08', name: 'Rohit Sharma', mrn: 'MED-229', phone: '9666677777', lastVisit: '2 months ago', address: 'Worli Sea Face' },
    { id: 'P09', name: 'Alia Bhatt', mrn: 'MED-118', phone: '9888899999', lastVisit: '1 week ago', address: 'Juhu Tara Road' },
    { id: 'P10', name: 'Ranbir Kapoor', mrn: 'MED-007', phone: '9111122222', lastVisit: '4 days ago', address: 'Hill Road, Bandra' },
    { id: 'P11', name: 'Kareena Kapoor', mrn: 'MED-123', phone: '9333344444', lastVisit: 'Just now', address: 'Fortune Heights, Bandra West' },
    { id: 'P12', name: 'Saif Ali Khan', mrn: 'MED-456', phone: '9555566666', lastVisit: 'Yesterday', address: 'Pataudi House, Gurgaon, HR' },
    { id: 'P13', name: 'Katrina Kaif', mrn: 'MED-789', phone: '9777788888', lastVisit: '2 days ago', address: 'Palm Beach Road, Navi Mumbai' },
    { id: 'P14', name: 'Vicky Kaushal', mrn: 'MED-101', phone: '9999900000', lastVisit: '3 days ago', address: 'Lokhandwala Complex' },
    { id: 'P15', name: 'Hrithik Roshan', mrn: 'MED-202', phone: '9222211111', lastVisit: '1 month ago', address: 'Juhu Scheme' },

];


export const MOCK_CONTEXTS: MedicalContext[] = [
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