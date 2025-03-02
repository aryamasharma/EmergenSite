import React from "react";
import Navbar from "./NavBar";
import AlertSystem from "./AlertSystem";
import EvacuationMap from "./EvacuationMap";
import "./LandingPage.css";
import Chatbot from "../Chatbot";

const LandingPage: React.FC = () => {
  return (
    <div className="main-container">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Emergency AI Assistance, <span className="highlight">Anywhere, Anytime</span>
          </h1>
          <p className="hero-subtitle">
            AI-driven emergency response, real-time alerts, and disaster preparedness at your fingertips.
          </p>
          <a href="/chatbot" className="cta-button">
            🚀 Ask AI for Help
          </a>
        </div>
      </section>

      {/* ✅ Emergency Alert Section - Moved Up */}
      <div className="alert-box">
        🚨 No active emergency alerts at this time. Stay safe! 🚨
      </div>

      {/* ✅ Features Section - Centered with Padding */}
      <section className="features-grid" style={{ display: "flex", justifyContent: "center", gap: "30px", padding: "20px" }}>
        <div className="feature-card" style={{ flex: "1", maxWidth: "500px", textAlign: "center" }}>
          <EvacuationMap />
        </div>
        <div className="feature-card" style={{ flex: "1", maxWidth: "500px", textAlign: "center" }}>
          <AlertSystem />
        </div>
      </section>

      {/* ✅ Chatbot Section - Moved Further Down */}
      <div id="chatbot-section" className="chatbot-box" style={{ marginTop: "60px", textAlign: "center" }}>
        <Chatbot />
      </div>

      {/* ✅ Emergency Contacts */}
      <div className="contact-section">
        <h2 className="contact-title">📞 Emergency Contacts</h2>
        <a href="tel:911" className="call-911">Call 911</a>
      </div>
    </div>

  );
};

export default LandingPage;
