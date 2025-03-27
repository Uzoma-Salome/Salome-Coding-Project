const menuToggle = document.getElementById("mobile-menu");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

function loadCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₦${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartItemsContainer.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("cart-total").innerText = totalPrice;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Ensure cart count updates when page loads
updateCartCount();

// Load cart if on cart page
if (document.getElementById("cart-items")) {
    loadCart();
}
