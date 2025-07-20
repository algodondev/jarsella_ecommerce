/**
 * Kids Collection Page - Main JavaScript
 * 
 * This script handles all the interactive functionality for the Kids Collection page
 * including product display, filtering, sorting, cart functionality, and theme switching.
 */

// Product Data Service
const ProductService = {
  products: [
    {
      id: 1,
      name: "Colorful T-Shirt",
      price: 15.99,
      image: "https://m.media-amazon.com/images/I/71xC2+v4OqL._AC_SX679_.jpg",
      category: "clothing",
      alt: "Colorful cotton t-shirt for kids with fun prints"
    },
    {
      id: 2,
      name: "Denim Jeans",
      price: 24.99,
      image: "https://m.media-amazon.com/images/I/81z3U8pv1oL._AC_SY879_.jpg",
      category: "clothing",
      alt: "Blue denim jeans for children with adjustable waist"
    },
    {
      id: 3,
      name: "Sneakers",
      price: 34.99,
      image: "https://m.media-amazon.com/images/I/51aliPY-W+L._AC_SX695_.jpg",
      category: "footwear",
      alt: "Comfortable white sneakers for kids with colorful laces"
    },
    {
      id: 4,
      name: "Winter Jacket",
      price: 45.99,
      image: "https://m.media-amazon.com/images/I/81Qclhd5eEL._AC_SX679_.jpg",
      category: "clothing",
      alt: "Warm winter jacket for children with hood and pockets"
    },
    {
      id: 5,
      name: "Baseball Cap",
      price: 12.99,
      image: "https://m.media-amazon.com/images/I/81KQR9pEQUL._AC_SX679_.jpg",
      category: "accessories",
      alt: "Adjustable baseball cap for kids with team logo"
    },
    {
      id: 6,
      name: "Backpack",
      price: 29.99,
      image: "https://m.media-amazon.com/images/I/910eqI9n9jL._AC_SX679_.jpg",
      category: "accessories",
      alt: "Durable backpack for school with multiple compartments"
    }
  ],

  /**
   * Filters products by price range
   * @param {string} range - Price range filter
   * @returns {Array} Filtered products
   */
  filterByPrice(range) {
    switch(range) {
      case 'under20': return this.products.filter(p => p.price < 20);
      case '20to40': return this.products.filter(p => p.price >= 20 && p.price <= 40);
      case 'over40': return this.products.filter(p => p.price > 40);
      default: return [...this.products];
    }
  },

  /**
   * Sorts products by price
   * @param {string} direction - 'asc' or 'desc'
   * @returns {Array} Sorted products
   */
  sortByPrice(direction) {
    return [...this.products].sort((a, b) => 
      direction === 'asc' ? a.price - b.price : b.price - a.price
    );
  },

  /**
   * Finds a product by ID
   * @param {number} id - Product ID
   * @returns {Object|null} Product object or null if not found
   */
  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }
};

// Cart Service
const CartService = {
  items: 0,
  counterElement: null,

  /**
   * Initializes the cart service
   * @param {HTMLElement} counterElement - DOM element for cart counter
   */
  init(counterElement) {
    this.counterElement = counterElement;
    this.loadFromStorage();
  },

  /**
   * Adds an item to the cart
   */
  addItem() {
    this.items++;
    this.updateCounter();
    this.saveToStorage();
  },

  /**
   * Updates the cart counter display
   */
  updateCounter() {
    if (this.counterElement) {
      this.counterElement.textContent = this.items;
      this.counterElement.setAttribute('aria-label', `${this.items} items in cart`);
    }
  },

  /**
   * Saves cart state to localStorage
   */
  saveToStorage() {
    localStorage.setItem('cartItems', this.items);
  },

  /**
   * Loads cart state from localStorage
   */
  loadFromStorage() {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      this.items = parseInt(savedItems);
      this.updateCounter();
    }
  }
};

