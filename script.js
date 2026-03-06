/**
 * Perpetual Help College of Manila - AI Campus Assistant
 * Comprehensive Logic with Warm Introductions and Detailed Knowledge Base
 */

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

  // ===== KNOWLEDGE BASE (Formal & Detailed) =====
  const KNOWLEDGE_BASE = {
    greetings: {
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "greetings", "kumusta"],
      intro: "It is a pleasure to welcome you to our virtual inquiry portal! ",
      response: "I am your <b>Perpetual Help College of Manila (PHCM)</b> AI Assistant. I am here to provide you with comprehensive information regarding our Senior High School programs, admission procedures, and campus life. How may I help you begin your journey as a Perpetualite today?"
    },
    
    programs: {
      keywords: ["program", "strand", "course", "offer", "track", "stem", "abm", "humss", "gas", "ict", "home economics", "shs"],
      intro: "We take great pride in our diverse academic offerings designed for future leaders. ",
      response: "Perpetual Help College of Manila offers a wide range of Senior High School (SHS) strands tailored to prepare students for college and professional careers:\n\n" +
                "• <b>STEM (Science, Technology, Engineering, and Mathematics)</b>: Ideal for students pursuing medical, engineering, or scientific fields.\n" +
                "• <b>ABM (Accountancy, Business, and Management)</b>: Designed for future entrepreneurs, accountants, and corporate managers.\n" +
                "• <b>HUMSS (Humanities and Social Sciences)</b>: Perfect for those aspiring to enter Law, Journalism, or Social Work.\n" +
                "• <b>GAS (General Academic Strand)</b>: A versatile option for students who wish to explore various college courses.\n" +
                "• <b>ICT (Information and Communications Technology)</b>: Focusing on digital innovation, programming, and technical skills.\n" +
                "• <b>HE (Home Economics)</b>: Specialized training for the hospitality, culinary, and tourism industries.\n\n" +
                "Every strand is anchored on our motto: <b>'Character Building is Nation Building.'</b> Which of these tracks interests you the most?"
    },

    admission: {
      keywords: ["admission", "apply", "enroll", "requirement", "register", "steps", "how to"],
      intro: "We are delighted that you are considering joining our academic community! ",
      response: "The enrollment process at PHCM is straightforward and designed to assist you at every step:\n\n" +
                "<b>1. Initial Inquiry:</b> Visit our Admissions Office for a preliminary orientation.\n" +
                "<b>2. Document Submission:</b> Please prepare the following original and photocopies:\n" +
                "   • Grade 10 Report Card (Form 138)\n" +
                "   • PSA Birth Certificate\n" +
                "   • Certificate of Good Moral Character\n" +
                "   • 4 pieces of 2x2 ID photos with a white background\n" +
                "<b>3. Entrance Assessment:</b> Undergo a brief interview with our Guidance Office to ensure you are placed in the strand that best fits your goals.\n" +
                "<b>4. Registration:</b> Finalize your schedule and proceed to the Finance Office for payment."
    },

    transferee: {
      keywords: ["transferee", "transfer", "shift", "move school", "honorable dismissal", "grade 12 transfer"],
      intro: "We warmly welcome students from other institutions who wish to finish their SHS journey with us. ",
      response: "For transferees, the process is very similar to new students, but you will need a few additional documents:\n\n" +
                "• <b>Honorable Dismissal</b> or Transfer Certificate from your previous school.\n" +
                "• <b>Certified True Copy of Grades</b> (Form 137) to check for subject credited.\n" +
                "• All standard requirements like PSA Birth Certificate and Good Moral Character.\n\n" +
                "We recommend visiting the Principal's Office for a <b>Credit Evaluation</b> to see which subjects from your previous school will be recognized here at PHCM."
    },

    finance: {
      keywords: ["tuition", "fee", "cost", "payment", "scholarship", "discount", "how much", "installment", "voucher"],
      intro: "We understand that choosing a school involves careful financial planning. ",
      response: "PHCM offers one of the most competitive and affordable tuition structures in the University Belt:\n\n" +
                "• <b>Payment Options:</b> You may settle fees via full cash payment (with a discount), semestral installments, or a monthly payment plan.\n" +
                "• <b>Voucher Program:</b> We officially participate in the <b>DepEd SHS Voucher Program</b>. Public school graduates and ESC grantees from private schools can significantly reduce their tuition costs using these vouchers.\n" +
                "• <b>Scholarships:</b> We offer Academic Scholarships for Honor Students, Sibling Discounts, and Loyalty Discounts for our own JHS graduates.\n\n" +
                "For a specific breakdown of fees for your chosen strand, our Finance Office is available to assist you."
    },

    uniform: {
      keywords: ["uniform", "wear", "attire", "dress code", "clothing", "skirt", "pants", "polo"],
      intro: "Maintaining a professional and disciplined appearance is a vital part of being a Perpetualite. ",
      response: "Our students are expected to wear the prescribed school uniform with pride:\n\n" +
                "• <b>For Male Students:</b> The official white polo with the school seal and dark blue trousers.\n" +
                "• <b>For Female Students:</b> The white blouse with the school seal and the signature PHCM plaid skirt.\n" +
                "• <b>Identification:</b> The school ID must be worn at all times while on campus for security and identification.\n\n" +
                "Uniforms can be purchased at our official school bookstore or through our authorized campus suppliers during the enrollment period."
    },

    hours: {
      keywords: ["time", "hours", "open", "schedule", "office", "saturday", "operating"],
      intro: "To better serve you, please take note of our campus operating schedule. ",
      response: "You are welcome to visit our campus at the following times:\n\n" +
                "• <b>Administrative Offices:</b> Monday to Friday, 8:00 AM to 5:00 PM.\n" +
                "• <b>Admissions Office (Extended):</b> We are also open on Saturdays from 8:00 AM to 12:00 PM specifically for enrollment inquiries.\n" +
                "• <b>Class Hours:</b> Typically run from 7:00 AM to 5:00 PM, depending on the specific schedule of your strand.\n\n" +
                "We suggest arriving at least 30 minutes before closing to ensure you have enough time for your transactions."
    },

    location: {
      keywords: ["location", "address", "where", "map", "directions", "sampaloc", "manila", "concepcion"],
      intro: "Finding our campus is easy as we are located in the heart of Manila's academic center. ",
      response: "Our official address is:\n<b>1240 V. Concepcion St., Sampaloc, Manila, Philippines, 1008.</b>\n\n" +
                "We are highly accessible via <b>LRT-2 (Legarda Station)</b> and major jeepney routes along España Boulevard. If you are using a navigation app like Waze or Google Maps, simply search for <b>'Perpetual Help College of Manila'</b> for precise directions."
    },

    contact: {
      keywords: ["contact", "phone", "email", "number", "call", "reach", "viber"],
      intro: "We value open communication and are ready to answer any further questions you may have. ",
      response: "You may reach us through any of the following official channels:\n\n" +
                "• <b>Mobile/Viber:</b> 0917 325 3147\n" +
                "• <b>Official Email:</b> shs.manila@uphsl.edu.ph\n" +
                "• <b>Facebook:</b> Perpetual Help College of Manila - SHS\n\n" +
                "Please expect a response within one business day for email and social media inquiries."
    },

    fallback: {
      intro: "I appreciate your question, though I may need a bit more clarity to assist you better. ",
      response: "I currently have detailed information on <b>SHS strands, admission requirements, tuition, transferees, and school uniforms</b>. Could you please specify which of these you would like to know more about? Alternatively, you may call us at <b>0917 325 3147</b>."
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

  // ===== CHAT LOGIC =====

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

  const processResponse = (input) => {
    const userText = input.toLowerCase();
    
    // Check for specific intent matches
    for (const category in KNOWLEDGE_BASE) {
      if (category === 'fallback') continue;
      
      const match = KNOWLEDGE_BASE[category].keywords.some(keyword => userText.includes(keyword));
      if (match) {
        return KNOWLEDGE_BASE[category].intro + KNOWLEDGE_BASE[category].response;
      }
    }
    
    return KNOWLEDGE_BASE.fallback.intro + KNOWLEDGE_BASE.fallback.response;
  };

  const handleMessageSubmit = (text) => {
    const message = text || userInput.value.trim();
    if (!message) return;

    userInput.value = "";
    sendBtn.disabled = true;
    if(welcomeSection) welcomeSection.style.display = "none";

    createMessage(message, "user");

    const indicator = showTypingIndicator();
    
    setTimeout(() => {
      indicator.remove();
      const botResponse = processResponse(message);
      createMessage(botResponse, "bot");
    }, 1300); 
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

  window.addEventListener('load', () => {
    setTimeout(() => {
       if(messagesContainer.children.length === 0) {
         createMessage(KNOWLEDGE_BASE.greetings.intro + KNOWLEDGE_BASE.greetings.response, "bot");
       }
    }, 800);
  });

})();