// These constants mirror the CHECK constraints in schema.sql (v11).
// If a constraint changes in the DB, update the single source of truth here.
export const DB_GENDER = ['M', 'F', 'X'] as const;
export const DB_REFERRAL_MODE = ['WALKIN', 'GOOGLE', 'DOCTOR'] as const;
export const DB_VISIT_TYPE = ['CONSULTATION', 'MACHINE_ONLY'] as const;
export const DB_CONSULTATION_TYPE = ['FIRST', 'SUBSEQUENT'] as const;
// payment_status uses Title case per schema CHECK constraint
export const DB_PAYMENT_STATUS = ['Paid', 'Pending', 'Overdue'] as const;
// payment_mode has NO CHECK constraint in schema.sql.
// These values come from clinics.payment_methods_accepted default.
// Hardcoded here as pragmatic MVP — real implementation should fetch per-clinic config.
export const DB_PAYMENT_MODE_MVP = ['CASH', 'UPI', 'CARD'] as const;
