# Smart News Explorer

Smart News Explorer is a web application that allows users to search, filter, and explore news articles using **The Guardian Open Platform API**. Users can filter articles by section, date range, and sorting order, and bookmark articles for later reading.

The application is built using **Vanilla JavaScript with an MVC architecture**, ensuring a clear separation between data handling, application logic, and UI rendering.

---

## Live Demo

https://fahim2023.github.io/smart-news-explorer/

---

## Features

- Search news articles using The Guardian API
- Filter by section (politics, sport, world news, etc.)
- Filter by date range
- Sort by:
  - Newest
  - Oldest
  - Relevance
- Pagination with **Load More**
- Bookmark articles for later reading
- View bookmarked articles on a separate page
- LocalStorage used for bookmark persistence
- Fallback image if article thumbnail is missing
- Fully responsive layout using Bootstrap

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript (ES Modules)

### Architecture

- MVC (Model View Controller)

### API

- The Guardian Open Platform API

### Storage

- Browser LocalStorage

## Project Structure

## Project Structure

\```
smart-news-explorer/
├── assets/
│ ├── images/
│ │ └── placeholder.webp
│ ├── js/
│ │ ├── controller.js
│ │ ├── bookmarkController.js
│ │ ├── model.js
│ │ └── view.js
│ └── style.css
├── index.html
├── bookmarks.html
└── README.md
\```

## Architecture (MVC)

The application follows an **MVC structure**.

### Model

Handles API requests and data logic.

`model.js`

Responsibilities:

- Fetch articles from The Guardian API
- Build query parameters
- Return structured article data

---

### View

Responsible for rendering UI components.

`view.js`

Responsibilities:

- Render article cards
- Render bookmarked articles
- Update pagination buttons
- Populate sections dropdown

---

### Controller

Handles user interaction and application flow.

`controller.js`

Responsibilities:

- Load articles on page load
- Handle search submissions
- Handle section filtering
- Handle sorting
- Handle pagination

---

### Bookmark Controller

Handles bookmark logic and LocalStorage.

`bookmarkController.js`

Responsibilities:

- Save bookmarks
- Remove bookmarks
- Render saved bookmarks

---

## API

This project uses:

**The Guardian Open Platform API**

https://open-platform.theguardian.com/

Example endpoint:

https://content.guardianapis.com/search

Query parameters used:

- `q`
- `section`
- `from-date`
- `to-date`
- `order-by`
- `page`
- `page-size`
- `show-fields`

## Future Improvements

- Backend to hide API key
- Article collections (multiple bookmark groups)
- Dark mode
- Article preview modal
- Search suggestions

## Author

Fahim Adam

## Acknowledgements

The MVC architecture pattern used in this project was inspired by
[Jonas Schmedtmann's](https://github.com/jonasschmedtmann) Forkify project,
part of his [JavaScript course](https://www.udemy.com/course/the-complete-javascript-course/) on Udemy.

## License

This project is for educational purposes.
