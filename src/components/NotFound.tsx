import { useNavigate } from "react-router-dom";
import { HelpCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// DECISION [TRIGGER: PRODUCT_SPEC] [ORIGIN: AI_PROPOSAL_APPROVED]:
// AI proposed Option A (separate, decoupled NotFound and ServerError pages) vs Option B (unified catch-all hook).
// User approved Option A: reduces routing complexity and isolates 404 client navigation states from 500 runtime crashes.
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            {/* Visual Icon container matching the clinical card theme */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 border border-border mb-4 text-muted-foreground">
                <HelpCircle className="w-6 h-6" />
            </div>

            {/* Error header info */}
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground mb-2">
                HTTP 404
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Page Not Found
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mt-2 mb-6 leading-relaxed">
                The requested URL does not match any clinical route or record. Use the actions below to navigate back.
            </p>

            {/* Accessible interactive buttons for easy recovery */}
            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="flex items-center justify-center gap-1.5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Screen
                </Button>
                <Button
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-1.5"
                >
                    <Home className="w-4 h-4" />
                    Daily Ledger
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
