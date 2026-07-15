import type { Reservation } from "../types";

import sambarPlate from "../assets/restaurants/sambar.jpg";
import idliCoffee from "../assets/restaurants/idli-coffee.jpg";
import biryani from "../assets/restaurants/biryani-2.jpg";
import idliBananaLeaf from "../assets/restaurants/idli-banana-leaf.jpg";
import thali1 from "../assets/restaurants/thali-1.jpg";
import vadaPlate from "../assets/restaurants/vada-plate.jpg";

export const reservations: Reservation[] = [
  {
    id: "res-1",
    restaurantId: "r-1",
    restaurantName: "Rayar's Mess",
    restaurantImage: sambarPlate,
    userId: "u-1",
    userName: "Emma Carter",
    date: "2026-07-20",
    time: "7:30 AM",
    guests: 2,
    specialRequest: "Window seat if possible, celebrating anniversary.",
    status: "upcoming",
    createdAt: "2026-07-10",
  },
  {
    id: "res-2",
    restaurantId: "r-2",
    restaurantName: "Candyy Cafe",
    restaurantImage: idliCoffee,
    userId: "u-1",
    userName: "Emma Carter",
    date: "2026-07-25",
    time: "8:00 AM",
    guests: 4,
    status: "upcoming",
    createdAt: "2026-07-12",
  },
  {
    id: "res-3",
    restaurantId: "r-3",
    restaurantName: "Dindigul Thalappakatti",
    restaurantImage: biryani,
    userId: "u-1",
    userName: "Emma Carter",
    date: "2026-05-14",
    time: "1:00 PM",
    guests: 3,
    status: "completed",
    createdAt: "2026-05-01",
  },
  {
    id: "res-4",
    restaurantId: "r-6",
    restaurantName: "Karpagambal Mess",
    restaurantImage: vadaPlate,
    userId: "u-1",
    userName: "Emma Carter",
    date: "2026-04-02",
    time: "8:30 AM",
    guests: 2,
    status: "cancelled",
    createdAt: "2026-03-20",
  },
  {
    id: "res-5",
    restaurantId: "r-5",
    restaurantName: "Annalakshmi Restaurant",
    restaurantImage: thali1,
    userId: "u-2",
    userName: "Liam Johnson",
    date: "2026-07-18",
    time: "7:00 PM",
    guests: 5,
    specialRequest: "One guest has a nut allergy.",
    status: "upcoming",
    createdAt: "2026-07-08",
  },
  {
    id: "res-6",
    restaurantId: "r-4",
    restaurantName: "Murugan Idli Shop",
    restaurantImage: idliBananaLeaf,
    userId: "u-2",
    userName: "Liam Johnson",
    date: "2026-07-22",
    time: "9:00 AM",
    guests: 3,
    status: "upcoming",
    createdAt: "2026-07-11",
  },
];

export const getReservationsByUser = (userId: string) => reservations.filter((r) => r.userId === userId);
export const getReservationsByRestaurant = (restaurantId: string) =>
  reservations.filter((r) => r.restaurantId === restaurantId);
