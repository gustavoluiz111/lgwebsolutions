document.addEventListener("DOMContentLoaded", () => {

  // === Scroll suave ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // === Fade-in ===
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // === TextPressure avançado ===
  const heroText = document.querySelector(".text-pressure");
  if(!heroText) return;

  const chars = heroText.textContent.split("");
  heroText.textContent = "";
  const spans = chars.map(c => {
    const span = document.createElement("span");
    span.textContent = c;
    span.style.display = "inline-block";
    span.style.transition = "font-variation-settings 0.1s ease-out";
    heroText.appendChild(span);
    return span;
  });

  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let cursor = { ...mouse };

  window.addEventListener("mousemove", e => { cursor.x = e.clientX; cursor.y = e.clientY; });
  window.addEventListener("touchmove", e => { const t = e.touches[0]; cursor.x = t.clientX; cursor.y = t.clientY; }, { passive: false });

  const dist = (a,b) => Math.hypot(b.x-a.x, b.y-a.y);

  const animate = () => {
    mouse.x += (cursor.x - mouse.x)/15;
    mouse.y += (cursor.y - mouse.y)/15;

    const rect = heroText.getBoundingClientRect();
    const maxDist = rect.width / 2;

    spans.forEach(span => {
      const spanRect = span.getBoundingClientRect();
      const center = { x: spanRect.left + spanRect.width/2, y: spanRect.top + spanRect.height/2 };
      const d = dist(mouse, center);

      const wght = Math.floor(Math.max(100, 900 - (d / maxDist) * 800));
      const wdth = Math.floor(Math.max(50, 200 - (d / maxDist) * 150));
      const ital = Math.min(1, (d / maxDist));

      span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital.toFixed(2)}`;
    });

    requestAnimationFrame(animate);
  };
  animate();
});


    requestAnimationFrame(animate);
  };
  animate();
});
