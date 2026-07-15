import { api } from "./api";
import type { Notification } from "../types";

interface BackendNotification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: Notification["type"];
  isRead: boolean;
  createdAt: string;
}

const mapNotification = (n: BackendNotification): Notification => ({
  id: n._id,
  userId: n.user,
  title: n.title,
  message: n.message,
  type: n.type,
  isRead: n.isRead,
  createdAt: n.createdAt,
});

export async function fetchNotificationsByUser(userId: string): Promise<Notification[]> {
  const { data } = await api.get<BackendNotification[]>(`/notifications/user/${userId}`);
  return data.map(mapNotification);
}

export async function markNotificationRead(id: string): Promise<Notification> {
  const { data } = await api.patch<BackendNotification>(`/notifications/${id}/read`);
  return mapNotification(data);
}
