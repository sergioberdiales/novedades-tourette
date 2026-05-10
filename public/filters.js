const cards = Array.from(document.querySelectorAll("[data-post-card]"));
const buttons = Array.from(document.querySelectorAll("[data-category]"));
const searchInput = document.querySelector("#search");
const count = document.querySelector("[data-results-count]");
const empty = document.querySelector("[data-empty-state]");
let activeCategory = "Todos";

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function applyFilters() {
  const query = normalize(searchInput?.value ?? "");
  let visible = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const content = normalize(card.dataset.search ?? "");
    const matchesCategory = activeCategory === "Todos" || category === activeCategory;
    const matchesQuery = !query || content.includes(query);
    const shouldShow = matchesCategory && matchesQuery;
    card.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });

  if (count) {
    count.textContent = `${visible} ${visible === 1 ? "novedad disponible" : "novedades disponibles"}`;
  }
  if (empty) {
    empty.hidden = visible !== 0;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category ?? "Todos";
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    applyFilters();
  });
});

searchInput?.addEventListener("input", applyFilters);
