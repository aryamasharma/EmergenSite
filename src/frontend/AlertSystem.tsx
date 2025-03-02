import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AlertSystem.css"; // ✅ Import the CSS file

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

  const [userId] = useState<string>(() => `user-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        () => {
          setError("⚠️ Geolocation not enabled. Alerts may not be verified.");
        }
      );
    } else {
      setError("⚠️ Geolocation is not supported by your browser.");
    }
  }, []);

  const sendAlert = async () => {
    if (!alert) {
      setError("⚠️ Please enter an alert description.");
      return;
    }

    setSubmitDisabled(true);

    try {
      const res = await axios.post<LogResponse>("http://localhost:5000/log", {
        type: "emergency-alert",
        message: alert,
        location,
        userId,
      });

      if (res.data.status === "rejected") {
        setError(res.data.message || "⚠️ Invalid alert.");
        setSubmitDisabled(false);
        return;
      }

      if (res.data.status === "helpline" && res.data.helpline) {
        setHelplineNumber(res.data.helpline);
        setShowHelpline(true);
      } else {
        setLogId(res.data.logId);
        setStatus(res.data.status);
        setShowPopup(true);
      }

      let waitTime = res.data.status === "helpline" ? 86400 : 3600;
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
      setError("⚠️ Failed to send alert.");
      setSubmitDisabled(false);
    }
  };

  return (
    <div className="alert-container">
      <h2 className="alert-title">📢 Verified Emergency Alerts</h2>
      {error && <p className="alert-error">{error}</p>}
      <input
        type="text"
        placeholder="Describe the emergency..."
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
        className="alert-input"
      />
      <button className="alert-button" onClick={sendAlert} disabled={submitDisabled}>
        {submitDisabled ? `Wait ${Math.floor(timeLeft! / 60)}m ${timeLeft! % 60}s` : "Send Alert"}
      </button>

      {showPopup && <p className="alert-success">✅ Alert has been sent!</p>}

      {showHelpline && (
        <div className="helpline-popup">
          🚨 **Need Help? Call:** <a href={`tel:${helplineNumber}`}>{helplineNumber}</a>
          <button className="helpline-close" onClick={() => setShowHelpline(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;
