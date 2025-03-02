import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to scroll smoothly to AI Chatbot
  const scrollToChatbot = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const chatbotSection = document.getElementById("chatbot-section");
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu
    }
  };

  // Function to scroll back to the top (Home)
  const scrollToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false); // Close mobile menu
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">EmergenSite 🚨</div>

        {/* ✅ Desktop Navigation */}
        <div className="nav-links">
          <a href="/" className="nav-item" onClick={scrollToTop}>
            Home
          </a>
          <a href="/" className="nav-item" onClick={scrollToChatbot}>
            AI Chatbot
          </a>
          <NavLink to="/EventsPage" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Events
          </NavLink>
          <NavLink to="/Settings" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Settings
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
          <a href="/" className="mobile-item" onClick={scrollToTop}>
            Home
          </a>
          <a href="/" className="mobile-item" onClick={scrollToChatbot}>
            AI Chatbot
          </a>
          <NavLink to="/alerts" className="mobile-item" onClick={() => setIsOpen(false)}>
            Alerts
          </NavLink>
          <NavLink to="/contacts" className="mobile-item" onClick={() => setIsOpen(false)}>
            Emergency Contacts
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
