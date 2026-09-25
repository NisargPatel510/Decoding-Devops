const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const root = document.documentElement;
const theme = $("#themeToggle");
const menu = $("#menuToggle");
const nav = $("#navLinks");
const progress = $("#progressBar");
const toast = $("#toast");

const savedTheme = localStorage.getItem("decoding-theme");
if (savedTheme) root.dataset.theme = savedTheme;
theme.textContent = root.dataset.theme === "light" ? "☾" : "☼";

theme.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("decoding-theme", root.dataset.theme);
  theme.textContent = root.dataset.theme === "light" ? "☾" : "☼";
});

menu.addEventListener("click", () => {
  nav.classList.toggle("open");
});
$$(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
}, {passive:true});

// Tool tabs
$$(".tool-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".tool-tab").forEach(t => t.classList.remove("active"));
    $$(".tool-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.tool}`).classList.add("active");
    $("#searchInput").value = "";
    updateSearch();
  });
});

// Inner tabs
$$(".subtab").forEach(tab => {
  tab.addEventListener("click", () => {
    const panel = tab.closest(".tool-panel");
    $$(".subtab", panel).forEach(t => t.classList.remove("active"));
    $$(".subpanel", panel).forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    const target = $(`#${tab.dataset.panel}`);
    if (target) target.classList.add("active");
    $("#searchInput").value = "";
    updateSearch();
  });
});

// Copy buttons
function showToast(message="Copied!") {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1300);
}
$$(".copy").forEach(btn => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      showToast("Copied to clipboard ✓");
      const old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => btn.textContent = old, 1000);
    } catch {
      showToast("Copy unavailable");
    }
  });
});

// Search only visible concept cards in active tool
const searchInput = $("#searchInput");
function updateSearch() {
  const activeTool = $(".tool-panel.active");
  if (!activeTool) return;
  const q = searchInput.value.trim().toLowerCase();
  const cards = $$(".concept", activeTool);
  let visible = 0;
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const match = !q || text.includes(q);
    card.style.display = match ? "" : "none";
    if (match) visible++;
  });
  $("#searchResult").textContent = q ? `${visible} match${visible === 1 ? "" : "es"}` : "";
}
searchInput.addEventListener("input", updateSearch);

// Pipeline explanation
const pipelineData = {
  github: ["GH","GitHub — Source","Developers commit and push source code. The repository is the versioned source of truth for the application."],
  jenkins: ["J","Jenkins — Automation","Jenkins reads the project and executes the pipeline stages: build, test, package and deployment."],
  docker: ["🐳","Docker — Package","Docker turns the application and its dependencies into a portable image that can be run as a container."],
  kubernetes: ["☸","Kubernetes — Deploy","Kubernetes uses the container image to run and manage application workloads through resources such as Deployments and Services."]
};
$$(".pipe").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".pipe").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const [icon,title,text] = pipelineData[btn.dataset.stage];
    $("#pipelineDetail").innerHTML = `<strong>${icon}</strong><div><b>${title}</b><p>${text}</p></div>`;
  });
});

$("#commandsButton").addEventListener("click", () => {
  showToast("Cheat sheet is planned for the next phase.");
});
