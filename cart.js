document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    function updateCartDisplay() {
        cartList.innerHTML = "";
        let total = 0;

        if (cartItems.length === 0) {
            cartList.innerHTML = "<li>Your cart is empty</li>";
        } else {
            cartItems.forEach((item, index) => {
                let li = document.createElement("li");
                li.textContent = `${item.name} - ₦${item.price}`;
                cartList.appendChild(li);
                total += item.price;
            });
        }

        cartTotal.textContent = total;
    }

    updateCartDisplay();
});
