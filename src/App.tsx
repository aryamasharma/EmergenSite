import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import React from "react";
import Chatbot from "./Chatbot";
import AlertSystem from "./frontend/AlertSystem";
import LandingPage from "./frontend/LandingPage";

function HomePage() {
  return (
    <div className="relative p-4">
      <h1 className="text-3xl font-bold text-center p-4">SafeZone AI</h1>
      <div className="flex flex-col items-center">
        
        <LandingPage />

      {/* Emergency Alert Banner */}
      <div className="bg-yellow-300 text-black text-center p-2 font-bold">
        🚨 Emergency Alerts Will Appear Here 🚨
      </div>

      {/* Layout */}
      <div className="flex flex-row h-screen p-4 space-x-4">
        {/* Left Column: Chatbot */}
        <div className="w-1/3 space-y-4">
          <button className="bg-red-600 text-white p-3 w-full text-lg font-bold">
            📞 Call 911
          </button>
          <Chatbot />
        </div>

        {/* Right Column: Alert System */}
        <div className="w-2/3">
          <AlertSystem />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
