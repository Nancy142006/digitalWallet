import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/sendmoney.css";
import Footer from "../components/Footer";


function SendMoney({ setActiveSection, setBalance}) {
  // Accept setBalance prop
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  // const navigate = useNavigate();

  const token = localStorage.getItem("token");

  //  Request OTP Function
  const requestOTP = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/request-otp",
        {email},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOtpSent(true);
      setMessage("✅ OTP sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Failed to send OTP");
    }
  };

  const handleSendMoney = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-money",
        { email, amount: Number(amount), otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response from server:", response.data);

      setBalance(response.data.newbalance);
      setMessage(response.data.message);
      setAmount("");
      setEmail("");
      setOtp("");
       setOtpSent(false); 
      setTimeout(() => setActiveSection("dashboard"), 1000);
    } catch (error) {
      console.error("Error:", error.response?.data);
      setMessage(error.response?.data?.message || "Transaction failed");
    }
  };

  return (
    <>
      <div className="sendmoney-container">
        <h2>Send Money</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSendMoney}>
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          {otpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}/*{setOtp(e.target.value)}*/
              required
            />
          )}
          {!otpSent ? (
            <button type="button" onClick={requestOTP}>
              Request OTP
            </button>
          ) : (
            <button type="submit">Send Money</button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SendMoney;
