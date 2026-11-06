import type { Patient } from "@/types";
import { ArrowUpRight, MapPin, Phone, User } from "lucide-react";
import { ListItemButton } from "./primitives";
import { cn } from "@/lib";
import { isMinInputLength } from "../utils";
import { useEffect, useRef } from "react";

type PatientListProps = {
    filteredPatients: Patient[];
    handleSelect(i: number): void;
    focusedIndex: number;
    input: string;
};

const PatientResult = ({ filteredPatients, handleSelect, focusedIndex, input }: PatientListProps) => {
    return (
        <div className="overflow-y-auto max-h-56">
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
            {!isMinInputLength(input) ? (
                <div className="px-4 py-5 text-center text-muted-foreground text-xs font-mono">
                    Type at least 3 characters to search…
                </div>
            ) : filteredPatients.length === 0 && (
                <div className="px-4 py-5 text-center text-muted-foreground text-xs">
                    No registered patients matching <span className="font-semibold text-foreground">"{input}"</span>
                </div>
            )}
        </div>
    );
};

export default PatientResult;

type PatientListItemProps = {
    patient: Patient;
    onSelect(): void;
    isSelected: boolean;
};

const PatientListItem = ({ patient, onSelect, isSelected }: PatientListItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (itemRef.current && isSelected) {
            itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [isSelected]);

    return (
        <ListItemButton
            onSelect={onSelect}
            variant="normal"
            isSelected={isSelected}
        >
            <div className="flex items-center gap-3" ref={itemRef}>
                {/* Avatar Icon */}
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    "bg-muted/80 border border-border text-muted-foreground"
                )}>
                    <User className="w-4 h-4" />
                </div>

                {/* Patient Details */}
                <div>
                    <div className="font-semibold text-foreground text-xs">
                        {patient.fullName}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-foreground/80">{patient.mrn}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-muted-foreground/70" />
                            {patient.phone}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 truncate max-w-[140px]">
                            <MapPin className="w-3 h-3 text-muted-foreground/70" />
                            {patient.address}
                        </span>
                    </div>
                </div>
            </div>

            <ArrowUpRight className={cn(
                "w-4 h-4 text-primary shrink-0 transition-opacity",
                isSelected ? "opacity-100" : "opacity-0"
            )} />
        </ListItemButton>
    );
};
