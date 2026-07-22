export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Restaurants", to: "/restaurants" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const CUISINE_OPTIONS = [
  "South Indian",
  "Tiffin",
  "Biryani",
  "Vegetarian",
  "North Indian",
  "Filter Coffee",
  "Chettinad",
  "European",
  "Pan-Asian",
];

export const PRICE_OPTIONS = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];

export const CITY_OPTIONS = ["Chennai", "Coimbatore"];

export const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Highest Rated", value: "rating" },
  { label: "Price: Low to High", value: "priceLowHigh" },
  { label: "Price: High to Low", value: "priceHighLow" },
  { label: "Newest", value: "newest" },
];
