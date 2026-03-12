import * as model from "./model.js";
import DefaultView from "./view.js";

// ─── APPLICATION STATE ────────────────────────────────────────────────────────
// Central state object that tracks all current filter, pagination and result data
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

// ─── LOAD ARTICLES ────────────────────────────────────────────────────────────
// Fetches articles based on current state and renders them to the DOM
async function loadArticles() {
  try {
    const data = await model.fetchLatestArticles(state);

    // Update state with pagination data from the API response
    state.total = data.total;
    state.totalPages = data.pages;
    state.currentPage = data.currentPage;

    // Show error message and hide load more if no results are returned
    if (data.results.length === 0) {
      DefaultView.showError(
        "No articles found. Please try a different search term.",
      );
      DefaultView.updateLoadMoreBtn(0, 0);
      return;
    }

    DefaultView.updateLoadMoreBtn(state.currentPage, state.totalPages);

    // On page 1 replace results, on subsequent pages append to existing results
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

// ─── INITIALISATION ───────────────────────────────────────────────────────────
// Wait for the DOM to fully load before attaching events and fetching data
document.addEventListener("DOMContentLoaded", async () => {
  // Grab all DOM elements needed for event listeners
  const sectionSelect = document.getElementById("sectionSelect");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const fromDateInput = document.getElementById("fromDate");
  const toDateInput = document.getElementById("toDate");
  const sortSelect = document.getElementById("sortSelect");

  try {
    // Fetch and populate the section dropdown from the Guardian API
    const sections = await model.getAllSections();
    DefaultView.populateSections(sections);

    // Load the initial set of articles on page load
    await loadArticles();
  } catch (err) {
    console.error(err);
  }

  // ─── SEARCH ──────────────────────────────────────────────────────────────
  // Validate input before updating state and fetching results
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    state.query = searchInput.value.trim();

    // Show error and stop execution if search input is empty
    if (!state.query) {
      DefaultView.showError("Please enter a search Term");
      return;
    }
    state.page = 1;
    await loadArticles();
  });

  // ─── SECTION FILTER ──────────────────────────────────────────────────────
  // Update section in state and reload articles from page 1
  sectionSelect.addEventListener("change", async (event) => {
    state.section = event.target.value;
    state.page = 1;
    await loadArticles();
  });

  // ─── DATE FILTERS ────────────────────────────────────────────────────────
  // Update from date in state and reload articles from page 1
  fromDateInput.addEventListener("change", () => {
    state.fromDate = fromDateInput.value;
    state.page = 1;
    loadArticles();
  });

  // Update to date in state and reload articles from page 1
  toDateInput.addEventListener("change", () => {
    state.toDate = toDateInput.value;
    state.page = 1;
    loadArticles();
  });

  // ─── SORT ────────────────────────────────────────────────────────────────
  // Reset results and reload from page 1 when sort order changes
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    state.page = 1;
    state.results = [];
    loadArticles();
  });

  // ─── LOAD MORE ───────────────────────────────────────────────────────────
  // Increment page number and append next set of articles
  loadMoreBtn.addEventListener("click", () => {
    state.page += 1;
    loadArticles();
  });

  // ─── BOOKMARK TOGGLE ─────────────────────────────────────────────────────
  // Uses event delegation to handle bookmark clicks on dynamically rendered cards
  document.addEventListener("click", (event) => {
    if (event.target.closest(".bookmark-btn")) {
      const btn = event.target.closest(".bookmark-btn");

      // Find the article in state using the URL stored in the button's data attribute
      const article = state.results.find((a) => a.webUrl === btn.dataset.url);

      // Retrieve existing bookmarks from localStorage
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      console.log(bookmarks);

      // Check if the article is already bookmarked
      const index = bookmarks.findIndex(
        (bookmarkItem) => bookmarkItem.webUrl === article.webUrl,
      );

      // Add if not bookmarked, remove if already bookmarked
      if (index === -1) {
        bookmarks.push(article);
      } else {
        bookmarks.splice(index, 1);
      }

      // Save updated bookmarks back to localStorage
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  });
});
