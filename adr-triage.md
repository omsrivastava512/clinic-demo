# ADR Triage

## Triage Table

| ID & Title | Tier (Criteria Met) | Status (Evidence) | Drift | Cross-layer |
| --- | --- | --- | --- | --- |
| **[BE-MOD1-02]** Flat role checks on `profiles.role` instead of a `role_permissions` matrix table | Tier 1 (Spans >1 module, Alternative rejected) | Shipped (`profiles.role` L143-144) | Permissive `v1_allow_all` policies are active; flat checks are drafted in comments | Yes |
| **[BE-MOD1-03]** Cross-chain multi-tenant security gap & `businesses` table deferred | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Deferred (single-admin `owner_id` used L89/L246; documented L1105) | None for omission; DB triggers added to harden single-chain model | No |
| **[BE-MOD1-04]** Immutable registration `clinician_id` (derive active clinician via `DISTINCT ON`) | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Shipped (`patients.clinician_id` L274, `visits.clinician_id` L661) | None | Yes |
| **[BE-MOD1-05]** Multi-clinician support per complaint course natively supported via schema | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Shipped (`visits.complaint_course_id` L639 + `visits.clinician_id` L661) | None | Yes |
| **[ADR-PP-03]** Visit model: one row per complaint per session | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Shipped (`src/types/index.tsx`) | None | Yes |
| **[ADR-PP-04]** Billing aggregates stored on the Visit model | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Shipped (`src/types/index.tsx`) | None | Yes |
| **[ADR-PP-05]** `VisitRecord` legacy type retained for backward compatibility | Tier 1 (Spans >1 module, Alternative rejected) | Shipped (`src/types/index.tsx`) | None | No |
| **[ADR-PP-06]** `ComplaintCourse.lastDate` — renamed from `endDate` | Tier 1 (Spans >1 module, Alternative rejected) | Shipped (`src/types/index.tsx`) | None | Yes |
| **[ADR-PP-13]** Centralized URL state hook replaces inline `useSearchParams` | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Shipped (`hooks/usePatientProfileUrlState.ts`) | None | No |
| **[ADR-PP-17]** `StatusBadge` extracted as a shared design-system component | Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected) | Shipped (`src/components/common/status-badge.tsx`) | None | No |
| **[BE-MOD1-01]** `insurer_name` retained as nullable column | Tier 2 (Alternative rejected) | Shipped (`patients.insurer_name` L271) | None | Yes |
| **[ADR-PP-01]** Patient type uses an intersection with a discriminated union | Tier 2 (Alternative rejected) | Shipped (`src/types/index.tsx`) | None | No |
| **[ADR-PP-02]** PatientProfile declared as a `type` alias, not an `interface` | Tier 2 (Alternative rejected) | Shipped (`src/types/index.tsx`) | None | No |
| **[ADR-PP-07]** `FetchResult` discriminated union — "not found" is a valid outcome | Tier 2 (Alternative rejected) | Shipped (`PatientProfile/index.tsx`) | None | No |
| **[ADR-PP-08]** `AbortController` is optional in `loadProfile` | Tier 2 (Alternative rejected) | Shipped (`PatientProfile/index.tsx`) | None | No |
| **[ADR-PP-09]** Deferred `useEffect` cleanup — React Query / SWR adoption planned | Tier 2 (Alternative rejected) | Shipped (`PatientProfile/index.tsx`) | None | No |
| **[ADR-PP-10]** `handleBack` uses `window.history.state.idx` to detect fresh-tab entry | Tier 2 (Alternative rejected) | Shipped (`PatientProfile/index.tsx`) | None | No |
| **[ADR-PP-11]** 20% random error simulation in `fetchPatientProfile` | Tier 2 (Alternative rejected) | Shipped (`PatientProfile/index.tsx`) | None | No |
| **[ADR-PP-12]** UI guard states extracted to standalone components | Tier 2 (Alternative rejected) | Shipped (`PatientProfile/index.tsx`) | None | No |
| **[ADR-PP-14]** URL parameter values validated with type guards, not type assertions | Tier 2 (Alternative rejected) | Shipped (`hooks/usePatientProfileUrlState.ts`) | None | No |
| **[ADR-PP-15]** Filter state is preserved when switching tabs (no auto-clear) | Tier 2 (Alternative rejected) | Shipped (`hooks/usePatientProfileUrlState.ts`) | None | No |
| **[ADR-PP-16]** All URL param setters use `{ replace: true }` | Tier 2 (Alternative rejected) | Shipped (`hooks/usePatientProfileUrlState.ts`) | None | No |
| **[ADR-PP-18]** `ClinicalHistoryPanel` is a pure presentational component | Tier 2 (Alternative rejected) | Shipped (`ClinicalHistoryPanel.tsx`) | None | No |
| **[ADR-PP-19]** Alert list keys use composite natural key | Tier 2 (Alternative rejected) | Shipped (`PassportPanel.tsx`) | None | No |
| **[ADR-PP-20]** Dashboard visit / invoice counts use HashMap pre-indexing | Tier 2 (Alternative rejected) | Shipped (`src/pages/dashboard.tsx`) | None | No |
| **[ADR-PP-21]** Dashboard stats wrapped in `useMemo` | Tier 2 (Alternative rejected) | Shipped (`src/pages/dashboard.tsx`) | None | No |
| **[ADR-PP-22]** `PatientCard` extracted as a standalone component | Tier 2 (Alternative rejected) | Shipped (`src/pages/dashboard.tsx`) | None | No |
| **[ADR-PP-23]** Billing utility functions added as `@experimental` | Tier 2 (Alternative rejected) | Shipped (`src/lib/patientUtils.ts`) | None | Yes |
| **[ADR-PP-24]** `filterTimelineByCategory` simplified to `Array.prototype.filter` | Tier 2 (Alternative rejected) | Shipped (`src/lib/patientUtils.ts`) | None | No |