// Theme Service
const ThemeService = {
  currentTheme: 'default',
  btnElement: null,

  /**
   * Initializes the theme service
   * @param {HTMLElement} btnElement - Theme toggle button
   */
  init(btnElement) {
    this.btnElement = btnElement;
    this.loadTheme();
  },

  /**
   * Toggles between light and dark theme
   */
  toggle() {
    if (this.currentTheme === 'default') {
      this.setTheme('alternate');
    } else {
      this.setTheme('default');
    }
  },

  /**
   * Sets the current theme
   * @param {string} theme - Theme name
   */
  setTheme(theme) {
    this.currentTheme = theme;
    
    if (theme === 'alternate') {
      document.body.style.setProperty('--primary-color', '#ff6b6b');
      document.body.style.setProperty('--secondary-color', '#4ecdc4');
      this.btnElement.textContent = 'Reset Theme';
    } else {
      document.body.style.setProperty('--primary-color', '#6a5acd');
      document.body.style.setProperty('--secondary-color', '#9370db');
      this.btnElement.textContent = 'Change Theme Color';
    }
    
    this.saveTheme();
  },

  /**
   * Saves theme preference to localStorage
   */
  saveTheme() {
    localStorage.setItem('themePreference', this.currentTheme);
  },

  /**
   * Loads theme preference from localStorage
   */
  loadTheme() {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
};

// UI Service
const UIService = {
  /**
   * Creates a product card element
   * @param {Object} product - Product data
   * @returns {HTMLElement} Product card element
   */
  createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card kids-product-card';
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.alt}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <button class="btn add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">
            Add to Cart
          </button>
          <button class="btn view-details" aria-label="View details for ${product.name}">
            View Details
          </button>
        </div>
      </div>
    `;
    return card;
  },

  /**
   * Shows a notification message
   * @param {string} message - Notification message
   * @param {number} duration - Duration in ms (default: 2000)
   */
  showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, duration);
  },

  /**
   * Renders a list of special offers
   * @param {HTMLElement} container - Container element
   * @param {Array} offers - Array of offer strings
   */
  renderSpecialOffers(container, offers) {
    const list = document.createElement('ul');
    list.className = 'offers-list';
    
    offers.forEach(offer => {
      const item = document.createElement('li');
      item.textContent = offer;
      list.appendChild(item);
    });
    
    container.innerHTML = '';
    container.appendChild(list);
  },

  /**
   * Adds a new offer to the offers list
   * @param {HTMLElement} container - Offers list container
   * @param {string} offer - New offer text
   */
  addNewOffer(container, offer) {
    const list = container.querySelector('ul') || document.createElement('ul');
    const item = document.createElement('li');
    item.textContent = offer;
    list.appendChild(item);
    
    if (!container.contains(list)) {
      container.appendChild(list);
    }
    
    // Highlight animation
    item.style.animation = 'highlight 1.5s';
    item.addEventListener('animationend', () => {
      item.style.animation = '';
    });
  }
};

// Main Application
document.addEventListener("DOMContentLoaded", function() {
  // DOM Elements
  const productGrid = document.getElementById('product-grid');
  const priceFilter = document.getElementById('price-filter');
  const sortAscBtn = document.getElementById('sort-asc');
  const sortDescBtn = document.getElementById('sort-desc');
  const changeThemeBtn = document.getElementById('change-theme');
  const specialOffersSection = document.getElementById('special-offers');
  const addOfferBtn = document.getElementById('add-offer');
  const cartCounter = document.querySelector('.cart-counter');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  // Initialize services
  CartService.init(cartCounter);
  ThemeService.init(changeThemeBtn);

  // Initial offers data
  const initialOffers = [
    "Buy 2 items, get 15% off!",
    "Free shipping on orders over $50",
    "New customers get 10% off first purchase"
  ];

  /**
   * Renders products to the grid
   * @param {Array} products - Array of product objects
   */
  function renderProducts(products) {
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
      productGrid.innerHTML = `
        <p class="no-products" style="grid-column: 1/-1; text-align: center;">
          No products found matching your criteria.
        </p>
      `;
      return;
    }
    
    products.forEach(product => {
      const card = UIService.createProductCard(product);
      productGrid.appendChild(card);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', handleAddToCart);
    });
    
    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', handleViewDetails);
    });
  }

  /**
   * Handles adding a product to cart
   * @param {Event} e - Click event
   */
  function handleAddToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = ProductService.getProductById(productId);
    
    if (product) {
      CartService.addItem();
      UIService.showNotification(`${product.name} added to cart!`);
    }
  }

  /**
   * Handles viewing product details
   * @param {Event} e - Click event
   */
  function handleViewDetails(e) {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    alert(`Details for ${productName} will be shown here!`);
  }

  /**
   * Handles adding a new special offer
   */
  function handleAddOffer() {
    const newOffer = prompt("Enter new special offer:");
    if (newOffer && newOffer.trim()) {
      UIService.addNewOffer(specialOffersSection, newOffer.trim());
    } else if (newOffer !== null) {
      alert("Please enter a valid offer.");
    }
  }

  /**
   * Toggles scroll-to-top button visibility
   */
  function toggleScrollToTopButton() {
    scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  }

  /**
   * Scrolls to top of page
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Initial render
  renderProducts(ProductService.products);
  UIService.renderSpecialOffers(specialOffersSection, initialOffers);

  // Event listeners
  priceFilter.addEventListener('change', () => {
    renderProducts(ProductService.filterByPrice(priceFilter.value));
  });

  sortAscBtn.addEventListener('click', () => {
    renderProducts(ProductService.sortByPrice('asc'));
  });

  sortDescBtn.addEventListener('click', () => {
    renderProducts(ProductService.sortByPrice('desc'));
  });

  changeThemeBtn.addEventListener('click', () => {
    ThemeService.toggle();
  });

  addOfferBtn.addEventListener('click', handleAddOffer);

  window.addEventListener('scroll', toggleScrollToTopButton);
  scrollToTopBtn.addEventListener('click', scrollToTop);

  // Add CSS animations dynamically if not already in stylesheet
  if (!document.getElementById('dynamic-animations')) {
    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
      @keyframes slideUp {
        from { bottom: -50px; opacity: 0; }
        to { bottom: 20px; opacity: 1; }
      }
      
      @keyframes highlight {
        0% { background-color: #ffff99; }
        100% { background-color: transparent; }
      }
    `;
    document.head.appendChild(style);
  }
});