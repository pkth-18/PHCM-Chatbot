// chatbot.js - Vercel API (working version with static response for testing)

export default async function handler(req, res) {
  "use strict";

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get user message from frontend
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ reply: "Please provide a message." });
    }

    // ===== STATIC RESPONSE FOR TESTING =====
    // Replace this with Gemini API call later
    const reply = `Hello from backend! You sent: "${message}"`;

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Error in API handler:", err);
    return res.status(500).json({ reply: "Internal server error" });
  }
}