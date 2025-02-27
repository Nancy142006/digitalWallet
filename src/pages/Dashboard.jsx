import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";
import { FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Deposit from "./Deposit";
import SendMoney from "./SendMoney";
import TransactionHistory from "./TransactionHistory";
import ProfileSettings from "./ProfileSettings";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  // effect depends on navigate, meaning if navigate changes, the effect runs again
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // retrieves the token from browser's localStorage
        const token = localStorage.getItem("token");
        // checking if Token Exists
        if (!token) {
          navigate("/login");
          return; //stops further execution
        }

        // sending API request to fetch data
        // It adds an Authorization header to an API request.
        // The server will use this token to verify if the user is authenticated.
        const response = await axios.get(
          /* sends an authenticated GET request to */ "http://localhost:5000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
            /*headers: specifies the HTTP headers for the request, provides additionsl info about the request
          {Authorization:...}: sets the Authorization header
          `Bearer ${token}`: template literal, inserts the user's token dynamically into the string
          Bearer: token type, tells server that we are sending JWT */
          }
        );

        // storing the response data
        // console.log("Dashboard API Response", response.data);
        setUser(response.data.user);
        setBalance(response.data.balance);
        // setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        navigate("/login");
      }
    };

    // This ensures the dashboard data is fetched as soon as the component loads.
    fetchDashboard();
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove token from localStorage
  //   navigate("/login"); // Redirect user to the login page
  //   window.location.reload(); //Ensures clean logout
  // };

  return (
    <>
      {/* ✅ Navbar Always Visible */}
      <Navbar
        setActiveSection={setActiveSection}
        userId={user?._id}
        refreshTrigger={refreshTrigger}
      />

      {/* ✅ Conditionally Render Sections */}
      <div className="content-container">
        {activeSection === "sendMoney" ? (
          <SendMoney
            setActiveSection={setActiveSection}
            setBalance={setBalance}
          />
        ) : activeSection === "deposit" ? (
          <Deposit
            setActiveSection={setActiveSection}
            setBalance={setBalance}
          />
        ) : activeSection === "transactionHistory" ? (
          <TransactionHistory setActiveSection={setActiveSection} />
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
              <div
                className="card"
                onClick={() => setActiveSection("sendMoney")}
              >
                <FaMoneyBillWave className="icon" />
                <p>Send Money</p>
              </div>
              <div className="card" onClick={() => setActiveSection("deposit")}>
                <FaPiggyBank className="icon" />
                <p>Deposit</p>
              </div>
              <div
                className="card"
                onClick={() => setActiveSection("transactionHistory")}
              >
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
