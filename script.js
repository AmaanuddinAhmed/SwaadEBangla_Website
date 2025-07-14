document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".notify-form");
  const emailInput = document.querySelector(".notify-input-email");
  const phoneInput = document.querySelector(".notify-input-phone");
  const notifyBtn = document.querySelector(".notify-btn");
  const notifySection = document.querySelector(".notify-section");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button to prevent multiple submissions
    notifyBtn.disabled = true;
    notifyBtn.textContent = "Submitting...";

    // Get input values
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Validation: Ensure exactly one field is filled
    if (email && phone) {
      showMessage(
        "Please enter either an email or a phone number, not both.",
        "error"
      );
      notifyBtn.disabled = false;
      notifyBtn.textContent = "Notify Me";
      return;
    }

    if (!email && !phone) {
      showMessage("Please enter an email or a phone number.", "error");
      notifyBtn.disabled = false;
      notifyBtn.textContent = "Notify Me";
      return;
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      notifyBtn.disabled = false;
      notifyBtn.textContent = "Notify Me";
      return;
    }

    // Validate phone if provided (supports Indian mobile numbers, e.g., +91 or 10 digits)
    if (phone && !/^\+?\d{10,12}$/.test(phone)) {
      showMessage("Please enter a valid phone number (10-12 digits).", "error");
      notifyBtn.disabled = false;
      notifyBtn.textContent = "Notify Me";
      return;
    }

    // Prepare data for Formspree
    const formData = {};
    if (email) formData.email = email;
    if (phone) formData.phone = phone;

    try {
      const response = await fetch("https://formspree.io/f/xkgzwkvv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showMessage(
          "Thank you for your interest! We'll notify you when we open.",
          "success"
        );
        form.reset(); // Clear the form
      } else {
        const errorData = await response.json();
        showMessage(
          errorData.errors?.[0]?.message ||
            "Something went wrong. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showMessage("Network error. Please try again later.", "error");
    } finally {
      notifyBtn.disabled = false;
      notifyBtn.textContent = "Notify Me";
    }
  });

  // Function to display success/error messages
  function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = notifySection.querySelector(".form-message");
    if (existingMessage) existingMessage.remove();

    // Create new message element
    const messageElement = document.createElement("p");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.marginTop = "1rem";
    messageElement.style.fontSize = "0.9rem";
    messageElement.style.fontWeight = "300";
    messageElement.style.color =
      type === "success" ? "var(--contrast-green)" : "var(--primary-red)";
    messageElement.style.opacity = "0";
    messageElement.style.transition = "opacity 0.3s ease";

    // Insert message below the form
    notifySection.appendChild(messageElement);

    // Fade in animation
    setTimeout(() => {
      messageElement.style.opacity = "1";
    }, 10);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.style.opacity = "0";
      setTimeout(() => messageElement.remove(), 300);
    }, 5000);
  }

  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 0.5,
  });
});
