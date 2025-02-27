import React from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css"; // Import CSS file

function Home() {
  return (
    <>
    <Navbar/>
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
