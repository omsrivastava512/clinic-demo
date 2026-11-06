import { useNavigate } from "react-router-dom";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// This component catches javascript code crashes and backend failures (500s) cleanly,
// providing a friendly fallback screen rather than a white screen of death,
// and offering a direct "Reload" action.
const ServerError = () => {
    const navigate = useNavigate();

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            {/* Visual Icon container with calm alert theme */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive mb-4">
                <AlertCircle className="w-6 h-6" />
            </div>

            {/* Error header info */}
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-destructive/10 text-destructive mb-2">
                SYSTEM ERROR 500
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Unexpected Application Error
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mt-2 mb-6 leading-relaxed">
                An unhandled runtime error occurred in this module. Reloading the view will reset local component state without affecting other clinic records.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <Button
                    onClick={handleReload}
                    variant="default"
                    className="flex items-center justify-center gap-1.5"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reload View
                </Button>
                <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="flex items-center justify-center gap-1.5"
                >
                    <Home className="w-4 h-4" />
                    Back to Ledger
                </Button>
            </div>

            <div className="mt-8 p-3.5 rounded-lg bg-card border border-border max-w-sm w-full flex items-start gap-2.5 text-left text-xs text-muted-foreground">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                    If this error persists, report it to the development team on&nbsp;
                    <a
                        href="https://github.com/omsrivastava512/clinic-demo/issues/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-medium underline underline-offset-2 hover:text-primary transition-colors"
                    >
                        GitHub Issues
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default ServerError;
