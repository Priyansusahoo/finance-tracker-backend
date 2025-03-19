const Transaction = require("../models/Transaction");

// @desc   Create a new transaction
// @route  POST /api/transactions
// @access Private
const createTransaction = async (req, res) => {
    try {
        const { description, amount, type, category, date } = req.body;

        if (!description || !amount || !type || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            description,
            amount,
            type,
            category,
            date: date || new Date(),
        });

        // Update current spending if it's an expense
        if (type === "expense") {
            const currentMonth = new Date(date).getMonth() + 1;
            const currentYear = new Date(date).getFullYear();

            const budget = await Budget.findOne({
                user: req.user._id,
                category,
                month: currentMonth,
                year: currentYear,
            });

            if (budget) {
                budget.currentSpending += amount;
                await budget.save();

                // Send warning if spending exceeds 80% of the limit
                if (budget.currentSpending >= budget.limitAmount * 0.8) {
                    console.log(`⚠️ Warning: You have spent ${budget.currentSpending} in ${category}, close to your limit of ${budget.limitAmount}.`);
                }
            }
        }

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



// @desc   Get all transactions for a user
// @route  GET /api/transactions
// @access Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Update a transaction
// @route  PUT /api/transactions/:id
// @access Private
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        // Check if transaction exists
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Ensure user owns the transaction
        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Update fields
        transaction.description = req.body.description || transaction.description;
        transaction.amount = req.body.amount || transaction.amount;
        transaction.type = req.body.type || transaction.type;
        transaction.category = req.body.category || transaction.category;
        transaction.date = req.body.date || transaction.date;

        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Delete a transaction
// @route  DELETE /api/transactions/:id
// @access Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        // Check if transaction exists
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Ensure user owns the transaction
        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await transaction.deleteOne();
        res.json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createTransaction, getTransactions, updateTransaction, deleteTransaction };
