import { api, resolveImageUrl } from "./api";
import type { Review, User } from "../types";

interface BackendReview {
  _id: string;
  restaurant: string | { _id: string; name: string; slug: string; coverImage: string };
  user: string | { _id: string; name: string; avatar?: string };
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  ownerReply?: { message: string; createdAt: string };
  helpfulCount: number;
  createdAt: string;
}

const mapReview = (r: BackendReview, author: { name: string; avatar?: string }): Review => ({
  id: r._id,
  restaurantId: typeof r.restaurant === "string" ? r.restaurant : r.restaurant._id,
  userId: typeof r.user === "string" ? r.user : r.user._id,
  userName: typeof r.user === "object" ? r.user.name : author.name,
  userAvatar: resolveImageUrl((typeof r.user === "object" ? r.user.avatar : author.avatar) ?? ""),
  rating: r.rating,
  title: r.title,
  comment: r.comment,
  images: r.images,
  createdAt: r.createdAt,
  ownerReply: r.ownerReply,
  helpfulCount: r.helpfulCount,
});

export async function fetchReviewsByUser(userId: string, author: { name: string; avatar?: string }): Promise<Review[]> {
  const { data } = await api.get<BackendReview[]>(`/reviews/user/${userId}`);
  return data.map((r) => mapReview(r, author));
}

export interface ReviewWithRestaurant extends Review {
  restaurant: { name: string; slug: string; coverImage: string };
}

export async function fetchReviewsByUserWithRestaurant(
  userId: string,
  author: { name: string; avatar?: string }
): Promise<ReviewWithRestaurant[]> {
  const { data } = await api.get<BackendReview[]>(`/reviews/user/${userId}`);
  return data.map((r) => ({
    ...mapReview(r, author),
    restaurant:
      typeof r.restaurant === "object"
        ? { ...r.restaurant, coverImage: resolveImageUrl(r.restaurant.coverImage) }
        : { name: "", slug: "", coverImage: "" },
  }));
}

export async function submitReview(
  payload: { restaurantId: string; rating: number; title: string; comment: string; images?: string[] },
  author: Pick<User, "name" | "avatar">
): Promise<Review> {
  const { data } = await api.post<BackendReview>("/reviews", {
    restaurant: payload.restaurantId,
    rating: payload.rating,
    title: payload.title,
    comment: payload.comment,
    images: payload.images,
  });
  return mapReview(data, author);
}
