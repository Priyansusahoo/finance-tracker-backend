const app = require("./app");
const connectDB = require("./config/db");

require("dotenv").config();
// const PORT = process.env.PORT;

// process.on("uncaughtException", (err) => {
//     console.error(`Uncaught Exception: ${err.message}`);
//     process.exit(1);
// });

// connectDB()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`✅ Server running on port ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error("❌ Database connection failed:", error);
//         process.exit(1);
//     });

// process.on("unhandledRejection", (err) => {
//     console.error(`Unhandled Rejection: ${err.message}`);
//     process.exit(1);
// });
const startServer = async () => {
    try {
        await connectDB();
        console.log("✅ Database connected successfully");

        module.exports = app; // Export app for Vercel (No app.listen())
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

startServer();