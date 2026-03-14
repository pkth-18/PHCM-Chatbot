const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");

// enable send button
input.addEventListener("input", () => {
  sendBtn.disabled = input.value.trim() === "";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");

  input.value = "";
  sendBtn.disabled = true;

  const typing = addTyping();

  try {

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    typing.remove();

    addMessage(data.reply, "bot");

  } catch (error) {

    typing.remove();
    addMessage("Server error. Please try again.", "bot");

  }
});

function addMessage(text, sender) {

  const row = document.createElement("div");
  row.className = `message-row ${sender}`;

  const content = document.createElement("div");
  content.className = "msg-content";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;

  content.appendChild(bubble);
  row.appendChild(content);

  messages.appendChild(row);

  messages.scrollTop = messages.scrollHeight;
}

function addTyping() {

  const row = document.createElement("div");
  row.className = "typing-row";

  const bubble = document.createElement("div");
  bubble.className = "typing-bubble";
  bubble.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;

  row.appendChild(bubble);
  messages.appendChild(row);

  return row;
}