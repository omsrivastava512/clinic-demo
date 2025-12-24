import type { Patient } from "@/types";
import { ArrowUpRight, MapPinHouse, Smartphone, User } from "lucide-react";
import { ListItemButton } from "./primitives";

type PatientListProps = {
    filteredPatients: Patient[],
    handleSelect(i: number): void;
    selectedIndex: number,
    input: string
}

const PatientList = ({ filteredPatients, handleSelect, selectedIndex, input }: PatientListProps) => {
    return (
        <div className="overflow-y-auto max-h-[200px]">
            {filteredPatients.map((p, i) => (
                <PatientListItem
                    onSelect={() => handleSelect(i)}
                    isSelected={i === selectedIndex}
                    patient={p}
                />
            ))}

            {/* No Results */}
            {filteredPatients.length === 0 && (
                <div className="px-4 py-6 text-center text-zinc-500 text-sm italic">
                    No existing patients found for "{input}"
                </div>
            )}
        </div>
    )
}

export default PatientList


type PatientListItemProps = {
    patient: Patient;
    onSelect(): void;
    isSelected: boolean;
};


const PatientListItem = ({ patient, onSelect, isSelected }: PatientListItemProps) => (
    <ListItemButton
        key={patient.id}
        onSelect={onSelect}
        variant="normal"
        isSelected={isSelected}
    >
        <div className="flex items-center gap-3">
            {/* ICON */}
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-950 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-500 group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                <User className="w-4 h-4" />
            </div>

            {/* PATIENT DETAILS */}
            <div>
                <div className="font-medium  text-zinc-700 dark:text-zinc-300 group-hover:text-black! dark:group-hover:text-white! group-data-[selected=true]:text-black group-data-[selected=true]:dark:text-white text-sm">
                    {patient.name}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2 group-hover:text-zinc-700! dark:group-hover:text-zinc-300! group-data-[selected=true]:text-zinc-700! group-data-[selected=true]:dark:text-zinc-300!">
                    <span>{patient.mrn}</span>
                    <span>•</span>
                    <Smartphone className="w-3 h-3" /> {patient.phone}
                    <MapPinHouse className="w-3 h-3" /> Om Nagar
                </div>
            </div>
        </div>

        <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:text-black dark:group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />

    </ListItemButton>
)