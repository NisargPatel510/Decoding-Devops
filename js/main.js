const root = document.documentElement;
const progressBar = document.getElementById("progressBar");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const savedTheme = localStorage.getItem("decoding-devops-theme");
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeIcon() {
  themeToggle.textContent = root.dataset.theme === "light" ? "☾" : "☼";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("decoding-devops-theme", root.dataset.theme);
  updateThemeIcon();
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, { passive: true });

const pipelineSteps = document.querySelectorAll(".pipeline-step");
pipelineSteps.forEach((step, index) => {
  step.addEventListener("click", () => {
    pipelineSteps.forEach(s => s.classList.remove("active"));
    step.classList.add("active");
  });
});
