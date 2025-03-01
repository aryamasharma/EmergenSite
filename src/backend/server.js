import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-vision-latest" });

    const result = await model.generateContent(query);
    const responseText = result.response.candidates[0].content.parts[0].text;

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Error processing your request" });
  }
});

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Apply security headers
app.use(helmet());

// Rate limit API to prevent spam
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: "Too many requests. Try again later.",
});

app.use("/chat", limiter);
app.listen(5000, () => console.log("Backend server running on port 5000"));
