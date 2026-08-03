// Год в подвале
document.getElementById("year").textContent = new Date().getFullYear();

// Плавное появление секций при прокрутке
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(el);
});

/* ===== Лайтбокс для фотогалереи ===== */
(function () {
  const lightbox = document.getElementById("lightbox");
  const imgEl = lightbox.querySelector(".lightbox__img");
  const capEl = lightbox.querySelector(".lightbox__caption");
  const btnClose = lightbox.querySelector(".lightbox__close");
  const btnPrev = lightbox.querySelector(".lightbox__nav--prev");
  const btnNext = lightbox.querySelector(".lightbox__nav--next");

  // Собираем все фото галереи
  const photos = Array.from(
    document.querySelectorAll(".gallery__item--photo img")
  );
  let current = 0;

  function show(i) {
    current = (i + photos.length) % photos.length;
    const img = photos[current];
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    const cap = img.closest("figure").querySelector("figcaption");
    capEl.textContent = cap ? cap.textContent : "";
  }

  function open(i) {
    show(i);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  photos.forEach((img, i) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => open(i));
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
  btnNext.addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });

  // Клик по фону закрывает
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === imgEl) close();
  });

  // Управление с клавиатуры
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();

/* ===== Разлетающиеся сердечки по клику ===== */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const symbols = ["💖", "🐾", "💕", "✨", "😻", "🌸"];

  document.addEventListener("click", (e) => {
    // не сыпать сердечки при работе с лайтбоксом
    if (e.target.closest("#lightbox")) return;

    const count = 6;
    for (let n = 0; n < count; n++) {
      const el = document.createElement("span");
      el.className = "heart-burst";
      el.textContent = symbols[Math.floor((n / count) * symbols.length)];
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
      const angle = (Math.PI * 2 * n) / count + Math.random() * 0.6;
      const dist = 60 + Math.random() * 50;
      el.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      el.style.setProperty("--dy", (Math.sin(angle) * dist - 40) + "px");
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  });
})();
