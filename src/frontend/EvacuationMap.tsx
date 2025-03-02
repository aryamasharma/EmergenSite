import React, { useState, useEffect } from "react";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EvacuationMap: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [shelter, setShelter] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const [error, setError] = useState<string>("");

  // ✅ Load Google Maps Script if Not Already Loaded
  useEffect(() => {
    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = { lat: position.coords.latitude, lon: position.coords.longitude };
          setGeoLocation(loc);

          try {
            // ✅ Request evacuation route from backend
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
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-lg font-bold text-blue-400">🗺️ Evacuation Map</h2>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      {geoLocation ? (
        <>
          <p className="mt-2">📍 Your Current Location: <strong>({geoLocation.lat}, {geoLocation.lon})</strong></p>

          {shelter ? (
            <>
              <p className="mt-2">🚶 Nearest Safe Shelter: <strong>{shelter.name}</strong></p>
              <iframe
                width="100%"
                height="250"
                src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${geoLocation.lat},${geoLocation.lon}&destination=${shelter.lat},${shelter.lon}&mode=walking`}
                allowFullScreen
                className="mt-2 rounded-lg shadow-lg"
              ></iframe>
            </>
          ) : (
            <iframe
              width="100%"
              height="250"
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${geoLocation.lat},${geoLocation.lon}`}
              allowFullScreen
              className="mt-2 rounded-lg shadow-lg"
            ></iframe>
          )}
        </>
      ) : (
        <p className="mt-2">📍 Detecting your location...</p>
      )}
    </div>
  );
};

export default EvacuationMap;
