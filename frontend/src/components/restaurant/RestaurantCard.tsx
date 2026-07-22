import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiMapPin, FiClock } from "react-icons/fi";
import type { Restaurant } from "../../types";
import { RatingStars } from "../common/RatingStars";
import { Badge } from "../common/Badge";
import { useRestaurants } from "../../context/RestaurantContext";
import { cn } from "../../utils/cn";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { isFavorite, toggleFavorite } = useRestaurants();
  const favorite = isFavorite(restaurant.slug);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm hover:shadow-lg"
    >
      <Link to={`/restaurants/${restaurant.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(restaurant);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-muted shadow-sm hover:text-red-500 cursor-pointer"
            aria-label="Toggle favorite"
          >
            <FiHeart className={cn(favorite && "fill-red-500 text-red-500")} />
          </button>
          {!restaurant.isOpenNow && (
            <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-2.5 py-1 text-xs font-semibold text-white">
              Closed Now
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <Link to={`/restaurants/${restaurant.slug}`}>
            <h3 className="font-semibold text-text hover:text-primary line-clamp-1">{restaurant.name}</h3>
          </Link>
          <span className="shrink-0 text-sm font-semibold text-text-muted">{restaurant.priceRange}</span>
        </div>
        <p className="mb-2.5 flex items-center gap-1 text-xs text-text-muted">
          <FiMapPin size={12} /> {restaurant.location.city}, {restaurant.location.state}
        </p>
        <div className="mb-3 flex items-center gap-2">
          <RatingStars rating={restaurant.rating} size={13} showValue />
          <span className="text-xs text-text-subtle">({restaurant.reviewCount})</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {restaurant.cuisines.slice(0, 2).map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
          {restaurant.isOpenNow && (
            <Badge tone="accent">
              <FiClock size={11} /> Open
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}
