import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./frontend/NavBar";
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
      <div className="flex flex-col items-center">
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
