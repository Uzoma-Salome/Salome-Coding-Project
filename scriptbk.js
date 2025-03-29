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

// Function to load the cart items in `cart.html` 
function loadCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ""; // Clear existing cart items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
        document.getElementById("cart-total").innerText = "Total: ₦0";
        return;
    }

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₦${item.price} x ${item.quantity}
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("cart-total").innerText = `Total: ₦${totalPrice}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
    loadCart(); // Reload cart items
    updateCartCount(); // Update cart count
}

// Ensure cart count updates on page load
updateCartCount();

// Load cart if on cart page
if (document.getElementById("cart-items")) {
    loadCart();
}
document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    function updateCartDisplay() {
        cartList.innerHTML = "";
        let total = 0;

        if (cartItems.length === 0) {
            cartList.innerHTML = "<li>Your cart is empty 🛒</li>";
        } else {
            cartItems.forEach((item, index) => {
                let li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - ₦${item.price} x ${item.quantity}
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                `;
                cartList.appendChild(li);
                total += item.price * item.quantity;
            });
        }

        cartTotal.textContent = `Total: ₦${total}`;
    }

    updateCartDisplay();
});

