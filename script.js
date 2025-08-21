// Amit Kumar Singh Portfolio - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Amit Kumar Singh Portfolio - Loading...');

    // Initialize all functionality
    initNavigation();
    initSkillsAnimation();
    initContactForm();
    initScrollAnimations();
    initTypingEffect();

    console.log('✅ Portfolio loaded successfully!');
});

// Navigation Functionality
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && navMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navbarHeight = 70;
                    const elementTop = targetSection.offsetTop;
                    const offsetPosition = Math.max(0, elementTop - navbarHeight);

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active navigation highlighting
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar background on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        }
    }

    // Add scroll event listeners
    window.addEventListener('scroll', function() {
        highlightNavigation();
        handleNavbarScroll();
    });

    // Initial call
    highlightNavigation();
}

// Skills Progress Animation
function initSkillsAnimation() {
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bars
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:amitkumar.work19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoLink;

                // Reset form
                contactForm.reset();
                showNotification('Message ready to send! Your email client will open.', 'success');

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });

    // Set background color based on type
    const colors = {
        success: '#1ae907',
        error: '#e90759',
        info: '#0791e9',
        warning: '#e97507'
    };
    notification.style.background = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.about-stats .stat, .skill-item, .project-card, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const texts = [
        'Frontend Developer & Creative Coder',
        'BCA Student from Commerce Background',
        'Passionate About Web Technologies',
        'Seeking Internship Opportunities'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            delay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500; // Pause before next text
        }

        setTimeout(typeText, delay);
    }

    // Start typing effect after a delay
    setTimeout(typeText, 2000);
}

// Project demo handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn[href="#liquid-demo"]')) {
        e.preventDefault();
        window.open('liquid-animation.html', '_blank');
    }

    if (e.target.closest('.btn[href="#ecommerce-demo"]')) {
        e.preventDefault();
        showNotification('E-commerce project demo coming soon!', 'info');
    }

    if (e.target.closest('.btn[href="#copilot-demo"]')) {
        e.preventDefault();
        showNotification('VS Code Copilot project showcase coming soon!', 'info');
    }

    if (e.target.closest('.btn[href="#portfolio-demo"]')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showNotification('You are currently viewing the portfolio demo!', 'success');
    }
});

// Console message for developers
console.log(`
🚀 Amit Kumar Singh Portfolio
📧 Email: amitkumar.work19@gmail.com
💻 GitHub: https://github.com/Amit0419
🔗 LinkedIn: https://www.linkedin.com/in/amit-singh-0b2695251

Built with ❤️ using HTML5, CSS3, and JavaScript
`);

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Portfolio loaded in ${Math.round(loadTime)}ms`);
});

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registered successfully');
            })
            .catch(function(error) {
                console.log('❌ ServiceWorker registration failed');
            });
    });
}

// Add some easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-logo')) {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 You found an easter egg! Keep exploring!', 'success');
            clickCount = 0;
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + / to show shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showNotification('Keyboard shortcuts: Ctrl+H (Home), Ctrl+P (Projects), Ctrl+C (Contact)', 'info');
    }

    // Navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'h':
                e.preventDefault();
                document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'p':
                e.preventDefault();
                document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                break;
            case '1':
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// Add right-click context menu prevention (optional)
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
//     showNotification('Right-click is disabled. Please use the navigation menu!', 'info');
// });

// Add copy protection (optional)
// document.addEventListener('selectstart', function(e) {
//     if (e.target.closest('.project-content, .about-text')) {
//         e.preventDefault();
//     }
// });