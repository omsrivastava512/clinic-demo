import type { MedicalComplaint, Procedure, InvoiceItem } from "@/types";

export type ItemRecord = Record<string, InvoiceItem>
export type ProcedureToggler = (ctxId: MedicalComplaint['id'], proc: Procedure) => void;
export type IsProcedureSelected = (ctxId: string, procId: string) => boolean;
export type GetItemsForComplaint = (s: string) => InvoiceItem[];