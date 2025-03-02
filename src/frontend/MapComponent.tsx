import React, { useEffect, useState } from "react";
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

// Define Props
interface MapComponentProps {
  userLocation: { lat: number; lon: number } | null;
  shelterLocation: { lat: number; lon: number; name: string } | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ userLocation, shelterLocation }) => {
  const defaultPosition: [number, number] = [39.6741, -75.7513]; // Default: New York
  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  useEffect(() => {
    if (userLocation) {
      setPosition([userLocation.lat, userLocation.lon]);
    }
  }, [userLocation]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      {/* ✅ OpenStreetMap Tiles (No API Key Needed) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 📍 User Location Marker */}
      <Marker position={position} icon={customIcon}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* 🏠 Shelter Location Marker (if available) */}
      {shelterLocation && (
        <Marker position={[shelterLocation.lat, shelterLocation.lon]} icon={customIcon}>
          <Popup>Nearest Safe Shelter: {shelterLocation.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
