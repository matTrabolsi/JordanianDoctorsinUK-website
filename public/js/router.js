const route = (event) => {
    event = event || window.event;
    console.log("1. Route function called!");

    // FIX: Use event.currentTarget.href to get the href from the <a> tag
    const href = event.currentTarget.href; // This refers to the element with the onclick handler
    
    console.log("2. Clicked element href:", href); // This should now correctly show /about, etc.

    event.preventDefault(); // Prevents the browser's default link navigation

    window.history.pushState({}, "", href); // Use the corrected href
    console.log("3. URL pushed to history:", window.location.pathname);

    handleLocation();
    console.log("4. handleLocation called.");
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/news": "/pages/news.html",
    "/members": "/pages/members.html",
    "/contact": "/pages/contact.html"
};

const handleLocation = async () => {
    const path = window.location.pathname;
    console.log("5. Inside handleLocation, current path:", path);
    const currentRoute = routes[path] || routes[404];
    console.log("6. Fetching file for route:", currentRoute);

    try {
        const response = await fetch(currentRoute);
        console.log("7. Fetch response status:", response.status);

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} for ${currentRoute}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        console.log("8. HTML content fetched. Length:", html.length);

        const appContentDiv = document.getElementById("app-content");
        if (appContentDiv) {
            appContentDiv.innerHTML = html;
            console.log("9. Content injected into #app-content.");
            initializePageSpecificScripts(path);
            console.log("10. initializePageSpecificScripts called.");
        } else {
            console.error("ERROR: Div with id 'app-content' not found in the DOM.");
        }

    } catch (error) {
        console.error("Error during handleLocation:", error);
        document.getElementById("app-content").innerHTML = "<h1>Error loading content.</h1><p>We're sorry, there was an issue loading this page. Please try again later.</p>";
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

handleLocation(); // This runs on initial page load
console.log("Router initialized. Calling handleLocation for initial page.");