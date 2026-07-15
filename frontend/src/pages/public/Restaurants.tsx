import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSliders, FiX } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { SearchBar } from "../../components/restaurant/SearchBar";
import { SearchFiltersPanel } from "../../components/restaurant/SearchFiltersPanel";
import { RestaurantGrid } from "../../components/restaurant/RestaurantGrid";
import { Pagination } from "../../components/common/Pagination";
import { Select } from "../../components/common/Select";
import { fetchRestaurants } from "../../services/restaurantService";
import { SORT_OPTIONS } from "../../utils/constants";
import type { Restaurant, SearchFilters } from "../../types";
import restaurantsBgImage from "../../assets/restaurants/idli-banana-leaf.jpg";

const PAGE_SIZE = 8;

export function Restaurants() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    cuisine: searchParams.get("cuisine") ? [searchParams.get("cuisine")!] : undefined,
    query: searchParams.get("q") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    sortBy: "recommended",
  });
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Flip back to a loading state as soon as the filters change, rather than
  // waiting for an effect to fire — avoids a stale grid flashing briefly
  // before the new request kicks off. See "Adjusting state when a prop
  // changes" in the React docs for this render-time pattern.
  const [appliedFilters, setAppliedFilters] = useState(filters);
  if (filters !== appliedFilters) {
    setAppliedFilters(filters);
    setIsLoading(true);
  }

  useEffect(() => {
    fetchRestaurants(filters).then((data) => {
      setRestaurants(data);
      setIsLoading(false);
      setPage(1);
    });
  }, [filters]);

  const totalPages = Math.ceil(restaurants.length / PAGE_SIZE);
  const paginated = restaurants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="relative overflow-hidden">
      <img src={restaurantsBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]" />
      <div className="absolute inset-0 bg-surface/60" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Restaurants" }]} />
        <h1 className="mt-3 text-3xl font-bold text-secondary">Explore Restaurants</h1>
        <p className="mt-1 text-slate-500">{restaurants.length} restaurants found</p>

        <div className="mt-6">
          <SearchBar variant="compact" initialQuery={filters.query} initialLocation={filters.location} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <SearchFiltersPanel filters={filters} onChange={setFilters} onClear={() => setFilters({ sortBy: "recommended" })} />
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-secondary lg:hidden cursor-pointer"
              >
                <FiSliders size={15} /> Filters
              </button>
              <div className="ml-auto w-full max-w-[220px]">
                <Select
                  options={SORT_OPTIONS}
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SearchFilters["sortBy"] })}
                />
              </div>
            </div>

            <RestaurantGrid restaurants={paginated} isLoading={isLoading} />

            {!isLoading && totalPages > 1 && (
              <div className="mt-10">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-secondary/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative ml-auto h-full w-80 max-w-full overflow-y-auto bg-surface p-4">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mb-3 flex items-center gap-1.5 text-sm font-medium text-slate-500 cursor-pointer"
              >
                <FiX size={16} /> Close
              </button>
              <SearchFiltersPanel filters={filters} onChange={setFilters} onClear={() => setFilters({ sortBy: "recommended" })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
