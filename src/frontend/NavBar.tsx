import { Routes, Route } from "react-router-dom";
import Chatbot from "../Chatbot";
import LandingPage from "./LandingPage";
// import Settings from "./Settings";
// import EventsPage from "./EventsPage";

const HomeBar: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        {/* <Route path="/timeline" element={<EventsPage />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </div>
  );
};

export default HomeBar;
