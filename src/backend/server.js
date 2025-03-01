import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Apply rate limiting (security)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: "Too many requests. Try again later.",
});
app.use("/chat", limiter);

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ response: "Query is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use correct model
    const result = await model.generateContent(query);
    const responseText = result.response.candidates[0].content.parts[0].text;

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Error processing your request." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend server running on port', PORT));