const menuToggle = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});
function nextImage(button) {
    let product = button.closest(".product");
    let images = product.querySelectorAll(".product-image img");
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains("active"));

    images[activeIndex].classList.remove("active");
    let nextIndex = (activeIndex + 1) % images.length;
    images[nextIndex].classList.add("active");
}
function prevImage(button) {
    let product = button.closest(".product");
    let images = product.querySelectorAll(".product-image img");
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains("active"));

    images[activeIndex].classList.remove("active");
    let prevIndex = (activeIndex - 1 + images.length) % images.length;
    images[prevIndex].classList.add("active");
}