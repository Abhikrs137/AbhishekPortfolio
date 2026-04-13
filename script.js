const menuBtn = document.querySelector(".menu-btn");
const brandLink = document.querySelector(".brand");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const revealEls = document.querySelectorAll(".reveal");
const form = document.querySelector(".contact-form");
const heroSection = document.querySelector(".hero");
const awardCards = document.querySelectorAll(".award-card");
const awardLightbox = document.querySelector("#awardLightbox");
const awardLightboxImage = document.querySelector("#awardLightboxImage");
const awardLightboxTitle = document.querySelector("#awardLightboxTitle");
const awardLightboxClose = document.querySelector("#awardLightboxClose");
const awardLightboxBackdrop = document.querySelector("#awardLightboxBackdrop");
const chatbotToggle = document.querySelector("#chatbotToggle");
const chatbotShell = document.querySelector("#chatbotShell");
const chatbotForm = document.querySelector("#chatbotForm");
const chatbotInput = document.querySelector("#chatbotInput");
const chatbotMessages = document.querySelector("#chatbotMessages");
const chatbotChips = document.querySelectorAll(".chatbot-chip");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");
const preferredTheme = "dark";

const setTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
  if (themeToggleIcon) {
    themeToggleIcon.innerHTML =
      theme === "dark"
        ? '<svg viewBox="0 0 24 24" role="img" focusable="false"><path d="M12 5.25A.75.75 0 0 1 12.75 6v1.25a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm0 11.5a.75.75 0 0 1 .75.75v1.25a.75.75 0 0 1-1.5 0V17.5a.75.75 0 0 1 .75-.75Zm6.75-5.5a.75.75 0 0 1 0 1.5H17.5a.75.75 0 0 1 0-1.5Zm-11.5 0a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5ZM16.42 7.58a.75.75 0 0 1 1.06 0l.88.88a.75.75 0 1 1-1.06 1.06l-.88-.88a.75.75 0 0 1 0-1.06Zm-9.96 9.96a.75.75 0 0 1 1.06 0l.88.88a.75.75 0 1 1-1.06 1.06l-.88-.88a.75.75 0 0 1 0-1.06Zm11.84 1.06a.75.75 0 0 1-1.06 0l-.88-.88a.75.75 0 0 1 1.06-1.06l.88.88a.75.75 0 0 1 0 1.06ZM7.52 8.64a.75.75 0 0 1-1.06 1.06l-.88-.88a.75.75 0 0 1 1.06-1.06ZM12 8.25A3.75 3.75 0 1 1 8.25 12 3.75 3.75 0 0 1 12 8.25Zm0 1.5A2.25 2.25 0 1 0 14.25 12 2.25 2.25 0 0 0 12 9.75Z"/></svg>'
        : '<svg viewBox="0 0 24 24" role="img" focusable="false"><path d="M14.74 3.78a.75.75 0 0 1 .83.96 6.75 6.75 0 1 0 8.69 8.69.75.75 0 0 1 .96.83A8.25 8.25 0 1 1 14.74 3.78Z"/></svg>';
  }
};

setTheme(storedTheme || preferredTheme);

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

if (brandLink && heroSection) {
  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    heroSection.classList.remove("hero-home-flash");
    window.requestAnimationFrame(() => {
      heroSection.classList.add("hero-home-flash");
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

const closeAwardLightbox = () => {
  if (!awardLightbox || !awardLightboxImage) {
    return;
  }

  awardLightbox.setAttribute("hidden", "");
  awardLightboxImage.setAttribute("src", "");
  awardLightboxImage.setAttribute("alt", "");
};

awardCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!awardLightbox || !awardLightboxImage || !awardLightboxTitle) {
      return;
    }

    const image = card.dataset.awardImage;
    const title = card.dataset.awardTitle || "Certificate";
    const preview = card.querySelector("img");
    const altText = preview ? preview.alt : title;

    if (!image) {
      return;
    }

    awardLightboxImage.setAttribute("src", image);
    awardLightboxImage.setAttribute("alt", altText);
    awardLightboxTitle.textContent = title;
    awardLightbox.removeAttribute("hidden");
  });
});

if (awardLightboxClose) {
  awardLightboxClose.addEventListener("click", closeAwardLightbox);
}

if (awardLightboxBackdrop) {
  awardLightboxBackdrop.addEventListener("click", closeAwardLightbox);
}

