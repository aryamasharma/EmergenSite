import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [query, setQuery] = useState("");
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChat = async (): Promise<void> => {
    if (!query) return;
    setLoading(true);

    try {
      // Call the AI chatbot
      const res = await axios.post<{ response: string }>("http://localhost:5000/chat", { query });
      setResponse(res.data.response);

      // Log the query securely using Midnight Blockchain
      await axios.post("http://localhost:5000/log", {
        type: "chat-query",
        message: query,
      });
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">SafeZone AI Chatbot</h1>
      <input
        type="text"
        className="border p-2 w-80 rounded-md"
        placeholder="Ask about an emergency or a historical disaster..."
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
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">AI Response:</h2>
          <p className="text-gray-700 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
