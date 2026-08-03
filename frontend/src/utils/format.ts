export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", options ?? { month: "short", day: "numeric", year: "numeric" });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

interface OpeningHourLike {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export function groupOpeningHours(hours: OpeningHourLike[]): { label: string; value: string }[] {
  const groups: { days: string[]; value: string }[] = [];

  for (const hour of hours) {
    const value = hour.isClosed ? "Closed" : `${hour.open} – ${hour.close}`;
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.value === value) {
      lastGroup.days.push(hour.day);
    } else {
      groups.push({ days: [hour.day], value });
    }
  }

  return groups.map((group) => ({
    label: group.days.length > 1 ? `${group.days[0]} – ${group.days[group.days.length - 1]}` : group.days[0],
    value: group.value,
  }));
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(d);
}
