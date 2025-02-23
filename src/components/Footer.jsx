// import React from "react";
// import "../styles/footer.css";

// function Footer() {
//   return (
//     <div className="hidden">
//     <footer className="footer">
//       <p>© {new Date().getFullYear()} Digital Wallet. All rights reserved.</p>
//     </footer>
//     </div>
//   );
// }

// export default Footer;


import React, { useState, useEffect } from "react";
import "../styles/footer.css";

function Footer() {
  const [visible, setVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setVisible(false); // Hide when scrolling up
      } else {
        setVisible(true); // Show when scrolling down
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${visible ? "visible" : "hidden"}`}>
      <p>© {new Date().getFullYear()} Digital Wallet. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
