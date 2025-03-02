import React, { useState } from "react";
import axios from "axios";
import "./ChatApp.css"; // ✅ Import CSS

const Chatbot: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChat = async () => {
    if (!query) return;
    setLoading(true);
    setResponse(""); // Clear previous response
    try {
      const res = await axios.post("http://localhost:5000/chat", { query });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">💬 SafeZone AI Chatbot</h1>
      <input
        type="text"
        className="chatbot-input"
        placeholder="Ask about an emergency or a historical disaster..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="chatbot-button" onClick={handleChat} disabled={loading}>
        {loading ? "Processing..." : "Ask AI"}
      </button>
      {response && (
        <div className="chatbot-response">
          <h2 className="text-lg font-semibold">AI Response:</h2>
          <p className="typing-effect">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
