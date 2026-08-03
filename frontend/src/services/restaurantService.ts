import { restaurants, getRestaurantBySlug, getRelatedRestaurants } from "../data/restaurants";
import { menusByRestaurant } from "../data/menus";
import { api } from "./api";
import type { Restaurant, SearchFilters } from "../types";

const delay = <T>(value: T, ms = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function resolveRestaurantIdBySlug(slug: string): Promise<string> {
  const { data } = await api.get<{ _id: string }>(`/restaurants/${slug}`);
  return data._id;
}

export function fetchRestaurants(filters: SearchFilters = {}): Promise<Restaurant[]> {
  let results = [...restaurants];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
        r.location.city.toLowerCase().includes(q)
    );
  }
  if (filters.cuisine?.length) {
    results = results.filter((r) => r.cuisines.some((c) => filters.cuisine!.includes(c)));
  }
  if (filters.location) {
    results = results.filter((r) => r.location.city === filters.location);
  }
  if (filters.price?.length) {
    results = results.filter((r) => filters.price!.includes(r.priceRange));
  }
  if (filters.rating) {
    results = results.filter((r) => r.rating >= filters.rating!);
  }
  if (filters.openNow) results = results.filter((r) => r.isOpenNow);
  if (filters.outdoorSeating) results = results.filter((r) => r.outdoorSeating);
  if (filters.liveMusic) results = results.filter((r) => r.liveMusic);
  if (filters.vegetarian) results = results.filter((r) => r.vegetarian);
  if (filters.vegan) results = results.filter((r) => r.vegan);
  if (filters.petFriendly) results = results.filter((r) => r.petFriendly);

  switch (filters.sortBy) {
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "priceLowHigh":
      results.sort((a, b) => a.priceRange.length - b.priceRange.length);
      break;
    case "priceHighLow":
      results.sort((a, b) => b.priceRange.length - a.priceRange.length);
      break;
    case "newest":
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      break;
  }

  return delay(results);
}

export function fetchRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
  return delay(getRestaurantBySlug(slug));
}

export function fetchRelatedRestaurants(restaurant: Restaurant): Promise<Restaurant[]> {
  return delay(getRelatedRestaurants(restaurant));
}

export function fetchFeaturedRestaurants(): Promise<Restaurant[]> {
  return delay(restaurants.filter((r) => r.isFeatured));
}

export function fetchTopRatedRestaurants(): Promise<Restaurant[]> {
  return delay(restaurants.filter((r) => r.isTopRated));
}

export function fetchTrendingRestaurants(): Promise<Restaurant[]> {
  return delay(restaurants.filter((r) => r.isTrending));
}

export function fetchMenuByRestaurantId(restaurantId: string) {
  return delay(menusByRestaurant[restaurantId] ?? []);
}
