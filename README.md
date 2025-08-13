# Book Notes Viewer

This is a simple web application designed to display book notes fetched from a public Google Sheet. It's built using plain HTML, CSS, and JavaScript, making it ideal for hosting on platforms like GitHub Pages.

## Features

*   Fetches book notes from a specified Google Sheet (TSV format).
*   Parses the TSV data and displays each note in a clean, readable card format.
*   Simple and responsive design.

## Setup and Usage

To get this application up and running, follow these steps:

1.  **Clone the Repository (or download the files):**

    If you have Git installed, you can clone this repository:
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

    Alternatively, you can download the `index.html`, `style.css`, and `script.js` files directly.

2.  **Host on GitHub Pages:**

    This application is designed for GitHub Pages. If you're not familiar with it, here's a brief overview:

    *   Create a new GitHub repository (e.g., `book-notes`).
    *   Upload the `index.html`, `style.css`, and `script.js` files to the root of your repository.
    *   Go to your repository settings on GitHub.
    *   Navigate to the "Pages" section.
    *   Under "Source," select the branch where your files are (usually `main` or `master`) and the `/root` folder.
    *   Save your changes. GitHub Pages will then deploy your site, and you'll get a URL (e.g., `https://your-username.github.io/book-notes/`).

3.  **Google Sheet Data Source:**

    The application fetches data from the following public Google Sheet URL:
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vRctFoXA1UtFJe4z7SYVhhBqsI9Brsb2Uhajfsz8SdMnAtsiY_wrL8elX0GSxB9I7tBtLfjN2vDAvtC/pub?gid=1127734888&single=true&output=tsv`

    Ensure your Google Sheet is published to the web as a TSV (Tab Separated Values) file for the application to access it correctly.

## How it Works

*   **`index.html`**: This is the main structure of the web page. It includes links to the CSS for styling and the JavaScript for functionality.
*   **`style.css`**: Contains the CSS rules to style the appearance of the book notes and the overall page.
*   **`script.js`**: This is the core logic:
    *   It uses the `fetch` API to retrieve the TSV data from the Google Sheet URL.
    *   The `parseTsv` function takes the raw TSV string and converts it into a JavaScript array of objects, where each object represents a book note.
    *   The `renderNotes` function then iterates through this array and dynamically creates HTML elements (`div`, `h2`, `p`) to display each note on the page.

## Development

If you want to develop or test this application locally, be aware of CORS (Cross-Origin Resource Sharing) restrictions. When opening `index.html` directly from your file system (`file:///...`), browsers will block the `fetch` request to Google Sheets due to security policies. To test locally, you would typically need to use a local web server (e.g., using Node.js `http-server`, Python's `SimpleHTTPServer`, or a similar tool) to serve the files, which provides a proper origin for the browser.
