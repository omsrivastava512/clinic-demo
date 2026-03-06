import { BanknoteIcon, CreditCardIcon, SmartphoneIcon } from "lucide-react";
import { PaymentButton } from "./primitives";
import type { Dispatch } from "react";

export type PaymentMode = 'CASH' | 'UPI' | 'CARD';

// ─── Data ──────────────────────────────────────────────────────────────────────
const PAYMENT_METHODS: { mode: PaymentMode; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { mode: 'UPI', label: 'UPI / QR', Icon: SmartphoneIcon },
    { mode: 'CASH', label: 'Cash', Icon: BanknoteIcon },
    { mode: 'CARD', label: 'Card', Icon: CreditCardIcon },
];

type PaymentSelectorProps = {
    paymentMode: PaymentMode;
    setPaymentMode: Dispatch<React.SetStateAction<PaymentMode>>;
}

const PaymentSelector = ({ paymentMode, setPaymentMode }: PaymentSelectorProps) => {
    return (
        <div className="mb-8">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide block mb-3">
                Payment Mode (भुगतान का प्रकार)
            </label>
            <div className="grid grid-cols-3 gap-3">
                {PAYMENT_METHODS.map(({ mode, label, Icon }) => (
                    <PaymentButton
                        key={mode}
                        label={label}
                        Icon={Icon}
                        selected={paymentMode === mode}
                        onSelect={()=>setPaymentMode(mode)}
                    />
                ))}
            </div>
        </div>
    )
}

export default PaymentSelector