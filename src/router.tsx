import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VisitWorkflow from "./pages/vistitworkflow";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                index:true,
                element: <VisitWorkflow/>
            },
            {
                
            }
        ]

    }
])
export default router