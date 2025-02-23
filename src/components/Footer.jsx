import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Digital Wallet. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
