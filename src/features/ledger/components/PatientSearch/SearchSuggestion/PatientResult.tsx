import type { Patient } from "@/types";
import { ChevronRightIcon, MapPinHouseIcon, SmartphoneIcon, UserIcon } from "lucide-react";
import { ListItemButton } from "./primitives";
import { isMinInputLength } from "../utils";
import { useEffect, useRef } from "react";


type PatientListProps = {
    filteredPatients: Patient[],
    handleSelect(i: number): void;
    focusedIndex: number,
    input: string
}

const PatientResult = ({ filteredPatients, handleSelect, focusedIndex, input }: PatientListProps) => {

    return (
        <div className="max-h-50 min-h-0 overflow-y-auto">
            {isMinInputLength(input) &&
                filteredPatients.map((p, i) => (
                    <PatientListItem
                        key={p.id}
                        onSelect={() => handleSelect(i)}
                        isSelected={i === focusedIndex}
                        patient={p}
                    />
                ))
            }

            {/* No Results */}
            {
                !isMinInputLength(input) ? (
                    <div role="status" className="px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                        Enter at least 3 characters to search.
                    </div>
                )
                    : filteredPatients.length === 0 && (
                        <div role="status" className="px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                            No matching patients.
                        </div>
                    )
            }
        </div>
    )
}

export default PatientResult


type PatientListItemProps = {
    patient: Patient;
    onSelect(): void;
    isSelected: boolean;
};


const PatientListItem = ({ patient, onSelect, isSelected }: PatientListItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(itemRef.current && isSelected){
            itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest"})
        }
    }, [isSelected])

    return (
        <ListItemButton
            onSelect={onSelect}
            variant="normal"
            isSelected={isSelected}
        >
            <div className="flex min-w-0 items-center gap-3" ref={itemRef}>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <UserIcon aria-hidden="true" className="size-4" />
                </div>

                <div className="min-w-0">
                    <div className="text-sm font-semibold wrap-anywhere">
                        {patient.fullName}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-xs text-zinc-600 dark:text-zinc-300">
                        <span className="font-mono">{patient.mrn}</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                            <SmartphoneIcon aria-hidden="true" className="size-3 shrink-0" />
                            {patient.phone}
                        </span>
                        {patient.address && (
                            <span className="inline-flex min-w-0 items-center gap-1 wrap-anywhere">
                                <MapPinHouseIcon aria-hidden="true" className="size-3 shrink-0" />
                                {patient.address}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-zinc-500 dark:text-zinc-400" />

        </ListItemButton>
    )
}
