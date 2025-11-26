import React, { useState, useEffect, useRef } from 'react';
import {  User , Smartphone,  ArrowRight,
  // X,Phone, Calendar,MapPin, Check, 
} from 'lucide-react';

interface IntakeProps {
  initialName?: string; 
  onClose: () => void;
}

const App: React.FC<IntakeProps> = ({ initialName = '', onClose }) => {
  const [formData, setFormData] = useState({
    name: initialName,
    phone: '',
    gender: 'M',
    age: '',
    referral: 'WALKIN'
  });

  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialName && phoneRef.current) {
      phoneRef.current.focus();
    }
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`[DEMO] Created: ${formData.name} \nMRN Generated: MED-${Math.floor(Math.random() * 10000)}`);
    onClose();
  };

  return (
    // Container: Matches the "Glass Panel" and Border style of Context Selector
    <div className="w-full max-w-xl mx-auto bg-black border border-zinc-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
      
      {/* Header: Matches Daily Ledger Header */}
      <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            New Patient Registration
          </h2>
        </div>
        <div className="text-right">
          <div className="text-zinc-500 text-[10px] uppercase tracking-widest">AUTO-ASSIGN MRN</div>
          <div className="text-zinc-300 font-mono text-xs">Waiting for data...</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 bg-black">
        
        {/* ROW 1: NAME (The Hero Field) */}
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Full Legal Name</label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})}
              placeholder="e.g. Ramesh Gupta"
              // Style: Matches the Sticky Search Bar from Ledger
              className="w-full bg-zinc-900/30 border border-zinc-800 text-white text-lg font-medium px-4 py-3 pl-10 rounded-lg focus:border-zinc-500 focus:bg-zinc-900/50 outline-none transition-all placeholder-zinc-700"
              autoFocus={!initialName}
            />
          </div>
        </div>

        {/* ROW 2: VITAL DEMOGRAPHICS */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Mobile Number */}
          <div className="col-span-6">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Mobile / WhatsApp</label>
            <div className="relative group">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
              <input 
                ref={phoneRef}
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})}
                placeholder="98765 00000"
                className="w-full bg-zinc-900/30 border border-zinc-800 text-white font-mono text-lg px-4 py-3 pl-10 rounded-lg focus:border-zinc-500 outline-none transition-all placeholder-zinc-700"
              />
            </div>
          </div>

          {/* Age */}
          <div className="col-span-3">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Age</label>
            <input 
              type="number" 
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: (e.target as HTMLInputElement).value})}
              placeholder="00"
              className="w-full bg-zinc-900/30 border border-zinc-800 text-white text-center text-lg font-mono px-2 py-3 rounded-lg focus:border-zinc-500 outline-none transition-all placeholder-zinc-700"
            />
          </div>

          {/* Gender (Toggle Buttons) */}
          <div className="col-span-3">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Gender</label>
            <div className="flex bg-zinc-900/30 rounded-lg border border-zinc-800 p-0.5 h-[52px]">
              {['M', 'F'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({...formData, gender: g})}
                  className={`flex-1 rounded-md text-sm font-bold transition-all ${
                    formData.gender === g 
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700' 
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: REFERRAL (Styled like Context Selector Options) */}
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Referral Source</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'WALKIN', label: 'Walk-In' },
              { id: 'GOOGLE', label: 'Google Maps' },
              { id: 'DOCTOR', label: 'Dr. Referral' }
            ].map((ref) => (
              <button
                key={ref.id}
                type="button"
                onClick={() => setFormData({...formData, referral: ref.id})}
                className={`py-3 rounded-lg border text-xs font-medium transition-all ${
                  formData.referral === ref.id 
                    ? 'bg-zinc-100 border-white text-black' 
                    : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900'
                }`}
              >
                {ref.label}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-6 mt-2 border-t border-zinc-900 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
          
          {/* Primary Action: Matches Context Selector "Continue" Button */}
          <button 
            type="submit"
            className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-lg transition-all flex items-center gap-2 text-sm"
          >
            Create Profile & Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default App;