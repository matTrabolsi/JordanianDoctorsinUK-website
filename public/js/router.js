let mySwiperInstance = null;

const route = (event) => {
    event = event || window.event;
    const href = event.currentTarget.href;
    event.preventDefault();
    window.history.pushState({}, "", href);
    handleLocation();
};

const routes = {
    404: {
        path: "/pages/404.html",
        title: "Page Not Found - JDUK"
    },
    "/": {
        path: "/pages/home.html",
        title: "Welcome to JDUK"
    },
    "/about": {
        path: "/pages/about.html",
        title: "About Us - JDUK"
    },
    "/electives": {
        path: "/pages/electives.html",
        title: "Electives - JDUK"
    },
    "/conference": {
        path: "/pages/conference.html",
        title: "Conference - JDUK"
    },
        "/members": {
        path: "/pages/members.html",
        title: "Our Members - JDUK"
    },
    "/news": {
        path: "/pages/news.html",
        title: "News & Activities - JDUK"
    },
    "/join": {
        path: "/pages/join.html",
        title: "join - JDUK"
    },
    "/success": {
        path: "/pages/success.html",
        title: "success - JDUK"
    }
};

const handleLocation = async () => {
    const path = window.location.pathname;
    
    const routeObject = routes[path] || routes[404];
    const currentRoutePath = routeObject.path;
    const pageTitle = routeObject.title;

    try {
        const response = await fetch(currentRoutePath);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        const appContentDiv = document.getElementById("app-content");
        if (appContentDiv) {
            appContentDiv.innerHTML = html;
            document.title = pageTitle;
            initializePageSpecificScripts(path);
        } else {
            console.error("ERROR: Div with id 'app-content' not found in the DOM.");
        }

    } catch (error) {
        console.error("Error during handleLocation:", error);
        document.getElementById("app-content").innerHTML = "<h1>Error loading content.</h1><p>We're sorry, there was an issue loading this page. Please try again later.</p>";
        document.title = "Error - JDUK"; 
    }
};

const initializePageSpecificScripts = (path) => {
    const hiddenElements = document.querySelectorAll('.card');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    const swiperContainerElement = document.getElementById('homePageMembersSwiper');

    if (swiperContainerElement) {
        if (path === '/') { 
            swiperContainerElement.style.display = 'block'; 
        } else {
            swiperContainerElement.style.display = 'none';
            if (mySwiperInstance) {
                mySwiperInstance.destroy();
                mySwiperInstance = null;
            }
        }
    }

    if (path !== '/') {
        if (mySwiperInstance) {
            mySwiperInstance.destroy();
            mySwiperInstance = null;
        }
    }
};

window.onpopstate = handleLocation;
window.route = route;

document.addEventListener('DOMContentLoaded', () => {
    handleLocation(); 

    document.querySelectorAll('a[onclick="route()"]').forEach(link => {
        link.removeAttribute('onclick'); 
        link.addEventListener('click', route);
    });
});
