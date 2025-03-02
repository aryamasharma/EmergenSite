import React, { useState } from "react";
import axios from "axios";

const AlertSystem: React.FC = () => {
  const [alert, setAlert] = useState<string>("");
  const [logId, setLogId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sendAlert = async () => {
    if (!alert) return;
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:5000/log", {
        type: "emergency-alert",
        message: alert,
        userId: "test_user", // Simulated user ID
      });

      if (res.data.status === "helpline") {
        setError(`Helpline: ${res.data.helpline}`);
      } else {
        setSuccess("✅ Alert has been sent successfully!");
        setLogId(res.data.logId);
      }
    } catch (error) {
      setError("🚫 Unable to send alert. Try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-blue-400">🚨 Report an Emergency</h2>
      <input
        type="text"
        placeholder="Describe the emergency..."
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
        className="border p-2 w-full rounded-md bg-gray-700 text-white mt-2"
      />
      <button
        className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md w-full disabled:bg-gray-500"
        onClick={sendAlert}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Alert"}
      </button>
      {success && <p className="mt-2 text-green-400">{success}</p>}
      {error && <p className="mt-2 text-red-400">{error}</p>}
      {logId && <p className="mt-2 text-gray-300">Alert logged with ID: {logId}</p>}
    </div>
  );
};

export default AlertSystem;
