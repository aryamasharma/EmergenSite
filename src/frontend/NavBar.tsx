import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ Use useNavigate
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Hook for navigation

  // Function to scroll smoothly to AI Chatbot (even when not on Home)
  const scrollToChatbot = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/"); // ✅ First navigate to home
    setTimeout(() => {
      const chatbotSection = document.getElementById("chatbot-section");
      if (chatbotSection) {
        chatbotSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // ✅ Delay scroll to ensure the page is loaded
    setIsOpen(false);
  };

  // Function to scroll back to the top (Home) from any page
  const scrollToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/"); // ✅ First navigate to Home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // ✅ Ensure page transition is smooth
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">EmergenSite 🚨</div>

        {/* ✅ Desktop Navigation */}
        <div className="nav-links">
          <NavLink to="/" className="nav-item" onClick={scrollToTop}>
            Home
          </NavLink>
          <NavLink to="/" className="nav-item" onClick={scrollToChatbot}>
            AI Chatbot
          </NavLink>
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
          <NavLink to="/" className="mobile-item" onClick={scrollToTop}>
            Home
          </NavLink>
          <NavLink to="/" className="mobile-item" onClick={scrollToChatbot}>
            AI Chatbot
          </NavLink>
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
