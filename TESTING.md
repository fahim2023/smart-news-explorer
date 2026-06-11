## Testing Methodology

### Manual Testing

Manual testing involves a human tester interacting with the application directly to verify that it behaves as expected. This approach is best suited for testing user experience, visual layout, responsiveness, and exploratory testing where human judgement is needed. Manual testing was the primary method used throughout this project.

A common manual testing approach is Behaviour-Driven Development (BDD), which structures tests around user stories using a Given–When–Then format:

- **Given** a specific context
- **When** a particular action is performed
- **Then** a specific, observable outcome should occur

This makes tests clear, repeatable, and directly tied to user needs.

### Automated Testing

Automated testing uses tools or scripts to run checks without human interaction. It is best suited for repetitive checks, regression testing, and validating code quality at scale. Common tools include Jest for JavaScript unit tests and Selenium for browser automation.

In this project, automated testing was applied through code validation tools:

- **W3C HTML Validator** — automatically checks HTML against defined standards
- **W3C CSS Validator** — automatically checks CSS for errors and warnings
- **JSHint** — automatically lints JavaScript files and reports issues

### When to Use Each

| Approach  | Best Used For                                                      |
| --------- | ------------------------------------------------------------------ |
| Manual    | UX, layout, responsiveness, user flows, exploratory testing        |
| Automated | Code validation, regression testing, unit testing, repeated checks |

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

![results from the latest news](assets/images/latest-news.png)

| User Story                                                                            | Expected Outcome                                              | Result | Evidence                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------ | -------------------------------------- |
| As a user, I want to search for articles by keyword so that I can find relevant news. | Matching articles are displayed after entering a search term. | Pass   | Screenshot: search results for "vapes" |

![results from searching for keyword 'vapes'](assets/images/keyword-search.png)

| User Story                                                                               | Expected Outcome                                                 | Result | Evidence                       |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------ | ------------------------------ |
| As a user, I want feedback when no results are found so that I understand what happened. | A clear message is shown when no matching articles are returned. | Fail   | Screenshot: no results message |

![test fail no feedback message to user informing them that there are no results for said search query](assets/images/no-search-results.png)

| User Story                                                                       | Expected Outcome                                          | Result | Evidence                        |
| -------------------------------------------------------------------------------- | --------------------------------------------------------- | ------ | ------------------------------- |
| As a user, I want to save articles for later so that I can return to them later. | Selected articles are stored and shown in saved articles. | Pass   | Screenshot: saved articles page |

![bookmarks page after adding bookmarks](assets/images/bookmark-articles.png)

| User Story                                                                            | Expected Outcome                                | Result | Evidence                |
| ------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ | ----------------------- |
| As a user, I want the site to work on mobile so that I can use it on smaller screens. | Layout adapts correctly on mobile screen sizes. | Pass   | Screenshot: mobile view |

![responsive layout - header section](assets/images/responsive-1.png)
![responsive layout card](assets/images/responsive-2.png)

## Functionality Testing

The following table documents manual testing of all application features.

