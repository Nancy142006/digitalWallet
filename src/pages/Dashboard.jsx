import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // effect depends on navigate, meaning if navigate changes, the effect runs again
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // retrieves the token from browser's localStorage
        const token = localStorage.getItem("token");
        // checking if Token Exists
        if (!token) {
          // navigate("/login");
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
        setUser(response.data.user);
        setBalance(response.data.balance);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        // navigate("/login");
      }
    };

    // This ensures the dashboard data is fetched as soon as the component loads.
    fetchDashboard();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h1>Welcome, {user?.name} 👋</h1>
        <p>Email: {user?.email}</p>
        <p>Wallet ID: {user?._id}</p>
        <h2>Balance: ${balance}</h2>

        <button className="send-money">Send Money</button>
        <button className="deposit-money">Deposit Money</button>

        <h3>Transaction History</h3>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <li key={index}>
                {tx.type}: ${tx.amount} on{" "}
                {new Date(tx.date).toLocaleDateString()}
              </li>
            ))
          ) : (
            <p>No transactions yet.</p>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
