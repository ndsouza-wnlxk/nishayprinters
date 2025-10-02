// Main JavaScript for Nishay Printers Website

// Initialize immediately and on DOM load (double safety)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

function initAll() {
    initializeMobileMenu();
    initializeAnimations();
    initializeInteractiveElements();
    initializeCarousels();
    initializeForms();
    initializeScrollEffects();
    initializeSmoothScroll();
}

// Mobile Menu Initialization - SIMPLIFIED AND FIXED
function initializeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-menu');

    if (!toggle || !menu) {
        console.log('Mobile menu elements not found');
        return;
    }

    // Clear any inline styles that might interfere
    menu.style.display = '';
    
    // Ensure menu starts hidden
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }

    // Click handler for toggle button
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Toggle clicked'); // Debug log
        
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            console.log('Menu opened');
        } else {
            menu.classList.add('hidden');
            console.log('Menu closed');
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }
        }
    });

    // Close when clicking menu links
    const links = menu.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.add('hidden');
        });
    });

    console.log('Mobile menu initialized');
}

// Animation Initialization
function initializeAnimations() {
    if (typeof anime === 'undefined') return;
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        anime({
            targets: '.service-card',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-item');

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            serviceCards.forEach(function(card, index) {
                if (filter === 'all' || card.dataset.category === filter) {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 400,
                            delay: index * 50,
                            easing: 'easeOutQuart'
                        });
                    }
                    card.style.display = 'block';
                } else {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: card,
                            opacity: [1, 0],
                            scale: [1, 0.8],
                            duration: 300,
                            complete: function() {
                                card.style.display = 'none';
                            }
                        });
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    const serviceCardsHover = document.querySelectorAll('.service-card');
    serviceCardsHover.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1.05,
                    rotateY: 5,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
}

// Carousel Initialization
function initializeCarousels() {
    if (typeof Splide === 'undefined') return;
    
    if (document.querySelector('.services-carousel')) {
        new Splide('.services-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 3000,
            breakpoints: {
                768: { perPage: 1 },
                1024: { perPage: 2 }
            }
        }).mount();
    }
}

// Form Handling
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(function() {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('fade-in-up')) {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    } else {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                }
                
                if (element.classList.contains('fade-in-left')) {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateX: [-50, 0],
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    } else {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }
                }
                
                if (element.classList.contains('counter')) {
                    animateCounter(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up, .fade-in-left, .counter').forEach(function(el) {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = parseInt(element.dataset.duration) || 2000;
    
    if (typeof anime !== 'undefined') {
        anime({
            targets: { count: 0 },
            count: target,
            duration: duration,
            easing: 'easeOutQuart',
            update: function(anim) {
                element.textContent = Math.floor(anim.animatables[0].target.count);
            }
        });
    } else {
        element.textContent = target;
    }
}

function showNotification(message, type) {
    type = type || 'info';
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    if (typeof anime !== 'undefined') {
        anime({
            targets: notification,
            opacity: [0, 1],
            translateY: [-50, 0],
            duration: 400,
            easing: 'easeOutQuart'
        });
    } else {
        notification.style.opacity = '1';
    }
    
    setTimeout(function() {
        if (typeof anime !== 'undefined') {
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
        } else {
            notification.remove();
        }
    }, 5000);
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
