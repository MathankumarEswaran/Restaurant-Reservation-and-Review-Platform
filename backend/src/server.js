import "dotenv/config";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";

const port = process.env.PORT ?? 5000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
