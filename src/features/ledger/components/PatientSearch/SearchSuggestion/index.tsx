import type { Patient } from "@/types";
import { DropdownContainer, DropdownHeader } from "./primitives";
import PatientList from "./PatientResult";
import AddNewPatientButton from "./AddNewPatientButton";


interface SearchSuggestionsProps {
    filteredPatients: Patient[];
    handleSelect(i: number): void;
    input: string;
    focusedIndex: number
}

const SearchSuggestions = ({ filteredPatients, handleSelect, input, focusedIndex }: SearchSuggestionsProps) =>{ 
    
   return(
    <DropdownContainer>
        <DropdownHeader count={filteredPatients.length} />
        <PatientList
            filteredPatients={filteredPatients}
            input={input}
            focusedIndex={focusedIndex}
            handleSelect={handleSelect}
        />
        <AddNewPatientButton
            onSelect={() => handleSelect(filteredPatients.length)}
            isSelected={filteredPatients.length === focusedIndex}
            input={input}
        />
    </DropdownContainer>
)}

export default SearchSuggestions
