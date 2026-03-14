export default async function handler(req, res) {

  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check API key is configured
  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not set in environment variables.");
    return res.status(500).json({ reply: "Server is not configured correctly. Please contact the administrator." });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ reply: "Please type a message." });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant for Perpetual Help College of Manila (PHCM), a Senior High School in Manila, Philippines.
You answer questions about admissions, SHS strands and tracks, tuition fees, enrollment requirements, campus location, school hours, and contact information.
Be friendly, concise, and professional. If you don't have specific details about PHCM, be honest and suggest the student contact the school directly.`
          },
          {
            role: "user",
            content: message.trim()
          }
        ],
        temperature: 0.7,
        max_tokens: 512
      })
    });

    // Handle Groq API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      return res.status(502).json({ reply: "The AI service is currently unavailable. Please try again in a moment." });
    }

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response. Please try again.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ reply: "An unexpected error occurred. Please try again." });
  }
}