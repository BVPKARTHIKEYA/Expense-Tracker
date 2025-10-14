const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// Add expense entry
exports.addExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const { icon, category, amount, date } = req.body;
    if (!icon || !category || !amount || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all expense entries
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch income records', error: error.message });
  }
};

// Delete expense entry by ID
exports.deleteExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id});
    if (!expense) {
      return res.status(404).json({ message: 'Expense entry not found' });
    }
    res.json({ message: 'Expense entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Download expense data as Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    if (!expense.length) {
      return res.status(404).json({ message: 'No Expense records found to export' });
    }

    const data = expense.map((item) => ({
      Icon: item.icon,
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0], // YYYY-MM-DD
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Expense');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="expense_details.xlsx"');
    res.setHeader('Content-Length', buffer.length);

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to download Expense data', error: error.message });
  }
};
