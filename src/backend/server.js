import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { Client } from "@googlemaps/google-maps-services-js";

dotenv.config();

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY; // ✅ Weather API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();
app.use(cors());
app.use(bodyParser.json());

const googleMapsClient = new Client({});

// ✅ Store user alert history & AI conversation memory
const users = {}; // { userId: { lastAlert: timestamp, alertType: "general"/"geolocation"/"security" } }
const userConversations = {}; // { userId: { history: [previous messages] } }

// ✅ Function to get nearest evacuation space
async function getNearestEvacuation(location) {
  try {
    const response = await googleMapsClient.placesNearby({
      params: {
        location: { lat: location.lat, lng: location.lon },
        radius: 5000, // Search in a 5km radius
        type: "shelter",
        key: googleMapsApiKey,
      },
    });

    if (!response.data.results.length) {
      return "🚫 No nearby shelters found. Try checking official evacuation centers.";
    }

    const nearestShelter = response.data.results[0];
    return `🛑 The nearest evacuation space is **${nearestShelter.name}** at **${nearestShelter.vicinity}**. 
    📍 Get directions: https://www.google.com/maps/dir/?api=1&destination=${nearestShelter.geometry.location.lat},${nearestShelter.geometry.location.lng}`;
  } catch (error) {
    console.error("Error fetching nearest evacuation space:", error);
    return "🚫 Unable to fetch evacuation spaces at this time.";
  }
}

// ✅ Function to fetch real-time weather data
async function getWeather(location) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location.lat},${location.lon}`
    );
    return `🌤️ Current weather: **${response.data.current.condition.text}**, Temperature: **${response.data.current.temp_c}°C**.`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return "🚫 Unable to fetch weather data.";
  }
}

// ✅ AI Chatbot API Route
app.post("/chat", async (req, res) => {
  try {
    const { userId, query, location } = req.body;
    if (!query) return res.status(400).json({ response: "Query is required." });

    if (!userConversations[userId]) {
      userConversations[userId] = { history: [] };
    }

    let aiResponse = "";

    if (query.toLowerCase().includes("nearest evacuation space")) {
      if (!location) {
        aiResponse = "📍 Please provide your location for evacuation space details.";
      } else {
        aiResponse = await getNearestEvacuation(location);
      }
    } else if (query.toLowerCase().includes("weather") && location) {
      aiResponse = await getWeather(location);
    } else {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent({
        contents: [
          ...userConversations[userId].history,
          { role: "user", parts: [{ text: query }] },
        ],
      });

      if (!result?.response?.candidates) {
        return res.status(500).json({ response: "AI response failed." });
      }

      aiResponse = result.response.candidates[0].content.parts[0].text;
      userConversations[userId].history.push({ role: "user", parts: [{ text: query }] });
      userConversations[userId].history.push({ role: "assistant", parts: [{ text: aiResponse }] });

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

// ✅ Alert System API Route
app.post("/log", async (req, res) => {
  try {
    const { type, message, location, userId } = req.body;
    if (!message || !userId) return res.status(400).json({ response: "Invalid alert details." });

    let alertType = "general";
    const securityKeywords = ["domestic violence", "sexual assault", "violence", "accident"];
    const disasterKeywords = ["earthquake", "flood", "hurricane", "tornado"];

    for (const keyword of securityKeywords) {
      if (message.toLowerCase().includes(keyword)) {
        alertType = "security";
        break;
      }
    }
    for (const keyword of disasterKeywords) {
      if (message.toLowerCase().includes(keyword)) {
        alertType = "geolocation";
        break;
      }
    }

    const now = Date.now();
    if (users[userId] && now - users[userId].lastAlert < 3600000) {
      const remainingTime = Math.ceil((3600000 - (now - users[userId].lastAlert)) / 60000);
      return res.status(429).json({ response: `🚫 You can only submit one alert per hour. Try again in ${remainingTime} minutes.` });
    }

    if (alertType === "geolocation" && location) {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location.lat},${location.lon}`);
        const currentConditions = response.data.current.condition.text.toLowerCase();

        if (
          (message.includes("earthquake") && !currentConditions.includes("quake")) ||
          (message.includes("flood") && !currentConditions.includes("flood")) ||
          (message.includes("hurricane") && !currentConditions.includes("hurricane"))
        ) {
          return res.status(400).json({ response: "🚫 No official warning issued for this disaster at your location." });
        }
      } catch (error) {
        console.error("Disaster verification error:", error);
      }
    }

    users[userId] = { lastAlert: now, alertType };
    res.json({ logId: `alert-${now}`, response: "✅ Alert successfully sent." });

  } catch (error) {
    console.error("Alert logging error:", error);
    res.status(500).json({ response: "❌ Unable to send alert. Try again later." });
  }
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
