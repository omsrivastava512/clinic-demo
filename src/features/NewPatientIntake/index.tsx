import { useState, useReducer } from 'preact/hooks';
import ClinicalNotesBuilder from './ClinicalNotesBuilder';
import { capitalizeEachWord, deepTrimStrings, filterAge, filterAlphabetsAndSpaces, filterPhoneNumber, normalizeAddress, validateAddress, } from '@/utils';
import { Input, IntakeLayout, TextArea, } from './primitives';
import FormHeader from './FormHeader';
import ReferralSection from './ReferralSection';
import DemographicsSection from './DemographicsSection';
import FormFooter from './FormFooter';

const validateAndCapitalizeName = (val: string) => capitalizeEachWord(filterAlphabetsAndSpaces(val))

const validateFormData = (data: FormData): string[] => {
    const errors = []
    if (data.name.length < 5) errors.push('Name is too short');
    if (data.phone.length < 10) errors.push('Phone is required');
    if (+data.age == Number.NaN || +data.age < 0 || +data.age > 99) errors.push('Enter valid age');
    if (!validateAddress(data.address)) errors.push('Address is invalid or too short');
    if (data.address.length > 50) errors.push('Address is too long');
    if (data.referral === 'DOCTOR' && !validateAddress(data.doctorInfo)) {
        errors.push('Doctor information is required for doctor referrals');
    }
    return errors; // Valid if empty
}

interface IntakeProps {
    initialName?: string;
    onClose: () => void;
    onSubmit: (v: FormData) => void;

}

// TODO: add an 'ok' fn for each property to display a green ring in the input when the validation meets (Created on 2026-01-04)

// TODO: if the patient is minor don't allow intake unless guardian prenet (Created on 2026-01-04)
// ❗ Guardian Required
// Patient is under 18 and no parent/guardian is recorded as present.
// Do not continue intake until guardian identity and consent are verified.

export type FormData = {
    name: string;
    phone: string;
    sex: 'M' | 'F';
    age: string;
    address: string;
} & (
        | { referral: 'WALKIN' | 'GOOGLE'; doctorInfo?: never }
        | { referral: 'DOCTOR'; doctorInfo: string }
    )

type Action =
    | { type: 'CHANGE_NAME'; value: string }
    | { type: 'CHANGE_PHONE'; value: string }
    | { type: 'CHANGE_AGE'; value: FormData['age'] }
    | { type: 'CHANGE_SEX'; value: FormData['sex'] }
    | { type: 'CHANGE_ADDRESS'; value: FormData['address'] }
    | { type: 'CHANGE_REFERRAL'; value: FormData['referral'] }
    | { type: 'CHANGE_DOCTOR_INFO'; value: string }
    | { type: 'RESET' };

const formReducer = (state: FormData, action: Action): FormData => {
    switch (action.type) {
        case 'CHANGE_NAME': {
            return {
                ...state, name: validateAndCapitalizeName(action.value)
            };
        }
        case 'CHANGE_AGE': {
            return {
                ...state, age: filterAge(action.value)
            }
        }
        case 'CHANGE_PHONE': {
            return {
                ...state, phone: filterPhoneNumber(action.value)
            }
        }
        case 'CHANGE_SEX': {
            return {
                ...state, sex: action.value
            }
        }
        case 'CHANGE_ADDRESS': {
            return {
                ...state, address: normalizeAddress(action.value)
            }
        }
        case 'CHANGE_REFERRAL': {
            if (action.value === 'DOCTOR') {
                return {
                    ...state,
                    referral: action.value,
                    doctorInfo: ''
                }
            } else {
                const { doctorInfo, ...rest } = state;
                return {
                    ...rest,
                    referral: action.value
                }
            }
        }
        case 'CHANGE_DOCTOR_INFO': {
            // ensure it only happens when referral is DOCTOR
            if (state.referral === 'DOCTOR') return {
                ...state,
                doctorInfo: normalizeAddress(action.value)
            }
            return state;
        }
        case 'RESET': return initialFormData;
        default: return state;
    }
}

const initialFormData: FormData = {
    name: '',
    phone: '',
    sex: 'M',
    age: '',
    referral: 'WALKIN',
    address: "",
}

const NewPatientIntake: React.FC<IntakeProps> = ({ initialName = '', onClose, onSubmit }) => {

    const initializeName = (f: FormData) => ({ ...f, name: validateAndCapitalizeName(initialName) })

    const [formData, dispatch] = useReducer(formReducer, initialFormData, initializeName);

    const [showClinicalNotes, setShowClinicalNotes] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateFormData(formData);
        if (errors.length > 0) return alert(errors.join('\n'))

        const trimmedForm = deepTrimStrings(formData) as FormData
        alert(`Creating Profile for: ${trimmedForm.name}\nMobile: ${trimmedForm.phone}\nGender: ${trimmedForm.sex}\nAddress: ${trimmedForm.address}`);
        dispatch({ type: 'RESET' })
        onSubmit(trimmedForm);
    };

    return (
        <IntakeLayout>
            {/* Header */}
            <FormHeader onClose={onClose} />

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 bg-white dark:bg-black transition-colors">

                {/* ROW 1: NAME */}
                <NameInput
                    patientName={formData.name}
                    changeName={(value) => dispatch({ type: 'CHANGE_NAME', value })}
                />

                {/* ROW 2: VITAL DEMOGRAPHICS  */}
                <DemographicsSection
                    age={formData.age}
                    phone={formData.phone}
                    sex={formData.sex}
                    changeAge={(value) => dispatch({ type: 'CHANGE_AGE', value })}
                    changePhone={(value) => dispatch({ type: 'CHANGE_PHONE', value })}
                    changeSex={(value) => dispatch({ type: 'CHANGE_SEX', value })}
                />

                <AddressArea
                    address={formData.address}
                    changeAddress={(value) => dispatch({ type: 'CHANGE_ADDRESS', value })}
                />

                {/* ROW 3: REFERRAL */}
                <ReferralSection
                    doctorInfo={formData.doctorInfo}
                    selectedReferral={formData.referral}
                    changeReferral={(value: FormData['referral']) => dispatch({ type: 'CHANGE_REFERRAL', value })}
                    changeDoctorInfo={(value) => dispatch({ type: "CHANGE_DOCTOR_INFO", value })}
                />

                {/* FOOTER ACTIONS */}
                <FormFooter onClose={onClose} openClinicNotes={() => setShowClinicalNotes(true)} />

            </form>
            {showClinicalNotes && <ClinicalNotesBuilder
                onSave={() => setShowClinicalNotes(false)}
                onClose={() => setShowClinicalNotes(false)}
            />}

        </IntakeLayout>

    );
};


export default NewPatientIntake;


type NameInputProps = {
    patientName: FormData['name'],
    changeName(v: FormData['name']): void
}
const NameInput = ({ patientName, changeName }: NameInputProps) => (
    <div>
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Full Legal Name</label>
        <Input
            type="text"
            value={patientName}
            required
            onChange={(e) => changeName(e.currentTarget.value)}
            placeholder="e.g. Ramesh Gupta"
            className="text-xl font-medium"
            autoFocus
        />
    </div>
)
type AddressAreaProps = {
    address: string;
    changeAddress(v: string): void;
}
const AddressArea = ({ address, changeAddress }: AddressAreaProps) => (
    <section>
        <label for="address" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest my-3 block">Address</label>

        <TextArea
            name="address"
            id="address"
            required
            placeholder="Enter patient's address here..."
            className='h-14'
            value={address}
            onChange={(e) => changeAddress(e.currentTarget.value)}
        />
    </section>
)