import { cn } from "@/lib";
import type { InvoiceItem } from "@/types";

export interface PaymentButtonProps {
    label: string;
    Icon: React.FC<{ className?: string }>;
    selected: boolean;
    onSelect: () => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({ label, Icon, selected, onSelect }) => (
    <button
        onClick={onSelect}
        className={cn(
            "flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-150 cursor-pointer active:scale-[0.98]",
            selected
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
        )}
        type="button"
    >
        <Icon className="w-5 h-5 mb-1.5" />
        <span className="text-xs font-semibold">{label}</span>
    </button>
);

// Isolated so the table body stays a clean .map() — row rendering logic lives here.
export const LineItemRow: React.FC<{ item: InvoiceItem }> = ({ item }) => (
    <tr>
        <td className="py-2.5">
            <div className="font-semibold text-zinc-900 dark:text-white text-xs">{item.name}</div>
            <div className="text-[11px] text-zinc-500">{item.complaintName}</div>
        </td>
        <td className="py-2.5 text-right font-mono tabular-nums text-zinc-900 dark:text-white font-medium text-xs">
            ₹{item.cost}
        </td>
    </tr>
);
