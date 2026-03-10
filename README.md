# Clinic App Component Catalogue

This repository is not the final clinic application.

It is a component catalogue and interaction prototype for a clinic management system.  
The goal is to validate each UI module individually before those components are integrated into a full backend-connected product.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://relax-clinic-demo.vercel.app/ )

## What this project is

This is a frontend-first catalogue of clinic workflows.

Instead of presenting a fake “finished” application, this project exposes isolated, interactive components backed by mock data. That makes it possible to review layout, workflow, usability, and edge cases early, before backend integration makes change expensive.

The catalogue is designed for:

- Client feedback on individual components
- UX validation before system integration
- Iterative refinement of workflows
- Reuse of finalized UI modules in the final application


## Why this exists

Most demos fail because they are either:

- static mockups with no interaction, or
- tightly integrated prototypes that are too rigid to change

This catalogue is built to avoid both problems.

Each component is made usable on its own, so a client can actually interact with it and respond to the experience rather than guessing from screenshots or incomplete wireframes.

The workflow is:

### Design → Validate → Refine → Integrate

## What is included

The catalogue currently focuses on clinic workflows built around:

- Patient intake and patient-related forms
- Clinical notes and complaint handling
- Procedure logging
- Invoice and payment UI
- Ledger / record-style views
- Shared utility components and layout wrappers

The project is organized so each module can be reviewed independently instead of being hidden inside a larger unfinished system.

## Current implementation approach

The components are built with mock data and local UI state.

That means:

- the UI behaves like a real product,
- the data is not yet coming from a backend,
- the components are intentionally not wired into the final clinic application,
- and feedback can be collected component by component.

This is deliberate, not a missing feature.

## Repository structure

The codebase is organized as a modular React app with separate areas for:

- shared components
- mock data
- feature modules
- page-level workflow containers
- types and reusable UI primitives

That structure keeps the catalogue editable and prevents the components from becoming a tangled demo shell.

## Tech stack

- React
- TypeScript
- Vite
- shadcn/ui
- Tailwind CSS
- React Router

## Status

This repository is a catalogue stage, not the production clinic system.

Not yet integrated:

- backend APIs
- persistent storage
- authentication
- real patient records
- live database workflows

Those belong to the next phase, after the component layer is finalized.

## Philosophy

The point of this project is simple:

do not force integration before the product surface is understood.

A clinic system is not just a database problem. It is a workflow problem, a usability problem, and a layout problem. This catalogue makes those problems visible early, while the cost of change is still low.

## Next phase

Once the catalogue is finalized, the approved components will be connected into a full application with:

- API integration
- real data models
- state persistence
- data-fetching logic
- end-to-end clinic workflows

At that point, this repository becomes the foundation of the final system.
