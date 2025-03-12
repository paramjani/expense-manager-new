import React, { useState } from "react";
import axios from "axios";

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/expenses`, { title, amount });
      alert("Expense added!");
      setTitle("");
      setAmount("");
    } catch (error) {
      alert("Error adding expense");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" placeholder="Amount" className="form-control mb-2" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit" className="btn btn-success">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
