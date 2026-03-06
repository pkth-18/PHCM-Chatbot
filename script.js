/* Perpetual Help College of Manila - AI Campus Assistant */

(function () {
  "use strict";

  // ===== DOM ELEMENTS =====
  const chatForm = document.getElementById("chat-form") || document.getElementById("chatForm");
  const userInput = document.getElementById("user-input") || document.getElementById("userInput");
  const sendBtn = document.getElementById("send-btn") || document.getElementById("sendBtn");
  const messagesContainer = document.getElementById("messages");
  const chatScroll = document.getElementById("chat-scroll") || document.getElementById("chatScroll");
  const welcomeSection = document.getElementById("welcome-section") || document.getElementById("welcomeSection");
  const quickCards = document.querySelectorAll(".quick-card");

  // ===== KNOWLEDGE BASE (Fallback) =====
  const KNOWLEDGE_BASE = {
    greetings: {
      intro: "It is a pleasure to welcome you to our virtual inquiry portal! ",
      response: "I am your <b>Perpetual Help College of Manila (PHCM)</b> AI Assistant. How may I help you today?"
    },
    fallback: {
      intro: "I appreciate your question. ",
      response: "I can provide information on SHS strands, admission requirements, tuition, transferees, and uniforms. Please specify which topic you want to know more about."
    }
  };

  // ===== UTILITY FUNCTIONS =====
  const scrollToBottom = () => {
    chatScroll.scrollTo({
      top: chatScroll.scrollHeight,
      behavior: "smooth",
    });
  };

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // ===== MESSAGE CREATION =====
  const createMessage = (text, sender) => {
    const row = document.createElement("div");
    row.className = `message-row ${sender}`;

    const avatar = sender === "bot" 
      ? `<div class="msg-avatar"><img src="assets/images/phcm-logo.png" alt="Bot"></div>`
      : `<div class="msg-avatar user-av">YOU</div>`;

    row.innerHTML = `
      ${avatar}
      <div class="msg-content">
        <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>
        <div class="msg-time">${getTime()}</div>
      </div>
    `;

    messagesContainer.appendChild(row);
    scrollToBottom();
  };

  const showTypingIndicator = () => {
    const indicator = document.createElement("div");
    indicator.className = "typing-row";
    indicator.id = "typing-indicator";
    indicator.innerHTML = `
      <div class="msg-avatar"><img src="assets/images/phcm-logo.png" alt="Bot"></div>
      <div class="typing-bubble">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
    return indicator;
  };

  // ===== HANDLE MESSAGE SUBMISSION =====
  const handleMessageSubmit = async (text) => {
    const message = text || userInput.value.trim();
    if (!message) return;

    userInput.value = "";
    sendBtn.disabled = true;
    if (welcomeSection) welcomeSection.style.display = "none";

    createMessage(message, "user");

    const indicator = showTypingIndicator();

    try {
      // Send message to backend API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      indicator.remove();

      // Show AI reply
      const reply = data.reply || KNOWLEDGE_BASE.fallback.intro + KNOWLEDGE_BASE.fallback.response;
      createMessage(reply, "bot");

    } catch (err) {
      console.error(err);
      indicator.remove();
      createMessage("Sorry, something went wrong. Please try again.", "bot");
    }
  };

  // ===== EVENT LISTENERS =====
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleMessageSubmit();
  });

  userInput.addEventListener("input", () => {
    sendBtn.disabled = userInput.value.trim() === "";
  });

  quickCards.forEach(card => {
    card.addEventListener("click", () => {
      const question = card.getAttribute("data-question");
      handleMessageSubmit(question);
    });
  });

  // ===== AUTO WELCOME MESSAGE =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (messagesContainer.children.length === 0) {
        createMessage(KNOWLEDGE_BASE.greetings.intro + KNOWLEDGE_BASE.greetings.response, "bot");
      }
    }, 800);
  });

})();