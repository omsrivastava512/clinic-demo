import { cn } from "@/utils"
import { UserIcon, XIcon } from "lucide-react"

const FormHeader = ({ onClose }: { onClose(): void }) => {
    return (
        <div className={cn(
            "px-6 py-4 bg-zinc-50 dark:bg-zinc-950",    // layout
            "border-b border-zinc-200 dark:border-zinc-900",    // border
            "flex justify-between items-start "   // flex
        )}>
            <div>
                <h2 className={cn(
                    "text-lg font-bold text-zinc-900 dark:text-white",  // text
                    "flex items-center gap-2"   // flex
                )}>
                    <UserIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    New Patient Registration
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Create digital ID & generate MRN</p>
            </div>
            <button title={'Close'} type={'button'} onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white">
                <XIcon className="w-6 h-6" />
            </button>
        </div>
    )
}

export default FormHeader