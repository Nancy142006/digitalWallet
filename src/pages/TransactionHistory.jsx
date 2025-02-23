import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/transactionhistory.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TransactionHistory = ({ setActiveSection }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTransactions(response.data);
      } catch (error) {
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }

      if (window.scrollY < lastScrollY) {
        setShowFooter(false); // Hide footer when scrolling up
      } else {
        setShowFooter(true); // Show footer when scrolling down
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle PDF Download
  const handleDownload = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/receipt/${transactionId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt_${transactionId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  // Handle View PDF
  const handleViewPDF = (transactionId) => {
    window.open(`http://localhost:5000/api/receipt/${transactionId}`, "_blank");
  };

  return (
    <>
      {showNavbar && <Navbar setActiveSection={setActiveSection} />}

      <div className="transaction-history">
        <h2>Transaction History</h2>

        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Receipt</th> 
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id}</td>
                  <td>{transaction.senderId?.name || "N/A"}</td>
                  <td>{transaction.recieverId?.name || "N/A"}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleViewPDF(transaction._id)}
                      className="btn view-btn"
                    >
                      View PDF
                    </button>
                    <button
                      onClick={() => handleDownload(transaction._id)}
                      className="btn download-btn"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showFooter && <Footer />}
    </>
  );
};

export default TransactionHistory;
