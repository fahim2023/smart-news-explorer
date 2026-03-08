import DefaultView from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  DefaultView.renderBookmarks(bookmarks);

  document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-bookmark");
    if (!removeBtn) return;

    const url = event.target.dataset.url;
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks = bookmarks.filter((bookmark) => bookmark.webUrl !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    DefaultView.renderBookmarks(bookmarks);
  });
});
