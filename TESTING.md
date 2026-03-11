## Testing Strategy

Testing for this project was carried out throughout development and again after deployment to ensure the live version matched the development version.

The project was tested using:

- Manual testing of all user-facing features
- Responsive testing across different screen sizes
- Validation testing for empty and invalid user input
- Browser testing to check compatibility
- Code validation using HTML, CSS and JavaScript validation tools

Testing focused on functionality, usability, responsiveness, and error handling.

## User Story Testing

| User Story                                                                 | Expected Outcome                                   | Result | Evidence                                   |
| -------------------------------------------------------------------------- | -------------------------------------------------- | ------ | ------------------------------------------ |
| As a user, I want to view the latest articles so that I can stay informed. | Latest articles are displayed when the page loads. | Pass   | Screenshot: home page with loaded articles |

(assets/images/latest-news.png)

| As a user, I want to search for articles by keyword so that I can find relevant news. | Matching articles are displayed after entering a search term. | Pass | Screenshot: search results for "vapes" |

(assets/images/keyword-search.png)

| As a user, I want feedback when no results are found so that I understand what happened. | A clear message is shown when no matching articles are returned. | Fail | Screenshot: no results message |

(assets/images/no-search-results.png)

| As a user, I want to save articles for later so that I can return to them later. | Selected articles are stored and shown in saved articles. | Pass | Screenshot: saved articles page |
(assets/images/bookmark-articles.png)

| As a user, I want the site to work on mobile so that I can use it on smaller screens. | Layout adapts correctly on mobile screen sizes. | Pass | Screenshot: mobile view |
(assets/images/responsive-1.png)
(assets/images/responsive-2.png)

## Bugs and Fixes

### Fixed Bugs

1. **Issue:** Search with an empty input submitted a request anyway.  
   **Cause:** No validation was in place before calling the API.  
   **Fix:** Added a check to stop submission if the input is empty and display a user-friendly error message.  
   **Status:** Fixed.

2. **Issue:** Layout broke when labels were added to the date picker section.  
   **Cause:** Existing layout classes did not account for extra label spacing.  
   **Fix:** Adjusted container spacing and alignment styles.  
   **Status:** Fixed.

3. **Issue:** Deployed app behaved differently from local version.  
   **Cause:** Path/deployment configuration issue on GitHub Pages.  
   **Fix:** Updated deployment paths and retested live site.  
   **Status:** Fixed.

4. **Issue:** Bookmark icon disappeared when hovering over a card.
   **Cause:** The card image scaling on hover overlapped the bookmark button in the stacking context.
   **Fix:** Added `z-index: 10` to `.bookmark-btn` in `style.css` to keep the button on top.
   **Status:** Fixed.

5. **Issue:** Articles duplicated on initial page load.
   **Cause:** `loadArticles()` was being called twice on `DOMContentLoaded`.
   **Fix:** Removed the duplicate call, leaving a single `await loadArticles()` at the end of the initialisation block.
   **Status:** Fixed.
6. **Issue:** Layout broke when labels were added to the date picker section.  
   **Cause:** Existing layout classes did not account for extra label spacing.  
   **Fix:** Adjusted container spacing and alignment styles.  
   **Status:** Fixed.

### Unfixed Bugs

7. **Issue:** Some article thumbnails are missing for certain API results.  
   **Reason:** The external API does not always provide image data.  
   **Impact:** Some cards show a fallback state instead of an image.  
   **Status:** Unfixed but Providing a fallback placeholder image.
