const API_KEY = `3ed52fe5-f7cc-4d73-b9df-39d8cbff51f8`;
const BASE_URL = `https://content.guardianapis.com/search`;
const PAGE_SIZE = 12;

/*
the dom event listener will trigger as soon as dom is loaded
 and fetch latest articles on all sections
*/
export async function fetchLatestArticles() {
  try {
    const url = `${BASE_URL}?page-size=${PAGE_SIZE}&show-fields=thumbnail,trailText,headline&api-key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    // renderArticles();
    console.log(data);
    return data.response.results;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
