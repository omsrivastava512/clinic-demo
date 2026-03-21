
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
            <em className='text-sm text-zinc-500 font-semibold '>Opens the Daily Ledger, scrolled to the most recent entry. Expect a sudden scroll.</em>
            <em className='text-sm text-zinc-500 '>This button was introduced to force explicit user intent in starting the app and prevent components of the app from hijacking intial page orientation and the header text on load. </em>
        </div>
    );
    return (
        <>
            <PresentationSection title="The Daily Ledger & Search"
                number='01' description='Upcoming Features: ShimmerUI in search results floater, Add status wise filter '>
                <DailyLedger />
            </PresentationSection>

            <PresentationSection hidden title="New Patient Registration"
                number='02' description='Upcoming: add preset suggestions in clinical notes, convert age to dob'
                className="flex gap-5 flex-wrap" tag='register'
            >
                <NewPatientIntake onClose={() => { }} initialName="Arjun" onSubmit={() => { }} />
            </PresentationSection>

            <PresentationSection title="Complaint Selector (Diagnosis)"
                number='03' description='Upcoming: Add a suggestive complaint drop down as the user starts typing in the add a new complaint box (searchable by category)'
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
                description='Upcoming: Add Search Bar to find less common procedures and heading with selected complaints and validate all have been selected'
            >
                {/* We simulate passing TWO contexts to show the grouping logic */}
                <ProcedureLogger
                    selectedComplaints={MOCK_CONTEXTS.slice(0)}
                    onComplete={handleInvoiceLog}
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
        </>
    )
}

export default VisitWorkflow