import { PlusIcon, } from "lucide-react";
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
        <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
            <PlusIcon className="w-4 h-4" />
        </div>
        <div>
            <div className="font-bold text-sm">Register New Patient: "{input}"</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-zinc-700! dark:group-hover:text-zinc-300! group-data-[selected=true]:text-zinc-700! group-data-[selected=true]:dark:text-zinc-300!">Create new MRN and start intake</div>
        </div>
    </ListItemButton>
)

 export default AddNewPatientButton
