import DefaultView from "./view.js";

// ─── INITIALISATION ───────────────────────────────────────────────────────────
// Wait for the DOM to fully load before reading bookmarks and attaching events
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve saved bookmarks from localStorage on page load
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  // Render the initial list of bookmarked articles
  DefaultView.renderBookmarks(bookmarks);

  // ─── REMOVE BOOKMARK ───────────────────────────────────────────────────────
  // Uses event delegation to handle remove clicks on dynamically rendered cards
  document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-bookmark");

    // Stop execution if the click was not on a remove button
    if (!removeBtn) return;

    // Get the article URL from the button's data attribute
    const url = event.target.closest(".remove-bookmark").dataset.url;

    // Retrieve the current bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Filter out the removed article and save the updated list back to localStorage
    bookmarks = bookmarks.filter((bookmark) => bookmark.webUrl !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Re-render the bookmarks list to reflect the removal
    DefaultView.renderBookmarks(bookmarks);
  });
});
