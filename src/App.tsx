import { useEffect, useState } from 'react'

import {NewPatientIntake} from './features/patient';
import { MOCK_CONTEXTS, MOCK_PATIENTS } from './data/mock_data';
import { PresentationSection } from '@/PresentationSection';
import {ComplaintSelector, InvoiceBuilder, ProcedureLogger} from './features/visit';
import DailyLedger from '@/features/ledger';
import { Moon, Sun } from 'lucide-react';

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
console.log(formattedDate); // Output: Tue Jan 06, 2026 | 23:50


// ==========================================
// 3. UI COMPONENTS
// ==========================================


const App = () => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Dummy Handlers for display purposes
    const handleLog = () => { };

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [isDarkMode])


    return (
        <div >
            <div className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 py-20 px-4 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">

                <ToggleDarkButton isDarkMode={isDarkMode} toggleDark={() => setIsDarkMode(!isDarkMode)} />

                <DemoHeader />
                {/* 
                <PresentationSection description='' title='' number=''>
                    <PatientRecord /> 
                </PresentationSection> */}

                <PresentationSection hidden title="The Daily Ledger (Input)"
                    number='01' description='Upcoming Features: ShimmerUI in search results floater, Add status wise filter '>
                    <DailyLedger />
                </PresentationSection>

                <PresentationSection hidden title="Intake"
                    number='02' description='Upcoming: add preset suggestions in clinical notes'>
                    <div className="flex gap-5 flex-wrap">
                        <NewPatientIntake onClose={() => { }} initialName="Arjun" onSubmit={() => { }} />
                    </div>
                </PresentationSection>

                <PresentationSection title="Complaint Selector (Diagnosis)"
                    number='03' description='Upcoming: Add a suggestive complaint drop down as the user starts typing in the add a new complaint box (searchable by category)'>
                    <div className="flex justify-center">
                        <ComplaintSelector
                            patient={MOCK_PATIENTS[0]}
                            availableComplaints={MOCK_CONTEXTS}
                            onConfirm={handleLog}
                            onCancel={() => {}}
                        />
                    </div>
                </PresentationSection>

                <PresentationSection title="Procedure Logger (Multi-Context Logic)"
                    number='04' description='Upcoming: Add Search Bar to find less common procedures and heading with selected complaints and validate all have been selected'>
                    {/* We simulate passing TWO contexts to show the grouping logic */}
                    <ProcedureLogger
                        selectedContexts={[...MOCK_CONTEXTS]}
                        onComplete={handleLog}
                    />
                </PresentationSection>

                <PresentationSection title="Invoice & Payment (Indian Locale)"
                    number='05' description='Upcoming: options to add pay later'>
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


type ToggleDarkButtonProps = {
    isDarkMode: boolean,
    toggleDark(): void
}

const ToggleDarkButton = ({ isDarkMode, toggleDark }: ToggleDarkButtonProps) => (
    <button
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
        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2 underline"><a href="https://github.com/omsrivastava512/clinic-demo/commits/" target="_blank" rel="noopener" >Track Progress↗ </a></p>
    </header>
)