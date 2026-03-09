const PLACEHOLDER_IMAGE = "assets/images/placeholder.webp";

class DefaultView {
  constructor() {
    this.container = document.getElementById("results");
    this.sections = document.getElementById("sectionSelect");
  }

  // ─── SECTIONS ────────────────────────────────────────────────────────────────

  populateSections(sections) {
    this.sections.querySelectorAll("option").forEach((option) => {
      if (option.value !== "all") option.remove();
    });

    sections.forEach(({ id, webTitle }) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = webTitle;
      this.sections.appendChild(option);
    });
  }

  // ─── ARTICLES ────────────────────────────────────────────────────────────────

  renderArticles(articles) {
    this.container.innerHTML = "";
    this._appendCards(articles);
  }

  appendArticles(articles) {
    this._appendCards(articles);
  }

  _appendCards(articles) {
    articles.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";
      col.innerHTML = this.createCard(article);
      this.container.appendChild(col);
    });
  }

  // ─── CARD TEMPLATE ───────────────────────────────────────────────────────────

  createCard(article) {
    const { webUrl, sectionName, webTitle, webPublicationDate, fields } =
      article;

    const thumbnail =
      fields?.thumbnail ?
        `<img src="${fields.thumbnail}"
            class="card-img-top object-fit-cover"
            style="height:200px;"
            alt="${webTitle}">`
      : `<img src="${PLACEHOLDER_IMAGE}"
            class="card-img-top object-fit-cover"
            style="height:200px;"
            alt="No image available">`;

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

  updateLoadMoreBtn(currentPage, totalPages) {
    const btn = document.getElementById("loadMoreBtn");
    btn.style.display = currentPage >= totalPages ? "none" : "";
  }

  // ─── BOOKMARKS ───────────────────────────────────────────────────────────────

  renderBookmarks(bookmarks) {
    const container = document.getElementById("bookmarksResults");
    const emptyState = document.getElementById("emptyState");

    container.innerHTML = "";

    if (bookmarks.length === 0) {
      emptyState.innerHTML = `
        <h4>No bookmarks yet</h4>
        <p>Go back to the homepage and save articles.</p>
        <a href="index.html" class="btn btn-outline-primary">Explore News</a>
      `;
      emptyState.classList.remove("d-none");
      return;
    }

    emptyState.classList.add("d-none");

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
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-primary">${sectionName}</span>
              <small class="text-muted">
                <i class="bi bi-calendar3"></i> ${date}
              </small>
            </div>
            <h6 class="mb-1 fw-semibold">${webTitle}</h6>
            <p class="text-muted small mb-0">${fields?.trailText || ""}</p>
          </div>

          <div class="d-flex flex-md-column gap-2 align-self-md-center">
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

  showError(message) {
    this.container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">${message}</div>
      </div>
    `;
  }
}

export default new DefaultView();
