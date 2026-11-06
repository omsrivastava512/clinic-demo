import { Plus } from "lucide-react";
import { ListItemButton } from "./primitives";

type AddPatientButtonProps = {
    onSelect(): void;
    isSelected: boolean;
    input: string;
};

const AddNewPatientButton = ({ onSelect, isSelected, input }: AddPatientButtonProps) => (
    <ListItemButton
        onSelect={onSelect}
        variant="add"
        isSelected={isSelected}
    >
        <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-2xs">
            <Plus className="w-3.5 h-3.5" />
        </div>
        <div>
            <div className="font-semibold text-xs text-foreground">Register New Patient: "{input}"</div>
            <div className="text-[11px] text-muted-foreground">Open clinical intake form to assign new MRN and demographics</div>
        </div>
    </ListItemButton>
);

export default AddNewPatientButton;
