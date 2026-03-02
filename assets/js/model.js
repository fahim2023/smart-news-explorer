const API_KEY = `3ed52fe5-f7cc-4d73-b9df-39d8cbff51f8`;
const BASE_URL = `https://content.guardianapis.com/search`;
const PAGE_SIZE = 12;

/*
the dom event listener will trigger as soon as dom is loaded
 and fetch latest articles on all sections
*/
document.addEventListener("DOMContentLoaded", fetchLatestArticles);
async function fetchLatestArticles() {
  try {
    const url = `${BASE_URL}?page-size=${PAGE_SIZE}&&api-key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    // renderArticles();
    console.log(data);
    const articles = data.response.results;
    console.log(articles);
    renderArticles(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
function renderArticles(articles) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  articles.forEach((article) => {
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    col.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

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

    container.appendChild(col);
  });
}
