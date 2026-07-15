import type { MenuItem } from "../types";

import idliBananaLeaf from "../assets/restaurants/idli-banana-leaf.jpg";
import idliCoffee from "../assets/restaurants/idli-coffee.jpg";
import dosaTray from "../assets/restaurants/dosa-tray.jpg";
import dosaChutneys from "../assets/restaurants/dosa-chutneys.jpg";
import dosa3Sauces from "../assets/restaurants/dosa-3sauces.jpg";
import biryani from "../assets/restaurants/biryani-2.jpg";
import filterCoffee from "../assets/restaurants/filter-coffee.jpg";
import sambarPlate from "../assets/restaurants/sambar.jpg";
import thali1 from "../assets/restaurants/thali-1.jpg";
import thali2 from "../assets/restaurants/thali-2.jpg";
import restaurantTable from "../assets/restaurants/restaurant-table.jpg";
import vadaPlate from "../assets/restaurants/vada-plate.jpg";

const item = (
  id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  image: string,
  isVeg = true,
  isPopular = false
): MenuItem => ({
  id,
  name,
  description,
  price,
  category,
  image,
  isVeg,
  isPopular,
});

export const menusByRestaurant: Record<string, MenuItem[]> = {
  "r-1": [
    item("m1-1", "Idli", "Steamed rice cakes, served with sambar and coconut chutney", 40, "Tiffin", idliBananaLeaf, true, true),
    item("m1-2", "Sambar Vada", "Crisp lentil fritters soaked in Rayar's signature sambar", 45, "Tiffin", vadaPlate, true, true),
    item("m1-3", "Ghee Roast Dosa", "Thin rice crepe roasted in ghee, served with chutney", 70, "Tiffin", dosaTray, true),
    item("m1-4", "Filter Coffee", "Strong decoction coffee with frothy milk, served in a davara-tumbler", 25, "Beverages", filterCoffee, true),
  ],
  "r-2": [
    item("m2-1", "Rava Idli", "Semolina steamed cakes studded with cashew and curry leaf", 50, "Tiffin", idliCoffee, true, true),
    item("m2-2", "Ratna Special Sambar Idli", "Soft idlis soaked in the cafe's legendary rich sambar", 60, "Tiffin", sambarPlate, true, true),
    item("m2-3", "Masala Dosa", "Crisp dosa filled with spiced potato masala, tomato & coconut chutney", 90, "Tiffin", dosaChutneys, true),
    item("m2-4", "Ven Pongal", "Comforting rice and moong dal porridge tempered with pepper and cumin", 60, "Tiffin", thali2, true),
    item("m2-5", "Filter Coffee", "Strong decoction coffee with frothy milk", 25, "Beverages", filterCoffee, true),
  ],
  "r-3": [
    item("m3-1", "Dindigul Mutton Biryani", "Seeraga samba rice slow-cooked with tender mutton and secret spice blend", 320, "Biryani", biryani, false, true),
    item("m3-2", "Dindigul Chicken Biryani", "Signature short-grain biryani with bone-in chicken, served with brinjal chutney", 280, "Biryani", biryani, false, true),
    item("m3-3", "Thalappakatti Chicken 65", "Deep-fried spiced chicken bites, a classic biryani side", 220, "Starters", restaurantTable, false),
    item("m3-4", "Vegetable Biryani", "Seeraga samba rice layered with mixed vegetables and whole spices", 220, "Biryani", biryani, true, true),
    item("m3-5", "Onion Raita", "Cooling yogurt with onion, served alongside biryani", 40, "Sides", thali1, true),
  ],
  "r-4": [
    item("m4-1", "Idli (2 pcs)", "Soft steamed rice cakes with sambar and chutney", 40, "Tiffin", idliBananaLeaf, true, true),
    item("m4-2", "Ghee Podi Idli", "Idli tossed in ghee and roasted lentil spice powder", 60, "Tiffin", idliCoffee, true, true),
    item("m4-3", "Onion Rava Dosa", "Crisp semolina dosa loaded with onions, served with three chutneys", 90, "Tiffin", dosa3Sauces, true),
    item("m4-4", "Ven Pongal", "Rice and moong dal porridge, tempered with ghee, pepper and cashew", 60, "Tiffin", thali2, true),
    item("m4-5", "Medu Vada", "Crispy lentil doughnuts served with sambar and coconut chutney", 45, "Tiffin", vadaPlate, true),
  ],
  "r-5": [
    item("m5-1", "Annalakshmi Thali", "An elaborate vegetarian feast of rice, curries, kootu, poriyal and payasam", 450, "Thali", thali1, true, true),
    item("m5-2", "Bisi Bele Bath", "Spiced rice and lentil dish simmered with vegetables and tamarind", 220, "Mains", thali2, true),
    item("m5-3", "Kootu Curry", "Vegetables and lentils simmered in a mild coconut gravy", 180, "Mains", sambarPlate, true),
    item("m5-4", "Semiya Payasam", "Warm vermicelli pudding simmered in milk, cardamom and cashews", 120, "Desserts", restaurantTable, true),
  ],
  "r-6": [
    item("m6-1", "Keerai Vada", "The mess's famous spinach-studded lentil fritter", 40, "Tiffin", vadaPlate, true, true),
    item("m6-2", "Idli Sambar", "Steamed idlis served with a generous ladle of piping hot sambar", 45, "Tiffin", idliCoffee, true, true),
    item("m6-3", "Set Dosa", "Soft, spongy mini dosas served in a stack of three", 70, "Tiffin", dosaTray, true),
    item("m6-4", "Filter Coffee", "Strong decoction coffee with frothy milk", 25, "Beverages", filterCoffee, true),
  ],
};
