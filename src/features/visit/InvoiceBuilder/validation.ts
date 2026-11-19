import { z } from 'zod';
import { DB_PAYMENT_MODE_MVP, DB_PAYMENT_STATUS } from '@/lib/validation/db-enums';

// payment_mode has NO CHECK constraint in schema.sql.
// These values come from clinics.payment_methods_accepted default array ['CASH', 'UPI', 'CARD'].
// We hardcode the default set as a pragmatic MVP choice.
export const invoicePaymentSchema = z.object({
    paymentMode: z.enum(DB_PAYMENT_MODE_MVP),
    paymentStatus: z.enum(DB_PAYMENT_STATUS),
});

export function validateInvoicePayment(data: { paymentMode: string; paymentStatus: string }) {
    const result = invoicePaymentSchema.safeParse(data);
    if (result.success) {
        return { success: true };
    }
    const fieldErrors: Record<string, string> = {};
    const errors = result.error.flatten().fieldErrors;
    if (errors.paymentMode?.length) {
        fieldErrors.paymentMode = errors.paymentMode[0];
    }
    if (errors.paymentStatus?.length) {
        fieldErrors.paymentStatus = errors.paymentStatus[0];
    }
    return { success: false, fieldErrors };
}
