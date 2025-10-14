const express = require('express');
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require('../controllers/expenseController'); // Ensure this path is correct

const { protect } = require('../middleware/authMiddleware');  // adjust path if needed

const router = express.Router();

router.post('/add', protect, addExpense);            // Add income
router.get('/get', protect, getAllExpense);          // Get all income
router.get('/downloadexcel', protect, downloadExpenseExcel);  // Download Excel
router.delete('/:id', protect, deleteExpense);       // Delete income by ID

module.exports = router;
