import { Phone } from "lucide-react";
import { Input, ToggleButton } from "./primitives";
import { cn, formatPhone } from "@/lib";
import type { FormData } from '../../types';
import type { ChangeEvent } from "react";

const sexes = ['M', 'F', 'X'] as const;

const labelStyle = "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block";

type DemographicsSectionProps = Pick<FormData, 'age' | 'phone' | 'sex'> & {
    changePhone(v: FormData['phone']): void;
    changeAge(v: FormData['age']): void;
    changeSex(v: FormData['sex']): void;
};

const DemographicsSection = ({ phone, age, sex, changePhone, changeAge, changeSex }: DemographicsSectionProps) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Mobile Number */}
            <div className="col-span-1 sm:col-span-6">
                <label htmlFor="phone" className={labelStyle}>Mobile / WhatsApp</label>
                <div className="relative">
                    <Phone
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2",
                            "w-3.5 h-3.5 text-muted-foreground pointer-events-none"
                        )}
                    />
                    <Input
                        id="phone"
                        required
                        type="tel"
                        value={formatPhone(phone)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => changePhone(e.currentTarget.value)}
                        placeholder="98765 00000"
                        className="font-mono text-xs pl-9"
                    />
                </div>
            </div>

            {/* Age */}
            <div className="col-span-1 sm:col-span-3">
                <label className={labelStyle}>Age</label>
                <Input
                    type="number"
                    value={age}
                    required
                    pattern="[0-9]*"
                    maxLength={2}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeAge(e.currentTarget.value)}
                    placeholder="e.g. 34"
                    className="text-center font-mono text-xs"
                />
            </div>

            {/* Sex */}
            <div className="col-span-1 sm:col-span-3">
                <label className={labelStyle}>Gender</label>
                <div
                    className={cn(
                        "flex items-center gap-1",
                        "bg-muted/50 rounded-lg p-1",
                        "border border-border/80 text-center"
                    )}
                >
                    {sexes.map((s) => (
                        <ToggleButton
                            key={s}
                            type="button"
                            onClick={() => changeSex(s)}
                            isActive={sex === s}
                        >
                            {s}
                        </ToggleButton>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DemographicsSection;
