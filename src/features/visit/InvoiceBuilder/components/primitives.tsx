import { cn } from "@/lib";
import type { InvoiceItem } from "@/types";


export interface PaymentButtonProps {
    label: string;
    Icon: React.FC<{ className?: string }>;
    selected: boolean;
    onSelect: () => void;
}
export const PaymentButton: React.FC<PaymentButtonProps> = ({  label, Icon, selected, onSelect }) => (
    <button
        onClick={onSelect}
        className={cn(
            "flex flex-col items-center justify-center p-3 rounded border transition-all",
            selected
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
        )}
        type="button"
    >
        <Icon className="w-5 h-5 mb-2" />
        <span className="text-xs font-medium">{label}</span>
    </button>
);

// Isolated so the table body stays a clean .map() — row rendering logic lives here.
export const LineItemRow: React.FC<{item:InvoiceItem}> = ({ item }) => (
    <tr>
        <td className="py-2">
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-600">{item.complaintName}</div>
        </td>
        <td className="py-2 text-right font-mono">₹{item.cost}</td>
    </tr>
);

