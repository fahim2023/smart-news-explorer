import * as model from "./model.js";
import DefaultView from "./view.js";
const state = {
  query: "",
  section: "all",
  fromDate: "",
  toDate: "",
  sort: "newest",
  page: 1,
  pageSize: 12,
  totalPages: 0,
  total: 0,
  results: [],
};
async function loadArticles() {
  try {
    const data = await model.fetchLatestArticles(state);
    state.total = data.total;
    state.totalPages = data.pages;
    state.currentPage = data.currentPage;
    DefaultView.updateLoadMoreBtn(state.currentPage, state.totalPages);

    if (state.page === 1) {
      state.results = data.results;
      DefaultView.renderArticles(state.results);
    } else {
      state.results = state.results.concat(data.results);
      DefaultView.appendArticles(data.results);
    }
  } catch (error) {
    DefaultView.showError("Failed to load articles.");
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const sectionSelect = document.getElementById("sectionSelect");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  try {
    const sections = await model.getAllSections();
    DefaultView.populateSections(sections);

    await loadArticles();
  } catch (err) {
    console.error(err);
  }
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.query = searchInput.value.trim();
    state.page = 1;
    await loadArticles();
  });

  sectionSelect.addEventListener("change", async (event) => {
    state.section = event.target.value;
    state.page = 1;
    await loadArticles();
  });

  loadMoreBtn.addEventListener("click", () => {
    state.page += 1;
    loadArticles();
  });
});
