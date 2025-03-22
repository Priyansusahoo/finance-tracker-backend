const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://apis.example.com"],
                styleSrc: ["'self'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:"],
            },
        },
    })
);

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

app.get("/", (req, res) => {
    res.send("Finance Tracker API is running...");
});

app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});

module.exports = app;