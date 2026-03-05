const API_KEY = `3ed52fe5-f7cc-4d73-b9df-39d8cbff51f8`;
const BASE_URL = `https://content.guardianapis.com/search`;
const PAGE_SIZE = 12;

/*
the dom event listener will trigger as soon as dom is loaded
 and fetch latest articles on all sections
*/
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
  params.append("show-fields", "trailText,thumbnail");

  try {
    const url = `${BASE_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    console.log("fetching", url);
    // renderArticles();
    return data.response.results;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
