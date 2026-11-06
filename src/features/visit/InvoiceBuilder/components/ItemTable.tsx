import { LineItemRow } from './primitives';
import type { InvoiceItem } from '@/types';

type ItemTableProps = {
    isEmpty: boolean;
    items: InvoiceItem[];
};

export const ItemTable = ({ isEmpty, items }: ItemTableProps) => (
    <div className="bg-muted/20 rounded-lg p-3.5 mb-5 border border-border/60">
        <table className="w-full text-xs text-left">
            {isEmpty && (
                <tbody>
                    <tr>
                        <td colSpan={2} className="py-4 text-center font-medium text-muted-foreground">
                            No items in this invoice.
                        </td>
                    </tr>
                </tbody>
            )}
            {!isEmpty && (
                <>
                    <thead className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                        <tr className="border-b border-border/40">
                            <th className="pb-2">Procedure</th>
                            <th className="pb-2 text-right">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 text-foreground">
                        {items.map(item => (
                            // Stable composite key — index keys break if items are reordered
                            <LineItemRow key={`${item.complaintId}-${item.procedureId}`} item={item} />
                        ))}
                    </tbody>
                </>
            )}
        </table>
    </div>
);

export default ItemTable;
