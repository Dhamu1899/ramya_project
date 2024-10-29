import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">INFY HOSPITAL</div>
      <div className="navbar-links">
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Pages/About">About</Link></li>
          <li><Link to="/Pages/Service">Service</Link></li>
          <li><Link to="/Pages/Contact">Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-auth">
        <ul className="navbar-menu">
          <li><Link to="/patientlogin">Patient Login</Link></li>
          <li><Link to="/adminlogin">Admin Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
