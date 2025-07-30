import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/responsive.css";
import "../assets/styles/Footer.css";
import logo from "../assets/images/logo.png";
// import youtube from "../assets/images/Youtube.png";
import facebook from "../assets/images/facebook.png";
import twitter from "../assets/images/twitter.png";
import instagram from "../assets/images/instagram.png";
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you! You've subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo-container">
          <div className="footer-logo">
            <a href="#">
              <img src={logo} alt="TraExCo Logo" />
              <span className="logo-text">TraExCo</span>
            </a>
          </div>
        </div>
        <div className="footer-top">
          <div className="footer-nav">
            <ul className="nav-list">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Tours</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-middle">
          <div className="footer-social">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 TraExCo. All rights reserved. | Designed by{" "}
            <a href="https://www.traexco.com">TraExCo Team</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
