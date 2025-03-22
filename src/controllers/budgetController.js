const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

const setBudget = async (req, res) => {
    try {
        const { category, limitAmount, month, year } = req.body;

        if (!category || !limitAmount || !month || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingBudget = await Budget.findOne({
            user: req.user._id,
            category,
            month,
            year,
        });

        if (existingBudget) {
            return res.status(400).json({ message: "Budget already set for this category" });
        }

        const budget = await Budget.create({
            user: req.user._id,
            category,
            limitAmount,
            month,
            year,
        });

        res.status(201).json(budget);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id });
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        if (budget.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        budget.limitAmount = req.body.limitAmount || budget.limitAmount;
        await budget.save();

        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        if (budget.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await budget.deleteOne();
        res.json({ message: "Budget deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { setBudget, getBudgets, updateBudget, deleteBudget };
