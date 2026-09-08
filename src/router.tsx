import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VisitWorkflow from "./pages/vistitworkflow";
import NotFound from "./components/NotFound";
import ServerError from "./components/ServerError";
import { RoadmapPanel, type StageId } from "./pages/roadmap";
import PatientProfilePage from "./features/patient/PatientProfile";
import Dashboard from "./pages/dashboard";

const STAGE_PROGRESS: Partial<Record<StageId, number>> = {
    V0: 5, // first 4 items done in the current stage
};

// DECISION [TRIGGER: PRODUCT_SPEC] [ORIGIN: USER_DIRECTIVE]:
// User directed keeping errorElement: <ServerError /> at child route level rather than only root route.
// Rationale: If a specific child tab crashes, the layout shell (App) remains intact and interactive, preventing total app lock-out.
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,            // layout route
        errorElement: <ServerError />, // Catch-all for layout-level crashes
        children: [
            {
                index: true,
                element: <VisitWorkflow />,
                errorElement: <ServerError />
            },
            {
                path: "roadmap",
                element: <RoadmapPanel currentStage="V0" stageProgress={STAGE_PROGRESS} />,
                errorElement: <ServerError />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                errorElement: <ServerError />
            },
            {
                path: "patient/:id",
                element: <PatientProfilePage />,
                errorElement: <ServerError />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);
export default router


