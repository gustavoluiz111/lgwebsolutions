// ========== THEME SWITCHER ==========
const themeToggle = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// ========== NEWSLETTER (simples) ==========
const form = document.querySelector(".newsletter");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input").value;
    if (email) {
      alert(`Obrigado por assinar, ${email}! 🚀`);
      form.reset();
    }
  });
}
