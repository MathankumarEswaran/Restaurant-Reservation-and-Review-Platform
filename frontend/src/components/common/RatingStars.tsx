import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { cn } from "../../utils/cn";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function RatingStars({ rating, size = 16, showValue, interactive, onChange, className }: RatingStarsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const activeValue = hovered ?? rating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <FaStar
            key={star}
            size={size}
            className={cn(
              "transition-colors",
              star <= Math.round(activeValue) ? "text-amber-400" : "text-slate-200",
              interactive && "cursor-pointer"
            )}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(null)}
            onClick={() => interactive && onChange?.(star)}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-semibold text-secondary">{rating.toFixed(1)}</span>}
    </div>
  );
}
