document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    function loadCart() {
        cartList.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartList.innerHTML = "<li>Your cart is empty 🛒</li>";
        } else {
            cart.forEach((item, index) => {
                let li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - ₦${item.price} x ${item.quantity}
                    <button class="remove-btn" data-id="${item.id}">❌</button>
                `;
                cartList.appendChild(li);
                total += item.price * item.quantity;
            });
        }

        cartTotal.textContent = `Total: ₦${total}`;

        // Attach event listeners to remove buttons after loading cart
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let itemId = parseInt(this.getAttribute("data-id"));
                removeFromCart(itemId);
            });
        });
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();  // Reload cart UI
        updateCartCount(); // Update cart count on homepage
    }

    function updateCartCount() {
        let cartCount = document.getElementById("cart-count");
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Load cart when the page loads
    loadCart();
});
