document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");

    console.log("Menu button:", menuToggle);
    console.log("Nav list:", navList);

    if (!menuToggle || !navList) {
        console.error("Error: One or more elements are missing!");
        return;
    }

    menuToggle.addEventListener("click", () => {
        console.log("Menu button clicked!");
        navList.classList.toggle("active");
    });
});