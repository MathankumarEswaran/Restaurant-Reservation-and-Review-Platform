import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Tone = "primary" | "accent" | "secondary" | "neutral" | "danger";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent-dark",
  secondary: "bg-secondary/10 text-secondary",
  neutral: "bg-slate-100 text-slate-600",
  danger: "bg-red-100 text-red-600",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
