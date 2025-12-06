// ===== Project Data (Moved to top for access) =====
const projectsData = [
  {
    id: 1,
    title: "Treasure Hunt Game Demo",
    category: "game",
    description: "A 2D platformer showcasing game mechanics such as player movement, coin collection, obstacle avoidance, and level progression.",
    image: "https://t4.ftcdn.net/jpg/15/86/69/97/360_F_1586699740_p9fw35xMrPGmhmp7M9MXHZygeQMQ7Tfr.jpg",
    details: {
      technologies: ["Unity", "C#", "2D Game Design"],
      features: [
        "Smooth player movement and controls",
        "Collectible coins and power-ups",
        "Multiple levels with increasing difficulty",
        "Obstacle avoidance mechanics"
      ],
      status: "Completed"
    }
  },
  {
    id: 2,
    title: "Fuse Bot Game Demo",
    category: "game",
    description: "A puzzle-adventure demo focused on problem-solving, interactive environments, and AI-driven enemy behavior.",
    image: "https://cdn.80.lv/api/upload/post/4892/5d2cd6b023516.gif",
    details: {
      technologies: ["Unity", "C#", "AI Programming"],
      features: [
        "Puzzle-solving mechanics",
        "AI-driven enemy behavior",
        "Interactive environment elements",
        "Strategic gameplay"
      ],
      status: "Completed"
    }
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "web",
    description: "A responsive personal portfolio website built with HTML, CSS, and JavaScript featuring interactive elements and modern design.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500",
    details: {
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      features: [
        "Dark/Light theme toggle",
        "Project filtering and search",
        "Form validation",
        "Smooth animations"
      ],
      status: "In Progress"
    }
  },
  {
    id: 4,
    title: "AI Chatbot Assistant",
    category: "ai",
    description: "An intelligent chatbot that helps users with common queries using natural language processing and machine learning.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500",
    details: {
      technologies: ["Python", "Natural Language Processing", "Machine Learning"],
      features: [
        "Natural language understanding",
        "Context-aware responses",
        "Learning from interactions",
        "Multi-language support"
      ],
      status: "In Progress"
    }
  }
];

// ===== GitHub Data Fetching =====
const GITHUB_USERNAME = 'Dana-Alyahya';

async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const repos = await response.json();
    
    // Transform GitHub data into the existing project data structure
    const githubProjects = repos.map(repo => ({
      id: `gh-${repo.id}`,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Convert slug to title case
      category: 'github',
      description: repo.description || 'No description provided.',
      image: 'https://via.placeholder.com/400x200?text=GitHub+Repo', // Placeholder image
      date: repo.updated_at, // Use updated_at for sorting
      details: {
        technologies: [repo.language || 'Unknown'],
        features: [
          `Stars: ${repo.stargazers_count}`,
          `Forks: ${repo.forks_count}`,
          `Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}`,
          `Link: <a href="${repo.html_url}" target="_blank">View on GitHub</a>`
        ],
        status: repo.archived ? 'Archived' : 'Active'
      }
    }));
    
    return githubProjects;
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error);
    return [];
  }
}

// ===== State Management =====
let allProjects = projectsData; // Initialize with local data
let currentFilter = 'all';
let currentSort = 'default';
let searchQuery = '';

// Function to combine local and remote data
async function loadAllProjects() {
  const githubProjects = await fetchGitHubRepos();
  // Combine local projects (excluding the placeholder 'github' category if any) and GitHub projects
  const localProjects = projectsData.filter(p => p.category !== 'github');
  allProjects = [...localProjects, ...githubProjects];
  renderProjects();
}

// ===== Sorting Logic =====
function sortProjects(projects) {
  if (currentSort === 'date-desc') {
    return projects.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }
  if (currentSort === 'date-asc') {
    return projects.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  }
  // Default sort (e.g., by ID or original order)
  return projects;
}

