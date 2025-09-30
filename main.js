// Main JavaScript for Nishay Printers Website

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractiveElements();
    initializeCarousels();
    initializeForms();
    initializeScrollEffects();
});

// Animation Initialization
function initializeAnimations() {
    // Animate service cards on load
    anime({
        targets: '.service-card',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutQuart'
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Service filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter services with animation
            serviceCards.forEach((card, index) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        delay: index * 50,
                        easing: 'easeOutQuart'
                    });
                    card.style.display = 'block';
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        duration: 300,
                        complete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Cost calculator functionality
    const calculatorForm = document.getElementById('cost-calculator');
    if (calculatorForm) {
        calculatorForm.addEventListener('input', calculateCost);
    }

    // Service card hover effects
    const serviceCardsHover = document.querySelectorAll('.service-card');
    serviceCardsHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Carousel Initialization
function initializeCarousels() {
    // Hero carousel
    if (document.querySelector('.hero-carousel')) {
        new Splide('.hero-carousel', {
            type: 'loop',
            autoplay: true,
            interval: 4000,
            arrows: false,
            pagination: false,
            speed: 1000
        }).mount();
    }

    // Services carousel
    if (document.querySelector('.services-carousel')) {
        new Splide('.services-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 3000,
            breakpoints: {
                768: {
                    perPage: 1
                },
                1024: {
                    perPage: 2
                }
            }
        }).mount();
    }

    // Testimonials carousel
    if (document.querySelector('.testimonials-carousel')) {
        new Splide('.testimonials-carousel', {
            type: 'fade',
            autoplay: true,
            interval: 5000,
            arrows: false,
            pagination: true
        }).mount();
    }
}

// Form Handling
function initializeForms() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }


}



// Contact Form Submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}



// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('fade-in-up')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('fade-in-left')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('counter')) {
                    animateCounter(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .counter').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = parseInt(element.dataset.duration) || 2000;
    
    anime({
        targets: { count: 0 },
        count: target,
        duration: duration,
        easing: 'easeOutQuart',
        update: function(anim) {
            element.textContent = Math.floor(anim.animatables[0].target.count);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 400,
        easing: 'easeOutQuart'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateY: [0, -50],
            duration: 400,
            easing: 'easeOutQuart',
            complete: function() {
                notification.remove();
            }
        });
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for anchor links
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        anime({
            targets: mobileMenu,
            opacity: mobileMenu.classList.contains('active') ? [0, 1] : [1, 0],
            duration: 300,
            easing: 'easeOutQuart'
        });
    });
}