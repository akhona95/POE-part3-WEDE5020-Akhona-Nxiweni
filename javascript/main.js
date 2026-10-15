/**
 * main.js - Mobile toggle & dynamic year script
 */
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.querySelector(".footer-bottom p");
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `&copy; ${currentYear} Akhona Clinic. All rights reserved.`;
    }

    const navbar = document.querySelector(".navbar");
    const header = document.querySelector(".site-header");

    if (navbar && header && !document.querySelector(".menu-toggle")) {
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "menu-toggle";
        toggleBtn.innerHTML = "☰ Menu";
        header.insertBefore(toggleBtn, navbar);

        toggleBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }
});