// ===== Rendering Projects =====
function renderProjects() {
  const container = document.getElementById('projects-container');
  const loadingState = document.getElementById('loading-state');
  const emptyState = document.getElementById('empty-state');
  
  if (!container) return; // Safety check

  // Simulate loading delay
  setTimeout(() => {
    if (loadingState) loadingState.style.display = 'none';
    
    // Filter projects
    let filteredProjects = allProjects.filter(project => {
      const matchesFilter = currentFilter === 'all' || project.category === currentFilter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    
    // Apply sorting
    filteredProjects = sortProjects(filteredProjects);
    
    // Clear existing projects (except loading and empty states)
    const projectCards = container.querySelectorAll('.project-card');
    projectCards.forEach(card => card.remove());
    
    if (filteredProjects.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      
      filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        container.appendChild(card);
      });
    }
  }, 800);
}

function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${index * 0.1}s`;
  
  // NOTE: Added quotes around project.id in the onclick attribute to handle string IDs
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x200?text=Project+Image'">
    <div class="project-info">
      <div class="project-header">
        <h3>${project.title}</h3>
        <span class="project-category">${project.category.toUpperCase()}</span>
      </div>
      <p>${project.description}</p>
      <button class="expand-btn" onclick="toggleProjectDetails('${project.id}')">
        <span class="expand-text">Show Details</span>
      </button>
    </div>
    <div class="project-details" id="details-${project.id}">
      <h4>Technologies:</h4>
      <p>${project.details.technologies.join(', ')}</p>
      <h4>Key Features:</h4>
      <ul>
        ${project.details.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <p><strong>Status:</strong> ${project.details.status}</p>
    </div>
  `;
  
  return card;
}

function toggleProjectDetails(projectId) {
  const details = document.getElementById(`details-${projectId}`);
  // Use global event safely
  const event = window.event;
  const btn = event.target.closest('.expand-btn');
  const btnText = btn.querySelector('.expand-text');
  
  if (details) {
    details.classList.toggle('expanded');
    
    if (details.classList.contains('expanded')) {
      btnText.textContent = 'Hide Details';
    } else {
      btnText.textContent = 'Show Details';
    }
  }
}

// ===== Theme Management =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
if(themeIcon) updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if(themeIcon) themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ===== Personalized Greeting =====
function displayGreeting() {
  const hour = new Date().getHours();
  const greetingElement = document.getElementById('greeting');
  if (!greetingElement) return;
  
  let message = "Hello!";
  let emoji = "👋";
  
  if (hour < 12) {
    message = "Good Morning!";
    emoji = "🌅";
  } else if (hour < 18) {
    message = "Good Afternoon!";
    emoji = "☀️";
  } else {
    message = "Good Evening!";
    emoji = "🌙";
  }
  
  // Check for stored username
  let username = localStorage.getItem('username');
  
  if (!username) {
    // Prompt for name if not stored
    // Wrapping in try-catch to prevent issues if prompt is blocked or annoying during reload
    try {
        username = prompt("Welcome to my portfolio! What is your name?");
        if (username) {
          localStorage.setItem('username', username);
        } else {
          username = 'Visitor'; // Default name
        }
    } catch (e) {
        username = 'Visitor';
    }
  }
  
  const resetBtn = document.getElementById('reset-name-btn');
  
  if (username && username !== 'Visitor') {
    message += ` Welcome back, ${username}!`;
    if (resetBtn) resetBtn.style.display = 'inline-block';
  } else {
    if (resetBtn) resetBtn.style.display = 'none';
  }
  
  greetingElement.textContent = `${emoji} ${message}`;
}

displayGreeting();

// State Management: Reset Name Functionality
const resetNameBtn = document.getElementById('reset-name-btn');
if (resetNameBtn) {
    resetNameBtn.addEventListener('click', () => {
      localStorage.removeItem('username');
      alert('Your name has been reset. Please refresh the page to set a new name.');
    });
}

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Project Filtering & Sorting Events =====
const sortSelect = document.getElementById('sort-select');

if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      // Show loading state
      const loadingState = document.getElementById('loading-state');
      if(loadingState) loadingState.style.display = 'block';
      renderProjects();
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update filter and re-render
    currentFilter = btn.getAttribute('data-filter');
    
    // Show loading state
    const loadingState = document.getElementById('loading-state');
    if(loadingState) loadingState.style.display = 'block';
    
    renderProjects();
  });
});

