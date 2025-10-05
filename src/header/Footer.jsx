import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p className="footer-logo">CARTIFY</p>
          <p style={{ color: '#bdc3c7', fontSize: '0.9rem', marginTop: '-0.5rem' }}>
            Creating timeless memories
          </p>
        </div>
        
        <div className="footer-contact">
          <p><strong>Name:</strong> Arpit Kumar</p>
          <p><strong>Email:</strong> arpitkumar9390@gmail.com</p>
          <p><strong>Phone:</strong> +91 91517 57309</p>
        </div>
        
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/collection">Collection</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
        
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Facebook">
            <i>FB</i>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <i>IG</i>
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <i>TW</i>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <i>IN</i>
          </a>
        </div>
        
        <p className="footer-text">
          © { new Date().getFullYear() } CARTIFY. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;