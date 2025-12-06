# Assignment 3 - Advanced Functionality Portfolio

## Project Description
This is the third iteration of my personal portfolio web application, focusing on implementing **Advanced Functionality** as required by Assignment 3. The goal is to expand my skills further and demonstrate stronger programming practices, building on the foundations established in Assignments 1 and 2.

The application is a responsive, modern portfolio designed to showcase my projects, skills, and contact information.

## New Features in Assignment 3

This assignment introduced several key advanced features:

1.  **API Integration (GitHub API):** The project section now dynamically fetches and displays my latest public repositories from GitHub, integrating external data into the application.
2.  **Complex Logic (Sorting & Form Timer):**
    *   **Project Sorting:** Projects can now be sorted by the date they were last updated (Newest/Oldest First).
    *   **Form Timer:** A timer tracks the time a user spends interacting with the contact form, demonstrating complex logic and state management.
3.  **State Management (Personalized Greeting):** The application now uses `localStorage` to remember a visitor's name, displaying a personalized greeting on subsequent visits. A "Reset Name" button is provided to clear this state.
4.  **Performance Optimization:** The main JavaScript file is loaded with the `defer` attribute, and CSS includes `will-change` hints for smoother animations.
5.  **AI Innovation:** AI tools were used for code generation, review, and documentation, with a detailed report provided in the `docs/ai-usage-report.md`.

## How to Run Locally

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url> assignment-3
    cd assignment-3
    ```
2.  **Open in Browser:** Open the `index.html` file directly in your web browser. No local server is required.

## File Structure

The project maintains a clear and organized file structure:

```
assignment-3/
├── README.md                  # Project overview (this file)
├── index.html                 # Main portfolio page
├── css/
│   └── styles.css            # All CSS styles
├── js/
│   └── script.js             # All JavaScript functionality
├── assets/
│   └── images/               # Project images (external URLs used for most)
└── docs/
    ├── ai-usage-report.md    # Detailed report on AI usage
    └── technical-documentation.md  # In-depth technical details
```

## Detailed Log of Implementation

The implementation process involved several steps, primarily focused on modifying `js/script.js` and `index.html`.

### 1. API Integration
- **`js/script.js`:** Added `fetchGitHubRepos()` to call the GitHub API and `loadAllProjects()` to merge the remote data with local data.
- **`index.html`:** Added a new "GitHub Projects" filter button.

### 2. Complex Logic
- **`js/script.js`:**
    - Implemented `sortProjects()` and integrated it into `renderProjects()`.
    - Added `startFormTimer()` and `stopFormTimer()` functions to track form interaction time.
- **`index.html`:** Added a `<select>` element for project sorting.

### 3. State Management
- **`js/script.js`:** Modified `displayGreeting()` to prompt for and store the user's name in `localStorage`. Added an event listener for the name reset button.
- **`index.html`:** Added the "Reset Name" button to the header.

### 4. Performance & Styling
- **`index.html`:** Added `defer` to the script tag.
- **`css/styles.css`:** Added styles for the new sort dropdown, reset button, and included `will-change` for performance.

## AI Usage Report

A comprehensive report detailing the use of AI tools (Gemini 2.5 Flash) for code generation, review, and documentation is available in the `docs/ai-usage-report.md` file.

## Technical Documentation

In-depth technical details, including architecture, API implementation, and logic flow, are available in the `docs/technical-documentation.md` file.

## Deployment
This project is designed to be deployed on platforms like GitHub Pages, Netlify, or Vercel. A live deployment link will be provided here upon submission.
