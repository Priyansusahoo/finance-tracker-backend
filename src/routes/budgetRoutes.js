const express = require("express");
const { setBudget, getBudgets, updateBudget, deleteBudget } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, setBudget);
router.get("/", protect, getBudgets);
router.patch("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);

module.exports = router;
