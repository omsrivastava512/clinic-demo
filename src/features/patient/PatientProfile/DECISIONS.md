# PatientProfile — Architectural Decision Records

> Colocated ADR file. Each record was migrated from a verbose inline `DECISION:` comment
> (or reconstructed from commit messages where no inline comment existed).
> Source files now carry a `// Ref: ADR-PP-XX` back-reference in place of the verbose block.
>
> Scope: `src/features/patient/PatientProfile/`, `src/lib/patientUtils.ts`,
>         `src/types/index.tsx`, `src/components/common/status-badge.tsx`,
>         `src/pages/dashboard.tsx`
>
> Branch: `feat/implement-dashboard-and-patient-profile` (PR #65)
> Commits: d8aea2b → dd8dffd → 6fc5b9b → 1f87fa9 → ed50929

---

## Group 1 — Data & Type Architecture

### [ADR-PP-01] Patient type uses an intersection with a discriminated union

**File:** `src/types/index.tsx`

**Context / Problem**
`referralDoctorInfo` must only be present and required when `referralMode` is `'DOCTOR'`.
The `NewPatientIntake` form already enforces this via a discriminated union in `FormData`.
The original `Patient` interface modelled `referralDoctorInfo?: string | never`, which is a
type no-op — `string | never` collapses to `string`, so the field was always optional and the
constraint was never enforced at compile-time.

**Decision**
Changed `Patient` from an `interface` to an intersection type using a discriminated union:
```ts
type Patient = { /* base fields */ } & (
  | { referralMode: 'WALKIN' | 'GOOGLE'; referralDoctorInfo?: never }
  | { referralMode: 'DOCTOR'; referralDoctorInfo: string }
);
```
This natively mirrors the `FormData` schema from `NewPatientIntake` and enforces the
constraint at compile-time: TypeScript will error if you try to set `referralDoctorInfo`
without `referralMode: 'DOCTOR'`, or omit it when the mode is `'DOCTOR'`.

**Trade-offs / Assumptions**
- Discriminated union types require all consumers to handle both branches explicitly.
  Currently there are few consumers, so the migration cost was low.
- `interface` was dropped — `type` is used instead (see ADR-PP-02).

---

### [ADR-PP-02] PatientProfile declared as a `type` alias, not an `interface`

**File:** `src/types/index.tsx`

**Context / Problem**
TypeScript does not allow an `interface` to extend a discriminated union or an intersection
type that contains a union. Since `Patient` became an intersection type (ADR-PP-01),
`interface PatientProfile extends Patient` is a TypeScript compile error.

**Decision**
Declared `PatientProfile` as a type alias:
```ts
type PatientProfile = Patient & { bloodType: string; ... };
```

**Trade-offs / Assumptions**
- Type aliases behave identically to interfaces for structural typing. No functional change.
- If `Patient` is ever reverted to an interface, `PatientProfile` should be reverted too.

---

### [ADR-PP-03] Visit model: one row per complaint per session

**File:** `src/types/index.tsx`, `src/data/mock_data.tsx`

**Context / Problem**
A patient can be treated for multiple complaints in a single clinic day (e.g., Ankle Sprain
+ Cervical Spondylosis). The data model needed to handle same-day, multi-complaint visits
without conflating them into a single row that would mix procedures and billing.

**Decision**
One `Visit` row per complaint per session. Same day + two complaints = two separate rows,
each with their own `complaint`, `complaintId` FK, `services[]`, and `grandTotal`.
`complaintId` is a FK → `ComplaintCourse.id`, linking each session to its treatment arc.

**Trade-offs / Assumptions**
- More rows than a flat "one row per day" model, but correctly models independent billing
  and procedure tracking per complaint.
- Filtering visits for the Visits tab by `complaintId` is therefore a natural first-class
  operation, not a workaround.

---

### [ADR-PP-04] Billing aggregates (`isCharged`, `chargedAmount`, `grandTotal`) stored on the Visit model

**File:** `src/types/index.tsx`

**Context / Problem**
`isCharged`/`chargedAmount` on `VisitService` and `consultationFee`/`servicesTotal`/
`grandTotal` on `Visit` are all derivable from business rules
(`shouldChargeService`, `calculateConsultationFee`). Storing them denormalises the model.

**Decision**
Kept them stored on the mock data layer for the demo phase so the display layer can be a
pure read. Billing utility functions (`shouldChargeService`, `calculateServiceCharge`,
`calculateConsultationFee`) were added to `patientUtils.ts` and marked `@experimental` to
document the intended future direction, but are not yet wired up.

**Trade-offs / Assumptions (DEBT)**
- This is an acknowledged debt (`DEBT` comments remain in `types/index.tsx`).
- When a real backend is added, these fields should be derived at read time using the
  utility functions, not stored. The `@experimental` functions exist to make this migration
  easier and to document the business rules.

---

### [ADR-PP-05] `VisitRecord` legacy type retained for backward compatibility

**File:** `src/types/index.tsx`

**Context / Problem**
The initial implementation used a `VisitRecord` type (`visitType: 'CONSULT' | 'MACHINE_ONLY'`,
flat `therapies: string[]`, `amount: number`). The richer `Visit` model (with `VisitService[]`,
billing breakdown, `complaintId`) replaced it, but other parts of the codebase (e.g., the
visit workflow) still reference `VisitRecord`.

**Decision**
Kept `VisitRecord` with a `// REMOVE:` annotation. The PatientProfile feature uses `Visit`
(`MOCK_VISITS_V2`) exclusively. Dashboard was also migrated to `MOCK_VISITS_V2`.

**Trade-offs / Assumptions**
- Leaving dead types increases noise. The `// REMOVE:` annotation signals intent without
  causing a breaking change mid-PR.
- Full removal requires migrating the visit workflow feature — out of scope for PR #65.

---

### [ADR-PP-06] `ComplaintCourse.lastDate` — renamed from `endDate`

**File:** `src/types/index.tsx`, `src/data/mock_data.tsx`, `tabs/ClinicalTimeline.tsx`

**Context / Problem**
`endDate` implied the complaint had ended. Active complaints are still ongoing; calling their
most recent session date `endDate` was semantically incorrect and confusing.

**Decision**
Renamed `endDate` → `lastDate` across the interface, mock data, and rendering template.
For active complaints, `lastDate` represents the date of the most recent session ("last
known date"), not a termination date.

**Trade-offs / Assumptions**
- Breaking rename across the feature, but contained to three files. Applied atomically in
  commit `ed50929`.

---

## Group 2 — Async State & Fetch Strategy

### [ADR-PP-07] `FetchResult` discriminated union — "not found" is a valid outcome, not an exception

**File:** `PatientProfile/index.tsx`

**Context / Problem**
The original `fetchPatientProfile` rejected the promise for not-found, forcing the consumer
to distinguish 404 from genuine errors via `catch`. This muddled two orthogonal concerns:
"the patient doesn't exist" vs. "the network failed".

**Decision**
`fetchPatientProfile` always resolves (never rejects) with a typed `FetchResult`:
```ts
type FetchResult =
  | { kind: 'ok'; data: PatientProfile }
  | { kind: 'not-found' }
  | { kind: 'error'; message: string };
```
The consumer switches on `result.kind` — each branch is explicit and exhaustive.

**Trade-offs / Assumptions**
- "not found" is modelled as a business outcome, not as an error. This is intentional:
  a missing patient is not a network or server error and should not trigger the error UI.
- The `.catch()` path on the `Promise` is effectively never reached in the mock; real
  implementations should still handle it (e.g., network timeout, JSON parse failure).

---

### [ADR-PP-08] `AbortController` is optional in `loadProfile` to support the Retry button

**File:** `PatientProfile/index.tsx`

**Context / Problem**
`loadProfile` is called by two paths: (a) `useEffect`, which creates an `AbortController`
to cancel in-flight requests on unmount, and (b) the Retry button's `onClick`, which is a
bare `MouseEvent` invocation with no controller. Giving `loadProfile` a required controller
parameter would force the Retry button to create and manage one, leaking lifecycle concerns
into a click handler.

**Decision**
Made `controller?: AbortController` optional. `loadProfile` checks
`controller?.signal.aborted` before updating state, so both call sites are safe.

**Trade-offs / Assumptions**
- When called from the Retry button without a controller, there is no cancellation guard.
  If the user clicks Retry and immediately navigates away, a stale `.then()` could fire.
  Accepted as a low-probability edge case for the demo phase.
- The `useEffect` path always passes a controller, which is the primary lifecycle path.

---

### [ADR-PP-09] Deferred `useEffect` cleanup — React Query / SWR adoption planned

**File:** `PatientProfile/index.tsx`

**Context / Problem**
A race condition exists: if `id` changes rapidly (user clicks back/forward), the old fetch's
`.then()` can resolve after the new one, setting stale data. The correct fix is either an
`AbortController` cleanup in the `useEffect` return or a cancelled-flag pattern.

**Decision**
Implemented `AbortController` via `useEffect` cleanup (`controller.abort()` on unmount).
However, full race-condition hardening (checking `controller.signal.aborted` inside every
async branch) was deferred. Rationale: Supabase + React Query / SWR is planned for the
next phase. Those libraries handle component lifecycle and race condition cleanup natively,
so building comprehensive bespoke boilerplate now would be redundant and thrown away.

**Trade-offs / Assumptions**
- Accepted risk: the 100ms mock delay makes the race condition effectively invisible.
- When real API integration happens, replace the manual `AbortController` pattern with
  React Query's `queryFn` + `signal` pattern, which is idiomatic for Supabase.

---

### [ADR-PP-10] `handleBack` uses `window.history.state.idx` to detect fresh-tab entry

**File:** `PatientProfile/index.tsx`

**Context / Problem**
`navigate(-1)` from React Router will attempt to go back in the browser history stack.
If the user arrived at `/patient/:id` from a bookmark, a shared link, or by opening a new
tab, `window.history.length` is 1 and `navigate(-1)` does nothing or leaves the app.

**Decision**
```ts
const handleBack = useCallback(() => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate('/ledger');
  }
}, [navigate]);
```
`window.history.state.idx` is the internal React Router history index. If it is 0 or
undefined, the user has no prior history within the app, so we fall back to `/ledger`.

**Trade-offs / Assumptions**
- `window.history.state.idx` is a React Router implementation detail, not a web standard.
  It works with `createBrowserRouter` but may break if the router implementation changes.
- `/ledger` was chosen as the fallback destination (not `/dashboard`) because the Ledger
  is the app's primary operational view.

---

### [ADR-PP-11] 20% random error simulation in `fetchPatientProfile`

**File:** `PatientProfile/index.tsx`

**Context / Problem**
The mock data layer always succeeds, making it impossible to test the error UI state
(`ProfileError`, Retry button, error message display) without intentional code injection.

**Decision**
Injected a 20% random failure rate into `fetchPatientProfile`:
```ts
if (Math.random() < 0.2) {
  resolve({ kind: 'error', message: 'Simulated network error. Please try again.' });
  return;
}
```

**Trade-offs / Assumptions**
- This should be removed or guarded by `import.meta.env.DEV` before production.
  It is currently always active in both dev and any deployed demo.
- 20% was chosen as high enough to be reliably triggered during manual testing, but low
  enough not to constantly interrupt normal usage.

---

### [ADR-PP-12] UI guard states extracted to standalone components

**File:** `PatientProfile/index.tsx`, `ProfileLoading.tsx`, `ProfileError.tsx`, `ProfileNotFound.tsx`

**Context / Problem**
The original `PatientProfilePage` contained 50+ lines of inline JSX for the loading, error,
and not-found guard states before the main layout. This buried the actual page layout below
three screens of guard code, making the component hard to scan.

**Decision**
Extracted each guard state into a standalone, focused presentational component:
- `ProfileLoading` — spinner + message
- `ProfileError` — error message + Retry + Back buttons
- `ProfileNotFound` — not-found copy + Back button

The main component body becomes three 1-line early-return guards followed immediately by
the real layout.

**Trade-offs / Assumptions**
- Extracted components are feature-local (not in `src/components/`), because their content
  is specific to the patient profile context. If a generic `<ErrorScreen>` is needed
  app-wide, it should be promoted to `src/components/common/`.

---

## Group 3 — URL State Management

### [ADR-PP-13] Centralized URL state hook replaces inline `useSearchParams` across 3 components

**File:** `hooks/usePatientProfileUrlState.ts`

**Context / Problem**
Tab selection, visit type filter, and complaint filter were all managed via inline
`useSearchParams` calls spread across `ClinicalHistoryPanel`, `VisitsTab`, and
`ClinicalTimeline`. Each component parsed and wrote the same params in isolation, with no
shared validation logic. The original `ClinicalHistoryPanel` also wiped visit filters when
navigating away from the visits tab — silently destroying user context.

**Decision**
Extracted `usePatientProfileUrlState` as the single source of truth for all URL params in
the patient profile route. It owns parsing, type guards, all setters, and the `goToVisits`
cross-tab navigation helper.

**Trade-offs / Assumptions**
- Every component that calls this hook subscribes to all URL param changes, even ones they
  don't use. This means a visit-filter change causes `ClinicalHistoryPanel` (which only
  needs `tab`) to re-render. At current scale this is negligible. If the tab count grows
  or re-renders become visible, split into `useTabState` / `useVisitFilters`.

---

### [ADR-PP-14] URL parameter values validated with type guards, not type assertions

**File:** `hooks/usePatientProfileUrlState.ts`

**Context / Problem**
URL parameters are user-controlled strings. A URL like `/patient/123?tab=hack` must not
cause a type error or pass a bad value into a typed switch. The naive approach is to cast:
`searchParams.get('tab') as TabValue` — which is unsafe and lies to the type system.

**Decision**
Type guard functions validate URL strings at runtime before assignment:
```ts
function isValidTab(value: string | null): value is TabValue {
  return value === 'overview' || value === 'visits' || ...;
}
const tab: TabValue = isValidTab(rawTab) ? rawTab : 'overview';
```
Invalid or missing params silently fall back to safe defaults.

**Trade-offs / Assumptions**
- Fall-back to default is silent (no console warning, no error). This is correct for URL
  parameters — typos in the URL should degrade gracefully.

---

### [ADR-PP-15] Filter state is preserved when switching tabs (no auto-clear)

**File:** `hooks/usePatientProfileUrlState.ts`

**Context / Problem**
The original `ClinicalHistoryPanel` automatically cleared `?type=` and `?complaint=` when
navigating away from the visits tab. This meant: user sets a filter, clicks Overview, clicks
back to Visits — filters gone. That's destructive of user intent.

**Decision**
Removed the auto-clear behaviour from `setTab`. Filters persist in the URL as the user
navigates between tabs. An explicit `clearVisitFilters()` function is available for the
"Clear filters" button in `VisitsTab`.

**Trade-offs / Assumptions**
- Users who navigate away from Visits and return will find their filters intact, which is
  generally the expected behaviour for URL-synced filter state.
- The `goToVisits({ complaintId })` helper in `ClinicalTimeline` *does* explicitly set or
  clear filters on navigation — this is intentional (clicking a complaint on the timeline
  should always show that complaint's visits, not merge with whatever filter was set before).

---

### [ADR-PP-16] All URL param setters use `{ replace: true }`

**File:** `hooks/usePatientProfileUrlState.ts`

**Context / Problem**
Toggling filters (visit type, complaint) should not pollute the browser history stack.
A user toggling filters 10 times should not have to press Back 10 times to leave the page.

**Decision**
All setters (`setTab`, `setVisitType`, `setComplaintId`, `clearVisitFilters`, `goToVisits`)
use `{ replace: true }` — they mutate the current history entry rather than pushing a new one.

**Trade-offs / Assumptions**
- **Known regression:** `setTab` also uses `replace: true`, which means tab changes do not
  create a history entry. Pressing Back after switching tabs exits the patient profile
  instead of returning to the previous tab. This differs from the original implementation
  (which used `replace: false` for tab changes). Accepted trade-off for simplicity of the
  single hook; revisit if UX testing surfaces this as a complaint.

---

## Group 4 — Component Architecture

### [ADR-PP-17] `StatusBadge` extracted as a shared design-system component with semantic variants

**File:** `src/components/common/status-badge.tsx`

**Context / Problem**
Badge styling for alerts, visit statuses, package statuses, and payment statuses was
duplicated across 6 files via per-file `alertClass()` / `statusClass` switch functions and
ad-hoc inline classes. Adding a new alert type or adjusting a color required changes in
multiple files, with no single source of truth.

**Decision**
Extracted `StatusBadge` with 12 semantic variants (`allergy`, `fall-risk`, `dnr`, `other`,
`active`, `completed`, `expired`, `consult`, `machine-only`, `paid`, `pending`, `overdue`).
Each variant maps to a full light + dark Tailwind class pair. All per-file switch functions
and inline badge classes were removed, replaced with `<StatusBadge variant="...">`.

**Trade-offs / Assumptions**
- `StatusBadge` lives in `src/components/common/` (shared across features), not inside the
  PatientProfile feature folder, because `dashboard.tsx` also uses it.
- The variant list is intentionally exhaustive for the current domain. New domains (e.g.,
  appointment status) should add variants here rather than creating parallel badge components.

---

### [ADR-PP-18] `ClinicalHistoryPanel` is a pure presentational component — data filtered by parent

**File:** `ClinicalHistoryPanel.tsx`, `PatientProfile/index.tsx`

**Context / Problem**
The original `ClinicalHistoryPanel` imported `MOCK_*` arrays directly and ran `.filter()`
calls inside the component body. This meant the panel had two responsibilities: data
acquisition and presentation. It also meant ClinicalHistoryPanel would need to be refactored
again when switching from mocks to a real API.

**Decision**
All `MOCK_*` imports and `.filter()` calls moved to `PatientProfilePage` (the route container),
memoized with `useMemo([id])`. `ClinicalHistoryPanel` receives `vitals`, `visits`, `courses`,
`purchases`, `invoices` as typed props — it is a pure presentation layer.

**Trade-offs / Assumptions**
- The parent now acts as both the async loader and the data adapter, which concentrates
  responsibility in `index.tsx`. When a real API is integrated, the data-fetching logic
  should be extracted to a custom hook (e.g., `usePatientData`) rather than remaining
  inline in the page component.

---

### [ADR-PP-19] Alert list keys use composite natural key `${type}-${label}`, not array index

**File:** `PassportPanel.tsx`

**Context / Problem**
`patient.alerts.map((alert, i) => <StatusBadge key={i} ...>)` — array-index keys cause
React to incorrectly reuse DOM nodes when the alert list is reordered or items are inserted.
Although alerts are currently static (mock data), this pattern would cause visible bugs if
alerts become editable or dynamically sorted.

**Decision**
Replaced `key={i}` with `key={\`${alert.type}-${alert.label}\`}`. The combination of
`type` (e.g., `'ALLERGY'`) and `label` (e.g., `'Penicillin Allergy'`) is unique within a
single patient's alert list.

**Trade-offs / Assumptions**
- Assumes no patient can have two alerts of the same type with the same label. This is
  semantically reasonable: duplicate alert labels would be a data error, not a valid state.

---

## Group 5 — Performance

### [ADR-PP-20] Dashboard visit / invoice counts use HashMap pre-indexing instead of per-card filtering

**File:** `src/pages/dashboard.tsx`

**Context / Problem**
For each patient card in the dashboard grid, the original code ran:
```ts
const visits = MOCK_VISITS_V2.filter(v => v.patientId === patient.id);
const invoices = MOCK_INVOICES.filter(i => i.patientId === patient.id);
const outstanding = invoices.filter(i => i.paymentStatus === 'Pending' || ...);
```
With 22 patients, this is O(P × (V + I)) — three full linear scans per card, inside the
render function, on every render.

**Decision**
Pre-compute two lookup maps via `useMemo` before the patient card render loop:
```ts
const visitsCountLookup: Record<string, number>         // patientId → count
const unpaidInvoicesCountLookup: Record<string, number>  // patientId → count
```
Each is built in a single O(V) / O(I) pass. Lookup per card is O(1).

**Trade-offs / Assumptions**
- Single-pass mutation of a plain object (`lookup[pId] = (lookup[pId] || 0) + 1`) was
  chosen over `Map` for JSON-friendly serialisation and slightly lower GC overhead.
  Both are O(1) per insertion; the difference is immaterial at this scale.
- Pattern follows the guidelines in `.workboard/sketchbook.md`.

---

### [ADR-PP-21] Dashboard stats wrapped in `useMemo`

**File:** `src/pages/dashboard.tsx`

**Context / Problem**
An earlier iteration computed stats at module scope (outside the component), which was
migration-hostile. They were moved inside the component without `useMemo` on the grounds
that the computation was "trivial". However, even trivial `filter + reduce` chains allocate
new arrays on every render, and the stats depend only on static mock data (no reactive deps).

**Decision**
Re-introduced `useMemo([], [])` wrapping the stats array after senior review flagged the
redundant allocations. With an empty dependency array, the computation runs once.

**Trade-offs / Assumptions**
- When the data source changes from mock to a reactive store / API, the dependency array
  must be updated to include the data source ref.

---

### [ADR-PP-22] `PatientCard` extracted as a standalone component receiving primitive props

**File:** `src/pages/dashboard.tsx`, `src/pages/PatientCard.tsx`

**Context / Problem**
The 50-line patient card JSX block was inlined inside `Dashboard`'s `.map()`. Extracting it
allows `React.memo` to skip re-renders for unchanged cards. For this to work, all inputs
must be primitives (or stable references) — no inline object creation inside the map.

**Decision**
Extracted `PatientCard` as a separate component. `Dashboard` passes `visitsCount: number`
and `unpaidInvoicesCount: number` (O(1) lookups from the pre-indexed maps) rather than
raw arrays. Primitive props are always referentially stable, so `React.memo` can work
correctly.

**Trade-offs / Assumptions**
- `React.memo` is not yet applied to `PatientCard` — the extraction enables it without
  mandating it. Apply when there is a measurable re-render problem to justify the overhead.

---

## Group 6 — Utilities

### [ADR-PP-23] Billing utility functions added as `@experimental` — no consumers yet

**File:** `src/lib/patientUtils.ts`

**Context / Problem**
The billing rules (`STANDARD` services free in `CONSULTATION`, `PREMIUM` always charged,
`FIRST` consult ₹300, `SUBSEQUENT` ₹200, `MACHINE_ONLY` ₹0) needed to be documented
somewhere before the billing UI was built, to avoid re-deriving them from scratch later.
Putting them directly into the type file or a comment block would not allow testing.

**Decision**
Added three pure, tested utility functions:
- `shouldChargeService(category, visitType): boolean`
- `calculateServiceCharge(price, category, visitType): number`
- `calculateConsultationFee(visitType, consultationType?): number`

Marked `@experimental` with a clear JSDoc warning that they have no consumers and the
pricing assumptions (`FIRST = ₹300, SUBSEQUENT = ₹200`) should be validated before wiring.
17 tests were added covering all branches and 4 end-to-end billing scenarios.

**Trade-offs / Assumptions**
- The tests act as executable documentation of the billing rules, independent of the UI.
- Pricing constants are hardcoded (not configurable). When the billing UI is built, consider
  moving prices to a configuration object or database table.

---

### [ADR-PP-24] `filterTimelineByCategory` simplified to `Array.prototype.filter`

**File:** `src/lib/patientUtils.ts`

**Context / Problem**
The original implementation used a manual `for` loop to build a new array. This is
functionally identical to `Array.prototype.filter` but noisier and non-idiomatic for
small list sizes.

**Decision**
Replaced with `return timeline.filter(event => event.category === category);`.

**Trade-offs / Assumptions**
- No functional change. The refactor was purely cosmetic / stylistic alignment.
- Note: `filterTimelineByCategory` currently has no consumers in the PatientProfile feature
  (the Timeline was migrated to render `ComplaintCourse[]` instead of `TimelineEvent[]`).
  It should be removed or marked `@deprecated` when the `PatientProfile.timeline` field is
  cleaned up. See ADR-PP-04 (stored vs derived fields).
