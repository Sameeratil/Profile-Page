// run everything after DOM is loaded so elements exist
document.addEventListener("DOMContentLoaded", () => {

  // ===== Scroll Highlight Effect in Navigation =====
  const sections = document.querySelectorAll("article, aside");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === `#${current}`) {
        a.classList.add("active");
      }
    });
  });

  // ===== Smooth Scroll =====
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== Project Expand Animation =====
  const projectItems = document.querySelectorAll(".proj");
  projectItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        item.style.transition = "0.4s ease";
        item.style.padding = "10px";
        item.style.background = "#fff3ff";
      } else {
        item.style.background = "transparent";
        item.style.padding = "0";
      }
    });
  });

  // ===== Skill Hover Animation =====
  const skills = document.querySelectorAll(".skill-list li");
  skills.forEach((skill) => {
    skill.addEventListener("mouseover", () => {
      skill.style.transform = "scale(1.07)";
      skill.style.transition = "0.3s ease";
    });
    skill.addEventListener("mouseout", () => {
      skill.style.transform = "scale(1)";
    });
  });

  // ===== Fade-in on Scroll =====
  const fadeBox = document.querySelectorAll(".box, header, nav, footer");
  const reveal = () => {
    fadeBox.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 100;
      if (boxTop < triggerPoint) {
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
        box.style.transition = "0.6s ease";
      }
    });
  };
  window.addEventListener("scroll", reveal);
  window.onload = reveal;

  // ===== Typing Effect =====
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const roles = [
      "Web Developer",
      "Data Science",
      "Machine Learning",
      "Full-Stack Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      const displayedText = currentRole.substring(0, charIndex);
      typingElement.textContent = displayedText;

      if (!isDeleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 60);
      } else {
        if (!isDeleting) {
          isDeleting = true;
          setTimeout(typeEffect, 1000);
        } else {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 300);
        }
      }
    }
    typeEffect();
  }

  // ===== DARK MODE / LIGHT MODE =====
  const toggleBtn = document.getElementById("theme-toggle");

  if (toggleBtn) {
    // Load theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️ Light Mode";
    }

    // Toggle theme
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
      } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
      }
    });
  } else {
    // helpful console message for debugging
    console.warn('Theme button (#theme-toggle) not found. If you want dark mode, add <button id="theme-toggle">🌙 Dark Mode</button> in your HTML.');
  }
  // ===== Back to Top Button =====
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  // ===== LANGUAGE CHANGE FEATURE =====
const langData = {
  en: {
    aboutTitle: "About Me",
    aboutText: "Hello! I'm Sameer, a passionate web developer...",
    projectTitle: "Projects",
    skillsTitle: "Skills",
    educationTitle: "Education",
    contactTitle: "Contact Info",
    socialTitle: "Social Links",
    backTop: "▲ Back to Top"
  },

  hi: {
    aboutTitle: "मेरे बारे में",
    aboutText: "नमस्ते! मैं समीयर हूँ, एक वेब डेवलपर...",
    projectTitle: "प्रोजेक्ट्स",
    skillsTitle: "कौशल",
    educationTitle: "शिक्षा",
    contactTitle: "संपर्क जानकारी",
    socialTitle: "सोशल लिंक",
    backTop: "▲ ऊपर जाएँ"
  },

  mr: {
    aboutTitle: "माझ्याबद्दल",
    aboutText: "नमस्कार! मी समीर आहे, एक वेब डेव्हलपर...",
    projectTitle: "प्रकल्प",
    skillsTitle: "कौशल्ये",
    educationTitle: "शिक्षण",
    contactTitle: "संपर्क माहिती",
    socialTitle: "सोशल लिंक",
    backTop: "▲ वर जा"
  }
};

const langSelector = document.getElementById("lang");

langSelector.addEventListener("change", () => {
  const lang = langSelector.value;
  
  document.getElementById("about").querySelector("h2").innerHTML = `<u>${langData[lang].aboutTitle}</u>`;
  document.getElementById("about").querySelector("p").textContent = langData[lang].aboutText;

  document.getElementById("projects").querySelector("h2").innerHTML = `<u>${langData[lang].projectTitle}</u>`;
  document.getElementById("skills").querySelector("h2").innerHTML = `<u>${langData[lang].skillsTitle}</u>`;
  document.getElementById("education").querySelector("h2").innerHTML = `<u>${langData[lang].educationTitle}</u>`;
  document.getElementById("contact").querySelector("h2").innerHTML = `<u>${langData[lang].contactTitle}</u>`;

  document.getElementById("back-to-top").textContent = langData[lang].backTop;
});


}); // end DOMContentLoaded
// ===== Back to Top Button =====
const backToTopBtn = document.getElementById("back-to-top");

// Show button when scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Smooth scroll to top
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
