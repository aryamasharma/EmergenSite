import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./frontend/NavBar";
import Chatbot from "./Chatbot";
import AlertSystem from "./frontend/AlertSystem";
import LandingPage from "./frontend/LandingPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/alerts" element={<AlertSystem />} />
      </Routes>
    </>
  );
}

export default App;
