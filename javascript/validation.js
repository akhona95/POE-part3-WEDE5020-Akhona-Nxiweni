/**
 * validation.js - Custom Client-Side Form Validation
 *
 * This file handles client-side validation for contactus.html.
 */

document.addEventListener("DOMContentLoaded", () => {

  // Find the contact form element
  const form = document.getElementById("contactForm");

  // Exit script if form isn't present
  if (!form) return;

  /* ---------- REGULAR EXPRESSIONS ---------- */
  // Checks basic email pattern (e.g. user@domain.com)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Checks phone pattern (allows +, digits, spaces, hyphens, min 7-15 digits)
  const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

  /* ---------- FORM SUBMIT EVENT ---------- */
  form.addEventListener("submit", (event) => {

    // Prevent standard form submission & refresh
    event.preventDefault();

    let isValid = true;

    /* ---------- FIND FORM ELEMENTS ---------- */
    const fullName = document.getElementById("cname");
    const email = document.getElementById("cemail");
    const phone = document.getElementById("cphone");
    const location = document.getElementById("location");
    const enquiryType = document.getElementById("enquiry_type");
    const message = document.getElementById("cmessage");
    const formStatus = document.getElementById("formStatus");

    /* ---------- RESET PREVIOUS ERRORS ---------- */
    if (formStatus) {
      formStatus.classList.remove("success");
      formStatus.textContent = "";
    }

    resetErrors([
      fullName,
      email,
      phone,
      location,
      enquiryType,
      message
    ]);

    /* ---------- VALIDATE NAME ---------- */
    if (fullName && fullName.value.trim().length < 3) {
      showError(fullName, "nameError", "Please enter a valid full name (at least 3 characters).");
      isValid = false;
    }

    /* ---------- VALIDATE EMAIL ---------- */
    if (email && !emailRegex.test(email.value.trim())) {
      showError(email, "emailError", "Please enter a valid email address.");
      isValid = false;
    }

    /* ---------- VALIDATE PHONE ---------- */
    if (phone && !phoneRegex.test(phone.value.trim())) {
      showError(phone, "phoneError", "Please enter a valid contact phone number.");
      isValid = false;
    }

    /* ---------- VALIDATE LOCATION ---------- */
    if (location && (location.value === "" || location.value === null)) {
      showError(location, "locationError", "Please select a clinic location.");
      isValid = false;
    }

    /* ---------- VALIDATE ENQUIRY TYPE ---------- */
    if (enquiryType && (enquiryType.value === "" || enquiryType.value === null)) {
      showError(enquiryType, "enquiryError", "Please select an enquiry type.");
      isValid = false;
    }

    /* ---------- VALIDATE MESSAGE ---------- */
    if (message && message.value.trim().length < 10) {
      showError(message, "messageError", "Please enter a message details (at least 10 characters).");
      isValid = false;
    }

    /* ---------- SUCCESS HANDLER ---------- */
    if (isValid) {
      if (formStatus) {
        formStatus.classList.add("success");
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
      }

      form.reset();
    }
  });

  /* ========================================================
     FUNCTION: showError
     Highlights input and displays text inside error spans.
     ======================================================== */
  function showError(inputElement, errorSpanId, messageText) {
    if (!inputElement) return;

    inputElement.classList.add("error");

    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
      errorSpan.textContent = messageText;
      errorSpan.classList.add("visible");
    }
  }

  /* ========================================================
     FUNCTION: resetErrors
     Removes error styling and clears error message text.
     ======================================================== */
  function resetErrors(elements) {
    elements.forEach((element) => {
      if (element) {
        element.classList.remove("error");
      }
    });

    const errorSpans = document.querySelectorAll(".error-message");
    errorSpans.forEach((span) => {
      span.classList.remove("visible");
      span.textContent = "";
    });
  }

});