// Form handling
document.querySelector(".notify-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your interest! We will notify you when we open.");
});

// Subtle parallax effect
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".logo-icon-watermark");
  if (parallax) {
    parallax.style.transform = `translate(-50%, calc(-50% + ${
      scrolled * 0.05
    }px))`;
  }
});
