// Product Detail Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Image Gallery Functionality
  const mainImage = document.querySelector(".product-image-large");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image (in a real app, this would load different images)
      mainImage.src = this.src;
    });
  });

  // Size Selection
  const sizeButtons = document.querySelectorAll(".size-btn");
  let selectedSize = "M"; // Default size

  sizeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all size buttons
      sizeButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update selected size
      selectedSize = this.getAttribute("data-size");

      // Update product info (could update price, availability, etc.)
      updateProductInfo();
    });
  });

  // Color Selection
  const colorButtons = document.querySelectorAll(".color-btn");
  let selectedColor = "black"; // Default color

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all color buttons
      colorButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update selected color
      selectedColor = this.getAttribute("data-color");

      // Update product info
      updateProductInfo();
    });
  });

  // Quantity Controls
  const quantityInput = document.getElementById("quantity");
  const decreaseBtn = document.getElementById("decrease-qty");
  const increaseBtn = document.getElementById("increase-qty");

  decreaseBtn.addEventListener("click", function () {
    let currentQty = parseInt(quantityInput.value);
    if (currentQty > 1) {
      quantityInput.value = currentQty - 1;
    }
  });

  increaseBtn.addEventListener("click", function () {
    let currentQty = parseInt(quantityInput.value);
    if (currentQty < 10) {
      quantityInput.value = currentQty + 1;
    }
  });

  // Direct quantity input validation
  quantityInput.addEventListener("input", function () {
    let value = parseInt(this.value);
    if (value < 1) {
      this.value = 1;
    } else if (value > 10) {
      this.value = 10;
    }
  });

  // Add to Cart Functionality
  const addToCartBtn = document.querySelector(".add-to-cart");

  addToCartBtn.addEventListener("click", function () {
    const quantity = parseInt(quantityInput.value);
    const productName = document.querySelector(
      ".product-title-large"
    ).textContent;
    const productPrice = document.querySelector(
      ".product-price-large"
    ).textContent;

    // Validate selection
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color before adding to cart.");
      return;
    }

    // Show loading state
    const originalText = this.textContent;
    this.textContent = "Adding...";
    this.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Add to cart (this would normally send to backend)
      const cartItem = {
        name: productName,
        price: productPrice,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      };

      // Store in localStorage for demo
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart counter
      const cartCounter = document.querySelector(".cart-counter");
      if (cartCounter) {
        cartCounter.textContent = cart.length;
      }

      // Show success message
      this.textContent = "Added to Cart!";
      this.style.backgroundColor = "var(--lime)";
      this.style.color = "var(--deep-purple)";

      // Reset button after delay
      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = "";
        this.style.color = "";
        this.disabled = false;
      }, 2000);
    }, 1000);
  });

  // Add to Wishlist
  const wishlistBtn = document.querySelector(".btn-secondary");

  wishlistBtn.addEventListener("click", function () {
    const originalText = this.textContent;
    this.textContent = "Added to Wishlist!";
    this.style.backgroundColor = "var(--mint)";
    this.style.color = "var(--deep-purple)";

    setTimeout(() => {
      this.textContent = originalText;
      this.style.backgroundColor = "";
      this.style.color = "";
    }, 2000);
  });

  // Product Info Update Function
  function updateProductInfo() {
    // This function could update product details based on size/color selection
    // For demo purposes, we'll just log the selections
    console.log(`Selected: Size ${selectedSize}, Color ${selectedColor}`);

    // In a real app, this might:
    // - Update price based on size
    // - Check availability
    // - Update product images
    // - Update SKU
  }

  // Initialize product info
  updateProductInfo();

  // Related Products Hover Effects
  const relatedProducts = document.querySelectorAll(
    ".related-products .product-card"
  );
  relatedProducts.forEach((product) => {
    product.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    product.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Product Image Zoom Effect (basic)
  if (mainImage) {
    mainImage.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    mainImage.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }
});
