document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // Scroll suave para links
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ==========================
  // Fade-in ao scroll
  // ==========================
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

  // ==========================
  // TextPressure-like efeito
  // ==========================
  const heroText = document.querySelector(".text-pressure");
  if(heroText){
    const chars = heroText.textContent.split("");
    heroText.textContent = "";
    const spans = chars.map(c => {
      const span = document.createElement("span");
      span.textContent = c;
      span.style.display = "inline-block";
      span.style.transition = "all 0.1s ease-out";
      heroText.appendChild(span);
      return span;
    });

    const containerRect = heroText.getBoundingClientRect();
    let mouse = { x: containerRect.left + containerRect.width/2, y: containerRect.top + containerRect.height/2 };
    let cursor = { ...mouse };

    // Atualiza posição do cursor
    window.addEventListener("mousemove", (e) => { cursor.x = e.clientX; cursor.y = e.clientY; });
    window.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      cursor.x = t.clientX; cursor.y = t.clientY;
    }, { passive: false });

    const dist = (a,b) => Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2);
    const maxDist = containerRect.width / 2;

    // Animação
    const animate = () => {
      mouse.x += (cursor.x - mouse.x)/15;
      mouse.y += (cursor.y - mouse.y)/15;

      spans.forEach(span => {
        const rect = span.getBoundingClientRect();
        const charCenter = { x: rect.x + rect.width/2, y: rect.y + rect.height/2 };
        const d = dist(mouse, charCenter);

        const getAttr = (distance, minVal, maxVal) => Math.max(minVal, maxVal - Math.abs((maxVal*distance)/maxDist) + minVal);

        const wdth = Math.floor(getAttr(d, 50, 200));
        const wght = Math.floor(getAttr(d, 100, 900));
        const ital = getAttr(d, 0, 1).toFixed(2);

        span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
      });

      requestAnimationFrame(animate);
    };
    animate();
  }
});
