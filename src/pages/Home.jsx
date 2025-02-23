import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import "../styles/home.css"; // Import CSS file

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>💰 Digital Wallet</h1>
        <ul>
          <li>
            <button
              onClick={() => navigate("/login")}
              className="btn login-btn"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="btn signup-btn"
            >
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
      <header>
        <h1>Digital Wallet</h1>
      </header>
      <main>
        <section className="info-section">
          <h2>Welcome to Your Digital Wallet</h2>
          <p>
            Manage your transactions easily and securely. Our digital wallet
            provides seamless payment solutions, instant transfers, and
            real-time balance tracking.
          </p>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default Home;
