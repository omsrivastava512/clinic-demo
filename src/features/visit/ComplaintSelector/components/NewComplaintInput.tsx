import { cn } from "@/lib";
import { PlusIcon } from "lucide-react";

interface NewComplaintInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

export const NewComplaintInput: React.FC<NewComplaintInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onAdd,
}) => (
  <label
    htmlFor="new_complaint"
    className={cn(
      "flex items-center p-4 rounded-lg border-2 border-dashed cursor-text",
      "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/30",
      "hover:border-zinc-600 dark:hover:border-zinc-400",
      "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
      "focus-within:border-zinc-600 dark:focus-within:border-zinc-400"
    )}
  >
    <PlusIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-4" />
    <input
      id="new_complaint"
      type="text"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={onKeyDown}
      placeholder="Report new issue (e.g. Knee Pain)..."
      className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium"
    />
    <button
      type="button"
      title="Add New Complaint"
      onClick={onAdd}
      disabled={!value.trim()}
      className={cn(
        "p-2 rounded bg-zinc-200 dark:bg-zinc-800",
        "hover:bg-zinc-300 dark:hover:bg-zinc-700",
        "text-zinc-600 dark:text-zinc-300 disabled:opacity-50"
      )}
    >
      <PlusIcon className="w-4 h-4" />
    </button>
  </label>
);