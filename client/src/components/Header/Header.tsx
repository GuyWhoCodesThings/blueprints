import React from 'react';
import './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <h1 className="header-title">Blueprints</h1>
        <nav className="nav">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/" className="nav-link">
            Blueprints
          </a>
          <a href="/docs" className="nav-link">
            Documentation
          </a>
          <a href="/about" className="nav-link">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
