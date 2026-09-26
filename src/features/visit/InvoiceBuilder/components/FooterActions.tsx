import { cn } from "@/lib";
import { PrinterIcon } from "lucide-react";
import { useState } from "react";
import type { PaymentMode } from "./PaymentSelector";
import type { InvoicePaymentPayload } from "../index";
import { validateInvoicePayment } from "../validation";

interface FooterActionsProps {
    onClose: () => void;
    isEmpty: boolean;
    paymentMode?: PaymentMode;
    onConfirm?: (payload: InvoicePaymentPayload) => void;
}

export const FooterActions = ({ onClose, isEmpty, paymentMode, onConfirm }: FooterActionsProps) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleConfirm = () => {
        if (!paymentMode) return;
        
        // On "Confirm Payment" click: paymentStatus should default to 'Paid'
        const payload = { paymentMode, paymentStatus: 'Paid' };
        
        const validation = validateInvoicePayment(payload);
        if (!validation.success && validation.fieldErrors) {
            setErrors(validation.fieldErrors);
            return;
        }
        
        setErrors({});
        if (onConfirm) {
            onConfirm(payload as InvoicePaymentPayload);
        } else {
            // Fallback for backwards compatibility
            onClose();
        }
    };

    return (
        <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {Object.keys(errors).length > 0 && (
                <div className="text-red-500 text-xs font-medium px-1 text-right">
                    {Object.values(errors)[0]}
                </div>
            )}
            <div className="flex justify-between items-center">
                <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm transition-colors"
                    onClick={() => alert("Yet to be implemented")}
                >
                    <PrinterIcon className="w-4 h-4" /> Print Receipt
                </button>
                <button
                    onClick={handleConfirm}
                    type="button"
                    disabled={isEmpty}
                    className={cn(
                        "px-6 py-2",
                        "bg-emerald-600 hover:bg-emerald-700",
                        "dark:bg-emerald-700 dark:hover:bg-emerald-600",
                        "disabled:bg-zinc-200 disabled:dark:bg-zinc-800",
                        "disabled:text-zinc-400 disabled:dark:text-zinc-600",
                        "disabled:shadow-none disabled:cursor-not-allowed",
                        "hover:disabled:bg-zinc-200 dark:hover:disabled:bg-zinc-800",
                        "hover:disabled:bg-emerald-200 dark:hover:disabled:bg-emerald-900/40",
                        "text-white font-bold rounded transition-colors shadow-md"
                    )}
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    );
};

export default FooterActions;