import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Add an expense
router.post("/", async (req, res) => {
  const { title, amount } = req.body;
  try {
    const expense = new Expense({ title, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
