import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import CSS file

function Home() {

  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div className="Head">
          <h1>💰 Digital Wallet</h1>
        </div>
        <div className="button-container">
          <ul>
            <li>
              <button onClick={() => navigate("/signin")}>Sign In</button>
            </li>
            <li>
              <button onClick={() => navigate("/login")}>Login</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="home-container">
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
        </main>
      </div>
    </>
  );
}

export default Home;
