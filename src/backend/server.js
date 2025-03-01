require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("google-generativeai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;

    const prompt = `
      You are an AI safety assistant and historian analyzing user queries. 
      If the user asks about historical disasters, provide:
      - A summary of the event.
      - How people responded at the time.
      - How AI, blockchain, and modern tech could have helped.
      - Lessons for modern disaster preparedness.

      If the user asks about an emergency, provide:
      - A real-time emergency response guide.
      - Steps to follow immediately.
      - Resources to contact.

      User Query: ${query}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates[0].content.parts[0].text;

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Error processing your request" });
  }
});

app.listen(5000, () => console.log("Backend server running on port 5000"));
