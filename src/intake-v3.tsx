import { useState, useEffect, useRef } from 'preact/hooks';
import { X, User, Smartphone, Check, Footprints, MapPin, Stethoscope, NotebookPen } from 'lucide-react';

interface IntakeProps {
    initialName?: string;
    onClose: () => void;
}

const NewPatientIntake: React.FC<IntakeProps> = ({ initialName = '', onClose }) => {
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
        alert(`Creating Profile for: ${formData.name}\nMobile: ${formData.phone}\nGender: ${formData.gender}`);
        onClose();
    };

    return (
        <div className="w-full max-w-xl mx-auto my-4 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-colors duration-300">

            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex justify-between items-start transition-colors">
                <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                        New Patient Registration
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Create digital ID & generate MRN</p>
                </div>
                <button title={'Close'} type={'button'} onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 bg-white dark:bg-black transition-colors">

                {/* ROW 1: NAME */}
                <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Full Legal Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}
                        placeholder="e.g. Ramesh Gupta"
                        className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xl font-medium px-4 py-3 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                        autoFocus={!initialName}
                    />
                </div>

                {/* ROW 2: VITAL DEMOGRAPHICS (Responsive Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">

                    {/* Mobile Number */}
                    <div className="col-span-1 sm:col-span-6">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Mobile / WhatsApp</label>
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            <input
                                ref={phoneRef}
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: (e.target as HTMLInputElement).value })}
                                placeholder="98765 00000"
                                className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-lg px-4 py-3 pl-10 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                            />
                        </div>
                    </div>

                    {/* Age */}
                    <div className="col-span-1 sm:col-span-3">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Age</label>
                        <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: (e.target as HTMLInputElement as HTMLInputElement).value })}
                            placeholder="00"
                            className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-center text-lg px-2 py-3 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                        />
                    </div>

                    {/* Gender */}
                    <div className="col-span-1 sm:col-span-3">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Gender</label>
                        <div className="flex bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 border border-zinc-200 dark:border-zinc-800">
                            {['M', 'F'].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: g })}
                                    className={`flex-1 py-2 rounded text-sm font-bold transition-all ${formData.gender === g
                                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-transparent'
                                        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ROW 3: REFERRAL */}
                <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Referral Source</label>
                    <div className={`grid grid-cols-3 gap-3`}>
                        {[
                            { id: 'WALKIN', icon: <Footprints className={'inline'} />, label: 'Walk-In' },
                            { id: 'GOOGLE', icon: <MapPin className={'inline'} />, label: 'Google Maps' },
                            { id: 'DOCTOR', icon: <Stethoscope className={'inline'} />, label: 'Dr. Referral' }
                        ].map((ref) => (
                            <button
                                key={ref.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, referral: ref.id })}
                                className={`${''} px-4 py-2 rounded-md border text-xs font-medium transition-all ${formData.referral === ref.id
                                    ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-black'
                                    : "bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 dark:text-zinc-400 text-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                                    }`}
                            >
                                {ref.icon}
                                <span className={`hidden sm:block `}>{ref.label}</span>
                            </button>
                        ))}
                    </div>
                    {(formData.referral === 'DOCTOR') &&
                        <div class='transition-all duration-700'>
                            <label for="referral_info" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest my-3 block">Doctor's Info</label>

                            <textarea name="referral info" id="referral_info"
                                placeholder="Enter referring doctor's information like name, number, address, etc., here..." className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-lg px-4 py-3 pl-10 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                            />
                        </div>}

                </div>

                {/* FOOTER ACTIONS */}
                <div className="pt-6 mt-2 border-t border-zinc-100 dark:border-zinc-900 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
                    <button type="button"
                        title="Add additional details"
                        onClick={()=>alert()}
                        className="pr-10 py-3"
                    >
                        <NotebookPen className="sm:w-auto font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors" />
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        Cancel (Esc)
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Create Profile & Proceed...
                    </button>
                </div>

            </form>
        </div>
    );
};


export default NewPatientIntake;