| Feature         | Test                                              | Expected Outcome                                              | Result | Evidence                                                  |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------- | ------ | --------------------------------------------------------- |
| Page load       | Open index.html                                   | Latest articles load automatically                            | Pass   | ![Latest news](assets/images/latest-news.png)             |
| Search          | Enter keyword and click Search                    | Matching articles displayed                                   | Pass   | ![Keyword search](assets/images/keyword-search.png)       |
| Search          | Submit empty search field                         | Error message displayed                                       | Pass   |                                                           |
| Search          | Enter keyword with no results                     | "No articles found" message displayed                         | Pass   | ![No articles found](assets/images/no-articles-found.png) |
| Section filter  | Select a section from dropdown                    | Articles filtered by selected section                         | Pass   |                                                           |
| Date filter     | Enter a from date                                 | Articles filtered from that date                              | Pass   |                                                           |
| Date filter     | Enter a to date                                   | Articles filtered up to that date                             | Pass   |                                                           |
| Sort            | Select "Oldest First"                             | Articles reorder oldest first                                 | Pass   |                                                           |
| Sort            | Select "Relevance"                                | Articles reorder by relevance                                 | Pass   |                                                           |
| Load More       | Click Load More button                            | Next page of articles appended                                | Pass   |                                                           |
| Load More       | Reach last page of results                        | Load More button hidden                                       | Pass   |                                                           |
| Bookmark        | Click bookmark icon on article card               | Article saved to localStorage                                 | Pass   |                                                           |
| Bookmark        | Click bookmark icon on already bookmarked article | Article removed from localStorage                             | Pass   |                                                           |
| Bookmarks page  | Open bookmarks.html with saved bookmarks          | Saved articles displayed                                      | Pass   | ![Bookmark articles](assets/images/bookmark-articles.png) |
| Bookmarks page  | Open bookmarks.html with no bookmarks             | Empty state message displayed                                 | Pass   |                                                           |
| Bookmarks page  | Click remove button on bookmark                   | Article removed from list and localStorage                    | Pass   |                                                           |
| Bookmarks page  | Click external link icon                          | Article opens in new tab                                      | Pass   |                                                           |
| Fallback image  | Article with no thumbnail                         | Placeholder image displayed                                   | Pass   |                                                           |
| Navigation      | Click Search News in navbar                       | Navigates to index.html                                       | Pass   |                                                           |
| Navigation      | Click Bookmarks in navbar                         | Navigates to bookmarks.html                                   | Pass   |                                                           |
| 404 page        | Navigate to a non-existent URL                    | Custom 404 page displayed with automatic redirect to homepage | Pass   | ![404 desktop](assets/images/404_test_desktop.png)        |
| 404 page mobile | Navigate to a non-existent URL on mobile          | Custom 404 page displays correctly on mobile                  | Pass   | ![404 mobile](assets/images/404_test_mobile.png)          |

## Responsiveness Testing

The application was tested across mobile, tablet and desktop screen sizes on Chrome, Safari and Firefox Developer Edition, using both local and live deployed versions.

| Browser | Device  | Screen Size | Page              | Result | Evidence                                                                                 |
| ------- | ------- | ----------- | ----------------- | ------ | ---------------------------------------------------------------------------------------- |
| Chrome  | Mobile  | 390px       | Homepage (header) | Pass   | ![Chrome mobile header](assets/images/responsiveness/responsive-1.png)                   |
| Chrome  | Mobile  | 390px       | Article cards     | Pass   | ![Chrome mobile cards](assets/images/responsiveness/responsive-2.png)                    |
| Safari  | Desktop | 1440px      | Homepage          | Pass   | ![Safari desktop](assets/images/responsiveness/safari_home_desktop.png)                  |
| Safari  | Tablet  | 762px       | Homepage          | Pass   | ![Safari tablet home](assets/images/responsiveness/safari_tablet_home.png)               |
| Safari  | Tablet  | 762px       | Article cards     | Pass   | ![Safari tablet cards](assets/images/responsiveness/safari_tablet_cards.png)             |
| Safari  | Tablet  | 762px       | Bookmarks         | Pass   | ![Safari tablet bookmarks](assets/images/responsiveness/safari_tablet_bookmark.png)      |
| Safari  | Mobile  | 391px       | Homepage          | Pass   | ![Safari mobile home](assets/images/responsiveness/safari_mobile_home.png)               |
| Safari  | Mobile  | 391px       | Bookmarks         | Pass   | ![Safari mobile bookmarks](assets/images/responsiveness/safari_mobile_bookmarks.png)     |
| Firefox | Desktop | 1440px      | Homepage          | Pass   | ![Firefox desktop home](assets/images/responsiveness/mozilla_desktop_home.png)           |
| Firefox | Desktop | 1440px      | Bookmarks         | Pass   | ![Firefox desktop bookmarks](assets/images/responsiveness/mozilla_desktop_bookmarks.png) |
| Firefox | Tablet  | 764px       | Homepage          | Pass   | ![Firefox tablet home](assets/images/responsiveness/mozilla_tablet_home.png)             |
| Firefox | Tablet  | 764px       | Article cards     | Pass   | ![Firefox tablet cards](assets/images/responsiveness/mozilla_tablet_cards.png)           |
| Firefox | Tablet  | 764px       | Bookmarks         | Pass   | ![Firefox tablet bookmarks](assets/images/responsiveness/mozilla_tablet_bookmarks.png)   |
| Firefox | Mobile  | 370px       | Homepage          | Pass   | ![Firefox mobile home](assets/images/responsiveness/mozilla_mobile_home.png)             |
| Firefox | Mobile  | 370px       | Article cards     | Pass   | ![Firefox mobile cards](assets/images/responsiveness/mozilla_mobile_cards.png)           |
| Firefox | Mobile  | 370px       | Bookmarks         | Pass   | ![Firefox mobile bookmarks](assets/images/responsiveness/mozilla_mobile_bookmarks.png)   |

