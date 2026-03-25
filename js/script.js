// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        // Simple animation for hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu on clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar background change on scroll
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.padding = '15px 0';
        nav.style.backgroundColor = 'rgba(3, 3, 3, 0.7)';
    } else {
        nav.style.padding = '24px 0';
        nav.style.backgroundColor = 'rgba(3, 3, 3, 0.3)';
    }
});
