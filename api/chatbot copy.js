// chatbot.js - Vercel API
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://api.generativeai.google/v1/models/text-bison-001:generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.PHCM_Chatbot_API_Key}`,
        },
        body: JSON.stringify({
          prompt: userMessage,
          temperature: 0.7,
          max_output_tokens: 300,
        }),
      }
    );

    const data = await response.json();
    res.status(200).json({ reply: data.output_text || "No response" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error connecting to AI API" });
  }
}