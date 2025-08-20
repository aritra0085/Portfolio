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

class CertificateSlider {
    constructor() {
        this.wrapper = document.querySelector('.certificate-wrapper');
        this.items = document.querySelectorAll('.certificate-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.container = document.querySelector('.certificate-container');
        
        this.currentIndex = 0;
        this.totalItems = this.items.length;
        this.autoScrollInterval = null;
        this.isHovered = false;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.startAutoScroll();
        this.bindEvents();
        this.enableHorizontalScroll();
        this.updateSlider();
    }
    
    startAutoScroll() {
        this.stopAutoScroll(); // Clear any existing interval
        this.autoScrollInterval = setInterval(() => {
            if (!this.isHovered && !this.isTransitioning) {
                this.nextSlide();
            }
        }, 4000); // 4 seconds delay
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateSlider();
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateSlider();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateSlider();
    }
    
    updateSlider() {
        this.isTransitioning = true;
        const translateX = -this.currentIndex * (100 / this.totalItems);
        this.wrapper.style.transform = `translateX(${translateX}%)`;
        this.updateIndicators();
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    bindEvents() {
        // Pause auto-scroll on hover over container
        this.container.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.hideTooltip();
        });
        
        // Individual certificate item hover effects
        this.items.forEach((item, index) => {
            item.addEventListener('mouseenter', (e) => {
                this.showCertificateInfo(item, e);
            });
            
            item.addEventListener('mouseleave', () => {
                this.hideCertificateInfo(item);
            });
            
            item.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.stopAutoScroll();
                // Restart auto-scroll after 3 seconds
                setTimeout(() => this.startAutoScroll(), 3000);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.stopAutoScroll();
                setTimeout(() => this.startAutoScroll(), 3000);
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.stopAutoScroll();
                setTimeout(() => this.startAutoScroll(), 3000);
            }
        });
    }
    
    showCertificateInfo(item, event) {
        const name = item.dataset.name;
        const description = item.dataset.description;
        
        // Add blue hover effect
        item.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)';
        
        // Create or update tooltip
        this.showTooltip(item, name, description, event);
    }
    
    hideCertificateInfo(item) {
        // Remove blue hover effect
        item.style.background = '';
        
        // Hide tooltip with delay to prevent flicker
        setTimeout(() => {
            if (!item.matches(':hover')) {
                this.hideTooltip();
            }
        }, 100);
    }
    
    showTooltip(item, name, description, event) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'certificate-tooltip';
        tooltip.innerHTML = `
            <h4>${name}</h4>
            <p>${description}</p>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip relative to mouse or item center
        const rect = item.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top - tooltipRect.height - 10;
        
        // Adjust if tooltip goes outside viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.transform = 'none';
    }
    
    hideTooltip() {
        const existingTooltip = document.querySelector('.certificate-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }
    
    enableHorizontalScroll() {
        let isScrolling = false;
        
        this.container.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) > 50) {
                e.preventDefault();
                
                if (!isScrolling && !this.isTransitioning) {
                    isScrolling = true;
                    
                    if (e.deltaY > 0 || e.deltaX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                    
                    this.stopAutoScroll();
                    setTimeout(() => this.startAutoScroll(), 3000);
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 300);
                }
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = false;
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                isDragging = true;
                e.preventDefault();
            }
        }, { passive: false });
        
        this.container.addEventListener('touchend', (e) => {
            if (!isDragging || this.isTransitioning) return;
            
            const currentX = e.changedTouches[0].clientX;
            const diffX = startX - currentX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                
                this.stopAutoScroll();
                setTimeout(() => this.startAutoScroll(), 3000);
            }
            
            startX = 0;
            startY = 0;
            isDragging = false;
        }, { passive: true });
    }
    
    // Handle visibility change to pause/resume auto-scroll
    handleVisibilityChange() {
        if (document.hidden) {
            this.stopAutoScroll();
        } else {
            this.startAutoScroll();
        }
    }
}

// Initialize the certificate slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slider = new CertificateSlider();
    
    // Store reference globally for visibility change handler
    window.certificateSlider = slider;
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        slider.handleVisibilityChange();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Debounce resize handler
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            slider.updateSlider();
        }, 100);
    });
});