import { api } from "./api";

interface BackendFavoriteRestaurant {
  _id: string;
  slug: string;
}

export async function fetchMyFavoriteSlugs(): Promise<string[]> {
  const { data } = await api.get<BackendFavoriteRestaurant[]>("/users/me/favorites");
  return data.map((r) => r.slug);
}

export async function toggleFavorite(restaurantId: string): Promise<string[]> {
  const { data } = await api.post<BackendFavoriteRestaurant[]>(`/users/me/favorites/${restaurantId}`);
  return data.map((r) => r.slug);
}
