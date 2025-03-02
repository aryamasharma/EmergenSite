import "./App.css";
import Chatbot from "./Chatbot";
import LandingPage from "./frontend/LandingPage";
import Navbar from "./frontend/NavBar";
import EventsPage from "./frontend/EventsPage";
import Settings from "./frontend/Settings";
import ParticlesComponent from "./frontend/particles";
import { Routes, Route } from "react-router-dom"; // ✅ Only import Routes, not Router

function App() {
  return (
    <div className="App">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Full-screen Particles Background */}
      <ParticlesComponent id="particles-bg" />

      {/* ✅ Main Content */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
