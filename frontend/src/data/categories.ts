import type { Category } from "../types";

import idliBananaLeaf from "../assets/restaurants/idli-banana-leaf.jpg";
import dosaTray from "../assets/restaurants/dosa-tray.jpg";
import biryani from "../assets/restaurants/biryani-2.jpg";
import thali1 from "../assets/restaurants/thali-1.jpg";
import thali2 from "../assets/restaurants/thali-2.jpg";
import filterCoffee from "../assets/restaurants/filter-coffee.jpg";
import sambarPlate from "../assets/restaurants/sambar.jpg";
import restaurantTable from "../assets/restaurants/restaurant-table.jpg";
import dosaChutneys from "../assets/restaurants/dosa-chutneys.jpg";

export const categories: Category[] = [
  { id: "cat-1", name: "South Indian", icon: "GiKnifeFork", image: idliBananaLeaf, restaurantCount: 14 },
  { id: "cat-2", name: "Tiffin", icon: "MdOutlineCoffee", image: dosaTray, restaurantCount: 5 },
  { id: "cat-3", name: "Biryani", icon: "GiFullPizza", image: biryani, restaurantCount: 1 },
  { id: "cat-4", name: "Vegetarian", icon: "LuSalad", image: thali1, restaurantCount: 3 },
  { id: "cat-5", name: "North Indian", icon: "GiCurryTrace", image: thali2, restaurantCount: 6 },
  { id: "cat-6", name: "Filter Coffee", icon: "MdOutlineCoffee", image: filterCoffee, restaurantCount: 5 },
  { id: "cat-7", name: "Chettinad", icon: "GiChiliPepper", image: sambarPlate, restaurantCount: 3 },
  { id: "cat-8", name: "European", icon: "GiWineGlass", image: restaurantTable, restaurantCount: 2 },
  { id: "cat-9", name: "Pan-Asian", icon: "GiNoodles", image: dosaChutneys, restaurantCount: 1 },
];
