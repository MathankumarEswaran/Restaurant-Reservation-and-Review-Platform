import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Button } from "../common/Button";
import { usePriceRange } from "../../context/PriceRangeContext";
import { PRICE_MAX, PRICE_MIN, PRICE_STEP } from "../../utils/constants";

export function PriceRangeFilter() {
  const { maxPrice, setMaxPrice } = usePriceRange();
  const [draft, setDraft] = useState(maxPrice);

  useEffect(() => setDraft(maxPrice), [maxPrice]);

  const isDirty = draft !== maxPrice;

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-text">Price Range</p>

      <p className="mb-3 text-center text-base font-bold text-text">
        {PRICE_MIN} - {draft >= PRICE_MAX ? `${PRICE_MAX}+` : draft}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setDraft((v) => Math.max(PRICE_MIN, v - PRICE_STEP))}
          disabled={draft <= PRICE_MIN}
          aria-label="Decrease maximum price"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <FiMinus size={14} />
        </button>

        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={draft}
          onChange={(e) => setDraft(Number(e.target.value))}
          aria-label="Maximum price"
          className="h-1.5 w-full cursor-pointer accent-primary"
        />

        <button
          onClick={() => setDraft((v) => Math.min(PRICE_MAX, v + PRICE_STEP))}
          disabled={draft >= PRICE_MAX}
          aria-label="Increase maximum price"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <FiPlus size={14} />
        </button>
      </div>

      <div className="mt-1.5 flex justify-between text-xs text-text-subtle">
        <span>{PRICE_MIN}</span>
        <span>{PRICE_MAX}</span>
      </div>

      <Button size="sm" fullWidth className="mt-3" disabled={!isDirty} onClick={() => setMaxPrice(draft)}>
        Apply
      </Button>
    </div>
  );
}
