
// Đợi cây thư mục HTML (DOM) sẵn sàng thì mới thực thi JavaScript
document.addEventListener('DOMContentLoaded', () => {
    'use strict'; // Kích hoạt Strict Mode để code chạy an toàn, tránh lỗi biến toàn cục

    // --- 1. ĐĂNG KÝ PLUGIN ---
    // ScrollTrigger: Xử lý hiệu ứng khi cuộn chuột
    // TextPlugin: Xử lý hiệu ứng gõ chữ/thay đổi văn bản
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // --- 2. HIỆU ỨNG MÀN HÌNH CHỜ (PRELOADER) ---
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');
    
    // Tạo một dòng thời gian (timeline) cho màn hình chờ
    const tlPreloader = gsap.timeline({
        onComplete: () => {
            // Khi timeline chạy xong (đạt 100%), đẩy màn hình loading lên trên
            gsap.to(preloader, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    // Sau khi đẩy lên xong, ẩn hẳn phần tử để không cản trở click
                    preloader.style.display = 'none';
                }
            });
        }
    });

    // Diễn biến của timeline: Chữ nhảy từ 0 -> 50% -> 100%
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

    // --- 3. HIỆU ỨNG THANH MENU (NAVBAR) ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        // Nếu cuộn xuống quá 100px, thêm class 'scrolled' để đổi style (ví dụ: đổi màu nền)
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 4. HIỆU ỨNG PHẦN ĐẦU TRANG (HERO SECTION) ---
    const heroTl = gsap.timeline({
        defaults: {
            ease: 'power4.out' // Cấu hình mặc định cho tất cả các tween trong timeline này
        }
    });

    // Các phần tử xuất hiện lần lượt từ dưới lên
    heroTl.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2 // Mỗi dòng tiêu đề xuất hiện cách nhau 0.2s
    })
    .to('.hero-description', {
        x: 0,
        opacity: 1,
        duration: 1
    }, '-=0.5') // Chạy sớm hơn 0.5s so với khi dòng tiêu đề kết thúc
    .to('.cta-button', {
        y: 0,
        opacity: 1,
        duration: 1
    }, '-=0.5');

    // --- 5. HIỆU ỨNG CÁC KHỐI TRÔI NỔI (FLOATING SHAPES) ---
    gsap.to('.floating-shape', {
        scale: 1.1,
        duration: 2,
        yoyo: true,     // Chạy ngược lại sau khi xong (phóng to -> thu nhỏ)
        repeat: -1,     // Lặp lại vô hạn
        ease: 'sine.inOut',
        stagger: 0.2
    });

    // --- 6. HIỆU ỨNG KHI CUỘN TRANG (SCROLLTRIGGER) ---

    // 6.1. Các thẻ 'About': Bay lên khi cuộn tới
    gsap.utils.toArray('.about-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%', // Bắt đầu khi đỉnh thẻ chạm 80% chiều cao màn hình
                toggleActions: 'play none none reverse' // Cuộn xuống thì chạy, cuộn lên thì đảo ngược
            },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2, // Thẻ sau hiện chậm hơn thẻ trước một chút
            ease: 'power4.out'
        });
    });

    // 6.2. Các mục dự án (Work items): Phóng to nhẹ khi xuất hiện
    gsap.utils.toArray('.work-item').forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'backOut(1.7)' // Hiệu ứng bật nảy (overshoot)
        });
    });

    // 6.3. Thanh kỹ năng (Skill bars): Chạy từ 0% đến giá trị định sẵn
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
        const progress = item.querySelector('.skill-progress');
        const progressValue = progress.dataset.progress; // Lấy số % từ thuộc tính data-progress trong HTML

        // Hiện item kỹ năng
        gsap.to(item, {
            scrollTrigger: item,
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1
        });

        // Chạy thanh phần trăm
        gsap.to(progress, {
            scrollTrigger: item,
            width: progressValue + '%',
            duration: 1.5,
            delay: 0.5 + index * 0.1,
            ease: 'power4.out'
        });
    });

    // 6.4. Parallax cho các hình khối nền khi cuộn
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1 // Chuyển động liên kết trực tiếp với thanh cuộn (cuộn tới đâu chạy tới đó)
        },
        y: 200,
        rotate: 360
    });

    // --- 7. TƯƠNG TÁC CHUỘT (MOUSE MOVE PARALLAX) ---
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.floating-shape');
        // Tính toán vị trí chuột so với tâm màn hình (từ -0.5 đến 0.5)
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 30; // Độ nhạy khác nhau cho mỗi khối
            gsap.to(shape, {
                x: mouseX * speed,
                y: mouseY * speed,
                duration: 1,
                ease: 'power4.out'
            });
        });
    });

    // --- 8. CUỘN MƯỢT CHO MENU (SMOOTH SCROLL) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80 // Trừ hao khoảng cách của thanh Navbar cố định
                    },
                    ease: 'power4.inOut'
                });
            }
        });
    });

    // --- 9. MENU MOBILE (TOGGLE) ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn?.addEventListener('click', () => {
        if (!menuOpen) {
            gsap.to(navLinks, { right: 0, duration: 0.5, ease: 'power4.out' });
            menuOpen = true;
        } else {
            gsap.to(navLinks, { right: '-100%', duration: 0.5, ease: 'power4.in' });
            menuOpen = false;
        }
    });

    // --- 10. SLIDER ĐÁNH GIÁ TỰ ĐỘNG (TESTIMONIAL AUTO-PLAY) ---
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (track && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 32; // Chiều rộng thẻ + gap
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            gsap.to(track, {
                x: -currentIndex * cardWidth,
                duration: 0.8,
                ease: 'power4.inOut'
            });
        }, 4000); // Đổi slide mỗi 4 giây
    }

    // --- 11. XỬ LÝ LOAD ẢNH ---
    // Hiển thị ảnh mượt mà sau khi trình duyệt đã tải xong dữ liệu ảnh
    gsap.utils.toArray('.work-item img').forEach(img => {
        const revealImg = () => {
            gsap.to(img, { scale: 1, opacity: 1, duration: 0.5, ease: 'power4.out' });
        };

        if (img.complete) {
            revealImg();
        } else {
            img.addEventListener('load', revealImg);
        }
    });
});