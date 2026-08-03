import { createContext, useContext, useState, type ReactNode } from "react";
import { PRICE_MAX, PRICE_MIN, PRICE_STEP } from "../utils/constants";

interface PriceRangeContextValue {
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const PriceRangeContext = createContext<PriceRangeContextValue | undefined>(undefined);

const clamp = (value: number) => Math.min(PRICE_MAX, Math.max(PRICE_MIN, value));

export function PriceRangeProvider({ children }: { children: ReactNode }) {
  const [maxPrice, setMaxPriceState] = useState(PRICE_MAX);

  const value: PriceRangeContextValue = {
    maxPrice,
    setMaxPrice: (v) => setMaxPriceState(clamp(v)),
    increment: () => setMaxPriceState((prev) => clamp(prev + PRICE_STEP)),
    decrement: () => setMaxPriceState((prev) => clamp(prev - PRICE_STEP)),
    reset: () => setMaxPriceState(PRICE_MAX),
  };

  return <PriceRangeContext.Provider value={value}>{children}</PriceRangeContext.Provider>;
}

export function usePriceRange() {
  const ctx = useContext(PriceRangeContext);
  if (!ctx) throw new Error("usePriceRange must be used within a PriceRangeProvider");
  return ctx;
}
