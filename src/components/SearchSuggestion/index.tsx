import type { Patient } from "@/types";
import { DropdownContainer, DropdownHeader } from "./primitives";
import PatientList from "./PatientList";
import AddNewPatientButton from "./AddNewPatientButton";


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
