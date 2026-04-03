// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav-content a');

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

// Workflow steps — scroll-triggered highlight on mobile (one at a time)
(function () {
    const isMobile = () => window.matchMedia('(max-width: 991px)').matches;
    const steps = document.querySelectorAll('.workflow-step');

    if (!steps.length) return;

    const clearAll = () => steps.forEach(s => s.classList.remove('in-view'));

    function highlightClosest() {
        if (!isMobile()) { clearAll(); return; }

        const viewportCenter = window.innerHeight * 0.5;
        let closest = null;
        let minDist = Infinity;

        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const dist = Math.abs(stepCenter - viewportCenter);
            if (dist < minDist) {
                minDist = dist;
                closest = step;
            }
        });

        // Only highlight if the closest step is reasonably in view
        if (closest) {
            const rect = closest.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
            clearAll();
            if (inView) closest.classList.add('in-view');
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightClosest();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Also run on resize
    window.addEventListener('resize', highlightClosest);
})();
