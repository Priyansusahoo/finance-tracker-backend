const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        limitAmount: {
            type: Number,
            required: true,
        },
        currentSpending: {
            type: Number,
            default: 0,  // Starts at 0, increases with expenses
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
