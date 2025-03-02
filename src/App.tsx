import { useState } from "react";
import "./App.css";
import React from "react";
import Chatbot from "./Chatbot";
import AlertSystem from "./frontend/AlertSystem";
import LandingPage from "./frontend/LandingPage";
import Navbar from "./frontend/NavBar";
import EventsPage from "./frontend/EventsPage";
import Settings from "./frontend/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
        <div className="flex flex-col items-center">
          <LandingPage />
        </div>
      </div>
  );
}

export default App;
