// src/AlertSystem.tsx
import React, { useState } from "react";
import axios from "axios";

interface LogResponse {
  logId: string;
}

const AlertSystem: React.FC = () => {
  const [alert, setAlert] = useState<string>("");
  const [logId, setLogId] = useState<string>("");

  const sendAlert = async () => {
    if (!alert) return;
    try {
      const res = await axios.post<LogResponse>("http://localhost:5000/log", {
        type: "emergency-alert",
        message: alert,
      });
      setLogId(res.data.logId);
    } catch (error) {
      console.error("Logging error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Blockchain-Verified Alerts</h2>
      <input
        type="text"
        placeholder="Enter emergency alert..."
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
        className="border p-2 w-full"
      />
      <button className="bg-red-500 text-white p-2 mt-2" onClick={sendAlert}>
        Send Alert
      </button>
      {logId && <p>Alert logged securely with ID: {logId}</p>}
    </div>
  );
};

export default AlertSystem;