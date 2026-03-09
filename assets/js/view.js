const placeHolderImage = "assets/images/placeholder.webp";
class DefaultView {
  constructor() {
    this.container = document.getElementById("results");
    this.sections = document.getElementById("sectionSelect");
  }

  populateSections(sections) {
    const allOptions = this.sections.querySelectorAll("option");
    allOptions.forEach((option) => {
      if (option.value !== "all") {
        option.remove();
      }
    });
    sections.forEach((section) => {
      const option = document.createElement("option");
      option.value = section.id;
      option.textContent = section.webTitle;
      this.sections.appendChild(option);
    });
  }
  createCard(articles) {
    const thumbnail =
      articles.fields?.thumbnail ?
        `<img src="${articles.fields.thumbnail}" class="card-img-top object-fit-cover" style="height:200px;" alt=${articles.webTitle}>`
      : `<img src="${placeHolderImage}" class="card-img-top object-fit-cover" style="height:200px;" alt="No image available - placeholder image">`;

    return `
       <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
    <button class="bookmark-btn btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
      data-url="${articles.webUrl}">
      <i class="bi bi-bookmark"></i>
    </button>

    ${thumbnail}

    <div class="card-body d-flex flex-column">

      <!-- Badge and date on same row -->
      <div class="d-flex justify-content-between align-items-center mb-3 py-2">
        <span class="badge bg-primary">${articles.sectionName}</span>
        <small class="text-muted">
          <i class="bi bi-calendar3"></i>
          ${new Date(articles.webPublicationDate).toLocaleDateString("en-GB")}
        </small>
      </div>

      <!-- Rest of card content -->
      <h5 class="fw-semibold mb-2">${articles.webTitle}</h5>
      <p class="text-muted small mb-4">${articles.fields?.trailText || ""}</p>
      <a href="${articles.webUrl}" target="_blank" class="btn btn-outline-secondary mt-auto">
        Read Full Article
      </a>

    </div>
  </div>
    `;
  }
  renderArticles(articles) {
    this.container.innerHTML = "";
    articles.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";
      col.innerHTML = this.createCard(article);
      this.container.appendChild(col);
    });
  }
  updateLoadMoreBtn(currentPage, totalPages) {
    const btn = document.getElementById("loadMoreBtn");

    if (currentPage >= totalPages) {
      btn.style.display = "none";
    } else {
      btn.style.display = "";
    }
  }
  appendArticles(articles) {
    articles.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";
      col.innerHTML = this.createCard(article);
      this.container.appendChild(col);
    });
  }

  renderBookmarks(bookmarks) {
    const container = document.getElementById("bookmarksResults");
    container.innerHTML = ``;

    const emptyState = (document.getElementById("emptyState").innerHTML =
      `<h4>No bookmarks yet</h4>
          <p>Go back to the homepage and save articles.</p>
          <a href="index.html" class="btn btn-outline-primary">
            Explore News
          </a>`);

    if (bookmarks.length === 0) {
      container.innerHTML = emptyState;
    }
    bookmarks.forEach((article) => {
      const card = document.createElement("div");

      card.className = "card mb-3 shadow-sm border-0";

      card.innerHTML = `
    <div class="card-body d-flex flex-column flex-md-row align-items-start gap-3">

    <!-- Thumbnail -->
    <img src="${article.fields?.thumbnail || placeHolderImage}"
      class="rounded"
      style="width:100px;height:100px;object-fit:cover;flex-shrink:0;">

    <!-- Content -->
    <div class="flex-grow-1 min-width-0">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <span class="badge bg-primary">${article.sectionName}</span>
        <small class="text-muted">
          <i class="bi bi-calendar3"></i>
          ${new Date(article.webPublicationDate).toLocaleDateString("en-GB")}
        </small>
      </div>
      <h6 class="mb-1 fw-semibold">${article.webTitle}</h6>
      <p class="text-muted small mb-0">${article.fields?.trailText || ""}</p>
    </div>

    <!-- Actions - right side on desktop, below content on mobile -->
    <div class="d-flex flex-md-column gap-2 align-self-md-center">
      <a href="${article.webUrl}" target="_blank" class="btn fs-5">
      <i class="bi bi-box-arrow-up-right"></i>
</a>
      <button class="btn text-danger remove-bookmark fs-5"
        data-url="${article.webUrl}"><i class="bi bi-trash"></i></button>
    </div>

  </div>

 
    `;

      container.appendChild(card);
    });
  }
  showError(message) {
    this.container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">${message}</div>
      </div>
    `;
  }
}
export default new DefaultView();
