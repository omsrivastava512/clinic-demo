import type { Patient } from "@/types";
import { ArrowUpRightIcon, MapPinHouseIcon, SmartphoneIcon, UserIcon } from "lucide-react";
import { ListItemButton } from "./primitives";
import {cn} from "@/utils"


type PatientListProps = {
    filteredPatients: Patient[],
    handleSelect(i: number): void;
    focusedIndex: number,
    input: string
}

const PatientResult = ({ filteredPatients, handleSelect, focusedIndex, input }: PatientListProps) => {
    return (
        <div className="overflow-y-auto max-h-[200px]">
            {filteredPatients.map((p, i) => (
                <PatientListItem
                    onSelect={() => handleSelect(i)}
                    isSelected={i === focusedIndex}
                    patient={p}
                />
            ))}

            {/* No Results */}
            {filteredPatients.length === 0 && (
                <div className="px-4 py-6 text-center text-zinc-500 text-sm italic cursor-not-allowed ">
                    No existing patients found for "{input}"
                </div>
            )}
        </div>
    )
}

export default PatientResult


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
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-gray-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500",
                "group-hover:border-zinc-400 dark:group-hover:border-zinc-600",
                "group-data-[selected=true]:border-zinc-400 dark:group-data-[selected=true]:border-zinc-600"
            )}>
                <UserIcon className="w-4 h-4" />
            </div>

            {/* PATIENT DETAILS */}
            <div>
                <div className={cn(
                    "font-medium text-zinc-700 dark:text-zinc-300",
                    "group-hover:text-black dark:group-hover:text-white",
                    "group-data-[selected=true]:text-black group-data-[selected=true]:dark:text-white text-sm"
                )}>
                    {patient.name}
                </div>
                <div className={cn(
                    "text-[10px] text-zinc-500 font-mono flex items-center gap-2", "group-hover:text-zinc-700 dark:group-hover:text-zinc-300", "group-data-[selected=true]:text-zinc-700 group-data-[selected=true]:dark:text-zinc-300"
                )}>
                    <span>{patient.mrn}</span>
                    <span>•</span>
                    <SmartphoneIcon className="w-3 h-3" /> {patient.phone}
                    <MapPinHouseIcon className="w-3 h-3" /> {patient.address}
                </div>
            </div>
        </div>

        <ArrowUpRightIcon className="w-4 h-4 text-black dark:text-white opacity-0  group-data-[selected=true]:opacity-100 transition-opacity" />

    </ListItemButton>
)