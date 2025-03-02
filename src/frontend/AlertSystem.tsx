import React, { useState } from "react";
import axios from "axios";

const AlertSystem: React.FC = () => {
  const [alert, setAlert] = useState<string>("");
  const [logId, setLogId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sendAlert = async () => {
    if (!alert) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/log", {
        type: "emergency-alert",
        message: alert,
        userId: "user123", // ✅ Simulate a unique user
        location: { lat: 40.7128, lon: -74.0060 }, // ✅ Simulated location (Replace with real geolocation)
      });

      if (res.data.response.startsWith("🚫")) {
        setError(res.data.response);
      } else {
        setLogId(res.data.logId);
      }
    } catch (error) {
      console.error("Logging error:", error);
      setError("❌ Unable to send alert. Try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-red-400">🚨 Report an Emergency</h2>
      <input
        type="text"
        placeholder="Describe the emergency..."
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
        className="border p-2 w-full mt-2 rounded-md bg-gray-900 text-white"
      />
      <button
        className={`bg-red-600 text-white p-2 mt-2 rounded-md w-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={sendAlert}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Send Alert"}
      </button>
      {error && <p className="text-red-400 mt-2">{error}</p>}
      {logId && <p className="text-green-400 mt-2">✅ Alert Sent (ID: {logId})</p>}
    </div>
  );
};

export default AlertSystem;
