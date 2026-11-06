import { XIcon } from "lucide-react";

const FormHeader = ({ onClose }: { onClose(): void }) => (
    <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
        <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">New Patient Registration</h2>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Capture basic details to issue an OPD slip</p>
        </div>
        <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
            <XIcon className="w-5 h-5" />
        </button>
    </div>
);

export default FormHeader;
