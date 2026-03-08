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
    
    <div class="card-body d-flex align-items-center">

      <!-- Thumbnail -->
      <img
        src="${article.fields?.thumbnail || ""}"
        class="rounded me-3"
        style="width:80px;height:80px;object-fit:cover;"
      >

      <!-- Content -->
      <div class="flex-grow-1">

        <span class="badge bg-primary mb-1">
          ${article.sectionName}
        </span>

        <h6 class="mb-1 fw-semibold">
          ${article.webTitle}
        </h6>

        <p class="text-muted small mb-0">
          ${article.fields?.trailText || ""}
        </p>

      </div>

      <!-- Actions -->
      <div class="ms-3 d-flex gap-2">

        <a href="${article.webUrl}" 
           target="_blank"
           class="btn btn-sm btn-outline-secondary">
          Open
        </a>

        <button class="btn btn-sm btn-outline-danger remove-bookmark"
                data-url="${article.webUrl}">
          Remove
        </button>

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
  createCard(articles) {
    const thumbnail =
      articles.fields?.thumbnail ?
        `<img src="${articles.fields.thumbnail}" class="card-img-top object-fit-cover" style="height:200px;" alt="">`
      : `<img src="${placeHolderImage}" class="card-img-top object-fit-cover" style="height:200px;" alt="No image available - placeholder image">`;

    return `
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
        <button class="bookmark-btn btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
          data-url="${articles.webUrl}">
          <i class="bi bi-bookmark"></i>
        </button>
        ${thumbnail}
        <div class="card-body d-flex flex-column">
          <span class="badge bg-primary mb-2 align-self-start">${articles.sectionName}</span>
          <h5 class="fw-semibold mb-2">${articles.webTitle}</h5>
          <p class="text-muted small mb-4">${articles.fields?.trailText || ""}</p>
          <a href="${articles.webUrl}" target="_blank" class="btn btn-outline-secondary mt-auto">
            Read Full Article
          </a>
        </div>
      </div>
    `;
  }
}
export default new DefaultView();
