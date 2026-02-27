// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Preloader Animation
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');
    
    const tlPreloader = gsap.timeline({
        onComplete: () => {
            gsap.to(preloader, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        }
    });

    tlPreloader.to(preloaderText, {
        text: '50%',
        duration: 1,
        ease: 'none'
    })
    .to(preloaderText, {
        text: '100%',
        duration: 1,
        ease: 'none'
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Section Animations
    const heroTl = gsap.timeline({
        defaults: {
            ease: 'power4.out'
        }
    });

    heroTl.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2
    })
    .to('.hero-description', {
        x: 0,
        opacity: 1,
        duration: 1
    }, '-=0.5')
    .to('.cta-button', {
        y: 0,
        opacity: 1,
        duration: 1
    }, '-=0.5');

    // Floating shapes animation
    gsap.to('.floating-shape', {
        scale: 1.1,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2
    });

    // ScrollTrigger Animations
    // About cards
    gsap.utils.toArray('.about-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'power4.out'
        });
    });

    // Work items with scale animation
    gsap.utils.toArray('.work-item').forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'backOut(1.7)'
        });
    });

    // Skill bars animation
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
        const progress = item.querySelector('.skill-progress');
        const progressValue = progress.dataset.progress;

        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1
        });

        gsap.to(progress, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            width: progressValue + '%',
            duration: 1.5,
            delay: 0.5 + index * 0.1,
            ease: 'power4.out'
        });
    });

    // Testimonials animation
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 70%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'backOut(1.2)'
        });
    });

    // Contact info animation
    gsap.utils.toArray('.info-item').forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power4.out'
        });
    });

    // Form inputs animation
    gsap.utils.toArray('.form-input').forEach((input, index) => {
        gsap.fromTo(input, 
            {
                y: 30,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: 'power4.out'
            }
        );
    });

    // Submit button animation
    gsap.fromTo('.submit-btn',
        {
            scale: 0.8,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.8,
            ease: 'backOut(1.5)'
        }
    );

    // Parallax effect for shapes
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        y: 200,
        rotate: 360
    });

    gsap.to('.shape-2', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        x: 200,
        rotate: -360
    });

    // Text animation for section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            {
                y: 50,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power4.out'
            }
        );
    });

    // Mouse move parallax for shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.floating-shape');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
            const speed = index + 1;
            gsap.to(shape, {
                x: mouseX * 50 * speed,
                y: mouseY * 50 * speed,
                duration: 1,
                ease: 'power4.out'
            });
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power4.inOut'
                });
            }
        });
    });

    // Menu button animation (for mobile)
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn?.addEventListener('click', () => {
        if (!menuOpen) {
            gsap.to(navLinks, {
                right: 0,
                duration: 0.5,
                ease: 'power4.out'
            });
            menuOpen = true;
        } else {
            gsap.to(navLinks, {
                right: '-100%',
                duration: 0.5,
                ease: 'power4.in'
            });
            menuOpen = false;
        }
    });

    // Testimonial slider auto-play
    const track = document.querySelector('.testimonial-track');
    let currentIndex = 0;
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0]?.offsetWidth + 32; // including gap

    if (track && cards.length > 0) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            gsap.to(track, {
                x: -currentIndex * cardWidth,
                duration: 0.8,
                ease: 'power4.inOut'
            });
        }, 3000);
    }

    // Reveal animation for footer
    gsap.from('.footer-content', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    gsap.from('.social-links a', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'backOut(1.7)'
    });

    // Loading animation for images
    gsap.utils.toArray('.work-item img').forEach(img => {
        if (img.complete) {
            gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: 'power4.out'
            });
        } else {
            img.addEventListener('load', () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power4.out'
                });
            });
        }
    });
});