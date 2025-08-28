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

// ========== NEWSLETTER ==========
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

// ========== SCROLL FADE-IN ==========
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
