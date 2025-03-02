import React from "react";
<<<<<<< Updated upstream
import AlertSystem from "./AlertSystem";
import EvacuationMap from "./EvacuationMap";
import NavBar from "./NavBar";

const LandingPage: React.FC = () => {
  return (
    <>
    <NavBar />
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="bg-red-600 p-4 text-center text-lg font-bold shadow-lg">
        🚨 No active emergency alerts at this time. 🚨
=======
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

      {/* ✅ Chatbot Section */}
      <div className="chatbot-box">
        <h2 className="chatbot-title">💬 AI Chatbot Assistance</h2>
        <Chatbot />
>>>>>>> Stashed changes
      </div>

      {/* ✅ Emergency Alert Section */}
      <div className="alert-box">
        🚨 No active emergency alerts at this time. Stay safe! 🚨
      </div>

      {/* ✅ Features Section */}
      <section className="features-grid">
        <div className="feature-card">
          <h2>🚑 AI Emergency Chatbot</h2>
          <p>Get real-time AI guidance during emergencies.</p>
        </div>
        <div className="feature-card">
          <h2>🗺️ Evacuation Map</h2>
          <EvacuationMap />
        </div>
        <div className="feature-card">
          <h2>📢 Live Alerts</h2>
          <AlertSystem />
        </div>
      </section>

      {/* ✅ Emergency Contacts */}
      <div className="contact-section">
        <h2 className="contact-title">📞 Emergency Contacts</h2>
        <p>For immediate assistance, contact:</p>
        <a href="tel:911" className="call-911">Call 911</a>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
