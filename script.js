// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const menuOverlay = document.querySelector(".menu-overlay");
const body = document.body;

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  menuOverlay.classList.toggle("active");
  body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
}

hamburger.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", toggleMenu);

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// Close menu on window resize if open
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
    toggleMenu();
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
});

// Form Submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create mailto link
  const mailtoLink = `mailto:abdulazizdegefa78@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

  // Open default email client
  window.location.href = mailtoLink;

  // Clear form
  contactForm.reset();

  // Show success message
  alert(
    "Thank you for your message! Your email client will open to send the message."
  );
});

// Scroll to Top Button
const createScrollTopButton = () => {
  const button = document.createElement("button");
  button.innerHTML = "↑";
  button.className = "scroll-top";
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: opacity 0.3s;
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Initialize scroll to top button
createScrollTopButton();

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });
});

// Add reveal class to elements
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("reveal");
});

// Scroll animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Theme Toggle
const themeToggles = document.querySelectorAll(".theme-toggle");

// Function to set theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggles.forEach((toggle) => {
    const icon = toggle.querySelector("i");
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  });
  localStorage.setItem("theme", theme);
}

// Set initial theme to dark
setTheme("dark");

// Theme toggle click handler
themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
});

// Check for saved theme preference on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("dark");
  }
});
