import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/nav.css";

function Navbar({ setActiveSection, userId, refreshTrigger }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response?.data?.user);
        alert("response:", response);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    if (userId) fetchUser();
  }, [userId, refreshTrigger]); // ✅ Re-fetch when refreshTrigger updates

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="Head">
        <h1>💰 Digital Wallet</h1>
      </div>
      <div className="button-container">
        <ul>
          {userId ? (
            <>
              <li>
                <button onClick={() => setActiveSection("dashboard")}>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("sendMoney")}
                >
                  Send Money
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("deposit")}
                >
                  Deposit
                </button>
              </li>

              <li>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li>
                <img
                  src={
                    user
                      ? `http://localhost:5000/${user.profilePicture}`
                      : "/default-avatar.png"
                  }
                  alt="Profile"
                  className="profile-avatar"
                  onClick={() => setActiveSection("profileSettings")}
                  style={{ cursor: "pointer" }}
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={() => navigate("/signin")}>Sign In</button>
              </li>
              <li>
                <button onClick={() => navigate("/login")}>Login</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
