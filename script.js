// Smooth scrolling for navigation links - optimized
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            // Use smooth scroll with requestAnimationFrame for better performance
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;
            
            function smoothScroll(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const progressPercent = Math.min(progress / duration, 1);
                const ease = progressPercent < 0.5 
                    ? 2 * progressPercent * progressPercent 
                    : 1 - Math.pow(-2 * progressPercent + 2, 2) / 2;
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (progress < duration) {
                    requestAnimationFrame(smoothScroll);
                }
            }
            
            requestAnimationFrame(smoothScroll);
        }
    });
});

// Intersection Observer for fade-in animations - optimized
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0)';
                observer.unobserve(entry.target); // Stop observing once animated
            });
        }
    });
}, observerOptions);

// Observe all sections except hero (which should be visible immediately)
document.querySelectorAll('section').forEach(section => {
    // Skip hero section - it should be visible immediately
    if (section.classList.contains('hero')) {
        section.style.opacity = '1';
        section.style.transform = 'translate3d(0, 0, 0)';
        return;
    }
    section.style.opacity = '0';
    section.style.transform = 'translate3d(0, 15px, 0)';
    section.style.transition = 'opacity 0.5s var(--ease-out-smooth), transform 0.5s var(--ease-out-smooth)';
    observer.observe(section);
});

// Button hover effects - optimized with translate3d
document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
});

// Work item interactions
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translate3d(10px, 0, 0)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translate3d(0, 0, 0)';
    });
});

// Optimized scroll handling with requestAnimationFrame
let ticking = false;
let lastScrollTop = 0;
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

// Cache DOM elements
const nav = document.querySelector('.nav');
let navScrolled = false;

function updateScrollEffects() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar background on scroll - only update if state changed (optimized)
    if (nav) {
        const shouldBeScrolled = scrollTop > 50;
        if (shouldBeScrolled !== navScrolled) {
            navScrolled = shouldBeScrolled;
            requestAnimationFrame(() => {
                if (shouldBeScrolled) {
                    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
                    nav.style.borderBottomColor = 'rgba(220, 38, 38, 0.3)';
                } else {
                    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                    nav.style.borderBottomColor = 'rgba(220, 38, 38, 0.2)';
                }
            });
        }
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}, { passive: true });

// Text animation on scroll
const animateText = (element) => {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transition = `opacity 0.1s ${index * 0.02}s`;
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
        }, 100);
    });
};

// Sharingan cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 30px;
    height: 30px;
    border: 2px solid #dc2626;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s;
    display: none;
    box-shadow: 0 0 10px #dc2626, 0 0 20px #dc2626;
    left: 0;
    top: 0;
    will-change: transform;
    transform: translate3d(0, 0, 0);
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.display = 'block';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hide cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
}

// Navbar scroll effect is now handled in updateScrollEffects above

// Award items stagger animation
const awardItems = document.querySelectorAll('.award-item');
awardItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ${index * 0.1}s, transform 0.6s ${index * 0.1}s`;
    
    const awardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    awardObserver.observe(item);
});

// Contact button click handler
document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevent orientation warning on desktop
if (window.innerWidth > 768) {
    const orientationWarning = document.querySelector('.orientation-warning');
    if (orientationWarning) {
        orientationWarning.style.display = 'none';
    }
}

// Add loading animation with sharingan effect
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s';
    
    // Sharingan icon - removed heavy glow effect for performance
    const sharinganIcon = document.querySelector('.sharingan-icon');
    if (sharinganIcon) {
        sharinganIcon.style.textShadow = '0 0 10px #dc2626';
    }
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
});

// Hero title glow effect removed for better scroll performance

// Fire particles from header and footer - moving vertically
function createFireParticle(fromTop = false) {
    const particle = document.createElement('div');
    const size = 2 + Math.random() * 3;
    
    // Start from header or footer, random horizontal position
    const startX = Math.random() * window.innerWidth;
    const startY = fromTop 
        ? 80 + Math.random() * 10  // Header area
        : window.innerHeight - 80 - Math.random() * 10;  // Footer area
    
    // Move vertically - from top to bottom or bottom to top
    const centerY = window.innerHeight / 2;
    const verticalDistance = fromTop 
        ? window.innerHeight - startY + 50  // Move down
        : -(startY + 50);  // Move up
    const verticalSpeed = 0.6 + Math.random() * 0.4;
    const moveY = verticalDistance * verticalSpeed;
    
    // Slight horizontal drift
    const horizontalDrift = (Math.random() - 0.5) * 40;
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #ef4444 0%, #dc2626 50%, #991b1b 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        box-shadow: 
            0 0 ${size * 2}px #dc2626,
            0 0 ${size * 3}px rgba(220, 38, 38, 0.4);
        opacity: 0.6;
        left: ${startX}px;
        top: ${startY}px;
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
    `;
    document.body.appendChild(particle);
    
    const duration = 3000 + Math.random() * 2000;
    
    particle.animate([
        { 
            transform: 'translate3d(0, 0, 0) scale(1)',
            opacity: 0.6
        },
        { 
            transform: `translate3d(${horizontalDrift * 0.3}px, ${moveY * 0.5}px, 0) scale(${0.7 + Math.random() * 0.2})`,
            opacity: 0.4
        },
        { 
            transform: `translate3d(${horizontalDrift}px, ${moveY}px, 0) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Create fire particles from header - vertical movement down (optimized - reduced frequency)
setInterval(() => {
    if (Math.random() > 0.85) {
        createFireParticle(true);
    }
}, 1000);

// Create fire particles from footer - vertical movement up (optimized - reduced frequency)
setInterval(() => {
    if (Math.random() > 0.85) {
        createFireParticle(false);
    }
}, 1000);

