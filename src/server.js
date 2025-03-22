const app = require("./app");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

module.exports = app;
