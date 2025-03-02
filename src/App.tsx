import { useState } from "react";
import "./App.css";
import React from "react";
import Chatbot from "./Chatbot";
import AlertSystem from "./frontend/AlertSystem";
import LandingPage from "./frontend/LandingPage";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center">
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
