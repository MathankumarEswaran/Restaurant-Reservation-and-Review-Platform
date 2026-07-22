import type { IconType } from "react-icons";
import { cn } from "../../utils/cn";

interface StatCardProps {
  label: string;
  value: string;
  icon: IconType;
  trend?: { value: string; positive: boolean };
  tone?: "primary" | "accent" | "secondary";
}

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent-dark",
  secondary: "bg-secondary/10 text-secondary",
};

export function StatCard({ label, value, icon: Icon, trend, tone = "primary" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon size={20} />
        </span>
        {trend && (
          <span className={cn("text-xs font-semibold", trend.positive ? "text-accent-dark" : "text-red-500")}>
            {trend.positive ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-text">{value}</p>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
    </div>
  );
}
