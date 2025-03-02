import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo on the left */}
        <div className="logo">SafeZone AI 🚨</div>

        {/* Navigation Links - centered, extending to right */}
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }>
            Home
          </NavLink>
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
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-menu">
          <NavLink
            to="/"
            className="mobile-item"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
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
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;