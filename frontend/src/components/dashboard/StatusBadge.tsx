import { Badge } from "../common/Badge";

const statusTone = {
  upcoming: "primary",
  completed: "accent",
  cancelled: "danger",
  pending: "neutral",
  active: "accent",
  inactive: "neutral",
  paid: "accent",
  refunded: "danger",
} as const;

export function StatusBadge({ status }: { status: string }) {
  const tone = statusTone[status as keyof typeof statusTone] ?? "neutral";
  return <Badge tone={tone}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
}