if (chatbotToggle && chatbotShell) {
  chatbotToggle.addEventListener("click", () => {
    const isHidden = chatbotShell.hasAttribute("hidden");
    if (isHidden) {
      chatbotShell.removeAttribute("hidden");
      chatbotToggle.setAttribute("aria-expanded", "true");
      if (chatbotInput) {
        chatbotInput.focus();
      }
    } else {
      chatbotShell.setAttribute("hidden", "");
      chatbotToggle.setAttribute("aria-expanded", "false");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

const appendChatMessage = (type, text) => {
  if (!chatbotMessages) {
    return;
  }

  const bubble = document.createElement("div");
  bubble.className = `chatbot-bubble ${type}`;
  bubble.textContent = text;
  chatbotMessages.appendChild(bubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const getBotReply = (question) => {
  const q = question.toLowerCase();

  if (q.includes("project")) {
    return "Featured projects include a Learning Management System built with TypeScript and Playwright, plus an enterprise Portal Application built with Selenium and Java. Both focus on scalable automation, reusable structure, and faster regression coverage.";
  }

  if (q.includes("skill") || q.includes("tool") || q.includes("framework") || q.includes("technology")) {
    return "Core skills include Playwright, Selenium, TestNG, Rest Assured, Jira, Zephyr, Allure, TypeScript, Java, CI/CD workflows, Page Object Model, data-driven testing, API testing, and parallel execution.";
  }

  if (q.includes("experience") || q.includes("work") || q.includes("company")) {
    return "Abhishek has 3.4+ years of QA automation experience across Tech Mahindra and Nagarro, delivering frameworks from scratch, improving testing velocity, and supporting cross-browser and CI-ready automation solutions.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("hire")) {
    return "You can reach Abhishek by email at abhikrs137@gmail.com or through LinkedIn from the contact section. He is open to QA roles, freelance automation work, and collaboration.";
  }

  if (q.includes("playwright") || q.includes("selenium")) {
    return "Playwright and Selenium are both core parts of Abhishek's automation background. He uses them to build maintainable UI automation frameworks, support cross-browser coverage, and improve regression efficiency.";
  }

  if (q.includes("education") || q.includes("college")) {
    return "Abhishek completed a B.Tech in Electronics and Communication Engineering from Dr. B.C. Roy Engineering College with a CGPA of 8.4/10.";
  }

  return "I can help with questions about Abhishek's projects, skills, work experience, education, and contact details. Try asking about Playwright, Selenium, project frameworks, or how to get in touch.";
};

if (chatbotForm && chatbotInput) {
  chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = chatbotInput.value.trim();

    if (!question) {
      return;
    }

    appendChatMessage("user", question);
    chatbotInput.value = "";

    window.setTimeout(() => {
      appendChatMessage("bot", getBotReply(question));
    }, 350);
  });
}

chatbotChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const question = chip.dataset.question;

    if (!question) {
      return;
    }

    appendChatMessage("user", question);

    window.setTimeout(() => {
      appendChatMessage("bot", getBotReply(question));
    }, 250);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAwardLightbox();
  }
});

if (form) {
  const button = form.querySelector("button");
  const status = form.querySelector(".contact-form-status");
  const accessKeyField = form.querySelector('input[name="access_key"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!button) {
      return;
    }

    const accessKey = accessKeyField ? accessKeyField.value.trim() : "";

    if (!accessKey || accessKey === "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      if (status) {
        status.textContent = "Add your Web3Forms access key in the contact form before testing email delivery.";
        status.classList.remove("is-success");
        status.classList.add("is-error");
      }
      return;
    }

    const originalText = button.textContent;
    button.textContent = "Sending...";
    button.disabled = true;

    if (status) {
      status.textContent = "Sending your message...";
      status.classList.remove("is-success", "is-error");
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Request failed");
      }

      form.reset();
      if (accessKeyField) {
        accessKeyField.value = accessKey;
      }
      button.textContent = "Message Sent!";

      if (status) {
        status.textContent = "Message sent successfully. You should receive it in your configured email inbox.";
        status.classList.add("is-success");
      }
    } catch (error) {
      button.textContent = "Try Again";

      if (status) {
        status.textContent = "The message could not be sent right now. Please try again, or use the email card above.";
        status.classList.add("is-error");
      }
    } finally {
      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2200);
    }
  });
}
