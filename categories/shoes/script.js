document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    const carouselContainer = document.getElementById('carousel-container');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let products = [];
    let currentProduct = null;
    let currentImageIndex = 0;
    
    // Fetch products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data.products;
            displayProducts(products);
        })
        .catch(error => console.error('Error loading products:', error));
    
    // Display products
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = `product-card ${product.category}`;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="details-btn" data-id="${product.id}">View Details</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to detail buttons
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                showProductDetails(productId);
            });
        });
    }
    
    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            }
        });
    });
    
    // Show product details in modal
    function showProductDetails(productId) {
        currentProduct = products.find(product => product.id === productId);
        currentImageIndex = 0;
        
        if (currentProduct) {
            // Update modal content
            document.getElementById('modal-product-name').textContent = currentProduct.name;
            document.getElementById('modal-product-price').textContent = `$${currentProduct.price.toFixed(2)}`;
            document.getElementById('modal-product-description').textContent = currentProduct.description;
            
            // Create carousel images
            carouselContainer.innerHTML = '';
            currentProduct.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = `${currentProduct.name} ${index + 1}`;
                img.className = 'carousel-image';
                carouselContainer.appendChild(img);
            });
            
            // Show first image
            updateCarousel();
            
            // Show modal
            modal.style.display = 'block';
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }
    
    // Next image in carousel
    function nextImage() {
        if (currentProduct) {
            currentImageIndex = (currentImageIndex + 1) % currentProduct.images.length;
            updateCarousel();
        }
    }
    
    // Previous image in carousel
    function prevImage() {
        if (currentProduct) {
            currentImageIndex = (currentImageIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
            updateCarousel();
        }
    }
    
    // Event listeners for modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});