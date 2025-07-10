// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 1,
  smartphone: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },
});

// Form handling
document.querySelector(".notify-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your interest! We will notify you when we open.");
});
