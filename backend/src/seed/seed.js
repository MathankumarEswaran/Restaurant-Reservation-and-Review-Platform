import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Restaurant } from "../models/Restaurant.js";
import { Reservation } from "../models/Reservation.js";
import { Review } from "../models/Review.js";
import { Notification } from "../models/Notification.js";
import { seedUsers, seedRestaurants, seedReservations, seedReviews, seedNotifications } from "./seedData.js";

const SEED_PASSWORD = "password123";

async function run() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Restaurant.deleteMany({}),
    Reservation.deleteMany({}),
    Review.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  const userIdByMockId = {};
  for (const u of seedUsers) {
    const user = await User.create({
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      joinedAt: u.joinedAt,
      password: SEED_PASSWORD,
    });
    userIdByMockId[u.mockId] = user._id;
  }

  const restaurantIdByMockId = {};
  for (const r of seedRestaurants) {
    const { mockId, ownerMockId, ...rest } = r;
    const restaurant = await Restaurant.create({ ...rest, owner: userIdByMockId[ownerMockId] });
    restaurantIdByMockId[mockId] = restaurant._id;
  }

  for (const res of seedReservations) {
    const { restaurantMockId, userMockId, ...rest } = res;
    await Reservation.create({
      ...rest,
      restaurant: restaurantIdByMockId[restaurantMockId],
      user: userIdByMockId[userMockId],
    });
  }

  for (const rev of seedReviews) {
    const { restaurantMockId, userMockId, ...rest } = rev;
    await Review.create({
      ...rest,
      restaurant: restaurantIdByMockId[restaurantMockId],
      user: userIdByMockId[userMockId],
    });
  }

  for (const n of seedNotifications) {
    const { userMockId, ...rest } = n;
    await Notification.create({ ...rest, user: userIdByMockId[userMockId] });
  }

  for (const mockId of Object.keys(restaurantIdByMockId)) {
    const restaurantId = restaurantIdByMockId[mockId];
    const stats = await Review.aggregate([
      { $match: { restaurant: restaurantId } },
      { $group: { _id: "$restaurant", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    if (stats[0]) {
      await Restaurant.findByIdAndUpdate(restaurantId, {
        rating: Math.round(stats[0].avgRating * 10) / 10,
        reviewCount: stats[0].count,
      });
    }
  }

  console.log("Seed complete:");
  console.log(`  users:         ${seedUsers.length}`);
  console.log(`  restaurants:   ${seedRestaurants.length}`);
  console.log(`  reservations:  ${seedReservations.length}`);
  console.log(`  reviews:       ${seedReviews.length}`);
  console.log(`  notifications: ${seedNotifications.length}`);
  console.log(`\nAll seeded users share the password: ${SEED_PASSWORD}`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
