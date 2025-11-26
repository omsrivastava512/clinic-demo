import React, { useState, useEffect, useRef } from 'react';
import { X, User, 
  // Phone, Calendar, MapPin,
  Smartphone,  Check } from 'lucide-react';

interface IntakeProps {
  initialName?: string; // Passed from the search bar input
  onClose: () => void;
}

const App: React.FC<IntakeProps> = ({ initialName = '', onClose }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: initialName,
    phone: '',
    gender: 'M', // Smart default
    age: '',
    referral: 'WALKIN'
  });

  // Ref for the first input to auto-focus
  const phoneRef = useRef<HTMLInputElement>(null);

  // Auto-focus logic: If name is provided, focus phone. If no name, focus name.
  useEffect(() => {
    if (initialName && phoneRef.current) {
      phoneRef.current.focus();
    }
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ALERT as requested for demo
    alert(`Creating Profile for: ${formData.name}\nMobile: ${formData.phone}\nGender: ${formData.gender}`);
    onClose();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-black border border-zinc-800 rounded-xl shadow-2xl overflow-hidden relative">
      
      {/* Header */}
      <div className="px-8 py-6 border-b border-zinc-900 bg-zinc-950 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-500" />
            New Patient Registration
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Create digital ID & generate MRN</p>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
        
        {/* ROW 1: NAME (The Hero Field) */}
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Full Name (Full Legal Name)</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})}
            placeholder="e.g. Ramesh Gupta"
            className="w-full bg-zinc-900/50 border border-zinc-700 text-white text-xl font-medium px-4 py-3 rounded-lg focus:border-white focus:ring-1 focus:ring-white outline-none transition-all placeholder-zinc-600"
            autoFocus={!initialName}
          />
        </div>

        {/* ROW 2: VITAL DEMOGRAPHICS (Grid) */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Mobile Number (Critical for India) */}
          <div className="col-span-6">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Mobile / WhatsApp</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                ref={phoneRef}
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: (e.target as HTMLInputElement).value})}
                placeholder="98765 00000"
                className="w-full bg-zinc-900/50 border border-zinc-700 text-white font-mono text-lg px-4 py-3 pl-10 rounded-lg focus:border-white outline-none transition-all placeholder-zinc-700"
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
              className="w-full bg-zinc-900/50 border border-zinc-700 text-white text-center text-lg px-2 py-3 rounded-lg focus:border-white outline-none transition-all placeholder-zinc-700"
            />
          </div>

          {/* Gender (Visual Toggles - Faster than dropdown) */}
          <div className="col-span-3">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Gender</label>
            <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
              {['M', 'F'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({...formData, gender: g})}
                  className={`flex-1 py-2 rounded text-sm font-bold transition-all ${
                    formData.gender === g 
                      ? 'bg-zinc-700 text-white shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: REFERRAL (Quick Tags) */}
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Referral Source</label>
          <div className="flex gap-3">
            {[
              { id: 'WALKIN', label: 'Walk-In' },
              { id: 'GOOGLE', label: 'Google Maps' },
              { id: 'DOCTOR', label: 'Dr. Referral' }
            ].map((ref) => (
              <button
                key={ref.id}
                type="button"
                onClick={() => setFormData({...formData, referral: ref.id})}
                className={`px-4 py-2 rounded-md border text-xs font-medium transition-all ${
                  formData.referral === ref.id 
                    ? 'bg-white border-white text-black' 
                    : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600'
                }`}
              >
                {ref.label}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-6 mt-2 border-t border-zinc-900 flex justify-end gap-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-zinc-500 hover:text-white transition-colors"
          >
            Cancel (Esc)
          </button>
          <button 
            type="submit"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(5,150,105,0.3)] transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Create Profile
          </button>
        </div>

      </form>
    </div>
  );
};

export default App;