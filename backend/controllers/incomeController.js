const xlsx = require('xlsx');
const Income = require('../models/Income');

// Add income entry
exports.addIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const { icon, source, amount, date } = req.body;
    if (!icon || !source || !amount || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all income entries
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch income records', error: error.message });
  }
};

// Delete income entry by ID
exports.deleteIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId });
    if (!income) {
      return res.status(404).json({ message: 'Income entry not found' });
    }
    res.json({ message: 'Income entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Download income data as Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    if (!income.length) {
      return res.status(404).json({ message: 'No income records found to export' });
    }

    const data = income.map((item) => ({
      Icon: item.icon,
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0], // YYYY-MM-DD
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Income');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="income_details.xlsx"');
    res.setHeader('Content-Length', buffer.length);

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to download income data', error: error.message });
  }
};
