import fetch from "node-fetch";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method not allowed" });
    }

    // Get user message from frontend
    const userMessage = req.body.message;

    // Call Gemini AI API
    const response = await fetch("https://api.generativeai.google/v1/models/text-bison-001:generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PHCM_Chatbot_API_Key}`, // environment variable
        },
        body: JSON.stringify({
            prompt: userMessage,
            temperature: 0.7,
            max_output_tokens: 300
        }),
    });

    const data = await response.json();

    // Return AI reply to frontend
    res.status(200).json({ reply: data.output_text || "No response" });
}