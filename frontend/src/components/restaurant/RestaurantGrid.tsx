import type { Restaurant } from "../../types";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantGridSkeleton } from "../common/Skeleton";
import { EmptyState } from "../common/EmptyState";
import { FiSearch } from "react-icons/fi";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
}

export function RestaurantGrid({ restaurants, isLoading }: RestaurantGridProps) {
  if (isLoading) return <RestaurantGridSkeleton />;

  if (restaurants.length === 0) {
    return (
      <EmptyState
        icon={<FiSearch size={26} />}
        title="No restaurants found"
        message="Try adjusting your search or filters to find what you're looking for."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
