import { FiHeart } from "react-icons/fi";
import { RestaurantCard } from "../../components/restaurant/RestaurantCard";
import { EmptyState } from "../../components/common/EmptyState";
import { ButtonLink } from "../../components/common/Button";
import { useRestaurants } from "../../context/RestaurantContext";

export function CustomerFavorites() {
  const { favorites } = useRestaurants();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">My Favorites</h1>
      <p className="mt-1 text-slate-500">Restaurants you've saved for later.</p>

      <div className="mt-6">
        {favorites.length === 0 ? (
          <EmptyState
            icon={<FiHeart size={26} />}
            title="No favorites yet"
            message="Tap the heart icon on any restaurant to save it here."
            action={<ButtonLink to="/restaurants">Browse Restaurants</ButtonLink>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
