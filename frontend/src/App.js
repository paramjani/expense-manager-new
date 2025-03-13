import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5002";

function App() {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${API_URL}/expenses`);
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const addExpense = async () => {
        if (!name || !amount) return alert("Fill all fields!");
        try {
            const response = await axios.post(`${API_URL}/expenses`, { name, amount });
            setExpenses([...expenses, response.data]);
            setName("");
            setAmount("");
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${API_URL}/expenses/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>💰 Expense Management System</h1>

            <div>
                <input 
                    type="text" 
                    placeholder="Expense Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
                <button onClick={addExpense}>Add Expense</button>
            </div>

            <h2>📜 Expense List</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.name} - ₹{expense.amount} 
                        <button onClick={() => deleteExpense(expense._id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