---

## Shared Problems (Backend Specialty Module)

### Root Cause: Specialty Module Not Implemented in SQL Schema
The following ADRs from `specialty-decision-log.md` share a common problem: they are all **Deferred** because the entire Specialty and Invoicing module (e.g. `treatment_events`, `invoice_line_items`, `sessions`) is absent from the active `supabase_migration.md`. All are Tier 1 (Hard to reverse, Spans >1 module, Alternative rejected).

- **[BE-SPEC-01]** Package-exclusion mechanism
- **[BE-SPEC-02]** Specialty-treatment table design + session architecture
- **[BE-SPEC-03]** Specialty events requiring a linked complaint
- **[BE-SPEC-04]** Junction table vs. array column for treatment event links
- **[BE-SPEC-05]** Invoice granularity under session-based invoicing
- **[BE-SPEC-08]** Invoice boundary decoupled from session boundary
- **[BE-SPEC-09]** Build sequencing for the four proposals touching `visits`
- **[BE-SPEC-10]** Shallow-patient / service-seeker archetype
- **[BE-SPEC-11]** Recording body part without a complaint course
- **[BE-SPEC-13]** Ghost-invoice prevention mechanism
- **[BE-SPEC-14]** `invoice_line_items` should not store `complaint_course_id` directly
- **[BE-SPEC-15]** Session boundary revised to submission-batch
- **[BE-SPEC-16]** Package purchases and retail products as `invoice_line_items` sources *(Drift: `invoices.patient_id` remains strict `NOT NULL`)*
- **[BE-SPEC-17]** Pay Later / payment status lifecycle *(Drift: `daily_ledger` hardcodes 'Complete', `invoices` lacks `paid_at`)*
- **[BE-SPEC-18]** Split / hybrid payment modes *(Drift: SQL only has single `payment_mode` column)*
- **[BE-SPEC-19]** `treatment_event_links` XOR confirmed, not relaxed
- **[BE-SPEC-20]** Shallow-patient intake gap: `patients` auto-provision trigger *(Drift: access only provisioned on `complaint_courses` insert)*
- **[BE-SPEC-21]** Jointly-linked specialty revenue reporting convention
- **[BE-SPEC-22]** Specialty-treatment frontend UX: modal button (Approach D)
- **[BE-SPEC-23]** Double-billing prevention on `invoice_line_items` *(Drift: 'Void' status missing)*
- **[BE-SPEC-24]** `treatment_events` override pattern mirroring `visits`
- **[BE-SPEC-25]** Nullable-column sprawl on `invoice_line_items` vs. polymorphic FK
- **[BE-SPEC-26]** Session write-timing: coordinated writes vs. progressive
- **[BE-SPEC-27]** Visit vs. `treatment_events` boundary routing rule
- **[BE-SPEC-28]** Session/invoice creation timing & Pending-by-default *(Drift: `invoices.payment_status` defaults to 'Paid')*

