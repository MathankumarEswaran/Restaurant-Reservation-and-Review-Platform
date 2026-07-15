import type { Category } from "../types";

import idliBananaLeaf from "../assets/restaurants/idli-banana-leaf.jpg";
import dosaTray from "../assets/restaurants/dosa-tray.jpg";
import biryani from "../assets/restaurants/biryani-2.jpg";
import thali1 from "../assets/restaurants/thali-1.jpg";
import thali2 from "../assets/restaurants/thali-2.jpg";
import filterCoffee from "../assets/restaurants/filter-coffee.jpg";

export const categories: Category[] = [
  { id: "cat-1", name: "South Indian", icon: "GiKnifeFork", image: idliBananaLeaf, restaurantCount: 7 },
  { id: "cat-2", name: "Tiffin", icon: "MdOutlineCoffee", image: dosaTray, restaurantCount: 4 },
  { id: "cat-3", name: "Biryani", icon: "GiFullPizza", image: biryani, restaurantCount: 1 },
  { id: "cat-4", name: "Vegetarian", icon: "LuSalad", image: thali1, restaurantCount: 1 },
  { id: "cat-5", name: "North Indian", icon: "GiCurryTrace", image: thali2, restaurantCount: 2 },
  { id: "cat-6", name: "Filter Coffee", icon: "MdOutlineCoffee", image: filterCoffee, restaurantCount: 4 },
];
