import { Banknote, CreditCard, Printer, Smartphone } from "lucide-react";
import type { InvoiceItem } from "@/types";
import { useState } from "preact/hooks";

/**
 * COMPONENT 4: INVOICE & PAYMENT
 * Indian context: Cash, Card, UPI.
 */
interface InvoiceBuilderProps {
    items: InvoiceItem[];
    patientName: string;
    onClose: () => void;
}

const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({ items, patientName, onClose }) => {
    const total = items.reduce((sum, i) => sum + i.cost, 0);
    const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI' | 'CARD'>('UPI');

    return (
        <div className="w-full max-w-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl mx-auto transition-colors duration-300">
            {/* Receipt Header */}
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start">
                <div>
                    <h2 className="text-zinc-900 dark:text-white font-bold text-lg">Invoice #INV-2024-88</h2>
                    <p className="text-zinc-500 text-xs mt-1">{patientName}</p>
                </div>
                <div className="text-right">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-widest">Amount Due</div>
                    <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-white">₹{total}</div>
                </div>
            </div>

            <div className="p-6">
                {/* Itemized List */}
                <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 mb-6 border border-zinc-200 dark:border-zinc-900">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase">
                            <tr>
                                <th className="pb-2">Procedure</th>
                                <th className="pb-2 text-right">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-900 text-zinc-700 dark:text-zinc-300">
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td className="py-2">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-[10px] text-zinc-500 dark:text-zinc-600">{item.contextName}</div>
                                    </td>
                                    <td className="py-2 text-right font-mono">₹{item.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Payment Methods (Indian Context) */}
                <div className="mb-8">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide block mb-3">Payment Mode (भुगतान का प्रकार)</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => setPaymentMode('UPI')}
                            className={`flex flex-col items-center justify-center p-3 rounded border transition-all 
                ${paymentMode === 'UPI'
                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                        >
                            <Smartphone className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium">UPI / QR</span>
                        </button>
                        <button
                            onClick={() => setPaymentMode('CASH')}
                            className={`flex flex-col items-center justify-center p-3 rounded border transition-all 
                ${paymentMode === 'CASH'
                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                        >
                            <Banknote className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium">Cash</span>
                        </button>
                        <button
                            onClick={() => setPaymentMode('CARD')}
                            className={`flex flex-col items-center justify-center p-3 rounded border transition-all 
                ${paymentMode === 'CARD'
                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                        >
                            <CreditCard className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium">Card</span>
                        </button>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm">
                        <Printer className="w-4 h-4" /> Print Receipt
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold rounded transition-colors shadow-md"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
};


export default InvoiceBuilder