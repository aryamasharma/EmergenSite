<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { Client } from "@googlemaps/google-maps-services-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Initialize Google Maps API Client
const googleMapsClient = new Client({});

// ✅ Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Store conversation history per user
const userConversations = {}; // { userId: { history: [previous messages] } }

// ✅ Function to get nearest evacuation space
async function getNearestEvacuation(location) {
  try {
    const shelterResponse = await googleMapsClient.placesNearby({
      params: {
        location: `${location.lat},${location.lon}`,
        radius: 5000, // Search in a 5km radius
        type: "shelter",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    if (!shelterResponse.data.results.length) {
      return "🚫 No nearby shelters found. Try checking official evacuation centers.";
    }

    const nearestShelter = shelterResponse.data.results[0];

    return `🛑 The nearest evacuation space is **${nearestShelter.name}** located at **${nearestShelter.vicinity}**. You can find directions here: https://www.google.com/maps/dir/?api=1&destination=${nearestShelter.geometry.location.lat},${nearestShelter.geometry.location.lng}`;
  } catch (error) {
    console.error("Error fetching nearest evacuation space:", error);
    return "🚫 Unable to fetch evacuation spaces at this time.";
  }
}

// ✅ AI Chatbot API Route (Now Handles Evacuation Queries)
app.post("/chat", async (req, res) => {
  try {
    const { userId, query, location } = req.body;
    if (!query) return res.status(400).json({ response: "Query is required." });

    // Initialize user conversation history if not existing
    if (!userConversations[userId]) {
      userConversations[userId] = { history: [] };
    }

    let aiResponse = "";

    // 🔍 If the user asks for "nearest evacuation space"
    if (query.toLowerCase().includes("nearest evacuation space") || query.toLowerCase().includes("where can i evacuate")) {
      if (!location) {
        aiResponse = "📍 Please provide your location so I can find the nearest evacuation space for you.";
      } else {
        aiResponse = await getNearestEvacuation(location);
      }
    } 
    // 🔍 If the user asks for weather
    else if (query.toLowerCase().includes("weather") && !location) {
      aiResponse = "📍 Please provide your location so I can check the weather for you.";
    } 
    else if (query.toLowerCase().includes("weather") && location) {
      aiResponse = await getWeather(location);
    } 
    else {
      // Use stored chat history to make responses contextual
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent({
        contents: [
          ...userConversations[userId].history, // Include previous conversation
          { role: "user", parts: [{ text: query }] },
        ],
      });

      if (!result || !result.response || !result.response.candidates) {
        return res.status(500).json({ response: "AI response failed." });
      }

      aiResponse = result.response.candidates[0].content.parts[0].text;

      // Store user’s latest input & AI response in memory
      userConversations[userId].history.push({ role: "user", parts: [{ text: query }] });
      userConversations[userId].history.push({ role: "assistant", parts: [{ text: aiResponse }] });

      // Keep only the last 10 messages to prevent excessive memory use
      if (userConversations[userId].history.length > 10) {
        userConversations[userId].history = userConversations[userId].history.slice(-10);
      }
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("AI Chatbot Error:", error);
    res.status(500).json({ response: "Error processing AI request." });
  }
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
=======
import fetch from "node-fetch";

app.post("/log", async (req, res) => {
  try {
    const { type, message } = req.body;

    const response = await fetch("https://api.midnight.network/secure-store", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MIDNIGHT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    res.json({ success: true, logId: result.transactionId });
  } catch (error) {
    console.error("Midnight logging error:", error);
    res.status(500).json({ response: "Error logging data securely" });
  }
});
>>>>>>> Stashed changes
=======
import fetch from "node-fetch";

app.post("/log", async (req, res) => {
  try {
    const { type, message } = req.body;

    const response = await fetch("https://api.midnight.network/secure-store", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MIDNIGHT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    res.json({ success: true, logId: result.transactionId });
  } catch (error) {
    console.error("Midnight logging error:", error);
    res.status(500).json({ response: "Error logging data securely" });
  }
});
>>>>>>> Stashed changes
=======
import fetch from "node-fetch";

app.post("/log", async (req, res) => {
  try {
    const { type, message } = req.body;

    const response = await fetch("https://api.midnight.network/secure-store", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MIDNIGHT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    res.json({ success: true, logId: result.transactionId });
  } catch (error) {
    console.error("Midnight logging error:", error);
    res.status(500).json({ response: "Error logging data securely" });
  }
});
>>>>>>> Stashed changes
