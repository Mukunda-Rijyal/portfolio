// DOM Elements
const loadingScreen = document.getElementById("loading-screen")
const header = document.getElementById("header")
const menuToggle = document.querySelector(".menu-toggle")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const scrollToTopBtn = document.getElementById("scrollToTopBtn")
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    document.body.classList.remove("no-scroll")
  }, 2000)
})

// Header Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Scroll to top button
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
})

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
  document.body.classList.toggle("no-scroll")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.classList.remove("no-scroll")
  })
})

// Active Navigation Link
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Typing Animation
const typingText = document.querySelector(".typing-text")
const texts = ["Backend Developer", "PHP Specialist", "Database Expert", "Problem Solver", "Code Enthusiast"]

let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentText = texts[textIndex]

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    typeSpeed = 500
  }

  setTimeout(typeWriter, typeSpeed)
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000)
})

// Project Filtering
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const filterValue = btn.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category").includes(filterValue)) {
        card.classList.remove("hidden")
      } else {
        card.classList.add("hidden")
      }
    })
  })
})

// Skill Progress Animation
const skillProgressBars = document.querySelectorAll(".skill-progress")

const animateSkillBars = () => {
  skillProgressBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible && !bar.classList.contains("animated")) {
      const width = bar.getAttribute("data-width")
      bar.style.width = width
      bar.classList.add("animated")
    }
  })
}

window.addEventListener("scroll", animateSkillBars)

// Scroll Animations - Updated for faster response
const observerOptions = {
  threshold: 0.05,
  rootMargin: "0px 0px 50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add animation classes to elements - Updated
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".section-title, .project-card, .skill-category, .service-card, .about-text, .contact-card, .detail-card, .hero-text, .hero-image",
  )

  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.05}s`
    observer.observe(el)
  })
})

// Enhanced Contact Form with better error handling
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name").trim()
  const email = formData.get("email").trim()
  const subject = formData.get("subject").trim()
  const message = formData.get("message").trim()

  // Enhanced form validation
  if (!name || name.length < 2) {
    showFormStatus("Please enter a valid name (at least 2 characters).", "error")
    return
  }

  if (!email || !isValidEmail(email)) {
    showFormStatus("Please enter a valid email address.", "error")
    return
  }

  if (!subject || subject.length < 5) {
    showFormStatus("Please enter a subject (at least 5 characters).", "error")
    return
  }

  if (!message || message.length < 10) {
    showFormStatus("Please enter a message (at least 10 characters).", "error")
    return
  }

  // Submit form to sendmail.php
  const submitBtn = contactForm.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
  submitBtn.disabled = true

  try {
    // Submit form data to sendmail.php
    const response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      // Check if the response is a redirect (PHP will handle redirection)
      showFormStatus("Thank you for your message! I'll get back to you within 24 hours.", "success")
      contactForm.reset()
      
      // Allow PHP to handle the redirect naturally
      setTimeout(() => {
        window.location.href = 'index.html#contact'
      }, 1500)
    } else {
      const errorText = await response.text()
      showFormStatus(errorText || "Sorry, there was an error sending your message. Please try again.", "error")
    }
  } catch (error) {
    showFormStatus("Sorry, there was an error sending your message. Please try again.", "error")
  } finally {
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }
})

function showFormStatus(message, type) {
  formStatus.textContent = message
  formStatus.className = `form-status ${type}`

  setTimeout(() => {
    formStatus.classList.remove("success", "error")
  }, 5000)
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Scroll to Top
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Simplified Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  if (scrolled < window.innerHeight) {
    parallaxElements.forEach((element, index) => {
      const speed = element.getAttribute("data-speed") || 1
      const yPos = -(scrolled * speed * 0.05)
      element.style.transform = `translateY(${yPos}px)`
    })
  }
})

// Add loading class to body initially
document.body.classList.add("no-scroll")

// Preload images
const preloadImages = () => {
  const images = document.querySelectorAll("img")
  let loadedImages = 0

  images.forEach((img) => {
    if (img.complete) {
      loadedImages++
    } else {
      img.addEventListener("load", () => {
        loadedImages++
        if (loadedImages === images.length) {
          document.body.classList.add("images-loaded")
        }
      })
    }
  })

  if (loadedImages === images.length) {
    document.body.classList.add("images-loaded")
  }
}

// Initialize preloading
preloadImages()
