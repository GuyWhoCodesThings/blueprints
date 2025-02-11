import React from 'react';
import './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="footer-text">&copy; {new Date().getFullYear()} Blueprints. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
