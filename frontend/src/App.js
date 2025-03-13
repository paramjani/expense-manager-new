import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }} 
            style={{
                textAlign: "center",
                padding: "20px",
                background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
                minHeight: "100vh"
            }}
        >
            <motion.h1 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.7 }}
                style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#00aaff",
                    textShadow: "0px 0px 10px #00aaff"
                }}
            >
                💰 Expense Tracker
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >
                <input 
                    type="text" 
                    placeholder="Expense Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    style={{
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#222",
                        color: "#ffffff",
                        width: "200px",
                        textAlign: "center",
                        boxShadow: "0px 0px 8px rgba(0, 170, 255, 0.5)",
                        transition: "0.3s ease-in-out"
                    }}
                    onFocus={(e) => e.target.style.boxShadow = "0px 0px 15px #00aaff"}
                    onBlur={(e) => e.target.style.boxShadow = "0px 0px 8px rgba(0, 170, 255, 0.5)"}
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    style={{
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#222",
                        color: "#ffffff",
                        width: "100px",
                        textAlign: "center",
                        boxShadow: "0px 0px 8px rgba(0, 170, 255, 0.5)",
                        transition: "0.3s ease-in-out"
                    }}
                    onFocus={(e) => e.target.style.boxShadow = "0px 0px 15px #00aaff"}
                    onBlur={(e) => e.target.style.boxShadow = "0px 0px 8px rgba(0, 170, 255, 0.5)"}
                />
                <motion.button 
                    whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #00aaff" }} 
                    whileTap={{ scale: 0.9 }} 
                    onClick={addExpense} 
                    style={{
                        padding: "12px 18px",
                        borderRadius: "10px",
                        backgroundColor: "#00aaff",
                        border: "none",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                >
                    ➕ Add
                </motion.button>
            </motion.div>

            <motion.h2 
                initial={{ x: -50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.6 }}
                style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff" }}
            >
                📜 Expense List
            </motion.h2>
            
            <ul style={{ listStyle: "none", padding: "0" }}>
                {expenses.map((expense) => (
                    <motion.li 
                        key={expense._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 0px 15px #00aaff",
                            transition: { duration: 0.3 }
                        }}
                        transition={{ duration: 0.4 }}
                        style={{ 
                            backgroundColor: "#1e1e1e", 
                            padding: "12px", 
                            margin: "6px auto", 
                            width: "60%", 
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "#ffffff",
                            border: "1px solid #00aaff",
                            transition: "0.3s ease-in-out"
                        }}
                    >
                        <span>{expense.name} - ₹{expense.amount}</span>
                        <motion.button 
                            whileHover={{ scale: 1.1, backgroundColor: "#ff2222" }} 
                            whileTap={{ scale: 0.9 }} 
                            onClick={() => deleteExpense(expense._id)}
                            style={{
                                padding: "6px 12px",
                                borderRadius: "10px",
                                backgroundColor: "#ff4444",
                                border: "none",
                                color: "#fff",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                        >
                            ❌ Remove
                        </motion.button>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

export default App;
