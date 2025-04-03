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
// Assuming cart data is managed in cart.js (or localStorage or other methods)
    // For now, an example cart is hardcoded
    const cart = [
        { name: "Product 1", price: 10, quantity: 2 },
        { name: "Product 2", price: 20, quantity: 1 }
    ];

    // Function to display cart in the form
    function displayCart() {
        let cartDetails = document.getElementById("cartDetails");
        let cartText = "";

        cart.forEach(item => {
            cartText += `${item.name} - ${item.quantity} x $${item.price} = $${item.price * item.quantity}\n`;
        });

        cartDetails.textContent = cartText;
    }

    // Display the cart items when the page loads
    displayCart();

    // Handle form submission and send details to WhatsApp when the "Checkout" button is clicked
    document.getElementById("orderForm").onsubmit = function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get customer details
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;

        // Prepare cart details dynamically from the cart object
        let cartText = "";
        cart.forEach(item => {
            cartText += `${item.name} - ${item.quantity} x $${item.price} = $${item.price * item.quantity}\n`;
        });

        // Prepare message for WhatsApp
        const message = `*Customer Details:*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\n\n*Cart Details:*\n${cartText}`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Replace '234xxxxxxxxxx' with your actual WhatsApp number in international format
        const whatsappURL = `https://wa.me/234xxxxxxxxxx?text=${encodedMessage}`;

        // Redirect to WhatsApp (opens WhatsApp chat with pre-filled message)
        window.open(whatsappURL, "_blank");
    };