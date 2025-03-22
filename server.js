const app = require("./src/app");
const connectDB = require("./src/config/db");

require("dotenv").config();

connectDB()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

module.exports = (req, res) => {
  app(req, res); // Export the app as a handler for Vercel
};