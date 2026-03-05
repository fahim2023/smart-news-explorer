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
  total: 0,
  results: [],
};
async function loadArticles() {
  try {
    const articles = await model.fetchLatestArticles(state);
    state.results = articles;
    DefaultView.renderArticles(state.results);
  } catch {}
}
document.addEventListener("DOMContentLoaded", async () => {
  const sectionSelect = document.getElementById("sectionSelect");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
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
    console.log("Selected section:", state.section);

    await loadArticles();
  });
  await loadArticles();
});
