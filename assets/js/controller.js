import * as model from "./model.js";
import DefaultView from "./view.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const articles = await model.fetchLatestArticles();
    DefaultView.renderArticles(articles);
  } catch (error) {
    console.error(error);
  }
});
