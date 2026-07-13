import { useNavigate } from "react-router-dom";
import { AlertCircleIcon, RotateCwIcon, HomeIcon } from "lucide-react";
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
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            {/* Visual Icon container with alert theme */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 mb-6">
                <AlertCircleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            {/* Error header info */}
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                500
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 mt-2 sm:text-3xl">
                Unexpected Error
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-md max-w-md mt-3 mb-8">
                Something went wrong on our end. Please try reloading the page, or return to the main dashboard.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                    onClick={handleReload}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                >
                    <RotateCwIcon className="w-4 h-4" />
                    Reload Page
                </Button>
                <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                >
                    <HomeIcon className="w-4 h-4" />
                    Back to Ledger
                </Button>
            </div>
            <div className="mt-8 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 max-w-sm w-full flex items-start gap-3 text-left">
                <AlertCircleIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs leading-normal text-zinc-600 dark:text-zinc-400">
                    If this error is repeatedly reproducible, please&nbsp;
                    <a
                        href="https://github.com/omsrivastava512/clinic-demo/issues/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-zinc-900 dark:text-white underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                        create an issue on GitHub
                    </a>
                    &nbsp;with the specific steps that caused it, or report directly to the developer.
                </p>
            </div>
        </div>
    );
};

export default ServerError;
