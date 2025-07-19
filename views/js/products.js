// Products Page Specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Category link highlighting
  const categoryLinks = document.querySelectorAll(".category-link");
  const currentPath = window.location.pathname;

  categoryLinks.forEach((link) => {
    if (currentPath.includes(link.getAttribute("href").split("/").pop())) {
      link.style.backgroundColor = "var(--purple)";
      link.style.color = "var(--white)";
    }
  });

  // Product card loading animation
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Quick view functionality (placeholder)
  const viewDetailsButtons = document.querySelectorAll(".product-card .btn");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add loading state
      const originalText = this.textContent;
      this.textContent = "Loading...";
      this.style.opacity = "0.7";

      // Simulate loading delay
      setTimeout(() => {
        this.textContent = originalText;
        this.style.opacity = "1";
      }, 500);
    });
  });

  // Product search functionality (basic)
  const searchInput = document.querySelector(".product-search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const products = document.querySelectorAll(".product-card");

      products.forEach((product) => {
        const title = product
          .querySelector(".product-title")
          .textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  }

  // Price range filter (placeholder)
  const priceFilter = document.querySelector(".price-filter");
  if (priceFilter) {
    priceFilter.addEventListener("change", function () {
      const selectedPrice = this.value;
      const products = document.querySelectorAll(".product-card");

      products.forEach((product) => {
        const priceText = product.querySelector(".product-price").textContent;
        const price = parseFloat(priceText.replace("$", ""));

        let show = true;
        switch (selectedPrice) {
          case "under-50":
            show = price < 50;
            break;
          case "50-100":
            show = price >= 50 && price <= 100;
            break;
          case "100-200":
            show = price > 100 && price <= 200;
            break;
          case "over-200":
            show = price > 200;
            break;
        }

        product.style.display = show ? "block" : "none";
      });
    });
  }

  // Sort functionality (placeholder)
  const sortSelect = document.querySelector(".sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const sortBy = this.value;
      const productGrid = document.querySelector(".product-grid");
      const products = Array.from(productGrid.children);

      products.sort((a, b) => {
        const priceA = parseFloat(
          a.querySelector(".product-price").textContent.replace("$", "")
        );
        const priceB = parseFloat(
          b.querySelector(".product-price").textContent.replace("$", "")
        );

        if (sortBy === "price-low") {
          return priceA - priceB;
        } else if (sortBy === "price-high") {
          return priceB - priceA;
        }
        return 0;
      });

      // Re-append sorted products
      products.forEach((product) => {
        productGrid.appendChild(product);
      });
    });
  }
});
