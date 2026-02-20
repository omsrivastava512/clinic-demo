import { SmartphoneIcon } from "lucide-react"
import { Input, ToggleButton } from "./primitives"
import { cn, formatPhone } from "@/lib"
import type { FormData } from '../../types'
import type { ChangeEvent } from "react"

const sexes = ['M', 'F', 'X'] as const

const labelStyle = "text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block"

type DemographicsSectionProps = Pick<FormData, 'age' | 'phone' | 'sex'> & {
    changePhone(v: FormData['phone']): void;
    changeAge(v: FormData['age']): void;
    changeSex(v: FormData['sex']): void;
}
const DemographicsSection = ({ phone, age, sex, changePhone, changeAge, changeSex }: DemographicsSectionProps) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-12 gap-4">

            {/* Mobile Number */}
            <div className="col-span-1 sm:col-span-6">
                <label htmlFor="phone" className={labelStyle}>Mobile / WhatsApp</label>
                <div className="relative">
                    <SmartphoneIcon
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2", // positioning
                            "w-4 h-4", // sizing
                            "text-zinc-400 dark:text-zinc-500" // color
                        )}
                    />
                    <Input
                        id="phone"
                        required
                        type="tel"
                        value={formatPhone(phone)}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => changePhone(e.currentTarget.value)}
                        placeholder="98765 00000"
                        className='font-mono pl-10'
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
                    onChange={(e:ChangeEvent<HTMLInputElement>) => changeAge(e.currentTarget.value)}
                    placeholder="00"
                    className="text-center"
                />
            </div>

            {/* sex */}
            <div className="col-span-1 sm:col-span-3">
                <label className={labelStyle}>sex</label>
                <div
                    className={cn(
                        "flex justify-center items-center", // layout
                        "bg-zinc-100 dark:bg-zinc-900", // background
                        "rounded-lg", // shape
                        "p-1", // spacing
                        "border border-zinc-200 dark:border-zinc-800 text-center" // border
                    )}
                >
                    {(sexes).map((s) => (
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
        </section >
    )
}

export default DemographicsSection