import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 4, ...rest }, ref) => {
    const textareaId = id ?? rest.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-xl border bg-surface-raised px-4 py-2.5 text-sm text-text placeholder:text-text-subtle outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
            error ? "border-red-400" : "border-border-strong",
            className
          )}
          {...rest}
        />
        {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
