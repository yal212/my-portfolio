// Enhanced Portfolio JavaScript with Advanced Animations

// Initialize all animations and effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedAnimations();
    initializeThemeToggle();
    initializeNavigationEffects();
    initializeFormEffects();
    initializeParticleSystem();
    initializeMouseTrail();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeMagneticEffects();
    initializeLoadingScreen();
    optimizeAnimations();
    initializeScrollProgress();
});

// Enhanced Animation System
function initializeEnhancedAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-image');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        // Staggered entrance animation
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

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

// Particle System
function initializeParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-bg';
    document.body.appendChild(particleContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 5;
        particle.style.animationDuration = duration + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Mouse Trail Effect
function initializeMouseTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailElements = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail element
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        
        document.body.appendChild(trail);
        trailElements.push(trail);
        
        // Remove old trail elements
        if (trailElements.length > 5) {
            const oldTrail = trailElements.shift();
            if (oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
    });
}

// Parallax Effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic Effects
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);

    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1000);
    });
}

// Enhanced Theme Toggle
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

// Enhanced Navigation Effects
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
    
    // Enhanced mobile menu toggle
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
    
    // Enhanced nav link interactions
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

// Enhanced Form Effects
function initializeFormEffects() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            input.classList.add('animate-pulse');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
            input.classList.remove('animate-pulse');
        });
        
        // Add typing animation
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.classList.add('animate-shake');
                setTimeout(() => {
                    input.classList.remove('animate-shake');
                }, 800);
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
        
        // Disable particle system on mobile
        const particleBg = document.querySelector('.particle-bg');
        if (particleBg) {
            particleBg.style.display = 'none';
        }
    }
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        
        // Disable particle and mouse trail effects
        const particleBg = document.querySelector('.particle-bg');
        if (particleBg) {
            particleBg.style.display = 'none';
        }
    }
}

// Enhanced Scroll Progress Indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #fbbf24);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        
        // Add glow effect based on scroll position
        if (scrollPercent > 50) {
            progressBar.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.8)';
        } else {
            progressBar.style.boxShadow = '0 0 10px rgba(37, 99, 235, 0.5)';
        }
    });
}

// Enhanced Smooth Scrolling
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
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn, .social-link');
    buttons.forEach(button => {
        button.classList.add('magnetic');
    });
});

// Add parallax class to hero elements
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
    heroElements.forEach((element, index) => {
        element.classList.add('parallax');
        element.setAttribute('data-speed', 0.1 + (index * 0.05));
    });
});

// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();

function checkPerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Reduce animation intensity if FPS is low
        if (fps < 30) {
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            animatedElements.forEach(el => {
                el.style.animationDuration = '0.1s';
            });
        }
        
        frameCount = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(checkPerformance);
}

// Start performance monitoring
requestAnimationFrame(checkPerformance);
