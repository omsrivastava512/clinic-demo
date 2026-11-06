import { rupee } from "@/lib";

type InvoiceHeaderProps = {
    patientName: string;
    invoiceNumber: string;
    total: number;
    clinicName?: string;
    clinicCode?: string;
    doctorName?: string;
};

export const InvoiceHeader = ({ patientName, invoiceNumber, total }: InvoiceHeaderProps) => (
    <div className="bg-zinc-50 dark:bg-zinc-900/60 p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start">
        <div>
            <h2 className="text-zinc-900 dark:text-white font-bold text-lg tracking-tight font-mono">{invoiceNumber}</h2>
            <p className="text-zinc-500 text-xs mt-1 font-medium">{patientName}</p>
        </div>
        <div className="text-right">
            <div className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Amount Due</div>
            <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-white tabular-nums tracking-tight mt-0.5">
                {rupee.format(total)}
            </div>
        </div>
    </div>
);

export default InvoiceHeader;
