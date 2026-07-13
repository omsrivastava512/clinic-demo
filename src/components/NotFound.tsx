import { useNavigate } from "react-router-dom";
import { CircleQuestionMarkIcon, ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// DECISION: We decided to implement Option A (separate, decoupled NotFound and ServerError pages) as per user alignment.
// This reduces routing logic complexity compared to a unified error boundary hook, making debugging simpler for a solo dev.
// The NotFound component handles invalid routing states (404s) and is styled to match the dark/light clinic theme.
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            {/* Visual Icon container matching the card theme of the app */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
                <CircleQuestionMarkIcon className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
            </div>

            {/* Error header info */}
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                404
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 mt-2 sm:text-3xl">
                Page Not Found
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-md max-w-md mt-3 mb-8">
                The address you entered might be incorrect, or the page may have been moved. Let's get you back on track.
            </p>

            {/* Accessible interactive buttons for easy recovery */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Go Back
                </Button>
                <Button
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-2"
                >
                    <HomeIcon className="w-4 h-4" />
                    Back to Ledger
                </Button>
            </div>
        </div>
    );
};

export default NotFound;