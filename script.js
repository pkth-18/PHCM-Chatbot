// script.js — PHCM Chatbot Frontend

const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const welcomeSection = document.getElementById("welcomeSection");
const quickActions = document.getElementById("quickActions");

// ===== ENABLE / DISABLE SEND BUTTON =====
input.addEventListener("input", () => {
  sendBtn.disabled = input.value.trim() === "";
});

// ===== QUICK ACTION BUTTONS =====
quickActions.addEventListener("click", (e) => {
  const card = e.target.closest(".quick-card");
  if (!card) return;
  const question = card.dataset.question;
  if (question) {
    input.value = question;
    sendBtn.disabled = false;
    sendMessage(question);
  }
});

// ===== FORM SUBMIT =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  sendMessage(message);
});

// ===== CORE SEND FUNCTION =====
async function sendMessage(message) {
  // Hide welcome section on first message
  if (welcomeSection && !welcomeSection.classList.contains("hidden")) {
    welcomeSection.classList.add("hidden");
  }

  addMessage(message, "user");

  input.value = "";
  sendBtn.disabled = true;

  const typing = addTyping();

  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    typing.remove();
    addMessage(data.reply || "Sorry, I couldn't generate a response.", "bot");

  } catch (error) {
    console.error("Fetch error:", error);
    typing.remove();
    addMessage("Connection error. Please check that the server is running and try again.", "bot");
  }
}

// ===== ADD MESSAGE =====
function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message-row ${sender}`;

  // Avatar
  const avatar = document.createElement("div");
  avatar.className = `msg-avatar ${sender === "user" ? "user-av" : "bot-av"}`;

  if (sender === "bot") {
    const img = document.createElement("img");
    img.src = "assets/images/phcm-logo.png";
    img.alt = "PHCM Bot";
    avatar.appendChild(img);
  } else {
    avatar.textContent = "You";
  }

  // Content wrapper
  const content = document.createElement("div");
  content.className = "msg-content";

  // Bubble
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;

  // Timestamp
  const time = document.createElement("div");
  time.className = "msg-time";
  time.textContent = getTime();

  content.appendChild(bubble);
  content.appendChild(time);

  // User: avatar on right; bot: avatar on left
  if (sender === "user") {
    row.appendChild(content);
    row.appendChild(avatar);
  } else {
    row.appendChild(avatar);
    row.appendChild(content);
  }

  messages.appendChild(row);
  scrollToBottom();
}

// ===== TYPING INDICATOR =====
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
  scrollToBottom();
  return row;
}

// ===== HELPERS =====
function scrollToBottom() {
  const chatScroll = document.getElementById("chatScroll");
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}