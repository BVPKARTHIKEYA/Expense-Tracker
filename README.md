# 💰 Expense Tracker

A full-stack web application that helps users manage their financial transactions by tracking **expenses**, **income**, and overall **balance** — all in one place.

---

## 🚀 Overview

The **Expense Tracker** app allows users to record and visualize their financial data.  
It displays **expense, income, and balance summaries**, along with interactive charts for better insights.  
All backend routes and database functions were tested using **Postman API**.

---

## ✨ Features

- 🔐 **User Authentication:** Secure login and registration using **JWT Token**
- 💵 **Transaction Management:** Add, update, delete, and view expense and income transactions
- 📊 **Data Visualization:**  
  - **Line Charts** for expense trends  
  - **Pie Charts** for income distribution
- 🕒 **Recent Data Display:**  
  - Displays last **30 expense records**  
  - Displays last **60 income records**
- ⚡ **Real-time UI:** Automatically updates charts and transaction data after every operation
- 🌐 **API Tested:** All backend routes and database operations tested using **Postman**

---

## 🧰 Tech Stack

| Layer | Technology Used |
|:------|:----------------|
| **Frontend** | React (Vite), Recharts, HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Token) |
| **Testing Tools** | Postman API |

---

## 📂 Folder Structure

Expense-Tracker/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── ...
├── frontend/
│ └── expense-tracker/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── charts/
│ │ └── App.jsx
│ └── vite.config.js
├── .gitignore
└── README.md
