import React, { useState, useEffect } from "react";
import axios from "axios";

interface LogResponse {
  logId: string;
  status: string;
  message?: string;
  helpline?: string;
}

const AlertSystem: React.FC = () => {
  const [alert, setAlert] = useState<string>("");
  const [logId, setLogId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showHelpline, setShowHelpline] = useState<boolean>(false);
  const [helplineNumber, setHelplineNumber] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [userId, setUserId] = useState<string>(() => `user-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        () => {
          setError("Geolocation not enabled. Alerts may not be verified.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const sendAlert = async () => {
    if (!alert) {
      setError("Please enter an alert description.");
      return;
    }

    setSubmitDisabled(true); // 🚫 Disable submit button immediately

    try {
      const res = await axios.post<LogResponse>("http://localhost:5000/log", {
        type: "emergency-alert",
        message: alert,
        location,
        userId,
      });

      if (res.data.status === "rejected") {
        setError(res.data.message || "Invalid alert.");
        setSubmitDisabled(false); // ✅ Re-enable button if request is rejected
        return;
      }

      if (res.data.status === "helpline" && res.data.helpline) {
        // 🚨 Show the helpline pop-up when a security alert is reported
        setHelplineNumber(res.data.helpline);
        setShowHelpline(true);
      } else {
        setLogId(res.data.logId);
        setStatus(res.data.status);
        setShowPopup(true);
      }

      // ⏳ Set timer to re-enable submit button
      let waitTime = res.data.status === "helpline" ? 86400 : 3600; // Security alerts: 24h, General alerts: 1h
      setTimeLeft(waitTime);

      const countdown = setInterval(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
        if (waitTime <= 0) {
          setSubmitDisabled(false);
          clearInterval(countdown);
        }
        waitTime--;
      }, 1000);
    } catch (error) {
      console.error("Logging error:", error);
      setError("Failed to send alert.");
      setSubmitDisabled(false); // ✅ Re-enable button on error
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Verified Emergency Alerts</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Describe the emergency..."
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        className={`bg-red-500 text-white p-2 mt-2 ${submitDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={sendAlert}
        disabled={submitDisabled} // ✅ Button disabled after first request
      >
        {submitDisabled ? `Wait ${Math.floor(timeLeft! / 60)}m ${timeLeft! % 60}s` : "Send Alert"}
      </button>

      {logId && <p>Alert logged with ID: {logId} (Status: {status})</p>}

      {/* ✅ Pop-Up Confirmation */}
      {showPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-lg">
          ✅ Alert has been sent!
        </div>
      )}

      {/* ✅ Helpline Pop-Up */}
      {showHelpline && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded shadow-lg">
          🚨 **Need Help? Call:**{" "}
          <a href={`tel:${helplineNumber}`} className="underline text-yellow-300 font-bold">
            {helplineNumber}
          </a>
          <button
            className="ml-4 text-white bg-red-600 px-2 py-1 rounded"
            onClick={() => setShowHelpline(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;
