const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");
const budgetRoutes = require("./routes/budgetRoutes")

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("Finance Tracker API is running...");
});


module.exports = app;