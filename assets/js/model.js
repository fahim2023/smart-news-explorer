import { API_KEY, BASE_URL, SECTIONS_URL } from "./config.js";

/*
the dom event listener will trigger as soon as dom is loaded
 and fetch latest articles on all sections
*/

// ─── FETCH ALL SECTIONS ───────────────────────────────────────────────────────
// Retrieves all available Guardian API sections to populate the section dropdown
export async function getAllSections() {
  const url = `${SECTIONS_URL}?api-key=${API_KEY}`;
  const response = await fetch(url);

  // Throw an error if the request was unsuccessful
  if (!response.ok)
    throw new Error(`Sections request failed: ${response.status}`);

  const data = await response.json();
  return data.response.results;
}

// ─── FETCH ARTICLES ───────────────────────────────────────────────────────────
// Fetches articles from the Guardian API based on the current application state
export async function fetchLatestArticles(state) {
  // Build query parameters from the current state
  const params = new URLSearchParams();

  // Only append search query if one has been entered
  if (state.query) params.append("q", state.query);
  params.append("query-fields", "headline,trailText");

  // Only append section if a specific section has been selected
  if (state.section && state.section !== "all")
    params.append("section", state.section);

  // Only append date filters if values have been set
  if (state.fromDate) params.append("from-date", state.fromDate);
  if (state.toDate) params.append("to-date", state.toDate);

  // Append pagination and sorting parameters
  params.append("order-by", state.sort);
  params.append("page", state.page);
  params.append("page-size", state.pageSize);
  params.append("api-key", API_KEY);

  // Request additional fields for thumbnail and trail text
  params.append("show-fields", "trailText,thumbnail,publication");

  try {
    const url = `${BASE_URL}?${params.toString()}`;
    const response = await fetch(url);

    // Throw an error if the network response was not successful
    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    console.log("fetching", url);

    // Return structured pagination and results data to the controller
    return {
      results: data.response.results,
      currentPage: data.response.currentPage,
      pages: data.response.pages,
      total: data.response.total,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
