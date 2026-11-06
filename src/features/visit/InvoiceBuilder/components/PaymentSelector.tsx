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
};

const PaymentSelector = ({ paymentMode, setPaymentMode }: PaymentSelectorProps) => {
    return (
        <div className="mb-6">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2.5">
                Payment Mode (भुगतान का प्रकार)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
                {PAYMENT_METHODS.map(({ mode, label, Icon }) => (
                    <PaymentButton
                        key={mode}
                        label={label}
                        Icon={Icon}
                        selected={paymentMode === mode}
                        onSelect={() => setPaymentMode(mode)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PaymentSelector;
