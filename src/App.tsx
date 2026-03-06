import { useEffect, useState } from 'react'

import NewPatientIntake from './features/patient/NewPatientIntake';
import { MOCK_CONTEXTS, MOCK_PATIENTS } from './data/mock_data';
import PresentationSection from '@/components/PresentationSection';
import DailyLedger from '@/features/ledger';
import ComplaintSelector from './features/visit/ComplaintSelector';
import InvoiceBuilder from './features/visit/InvoiceBuilder';
import ProcedureLogger from './features/visit/ProcedureLogger';
import { Moon, Sun } from 'lucide-react';
import WelcomeTip from './components/WelcomeTip';
import type { InvoiceItem } from './types';

const lastUpdated = new Date(import.meta.env.VITE_LAST_UPDATED);

const datePart = lastUpdated.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
});
const timePart = lastUpdated.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});

const formattedDate = `${datePart} | ${timePart}`;
// console.log(formattedDate); // Output: Tue Jan 06, 2026 | 23:50


// ==========================================
// 3. UI COMPONENTS
// ==========================================


const App = () => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Dummy Handlers for display purposes
    const handleLog = (i: InvoiceItem[]) => {
        console.log(i)
        const totalCost = i.reduce((s,i)=>s+i.cost,0)
        alert("Bill Generated: ₹"+totalCost)
    };

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [isDarkMode])


    return (
        <div >
            <WelcomeTip
                skipText='Dismiss'
                description='Click on the section heading to hide/unhide the component.'
            />

            <div className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 py-20 px-4 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">
                <ToggleDarkButton isDarkMode={isDarkMode} toggleDark={() => setIsDarkMode(!isDarkMode)} />

                <DemoHeader />

                <PresentationSection hidden title="The Daily Ledger & Search"
                    number='01' description='Upcoming Features: ShimmerUI in search results floater, Add status wise filter '>
                    <DailyLedger />
                </PresentationSection>

                <PresentationSection hidden title="New Patient Registration"
                    number='02' description='Upcoming: add preset suggestions in clinical notes, convert age to dob'
                    className="flex gap-5 flex-wrap" tag='register'
                >
                    <NewPatientIntake onClose={() => { }} initialName="Arjun" onSubmit={() => { }} />
                </PresentationSection>

                <PresentationSection hidden title="Complaint Selector (Diagnosis)"
                    number='03' description='Upcoming: Add a suggestive complaint drop down as the user starts typing in the add a new complaint box (searchable by category)'
                    className="flex justify-center" tag='complaints'
                >
                    <ComplaintSelector
                        patient={MOCK_PATIENTS[0]}
                        availableComplaints={MOCK_CONTEXTS}
                        onConfirm={()=>{}}
                        onCancel={() => { }}
                    />
                </PresentationSection>

                <PresentationSection title="Procedure Logger (Multi-Context Logic)"
                    number='04' tag='procedure'
                    description='Upcoming: Add Search Bar to find less common procedures and heading with selected complaints and validate all have been selected'
                >
                    {/* We simulate passing TWO contexts to show the grouping logic */}
                    <ProcedureLogger
                        selectedComplaints={MOCK_CONTEXTS.slice(0)}
                        onComplete={handleLog}
                    />
                </PresentationSection>

                <PresentationSection title="Invoice & Payment (Indian Locale)"
                    number='05' description='Upcoming: options to add pay later,  visual confirmation of selected payment mode, Clinic/doctor/issuer name in the header'
                    tag='billing'
                >
                    <InvoiceBuilder
                        invoiceNumber='INV-2026-0306-088'
                        items={[
                            { procedureId: '1', complaintId: 'C1', name: 'Ultrasonic Therapy', complaintName: 'Right Knee ACL', cost: 250 },
                            { procedureId: '2', complaintId: 'C2', name: 'Interferential Therapy', complaintName: 'Lower Back', cost: 300 },
                        ].slice(0)}
                        patientName="Amitabh Bachchan"
                        onClose={() => alert('Visit Closed')}
                    />
                </PresentationSection>

            </div>
        </div>
    );
};

export default App;


type ToggleDarkButtonProps = {
    isDarkMode: boolean,
    toggleDark(): void
}

const ToggleDarkButton = ({ isDarkMode, toggleDark }: ToggleDarkButtonProps) => (
    <button
        type='button'
        onClick={toggleDark}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-900 dark:text-white hover:scale-105 transition-transform"
        title="Toggle Theme"
    >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
)

const DemoHeader = () => (
    <header className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">Clinic App Catalogue</h1>
        <p className="text-zinc-600 dark:text-zinc-500">Modular React + TS components for Indian Physiotherapy Clinics.</p>

        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2 font-mono">Last Updated: {formattedDate} </p>
        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2">
            <a className='underline' href="https://github.com/omsrivastava512/clinic-demo/commits/" target="_blank" rel="noopener" >Track Progress↗ </a> &nbsp; | &nbsp;
            <a className='underline' href="#procedure" rel="noopener" >Jump to working component↓ </a>
        </p>
    </header>
)
