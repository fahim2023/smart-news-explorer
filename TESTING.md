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
