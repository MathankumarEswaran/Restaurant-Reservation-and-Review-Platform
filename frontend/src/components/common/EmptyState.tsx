import type { ReactNode } from "react";
import { FiInbox } from "react-icons/fi";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-raised px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-sunken text-text-subtle">
        {icon ?? <FiInbox size={28} />}
      </div>
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {message && <p className="mt-1.5 max-w-sm text-sm text-text-muted">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
