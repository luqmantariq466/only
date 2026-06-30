/**
 * LUQMAN TARIQ - PORTFOLIO SCRIPT.JS
 * Modern, Premium WordPress Developer Portfolio
 * Vanilla JavaScript (ES6)
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const DOM = {
        preloader: document.getElementById('preloader'),
        navbar: document.getElementById('mainNav'),
        themeToggle: document.getElementById('themeToggle'),
        heroTyping: document.getElementById('heroTyping'),
        scrollProgress: document.getElementById('scrollProgress'),
        backToTop: document.getElementById('backToTop'),
        customCursor: document.getElementById('customCursor'),
        customCursorFollower: document.getElementById('customCursorFollower'),
        contactForm: document.getElementById('contactForm'),
        contactPageForm: document.getElementById('contactPageForm'),
        testimonialPrev: document.getElementById('testimonialPrev'),
        testimonialNext: document.getElementById('testimonialNext'),
        testimonialsTrack: document.getElementById('testimonialsTrack'),
        testimonialDots: document.getElementById('testimonialDots'),
        statNumbers: document.querySelectorAll('.stat-number'),
        skillBars: document.querySelectorAll('.progress-bar'),
        navLinks: document.querySelectorAll('.nav-link'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        projectsGrid: document.getElementById('projectsGrid'),
        projectSearch: document.getElementById('projectSearch'),
        noResults: document.getElementById('noResults'),
        toastContainer: document.getElementById('toastContainer'),
        newsletterForms: document.querySelectorAll('.newsletter-form')
    };

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        typingTexts: [
            'WordPress Developer',
            'Web Designer',
            'WooCommerce Expert',
            'Frontend Developer',
            'Problem Solver'
        ],
        typingSpeed: 80,
        typingDelay: 1500,
        scrollThreshold: 50,
        animationDelay: 100
    };

    // ============================================
    // Utility Functions
    // ============================================
    const Utils = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        isInViewport(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // ============================================
    // Preloader
    // ============================================
    const Preloader = {
        init() {
            window.addEventListener('load', () => {
                document.body.classList.add('loading');
                setTimeout(() => {
                    DOM.preloader.classList.add('hidden');
                    document.body.classList.remove('loading');
                    setTimeout(() => {
                        DOM.preloader.style.display = 'none';
                    }, 500);
                }, 500);
            });
        }
    };

    // ============================================
    // Custom Cursor
    // ============================================
    const CustomCursor = {
        init() {
            if (!DOM.customCursor || window.innerWidth < 1024) return;

            document.addEventListener('mousemove', (e) => {
                DOM.customCursor.style.left = e.clientX + 'px';
                DOM.customCursor.style.top = e.clientY + 'px';

                setTimeout(() => {
                    DOM.customCursorFollower.style.left = e.clientX + 'px';
                    DOM.customCursorFollower.style.top = e.clientY + 'px';
                }, 50);
            });

            // Scale cursor on hover
            const hoverElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    DOM.customCursor.style.transform = 'scale(2)';
                    DOM.customCursorFollower.style.transform = 'scale(1.5)';
                    DOM.customCursorFollower.style.borderColor = 'var(--accent)';
                });
                el.addEventListener('mouseleave', () => {
                    DOM.customCursor.style.transform = 'scale(1)';
                    DOM.customCursorFollower.style.transform = 'scale(1)';
                    DOM.customCursorFollower.style.borderColor = 'var(--primary)';
                });
            });
        }
    };

    // ============================================
    // Theme Toggle
    // ============================================
    const ThemeToggle = {
        init() {
            if (!DOM.themeToggle) return;

            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);

            DOM.themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            const icon = DOM.themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
            }
        }
    };

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const Navbar = {
        init() {
            if (!DOM.navbar) return;

            const handleScroll = Utils.throttle(() => {
                if (window.scrollY > CONFIG.scrollThreshold) {
                    DOM.navbar.classList.add('scrolled');
                } else {
                    DOM.navbar.classList.remove('scrolled');
                }
            }, 100);

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }
    };

    // ============================================
    // Scroll Progress Bar
    // ============================================
    const ScrollProgress = {
        init() {
            if (!DOM.scrollProgress) return;

            window.addEventListener('scroll', Utils.throttle(() => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                DOM.scrollProgress.style.width = scrolled + '%';
            }, 50));
        }
    };

    // ============================================
    // Back to Top Button
    // ============================================
    const BackToTop = {
        init() {
            if (!DOM.backToTop) return;

            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.scrollY > 500) {
                    DOM.backToTop.classList.add('visible');
                } else {
                    DOM.backToTop.classList.remove('visible');
                }
            }, 100));

            DOM.backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ============================================
    // Typing Effect
    // ============================================
    const TypingEffect = {
        currentIndex: 0,
        currentText: '',
        isDeleting: false,

        init() {
            if (!DOM.heroTyping) return;
            this.type();
        },

        type() {
            const fullText = CONFIG.typingTexts[this.currentIndex];

            if (this.isDeleting) {
                this.currentText = fullText.substring(0, this.currentText.length - 1);
            } else {
                this.currentText = fullText.substring(0, this.currentText.length + 1);
            }

            DOM.heroTyping.textContent = this.currentText;

            let typeSpeed = CONFIG.typingSpeed;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.currentText === fullText) {
                typeSpeed = CONFIG.typingDelay;
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentText === '') {
                this.isDeleting = false;
                this.currentIndex = (this.currentIndex + 1) % CONFIG.typingTexts.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    };

    // ============================================
    // Smooth Scroll
    // ============================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const navHeight = DOM.navbar ? DOM.navbar.offsetHeight : 0;
                        const targetPosition = target.offsetTop - navHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile navbar if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                            if (bsCollapse) bsCollapse.hide();
                        }
                    }
                });
            });
        }
    };

    // ============================================
    // Active Navigation
    // ============================================
    const ActiveNavigation = {
        init() {
            const sections = document.querySelectorAll('section[id]');

            window.addEventListener('scroll', Utils.throttle(() => {
                let current = '';
                const scrollY = window.scrollY;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 200;
                    const sectionHeight = section.offsetHeight;

                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}` ||
                        link.getAttribute('href') === `${current}.html`) {
                        link.classList.add('active');
                    }
                });
            }, 100));
        }
    };

    // ============================================
    // Animate on Scroll
    // ============================================
    const AnimateOnScroll = {
        init() {
            const animatedElements = document.querySelectorAll('.service-card, .skill-category-card, .stat-card, .education-card, .goal-card, .education-card');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    };

    // ============================================
    // Stats Counter Animation
    // ============================================
    const StatsCounter = {
        init() {
            if (!DOM.statNumbers.length) return;

            const animateStats = () => {
                DOM.statNumbers.forEach(stat => {
                    if (Utils.isInViewport(stat, 100) && !stat.classList.contains('counted')) {
                        stat.classList.add('counted');
                        const target = parseInt(stat.getAttribute('data-target'));
                        const duration = 2000;
                        const increment = target / (duration / 16);
                        let current = 0;

                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                stat.textContent = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                stat.textContent = target;
                            }
                        };

                        updateCounter();
                    }
                });
            };

            window.addEventListener('scroll', Utils.throttle(animateStats, 100));
            animateStats(); // Initial check
        }
    };

    // ============================================
    // Skill Progress Bars Animation
    // ============================================
    const SkillBars = {
        init() {
            if (!DOM.skillBars.length) return;

            const animateBars = () => {
                DOM.skillBars.forEach(bar => {
                    if (Utils.isInViewport(bar, 100) && !bar.classList.contains('animated')) {
                        bar.classList.add('animated');
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    }
                });
            };

            window.addEventListener('scroll', Utils.throttle(animateBars, 100));
            animateBars(); // Initial check
        }
    };

    // ============================================
    // Testimonials Slider
    // ============================================
    const TestimonialsSlider = {
        currentSlide: 0,
        totalSlides: 0,

        init() {
            if (!DOM.testimonialsTrack) return;

            const cards = DOM.testimonialsTrack.querySelectorAll('.testimonial-card');
            this.totalSlides = cards.length;

            // Create dots
            this.createDots();

            // Event listeners
            if (DOM.testimonialPrev) {
                DOM.testimonialPrev.addEventListener('click', () => this.prevSlide());
            }
            if (DOM.testimonialNext) {
                DOM.testimonialNext.addEventListener('click', () => this.nextSlide());
            }

            // Auto-slide
            this.autoSlide();

            // Handle resize
            window.addEventListener('resize', Utils.debounce(() => this.updateSlider(), 200));

            // Touch support
            let touchStartX = 0;
            let touchEndX = 0;

            DOM.testimonialsTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            DOM.testimonialsTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) {
                    this.nextSlide();
                } else if (touchEndX - touchStartX > 50) {
                    this.prevSlide();
                }
            });
        },

        getVisibleSlides() {
            if (window.innerWidth < 576) return 1;
            if (window.innerWidth < 992) return 2;
            return 3;
        },

        createDots() {
            if (!DOM.testimonialDots) return;
            const visibleSlides = this.getVisibleSlides();
            const dotsCount = Math.max(1, this.totalSlides - visibleSlides + 1);

            DOM.testimonialDots.innerHTML = '';
            for (let i = 0; i < dotsCount; i++) {
                const dot = document.createElement('button');
                dot.className = `dot ${i === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => this.goToSlide(i));
                DOM.testimonialDots.appendChild(dot);
            }
        },

        updateSlider() {
            const visibleSlides = this.getVisibleSlides();
            const maxSlide = Math.max(0, this.totalSlides - visibleSlides);
            this.currentSlide = Math.min(this.currentSlide, maxSlide);
            this.goToSlide(this.currentSlide);
            this.createDots();
        },

        goToSlide(index) {
            const visibleSlides = this.getVisibleSlides();
            const maxSlide = Math.max(0, this.totalSlides - visibleSlides);
            this.currentSlide = Math.max(0, Math.min(index, maxSlide));

            const cardWidth = DOM.testimonialsTrack.querySelector('.testimonial-card').offsetWidth + 24;
            const offset = this.currentSlide * cardWidth;

            DOM.testimonialsTrack.style.transform = `translateX(-${offset}px)`;

            // Update dots
            const dots = DOM.testimonialDots?.querySelectorAll('.dot');
            dots?.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentSlide);
            });
        },

        prevSlide() {
            this.goToSlide(this.currentSlide - 1);
        },

        nextSlide() {
            const visibleSlides = this.getVisibleSlides();
            const maxSlide = Math.max(0, this.totalSlides - visibleSlides);
            if (this.currentSlide < maxSlide) {
                this.goToSlide(this.currentSlide + 1);
            } else {
                this.goToSlide(0);
            }
        },

        autoSlide() {
            setInterval(() => {
                const visibleSlides = this.getVisibleSlides();
                const maxSlide = Math.max(0, this.totalSlides - visibleSlides);
                if (this.currentSlide < maxSlide) {
                    this.nextSlide();
                } else {
                    this.goToSlide(0);
                }
            }, 5000);
        }
    };

    // ============================================
    // Project Filters
    // ============================================
    const ProjectFilters = {
        init() {
            if (!DOM.filterBtns.length || !DOM.projectsGrid) return;

            DOM.filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    DOM.filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Filter projects
                    const filter = btn.getAttribute('data-filter');
                    this.filterProjects(filter);
                });
            });

            // Search functionality
            if (DOM.projectSearch) {
                DOM.projectSearch.addEventListener('input', Utils.debounce((e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    this.searchProjects(searchTerm);
                }, 300));
            }
        },

        filterProjects(filter) {
            const projects = DOM.projectsGrid.querySelectorAll('.project-card');
            let visibleCount = 0;

            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    project.classList.remove('hidden');
                    project.style.display = '';
                    visibleCount++;
                } else {
                    project.classList.add('hidden');
                    project.style.display = 'none';
                }
            });

            this.toggleNoResults(visibleCount === 0);
        },

        searchProjects(term) {
            const projects = DOM.projectsGrid.querySelectorAll('.project-card');
            let visibleCount = 0;

            projects.forEach(project => {
                const title = project.getAttribute('data-title')?.toLowerCase() || '';
                const description = project.querySelector('.project-description')?.textContent.toLowerCase() || '';
                const techs = project.querySelector('.project-tech')?.textContent.toLowerCase() || '';

                const matches = title.includes(term) || description.includes(term) || techs.includes(term);

                if (matches) {
                    project.classList.remove('hidden');
                    project.style.display = '';
                    visibleCount++;
                } else {
                    project.classList.add('hidden');
                    project.style.display = 'none';
                }
            });

            this.toggleNoResults(visibleCount === 0);
        },

        toggleNoResults(show) {
            if (DOM.noResults) {
                DOM.noResults.classList.toggle('d-none', !show);
            }
        }
    };

    // ============================================
    // Contact Form Validation
    // ============================================
    const ContactForm = {
        init() {
            const forms = [DOM.contactForm, DOM.contactPageForm].filter(Boolean);

            forms.forEach(form => {
                if (!form) return;

                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    if (this.validateForm(form)) {
                        this.submitForm(form);
                    }
                });

                // Real-time validation
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => {
                        if (input.classList.contains('is-invalid')) {
                            this.validateField(input);
                        }
                    });
                });
            });
        },

        validateField(field) {
            const value = field.value.trim();
            const type = field.type;
            const required = field.hasAttribute('required');
            let isValid = true;

            if (required && !value) {
                isValid = false;
            } else if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            } else if (field.type === 'checkbox' && required) {
                isValid = field.checked;
            }

            if (isValid) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
            }

            return isValid;
        },

        validateForm(form) {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        },

        submitForm(form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            // Show loading state
            if (btnText && btnLoading) {
                btnText.classList.add('d-none');
                btnLoading.classList.remove('d-none');
            }
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Hide loading state
                if (btnText && btnLoading) {
                    btnText.classList.remove('d-none');
                    btnLoading.classList.add('d-none');
                }
                submitBtn.disabled = false;

                // Show success message
                this.showSuccessMessage(form);

                // Reset form
                form.reset();
                form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

                // Show toast notification
                Toast.show('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 1500);
        },

        showSuccessMessage(form) {
            const successMessage = document.getElementById('contactSuccess');
            if (successMessage) {
                form.style.display = 'none';
                successMessage.classList.remove('d-none');

                const sendAnother = document.getElementById('sendAnother');
                if (sendAnother) {
                    sendAnother.addEventListener('click', () => {
                        successMessage.classList.add('d-none');
                        form.style.display = '';
                    }, { once: true });
                }
            }
        }
    };

    // ============================================
    // Newsletter Form
    // ============================================
    const NewsletterForm = {
        init() {
            DOM.newsletterForms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = form.querySelector('input[type="email"]');
                    const email = input.value.trim();

                    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        Toast.show('Thank you for subscribing!', 'success');
                        form.reset();
                    } else {
                        Toast.show('Please enter a valid email address.', 'error');
                    }
                });
            });
        }
    };

    // ============================================
    // Toast Notifications
    // ============================================
    const Toast = {
        show(message, type = 'info') {
            if (!DOM.toastContainer) return;

            const toastId = 'toast-' + Date.now();
            const iconMap = {
                success: 'bi-check-circle-fill',
                error: 'bi-x-circle-fill',
                warning: 'bi-exclamation-triangle-fill',
                info: 'bi-info-circle-fill'
            };

            const toastHTML = `
                <div id="${toastId}" class="toast align-items-center text-bg-${type === 'error' ? 'danger' : type}" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            <i class="bi ${iconMap[type]} me-2"></i>
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;

            DOM.toastContainer.insertAdjacentHTML('beforeend', toastHTML);

            const toastElement = document.getElementById(toastId);
            const toast = new bootstrap.Toast(toastElement, {
                autohide: true,
                delay: 5000
            });

            toast.show();

            toastElement.addEventListener('hidden.bs.toast', () => {
                toastElement.remove();
            });
        }
    };

    // ============================================
    // Keyboard Navigation
    // ============================================
    const KeyboardNavigation = {
        init() {
            document.addEventListener('keydown', (e) => {
                // Close mobile navigation with Escape
                if (e.key === 'Escape') {
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                }
            });
        }
    };

    // ============================================
    // Lazy Loading Images
    // ============================================
    const LazyLoad = {
        init() {
            if ('loading' in HTMLImageElement.prototype) {
                document.querySelectorAll('img[data-src]').forEach(img => {
                    img.src = img.dataset.src;
                });
            } else {
                // Fallback for browsers that don't support lazy loading
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            imageObserver.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
    };

    // ============================================
    // Mobile Navigation
    // ============================================
    const MobileNav = {
        init() {
            const toggler = document.querySelector('.navbar-toggler');
            if (!toggler) return;

            toggler.addEventListener('click', () => {
                document.body.style.overflow = document.querySelector('.navbar-collapse.show') ? '' : 'hidden';
            });

            // Close nav when clicking outside
            document.addEventListener('click', (e) => {
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse && !e.target.closest('.navbar')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        }
    };

    // ============================================
    // Initialize All Modules
    // ============================================
    const init = () => {
        Preloader.init();
        CustomCursor.init();
        ThemeToggle.init();
        Navbar.init();
        ScrollProgress.init();
        BackToTop.init();
        TypingEffect.init();
        SmoothScroll.init();
        ActiveNavigation.init();
        AnimateOnScroll.init();
        StatsCounter.init();
        SkillBars.init();
        TestimonialsSlider.init();
        ProjectFilters.init();
        ContactForm.init();
        NewsletterForm.init();
        KeyboardNavigation.init();
        LazyLoad.init();
        MobileNav.init();
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