## Usability Testing

The following checks were carried out to assess the usability of the application.

| Test                                | Expected Outcome                                                              | Result | Evidence                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------- | ------ | -------------------------------------------------------------- |
| Purpose is clear on first load      | User can immediately understand the app is a news search tool                 | Pass   | ![Homepage on load](assets/images/latest-news.png)             |
| Search bar is prominently placed    | Search input is the first interactive element visible                         | Pass   | ![Homepage on load](assets/images/latest-news.png)             |
| Error messages are clear            | User receives a readable message when search is empty or returns no results   | Pass   | ![No articles found](assets/images/no-articles-found.png)      |
| Navigation is consistent            | Navbar appears on both pages with clear links                                 | Pass   | ![Navbar](assets/images/responsiveness/responsive-1.png)       |
| Bookmark button is discoverable     | Button is visible on card in top right corner                                 | Pass   | ![Bookmark icon](assets/images/bookmark_icon.png)              |
| Bookmarks page shows empty state    | Clear message and link back to homepage shown when no bookmarks saved         | Pass   | ![No bookmarks](assets/images/no_bookmarks.png)                |
| External links open in new tab      | Clicking Read Full Article or link icon opens article without leaving the app | Pass   | ![External link](assets/images/external_link_sep_tab.png)      |
| Filters are labelled clearly        | Section, From, To and Sort By labels make controls self-explanatory           | Pass   | ![Homepage on load](assets/images/latest-news.png)             |
| Load More is hidden when not needed | Button disappears when all results have been loaded                           | Pass   | ![Load more hidden](assets/images/load_more_button_hidden.png) |
| Fallback image maintains layout     | Cards without thumbnails display placeholder without breaking layout          | Pass   | ![Placeholder image](assets/images/placeholder_image.png)      |

## Bugs and Fixes

### Fixed Bugs

1. **Issue:** Search with an empty input submitted a request anyway.  
   **Cause:** No validation was in place before calling the API.  
   **Fix:** Added a check to stop submission if the input is empty and display a user-friendly error message.  
   **Status:** Fixed.

   ```javascript
   state.query = searchInput.value.trim();
   if (!state.query) {
     DefaultView.showError("Please enter a search term.");
     return;
   }
   ```

2. **Issue:** Layout broke when labels were added to the date picker section.  
   **Cause:** Existing layout classes did not account for extra label spacing.  
   **Fix:** Adjusted container spacing and alignment styles.  
   **Status:** Fixed.

3. **Issue:** Deployed app behaved differently from local version.  
   **Cause:** `config.js` was in `.gitignore` and never pushed to GitHub, causing the API key import to fail.  
   **Fix:** Moved the API key directly into `model.js` and removed the `config.js` dependency.  
   **Status:** Fixed.

4. **Issue:** Bookmark icon disappeared when hovering over a card.  
   **Cause:** The card image scaling on hover overlapped the bookmark button in the stacking context.  
   **Fix:** Added `z-index: 10` to `.bookmark-btn` in `style.css` to keep the button on top.  
   **Status:** Fixed.

5. **Issue:** Articles duplicated on initial page load.  
   **Cause:** `loadArticles()` was being called twice on `DOMContentLoaded`.  
   **Fix:** Removed the duplicate call, leaving a single `await loadArticles()` at the end of the initialisation block.  
   **Status:** Fixed.

6. **Issue:** Duplicate articles could be added to bookmarks.  
   **Cause:** The bookmark feature saved the article to localStorage without checking if it already existed.  
   **Fix:** Added a check before saving to ensure the article is not already stored in bookmarks.  
   **Status:** Fixed.

   ```javascript
   const exists = bookmarks.some((article) => article.id === newArticle.id);
   if (!exists) {
     bookmarks.push(newArticle);
   }
   ```

