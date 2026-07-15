import { api, resolveImageUrl } from "./api";
import type { Reservation } from "../types";

export interface BackendReservation {
  _id: string;
  restaurant: { _id: string; name: string; coverImage: string; slug: string };
  user: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: Reservation["status"];
  createdAt: string;
}

export const mapReservation = (r: BackendReservation, userName: string): Reservation => ({
  id: r._id,
  restaurantId: r.restaurant._id,
  restaurantName: r.restaurant.name,
  restaurantImage: resolveImageUrl(r.restaurant.coverImage),
  userId: r.user,
  userName,
  date: r.date,
  time: r.time,
  guests: r.guests,
  specialRequest: r.specialRequest,
  status: r.status,
  createdAt: r.createdAt,
});

export async function fetchReservationsByUser(userId: string, userName: string): Promise<Reservation[]> {
  const { data } = await api.get<BackendReservation[]>(`/reservations/user/${userId}`);
  return data.map((r) => mapReservation(r, userName));
}

export async function createReservation(
  payload: { restaurantId: string; date: string; time: string; guests: number; specialRequest?: string },
  userName: string
): Promise<Reservation> {
  const { data } = await api.post<BackendReservation>("/reservations", {
    restaurant: payload.restaurantId,
    date: payload.date,
    time: payload.time,
    guests: payload.guests,
    specialRequest: payload.specialRequest,
  });
  return mapReservation(data, userName);
}

export async function cancelReservation(reservationId: string): Promise<{ id: string; status: "cancelled" }> {
  const { data } = await api.patch<{ id: string; status: "cancelled" }>(`/reservations/${reservationId}/cancel`);
  return data;
}
