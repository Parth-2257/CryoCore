/* ===== NAVBAR FROSTED GLASS ON SCROLL ===== */
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
})();

/* ===== SCROLL REVEAL ===== */
(function () {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
})();

/* ===== COUNT-UP ANIMATION ===== */
(function () {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsStrip = document.getElementById('statsStrip');
    if (!statNumbers.length || !statsStrip) return;

    let counted = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(el => {
                    const target = parseFloat(el.dataset.target);
                    const suffix = el.dataset.suffix || '';
                    const isDecimal = target % 1 !== 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function animateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;

                        if (isDecimal) {
                            el.textContent = current.toFixed(1) + suffix;
                        } else {
                            el.textContent = Math.floor(current) + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        }
                    }
                    requestAnimationFrame(animateCount);
                });
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsStrip);
})();

/* ===== SMOOTH SCROLL FOR LEARN MORE ===== */
(function () {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (!learnMoreBtn) return;
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('portals');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
})();