7. **Issue:** Duplicate bookmark cards appeared after deleting a bookmark.  
   **Cause:** The `renderBookmarks()` function re-rendered the updated list without first clearing the existing container contents, causing remaining bookmarks to be appended to already rendered cards.  
   **Fix:** The bookmarks container is now cleared with `container.innerHTML = ""` before rendering the updated list.  
   **Status:** Fixed.

   ```javascript
   renderBookmarks(bookmarks) {
     const container = document.getElementById("bookmarksResults");
     container.innerHTML = "";
     bookmarks.forEach(bookmark => {
       // render bookmark card
     });
   }
   ```

8. **Issue:** Searching for an invalid or unrecognised query returned no feedback to the user.  
   **Cause:** No check was in place to handle an empty results array returned by the API.  
   **Fix:** Added a check in `loadArticles()` to display a user-friendly error message and hide the Load More button when the API returns zero results.  
   **Status:** Fixed.
   ![documenting a fix after test failure, now user gets feedback message when a query is searched for that does not exist](assets/images/no-articles-found.png)

```javascript
if (data.results.length === 0) {
  DefaultView.showError(
    "No articles found. Please try a different search term.",
  );
  DefaultView.updateLoadMoreBtn(0, 0);
  return;
}
```

---

### Unfixed Bugs

- **Issue:** Some article thumbnails are missing for certain API results.  
  **Cause:** The Guardian API does not always return image data for every article.  
  **Impact:** Affected cards display a placeholder image instead of the article thumbnail.  
  **Status:** Partially mitigated — a fallback placeholder image is shown, but the root cause is outside the control of this application as it depends on the external API.

## Validation

### HTML

HTML was tested using the W3C Markup Validation Service.  
Result: No major errors remaining after fixes.
![no html errors in index file](assets/images/index-validation.png)
![no html errors in index file](assets/images/bootmark-validation.png)

### CSS

CSS was tested using the W3C Jigsaw Validator.  
Result: No major errors remaining after fixes.
![no css errors](assets/images/css%20validation.png)

### JavaScript

JavaScript was checked using a linter - jshint.  
Result: No major issues affecting functionality remained after fixes.

## JavaScript Validation

JavaScript files were validated using **JSHint**. Each file was tested individually by copying the source code into the validator.

As the project uses modern JavaScript features including ES Modules (`import` / `export`), `const`, template literals, and `async/await`, JSHint was configured with:

```javascript
/* jshint esversion: 11 */
```

After validation, only a small number of warnings were reported, primarily related to JSHint's limited handling of ES module syntax rather than genuine errors. No major issues affecting functionality were identified.

### Validation Results

**view.js**

- One warning: `Export declarations are only allowed at the top level of module scope`
- Related to JSHint's handling of ES module syntax, does not affect functionality.
  ![JSHint validation - view.js](assets/images/view-test.png)

**model.js**

- Four warnings reported:
  - `Import declarations are only allowed at the top level of module scope`
  - `Export declarations are only allowed at the top level of module scope`
  - `'PAGE_SIZE' is defined but never used`
- The module syntax warnings are caused by JSHint's support limitations for ES modules. The `PAGE_SIZE` variable was removed as it was declared but never referenced in the code.

  ![JSHint validation - view.js](assets/images/model-test.png)

**controller.js**

- Three warnings reported:
  - `Import declarations are only allowed at the top level of module scope`
  - `'searchBtn' is defined but never used`
- The module syntax warning relates to ES module handling. The `searchBtn` variable was removed as it was selected from the DOM but never used in the application logic.

  ![JSHint validation - view.js](assets/images/controller-test.png)

  **bookmarkController.js**

- One warning: `Import declarations are only allowed at the top level of module scope`
- Related to ES module syntax handling, does not affect behaviour.

  ![JSHint validation - view.js](assets/images/bookmark-test.png)

### Conclusion

JSHint confirmed no major JavaScript issues affecting functionality. Two unused variables (`PAGE_SIZE` and `searchBtn`) were identified and removed during the validation process. All remaining warnings relate to tool limitations with modern ES module syntax. The application runs without errors in the browser console during normal user interaction.

## Compatibility Testing

The project was tested in the following environments:

- Google Chrome
- Safari
- Firefox Developer Edition
- Mobile view using browser developer tools

The site remained functional and responsive across the tested environments.
