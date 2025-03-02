import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* ✅ Logo */}
        <div className="logo">EmergenSite 🚨</div>

        {/* ✅ Desktop Navigation */}
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Home
          </NavLink>
<<<<<<< Updated upstream
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }>
          </NavLink>
          <NavLink to="./Chatbot" className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }>
            AI Chatbot
          </NavLink>
          <NavLink to="/EventsPage" className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }>
            Events
          </NavLink>
          <NavLink to="/Settings" className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }>
            Settings
=======
          <NavLink to="/chatbot" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            AI Chatbot
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Alerts
          </NavLink>
          <NavLink to="/contacts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Emergency Contacts
>>>>>>> Stashed changes
          </NavLink>
        </div>

        {/* ✅ Mobile Menu Button */}
        <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
        </div>
      </div>

      {/* ✅ Mobile Navigation Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <NavLink to="/" className="mobile-item" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
<<<<<<< Updated upstream
          <NavLink
            to="./Chatbot"
            className="mobile-item"
            onClick={() => setIsOpen(false)}
          >  
          AI Chatbot
          </NavLink>
          Events
          <NavLink
            to="/EventsPage"
            className="mobile-item"
            onClick={() => setIsOpen(false)}
          >
          </NavLink>
            Settings
          <NavLink
            to="/Settings"
            className="mobile-item"
            onClick={() => setIsOpen(false)}
          >
=======
          <NavLink to="/chatbot" className="mobile-item" onClick={() => setIsOpen(false)}>
            AI Chatbot
          </NavLink>
          <NavLink to="/alerts" className="mobile-item" onClick={() => setIsOpen(false)}>
            Alerts
          </NavLink>
          <NavLink to="/contacts" className="mobile-item" onClick={() => setIsOpen(false)}>
            Emergency Contacts
>>>>>>> Stashed changes
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
