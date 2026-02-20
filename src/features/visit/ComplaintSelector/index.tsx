import { useState } from "react";
import type { MedicalComplaint, Patient } from "@/types";
import { PatientHeader } from "./components/PatientHeader";
import { SectionLabel } from "./components/primitives";
import { NewComplaintInput } from "./components/NewComplaintInput";
import { FooterActions } from "./components/FooterActions";
import { ComplaintItem } from "./components/ComplaintItem";
import { formatBracketText } from "@/lib";
import { useComplaintSelection } from "./hook/useComplaintSelection";

interface ComplaintSelectorProps {
    patient: Patient;
    availableComplaints: MedicalComplaint[];
    onConfirm: (selectedIds: string[]) => void;
    onCancel: () => void;
}

export const ComplaintSelector: React.FC<ComplaintSelectorProps> = ({
    patient,
    availableComplaints,
    onConfirm,
    onCancel,
}) => {
    const { add, remove, allComplaints, reset, selectedIds, toggle } = useComplaintSelection(availableComplaints)
    const [newComplaintInput, setNewComplaintInput] = useState("");

    const handleCancel = () => {
        reset()
        setNewComplaintInput("");
        onCancel();
    };

    const handleConfirm = () => {
        onConfirm(Array.from(selectedIds));
    };

    const handleAddNewComplaint = () => {
        const trimmedInput = newComplaintInput.trim();
        const formatted = formatBracketText(trimmedInput)
        if (!formatted) return;

        add(formatted)
        setNewComplaintInput("");

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddNewComplaint();
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-2xl transition-colors duration-300">
            <PatientHeader patient={patient} />

            <div className="mb-6">
                <SectionLabel text="Select Visit Complaint (Multiple Selection Allowed)" />

                <div className="space-y-3">
                    {allComplaints.map((complaint) => (
                        <ComplaintItem
                            key={complaint.id}
                            complaint={complaint}
                            isSelected={selectedIds.has(complaint.id)}
                            onToggle={toggle}
                            remove={remove}
                        />
                    ))}

                    <NewComplaintInput
                        value={newComplaintInput}
                        onChange={setNewComplaintInput}
                        onKeyDown={handleKeyDown}
                        onAdd={handleAddNewComplaint}
                    />
                </div>
            </div>

            <FooterActions
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                isConfirmDisabled={selectedIds.size === 0}
            />
        </div>
    );
};

export default ComplaintSelector;