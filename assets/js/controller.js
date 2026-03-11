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
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const fromDateInput = document.getElementById("fromDate");
  const toDateInput = document.getElementById("toDate");
  const sortSelect = document.getElementById("sortSelect");
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
    if (!state.query) {
      DefaultView.showError("Please enter a search Term");
      return;
    }
    state.page = 1;
    await loadArticles();
  });

  sectionSelect.addEventListener("change", async (event) => {
    state.section = event.target.value;
    state.page = 1;
    await loadArticles();
  });

  fromDateInput.addEventListener("change", () => {
    state.fromDate = fromDateInput.value;
    state.page = 1;
    loadArticles();
  });

  toDateInput.addEventListener("change", () => {
    state.toDate = toDateInput.value;
    state.page = 1;
    loadArticles();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    state.page = 1;
    state.results = [];
    loadArticles();
  });
  loadMoreBtn.addEventListener("click", () => {
    state.page += 1;
    loadArticles();
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest(".bookmark-btn")) {
      const btn = event.target.closest(".bookmark-btn");
      const article = state.results.find((a) => a.webUrl === btn.dataset.url);

      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      console.log(bookmarks);
      const index = bookmarks.findIndex(
        (bookmarkItem) => bookmarkItem.webUrl === article.webUrl,
      );
      if (index === -1) {
        bookmarks.push(article);
      } else {
        bookmarks.splice(index, 1);
      }
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  });
});
