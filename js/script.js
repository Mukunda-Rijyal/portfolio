// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when clicking on a nav link (mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
});

// Project Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                formStatus.innerHTML = '<p style="color: red;">Please fill in all fields.</p>';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.innerHTML = '<p style="color: red;">Please enter a valid email address.</p>';
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            formStatus.innerHTML = '<p style="color: green;">Thank you for your message! I will get back to you soon.</p>';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    }
});

// Skill Bar Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        // Initial state - set width to 0
        skillBars.forEach(bar => {
            bar.style.width = '0';
        });
        
        // Function to animate skill bars when they come into view
        function animateSkillBars() {
            const skillsSection = document.querySelector('.skills');
            
            if (skillsSection) {
                const sectionPosition = skillsSection.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (sectionPosition < screenPosition) {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('style').split(':')[1];
                        if (width === '0px' || width === ' 0px') {
                            const targetWidth = bar.style.width;
                            bar.style.width = '0';
                            setTimeout(() => {
                                bar.style.transition = 'width 1s ease-in-out';
                                bar.style.width = targetWidth;
                            }, 200);
                        }
                    });
                    
                    // Remove event listener once animation is triggered
                    window.removeEventListener('scroll', animateSkillBars);
                }
            }
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', animateSkillBars);
        
        // Check on initial load
        animateSkillBars();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Add placeholder images if real images are not available
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken image with placeholder
            if (img.src.includes('profile.jpg')) {
                img.src = 'https://via.placeholder.com/400x400?text=Mukunda+Rijyal';
            } else if (img.src.includes('about-me.jpg')) {
                img.src = 'https://via.placeholder.com/600x800?text=About+Me';
            } else if (img.src.includes('project')) {
                img.src = 'https://via.placeholder.com/600x400?text=Project+Image';
            } else {
                img.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
            }
        });
    });
});