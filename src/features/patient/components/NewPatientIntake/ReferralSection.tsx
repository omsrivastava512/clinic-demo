import { FootprintsIcon, MapPinIcon, StethoscopeIcon } from "lucide-react";
import { ReferralButton, TextAreaWithRef } from "./primitives";
import { useEffect, useRef } from "react";
import type { FormData } from ".";

const REFERRAL_OPTIONS = [
    { id: 'WALKIN' as const, icon: FootprintsIcon, label: 'Walk-In' },
    { id: 'GOOGLE' as const, icon: MapPinIcon, label: 'Google Maps' },
    { id: 'DOCTOR' as const, icon: StethoscopeIcon, label: 'Dr. Referral' }
] as const;

type ReferralId = FormData['referral'];
type ReferralSectionProps = {
    selectedReferral: ReferralId;
    changeReferral(val: ReferralId): void;
    doctorInfo: FormData['doctorInfo'];
    changeDoctorInfo(v: string): void;
}
const ReferralSection = ({ selectedReferral, changeReferral, doctorInfo, changeDoctorInfo }: ReferralSectionProps) => {

    const referralRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (selectedReferral === 'DOCTOR') {
            referralRef.current?.focus();
        }
    }, [selectedReferral])


    return (
        <section>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Referral Source</label>
            <div className={`flex gap-3`}>
                {(REFERRAL_OPTIONS).map((ref) => (
                    <ReferralButton
                        key={ref.id}
                        type="button"
                        onClick={() => changeReferral(ref.id)}
                        isActive={selectedReferral === ref.id}
                    >
                        <ref.icon className='inline' />
                        <span className={`hidden sm:block `}>{ref.label}</span>
                    </ReferralButton>
                ))}
            </div>
            {(selectedReferral === 'DOCTOR') &&
                <div>
                    <label htmlFor="referral_info" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest my-3 block">Doctor's Info</label>

                    <TextAreaWithRef
                        ref={referralRef}
                        name="referral info"
                        id="referral_info"
                        value={doctorInfo}
                        onChange={(e) => changeDoctorInfo((e.target as HTMLTextAreaElement).value)}
                        required
                        placeholder="Enter referring doctor's information like name, number, address, etc., here..."
                    />
                </div>}

        </section>
    )
}

export default ReferralSection