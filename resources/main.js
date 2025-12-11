// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form Validation & Submission
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    // Real-time email validation
    emailInput.addEventListener('blur', function () {
        const email = this.value.trim();
        const errorMsg = this.nextElementSibling;

        if (email === '') {
            this.classList.remove('error', 'success');
            errorMsg.classList.remove('show');
        } else if (!validateEmail(email)) {
            this.classList.add('error');
            this.classList.remove('success');
            errorMsg.textContent = 'Por favor, ingresa un email válido';
            errorMsg.classList.add('show');
        } else {
            this.classList.add('success');
            this.classList.remove('error');
            errorMsg.classList.remove('show');
        }
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        let isValid = true;

        // Validate name
        if (name === '') {
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameInput.classList.add('success');
        }

        // Validate email
        if (email === '' || !validateEmail(email)) {
            emailInput.classList.add('error');
            const errorMsg = emailInput.nextElementSibling;
            errorMsg.textContent = email === '' ? 'El email es requerido' : 'Por favor, ingresa un email válido';
            errorMsg.classList.add('show');
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
            emailInput.nextElementSibling.classList.remove('show');
        }

        // Validate message
        if (message === '') {
            messageInput.classList.add('error');
            isValid = false;
        } else {
            messageInput.classList.remove('error');
            messageInput.classList.add('success');
        }

        if (isValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Enviando...';

            // Simulate form submission (replace with actual backend call)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Enviar Mensaje';

                // Show success message
                const successMsg = document.getElementById('success-message');
                successMsg.classList.add('show');

                // Reset form
                form.reset();
                nameInput.classList.remove('success');
                emailInput.classList.remove('success');
                messageInput.classList.remove('success');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);

                // Log form data (for demonstration)
                console.log('Form submitted:', { name, email, message });
            }, 1500);
        } else {
            // Show error message
            const errorMsgForm = document.getElementById('error-message-form');
            errorMsgForm.classList.add('show');

            setTimeout(() => {
                errorMsgForm.classList.remove('show');
            }, 5000);
        }
    });
}

// Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth Scroll for Internal Links
function initSmoothScroll() {
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
}

// Fade-in Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();

    // Add fade-in class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
});

// WhatsApp Link Generator
function generateWhatsAppLink(phoneNumber, message = '') {
    // Remove all non-numeric characters from phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
