import { useEffect, useState } from 'preact/hooks'
// import Intake from './intake-v1';
// import Intake2 from './intake-v2';

import {
    Search, Plus, Check,
    //   User, ChevronRight, FileText, X, 
    //   Activity, Stethoscope, ChevronDown, 
    ArrowUpRight, User,
    CreditCard, Sun, Moon,
    Printer, Smartphone, Banknote,
} from 'lucide-react';
import NewPatientIntake from './intake-v3';

// ==========================================
// 1. TYPES & INTERFACES (types.ts)
// ==========================================

export interface Patient {
    id: string;
    name: string; // e.g., "Rajesh Kumar"
    mrn: string;
    phone: string;
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

// ==========================================
// 2. MOCK DATA (data/hindi_physio.ts)
// ==========================================

const MOCK_PATIENTS: Patient[] = [
    { id: 'P01', name: 'Amitabh Bachchan', mrn: 'MED-992', phone: '9876543210', lastVisit: '2 days ago', },
    { id: 'P02', name: 'Sania Mirza', mrn: 'MED-881', phone: '9988776655', lastVisit: '10 days ago', },
    { id: 'P03', name: 'Virat Kohli', mrn: 'MED-774', phone: '9123456789', lastVisit: 'Yesterday', },
    { id: 'P04', name: 'Priyanka Chopra', mrn: 'MED-663', phone: '9898989898', lastVisit: '1 month ago', },
    { id: 'P05', name: 'Shah Rukh Khan', mrn: 'MED-552', phone: '9000011111', lastVisit: '3 weeks ago', },
    { id: 'P06', name: 'Deepika Padukone', mrn: 'MED-441', phone: '9222233333', lastVisit: '5 days ago', },
    { id: 'P07', name: 'Ranveer Singh', mrn: 'MED-330', phone: '9444455555', lastVisit: 'Today', },
    { id: 'P08', name: 'Rohit Sharma', mrn: 'MED-229', phone: '9666677777', lastVisit: '2 months ago', },
    { id: 'P09', name: 'Alia Bhatt', mrn: 'MED-118', phone: '9888899999', lastVisit: '1 week ago', },
    { id: 'P10', name: 'Ranbir Kapoor', mrn: 'MED-007', phone: '9111122222', lastVisit: '4 days ago', },
    { id: 'P11', name: 'Kareena Kapoor', mrn: 'MED-123', phone: '9333344444', lastVisit: 'Just now', },
    { id: 'P12', name: 'Saif Ali Khan', mrn: 'MED-456', phone: '9555566666', lastVisit: 'Yesterday', },
    { id: 'P13', name: 'Katrina Kaif', mrn: 'MED-789', phone: '9777788888', lastVisit: '2 days ago', },
    { id: 'P14', name: 'Vicky Kaushal', mrn: 'MED-101', phone: '9999900000', lastVisit: '3 days ago', },
    { id: 'P15', name: 'Hrithik Roshan', mrn: 'MED-202', phone: '9222211111', lastVisit: '1 month ago', },
];

const MOCK_CONTEXTS: MedicalContext[] = [
    { id: 'CTX_01', title: 'Chronic Lower Back Pain (L4-L5)', doctor: 'Dr. R. Sharma', isActive: true, type: 'EXISTING' },
    { id: 'CTX_02', title: 'Post-Op ACL Rehab (Right Knee)', doctor: 'Dr. A. Gupta', isActive: true, type: 'EXISTING' },
];

const PHYSIO_PROCEDURES: Procedure[] = [
    { id: 'PROC_01', name: 'Consultation', code: 'CON01', cost: 500 },
    { id: 'PROC_02', name: 'Ultrasonic Therapy (US)', code: 'US001', cost: 250 },
    { id: 'PROC_03', name: 'Interferential Therapy (IFT)', code: 'IFT01', cost: 300 },
    { id: 'PROC_04', name: 'TENS', code: 'TENS1', cost: 200 },
    { id: 'PROC_05', name: 'Manual Therapy / Mob', code: 'MAN01', cost: 400 },
    { id: 'PROC_06', name: 'Short Wave Diathermy', code: 'SWD01', cost: 300 },
    { id: 'PROC_07', name: 'Cervical Traction', code: 'TRAC1', cost: 250 },
    { id: 'PROC_08', name: 'Kinesio Taping', code: 'KT001', cost: 150 },
];

const MOCK_LEDGER_ENTRIES: LedgerEntry[] = [
    { id: 'LE01', time: '10:15 AM', patientName: 'Vikram Singh', treatment: 'Frozen Shoulder (IFT + US)', status: 'Paid' },
    { id: 'LE02', time: '10:30 AM', patientName: 'Priya Kapoor', treatment: 'Ankle Sprain (Taping)', status: 'In Therapy' },
    { id: 'LE03', time: '10:45 AM', patientName: 'Rahul Sharma', treatment: 'Knee Pain (IFT)', status: 'Waiting' },
    { id: 'LE04', time: '11:00 AM', patientName: 'Anjali Devi', treatment: 'Shoulder Impingement (US)', status: 'Paid' },
    { id: 'LE05', time: '11:15 AM', patientName: 'Suresh Menon', treatment: 'Cervical Spondylosis (TENS)', status: 'In Therapy' },
    { id: 'LE06', time: '11:30 AM', patientName: 'Meena Kumari', treatment: 'Back Strain (Manual Therapy)', status: 'Paid' },
    { id: 'LE07', time: '11:45 AM', patientName: 'Arjun Reddy', treatment: 'Tennis Elbow (US)', status: 'Waiting' },
    { id: 'LE08', time: '12:00 PM', patientName: 'Nisha Singh', treatment: 'Plantar Fasciitis (IFT)', status: 'In Therapy' },
    { id: 'LE09', time: '12:15 PM', patientName: 'Vijay Kumar', treatment: 'Sciatica (SWD)', status: 'Paid' },
    { id: 'LE10', time: '12:30 PM', patientName: 'Pooja Sharma', treatment: 'Frozen Shoulder (Cervical Traction)', status: 'Waiting' },
    { id: 'LE11', time: '01:00 PM', patientName: 'Ravi Verma', treatment: 'Post-Op Knee Rehab (Kinesio Taping)', status: 'In Therapy' },
    { id: 'LE12', time: '01:15 PM', patientName: 'Geeta Devi', treatment: 'Wrist Sprain (US)', status: 'Paid' },
    { id: 'LE13', time: '01:30 PM', patientName: 'Mohan Lal', treatment: 'Neck Pain (TENS)', status: 'Waiting' },
    { id: 'LE14', time: '01:45 PM', patientName: 'Kavita Rao', treatment: 'Hip Bursitis (IFT)', status: 'In Therapy' },
    { id: 'LE15', time: '02:00 PM', patientName: 'Sanjay Dutt', treatment: 'Ankle Fracture Rehab (Manual Therapy)', status: 'Paid' },
    { id: 'LE16', time: '02:15 PM', patientName: 'Deepa Mehta', treatment: 'Rotator Cuff Injury (US)', status: 'Waiting' },
    { id: 'LE17', time: '02:30 PM', patientName: 'Ashok Kumar', treatment: 'Lumbar Spondylosis (SWD)', status: 'In Therapy' },
    { id: 'LE18', time: '02:45 PM', patientName: 'Shalini Gupta', treatment: 'Migraine (Cervical Traction)', status: 'Paid' },
    { id: 'LE19', time: '03:00 PM', patientName: 'Rajesh Khanna', treatment: 'Achilles Tendonitis (Kinesio Taping)', status: 'Waiting' },
    { id: 'LE20', time: '03:15 PM', patientName: 'Smita Patil', treatment: 'Carpal Tunnel Syndrome (US)', status: 'In Therapy' },
    { id: 'LE21', time: '03:30 PM', patientName: 'Gaurav Singh', treatment: 'Groin Strain (IFT)', status: 'Paid' },
    { id: 'LE22', time: '03:45 PM', patientName: 'Priya Kapoor', treatment: 'Ankle Sprain (Taping)', status: 'In Therapy' },
];

// ==========================================
// 3. UI COMPONENTS
// ==========================================

/**
 * COMPONENT 1: THE LEDGER
 * The "Excel-like" input row for rapid entry.
 */
interface LedgerProps {
    onPatientIdentified: (patient: number) => void;
}

const DailyLedger: React.FC<LedgerProps> = ({ onPatientIdentified }) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);


    useEffect(() => {
        if (!showSuggestions) {
            // setFilteredPatients([])
            setSelectedIndex(-1)
        } else if (filteredPatients.length === 0) {
            setSelectedIndex(0)
        }
    }, [showSuggestions, filteredPatients])


    const cleanSearchInput = (input: string): string => {
        if (!input) return ""; // Handle Empty Strings
        // Flatten whitespaces
        const returnString = input.trimStart().replace(/\s+/g, ' ');
        const firstChar = input[0];
        // if the string starts with a Letter
        if (/[a-zA-Z]/.test(firstChar)) {
            // Regex: Replace anything that is NOT (^) a letter or space
            return returnString.replace(/[^a-zA-Z ]/g, "");
        }
        // if the string starts with a Number
        if (/[0-9]/.test(firstChar)) {
            // Regex: Replace anything that is NOT (^) a number and slice it till 10 digits
            return returnString.replace(/[^0-9]/g, "").slice(0, 10);
        }
        return "";
    }

    // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = cleanSearchInput((e.target as HTMLInputElement).value)

        setInput(val);

        // Trigger Logic: Only show if more than 2 characters (starts at 3 chars)
        if (val.length > 2) {
            const results = MOCK_PATIENTS.filter(p =>
                p.name.toLowerCase().includes(val.toLowerCase()) ||
                p.phone.includes(val)
            );
            setFilteredPatients(results);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };
    onPatientIdentified(filteredPatients.length | 0);


    const getStatusBadgeStyle = (status: LedgerEntry['status']) => {
        switch (status) {
            case 'Paid':
                return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500';
            case 'In Therapy':
                return 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';
            case 'Waiting':
                return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500';
            default:
                return 'bg-zinc-100 text-zinc-500';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // filteredPatients is your list results
        // We add +1 to length to account for the "Add New" button at the bottom
        const totalItems = filteredPatients.length + 1;

        if (!showSuggestions) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault(); // Stop cursor from moving in text box
            setSelectedIndex(prev => (prev < 0 ? 0 : prev == 0 ? prev : prev - 1));
            // Logic: If at top (0), stay at 0, or loop to bottom
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : prev));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(selectedIndex)
        }
    };

    /**
     * Suggestion: Add logic to detect if new patient added using Name or Phone Number
     * @param i Index of the selected patient/option
     * @returns 
     **/
    const handleSelect = (i: number) => {
        if (filteredPatients.length > 0 && i === -1) return; // Or trigger search

        if (i < filteredPatients.length && i !== -1) {
            // It's a patient from the list
            const patient = filteredPatients[i];
            alert(`Selected Existing: ${patient.name}`);
        } else {
            // It's the "Add New" button (last item)
            alert(`Triggering Add New Patient for: ${input}`);
        }
        setInput('');
        setShowSuggestions(false);
    };

    return (
        <div id="daily_ledger" className="w-full relative bg-white overflow-hidden dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col h-[500px] transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-end p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
                <div>
                    <div className="flex-col md:flex-row gap-2 items-center">
                        <p className="text-zinc-900 dark:text-white font-medium">Daily Register</p>
                        <p className="text-zinc-500 text-xs">Friday, 24 Nov</p>
                    </div>
                    <p className="text-zinc-500 text-sm">Dr. Sharma's Clinic</p>
                </div>
                {/* OPD Count */}
                <div className="text-right">
                    <div className="text-2xl font-mono text-zinc-900 dark:text-white">42</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">OPD Count</div>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                <div className="col-span-2">Time</div>
                <div className="col-span-6 md:col-span-4">Patient Name</div>
                <div className="hidden md:block md:col-span-4">Treatment</div>
                <div className="col-span-4 md:col-span-2 text-right">Status</div>
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Dynamic Rows */}
                {MOCK_LEDGER_ENTRIES.filter(e => e).map((entry) => (
                    <div key={entry.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <div className="col-span-2 text-zinc-500 font-mono text-xs">{entry.time}</div>
                        <div className="col-span-6 md:col-span-4">
                            <div className=" text-zinc-700 dark:text-zinc-300 font-medium">{entry.patientName}</div>
                            <div className="md:hidden text-xs text-zinc-400 mt-0.5">{entry.treatment}</div>
                        </div>
                        <div className="hidden md:block md:col-span-4 text-zinc-600 dark:text-zinc-400 text-sm">{entry.treatment}</div>
                        <div className="col-span-4 md:col-span-2 text-right">
                            <span className={`text-xs px-1 sm:px-2 py-1 rounded ${getStatusBadgeStyle(entry.status)}`}>
                                {entry.status}
                            </span>
                        </div>
                    </div>
                ))}
                <div className="sticky bottom-0 left-0 right-0 dark:bg-black  p-1 w-full  mt-auto">
                    {/* A. The Floating Typeahead List (Drop-up) */}
                    {showSuggestions && <SearchSuggestions filteredPatients={filteredPatients} input={input} handleSelect={handleSelect} selectedIndex={selectedIndex} />}

                    {/* ACTIVE INPUT ROW */}
                    <div className="mb-1 w-full rounded border border-black/25 dark:border-white/25 grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 items-center shadow-lg shadow-gray-500/70 dark:shadow-none">

                        <div className="hidden md:block md:col-span-2 text-zinc-900 dark:text-white font-mono text-xs">Now</div>
                        <div className="col-span-10 relative">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            <input
                                autoFocus
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-transparent border-none outline-none md:text-xl font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-8"
                                placeholder="Type Name or Mobile..."
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
                                <span className="hidden sm:inline-block text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{selectedIndex === -1 ? "Start typing" : "↵ ENTER"}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

/**
 * COMPONENT 2: CONTEXT SELECTOR
 * Handles the "Which problem?" logic.
 */
interface ContextSelectorProps {
    patient: Patient;
    availableContexts: MedicalContext[];
    onConfirm: (selectedIds: string[]) => void;
    onCancel: () => void;
}

const ContextSelector: React.FC<ContextSelectorProps> = ({ patient, availableContexts, onConfirm, onCancel }) => {
    const [selected, setSelected] = useState<string[]>([]);

    // Local state to manage newly created contexts
    const [customContexts, setCustomContexts] = useState<MedicalContext[]>([]);

    // State for the inline input
    const [newContextInput, setNewContextInput] = useState('');

    const toggleContext = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleAddNewContext = () => {
        if (!newContextInput.trim()) return;

        const newCtx: MedicalContext = {
            id: `NEW_${Date.now()}`,
            title: newContextInput,
            isActive: true,
            type: 'NEW'
        };

        setCustomContexts(prev => [...prev, newCtx]);
        setSelected(prev => [...prev, newCtx.id]); // Auto-select the new one
        setNewContextInput(''); // Reset input
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddNewContext();
        }
    };

    // Combine props contexts with locally created ones
    const allContexts = [...availableContexts, ...customContexts];

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800  rounded-xl p-8 shadow-2xl transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{patient.name}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">MRN: {patient.mrn} • +91 {patient.phone}</p>
                </div>
                <div className="text-right text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    DETECTED PATIENT
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-4">Select Treatment Complaint</h3>
                <div className="space-y-3">
                    {/* List Existing & Added Contexts */}
                    {allContexts.map(ctx => {
                        const isSelected = selected.includes(ctx.id);
                        return (
                            <div
                                key={ctx.id}
                                onClick={() => toggleContext(ctx.id)}
                                className={`
                  flex items-center p-4 rounded-lg border cursor-pointer transition-all group
                  ${isSelected
                                        ? 'bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-white'
                                        : 'bg-white border-zinc-200 dark:bg-black dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}
                `}
                            >
                                <div className={`w-5 h-5 rounded flex items-center justify-center mr-4 transition-colors 
                  ${isSelected
                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                                        : 'border border-zinc-300 dark:border-zinc-600'}`}>
                                    {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'}`}>
                                        {ctx.title}
                                    </div>
                                    {ctx.type === 'EXISTING' && (
                                        <div className="text-xs text-zinc-500 dark:text-zinc-600">{ctx.doctor} • Active Plan</div>
                                    )}
                                    {ctx.type === 'NEW' && (
                                        <div className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">New Issue Added</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* The "Report New Issue" Input Row */}
                    <div className="flex items-center p-4 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/30">
                        <Plus className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-4" />
                        <input
                            type="text"
                            value={newContextInput}
                            onChange={(e) => setNewContextInput((e.target as HTMLInputElement).value)}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Report new issue (e.g. Knee Pain)..."
                            className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium"
                        />
                        <button type='button' title="Add New Patient"
                            onClick={handleAddNewContext}
                            disabled={!newContextInput.trim()}
                            className="p-2 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
            <input id="ctx_new" type="text" className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-lg px-4 py-3 pl-10 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" />

            <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-900">
                <button onClick={onCancel} className="px-4 py-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Cancel</button>
                <button
                    onClick={() => onConfirm(selected)}
                    disabled={selected.length === 0}
                    className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue to Procedures →
                </button>
            </div>
        </div>
    );
};

/**
 * COMPONENT 3: PROCEDURE LOGGER (The Many-to-Many Solver)
 * Renders a procedure grid for EACH selected context.
 */
interface ProcedureLoggerProps {
    selectedContexts: MedicalContext[]; // Only the ones selected in Step 2
    onComplete: (items: InvoiceItem[]) => void;
}

const ProcedureLogger: React.FC<ProcedureLoggerProps> = ({ selectedContexts, onComplete }) => {
    // Store items flatly, but UI groups them. 
    // State structure: { 'CTX_01-PROC_01': { ...item } } for easy toggle
    const [items, setItems] = useState<Record<string, InvoiceItem>>({});

    const toggleProcedure = (ctx: MedicalContext, proc: Procedure) => {
        const key = `${ctx.id}-${proc.id}`;

        setItems(prev => {
            const next = { ...prev };
            if (next[key]) {
                delete next[key];
            } else {
                next[key] = {
                    procedureId: proc.id,
                    contextId: ctx.id,
                    name: proc.name,
                    contextName: ctx.title,
                    cost: proc.cost
                };
            }
            return next;
        });
    };

    const totalCost = Object.values(items).reduce((sum, item) => sum + item.cost, 0);

    return (
        <div className="w-full flex flex-col md:flex-row gap-6 h-[600px] transition-colors duration-300">

            {/* LEFT: Scrollable Procedure Selection Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8">

                {/* Iterate over EACH context to create a scoped selection zone */}
                {selectedContexts.map((ctx, index) => (
                    <div key={ctx.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>

                        {/* Context Header */}
                        <div className="flex items-center gap-3 mb-4 sticky top-0 bg-zinc-50/95 dark:bg-black/95 backdrop-blur py-2 z-10 border-b border-zinc-200 dark:border-zinc-900">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="text-zinc-900 dark:text-white font-bold">{ctx.title}</h3>
                                <p className="text-xs text-zinc-500">Select procedures for this specific area</p>
                            </div>
                        </div>

                        {/* Grid for THIS Context */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 border-l-2 border-zinc-300 dark:border-zinc-800">
                            {PHYSIO_PROCEDURES.map(proc => {
                                const isSelected = !!items[`${ctx.id}-${proc.id}`];
                                return (
                                    <button
                                        key={proc.id}
                                        onClick={() => toggleProcedure(ctx, proc)}
                                        className={`
                      text-left p-3 rounded-md border transition-all flex justify-between items-start
                      ${isSelected
                                                ? 'bg-zinc-100 border-zinc-900 text-zinc-900 dark:bg-zinc-900 dark:border-white dark:text-white shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                                : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-900/50'}
                    `}
                                    >
                                        <div>
                                            <div className="font-medium text-sm">{proc.name}</div>
                                            <div className="text-[10px] font-mono mt-1 opacity-60">₹{proc.cost}</div>
                                        </div>
                                        {isSelected && <Check className="w-4 h-4 text-zinc-900 dark:text-white" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: Live Basket / Summary */}
            <div className="w-full md:w-80 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col h-full">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Current Session Bill</h4>

                <div className="flex-1 overflow-y-auto space-y-3">
                    {Object.keys(items).length === 0 && (
                        <div className="text-center text-zinc-500 dark:text-zinc-600 text-sm py-10">No procedures selected yet.</div>
                    )}

                    {/* Group items visually by context in the receipt too */}
                    {selectedContexts.map(ctx => {
                        const ctxItems = Object.values(items).filter(i => i.contextId === ctx.id);
                        if (ctxItems.length === 0) return null;
                        return (
                            <div key={ctx.id} className="mb-4">
                                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase mb-1 truncate">{ctx.title}</div>
                                {ctxItems.map(item => (
                                    <div key={`${item.contextId}-${item.procedureId}`} className="flex justify-between text-sm py-1 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                                        <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.name}</span>
                                        <span className="font-mono text-zinc-500">₹{item.cost}</span>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-500 dark:text-zinc-400">Total</span>
                        <span className="text-2xl font-bold text-zinc-900 dark:text-white font-mono">₹{totalCost}</span>
                    </div>
                    <button
                        onClick={() => onComplete(Object.values(items))}
                        disabled={Object.keys(items).length === 0}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                    >
                        Create Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * COMPONENT 4: INVOICE & PAYMENT
 * Indian context: Cash, Card, UPI.
 */
interface InvoiceBuilderProps {
    items: InvoiceItem[];
    patientName: string;
    onClose: () => void;
}

const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({ items, patientName, onClose }) => {
    const total = items.reduce((sum, i) => sum + i.cost, 0);
    const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI' | 'CARD'>('UPI');

    return (
        <div className="w-full max-w-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl mx-auto transition-colors duration-300">
            {/* Receipt Header */}
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start">
                <div>
                    <h2 className="text-zinc-900 dark:text-white font-bold text-lg">Invoice #INV-2024-88</h2>
                    <p className="text-zinc-500 text-xs mt-1">{patientName}</p>
                </div>
                <div className="text-right">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-widest">Amount Due</div>
                    <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-white">₹{total}</div>
                </div>
            </div>

            <div className="p-6">
                {/* Itemized List */}
                <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 mb-6 border border-zinc-200 dark:border-zinc-900">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase">
                            <tr>
                                <th className="pb-2">Procedure</th>
                                <th className="pb-2 text-right">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-900 text-zinc-700 dark:text-zinc-300">
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td className="py-2">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-[10px] text-zinc-500 dark:text-zinc-600">{item.contextName}</div>
                                    </td>
                                    <td className="py-2 text-right font-mono">₹{item.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Payment Methods (Indian Context) */}
                <div className="mb-8">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide block mb-3">Payment Mode (भुगतान का प्रकार)</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => setPaymentMode('UPI')}
                            className={`flex flex-col items-center justify-center p-3 rounded border transition-all 
                ${paymentMode === 'UPI'
                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                        >
                            <Smartphone className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium">UPI / QR</span>
                        </button>
                        <button
                            onClick={() => setPaymentMode('CASH')}
                            className={`flex flex-col items-center justify-center p-3 rounded border transition-all 
                ${paymentMode === 'CASH'
                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                        >
                            <Banknote className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium">Cash</span>
                        </button>
                        <button
                            onClick={() => setPaymentMode('CARD')}
                            className={`flex flex-col items-center justify-center p-3 rounded border transition-all 
                ${paymentMode === 'CARD'
                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                        >
                            <CreditCard className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium">Card</span>
                        </button>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm">
                        <Printer className="w-4 h-4" /> Print Receipt
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold rounded transition-colors shadow-md"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 4. MAIN LAYOUT (CATALOG VIEW)
// ==========================================

const PresentationSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-32 max-w-5xl mx-auto w-full">
        <div className="mb-6 px-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight border-l-4 border-zinc-300 dark:border-zinc-700 pl-4">{title}</h2>
        </div>
        <div className="p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-2xl shadow-xl transition-colors duration-300">
            {children}
        </div>
    </div>
);

const App = () => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Dummy Handlers for display purposes
    const handleLog = (val: any) => console.log("Action Triggered:", val);


    // useEffect(() => {
    //   document.querySelector('html')?.classList.toggle("dark")
    // }, [isDarkMode])

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 py-20 px-4 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">

                <div className="fixed top-6 right-6 z-50">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-900 dark:text-white hover:scale-105 transition-transform"
                        title="Toggle Theme"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">Clinic App Catalog</h1>
                    <p className="text-zinc-600 dark:text-zinc-500">Modular React + TS components for Indian Physiotherapy Clinics.</p>
                    <p className="text-zinc-500 dark:text-zinc-600 text-sm mt-2 font-mono">
                        Theme: {isDarkMode ? 'Pearl Black' : 'Clinical White'} • Mode: Many-to-Many Context
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2 font-mono">Last Updated: Wed Nov 29 2025 | 00:30 </p>
                </div>

                <PresentationSection title="1. The Daily Ledger (Input)">
                    <DailyLedger onPatientIdentified={handleLog} />
                </PresentationSection>

                <PresentationSection title="2. Intake">
                    <div className="flex gap-5 flex-wrap">
                        {/* <Intake /> */}
                        {/* <Intake2 /> */}
                        <NewPatientIntake onClose={() => { }} />
                    </div>
                </PresentationSection>


                

                <PresentationSection title="3. Context Switcher (Diagnosis)">
                    <div className="flex justify-center">
                        <ContextSelector
                            patient={MOCK_PATIENTS[0]}
                            availableContexts={MOCK_CONTEXTS}
                            onConfirm={handleLog}
                            onCancel={() => alert('Cancelled')}
                        />
                    </div>
                </PresentationSection>

                <PresentationSection title="4. Procedure Logger (Multi-Context Logic)">
                    {/* We simulate passing TWO contexts to show the grouping logic */}
                    <ProcedureLogger
                        selectedContexts={[MOCK_CONTEXTS[0], MOCK_CONTEXTS[1]]}
                        onComplete={handleLog}
                    />
                </PresentationSection>

                <PresentationSection title="5. Invoice & Payment (Indian Locale)">
                    <InvoiceBuilder
                        items={[
                            { procedureId: '1', contextId: 'C1', name: 'Ultrasonic Therapy', contextName: 'Right Knee ACL', cost: 250 },
                            { procedureId: '2', contextId: 'C2', name: 'Interferential Therapy', contextName: 'Lower Back', cost: 300 },
                        ]}
                        patientName="Amitabh Bachchan"
                        onClose={() => alert('Visit Closed')}
                    />
                </PresentationSection>

            </div>
        </div>
    );
};

export default App;




interface SearchSuggestionsProps {
    filteredPatients: Patient[];
    handleSelect(i: number): void;
    input: string;
    selectedIndex: number
}

const SearchSuggestions = ({ filteredPatients, handleSelect, input, selectedIndex }: SearchSuggestionsProps) => (
    <div id="suggestions" className="absolute bottom-full left-0 right-0 mx-4 mb-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden max-h-[300px] flex flex-col z-50">

        {/* Header of Dropdown */}
        <div className="px-4 py-2 bg-zinc-950 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Search Results ({filteredPatients.length})
        </div>

        {/* Scrollable Results */}
        <div className="overflow-y-auto max-h-[200px]">
            {filteredPatients.map((p, i) => (
                <button
                    key={p.id}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800 hover:text-white group flex justify-between items-center transition-colors ${i === selectedIndex ? 'bg-zinc-800 text-white' : ''}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800 text-zinc-500 group-hover:border-zinc-600">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-medium text-zinc-300 group-hover:text-white text-sm">
                                {p.name}
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                                <span>{p.mrn}</span>
                                <span>•</span>
                                <Smartphone className="w-3 h-3" /> {p.phone}
                            </div>
                        </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            ))}

            {filteredPatients.length === 0 && (
                <div className="px-4 py-6 text-center text-zinc-500 text-sm italic">
                    No existing patients found for "{input}"
                </div>
            )}
        </div>

        {/* Footer of Dropdown: Always "Add New" */}
        <button
            onClick={() => handleSelect(filteredPatients.length)}
            className={`w-full ${filteredPatients.length === selectedIndex ? 'bg-zinc-800 text-white' : ' bg-zinc-950'} text-left px-4 py-3 hover:bg-zinc-900 border-t border-zinc-700 text-white flex items-center gap-3 transition-colors `}
        >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                <Plus className="w-4 h-4" />
            </div>
            <div>
                <div className="font-bold text-sm">Register New Patient: "{input}"</div>
                <div className="text-[10px] text-zinc-500">Create new MRN and start intake</div>
            </div>
        </button>
    </div>
)