import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { SearchBar } from "../../components/restaurant/SearchBar";
import { SearchFiltersPanel } from "../../components/restaurant/SearchFiltersPanel";
import { RestaurantGrid } from "../../components/restaurant/RestaurantGrid";
import { EmptyState } from "../../components/common/EmptyState";
import { Select } from "../../components/common/Select";
import { ButtonLink } from "../../components/common/Button";
import { fetchRestaurants } from "../../services/restaurantService";
import { SORT_OPTIONS } from "../../utils/constants";
import type { Restaurant, SearchFilters } from "../../types";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const location = searchParams.get("location") ?? "";

  const [filters, setFilters] = useState<SearchFilters>({ query, location: location || undefined, sortBy: "recommended" });
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Keep filters in sync with the URL's ?q= and ?location= params (e.g. a
  // new search submitted from the navbar). Adjusted directly during render
  // rather than in an effect, per React's "Adjusting state when a prop
  // changes" pattern.
  const [appliedQuery, setAppliedQuery] = useState(query);
  const [appliedLocation, setAppliedLocation] = useState(location);
  const [appliedFilters, setAppliedFilters] = useState(filters);
  if (query !== appliedQuery || location !== appliedLocation) {
    setAppliedQuery(query);
    setAppliedLocation(location);
    setFilters((prev) => ({ ...prev, query, location: location || undefined }));
  } else if (filters !== appliedFilters) {
    setAppliedFilters(filters);
    setIsLoading(true);
  }

  useEffect(() => {
    fetchRestaurants(filters).then((data) => {
      setRestaurants(data);
      setIsLoading(false);
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        {query ? (
          <>
            Search results for <span className="text-primary">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Search Restaurants"
        )}
      </h1>
      <p className="mt-1 text-text-muted">{isLoading ? "Searching..." : `${restaurants.length} results found`}</p>

      <div className="mt-6">
        <SearchBar variant="compact" initialQuery={query} initialLocation={location} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <SearchFiltersPanel filters={filters} onChange={setFilters} onClear={() => setFilters({ query, sortBy: "recommended" })} />
        </div>

        <div>
          <div className="mb-5 flex justify-end">
            <div className="w-full max-w-[220px]">
              <Select
                options={SORT_OPTIONS}
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SearchFilters["sortBy"] })}
              />
            </div>
          </div>

          {!isLoading && restaurants.length === 0 ? (
            <EmptyState
              icon={<FiSearch size={26} />}
              title="No restaurants match your search"
              message="Try a different keyword, location, or clear your filters."
              action={<ButtonLink to="/restaurants">Browse All Restaurants</ButtonLink>}
            />
          ) : (
            <RestaurantGrid restaurants={restaurants} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
