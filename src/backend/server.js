import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios"; // Required for API calls

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🏆 Store alert data & user submission history
const users = {}; // { userId: { lastAlert: timestamp, alertType: "general"/"geolocation"/"security" } }

// 🚨 Security Alerts (Require 24-Hour Limit)
const securityKeywords = ["domestic violence", "sexual assault", "kidnapping", "robbery", "murder", "accident", "violence"];
const disasterKeywords = ["earthquake", "flood", "hurricane", "tornado"];

// 🚨 Helpline Information
const helplines = {
  "domestic violence": "National Domestic Violence Hotline: 1-800-799-7233",
  "sexual assault": "RAINN Sexual Assault Hotline: 1-800-656-4673",
  "accident": "911 - Emergency Services",
  "violence": "911 - Emergency Services",
  "general": "For other emergencies, call 911.",
};

// 🌍 **Real-Time Disaster Verification**
async function verifyDisaster(location, disasterType) {
  try {
    // Replace with a real API that provides live disaster alerts based on geolocation.
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location.lat},${location.lon}`);
    
    const currentConditions = response.data.current.condition.text.toLowerCase();

    if (
      (disasterType === "earthquake" && currentConditions.includes("quake")) ||
      (disasterType === "flood" && currentConditions.includes("flood")) ||
      (disasterType === "hurricane" && currentConditions.includes("hurricane")) ||
      (disasterType === "tornado" && currentConditions.includes("tornado"))
    ) {
      return true; // ✅ Disaster is occurring
    }
    
    return false; // ❌ No official disaster
  } catch (error) {
    console.error("Error checking disaster status:", error);
    return false;
  }
}

app.post("/log", async (req, res) => {
  try {
    const { type, message, location, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ response: "Invalid alert details." });
    }

    let alertType = "general";
    let detectedKeyword = "";

    // 🔍 Check if it's a security-related alert
    for (const keyword of securityKeywords) {
      if (message.toLowerCase().includes(keyword)) {
        alertType = "security";
        detectedKeyword = keyword;
        break;
      }
    }

    // 🔍 Check if it's a natural disaster alert
    for (const keyword of disasterKeywords) {
      if (message.toLowerCase().includes(keyword)) {
        alertType = "geolocation";
        detectedKeyword = keyword;
        break;
      }
    }

    const now = Date.now();

    // 🏆 Security Alerts: 1 per 24 hours
    if (alertType === "security" && users[userId] && now - users[userId].lastAlert < 86400000) {
      return res.status(429).json({ status: "rejected", message: `🚫 You can only submit one security alert every 24 hours.` });
    }

    // 🚨 Enforce 1-Hour Limit for All Alerts
    if (users[userId] && now - users[userId].lastAlert < 3600000) {
      const remainingTime = Math.ceil((3600000 - (now - users[userId].lastAlert)) / 60000);
      return res.status(429).json({ status: "rejected", message: `🚫 Sorry, you can only submit one alert per hour. Try again in ${remainingTime} minutes.` });
    }

    // 🌍 Validate location & verify natural disaster alerts
    if (alertType === "geolocation") {
      if (!location || !location.lat || !location.lon) {
        return res.status(400).json({ status: "rejected", message: "🚫 Location is required for natural disaster alerts." });
      }

      const isDisasterHappening = await verifyDisaster(location, detectedKeyword);
      
      if (!isDisasterHappening) {
        return res.status(400).json({ status: "rejected", message: "🚫 No official warning has been issued for this disaster at your location. Your alert was not submitted." });
      }
    }

    // ✅ Store user alert time (prevents spam)
    users[userId] = { lastAlert: now, alertType };

    // 🚨 Show helpline for security alerts
    if (alertType === "security") {
      return res.json({ status: "helpline", helpline: helplines[detectedKeyword] || helplines["general"] });
    }

    res.json({ logId: `alert-${now}`, status: "Verified" });

  } catch (error) {
    console.error("Alert logging error:", error);
    res.status(500).json({ response: "Error logging alert." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
