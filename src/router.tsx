import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VisitWorkflow from "./pages/vistitworkflow";
import ErrorElement from "./components/NotFound";



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
                path: "*",
                element: <ErrorElement />   
            }
        ]
    }
]);
export default router