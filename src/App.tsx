import {  useState } from 'preact/hooks'

import NewPatientIntake from './features/Intake';
import { MOCK_CONTEXTS,  MOCK_PATIENTS } from './data/mock_data';
import { PresentationSection } from './components/PresentationSection';
import ContextSelector from './features/ContextSelector';
import ProcedureLogger from './features/ProcedureLogger';
import InvoiceBuilder from './features/InvoiceBuilder';
import DailyLedger from './features/DailyLedger';
import { Moon, Sun } from 'lucide-react';



// ==========================================
// 3. UI COMPONENTS
// ==========================================


const App = () => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Dummy Handlers for display purposes
    const handleLog = (val: any) => console.log("Action Triggered:", val);



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
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">Clinic App Catalogue</h1>
                    <p className="text-zinc-600 dark:text-zinc-500">Modular React + TS components for Indian Physiotherapy Clinics.</p>
                    <p className="text-zinc-500 dark:text-zinc-600 text-sm mt-2 font-mono">
                        Theme: {isDarkMode ? 'Pearl Black' : 'Clinical White'} • Mode: Many-to-Many Context
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2 font-mono">Last Updated: Wed Dec 24, 2025 | 21:40 </p>
                </div>

                <PresentationSection title="The Daily Ledger (Input)"
                    number='01' description='Upcoming Features: ShimmerUI in search results floater, Add status wise filter '>
                    <DailyLedger onPatientIdentified={handleLog} />
                </PresentationSection>

                <PresentationSection title="2. Intake"
                    number='02' description='Upcoming: Add address line for patient'>
                    <div className="flex gap-5 flex-wrap">
                        <NewPatientIntake onClose={() => { }} />
                    </div>
                </PresentationSection>




                <PresentationSection title="Context Switcher (Diagnosis)"
                    number='03' description='Upcoming: Add Last Visit as designed in workflow'>
                    <div className="flex justify-center">
                        <ContextSelector
                            patient={MOCK_PATIENTS[0]}
                            availableContexts={MOCK_CONTEXTS}
                            onConfirm={handleLog}
                            onCancel={() => alert('Cancelled')}
                        />
                    </div>
                </PresentationSection>

                <PresentationSection title="Procedure Logger (Multi-Context Logic)"
                    number='04' description='Upcoming: Add Search Bar to find less common procedures and heading with selected complaints and validate all have been selected'>
                    {/* We simulate passing TWO contexts to show the grouping logic */}
                    <ProcedureLogger
                        selectedContexts={[MOCK_CONTEXTS[0], MOCK_CONTEXTS[1]]}
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



