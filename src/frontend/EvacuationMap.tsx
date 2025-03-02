import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EvacuationMap.css"; // ✅ Import CSS
import MapComponent from "./MapComponent"; // ✅ Use only Leaflet

const EvacuationMap: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [shelter, setShelter] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const [error, setError] = useState<string>("");

  // ✅ Get User's Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = { lat: position.coords.latitude, lon: position.coords.longitude };
          setGeoLocation(loc);

          try {
            const res = await axios.post("http://localhost:5000/evacuation-route", { location: loc });

            if (res.data.shelter) {
              setShelter({
                lat: res.data.shelter.lat,
                lon: res.data.shelter.lon,
                name: res.data.shelter.name,
              });
            } else {
              setError("⚠️ No active evacuation shelters found.");
            }
          } catch (err) {
            console.error("Error fetching evacuation route:", err);
            setError("⚠️ Could not fetch evacuation route.");
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setError("⚠️ Geolocation is disabled or not supported.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("⚠️ Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="evacuation-map">
      <h2 className="evacuation-title">🗺️ Evacuation Map</h2>

      {error && <p className="evacuation-error">{error}</p>}

      {/* ✅ Use Only Leaflet for Maps */}
      <MapComponent userLocation={geoLocation} shelterLocation={shelter} />
    </div>
  );
};

export default EvacuationMap;
