import { Footprints, MapPin, Stethoscope } from "lucide-react";
import { ReferralButton, TextAreaWithRef } from "./primitives";
import { useEffect, useRef } from "react";
import type { FormData } from '../../types';

const REFERRAL_OPTIONS = [
    { id: 'WALKIN' as const, Icon: Footprints, label: 'Walk-In' },
    { id: 'GOOGLE' as const, Icon: MapPin, label: 'Google Maps' },
    { id: 'DOCTOR' as const, Icon: Stethoscope, label: 'Dr. Referral' }
] as const;

type ReferralId = FormData['referral'];
type ReferralSectionProps = {
    selectedReferral: ReferralId;
    changeReferral(val: ReferralId): void;
    doctorInfo: FormData['doctorInfo'];
    changeDoctorInfo(v: string): void;
};

const ReferralSection = ({ selectedReferral, changeReferral, doctorInfo, changeDoctorInfo }: ReferralSectionProps) => {
    const referralRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (selectedReferral === 'DOCTOR') {
            referralRef.current?.focus();
        }
    }, [selectedReferral]);

    return (
        <section>
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Referral Channel
            </label>
            <div className="flex gap-2.5">
                {REFERRAL_OPTIONS.map((ref) => (
                    <ReferralButton
                        key={ref.id}
                        type="button"
                        onClick={() => changeReferral(ref.id)}
                        isActive={selectedReferral === ref.id}
                    >
                        <div className="flex items-center justify-center gap-1.5 py-0.5">
                            <ref.Icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="hidden sm:inline">{ref.label}</span>
                        </div>
                    </ReferralButton>
                ))}
            </div>

            {selectedReferral === 'DOCTOR' && (
                <div className="mt-3">
                    <label htmlFor="referral_info" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Referring Physician Details
                    </label>
                    <TextAreaWithRef
                        ref={referralRef}
                        name="referral info"
                        id="referral_info"
                        value={doctorInfo}
                        onChange={(e) => changeDoctorInfo((e.target as HTMLTextAreaElement).value)}
                        required
                        placeholder="Enter doctor's name, specialization, hospital/clinic name, or contact number..."
                        className="h-16 text-xs"
                    />
                </div>
            )}
        </section>
    );
};

export default ReferralSection;
