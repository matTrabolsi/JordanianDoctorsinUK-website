const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html", // Content for the homepage
    "/about": "/pages/about.html",
    "/news": "/pages/news.html",     // Example route for News & Activities
    "/members": "/pages/members.html", // Example route for Members
    "/contact": "/pages/contact.html" // Example route for Contact
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const currentRoute = routes[path] || routes[404]; // Fallback to 404 if route not found

    try {
        const response = await fetch(currentRoute);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById("app-content").innerHTML = html; // Inject content into the new div

        // Important: Re-initialize any scripts that operate on the newly loaded content.
        // This is crucial for elements like your '.card' animations.
        initializePageSpecificScripts(path);

    } catch (error) {
        console.error("Error fetching page:", error);
        // Display a user-friendly error message if content fails to load
        document.getElementById("app-content").innerHTML = "<h1>Error loading content.</h1><p>We're sorry, there was an issue loading this page. Please try again later.</p>";
    }
};

// Function to re-initialize scripts specific to loaded content
const initializePageSpecificScripts = (path) => {
    // Re-initialize the IntersectionObserver for '.card' elements
    // This part comes directly from your js/index.js that applies to dynamic content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.card');
    hiddenElements.forEach((el) => observer.observe(el));

    // You can add more conditions here for other pages that might need specific JS re-initialization.
    // For example, if you have a contact form with validation on the '/contact' page:
    // if (path === '/contact') {
    //     initContactFormValidation(); // A function you would define in contact.js or similar
    // }
};

window.onpopstate = handleLocation; // Handles browser back/forward buttons
window.route = route; // Exposes the route function globally so onclick can find it

// Call handleLocation on initial page load to load the correct content
handleLocation();