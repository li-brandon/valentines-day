/* ── Scroll reveal ─────────────────────────────────────── */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

/* ── Floating hearts ──────────────────────────────────── */
const heartsContainer = document.getElementById("hearts");

if (heartsContainer) {
  const heartChars = ["\u2665", "\u2764", "\u2661"];
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReduced) {
    const spawnHeart = () => {
      const el = document.createElement("span");
      el.className = "floating-heart";
      el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
      el.style.animationDuration = 6 + Math.random() * 8 + "s";
      el.style.animationDelay = Math.random() * 2 + "s";
      el.style.opacity = "0";
      heartsContainer.appendChild(el);

      el.addEventListener("animationend", () => el.remove(), { once: true });
    };

    // spawn a batch up front, then drip a new one periodically
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnHeart, i * 600);
    }
    setInterval(spawnHeart, 2400);
  }
}

/* ── Lightbox ─────────────────────────────────────────── */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("lightbox-close");
const photoButtons = document.querySelectorAll(".photo-button");

if (lightbox && lightboxImage && closeButton && photoButtons.length) {
  let lastFocused = null;

  const open = (src, alt) => {
    lastFocused = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.removeAttribute("hidden");
    closeButton.focus();
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.setAttribute("hidden", "");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  photoButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.lightboxSrc;
      const alt = btn.dataset.lightboxAlt || "Photo";
      if (src) open(src, alt);
    });
  });

  closeButton.addEventListener("click", close);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-stage")) {
      close();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hasAttribute("hidden")) {
      close();
    }
  });
}
