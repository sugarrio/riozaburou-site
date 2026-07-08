window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");

  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});
