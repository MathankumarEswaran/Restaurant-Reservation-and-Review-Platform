import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { restaurants as allRestaurants } from "../data/restaurants";
import { useAuth } from "./AuthContext";
import * as favoriteService from "../services/favoriteService";
import { resolveRestaurantIdBySlug } from "../services/restaurantService";
import type { Restaurant } from "../types";

interface RestaurantContextValue {
  restaurants: Restaurant[];
  favoriteSlugs: string[];
  toggleFavorite: (restaurant: Restaurant) => void;
  isFavorite: (slug: string) => boolean;
  favorites: Restaurant[];
}

const RestaurantContext = createContext<RestaurantContextValue | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = user ? favoriteService.fetchMyFavoriteSlugs() : Promise.resolve([]);
    load.then((slugs) => {
      if (!cancelled) setFavoriteSlugs(slugs);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggleFavorite = useCallback(
    (restaurant: Restaurant) => {
      if (!user) return;
      resolveRestaurantIdBySlug(restaurant.slug)
        .then((restaurantId) => favoriteService.toggleFavorite(restaurantId))
        .then(setFavoriteSlugs)
        .catch(() => {});
    },
    [user]
  );

  const value = useMemo<RestaurantContextValue>(
    () => ({
      restaurants: allRestaurants,
      favoriteSlugs,
      toggleFavorite,
      isFavorite: (slug: string) => favoriteSlugs.includes(slug),
      favorites: allRestaurants.filter((r) => favoriteSlugs.includes(r.slug)),
    }),
    [favoriteSlugs, toggleFavorite]
  );

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}

export function useRestaurants() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error("useRestaurants must be used within a RestaurantProvider");
  return ctx;
}
