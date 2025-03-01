import React, { useState, useEffect } from "react";
import axios from "axios";

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("YOUR_BLOCKCHAIN_BACKEND/alerts");
        setAlerts(res.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="p-4 bg-red-100 rounded-md">
      <h2 className="text-xl font-bold mb-2">Verified Emergency Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts available.</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} className="p-2 border-b">
            <p className="font-semibold">{alert.message}</p>
            <p className="text-sm text-gray-500">{alert.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EmergencyAlerts;
