// Global JavaScript for Jarsella E-Commerce

document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.querySelector(".nav");

  if (mobileNavToggle && nav) {
    mobileNavToggle.addEventListener("click", function () {
      nav.classList.toggle("nav-open");
    });
  }

  // Active link highlighting
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Smooth scroll to top functionality
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Product card hover effects
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Simple cart counter (placeholder)
  let cartCount = 0;
  const cartCounter = document.querySelector(".cart-counter");

  if (cartCounter) {
    // Initialize cart count from localStorage if available
    const savedCount = localStorage.getItem("cartCount");
    if (savedCount) {
      cartCount = parseInt(savedCount);
      cartCounter.textContent = cartCount;
    }
  }

  // Add to cart functionality (basic)
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      cartCount++;
      if (cartCounter) {
        cartCounter.textContent = cartCount;
        localStorage.setItem("cartCount", cartCount);
      }

      // Show feedback
      const originalText = this.textContent;
      this.textContent = "Added!";
      this.style.backgroundColor = "var(--lime)";
      this.style.color = "var(--deep-purple)";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = "";
        this.style.color = "";
      }, 1000);
    });
  });
});
