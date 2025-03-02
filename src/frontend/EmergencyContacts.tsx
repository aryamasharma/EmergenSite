import React, { useState, useEffect } from "react";
import axios from "axios";

const EvacuationMap: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [shelterName, setShelterName] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // ✅ Load API key from .env

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = { lat: position.coords.latitude, lon: position.coords.longitude };
          setGeoLocation(loc);

          try {
            // ✅ Request evacuation route from backend
            const res = await axios.post("http://localhost:5000/evacuation-route", { location: loc });
            setRoute(res.data.route);
            setShelterName(res.data.shelter);
          } catch {
            setError("No active evacuation routes found.");
          }
        },
        () => setError("Geolocation is disabled. Enable location services.")
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-lg font-bold text-blue-400">🗺️ Evacuation Map</h2>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      {route ? (
        <>
          <p className="mt-2">🚶 Nearest Safe Shelter: <strong>{shelterName}</strong></p>
          <iframe
            width="100%"
            height="250"
            src={`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${geoLocation?.lat},${geoLocation?.lon}&destination=${shelterName}&mode=walking`}
            allowFullScreen
            className="mt-2 rounded-lg shadow-lg"
          ></iframe>
        </>
      ) : (
        <p className="mt-2">📍 Showing your current location.</p>
      )}
    </div>
  );
};

export default EvacuationMap;
