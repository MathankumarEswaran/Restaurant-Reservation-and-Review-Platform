import { FiX } from "react-icons/fi";
import type { SearchFilters } from "../../types";
import { CUISINE_OPTIONS, PRICE_OPTIONS, CITY_OPTIONS } from "../../utils/constants";
import { cn } from "../../utils/cn";

interface SearchFiltersPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onClear: () => void;
}

const toggleOptions: { key: keyof SearchFilters; label: string }[] = [
  { key: "openNow", label: "Open Now" },
  { key: "outdoorSeating", label: "Outdoor Seating" },
  { key: "liveMusic", label: "Live Music" },
  { key: "vegetarian", label: "Vegetarian" },
  { key: "vegan", label: "Vegan" },
  { key: "petFriendly", label: "Pet Friendly" },
];

export function SearchFiltersPanel({ filters, onChange, onClear }: SearchFiltersPanelProps) {
  const toggleCuisine = (cuisine: string) => {
    const current = filters.cuisine ?? [];
    onChange({
      ...filters,
      cuisine: current.includes(cuisine) ? current.filter((c) => c !== cuisine) : [...current, cuisine],
    });
  };

  const togglePrice = (price: string) => {
    const current = filters.price ?? [];
    onChange({
      ...filters,
      price: current.includes(price) ? current.filter((p) => p !== price) : [...current, price],
    });
  };

  return (
    <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-secondary">Filters</h3>
        <button onClick={onClear} className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary cursor-pointer">
          <FiX size={14} /> Clear all
        </button>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-secondary">Location</p>
        <select
          value={filters.location ?? ""}
          onChange={(e) => onChange({ ...filters, location: e.target.value || undefined })}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-secondary outline-none focus:border-primary"
        >
          <option value="">All cities</option>
          {CITY_OPTIONS.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-secondary">Cuisine</p>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                filters.cuisine?.includes(cuisine)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
              )}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-secondary">Price Range</p>
        <div className="flex gap-2">
          {PRICE_OPTIONS.map((price) => (
            <button
              key={price}
              onClick={() => togglePrice(price)}
              className={cn(
                "flex-1 rounded-lg border py-1.5 text-sm font-semibold cursor-pointer transition-colors",
                filters.price?.includes(price)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
              )}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-secondary">Minimum Rating</p>
        <div className="flex gap-2">
          {[3, 3.5, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, rating: filters.rating === rating ? undefined : rating })}
              className={cn(
                "flex-1 rounded-lg border py-1.5 text-xs font-semibold cursor-pointer transition-colors",
                filters.rating === rating
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
              )}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-secondary">Amenities</p>
        <div className="space-y-2.5">
          {toggleOptions.map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={Boolean(filters[key])}
                onChange={(e) => onChange({ ...filters, [key]: e.target.checked || undefined })}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
