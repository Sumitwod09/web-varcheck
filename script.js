// ========================================
// VARCHECK - Main JavaScript
// Contact Form with Web3Forms, Mobile Menu, Dark Mode Toggle
// ========================================

// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================
const initThemeToggle = () => {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Get both theme toggle buttons
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');

    // Set initial icons
    updateThemeIcon(currentTheme);

    // Desktop theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            toggleTheme();
        });
    }

    // Mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            toggleTheme();
        });
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');

    const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) icon.className = iconClass;
    }

    if (mobileThemeToggle) {
        const icon = mobileThemeToggle.querySelector('i');
        if (icon) icon.className = iconClass;
    }
};

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });

        const closeMenu = () => {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
        };

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
    }
};

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CONTACT FORM WITH WEB3FORMS
// ========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Validate form
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');

        // Validate required fields
        if (!name || name.trim().length < 2) {
            showMessage('❌ Please enter a valid name (at least 2 characters).', 'error');
            return;
        }

        if (!email || email.trim().length === 0) {
            showMessage('❌ Please enter your email address.', 'error');
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            showMessage('❌ Please enter a valid email address.', 'error');
            return;
        }

        if (!phone || phone.trim().length < 10) {
            showMessage('❌ Please enter a valid phone number (at least 10 digits).', 'error');
            return;
        }

        if (!service || service === '') {
            showMessage('❌ Please select a service you are interested in.', 'error');
            return;
        }

        if (!message || message.trim().length < 10) {
            showMessage('❌ Please provide more details about your project (at least 10 characters).', 'error');
            return;
        }

        try {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            console.log('📧 Submitting form to Web3Forms...');

            // Send form using Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log('📬 Response from Web3Forms:', data);

            if (response.ok && data.success) {
                showMessage('✅ Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                console.log('✅ Form submitted successfully!');
            } else {
                showMessage(`❌ ${data.message || 'Something went wrong. Please try again or email us directly at wodsumit@gmail.com'}`, 'error');
                console.error('❌ Form submission failed:', data);
            }

            // Reset button
            submitButton.innerHTML = originalHTML;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');

        } catch (error) {
            console.error('❌ Form submission error:', error);
            showMessage('❌ Network error. Please check your internet connection and try again.', 'error');

            // Reset button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `mt-6 p-5 rounded-2xl text-center font-bold ${type}`;
        formMessage.classList.remove('hidden');

        // Auto-hide message after 7 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 7000);
    }
}

// ========================================
// INPUT VALIDATION FEEDBACK
// ========================================
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = '#d4ff00';
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        e.target.value = value;
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .stat-group');

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();

    console.log('🚀 VARCHECK website loaded successfully!');
    console.log('📧 Contact form ready with Web3Forms');
});
