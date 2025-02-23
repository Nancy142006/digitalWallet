import React, { useState } from "react";
import axios from "axios";
import "../styles/deposit.css"
import Footer from "../components/Footer";


function Deposit({setActiveSection, setBalance}) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/deposit", //converts amount to number, ensures it's not a string
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(response.data.newbalance);
      setMessage(response.data.message);
      setTimeout(() => setActiveSection("dashboard"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <>
      <div className="deposit-container">
        <h2>Deposit Money</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleDeposit}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Deposit</button>
        </form>
        
      </div>
      <Footer />
    </>
  );
}

export default Deposit;
