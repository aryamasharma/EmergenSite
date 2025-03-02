import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setGeoLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
        () => console.error("Geolocation access denied.")
      );
    }
  }, []);

  const handleChat = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        userId: "test_user", // Simulate a user ID (use real user authentication if needed)
        query,
        location: geoLocation, // Send location if available
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">SafeZone AI Chatbot</h1>
      <input
        type="text"
        className="border p-2 w-80 rounded-md bg-gray-700 text-white"
        placeholder="Ask something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
        onClick={handleChat}
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask AI"}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-800 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">AI Response:</h2>
          <p className="text-gray-200 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
