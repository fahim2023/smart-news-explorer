// Fallback image used when an article does not provide a thumbnail
const PLACEHOLDER_IMAGE = "assets/images/placeholder.webp";

class DefaultView {
  // ─── CONSTRUCTOR ─────────────────────────────────────────────────────────────
  // Cache DOM elements used across multiple methods
  constructor() {
    this.container = document.getElementById("results");
    this.sections = document.getElementById("sectionSelect");
  }

  // ─── SECTIONS ────────────────────────────────────────────────────────────────
  // Populates the section dropdown with options fetched from the Guardian API
  populateSections(sections) {
    // Remove any existing options except the default "All" option
    this.sections.querySelectorAll("option").forEach((option) => {
      if (option.value !== "all") option.remove();
    });

    // Create and append a new option element for each section
    sections.forEach(({ id, webTitle }) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = webTitle;
      this.sections.appendChild(option);
    });
  }

  // ─── ARTICLES ────────────────────────────────────────────────────────────────
  // Clears the container and renders a fresh set of article cards
  renderArticles(articles) {
    this.container.innerHTML = "";
    this._appendCards(articles);
  }

  // Appends additional article cards without clearing existing ones (used for Load More)
  appendArticles(articles) {
    this._appendCards(articles);
  }

  // Shared helper that creates and appends card column elements to the container
  _appendCards(articles) {
    articles.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";
      col.innerHTML = this.createCard(article);
      this.container.appendChild(col);
    });
  }

  // ─── CARD TEMPLATE ───────────────────────────────────────────────────────────
  // Generates the HTML string for a single article card
  createCard(article) {
    const { webUrl, sectionName, webTitle, webPublicationDate, fields } =
      article;

    // Use the article thumbnail if available, otherwise fall back to placeholder
    const thumbnail = fields?.thumbnail
      ? `<img src="${fields.thumbnail}"
            class="card-img-top object-fit-cover"
            style="height:200px;"
            alt="${webTitle}">`
      : `<img src="${PLACEHOLDER_IMAGE}"
            class="card-img-top object-fit-cover"
            style="height:200px;"
            alt="No image available">`;

    // Format the publication date for display
    const date = new Date(webPublicationDate).toLocaleDateString("en-GB");

    return `
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">

        <button class="bookmark-btn btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
          data-url="${webUrl}">
          <i class="bi bi-bookmark"></i>
        </button>

        ${thumbnail}

        <div class="card-body d-flex flex-column">

          <div class="d-flex justify-content-between align-items-center mb-3 py-2">
            <span class="badge bg-primary">${sectionName}</span>
            <small class="text-muted">
              <i class="bi bi-calendar3"></i> ${date}
            </small>
          </div>

          <h5 class="fw-semibold mb-2">${webTitle}</h5>
          <p class="text-muted small mb-4">${fields?.trailText || ""}</p>

          <a href="${webUrl}" target="_blank" class="btn btn-outline-secondary mt-auto">
            Read Full Article
          </a>

        </div>
      </div>
    `;
  }

  // ─── LOAD MORE ───────────────────────────────────────────────────────────────
  // Hides the Load More button when the last page of results has been reached
  updateLoadMoreBtn(currentPage, totalPages) {
    const btn = document.getElementById("loadMoreBtn");
    btn.style.display = currentPage >= totalPages ? "none" : "";
  }

  // ─── BOOKMARKS ───────────────────────────────────────────────────────────────
  // Renders the list of bookmarked articles on the bookmarks page
  renderBookmarks(bookmarks) {
    const container = document.getElementById("bookmarksResults");
    const emptyState = document.getElementById("emptyState");

    // Clear previously rendered bookmark cards before re-rendering
    container.innerHTML = "";

    // Show empty state message if there are no saved bookmarks
    if (bookmarks.length === 0) {
      emptyState.innerHTML = `
        <h4>No bookmarks yet</h4>
        <p>Go back to the homepage and save articles.</p>
        <a href="index.html" class="btn btn-outline-primary">Explore News</a>
      `;
      emptyState.classList.remove("d-none");
      return;
    }

    // Hide empty state when bookmarks exist
    emptyState.classList.add("d-none");

    // Create and append a card element for each bookmarked article
    bookmarks.forEach(
      ({ webUrl, sectionName, webTitle, webPublicationDate, fields }) => {
        const date = new Date(webPublicationDate).toLocaleDateString("en-GB");
        const card = document.createElement("div");
        card.className = "card mb-3 shadow-sm border-0";

        card.innerHTML = `
        <div class="card-body d-flex flex-column flex-md-row align-items-start gap-3">

          <img src="${fields?.thumbnail || PLACEHOLDER_IMAGE}"
            class="rounded"
            style="width:100px;height:100px;object-fit:cover;flex-shrink:0;"
            alt="${webTitle}">

          <div class="flex-grow-1 min-width-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="badge bg-primary">${sectionName}</span>
              <small class="text-muted">
                <i class="bi bi-calendar3"></i> ${date}
              </small>
            </div>
            <h6 class="mb-1 fw-semibold">${webTitle}</h6>
            <p class="text-muted small mb-0">${fields?.trailText || ""}</p>
          </div>

          <div class="d-flex flex-md-column gap-3 align-self-md-center ms-auto ms-md-0">
            <a href="${webUrl}" target="_blank" class="btn fs-5">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
            <button class="btn text-danger remove-bookmark fs-5" data-url="${webUrl}">
              <i class="bi bi-trash"></i>
            </button>
          </div>

        </div>
      `;

        container.appendChild(card);
      },
    );
  }

  // ─── ERROR ───────────────────────────────────────────────────────────────────
  // Displays an error message inside the results container
  showError(message) {
    this.container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">${message}</div>
      </div>
    `;
  }
}

// Export a single instance of DefaultView to be shared across the application
export default new DefaultView();
