# Ledger Feature

The Ledger provides an "Excel-like" rapid-entry interface designed for streamlined daily clinic transaction tracking. Structured as a full-viewport layout, it maintains a persistent, scrollable ledger history rendered in chronological order. At its core is a complex, sticky `PatientSearch` overlay that acts as the primary data-entry gateway, offering real-time typeahead filtering, keyboard navigation, and seamless transitioning between selecting existing patients or registering new ones.

## Component Architecture

The feature is composed of a rigid outer shell housing a highly dynamic table body and an integrated search overlay.

### Root & Table Components
*   **`DailyLedger` (`index.tsx`)**: The root container enforcing the full-height `flex` layout and managing the composition of the ledger sections.
*   **`LedgerHeader` & `TableHeader`**: Static components rendering ledger metadata, summary controls, and column definitions.
*   **`TableBody` (`TableBody.tsx`)**: A complex scrollable container using `flex-col-reverse` to visualize entries from oldest to newest (top-to-bottom visually). It manages dynamic scroll boundaries, custom overscroll snap-back behaviors, and hosts the `PatientSearch` module docked at the bottom.
*   **`TableRow` (`TableRow.tsx`)**: Renders individual transaction entries.

### `PatientSearch` Sub-Feature
The `PatientSearch` is a self-contained module managing complex input state, typeahead filtering, and keyboard-driven navigation (`ArrowUp`/`ArrowDown`/`Enter`).

*   **`SearchInput` (`SearchInput.tsx`)**: A controlled search field that interprets raw input and provides dynamic, contextual hints (e.g., "Start typing", "Keep typing", "Press ↑↓") based on state and input length thresholds.
*   **`SearchSuggestions` (`SearchSuggestion/index.tsx`)**: The floating "drop-up" overlay. It conditionally mounts based on input heuristics and delegates rendering to list primitives.
    *   **`PatientResult` (`PatientResult.tsx`)**: Iterates over the `filteredPatients` array. Handles conditional rendering for empty states ("Keep Typing...", "No patients found") and smoothly scrolls the currently focused item into view via `scrollIntoView`.
    *   **`AddNewPatientButton` (`AddNewPatientButton.tsx`)**: Appended dynamically at the end of the suggestion list, providing a continuous UX flow for adding unrecognized patients.

### Component Tree

```mermaid
graph TD
    DL[DailyLedger <br/> <code>index.tsx</code>] --> LH[LedgerHeader]
    DL --> TH[TableHeader]
    DL --> TB[TableBody]
    
    TB --> TR[TableRow <br/> <i>(Multiple)</i>]
    TB --> PS[PatientSearch <br/> <code>PatientSearch/index.tsx</code>]
    
    PS --> SI[SearchInput]
    PS --> SS[SearchSuggestions]
    
    SS --> PR[PatientResult <br/> <i>(PatientList)</i>]
    SS --> ANP[AddNewPatientButton]
```

## State Management & Data Flow

### Ledger Data Source of Truth
Currently, the Ledger feature relies on static mock data (`MOCK_LEDGER_ENTRIES`) imported directly into `TableBody.tsx`. This ledger entries array acts as the immediate source of truth, being sorted dynamically by the `time` property on each render. The architecture is completely self-contained within the component tree, currently avoiding any global state (e.g., Redux, Zustand, or Context) overhead.

### Data Passing to Table Rows
Data flows deterministically downwards. `TableBody.tsx` maps over the sorted mock entries and renders `TableRow` components, passing each `LedgerEntry` object down via a strongly-typed `entry` prop (`<TableRow entry={entry} />`). The `TableRow` relies solely on this prop to populate its view and execute conditional click-routing behavior.

### PatientSearch Internal State
The `PatientSearch` component manages complex typeahead and overlay behaviors entirely through localized React state (`useState`):
- `input` **(string):** Tracks the user's sanitized query string.
- `filteredPatients` **(Patient[]):** Holds an array of search results derived from `MOCK_PATIENTS` whenever `input` meets length and pattern requirements.
- `showSuggestions` **(boolean):** Toggles the visibility of the suggestion drop-up overlay.
- `focusedIndex` **(number):** Orchestrates arrow-key keyboard navigation. An index of `-1` scopes focus to the search input, valid array indices target specific `filteredPatients` items, and `filteredPatients.length` targets the "Add New" fallback button at the bottom of the list.

### Surfacing Search Selections
Interactions are resolved via the `handleSelect(index)` function, which evaluates whether a user confirmed an existing patient or triggered a new patient creation. Currently, these selections resolve to simple browser alerts. The codebase marks a placeholder callback (`onPatientIdentified()`) intended to surface these selection events back up the component hierarchy or to an external orchestrator in the future.

## Key Architectural Decisions

*   **Centralized Layout Configuration (`ledgerRow.styles.tsx`)**: Column widths and grid definitions for the Ledger are abstracted into a shared dictionary (`ledgerRowLayout`). This ensures identical structural alignment between the `TableHeader` and `TableRow` components without duplicating responsive grid classes.
*   **Col-Reverse Data Virtualization**: `TableBody` uses a `flex-col-reverse` DOM structure. This naturally renders chronological data (sorted oldest-to-newest) top-to-bottom while keeping the visual baseline attached to the input area, handling list growth without layout shifting.
*   **Encapsulated Search Module**: `PatientSearch` is cleanly separated from the table layout. It acts as a standalone domain containing its own input state, dropdown primitives (`DropdownContainer`, `DropdownHeader`, `ListItemButton`), and key event handlers, exposing a clean interface back to the ledger view.
*   **Data Attribute-Driven UI States**: Keyboard navigation focus states are styled using `group-data-[selected=true]` on the parent `ListItemButton` primitive. This cascades seamlessly to text and SVG child elements, avoiding complex state-drilling just to change an icon's color on focus.

## Edge Cases & Nuances

*   **Overscroll Snapback & Anti-Jumping**: Instead of using viewport-level `scrollIntoView()` on initial mount (which can cause jarring window jumps), `TableBody` sets `scrollTop = 0` inside the container. A debounced 200ms scroll listener detects overscroll past the `END_OF_LIST_HEIGHT` and automatically snaps the viewport back to the resting bottom, keeping the bottom marker cleanly hidden behind the search bar.
*   **Input Sanitization & React Render Skipping**: The `PatientSearch` input intercepts raw text and passes it through `cleanSearchInput()`. Because React bails out of renders if a state update receives the exact same sanitized string (e.g., when the user types invalid characters), a `resetAll()` function is used to clear the `filteredPatients` array. This forces a re-render and ensures the input element remains visually synced with the sanitized state.
*   **Dynamic Keyboard Routing & Focus Management**: Key navigation (`ArrowUp` / `ArrowDown`) inside the search drop-up adds `+1` to the `filteredPatients.length` to account for the sticky "Add New Patient" button at the bottom. It loops cleanly between the input box (index `-1`) and the list boundaries.
*   **Focus Auto-Scrolling (`block: "nearest"`)**: To ensure keyboard-focused items don't disappear beyond the overflow bounds of the drop-up, `PatientListItem` wraps itself in a `useEffect` that triggers `scrollIntoView({ behavior: "smooth", block: "nearest" })` whenever its `isSelected` prop becomes true.
*   **Progressive Multi-stage Triggers**: The dropdown manages empty states natively by evaluating input length: it provides immediate feedback overlays when 1-2 characters are typed ("Keep Typing....") but only executes the search filtering against `MOCK_PATIENTS` when the `isMinInputLength` (3 chars) threshold is crossed.
