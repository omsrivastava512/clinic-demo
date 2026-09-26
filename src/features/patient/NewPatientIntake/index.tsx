import { useState, useReducer } from 'react';
import ClinicalNotesBuilder from '../ClinicalNotesBuilder';
import { type ClinicalNote } from '../types';
import { capitalizeEachWord, deepTrimStrings, filterAge, filterAlphabetsAndSpaces, filterPhoneNumber, normalizeAddress } from '@/lib';
import { Input, IntakeLayout, TextArea, } from './components/primitives';
import FormHeader from './components/FormHeader';
import ReferralSection from './components/ReferralSection';
import DemographicsSection from './components/DemographicsSection';
import FormFooter from './components/FormFooter';
import type { FormData } from '../types';
import { validatePatientIntake } from './validation';
import { FieldError } from '@/components/FieldError';

const validateAndCapitalizeName = (val: string) => capitalizeEachWord(filterAlphabetsAndSpaces(val))



interface IntakeProps {
    initialName?: string;
    onClose: () => void;
    onSubmit: (v: FormData) => void;

}

type Action =
    | { type: 'CHANGE_NAME'; value: string }
    | { type: 'CHANGE_PHONE'; value: string }
    | { type: 'CHANGE_AGE'; value: FormData['age'] }
    | { type: 'CHANGE_SEX'; value: FormData['sex'] }
    | { type: 'CHANGE_ADDRESS'; value: FormData['address'] }
    | { type: 'CHANGE_REFERRAL'; value: FormData['referral'] }
    | { type: 'CHANGE_DOCTOR_INFO'; value: string }
    | { type: 'ADD_CLINICAL_NOTES'; value: ClinicalNote[] }
    | { type: 'RESET' };

const formReducer = (state: FormData, action: Action): FormData => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state, name: validateAndCapitalizeName(action.value)
            };
        case 'CHANGE_AGE':
            return {
                ...state, age: filterAge(action.value)
            }
        case 'CHANGE_PHONE':
            return {
                ...state, phone: filterPhoneNumber(action.value)
            }
        case 'CHANGE_SEX':
            return {
                ...state, sex: action.value
            }
        case 'CHANGE_ADDRESS':
            return {
                ...state, address: normalizeAddress(action.value)
            }
        case 'CHANGE_REFERRAL': {
            if (action.value === 'DOCTOR') {
                return {
                    ...state,
                    referral: action.value,
                    doctorInfo: ''
                }
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        case 'ADD_CLINICAL_NOTES': return {
            ...state, clinicalNotes: action.value
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

export const NewPatientIntake: React.FC<IntakeProps> = ({ initialName = '', onClose, onSubmit }) => {

    const initializeName = (f: FormData) => ({ ...f, name: validateAndCapitalizeName(initialName) })

    const [formData, dispatch] = useReducer(formReducer, initialFormData, initializeName);

    const [showClinicalNotes, setShowClinicalNotes] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const handleCancel = ()=>{
        dispatch({ type: 'RESET' })
        setFieldErrors({})
        onClose()
    }
    


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = validatePatientIntake(formData);
        if (!result.success) {
            setFieldErrors(result.fieldErrors!);
            return;
        }

        const trimmedForm = deepTrimStrings(formData) as FormData
        alert(`Creating Profile for: ${trimmedForm.name}\nMobile: ${trimmedForm.phone}\nGender: ${trimmedForm.sex}\nAddress: ${trimmedForm.address}`);
        dispatch({ type: 'RESET' })
        setFieldErrors({})
        onSubmit(trimmedForm);
    };

    return (
        <IntakeLayout>
            {/* Header */}
            <FormHeader onClose={onClose} />

            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex flex-col gap-6 bg-white dark:bg-black transition-colors">

                {/* ROW 1: NAME */}
                <NameInput
                    patientName={formData.name}
                    changeName={(value) => {
                        setFieldErrors(prev => ({ ...prev, name: '' }));
                        dispatch({ type: 'CHANGE_NAME', value });
                    }}
                    error={fieldErrors.name}
                />

                {/* ROW 2: VITAL DEMOGRAPHICS  */}
                <DemographicsSection
                    age={formData.age}
                    phone={formData.phone}
                    sex={formData.sex}
                    changeAge={(value) => {
                        setFieldErrors(prev => ({ ...prev, age: '' }));
                        dispatch({ type: 'CHANGE_AGE', value });
                    }}
                    changePhone={(value) => {
                        setFieldErrors(prev => ({ ...prev, phone: '' }));
                        dispatch({ type: 'CHANGE_PHONE', value });
                    }}
                    changeSex={(value) => {
                        setFieldErrors(prev => ({ ...prev, sex: '' }));
                        dispatch({ type: 'CHANGE_SEX', value });
                    }}
                    errors={{ age: fieldErrors.age, phone: fieldErrors.phone, sex: fieldErrors.sex }}
                />

                <AddressArea
                    address={formData.address}
                    changeAddress={(value) => {
                        setFieldErrors(prev => ({ ...prev, address: '' }));
                        dispatch({ type: 'CHANGE_ADDRESS', value });
                    }}
                    error={fieldErrors.address}
                />

                {/* ROW 3: REFERRAL */}
                <ReferralSection
                    doctorInfo={formData.doctorInfo}
                    selectedReferral={formData.referral}
                    changeReferral={(value: FormData['referral']) => {
                        setFieldErrors(prev => ({ ...prev, referral: '' }));
                        dispatch({ type: 'CHANGE_REFERRAL', value });
                    }}
                    changeDoctorInfo={(value) => {
                        setFieldErrors(prev => ({ ...prev, doctorInfo: '' }));
                        dispatch({ type: "CHANGE_DOCTOR_INFO", value });
                    }}
                    errors={{ referral: fieldErrors.referral, doctorInfo: fieldErrors.doctorInfo }}
                />

                {/* FOOTER ACTIONS */}
                <FormFooter onClose={handleCancel} openClinicNotes={() => setShowClinicalNotes(true)} />

            </form>

            {/** HACK: Do not change the `formData.clinicalNotes` while ClinicalNotesBuilder is mounted. */}
            {showClinicalNotes && <ClinicalNotesBuilder
                initialNotes={formData.clinicalNotes}
                onSave={(value) => {
                    dispatch({ type: 'ADD_CLINICAL_NOTES', value })
                    setShowClinicalNotes(false)
                }}
                onClose={() => setShowClinicalNotes(false)}
            />}

        </IntakeLayout>

    );

};


export default NewPatientIntake;


type NameInputProps = {
    patientName: FormData['name'],
    changeName(v: FormData['name']): void,
    error?: string
}
const NameInput = ({ patientName, changeName, error }: NameInputProps) => (
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
        <FieldError message={error} />
    </div>
)
type AddressAreaProps = {
    address: string;
    changeAddress(v: string): void;
    error?: string;
}
const AddressArea = ({ address, changeAddress, error }: AddressAreaProps) => (
    <section>
        <label htmlFor="address" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest my-3 block">Address</label>

        <TextArea
            name="address"
            id="address"
            required
            placeholder="Enter patient's address here..."
            className='h-14'
            value={address}
            onChange={(e) => changeAddress(e.currentTarget.value)}
        />
        <FieldError message={error} />
    </section>
)



