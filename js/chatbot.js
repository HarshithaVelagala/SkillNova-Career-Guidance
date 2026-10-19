function toggleChat() {
  const chat = document.getElementById("chatbot");
  if (!chat) return;
  const isOpen = chat.style.display === "flex";
  chat.style.display = isOpen ? "none" : "flex";
  if (!isOpen) {
    const messages = document.getElementById("chatMessages");
    if (messages && messages.children.length === 0) {
      const botDiv = document.createElement("div");
      botDiv.className = "bot-message";
      botDiv.textContent = "Hi! I’m your Career AI assistant. Ask me about clubs, courses, or future career options.";
      messages.appendChild(botDiv);
      messages.scrollTop = messages.scrollHeight;
    }
  }
}

function getBotResponse(message) {
  const text = message.toLowerCase();

  const clubs = [
    {
      name: "Medical & Health Sciences",
      keywords: ["medical", "health", "doctor", "nurse", "pharma", "biology", "biotech"],
      description: "The Medical & Health Sciences club covers anatomy, biotechnology, health technology, and healthcare careers through hands-on projects.",
      advice: "If you enjoy helping people and biology, this club is the most relevant. You’ll learn real health skills and medical innovation work."
    },
    {
      name: "AI, Coding & Cyber",
      keywords: ["ai", "coding", "cyber", "programming", "software", "robotics", "machine learning"],
      description: "The AI, Coding & Cyber club teaches programming, AI concepts, and cybersecurity through practical projects and simulations.",
      advice: "If you like computers, problem solving, or building apps, this club gives you the strongest foundation for tech careers."
    },
    {
      name: "Innovation & Engineering",
      keywords: ["engineering", "mechanical", "electronics", "robotics", "drones", "structures", "design"],
      description: "The Innovation & Engineering club focuses on engineering challenges, robotics, motion systems, and real-world technical projects.",
      advice: "If you enjoy building things, physics, or machines, this club helps you explore engineering careers hands-on."
    },
    {
      name: "Space, Transport & Defense",
      keywords: ["space", "transport", "defense", "aerospace", "rocket", "satellite", "naval"],
      description: "The Space, Transport & Defense club explores aerospace systems, transport engineering, and defense technology through applied learning.",
      advice: "If you’re curious about rockets, aviation, or defense systems, this club is a great fit."
    },
    {
      name: "Agriculture & Sustainability",
      keywords: ["agriculture", "sustainability", "farming", "environment", "climate", "green"],
      description: "The Agriculture & Sustainability club teaches modern farming, environmental science, and sustainable design projects.",
      advice: "If you care about nature and climate solutions, this club helps you prepare for green and agri-tech careers."
    },
    {
      name: "Creative, Business & Media",
      keywords: ["creative", "business", "media", "design", "marketing", "entrepreneurship", "art"],
      description: "The Creative, Business & Media club builds skills in design, entrepreneurship, storytelling, and media production.",
      advice: "If you love creative work, storytelling, or starting a business, this club is the strongest choice."
    }
  ];

  function findTopics() {
    return clubs.filter(club => club.keywords.some(keyword => text.includes(keyword)));
  }

  function getTopicByName() {
    return clubs.find(club => text.includes(club.name.toLowerCase().split(" & ")[0]));
  }

  const matched = findTopics();
  const isAskAbout = /\b(what|tell me|describe|explain|about)\b/.test(text);
  const isCompare = /\b(compare|difference|better|vs|versus)\b/.test(text);
  const isRecommend = /\b(should i|which.*(club|career|path)|best.*(club|path|career)|recommend)\b/.test(text);
  const isRegister = /\b(register|sign up|join|enroll|apply)\b/.test(text);
  const isCareer = /\b(career|future|job|work|profession|college)\b/.test(text);
  const allTopics = clubs.map(club => club.name).join(", ");

  if (matched.length > 0 && isAskAbout) {
    const club = matched[0];
    return `${club.description} ${club.advice}`;
  }

  if (matched.length >= 2 && isCompare) {
    const names = matched.map(club => club.name).join(" and ");
    return `Between ${names}, choose based on what you enjoy most: technical design and machines for ${matched[0].name}, or creative/media work for ${matched[1].name}. If you tell me one interest, I can help you pick. `;
  }

  if (isRecommend) {
    if (matched.length > 0) {
      return `Based on what you said, I recommend the ${matched[0].name} club. ${matched[0].advice}`;
    }
    if (text.includes("math") || text.includes("physics") || text.includes("chemistry")) {
      return `Engineering or Medical clubs are great if you like math, science, and real projects. Tell me which subject you enjoy most. `;
    }
    if (text.includes("drawing") || text.includes("art") || text.includes("stories")) {
      return `The Creative, Business & Media club fits well if you enjoy art, storytelling, or entrepreneurship. Tell me what you like doing most. `;
    }
    return `Tell me a little about what you enjoy—science, computers, healthcare, nature, space, or creativity—and I can recommend the best club. `;
  }

  if (isRegister) {
    return "To join, click the Register button at the top and choose the club that matches your interests. If you want, I can help you pick the best one. ";
  }

  if (isCareer && text.includes("after") && text.includes("10") || text.includes("grade 10") || text.includes("after 10")) {
    return "After Grade 10, you can explore clubs to decide whether to focus on engineering, medical, design, or computer science pathways. Start with the club that excites you most. ";
  }

  if (isCareer && matched.length > 0) {
    return `${matched[0].name} is a strong choice for that interest. ${matched[0].description} `;
  }

  if (text.includes("how many") || text.includes("how many clubs") || text.includes("clubs are there")) {
    return `There are 6 clubs you can choose from: ${allTopics}. Each one focuses on a different career area. `;
  }

  if (text.includes("difference") && matched.length > 0) {
    return `The ${matched[0].name} club focuses on ${matched[0].keywords.slice(0, 3).join(", ")} and practical projects. If you want, I can compare it with another club too. `;
  }

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hello! I’m the Career AI assistant. Ask me about any club, career path, or how to choose the best option. ";
  }

  if (text.includes("thank")) {
    return "You’re welcome! Ask me anything else about clubs, courses, or career options. ";
  }

  if (matched.length > 0) {
    const club = matched[0];
    return `${club.description} If you want, I can tell you which club module is best for ${club.keywords[0]}. `;
  }

  if (text.length < 10) {
    return "Tell me a little more about what you like—science, computers, health, space, farming, or creative work—and I’ll suggest a club. ";
  }

  return "I’m here to help with career clubs and course choices. Ask me about a specific club or what you enjoy, and I’ll give you a recommendation. ";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;
  const message = input.value.trim();
  if (message === "") return;

  const messages = document.getElementById("chatMessages");
  if (!messages) return;

  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = message;
  messages.appendChild(userDiv);
  messages.scrollTop = messages.scrollHeight;

  input.value = "";
  input.focus();

  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = getBotResponse(message);
    messages.appendChild(botDiv);
    messages.scrollTop = messages.scrollHeight;
  }, 700);
}

