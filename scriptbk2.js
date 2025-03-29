// Toggle Sidebar
const menuToggle = document.getElementById("mobile-menu");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add a product to the cart
function addToCart(id, name, price) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({ id, name, price, quantity: 1 }); // Add new item
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();
}

// Function to update cart count on homepage
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Ensure cart count updates on page load
updateCartCount();
