const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, {
  threshold: 0.18
});

document.querySelectorAll(".work-row, .profile-card, .link-card").forEach((el) => {
  revealObserver.observe(el);
});