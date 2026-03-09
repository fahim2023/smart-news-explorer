import { API_KEY, BASE_URL, SECTIONS_URL, PAGE_SIZE } from "./config.js";

/*
the dom event listener will trigger as soon as dom is loaded
 and fetch latest articles on all sections
*/
export async function getAllSections() {
  const url = `${SECTIONS_URL}?api-key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok)
    throw new Error(`Sections request failed: ${response.status}`);

  const data = await response.json();
  return data.response.results;
}

export async function fetchLatestArticles(state) {
  const params = new URLSearchParams();
  if (state.query) params.append("q", state.query);
  params.append("query-fields", "headline,trailText");

  if (state.section && state.section !== "all")
    params.append("section", state.section);
  if (state.fromDate) params.append("from-date", state.fromDate);
  if (state.toDate) params.append("to-date", state.toDate);

  params.append("order-by", state.sort);
  params.append("page", state.page);
  params.append("page-size", state.pageSize);
  params.append("api-key", API_KEY);
  params.append("show-fields", "trailText,thumbnail,publication");

  try {
    const url = `${BASE_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    console.log("fetching", url);
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
