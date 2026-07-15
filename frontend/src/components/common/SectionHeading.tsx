import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, align = "left", action }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", align === "center" && "sm:flex-col sm:items-center sm:text-center")}>
      <div className={cn(align === "center" && "mx-auto max-w-xl")}>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
        <h2 className="text-2xl font-bold text-secondary sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-slate-500">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
