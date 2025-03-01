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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(query);
    const responseText = result.response.candidates[0].content.parts[0].text;

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Error processing your request" });
  }
});

app.listen(5000, () => console.log("Backend server running on port 5000"));
