import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";
import { FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Deposit from "./Deposit";
import SendMoney from "./SendMoney";
import TransactionHistory from "./TransactionHistory";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <>
      {/* ✅ Navbar Always Visible */}
      <Navbar setActiveSection={setActiveSection} userId={user?._id} refreshTrigger={refreshTrigger} />

      {/* ✅ Conditionally Render Sections */}
      <div className="content-container">
        {activeSection === "sendMoney" ? (
          <SendMoney setActiveSection={setActiveSection} setBalance={setBalance} />
        ) : activeSection === "deposit" ? (
          <Deposit setActiveSection={setActiveSection} setBalance={setBalance} />
        ) : activeSection === "transactionHistory" ? (
          <TransactionHistory userId={user?._id} setActiveSection={setActiveSection} />
        ) : (
          // ✅ Default Dashboard View
          <div className="dashboard-container">
            <div className="details">
              <h1>Welcome, {user?.name}</h1>
              <p>Email: {user?.email}</p>
            </div>
            <div className="m-detail">
              <p>Wallet ID: {user?._id}</p>
              <h2>Balance: ${balance}</h2>
            </div>

            {/* ✅ Dashboard Cards */}
            <div className="card-container">
              <div className="card" onClick={() => setActiveSection("sendMoney")}>
                <FaMoneyBillWave className="icon" />
                <p>Send Money</p>
              </div>
              <div className="card" onClick={() => setActiveSection("deposit")}>
                <FaPiggyBank className="icon" />
                <p>Deposit</p>
              </div>
              <div className="card" onClick={() => setActiveSection("transactionHistory")}>
                <FaMoneyBillTransfer className="icon" />
                <p>Transaction History</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
