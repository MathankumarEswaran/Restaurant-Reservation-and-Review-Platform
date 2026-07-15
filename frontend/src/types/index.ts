export type UserRole = "customer" | "owner" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  joinedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  createdAt: string;
  ownerReply?: {
    message: string;
    createdAt: string;
  };
  helpfulCount: number;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  gallery: string[];
  cuisines: string[];
  category: string;
  priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";
  rating: number;
  reviewCount: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
  };
  facilities: string[];
  openingHours: OpeningHour[];
  isOpenNow: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isTopRated: boolean;
  seatsAvailable: number;
  outdoorSeating: boolean;
  liveMusic: boolean;
  vegetarian: boolean;
  vegan: boolean;
  petFriendly: boolean;
  createdAt: string;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "reservation" | "review" | "system" | "promo";
  isRead: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  restaurantCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  message: string;
}

export interface SearchFilters {
  query?: string;
  cuisine?: string[];
  location?: string;
  price?: string[];
  rating?: number;
  openNow?: boolean;
  outdoorSeating?: boolean;
  liveMusic?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  petFriendly?: boolean;
  sortBy?: "recommended" | "rating" | "priceLowHigh" | "priceHighLow" | "newest";
}
