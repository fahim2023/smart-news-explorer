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
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const sectionSelect = document.getElementById("sectionSelect");

    sectionSelect.addEventListener("change", async (event) => {
      state.section = event.target.value;
      state.page = 1;
    });
    const articles = await model.fetchLatestArticles();
    DefaultView.renderArticles(articles);
  } catch (error) {
    DefaultView.showError("Failed to load articles.");
    console.error(error);
  }
});
