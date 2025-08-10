// Portfolio JavaScript - Core Functionality

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeNavigationEffects();
    initializeScrollAnimations();
    optimizeAnimations();
});

// Scroll-triggered Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animations for child elements
                const children = entry.target.querySelectorAll('.stat, .skill-category, .project-card, .contact-method, .social-link, .skill-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add click animation
        themeToggle.classList.add('animate-tada');
        setTimeout(() => {
            themeToggle.classList.remove('animate-tada');
        }, 1000);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.className = 'fas fa-moon';
    
    // Add icon transition
    themeIcon.style.transition = 'all 0.3s ease';
    if (theme === 'dark') {
        themeIcon.style.transform = 'rotate(180deg)';
    } else {
        themeIcon.style.transform = 'rotate(0deg)';
    }
}

// Navigation Effects
function initializeNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Show navbar on scroll with enhanced effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Show navbar on page load with entrance animation
    setTimeout(() => {
        navbar.classList.add('navbar-visible');
    }, 100);
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add animation to hamburger
        if (hamburger.classList.contains('active')) {
            hamburger.classList.add('animate-tada');
        } else {
            hamburger.classList.add('animate-shake');
        }
        
        setTimeout(() => {
            hamburger.classList.remove('animate-tada', 'animate-shake');
        }, 1000);
    });
    
    // Nav link interactions
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Add click animation
            link.classList.add('animate-pulse');
            setTimeout(() => {
                link.classList.remove('animate-pulse');
            }, 600);
        });
        
        // Add hover effects
        link.addEventListener('mouseenter', () => {
            link.classList.add('animate-rubber-band');
        });
        
        link.addEventListener('animationend', () => {
            link.classList.remove('animate-rubber-band');
        });
    });
    
    // Active link highlighting with smooth transitions
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.classList.add('animate-heart-beat');
                setTimeout(() => {
                    link.classList.remove('animate-heart-beat');
                }, 1300);
            }
        });
    });
}

// Animation Optimizations
function optimizeAnimations() {
    // Reduce animation intensity on mobile
    if (window.innerWidth <= 768) {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add click animation
            this.classList.add('animate-bounce-in');
            setTimeout(() => {
                this.classList.remove('animate-bounce-in');
            }, 800);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-image');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        }, index * 200);
    });
});

// Add interactive hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-lift');
        });
    });
});

// Animation Classes for CSS
const animationClasses = {
    'animate-tada': 'tada 1s ease-in-out',
    'animate-shake': 'shake 0.8s ease-in-out',
    'animate-pulse': 'pulse 2s infinite',
    'animate-heart-beat': 'heartBeat 1.3s ease-in-out infinite',
    'animate-rubber-band': 'rubberBand 1s ease-in-out',
    'animate-bounce-in': 'bounceIn 0.8s ease-in-out'
};

// Add animation styles to head
const style = document.createElement('style');
style.textContent = `
    @keyframes tada {
        0% { transform: scale(1); }
        10%, 20% { transform: scale(0.9) rotate(-3deg); }
        30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
        40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
        100% { transform: scale(1) rotate(0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes heartBeat {
        0% { transform: scale(1); }
        14% { transform: scale(1.3); }
        28% { transform: scale(1); }
        42% { transform: scale(1.3); }
        70% { transform: scale(1); }
    }
    
    @keyframes rubberBand {
        0% { transform: scale(1); }
        30% { transform: scaleX(1.25) scaleY(0.75); }
        40% { transform: scaleX(0.75) scaleY(1.25); }
        50% { transform: scaleX(1.15) scaleY(0.85); }
        65% { transform: scaleX(0.95) scaleY(1.05); }
        75% { transform: scaleX(1.05) scaleY(0.95); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3); }
        50% { opacity: 1; transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
`;

document.head.appendChild(style);
