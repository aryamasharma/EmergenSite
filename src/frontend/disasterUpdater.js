"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// disasterUpdater.ts
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
// Replace with your actual Gemini API endpoint and API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC3eA_HRGRXWVC_g1XBYe6JXXRgcczjZ5I';
const GEMINI_API_KEY = 'AIzaSyC3eA_HRGRXWVC_g1XBYe6JXXRgcczjZ5I';
async function getDisasterDataFromGemini(prompt) {
    try {
        const response = await axios_1.default.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY,
            },
        });
        if (response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text;
        }
        return null;
    }
    catch (error) {
        console.error('Error fetching data from Gemini:', error);
        return null;
    }
}
async function checkForDisastersAndUpdateEvents() {
    try {
        const geminiEarthquakePrompt = "Provide recent earthquake events in JSON format, including location, magnitude, and time. If there are no recent events, return an empty JSON array.";
        const geminiEarthquakeData = await getDisasterDataFromGemini(geminiEarthquakePrompt);
        if (geminiEarthquakeData) {
            try {
                const earthquakes = JSON.parse(geminiEarthquakeData);
                if (Array.isArray(earthquakes) && earthquakes.length > 0) {
                    for (const earthquake of earthquakes) {
                        const newEvent = {
                            id: Date.now(),
                            month: new Date(earthquake.time).toLocaleString('default', { month: 'short' }),
                            year: new Date(earthquake.time).getFullYear().toString(),
                            title: `Magnitude ${earthquake.magnitude} Earthquake in ${earthquake.location}`,
                            description: `A magnitude ${earthquake.magnitude} earthquake occurred in ${earthquake.location} on ${new Date(earthquake.time).toLocaleString()}.`,
                            link: "Gemini Generated Data",
                        };
                        fs_1.default.readFile('./events.json', 'utf8', (err, data) => {
                            if (err) {
                                console.error('Error reading events.json:', err);
                                return;
                            }
                            const events = JSON.parse(data);
                            events.push(newEvent);
                            fs_1.default.writeFile('./events.json', JSON.stringify(events, null, 2), (err) => {
                                if (err) {
                                    console.error('Error writing to events.json:', err);
                                }
                                else {
                                    console.log('events.json updated!');
                                }
                            });
                        });
                    }
                }
            }
            catch (parseError) {
                console.error("Error parsing Gemini's JSON response:", parseError);
            }
        }
    }
    catch (error) {
        console.error('Error checking for disasters:', error);
    }
}
setInterval(checkForDisastersAndUpdateEvents, 60000);
