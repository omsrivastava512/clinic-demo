import { Plus, } from "lucide-react";
import type { Patient } from "@/types";
import { DropdownContainer, DropdownHeader, ListItemButton } from "./primitives";
import PatientList from "./PatientList";
// import { PatientListItem,} from "./PatientList";


interface SearchSuggestionsProps {
    filteredPatients: Patient[];
    handleSelect(i: number): void;
    input: string;
    selectedIndex: number
}

const SearchSuggestions = ({ filteredPatients, handleSelect, input, selectedIndex }: SearchSuggestionsProps) => (
    <DropdownContainer>
        <DropdownHeader count={filteredPatients.length} />
        <PatientList
            filteredPatients={filteredPatients}
            input={input}
            selectedIndex={selectedIndex}
            handleSelect={handleSelect}
        />
        <AddNewPatientButton
            onSelect={() => handleSelect(filteredPatients.length)}
            isSelected={filteredPatients.length === selectedIndex}
            input={input}
        />
    </DropdownContainer>
)

export default SearchSuggestions

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
            <Plus className="w-4 h-4" />
        </div>
        <div>
            <div className="font-bold text-sm">Register New Patient: "{input}"</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-zinc-700! dark:group-hover:text-zinc-300! group-data-[selected=true]:text-zinc-700! group-data-[selected=true]:dark:text-zinc-300!">Create new MRN and start intake</div>
        </div>
    </ListItemButton>
)

