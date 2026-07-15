import dns from "dns";
import mongoose from "mongoose";

// Node's default resolver frequently fails the SRV/TXT lookups that
// mongodb+srv:// URIs depend on (seen on Windows even when the OS
// resolver handles the same lookup fine) — pointing it at public
// resolvers works around that without touching the URI itself.
if (process.env.MONGO_URI?.startsWith("mongodb+srv://")) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}
