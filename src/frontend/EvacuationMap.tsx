import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EvacuationMap.css"; // ✅ Import CSS

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EvacuationMap: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [shelter, setShelter] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!document.querySelector("#google-maps-script")) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

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
        () => setError("⚠️ Geolocation is disabled. Enable location services."),
        { enableHighAccuracy: true }
      );
    } else {
      setError("⚠️ Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="evacuation-map">
      <h2 className="evacuation-title">🗺️ Evacuation Map</h2>

      {error && <p className="evacuation-error">{error}</p>}

      {geoLocation ? (
        <>
          <p className="evacuation-info">
            📍 Your Current Location: <strong>({geoLocation.lat}, {geoLocation.lon})</strong>
          </p>

          {shelter ? (
            <>
              <p className="evacuation-info">
                🚶 Nearest Safe Shelter: <strong>{shelter.name}</strong>
              </p>
              <iframe
                src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${geoLocation.lat},${geoLocation.lon}&destination=${shelter.lat},${shelter.lon}&mode=walking`}
                allowFullScreen
                className="evacuation-map-iframe"
              ></iframe>
            </>
          ) : (
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${geoLocation.lat},${geoLocation.lon}`}
              allowFullScreen
              className="evacuation-map-iframe"
            ></iframe>
          )}
        </>
      ) : (
        <p className="evacuation-info">📍 Detecting your location...</p>
      )}
    </div>
  );
};

export default EvacuationMap;