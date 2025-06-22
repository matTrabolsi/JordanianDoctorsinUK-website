// function loadHTML(id, file) {
//   fetch(file)
//     .then(response => {
//       if (!response.ok) throw new Error("Network response was not ok");
//       return response.text();
//     })
//     .then(data => {
//       document.getElementById(id).innerHTML = data;

//       // If navbar was loaded, set up menu event listeners here:
//       if (id === "navbar") {
//         const navMenu = document.getElementById('nav-menu'),
//               navToggle = document.getElementById('nav-toggle'),
//               navClose = document.getElementById('nav-close');

//         /* Menu show */
//         if (navToggle) {
//           navToggle.addEventListener('click', () => {
//             navMenu.classList.add('show-menu');
//           });
//         }

//         /* Menu hidden */
//         if (navClose) {
//           navClose.addEventListener('click', () => {
//             navMenu.classList.remove('show-menu');
//           });
//         }

        
//       }
//     })
//     .catch(error => {
//       console.error("Error loading HTML file:", error);
//     });
// }

const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLinks = document.querySelectorAll('.nav__link');

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    });
});

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


  window.addEventListener("scroll", function () {
    const logo = document.getElementById("logo__scroll");
    const logoTitle = document.getElementById("title__scroll");
    if (window.scrollY > 50) {
      logo.classList.add("shrink");
      logoTitle.classList.add("shrink__title");
    } else {
      logo.classList.remove("shrink");
      logoTitle.classList.remove("shrink__title");
    }
  });header


  const swiper = new Swiper('.slider__wrapper', {
   loop: true, 
   grabCursor: true,
   spaceBetween: 30,

   pagination:{
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
   },

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

   // Crucial for responsiveness:
   breakpoints: {
       320: {
           slidesPerView: 1,
           spaceBetween: 10
       },
       768: {
           slidesPerView: 2,
           spaceBetween: 20
       },
       1024: {
           slidesPerView: 3,
           spaceBetween: 30
       }
   }
});



  function toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();

    // Close all other dropdowns
    document.querySelectorAll('.nav__item--has-dropdown').forEach(item => {
      if (item !== event.currentTarget.parentElement) {
        item.classList.remove('active');
      }
    });

    // Toggle the clicked one
    const parentLi = event.currentTarget.closest('.nav__item--has-dropdown');
    parentLi.classList.toggle('active');
  }

  // Close dropdowns if clicked outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav__item--has-dropdown').forEach(item => {
      item.classList.remove('active');
    });
  });
