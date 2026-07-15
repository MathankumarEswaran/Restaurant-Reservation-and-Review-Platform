import { cn } from "../../utils/cn";

export function Loader({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center justify-center py-10", className)}>
      <span
        className="animate-spin rounded-full border-4 border-slate-200 border-t-primary"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader size={44} />
    </div>
  );
}
