import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

function Navbar({ setActiveSection, userId }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState(null);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Hide when scrolling down
      } else {
        setVisible(true); // Show when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
    window.location.reload();
  };

  return (
    <nav className={`navbar ${visible ? "visible" : "hidden"}`}>
      <div className="Head">
        <h1>💰 Digital Wallet</h1>
      </div>
      <ul>
        <li>
          <button
            className="click"
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className="click"
            onClick={() => setActiveSection("sendMoney")}
          >
            Send Money
          </button>
        </li>
        <li>
          <button className="click" onClick={() => setActiveSection("deposit")}>
            Deposit
          </button>
        </li>
        <li>
          <button
            className="click"
            onClick={() => setActiveSection("profileSettings")}
          >
            Profile Settings
          </button>
        </li>
        <li>
          <img
            src={
              user?.profilePicture
                ? `http://localhost:5000/uploads/${user.profilePicture}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="profile-avatar"
            onClick={() => setActiveSection("profileSettings")} // Click avatar to go to settings
            style={{ cursor: "pointer" }}
          />
        </li>
        <li>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
