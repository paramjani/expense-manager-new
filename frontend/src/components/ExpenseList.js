import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/expenses`).then((res) => setExpenses(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Expense List</h3>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li key={expense._id} className="list-group-item">
            {expense.title} - ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
