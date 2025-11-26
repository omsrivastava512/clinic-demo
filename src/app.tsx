import {  useState } from 'preact/hooks'

import {
  Search, Plus, Check,
  //   User, ChevronRight, FileText, X, 
  //   Activity, Stethoscope, ChevronDown, 
  CreditCard, Sun, Moon,
  Printer, Smartphone, Banknote,
} from 'lucide-react';

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
  doctor: string;
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

// ==========================================
// 2. MOCK DATA (data/hindi_physio.ts)
// ==========================================

const MOCK_PATIENTS: Patient[] = [
  { id: 'P01', name: 'Amitabh Bachchan', mrn: 'MED-992', phone: '9876543210', lastVisit: '2 days ago' },
  { id: 'P02', name: 'Sania Mirza', mrn: 'MED-881', phone: '9988776655' },
];

const MOCK_CONTEXTS: MedicalContext[] = [
  { id: 'CTX_01', title: 'Chronic Lower Back Pain (L4-L5)', doctor: 'Dr. R. Sharma', isActive: true, type: 'EXISTING' },
  { id: 'CTX_02', title: 'Post-Op ACL Rehab (Right Knee)', doctor: 'Dr. A. Gupta', isActive: true, type: 'EXISTING' },
  { id: 'CTX_NEW', title: 'Report New Issue...', doctor: 'TBD', isActive: false, type: 'NEW' },
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

// ==========================================
// 3. UI COMPONENTS
// ==========================================

/**
 * COMPONENT 1: THE LEDGER
 * The "Excel-like" input row for rapid entry.
 */
interface LedgerProps {
  onPatientIdentified: (patient: Patient | string) => void;
}

const DailyLedger: React.FC<LedgerProps> = ({ onPatientIdentified }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input) {
      // Simulate finding a patient or creating a new string reference
      const found = MOCK_PATIENTS.find(p => p.name.toLowerCase().includes(input.toLowerCase()));
      onPatientIdentified(found || input);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex flex-col h-[400px] transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-end p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
        <div>
          <h3 className="text-zinc-900 dark:text-white font-medium">Daily Register (दैनिक रजिस्टर)</h3>
          <p className="text-zinc-500 text-sm">Friday, 24 Nov • Dr. Sharma's Clinic</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono text-zinc-900 dark:text-white">42</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">OPD Count</div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500 uppercase tracking-wider">
        <div className="col-span-2">Time</div>
        <div className="col-span-4">Patient Name</div>
        <div className="col-span-4">Treatment</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {/* Mock Past Entries */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
          <div className="col-span-2 text-zinc-500 font-mono text-xs">10:15 AM</div>
          <div className="col-span-4 text-zinc-700 dark:text-zinc-300 font-medium">Vikram Singh</div>
          <div className="col-span-4 text-zinc-600 dark:text-zinc-500 text-sm">Frozen Shoulder (IFT + US)</div>
          <div className="col-span-2 text-right"><span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500 px-2 py-1 rounded">Paid</span></div>
        </div>
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
          <div className="col-span-2 text-zinc-500 font-mono text-xs">10:30 AM</div>
          <div className="col-span-4 text-zinc-700 dark:text-zinc-300 font-medium">Priya Kapoor</div>
          <div className="col-span-4 text-zinc-600 dark:text-zinc-500 text-sm">Ankle Sprain (Taping)</div>
          <div className="col-span-2 text-right"><span className="text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">In Therapy</span></div>
        </div>

        {/* ACTIVE INPUT ROW */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/20 items-center border-l-4 border-zinc-900 dark:border-white animate-pulse hover:animate-none transition-all">
          <div className="col-span-2 text-zinc-900 dark:text-white font-mono text-xs">Now</div>
          <div className="col-span-10 relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput((e.target as HTMLInputElement).value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-xl font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-8"
              placeholder="Type Name (e.g. 'Rajesh') or Mobile..."
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
              <span className="hidden sm:inline-block text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">↵ ENTER</span>
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

  const toggleContext = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-2xl transition-colors duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{patient.name}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">MRN: {patient.mrn} • +91 {patient.phone}</p>
        </div>
        <div className="text-right text-xs font-mono text-zinc-500 dark:text-zinc-600">
          DETECTED PATIENT
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-4">Select Treatment Context (उपचार संदर्भ)</h3>
        <div className="space-y-3">
          {availableContexts.map(ctx => {
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
                </div>
                {ctx.type === 'NEW' && <Plus className="w-4 h-4 text-zinc-500 dark:text-zinc-600" />}
              </div>
            );
          })}
        </div>
      </div>

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

const MedCoreComponentCatalog = () => {
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">MedCore Components</h1>
          <p className="text-zinc-600 dark:text-zinc-500">Modular React + TS components for Indian Physiotherapy Clinics.</p>
          <p className="text-zinc-500 dark:text-zinc-600 text-sm mt-2 font-mono">
            Theme: {isDarkMode ? 'Pearl Black' : 'Clinical White'} • Mode: Many-to-Many Context
          </p>
        </div>

        <PresentationSection title="1. The Daily Ledger (Input)">
          <DailyLedger onPatientIdentified={handleLog} />
        </PresentationSection>

        <PresentationSection title="2. Context Switcher (Diagnosis)">
          <div className="flex justify-center">
            <ContextSelector
              patient={MOCK_PATIENTS[0]}
              availableContexts={MOCK_CONTEXTS}
              onConfirm={handleLog}
              onCancel={() => alert('Cancelled')}
            />
          </div>
        </PresentationSection>

        <PresentationSection title="3. Procedure Logger (Multi-Context Logic)">
          {/* We simulate passing TWO contexts to show the grouping logic */}
          <ProcedureLogger
            selectedContexts={[MOCK_CONTEXTS[0], MOCK_CONTEXTS[1]]}
            onComplete={handleLog}
          />
        </PresentationSection>

        <PresentationSection title="4. Invoice & Payment (Indian Locale)">
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

export default MedCoreComponentCatalog;