### Root Cause: Superseded by Later Decisions
The following frontend workflow ADRs from the specialty log were actively superseded by later entries before development started.
- **[BE-SPEC-06]** Specialty-treatment frontend workflow *(Superseded by BE-SPEC-12 and BE-SPEC-22)*
- **[BE-SPEC-07]** Session boundary leaning day-level *(Superseded by BE-SPEC-15 batch model)*
- **[BE-SPEC-12]** Specialty-treatment frontend UX: inline chip-expansion *(Superseded by BE-SPEC-22 modal button)*

---

## Notable Deferrals

The following ADRs are notable because the decision to defer a feature or optimal implementation highlights strategic trade-offs during the MVP phase:

- **[BE-MOD1-03]**: Explicitly defers building a robust multi-tenant `businesses` table in favor of a single-admin `owner_id` assumption, knowingly accepting limitations if multiple admins per chain are needed later.
- **[ADR-PP-04]**: Intentionally accumulates technical debt by storing billing aggregates in the mock layer instead of deriving them, deferring the correct read-time computation until the backend is integrated.
- **[ADR-PP-09]**: Defers robust `useEffect` race-condition handling by anticipating that future adoption of React Query/SWR with Supabase will natively solve the issue.
- **[ADR-PP-22]**: Extracts `PatientCard` to enable `React.memo`, but intentionally defers actually applying memoization until there is a measurable performance bottleneck.
- **[ADR-PP-23]**: Documents and tests core billing business rules via `@experimental` utility functions, deferring their actual wiring until the billing UI is built.
- **The entire Specialty & Invoicing Module (BE-SPEC-01 to BE-SPEC-28)**: The entire architectural blueprint for multi-complaint billing and specialty treatments is thoroughly designed in ADRs but completely deferred from the active schema to prioritize shipping the core MVP.

## Proposed Send List

*This is a curated list of up to 10 Tier 1 ADRs that are critical for your defense in interviews, prioritized by impact and cross-layer implications.*

1. **[BE-MOD1-05] Multi-clinician support natively supported via schema** (Shipped, Cross-layer)
   *Reason:* Confirms a fundamental schema capability that natively handles multi-complaint, multi-provider daily workflows.
2. **[BE-MOD1-04] Immutable registration `clinician_id` vs treating clinician** (Shipped, Cross-layer)
   *Reason:* Establishes the core distinction between historical attribution and current clinical reality using `DISTINCT ON`.
3. **[ADR-PP-03] Visit model: one row per complaint per session** (Shipped, Cross-layer)
   *Reason:* Fundamentally shapes the multi-complaint data schema and billing architecture.
4. **[BE-MOD1-02] Flat role checks instead of `role_permissions` matrix** (Shipped, Cross-layer)
   *Reason:* Validates the MVP authorization design, deferring a complex RBAC matrix for immediate shipping speed.
5. **[ADR-PP-04] Billing aggregates stored on the Visit model** (Shipped, Cross-layer)
   *Reason:* Highlights a conscious trade-off to accumulate debt for speed, impacting API payload definitions.
6. **[ADR-PP-06] `ComplaintCourse.lastDate` — renamed from `endDate`** (Shipped, Cross-layer)
   *Reason:* Demonstrates domain-driven design clarity where "last date" correctly models an active clinical course.
7. **[BE-MOD1-03] Cross-chain security gap & `businesses` table deferred** (Deferred, highly architectural)
   *Reason:* Demonstrates awareness of a critical multi-tenant isolation gap while pragmatically deferring it.
8. **[ADR-PP-13] Centralized URL state hook replaces inline `useSearchParams`** (Shipped)
   *Reason:* Showcases a strong frontend architectural pattern for managing complex, synchronized UI state.
9. **[ADR-PP-17] `StatusBadge` extracted as a shared design-system component** (Shipped)
   *Reason:* Illustrates proactive refactoring for maintainability and establishing a unified design language early.
10. **[ADR-PP-05] `VisitRecord` legacy type retained for backward compatibility** (Shipped)
   *Reason:* A practical example of managing migration scope and preserving backward compatibility in an evolving codebase.
