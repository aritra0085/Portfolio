// Menu icon Navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};




// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Fix: Use lowercase to match actual id attributes and fix selector
      document.querySelector(`header nav a[href="#${id}"]`)?.classList.add('active');
    }
  });

  // Sticky navbar
  let header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 100);

  // remove menu icon navbar when click navbar link (scrol)
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');


};

// Add click event for smooth scrolling to sections
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get section id from href attribute
    const sectionId = this.getAttribute('href');
    
    // Scroll to the section
    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Set active class on clicked link
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    this.classList.add('active');
  });
});

// Fix Swiper initialization - 'swiper' was lowercase but should be 'Swiper'
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

//dark light mode
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};

ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  Delay: 200
});

ScrollReveal().reveal('.home-content , .heading' ,{origin: 'top'});
ScrollReveal().reveal('.home-img img , .services-container , .portfolio-box, .testimonial-wrapper, .contact form' ,{origin: 'bottom'});
ScrollReveal().reveal('.home-content h3,.home-content p, .about-content' ,{origin: 'left'});