// ===== Live Search =====
const searchBar = document.getElementById('search-bar');

if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      
      // Show loading state
      const loadingState = document.getElementById('loading-state');
      if(loadingState) loadingState.style.display = 'block';
      
      // Debounce search
      clearTimeout(searchBar.searchTimeout);
      searchBar.searchTimeout = setTimeout(() => {
        renderProjects();
      }, 300);
    });
}

// ===== Form Validation =====
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

if (contactForm && nameInput && emailInput && messageInput) {
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());

    // ===== Form Submission =====
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();
      
      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      submitBtn.disabled = true;
      if(btnText) btnText.style.display = 'none';
      if(btnLoading) btnLoading.style.display = 'inline-block';
      
      // Hide previous messages
      const successMsg = document.getElementById('success-message');
      const errorMsg = document.getElementById('error-message');
      if(successMsg) successMsg.style.display = 'none';
      if(errorMsg) errorMsg.style.display = 'none';
      
      // Simulate API call
      try {
        await simulateFormSubmission();
        
        // Store username for personalized greeting
        const name = nameInput.value.trim().split(' ')[0];
        localStorage.setItem('username', name);
        
        // Show success message
        if(successMsg) {
            successMsg.style.display = 'block';
            successMsg.scrollIntoView({ behavior: 'smooth' });
        }
        contactForm.reset();
        
        // Update greeting
        displayGreeting();
        
      } catch (error) {
        // Show error message
        if(errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.scrollIntoView({ behavior: 'smooth' });
        }
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        if(btnText) btnText.style.display = 'inline';
        if(btnLoading) btnLoading.style.display = 'none';
      }
    });
}

function validateName() {
  if(!nameInput) return false;
  const name = nameInput.value.trim();
  const errorElement = document.getElementById('name-error');
  
  if (name.length === 0) {
    showError(nameInput, errorElement, 'Name is required');
    return false;
  } else if (name.length < 2) {
    showError(nameInput, errorElement, 'Name must be at least 2 characters');
    return false;
  } else {
    clearError(nameInput, errorElement);
    return true;
  }
}

function validateEmail() {
  if(!emailInput) return false;
  const email = emailInput.value.trim();
  const errorElement = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email.length === 0) {
    showError(emailInput, errorElement, 'Email is required');
    return false;
  } else if (!emailRegex.test(email)) {
    showError(emailInput, errorElement, 'Please enter a valid email address');
    return false;
  } else {
    clearError(emailInput, errorElement);
    return true;
  }
}

function validateMessage() {
  if(!messageInput) return false;
  const message = messageInput.value.trim();
  const errorElement = document.getElementById('message-error');
  
  if (message.length === 0) {
    showError(messageInput, errorElement, 'Message is required');
    return false;
  } else if (message.length < 10) {
    showError(messageInput, errorElement, 'Message must be at least 10 characters');
    return false;
  } else {
    clearError(messageInput, errorElement);
    return true;
  }
}

function showError(input, errorElement, message) {
  input.classList.add('error');
  if(errorElement) errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove('error');
  if(errorElement) errorElement.textContent = '';
}

// Retry button
const retryBtn = document.getElementById('retry-btn');
if (retryBtn && contactForm) {
    retryBtn.addEventListener('click', () => {
      const errorMsg = document.getElementById('error-message');
      if(errorMsg) errorMsg.style.display = 'none';
      contactForm.dispatchEvent(new Event('submit'));
    });
}

// Simulate form submission (with 80% success rate)
function simulateFormSubmission() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve();
      } else {
        reject(new Error('Network error'));
      }
    }, 2000);
  });
}

// ===== Intersection Observer for Fade-in Animation =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  element.style.animationPlayState = 'paused';
  observer.observe(element);
});

// ===== Load Initial Data =====
// Called last to ensure all functions are defined
loadAllProjects();

// ===== Console Message =====
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #764ba2;');
console.log('%cFeel free to explore the code!', 'font-size: 14px; color: #667eea;');