require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || !apiKey.trim() || apiKey.trim() === "YOUR_KEY_HERE") {
    console.error("GEMINI_API_KEY is missing. Add a valid API key to backend/.env and restart the server.");
}

const ai = new GoogleGenAI({
    apiKey: apiKey || ""
});

async function analyzeEmergency(emergency) {
    if (!apiKey || !apiKey.trim() || apiKey.trim() === "YOUR_KEY_HERE") {
        throw new Error("GEMINI_API_KEY is missing. Add a valid key to backend/.env before calling the Gemini API.");
    }

    const prompt = `
    You are an emergency response AI assistant.

    Analyze the following emergency:

    "${emergency}"

    Return:

    Emergency Type:
    Priority:
    Immediate Actions:
    Safety Precautions:
    Recommended Services:
    Explanation:

    Priority must be one of:
    LOW, MEDIUM, HIGH, CRITICAL.

    Do not invent facts that are not present in the user's description.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}

module.exports = {
    analyzeEmergency
};