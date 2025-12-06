# AI Usage Report - Assignment 3

## 1. Tools Used
- **Large Language Model (LLM):** Gemini 2.5 Flash (via OpenAI-compatible API)
- **Code Generation:** Used for scaffolding new functions and implementing complex logic.
- **Code Review:** Used to identify potential bugs, improve code quality, and suggest performance optimizations.
- **Documentation Assistance:** Used to generate clear and concise documentation, including this report and technical documentation.

## 2. Specific Ways AI was Employed (Completed)
| Feature | AI Role | Specific Task |
| :--- | :--- | :--- |
| **API Integration** | Code Generation | Drafted the `fetchGitHubRepos` function, including error handling and data transformation logic to map GitHub API response to the local project data structure. |
| **Complex Logic** | Code Generation/Review | Implemented the `sortProjects` function and integrated it into `renderProjects`. Developed the form timer/counter logic (`startFormTimer`, `stopFormTimer`) and integrated it with form submission. |
| **State Management** | Code Generation | Implemented the logic for personalized greeting persistence using `localStorage` and the user name reset feature. |
| **Performance** | Code Review | Suggested adding the `defer` attribute to the `<script>` tag and using `will-change` in CSS for animation optimization. |
| **Documentation** | Documentation Assistance | Generated the structure and content for the updated `README.md` and `technical-documentation.md`. |

## 3. Challenges Difficulties Encountered with AI
- **Context Management:** Ensuring the AI correctly identified the existing code structure (e.g., the `projectsData` array) when integrating new functions like `loadAllProjects`.
- **Form Logic Integration:** Required multiple iterations to correctly integrate the new timer/counter and enhanced real-time validation logic without breaking the existing form submission flow.

## 4. Benefits of Improved Development Process
- **Increased Speed:** Rapidly implemented complex features like API fetching and advanced form logic.
- **Code Quality:** AI-suggested modern JavaScript practices (e.g., `async/await`, `fetch`) and performance hints.
- **Comprehensive Documentation:** Ensured all new features were thoroughly documented.

## 5. Learning Outcomes
- **API Handling:** Gained practical experience with the `fetch` API, asynchronous programming, and data mapping.
- **Client-Side State:** Solidified understanding of `localStorage` for state persistence beyond simple theme toggles.
- **Performance Optimization:** Learned about the practical application of `defer` and `will-change` for front-end performance.

## 6. Skills Gained Through AI-Assisted Development
- **Advanced JavaScript:** Asynchronous programming, DOM manipulation for dynamic content.
- **API Consumption:** Secure and efficient handling of external REST APIs.
- **Complex Logic Implementation:** Combining multiple conditions (filter, search, sort) and implementing non-trivial features (form timer).

---
