import React, { useState, useEffect } from "react";
import axios from "axios";
import Chatbot from "../Chatbot";

const LandingPage: React.FC = () => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // Fetch real-time emergency notifications
    axios.get("http://localhost:5000/emergency-notifications")
      .then((res) => setAlerts(res.data.alerts))
      .catch((err) => console.error("Error fetching alerts:", err));

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setGeoLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
        () => console.error("Geolocation access denied.")
      );
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white p-6">
      {/* 🚨 Emergency Notifications */}
      <div className="bg-red-600 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">🚨 Emergency Alerts</h2>
        {alerts.length > 0 ? (
          alerts.map((alert, idx) => <p key={idx} className="text-sm">{alert}</p>)
        ) : (
          <p className="text-sm">No active emergency alerts.</p>
        )}
      </div>

      {/* 🗺️ Map for Evacuation Routes */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
        <h2 className="text-lg font-bold">🗺️ Evacuation Routes</h2>
        {geoLocation ? (
          <iframe
            width="100%"
            height="250"
            src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${geoLocation.lat},${geoLocation.lon}&destination=nearest+shelter&mode=driving`}
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-sm">Enable location to see evacuation routes.</p>
        )}
      </div>

      {/* 💬 AI Chatbot */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
        <Chatbot />
      </div>

      {/* 🎙️ Voice Assistant (Placeholder for Smalltalk) */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
        <h2 className="text-lg font-bold">🎙️ Voice Assistant</h2>
        <p className="text-sm">Press & hold the button to ask for emergency help.</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Hold to Speak</button>
      </div>

      {/* 📞 Emergency Contact Button */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4 flex justify-between">
        <h2 className="text-lg font-bold">📞 Emergency Contacts</h2>
        <a href="tel:911" className="bg-red-500 text-white px-4 py-2 rounded-md">Call 911</a>
      </div>
    </div>
  );
};

export default LandingPage;
