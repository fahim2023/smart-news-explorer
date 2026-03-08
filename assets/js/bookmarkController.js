import DefaultView from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  DefaultView.renderBookmarks(bookmarks);
});
