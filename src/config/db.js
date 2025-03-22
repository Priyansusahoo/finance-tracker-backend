const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("⚠️  Missing MONGO_URI in .env file");
            return;
        }

        mongoose.set("strictQuery", false);

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️  MongoDB Disconnected. Attempting to reconnect...");
            setTimeout(connectDB, 5000);
        });

        mongoose.connection.on("reconnected", () => {
            console.log("✅ MongoDB Reconnected.");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        setTimeout(connectDB, 5000);
    }
};
module.exports = connectDB;