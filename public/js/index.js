function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // If navbar was loaded, set up menu event listeners here:
      if (id === "navbar") {
        const navMenu = document.getElementById('nav-menu'),
              navToggle = document.getElementById('nav-toggle'),
              navClose = document.getElementById('nav-close');

        /* Menu show */
        if (navToggle) {
          navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
          });
        }

        /* Menu hidden */
        if (navClose) {
          navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
          });
        }

        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
          });
        });
      }
    })
    .catch(error => {
      console.error("Error loading HTML file:", error);
    });
}

loadHTML("navbar", "navbar.html");
loadHTML("footer", "footer.html");

const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      console.log(entry);
      if(entry.isIntersecting){
         
         entry.target.classList.add('show');
      } else{
         entry.target.classList.remove('show');
      }
   });
});

const hiddenElements = document.querySelectorAll('.card');
hiddenElements.forEach((el) => observer.observe(el));
