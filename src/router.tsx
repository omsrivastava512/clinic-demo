import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VisitWorkflow from "./pages/vistitworkflow";
import ErrorElement from "./components/NotFound";
import { RoadmapPanel, type StageId } from "./pages/roadmap";
import PatientProfilePage from "./features/patient/PatientProfile";
import Dashboard from "./pages/dashboard";

const STAGE_PROGRESS: Partial<Record<StageId, number>> = {
    V0: 5, // first 4 items done in the current stage
};


// import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,            // layout route
        children: [
            {
                index: true,
                // path:"workflow",
                element: <VisitWorkflow />,
                errorElement: <ErrorElement />
            },
            {
                path: "roadmap",
                element: <RoadmapPanel currentStage="V0" stageProgress={STAGE_PROGRESS} />,
                errorElement: <ErrorElement />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                errorElement: <ErrorElement />
            },
            {
                path: "patient/:id",
                element: <PatientProfilePage />,
                errorElement: <ErrorElement />
            },
            {
                path: "*",
                element: <ErrorElement />
            }
        ]
    }
]);
export default router


