# Technical Documentation - Assignment 3: Advanced Functionality

## 1. Introduction
This document details the technical implementation of the features required for Assignment 3, building upon the foundation of Assignment 2. The core objectives were to integrate an external API, implement complex application logic, manage application state, and apply performance optimizations.

## 2. API Integration: GitHub Repository Fetching
The application now integrates with the **GitHub REST API** to dynamically fetch and display the user's public repositories.

### 2.1. Implementation Details
- **API Endpoint:** `https://api.github.com/users/{GITHUB_USERNAME}/repos?sort=updated&direction=desc`
- **Function:** `fetchGitHubRepos()` (in `js/script.js`)
- **Technology:** Modern JavaScript `fetch` API with `async/await` for asynchronous data retrieval.
- **Data Transformation:** The raw JSON response from the GitHub API is mapped to the existing project data structure to ensure compatibility with the `renderProjects()` function. Key fields like `name`, `description`, `updated_at`, and `html_url` are extracted and formatted.
- **Integration:** The new function `loadAllProjects()` is introduced to combine the local project data (`projectsData`) with the fetched GitHub repositories (`githubProjects`) into a single array (`allProjects`) before rendering.

## 3. Complex Application Logic
Two main areas of complex logic were implemented: enhanced project filtering/sorting and a form interaction timer.

### 3.1. Project Filtering and Sorting
- **Sorting Logic:** A new function `sortProjects(projects)` was created to sort the `allProjects` array based on the `currentSort` state variable. The sorting is applied by date (`repo.updated_at` for GitHub projects) in ascending or descending order.
- **Integration:** The sorting logic is executed within `renderProjects()` immediately after filtering, ensuring the displayed projects are always correctly ordered.
- **User Interface:** A `<select>` element (`#sort-select`) was added to `index.html` to allow users to choose the sorting criteria, which updates the `currentSort` state and triggers a re-render.

### 3.2. Contact Form Timer/Counter
- **Objective:** To demonstrate complex logic by tracking the time a user spends interacting with the contact form.
- **Implementation:** The `startFormTimer()` and `stopFormTimer()` functions manage a `secondsOnForm` counter using `setInterval()`.
- **Trigger:** The timer starts when a user focuses on any form field (`focus` event) and stops upon form submission (`submit` event). The final time is logged to the console upon successful submission.

## 4. State Management
The application's state management was enhanced to persist user preferences and information.

### 4.1. Personalized Greeting Persistence
- **Mechanism:** The `displayGreeting()` function now checks `localStorage` for a stored `username`.
- **User Interaction:** If no name is found, the user is prompted to enter their name, which is then saved to `localStorage`.
- **Reset Feature:** A "Reset Name" button (`#reset-name-btn`) was added to allow the user to clear the stored `username` from `localStorage`, demonstrating a clear mechanism for state manipulation.

### 4.2. Dark/Light Mode Persistence
- **Mechanism:** The existing dark/light mode toggle was confirmed to correctly use `localStorage.getItem('theme')` to load the user's preferred theme on page load, ensuring state is maintained across sessions.

## 5. Performance Optimization
Performance best practices were applied to improve load times and rendering efficiency.

### 5.1. Deferred Script Loading
- **Optimization:** The `defer` attribute was added to the `<script>` tag for `js/script.js` in `index.html`.
- **Benefit:** This ensures the script is downloaded in parallel with HTML parsing and executed only after the document has been fully parsed, preventing render-blocking and improving the perceived load speed.

### 5.2. CSS Performance Hint
- **Optimization:** The CSS property `will-change: transform, opacity;` was added to the `.project-card` element.
- **Benefit:** This acts as a hint to the browser, informing it that these properties are likely to change, allowing the browser to optimize rendering and potentially promote the element to its own layer, resulting in smoother animations and transitions.

## 6. AI Innovation and Usage
AI tools were used extensively for code generation, review, and documentation, as detailed in the `ai-usage-report.md`. This usage accelerated the implementation of the complex features and ensured adherence to modern coding standards.

## 7. Conclusion
Assignment 3 successfully introduced advanced functionality, including external API integration and complex logic, while maintaining a focus on robust state management and performance. The project now serves as a feature-rich portfolio application.
