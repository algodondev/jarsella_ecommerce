// Jewelry Category Specific JavaScript - Andrea

// Change page background
document.getElementById("toggleBackground").addEventListener("click", () => {
    document.body.classList.toggle("bg-active");
});
//-------------------------------------------------------------------------------

// Add the selected product to the cart
let cartCount = 0;
const cartCounterElement = document.querySelector(".cart-counter");
const addToCartButtons = document.querySelectorAll(".btn");

addToCartButtons.forEach(button => {
    if (button.textContent === "Add to Cart") {
        button.addEventListener("click", () => {
            cartCount++;
            cartCounterElement.textContent = cartCount;
            showToast("Producto añadido al carrito");
        });
    }
});
//-------------------------------------------------------------------------------

// Function para mostrar mensaje tipo alerta abajo
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    document.body.appendChild(toast);

    // Forzar reflujo para activar transición
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Delete después de 4 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}
//-------------------------------------------------------------------------------

// Sort the order of the products from lowest to highest and viceversa
document.getElementById("sortPrice").addEventListener("change", function () {
    const order = this.value;
    const productGrid = document.querySelector(".product-grid");
    const cards = Array.from(productGrid.querySelectorAll(".jewelry-product-card"));

    cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".product-price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".product-price").textContent.replace("$", ""));
        return order === "asc" ? priceA - priceB : priceB - priceA;
    });

    // Reinserta the elements in order
    cards.forEach(card => productGrid.appendChild(card));
});
//-------------------------------------------------------------------------------

//Zoom on the product image
const productImages = document.querySelectorAll(".product-image");

productImages.forEach(image => {
    image.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.2)";
        this.style.transition = "transform 0.3s ease";
    });

    image.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
    });
});
