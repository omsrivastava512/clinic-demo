import { LineItemRow } from './primitives';
import type { InvoiceItem } from '@/types';

type ItemTableProps = {
    isEmpty: boolean;
    items: InvoiceItem[];
}

export const ItemTable = ({ isEmpty, items }: ItemTableProps) => (<div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 mb-6 border border-zinc-200 dark:border-zinc-900">
    <table className="w-full text-sm text-left">
        {
            isEmpty && <div className="font-medium text-zinc-500 dark:text-zinc-600">No items here.</div>
        }
        {!isEmpty &&
            <>
                <thead className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase">
                    <tr>
                        <th className="pb-2">Procedure</th>
                        <th className="pb-2 text-right">Cost</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-900 text-zinc-700 dark:text-zinc-300">

                    {items.map(item => (
                        // Stable composite key — index keys break if items are reordered
                        <LineItemRow key={`${item.complaintId}-${item.procedureId}`} item={item} />
                    ))}
                </tbody>
            </>
        }
    </table>
</div>)

export default ItemTable