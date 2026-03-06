import { useState } from "react";
import type { InvoiceItem } from "@/types";
import FooterActions from "./components/FooterActions";
import InvoiceHeader from "./components/InvoiceHeader";
import ItemTable from "./components/ItemTable";
import type { PaymentMode } from "./components/PaymentSelector";
import PaymentSelector from "./components/PaymentSelector";

// ─── Types ─────────────────────────────────────────────────────────────────────


interface InvoiceBuilderProps {
    items: InvoiceItem[];
    patientName: string;
    invoiceNumber: string; // Caller owns ID generation — component shouldn't hardcode this
    onClose: () => void;
}


const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({ items, patientName, invoiceNumber, onClose }) => {
    const [paymentMode, setPaymentMode] = useState<PaymentMode>('UPI');

    const total = items.reduce((sum, i) => sum + i.cost, 0);
    const isEmpty = items.length === 0;

    return (
        <div className="w-full max-w-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl mx-auto transition-colors duration-300">

            {/* Header — invoice identity + amount at a glance */}
            <InvoiceHeader
                patientName={patientName}
                invoiceNumber={invoiceNumber}
                total={total}
            />

            <div className="p-6">

                {/* Itemised procedure list */}
                <ItemTable items={items} isEmpty={isEmpty}/>

                {/* Payment mode selector — Indian context: UPI is the dominant default */}
                <PaymentSelector paymentMode={paymentMode} setPaymentMode={setPaymentMode}/>

                {/* Actions */}
                <FooterActions onClose={onClose} isEmpty={isEmpty} />

            </div>
        </div >
    );
};

export default InvoiceBuilder;

