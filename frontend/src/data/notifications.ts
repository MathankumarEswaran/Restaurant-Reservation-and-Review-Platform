import type { Notification } from "../types";

export const notifications: Notification[] = [
  {
    id: "n-1",
    userId: "u-1",
    title: "Reservation Confirmed",
    message: "Your table for 2 at Rayar's Mess on Jul 20, 7:30 AM is confirmed.",
    type: "reservation",
    isRead: false,
    createdAt: "2026-07-10T10:00:00",
  },
  {
    id: "n-2",
    userId: "u-1",
    title: "Owner replied to your review",
    message: "Ratna Cafe replied to your review: \"So happy to hear you keep coming back!...\"",
    type: "review",
    isRead: false,
    createdAt: "2026-07-11T09:15:00",
  },
  {
    id: "n-3",
    userId: "u-1",
    title: "20% off this weekend",
    message: "Enjoy 20% off at participating restaurants this Saturday & Sunday.",
    type: "promo",
    isRead: true,
    createdAt: "2026-07-08T08:00:00",
  },
  {
    id: "n-4",
    userId: "u-1",
    title: "Reminder: upcoming reservation",
    message: "Don't forget your reservation at Ratna Cafe tomorrow at 8:00 AM.",
    type: "reservation",
    isRead: true,
    createdAt: "2026-07-24T18:00:00",
  },
  {
    id: "n-5",
    userId: "u-1",
    title: "Welcome to Chennai Traditions Reserved!",
    message: "Thanks for joining — start exploring restaurants near you.",
    type: "system",
    isRead: true,
    createdAt: "2023-08-14T12:00:00",
  },
];

export const getNotificationsByUser = (userId: string) => notifications.filter((n) => n.userId === userId);
