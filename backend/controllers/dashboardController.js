const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        console.log("Total Income:", totalIncome, "userId valid:", isValidObjectId(userId));

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        console.log("Total Expense:", totalExpense, "userId valid:", isValidObjectId(userId));

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total expense in the last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Fetch the last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: 'income',
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: 'expense',
            })),
        ];

        // Final response
        res.status(200).json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30daysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60daysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
