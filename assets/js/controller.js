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

  sectionSelect.addEventListener("change", async (event) => {
    state.section = event.target.value;
    state.page = 1;
    console.log("Selected section:", state.section);

    await loadArticles();
  });
  await loadArticles();
});
