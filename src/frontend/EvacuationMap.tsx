import React, { useState, useEffect } from "react";
import axios from "axios";

const EvacuationMap: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [shelterName, setShelterName] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lon: position.coords.longitude };
          setGeoLocation(loc);

          // Request evacuation route
          axios.post("http://localhost:5000/evacuation-route", { location: loc })
            .then((res) => {
              setRoute(res.data.route);
              setShelterName(res.data.shelter);
            })
            .catch(() => setError("No active evacuation routes."));
        },
        () => setError("Geolocation is disabled. Cannot show evacuation routes.")
      );
    }
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold text-blue-400">🗺️ Evacuation Map</h2>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      {route ? (
        <>
          <p className="mt-2">🚶 Nearest Safe Shelter: <strong>{shelterName}</strong></p>
          <iframe
            width="100%"
            height="250"
            src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${geoLocation?.lat},${geoLocation?.lon}&destination=${shelterName}&mode=walking`}
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
