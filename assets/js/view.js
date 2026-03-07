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

      col.innerHTML = `
         <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">

        <button class="bookmark-btn btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
          data-url="${article.webUrl}">
          <i class="bi bi-bookmark"></i>
        </button>
          <!-- Image -->
          ${
            article.fields?.thumbnail ?
              `
              <img src="${article.fields.thumbnail}"
              class="card-img-top object-fit-cover"
              style="height:200px;"
              alt="">
              `
            : ""
          }
              
              <div class="card-body d-flex flex-column">
              
              <!-- Section Badge -->
              <span class="badge bg-primary mb-2 align-self-start">
              ${article.sectionName}
              </span>
              
              
              
              <!-- Title -->
              <h5 class="fw-semibold mb-2">
              ${article.webTitle}
              </h5>
              
              <!-- Summary -->
              <p class="text-muted small mb-4">
              ${article.fields?.trailText || ""}
              </p>
              
              <!-- Button -->
              <a href="${article.webUrl}"
              target="_blank"
              class="btn btn-outline-secondary mt-auto">
              Read Full Article
              </a>
              
              </div>
              </div>
              `;

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

      col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">

        <button class="bookmark-btn btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
          data-url="${article.webUrl}">
          <i class="bi bi-bookmark"></i>
        </button>          
          <!-- Image -->
          ${
            article.fields?.thumbnail ?
              `
              <img src="${article.fields.thumbnail}"
              class="card-img-top object-fit-cover"
              style="height:200px;"
              alt="">
              `
            : ""
          }
              
              <div class="card-body d-flex flex-column">
              
              <!-- Section Badge -->
              <span class="badge bg-primary mb-2 align-self-start">
              ${article.sectionName}
              </span>
              
              
              
              <!-- Title -->
              <h5 class="fw-semibold mb-2">
              ${article.webTitle}
              </h5>
              
              <!-- Summary -->
              <p class="text-muted small mb-4">
              ${article.fields?.trailText || ""}
              </p>
              
              <!-- Button -->
              <a href="${article.webUrl}"
              target="_blank"
              class="btn btn-outline-secondary mt-auto">
              Read Full Article
              </a>
              
              </div>
              </div>
              `;

      this.container.appendChild(col);
    });
  }
}
export default new DefaultView();
