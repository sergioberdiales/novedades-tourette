const cards = Array.from(document.querySelectorAll("[data-post-card]"));
const buttons = Array.from(document.querySelectorAll("[data-category-filters] [data-category]"));
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("[data-category-select]");
const audienceSelect = document.querySelector("[data-audience-select]");
const count = document.querySelector("[data-results-count]");
const empty = document.querySelector("[data-empty-state]");

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getValue(control) {
  return control?.value || "Todos";
}

function syncCategoryButtons(category) {
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String((button.dataset.category ?? "Todos") === category));
  });
}

function applyFilters() {
  const query = normalize(searchInput?.value ?? "");
  const activeCategory = getValue(categorySelect);
  const activeAudience = getValue(audienceSelect);
  let visible = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const audiences = (card.dataset.audiences ?? "").split("|");
    const content = normalize(card.dataset.search ?? "");
    const matchesCategory = activeCategory === "Todos" || category === activeCategory;
    const matchesAudience = activeAudience === "Todos" || audiences.includes(activeAudience);
    const matchesQuery = !query || content.includes(query);
    const shouldShow = matchesCategory && matchesAudience && matchesQuery;
    card.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });

  if (count) {
    count.textContent = `${visible} ${visible === 1 ? "ficha" : "fichas"}`;
  }
  if (empty) {
    empty.hidden = visible !== 0;
  }
  syncCategoryButtons(activeCategory);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (categorySelect) {
      categorySelect.value = button.dataset.category ?? "Todos";
    }
    applyFilters();
  });
});

searchInput?.addEventListener("input", applyFilters);
categorySelect?.addEventListener("change", applyFilters);
audienceSelect?.addEventListener("change", applyFilters);
applyFilters();
