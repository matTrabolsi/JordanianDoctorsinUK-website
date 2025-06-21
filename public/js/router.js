const route = (event) => {
    event = event || window.event;
    console.log("1. Route function called!");

    const href = event.currentTarget.href;
    console.log("2. Clicked element href:", href);

    event.preventDefault();

    window.history.pushState({}, "", href);
    console.log("3. URL pushed to history:", window.location.pathname);

    handleLocation();
    console.log("4. handleLocation called.");
};

const routes = {
    404: {
        path: "/pages/404.html",
        title: "Page Not Found - JDUK" // Added title
    },
    "/": {
        path: "/pages/home.html",
        title: "Welcome to JDUK" // Added title
    },
    "/about": {
        path: "/pages/about.html",
        title: "About Us - JDUK" // Added title
    },
    "/news": {
        path: "/pages/news.html",
        title: "News & Activities - JDUK" // Added title
    },
    "/members": {
        path: "/pages/members.html",
        title: "Members - JDUK" // Added title
    },
    "/contact": {
        path: "/pages/contact.html",
        title: "Contact Us - JDUK" // Added title
    }
};

const handleLocation = async () => {
    const path = window.location.pathname;
    console.log("5. Inside handleLocation, current path:", path);
    
    // Get the route object, not just the path string
    const routeObject = routes[path] || routes[404];
    const currentRoutePath = routeObject.path; // Get the HTML file path
    const pageTitle = routeObject.title;       // Get the title

    console.log("6. Fetching file for route:", currentRoutePath);
    console.log("   Setting page title to:", pageTitle); // NEW log

    try {
        const response = await fetch(currentRoutePath); // Use currentRoutePath
        console.log("7. Fetch response status:", response.status);

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} for ${currentRoutePath}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        console.log("8. HTML content fetched. Length:", html.length);

        const appContentDiv = document.getElementById("app-content");
        if (appContentDiv) {
            appContentDiv.innerHTML = html;
            console.log("9. Content injected into #app-content.");
            
            // Set the document title here
            document.title = pageTitle; // NEW: Update the document title

            initializePageSpecificScripts(path);
            console.log("10. initializePageSpecificScripts called.");
        } else {
            console.error("ERROR: Div with id 'app-content' not found in the DOM.");
        }

    } catch (error) {
        console.error("Error during handleLocation:", error);
        document.getElementById("app-content").innerHTML = "<h1>Error loading content.</h1><p>We're sorry, there was an issue loading this page. Please try again later.</p>";
        // If an error occurs, you might want to set a generic error title too
        document.title = "Error - JDUK"; 
    }
};

const initializePageSpecificScripts = (path) => {
    console.log("11. Initializing page specific scripts for path:", path);
    
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
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation(); // Initial call
console.log("Router initialized. Calling handleLocation for initial page.");