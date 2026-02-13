const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealElements.forEach((element) => observer.observe(element));

const revealButton = document.getElementById("reveal-button");
const secretMessage = document.getElementById("secret-message");

if (revealButton && secretMessage) {
  revealButton.addEventListener("click", () => {
    const isHidden = secretMessage.hasAttribute("hidden");

    if (isHidden) {
      secretMessage.removeAttribute("hidden");
      revealButton.setAttribute("aria-expanded", "true");
      revealButton.textContent = "Secret Revealed";
      return;
    }

    secretMessage.setAttribute("hidden", "");
    revealButton.setAttribute("aria-expanded", "false");
    revealButton.textContent = "Reveal Secret Message";
  });
}
