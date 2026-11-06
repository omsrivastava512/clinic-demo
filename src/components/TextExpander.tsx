import { useState } from "react";
import { cn } from "@/lib/utils";

interface TextExpanderProps {
    children: string;
    visibleWords?: number;
    expandLabel?: string;
    collapseLabel?: string;
    className?: string;
    defaultOpen?: boolean;
    buttonClass?: string;
}

const TextExpander = ({
    children,
    visibleWords = 16,
    expandLabel = "Read more",
    collapseLabel = "Show less",
    buttonClass = "",
    className = "",
    defaultOpen = false
}: TextExpanderProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    const isExpandable = () => {
        if (!children) return false;
        const words = children.trim().split(/\s+/);
        return words.length > visibleWords;
    };

    const sliceWords = (text: string) => {
        if (!text) return "";
        const words = text.trim().split(/\s+/);
        if (words.length <= visibleWords) return text;
        return words.slice(0, visibleWords).join(" ") + "…";
    };

    const expandHandler = () => {
        setIsExpanded(!isExpanded);
    };

    const expandable = isExpandable();

    return (
        <div className={className}>
            <span>{isExpanded || !expandable ? children : sliceWords(children)}</span>
            {expandable && (
                <button
                    type="button"
                    onClick={expandHandler}
                    className={cn(
                        "ml-1.5 text-primary hover:underline font-medium cursor-pointer transition-colors focus:outline-none",
                        buttonClass
                    )}
                >
                    {isExpanded ? collapseLabel : expandLabel}
                </button>
            )}
        </div>
    );
};

export default TextExpander;
