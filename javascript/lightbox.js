// js/lightbox.js

document.addEventListener("DOMContentLoaded", () => {
    // Create the lightbox modal container dynamically if it doesn't exist
    let lightboxModal = document.getElementById("lightboxModal");
    if (!lightboxModal) {
        lightboxModal = document.createElement("div");
        lightboxModal.id = "lightboxModal";
        lightboxModal.className = "lightbox-modal";
        lightboxModal.innerHTML = `
            <div class="lightbox-content">
                <button id="closeLightbox" class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img id="lightboxImg" src="" alt="Enlarged view">
                <p id="lightboxCaption"></p>
            </div>
        `;
        document.body.appendChild(lightboxModal);
    }

    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeLightbox = document.getElementById("closeLightbox");

    // Target images you want to be clickable (e.g., service images, feature images, or any image with class 'lightboxable')
    const targetImages = document.querySelectorAll(".service-image, .feature-image, img.lightboxable");

    targetImages.forEach(img => {
        img.style.cursor = "pointer"; // Indicate that the image is clickable
        img.addEventListener("click", () => {
            lightboxModal.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || "";
        });
    });

    // Function to close the lightbox
    const closeModal = () => {
        lightboxModal.style.display = "none";
        lightboxImg.src = "";
    };

    // Close events: click close button, click outside image, or press Esc key
    closeLightbox.addEventListener("click", closeModal);

    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxModal.style.display === "flex") {
            closeModal();
        }
    });
});