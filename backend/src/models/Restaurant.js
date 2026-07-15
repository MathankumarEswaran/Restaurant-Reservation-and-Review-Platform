import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "" },
    isVeg: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
  },
  { _id: true }
);

const openingHourSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    open: { type: String, required: true },
    close: { type: String, required: true },
    isClosed: { type: Boolean, default: false },
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    cuisines: { type: [String], default: [] },
    category: { type: String, default: "" },
    priceRange: { type: String, enum: ["₹", "₹₹", "₹₹₹", "₹₹₹₹"], required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, default: "" },
      lat: { type: Number },
      lng: { type: Number },
    },
    facilities: { type: [String], default: [] },
    openingHours: { type: [openingHourSchema], default: [] },
    isOpenNow: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isTopRated: { type: Boolean, default: false },
    seatsAvailable: { type: Number, default: 0 },
    outdoorSeating: { type: Boolean, default: false },
    liveMusic: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    petFriendly: { type: Boolean, default: false },
    menu: { type: [menuItemSchema], default: [] },
  },
  { timestamps: true }
);

restaurantSchema.index({ name: "text", "location.city": "text", cuisines: "text" });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
