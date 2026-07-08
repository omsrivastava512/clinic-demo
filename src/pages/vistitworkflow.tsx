
import { MOCK_CONTEXTS, MOCK_PATIENTS } from '@/data/mock_data';
import PresentationSection from '@/components/PresentationSection';
import NewPatientIntake from '@/features/patient/NewPatientIntake';
import DailyLedger from '@/features/ledger';
import ComplaintSelector from '@/features/visit/ComplaintSelector';
import InvoiceBuilder from '@/features/visit/InvoiceBuilder';
import ProcedureLogger from '@/features/visit/ProcedureLogger';
import type { InvoiceItem } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const VisitWorkflow = () => {

    const [isStarted, setIsStarted] = useState(false)
    const start = () => setIsStarted(true)

    // Dummy Handlers for display purposes
    const handleInvoiceLog = (i: InvoiceItem[]) => {
        console.log(i)
        const totalCost = i.reduce((s, i) => s + i.cost, 0)
        alert("Bill Generated: ₹" + totalCost)
    };

    if (!isStarted) return (
        <div className='flex flex-col items-center justify-center text-center gap-4 max-w-xs mx-auto'>
            <Button
                onClick={start}
                variant="outline" size="lg"
                className={"p-4  font-bold tracking-wide"}
            >
                Start Workflow
            </Button>
            <em className='text-sm text-zinc-500 font-semibold '>Initialize the interactive clinical workflow suite. Experience high-fidelity modular components built for rapid entry.</em>
            <em className='text-sm text-zinc-500 '>This presentation space showcases real-time OPD tracking, dynamic patient registration, multi-context procedure logging, and invoice billing. Components are fully self-contained to ensure seamless layout loading.</em>
        </div>
    );
    // NOTE: Wording in these presentation sections was updated to be highly user-centric and feature-focused,
    // avoiding developer-facing jargon (like O(1) sets or dual-column mapping) in favor of clear product utility descriptions.
    return (
        <>
            <PresentationSection title="The Daily Ledger & Search"
                number='01' 
                description="The central dashboard for managing daily clinic operations, displaying a real-time list of patients. Double-functions as a search portal for existing patients."
                features={[
                    'Interactive search box with real-time patient filtering',
                    'Keyboard navigation (Up/Down arrow keys to navigate, Enter to select)',
                    'Supports both phone search mode and name search mode',
                    'Contextual routing: opens New Patient Registration for new searches, or Complaint Selector for existing patients'
                ]}
                upcoming={[
                    'Shimmer UI loading states for search results',
                    'Status-based filtering options',
                    'Smart "scroll to top" or "scroll to bottom" buttons depending on active scroll position'
                ]}>
                <DailyLedger />
            </PresentationSection>

            <PresentationSection hidden title="New Patient Registration"
                number='02' 
                description="The initial point of entry for adding new patients to the clinic's database, capturing their personal details and primary medical notes."
                features={[
                    'Real-time name and phone number formatting and validation',
                    'Smart redirection using URL parameters (returns back to the workflow when launched from the Ledger)',
                    'Clinical Notes Builder with auto-categorized observations (e.g., fall risks, surgical history)',
                    'Warning prompts before discarding unsaved patient registration data'
                ]}
                upcoming={[
                    'Date of Birth picker replacing the manual age field',
                    'Preset suggestions in the Clinical Notes Builder for rapid entry'
                ]}
                className="flex gap-5 flex-wrap" tag='register'
            >
                <NewPatientIntake onClose={() => { }} initialName="Arjun" onSubmit={() => { }} />
            </PresentationSection>

            <PresentationSection title="Complaint Selector (Diagnosis)"
                number='03' 
                description="A clinical workspace for managing active medical conditions. Doctors can select which ongoing complaints are being treated in today's session, or register brand new complaints to the patient's active therapy list."
                features={[
                    'Displays a curated list of the patient\'s active complaints currently undergoing therapy',
                    'Enables checkmarking specific complaints to indicate they are being treated in today\'s session',
                    'Provides an input/search box to register brand new complaints to the active list (for new patients or new conditions)',
                    'Automatically normalizes and formats custom entries in real-time',
                    'Excludes historically resolved or cured complaints to keep the session focus clean'
                ]}
                upcoming={[
                    'Keyboard shortcuts (e.g., pressing "1" to select the first item)',
                    'Predictive autocomplete dropdown categorizing complaints as you type'
                ]}
                className="flex justify-center" tag='complaints'
            >
                <ComplaintSelector
                    patient={MOCK_PATIENTS[0]}
                    availableComplaints={MOCK_CONTEXTS}
                    onConfirm={() => { }}
                    onCancel={() => { }}
                />
            </PresentationSection>

            <PresentationSection title="Procedure Logger (Multi-Context Logic)"
                number='04' tag='procedure'
                description="The treatment workspace where specific medical procedures are assigned to the previously selected complaints."
                features={[
                    'Maps and groups medical procedures under each active patient complaint',
                    'Live billing receipt panel that instantly updates totals as procedures are toggled',
                    'Independent scrollable selection list with a fixed checkout summary'
                ]}
                upcoming={[
                    'Dynamically filter procedures so only relevant ones display for the active complaints',
                    'Accordion-style design allowing practitioners to collapse/expand procedures listed under each complaint heading',
                    'Search Bar to find less common procedures',
                    'Header validation to ensure all complaints have associated procedures selected'
                ]}
            >
                {/* We simulate passing TWO contexts to show the grouping logic */}
                <ProcedureLogger
                    selectedComplaints={MOCK_CONTEXTS.slice(0)}
                    onComplete={handleInvoiceLog}
                />
            </PresentationSection>

            <PresentationSection title="Invoice & Payment (Indian Locale)"
                number='05' 
                description={
                    // Using a JSX fragment to render a beautifully styled yellow warning block indicating active development status.
                    <div className="space-y-2">
                        <p>The final billing and checkout step, generating a detailed invoice based on the logged procedures and complaints.</p>
                        <div className="text-amber-700 dark:text-amber-400 font-semibold text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-md px-3 py-1.5 w-fit flex items-center gap-1.5 mt-2">
                            <span>⚠️</span> Note: This component is currently under active development.
                        </div>
                    </div>
                }
                features={[
                    'Instantly computes and sums costs across all assigned procedures',
                    'Generates a unique, trackable invoice ID for each transaction',
                    'Provides an itemized breakdown of costs, organized by specific patient complaints'
                ]}
                upcoming={[
                    'Options to add pay later',
                    'Visual confirmation of selected payment mode',
                    'Clinic/doctor/issuer name integrated in the header'
                ]}
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
        </>
    )
}

export default VisitWorkflow