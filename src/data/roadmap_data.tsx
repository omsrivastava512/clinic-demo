import type { RoadmapStage } from "@/pages/roadmap";


// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

export const ROADMAP_STAGES: RoadmapStage[] = [
    {
        id: 'V0',
        label: 'Current foundation',
        title: 'Catalog demo / proof of concept',
        description: 'Component-first work with dummy data. Covers all frontend surfaces — including the full procedure/session intake flow — before any backend is wired in.',
        items: [
            'Build polished clinic components in isolation',
            'Use dummy data only',
            'Perfect visual design and interaction states',
            'Keep the demo layer modular and reusable',
            'Build patient registration and intake forms',
            'Build procedure / session intake flow UI',
            'Ensure intake UX is fast and low-friction',
        ],
    },
    {
        id: 'V1',
        label: 'Full-stack MVP',
        title: 'Front end meets backend',
        description: 'Turn the catalog into a working front-end module that talks to Supabase + PostgreSQL.',
        items: [
            'Wire components to real backend data',
            'Move from static/demo behavior to live data flow',
            'Use Supabase auth and database layers',
            'Stabilize the first MVP workflow',
        ],
    },
    {
        id: 'V2',
        label: 'Operational intake',
        title: 'Wire intake flow to backend',
        description: 'The intake UI is already built in V0. This stage connects it to live backend data from V1 — turning the static demo flow into a real operational entry point for day-to-day clinic work.',
        items: [
            'Connect intake forms to Supabase data layer',
            'Persist procedure / session records to the database',
            'Introduce React Query or SWR for server state management',
            'Handle loading, error, and refetch states across intake flows',
            'Validate and handle real submission states',
            'Stabilize the end-to-end intake workflow',
        ],
    },
    {
        id: 'V3',
        label: 'Scheduling layer',
        title: 'Appointment management',
        description: 'Add a module to see who is scheduled, where, and when. This helps the clinic manage time instead of only collecting intake.',
        items: [
            'Create appointment records',
            'Show patient schedule visibility',
            'Support time management for staff',
            'Link appointments to existing patient data',
        ],
    },
    {
        id: 'V4',
        label: 'Accountability layer',
        title: 'Audit and traceability',
        description: 'Audit becomes necessary once the system grows beyond a simple single-clinic flow.',
        items: [
            'Record who did what and when',
            'Support review of important changes',
            'Prepare for multi-user operations',
            'Keep the data history inspectable',
        ],
    },
    {
        id: 'V5',
        label: 'Platform phase',
        title: 'Multi-clinic / multi-tenant support',
        description: 'Move from one clinic workspace to a broader platform structure with clean boundaries between clinics, roles, and audit trails.',
        items: [
            'Separate data by clinic/workspace',
            'Support multiple tenants cleanly',
            'Enforce role and access boundaries',
            'Keep audit and scheduling consistent across tenants',
        ],
    },
];
