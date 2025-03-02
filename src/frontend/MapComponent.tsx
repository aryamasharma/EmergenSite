import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing Leaflet marker icon
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const defaultPosition: [number, number] = [40.7128, -74.006]; // New York

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => setPosition(defaultPosition) // Use default if denied
    );
  }, []);

  return (
    <MapContainer
      center={position ?? defaultPosition} // ✅ Ensures `center` is never undefined
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position ?? defaultPosition} icon={customIcon}>
        <Popup>{position ? "Your Location" : "Default Location (New York)"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
