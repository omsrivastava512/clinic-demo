import { PlusIcon } from "lucide-react";
import { ListItemButton } from "./primitives";

type AddPatientButtonProps = {
    onSelect(): void,
    isSelected: boolean,
    input: string,
}

const AddNewPatientButton = ({ onSelect, isSelected, input }: AddPatientButtonProps) => (
    <ListItemButton
        onSelect={onSelect}
        variant="add"
        isSelected={isSelected}
    >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <PlusIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0">
            <div className="text-sm font-semibold">Register new patient</div>
            <div className="mt-0.5 truncate text-xs text-zinc-600 dark:text-zinc-300">“{input}”</div>
        </div>
    </ListItemButton>
)

 export default AddNewPatientButton
