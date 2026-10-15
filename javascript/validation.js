/**
 * validation.js - Combined Client-Side Validation & EmailJS Integration
 * Handles validation and email submission for contactus.html and Enquiry.html forms.
 */
document.addEventListener("DOMContentLoaded", () => {
    // EmailJS Credentials
    const SERVICE_ID = "service_l1xzj4d";
    const TEMPLATE_ID = "template_vp5iwho";

    const contactForm = document.getElementById("contactForm");
    const enquiryForm = document.getElementById("enquiryForm");

    /* ---------- REGULAR EXPRESSIONS ---------- */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

    /* ---------- HELPER FUNCTIONS ---------- */
    function showError(inputElement, errorSpanId, messageText) {
        if (!inputElement) return;
        inputElement.classList.add("error");
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = messageText;
            errorSpan.classList.add("visible");
        }
    }

    function resetErrors(elements) {
        elements.forEach((element) => {
            if (element) element.classList.remove("error");
        });
        const errorSpans = document.querySelectorAll(".error-message");
        errorSpans.forEach((span) => {
            span.classList.remove("visible");
            span.textContent = "";
        });
    }

    /* ==========================================
       1. CONTACT US FORM HANDLER
       ========================================== */
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let isValid = true;

            const fullName = document.getElementById("cname");
            const email = document.getElementById("cemail");
            const phone = document.getElementById("cphone");
            const location = document.getElementById("location");
            const enquiryType = document.getElementById("enquiry_type");
            const message = document.getElementById("cmessage");
            const formStatus = document.getElementById("formStatus");
            const submitBtn = document.getElementById("contactSubmitBtn");

            if (formStatus) {
                formStatus.classList.remove("success", "error");
                formStatus.textContent = "";
            }

            resetErrors([fullName, email, phone, location, enquiryType, message]);

            if (fullName && fullName.value.trim().length < 3) {
                showError(fullName, "nameError", "Please enter a valid full name (at least 3 characters).");
                isValid = false;
            }

            if (email && !emailRegex.test(email.value.trim())) {
                showError(email, "emailError", "Please enter a valid email address.");
                isValid = false;
            }

            if (phone && !phoneRegex.test(phone.value.trim())) {
                showError(phone, "phoneError", "Please enter a valid contact phone number.");
                isValid = false;
            }

            if (location && (location.value === "" || location.value === null)) {
                showError(location, "locationError", "Please select a clinic location.");
                isValid = false;
            }

            if (enquiryType && (enquiryType.value === "" || enquiryType.value === null)) {
                showError(enquiryType, "enquiryError", "Please select an enquiry type.");
                isValid = false;
            }

            if (message && message.value.trim().length < 10) {
                showError(message, "messageError", "Please enter message details (at least 10 characters).");
                isValid = false;
            }

            if (isValid) {
                if (submitBtn) submitBtn.disabled = true;
                if (formStatus) {
                    formStatus.textContent = "Sending message...";
                    formStatus.style.color = "blue";
                }

                const templateParams = {
                    title: "Website Contact Form",
                    fullName: fullName.value.trim(),
                    email: email.value.trim(),
                    mobileNumber: phone.value.trim(),
                    subject: enquiryType.value,
                    message: message.value.trim()
                };

                emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                    .then(() => {
                        if (formStatus) {
                            formStatus.textContent = "Thank you! Your message has been sent successfully.";
                            formStatus.style.color = "green";
                        }
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error("EmailJS Error:", error);
                        if (formStatus) {
                            formStatus.textContent = "Failed to send message. Please try again later.";
                            formStatus.style.color = "red";
                        }
                    })
                    .finally(() => {
                        if (submitBtn) submitBtn.disabled = false;
                    });
            }
        });
    }

    /* ==========================================
       2. ENQUIRY FORM HANDLER (All fields required)
       ========================================== */
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let isValid = true;

            const fullName = document.getElementById("fullname");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            const subject = document.getElementById("subject");
            const type = document.getElementById("type");
            const message = document.getElementById("message");
            const enquiryStatus = document.getElementById("enquiryStatus");
            const submitBtn = document.getElementById("enquirySubmitBtn");

            if (enquiryStatus) {
                enquiryStatus.classList.remove("success", "error");
                enquiryStatus.textContent = "";
            }

            resetErrors([fullName, email, phone, subject, type, message]);

            // Full Name validation
            if (fullName && fullName.value.trim().length < 3) {
                showError(fullName, "nameError", "Please enter a valid full name (at least 3 characters).");
                isValid = false;
            }

            // Email validation
            if (email && !emailRegex.test(email.value.trim())) {
                showError(email, "emailError", "Please enter a valid email address.");
                isValid = false;
            }

            // Phone validation (Now strictly required)
            if (phone && !phoneRegex.test(phone.value.trim())) {
                showError(phone, "phoneError", "Please enter a valid contact phone number.");
                isValid = false;
            }

            // Subject validation
            if (subject && subject.value.trim().length < 3) {
                showError(subject, "subjectError", "Please enter an enquiry subject (at least 3 characters).");
                isValid = false;
            }

            // Type of Enquiry validation
            if (type && (type.value === "" || type.value === null)) {
                showError(type, "enquiryError", "Please select a type of enquiry.");
                isValid = false;
            }

            // Message validation
            if (message && message.value.trim().length < 10) {
                showError(message, "messageError", "Please enter message details (at least 10 characters).");
                isValid = false;
            }

            // If all checks pass, send via EmailJS
            if (isValid) {
                if (submitBtn) submitBtn.disabled = true;
                if (enquiryStatus) {
                    enquiryStatus.textContent = "Sending enquiry...";
                    enquiryStatus.style.color = "blue";
                }

                const templateParams = {
                    title: "General Enquiry Page",
                    fullName: fullName.value.trim(),
                    email: email.value.trim(),
                    mobileNumber: phone.value.trim(),
                    subject: subject.value.trim() + " (" + type.value + ")",
                    message: message.value.trim()
                };

                emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                    .then(() => {
                        if (enquiryStatus) {
                            enquiryStatus.textContent = "Thank you! Your enquiry has been received successfully.";
                            enquiryStatus.style.color = "green";
                        }
                        enquiryForm.reset();
                    })
                    .catch((error) => {
                        console.error("EmailJS Error:", error);
                        if (enquiryStatus) {
                            enquiryStatus.textContent = "Failed to send enquiry. Please try again later.";
                            enquiryStatus.style.color = "red";
                        }
                    })
                    .finally(() => {
                        if (submitBtn) submitBtn.disabled = false;
                    });
            }
        });
    }
});