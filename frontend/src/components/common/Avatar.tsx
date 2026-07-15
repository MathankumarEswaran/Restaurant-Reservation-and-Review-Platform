import { cn } from "../../utils/cn";

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

const palette = ["bg-primary", "bg-accent", "bg-secondary", "bg-amber-500", "bg-rose-500", "bg-teal-500"];

function colorFor(name: string) {
  const hash = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name, src, size = 36, className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-full font-semibold text-white", colorFor(name), className)}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initialsFor(name)}
    </span>
  );
}
