// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// Smooth scroll for navigation links
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

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".skill-bento-card, .project-showcase-card, .about-content")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  const skillLevelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-level-fill")
          if (fill) {
            const width = fill.style.width
            fill.style.width = "0%"
            setTimeout(() => {
              fill.style.width = width
            }, 200)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".skill-level").forEach((el) => {
    skillLevelObserver.observe(el)
  })

  document.querySelectorAll(".project-showcase-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10"
    })

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1"
    })
  })

  document.querySelectorAll(".skill-bento-card").forEach((card, cardIndex) => {
    const tags = card.querySelectorAll(".skill-tag")
    tags.forEach((tag, tagIndex) => {
      tag.style.opacity = "0"
      tag.style.transform = "scale(0.8)"
      tag.style.transition = "all 0.3s ease"

      setTimeout(
        () => {
          tag.style.opacity = "1"
          tag.style.transform = "scale(1)"
        },
        cardIndex * 100 + tagIndex * 50,
      )
    })
  })
})

// Header shadow on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 10) {
    header.style.boxShadow = "var(--shadow-md)"
  } else {
    header.style.boxShadow = "none"
  }
})
