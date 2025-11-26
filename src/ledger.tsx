import React, { useState} from 'react';
import { Search, Plus, User, Smartphone, Clock, ArrowUpRight } from 'lucide-react';

// ==========================================
// 1. MOCK DATA (Expanded for Scrolling)
// ==========================================

export interface Patient {
  id: string;
  name: string;
  mrn: string;
  phone: string;
  lastVisit: string;
  status?: 'Completed' | 'Waiting' | 'In Session' | 'Paid';
}

const MOCK_PATIENTS: Patient[] = [
  { id: 'P01', name: 'Amitabh Bachchan', mrn: 'MED-992', phone: '9876543210', lastVisit: '2 days ago', status: 'Paid' },
  { id: 'P02', name: 'Sania Mirza', mrn: 'MED-881', phone: '9988776655', lastVisit: '10 days ago', status: 'In Session' },
  { id: 'P03', name: 'Virat Kohli', mrn: 'MED-774', phone: '9123456789', lastVisit: 'Yesterday', status: 'Waiting' },
  { id: 'P04', name: 'Priyanka Chopra', mrn: 'MED-663', phone: '9898989898', lastVisit: '1 month ago', status: 'Completed' },
  { id: 'P05', name: 'Shah Rukh Khan', mrn: 'MED-552', phone: '9000011111', lastVisit: '3 weeks ago', status: 'Paid' },
  { id: 'P06', name: 'Deepika Padukone', mrn: 'MED-441', phone: '9222233333', lastVisit: '5 days ago', status: 'Waiting' },
  { id: 'P07', name: 'Ranveer Singh', mrn: 'MED-330', phone: '9444455555', lastVisit: 'Today', status: 'In Session' },
  { id: 'P08', name: 'Rohit Sharma', mrn: 'MED-229', phone: '9666677777', lastVisit: '2 months ago', status: 'Completed' },
  { id: 'P09', name: 'Alia Bhatt', mrn: 'MED-118', phone: '9888899999', lastVisit: '1 week ago', status: 'Paid' },
  { id: 'P10', name: 'Ranbir Kapoor', mrn: 'MED-007', phone: '9111122222', lastVisit: '4 days ago', status: 'Waiting' },
  { id: 'P11', name: 'Kareena Kapoor', mrn: 'MED-123', phone: '9333344444', lastVisit: 'Just now', status: 'In Session' },
  { id: 'P12', name: 'Saif Ali Khan', mrn: 'MED-456', phone: '9555566666', lastVisit: 'Yesterday', status: 'Completed' },
  { id: 'P13', name: 'Katrina Kaif', mrn: 'MED-789', phone: '9777788888', lastVisit: '2 days ago', status: 'Paid' },
  { id: 'P14', name: 'Vicky Kaushal', mrn: 'MED-101', phone: '9999900000', lastVisit: '3 days ago', status: 'Waiting' },
  { id: 'P15', name: 'Hrithik Roshan', mrn: 'MED-202', phone: '9222211111', lastVisit: '1 month ago', status: 'Paid' },
];

// ==========================================
// 2. COMPONENT: DAILY LEDGER (Sticky Input)
// ==========================================

const DailyLedger = () => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  // const [selectedIndex, setSelectedIndex] = useState(-1);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
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

  // Dummy Selection Handler
  const handleSelect = (p: Patient | string) => {
    if (typeof p === 'string') {
      console.log("Create New Patient:", p);
    } else {
      console.log("Existing Patient Selected:", p.name);
    }
    setInput('');
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black border border-zinc-800 rounded-lg overflow-hidden flex flex-col h-[600px] relative shadow-2xl">

      {/* 1. Header (Static) */}
      <div className="flex justify-between items-end p-6 border-b border-zinc-900 bg-zinc-950 z-10">
        <div>
          <h3 className="text-white font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Daily Register (दैनिक रजिस्टर)
          </h3>
          <p className="text-zinc-500 text-sm mt-1">Friday, 24 Nov • Live Feed</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono text-white">42</div>
          <div className="text-xs text-zinc-600 uppercase tracking-widest">Total Visits</div>
        </div>
      </div>

      {/* 2. Column Headers (Static) */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-900 border-b border-zinc-800 text-xs font-medium text-zinc-500 uppercase tracking-wider z-10">
        <div className="col-span-2">Time</div>
        <div className="col-span-4">Patient Name</div>
        <div className="col-span-4">Context / Reason</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {/* 3. Scrollable List Area */}
      {/* Note: pb-[80px] creates space at the bottom so the last item isn't hidden behind the sticky input */}
      <div className="flex-1 overflow-y-auto pb-[80px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {MOCK_PATIENTS.map((p, i) => (
          <div
            key={p.id}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors group cursor-default"
          >
            <div className="col-span-2 text-zinc-600 font-mono text-xs flex items-center gap-2">
              <Clock className="w-3 h-3" />
              10:{15 + i}
            </div>
            <div className="col-span-4">
              <div className="text-zinc-300 font-medium group-hover:text-white transition-colors">{p.name}</div>
              <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{p.mrn}</div>
            </div>
            <div className="col-span-4 text-zinc-500 text-sm flex items-center">
              {i % 2 === 0 ? "Orthopedics (Knee)" : "General Follow-up"}
            </div>
            <div className="col-span-2 text-right">
              <span className={`text-[10px] px-2 py-1 rounded border ${p.status === 'Paid' ? 'bg-emerald-950/30 text-emerald-500 border-emerald-900/50' :
                p.status === 'Waiting' ? 'bg-amber-950/30 text-amber-500 border-amber-900/50' :
                  'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}>
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Sticky Footer Container (Input + Floating Menu) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black p-0">

        {/* A. The Floating Typeahead List (Drop-up) */}
        {showSuggestions && <SearchSuggestions filteredPatients={filteredPatients} input={input} handleSelect={handleSelect}/>}

        {/* B. The Actual Input Row (Sticky Anchor) */}
        <div className="grid grid-cols-12 gap-4 px-6 py-5 bg-zinc-900 border-t border-zinc-800 items-center relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {/* Visual Indicator on Left */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>

          <div className="col-span-2 text-white font-mono text-xs opacity-50">Now</div>
          <div className="col-span-10 relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              autoFocus
              value={input}
              onChange={handleInputChange}
              className="w-full bg-transparent border-none outline-none text-xl font-medium text-white placeholder-zinc-600 pl-9"
              placeholder="Start typing Name or Mobile..."
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
              <span className="hidden sm:inline-block text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700">
                {input.length > 0 ? "↵ ENTER" : "Type to Search"}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DailyLedger;


interface SearchSuggestionsProps  {
  filteredPatients:Patient[];
   handleSelect(p: Patient | string):void;
    input:string;
}

 const SearchSuggestions = ({filteredPatients,handleSelect,input}:SearchSuggestionsProps) => (
  <div className="absolute bottom-full left-0 right-0 mx-4 mb-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden max-h-[300px] flex flex-col z-50">

    {/* Header of Dropdown */}
    <div className="px-4 py-2 bg-zinc-950 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
      Search Results ({filteredPatients.length})
    </div>

    {/* Scrollable Results */}
    <div className="overflow-y-auto max-h-[200px]">
      {filteredPatients.map(p => (
        <button
          key={p.id}
          onClick={() => handleSelect(p)}
          className="w-full text-left px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800 hover:text-white group flex justify-between items-center transition-colors"
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
      onClick={() => handleSelect(input)}
      className="w-full text-left px-4 py-3 bg-zinc-950 hover:bg-zinc-900 border-t border-zinc-700 text-white flex items-center gap-3 transition-colors"
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