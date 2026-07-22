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
  "r-8": [
    item("m8-1", "French Onion Soup", "Caramelized onion soup, gruyère crouton", 320, "Starters", restaurantTable, true, true),
    item("m8-2", "Pan-Seared Fish", "Catch of the day with lemon butter sauce and seasonal vegetables", 620, "Mains", thali2, false, true),
    item("m8-3", "Ratatouille", "Slow-cooked Provençal vegetable stew", 380, "Mains", thali1, true),
    item("m8-4", "Crème Brûlée", "Classic vanilla custard with a caramelized sugar crust", 260, "Desserts", filterCoffee, true, true),
  ],
  "r-9": [
    item("m9-1", "Continental Grilled Platter", "Chef's selection of grilled meats and vegetables", 650, "Mains", restaurantTable, false, true),
    item("m9-2", "Butter Chicken", "Tandoori chicken simmered in a creamy tomato gravy", 420, "Mains", biryani, false, true),
    item("m9-3", "Paneer Tikka", "Char-grilled cottage cheese marinated in spiced yogurt", 340, "Starters", thali2, true),
    item("m9-4", "Dosa Trio", "Three South Indian dosa varieties with chutneys", 280, "Tiffin", dosaChutneys, true),
  ],
  "r-10": [
    item("m10-1", "Dim Sum Basket", "Steamed Pan-Asian dumplings, assorted fillings", 420, "Starters", dosa3Sauces, false, true),
    item("m10-2", "Pad Thai", "Stir-fried rice noodles, tofu or chicken, tamarind sauce", 480, "Mains", restaurantTable, false, true),
    item("m10-3", "Butter Garlic Prawns", "Wok-tossed prawns in a butter garlic glaze", 590, "Mains", biryani, false),
    item("m10-4", "Chilli Paneer", "Indo-Chinese battered cottage cheese in a spicy glaze", 360, "Starters", thali2, true),
  ],
  "r-11": [
    item("m11-1", "Idli", "Soft steamed rice cakes with sambar and coconut chutney", 45, "Tiffin", idliCoffee, true, true),
    item("m11-2", "Ghee Roast Dosa", "Crisp rice crepe roasted in ghee", 85, "Tiffin", dosaTray, true, true),
    item("m11-3", "Medu Vada", "Crispy lentil doughnuts with sambar and chutney", 50, "Tiffin", vadaPlate, true),
    item("m11-4", "Filter Coffee", "Strong decoction coffee with frothy milk", 30, "Beverages", filterCoffee, true, true),
  ],
  "r-12": [
    item("m12-1", "Naatu Kozhi Curry", "Country chicken slow-cooked in Kongu-style spices", 380, "Mains", biryani, false, true),
    item("m12-2", "Mutton Chukka", "Dry-roasted mutton tossed with roasted spices and curry leaf", 420, "Mains", restaurantTable, false, true),
    item("m12-3", "Parotta", "Layered flatbread, served flaky and hot", 30, "Breads", thali1, true, true),
    item("m12-4", "Fish Fry", "Pan-fried fish marinated in Kongu spice blend", 340, "Starters", sambarPlate, false),
  ],
  "r-13": [
    item("m13-1", "Anandhaas Thali", "Full vegetarian thali with seasonal curries and sweet", 260, "Thali", thali1, true, true),
    item("m13-2", "Paneer Butter Masala", "Cottage cheese cubes in a rich buttery tomato gravy", 260, "Mains", thali2, true, true),
    item("m13-3", "Masala Dosa", "Crisp dosa filled with spiced potato masala", 100, "Tiffin", dosaChutneys, true),
    item("m13-4", "Gulab Jamun", "Warm milk-solid dumplings soaked in rose syrup", 80, "Desserts", idliBananaLeaf, true),
  ],
  "r-14": [
    item("m14-1", "Naatu Kozhi Curry", "Signature country chicken curry, Kongu-style", 400, "Mains", biryani, false, true),
    item("m14-2", "Mutton Chukka", "Dry-roasted mutton with roasted spice coating", 450, "Mains", restaurantTable, false, true),
    item("m14-3", "Chicken 65", "Deep-fried spiced chicken bites", 280, "Starters", thali2, false, true),
    item("m14-4", "Parotta (2 pcs)", "Flaky layered flatbread", 35, "Breads", thali1, true),
  ],
  "r-15": [
    item("m15-1", "Idiyappam & Curry Course", "String hoppers with a trio of regional curries, tasting-menu style", 950, "Tasting Menu", thali2, true, true),
    item("m15-2", "Chettinad Course", "Progressive plating of Chettinad spices and technique", 1100, "Tasting Menu", sambarPlate, false, true),
    item("m15-3", "Payasam Reimagined", "Deconstructed semiya payasam, tasting-menu dessert course", 480, "Desserts", filterCoffee, true),
  ],
  "r-16": [
    item("m16-1", "Chettinad Crab Curry", "Crab simmered in a fiery Chettinad masala", 890, "Mains", sambarPlate, false, true),
    item("m16-2", "Malabar Fish Biryani", "Kerala-style layered fish biryani", 720, "Biryani", biryani, false, true),
    item("m16-3", "Appam & Stew", "Lacy rice pancakes with a mild coconut vegetable stew", 480, "Mains", thali1, true),
    item("m16-4", "Filter Coffee", "Strong decoction coffee with frothy milk", 90, "Beverages", filterCoffee, true),
  ],
  "r-17": [
    item("m17-1", "Galouti Kebab", "Melt-in-the-mouth minced lamb kebab, Awadhi style", 780, "Starters", biryani, false, true),
    item("m17-2", "Dal Jamavar", "Slow-cooked black lentils, finished with cream", 480, "Mains", thali2, true, true),
    item("m17-3", "Lucknowi Biryani", "Fragrant dum-cooked biryani, Awadhi tradition", 850, "Biryani", biryani, false, true),
    item("m17-4", "Sheermal", "Saffron-scented mildly sweet flatbread", 120, "Breads", thali1, true),
  ],
};
