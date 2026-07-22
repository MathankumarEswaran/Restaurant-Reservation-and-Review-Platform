import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, hint, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border bg-surface-raised px-4 py-2.5 text-sm text-text placeholder:text-text-subtle outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
              icon && "pl-10",
              error ? "border-red-400" : "border-border-strong",
              className
            )}
            {...rest}
          />
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-text-subtle">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
