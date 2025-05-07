// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Typing Effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const phrases = [        'Electronics Engineer',
            'Embedded Systems Developer',
            'PCB Specialist',
            'Problem Solver',
            'Innovative Thinker'];
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 150; // Slower when typing
            }
            
            // If word is complete, start deleting after a pause
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end of the word
            } 
            // If deletion is complete, move to the next word
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before starting the next word
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }
    
    // Project Slider
    const projectSlides = document.querySelectorAll('.project-slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    const projectPrevButton = document.querySelector('.slider-btn-left');
    const projectNextButton = document.querySelector('.slider-btn-right');
    
    let currentSlideIndex = 0;
    
    // Initialize project slider
    function initProjectSlider() {
        // Create dots based on number of slides
        createProjectDots();
        
        // Show first slide
        showProjectSlide(0);
        
        // Add event listeners for navigation
        if (projectPrevButton) {
            projectPrevButton.addEventListener('click', prevProjectSlide);
        }
        
        if (projectNextButton) {
            projectNextButton.addEventListener('click', nextProjectSlide);
        }
    }
    
    // Create dots for project navigation
    function createProjectDots() {
        if (!sliderDotsContainer) return;
        
        sliderDotsContainer.innerHTML = '';
        
        projectSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showProjectSlide(index);
            });
            
            sliderDotsContainer.appendChild(dot);
        });
    }
    
    // Show specific project slide
    function showProjectSlide(index) {
        if (projectSlides.length === 0) return;
        
        // Handle index bounds
        if (index < 0) index = projectSlides.length - 1;
        if (index >= projectSlides.length) index = 0;
        
        currentSlideIndex = index;
        
        // Hide all slides
        projectSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        projectSlides[currentSlideIndex].classList.add('active');
        
        // Update dots
        updateProjectDots();
    }
    
    // Update active project dot
    function updateProjectDots() {
        if (!sliderDotsContainer) return;
        
        const dots = sliderDotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navigate to next project slide
    function nextProjectSlide() {
        showProjectSlide(currentSlideIndex + 1);
    }
    
    // Navigate to previous project slide
    function prevProjectSlide() {
        showProjectSlide(currentSlideIndex - 1);
    }
    
    // Initialize project slider on page load
    initProjectSlider();
    
    // Image Slider within each project
    const projectImageContainers = document.querySelectorAll('.project-img-container');
    
    // Initialize image sliders for each project
    projectImageContainers.forEach(container => {
        const images = container.querySelectorAll('.project-img');
        const prevBtn = container.querySelector('.img-prev-btn');
        const nextBtn = container.querySelector('.img-next-btn');
        const dotsContainer = container.parentElement.querySelector('.img-dots');
        
        let currentImgIndex = 0;
        
        // Create image dots
        if (dotsContainer) {
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('img-dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    showImage(index);
                });
                
                dotsContainer.appendChild(dot);
            });
        }
        
        // Show specific image
        function showImage(index) {
            if (images.length === 0) return;
            
            // Handle index bounds
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            
            currentImgIndex = index;
            
            // Hide all images
            images.forEach(img => {
                img.classList.remove('active');
            });
            
            // Show current image
            images[currentImgIndex].classList.add('active');
            
            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.img-dot');
                dots.forEach((dot, idx) => {
                    if (idx === currentImgIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        // Navigate to next image
        function nextImage() {
            showImage(currentImgIndex + 1);
        }
        
        // Navigate to previous image
        function prevImage() {
            showImage(currentImgIndex - 1);
        }
        
        // Add event listeners for image navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                prevImage();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                nextImage();
            });
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextProjectSlide();
        } else if (e.key === 'ArrowLeft') {
            prevProjectSlide();
        }
    });
    
    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.project-slider-container');
    
    if (slider) {
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            nextProjectSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            prevProjectSlide();
        }
    }
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextProjectSlide, 5000);
    
    // Pause auto-advance when hovering over slider
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextProjectSlide, 5000);
        });
    }
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                showFormAlert('Please fill in all fields', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            // Simulate form submission (in a real application, you would send data to a server)
            showFormAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();
            
            // In a real application, you would use fetch or axios to send the form data to a server
            // Example:
            // fetch('your-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name, email, subject, message }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormAlert('Your message has been sent successfully!', 'success');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     showFormAlert('There was an error sending your message. Please try again.', 'danger');
            // });
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form alerts
    function showFormAlert(message, type) {
        // Check if alert already exists and remove it
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `form-alert ${type}`;
        alertDiv.textContent = message;
        
        // Insert alert before the form
        contactForm.parentNode.insertBefore(alertDiv, contactForm);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    // Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    // Add scroll event listener
    window.addEventListener('scroll', scrollCheck);
    
    // Initial check in case elements are already in view
    scrollCheck();
    
    function scrollCheck() {
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksForScroll = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksForScroll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animation classes to elements
    const skillBars = document.querySelectorAll('.skill-level');
    const aboutImg = document.querySelector('.about-img');
    const aboutText = document.querySelector('.about-text');
    const projectItemsForAnimation = document.querySelectorAll('.project-item');
    const contactInfo = document.querySelector('.contact-info');
    const contactFormElement = document.querySelector('.contact-form');
    
    // Add scroll-animation class to elements
    if (aboutImg) aboutImg.classList.add('scroll-animation', 'fade-right');
    if (aboutText) aboutText.classList.add('scroll-animation', 'fade-left');
    if (contactInfo) contactInfo.classList.add('scroll-animation', 'fade-right');
    if (contactFormElement) contactFormElement.classList.add('scroll-animation', 'fade-left');
    
    // Initialize skill bars with animation
    skillBars.forEach(bar => {
        // Store the original width in a CSS variable
        const width = bar.style.width;
        bar.style.setProperty('--width', width);

        bar.classList.add('width-animation');
        setTimeout(() => {
            bar.classList.add('animate');
            bar.style.width = width; // Set the width to the original value
        }
        , 100); // Delay to allow for the animation to start
        });
    
    projectItemsForAnimation.forEach((item, index) => {
        item.classList.add('scroll-animation');
        if (index % 2 === 0) {
            item.classList.add('fade-right');
        } else {
            item.classList.add('fade-left');
        }
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animation {
            opacity: 1;
            transition: all 1s ease;
        }
        
        .fade-left {
            transform: translateX(-50px);
        }
        
        .fade-left.animate {
            transform: translateX(0);
        }
        
        .fade-right {
            transform: translateX(50px);
        }
        
        .fade-right.animate {
            transform: translateX(0);
        }
        
        .width-animation {
            width: 0 !important;
            transition: width 1.5s ease-in-out;
        }
        
        .width-animation.animate {
            width: var(--width) !important;
        }
        
        .form-alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .form-alert.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-alert.danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
});