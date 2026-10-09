/* ===== 1. Problem cards: build description from data attributes ===== */
const problems = document.querySelectorAll('.floating-problem');

problems.forEach(card => {
    const title = card.dataset.title || '';
    const text = card.dataset.description || '';

    const desc = document.createElement('div');
    desc.className = 'problem-description';
    desc.innerHTML =
        '<div class="problem-description-content">' +
        '<h3></h3><p></p>' +
        '</div>';
    desc.querySelector('h3').textContent = title;
    desc.querySelector('p').textContent = text;
    card.appendChild(desc);

    card.setAttribute('tabindex', '0');

    /* click / tap / Enter toggles the card (useful on touch screens) */
    const toggle = () => {
        const open = card.classList.contains('active');
        problems.forEach(c => c.classList.remove('active'));
        if (!open) card.classList.add('active');
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
});

/* ===== 2. "Enter the Experience" button scrolls to the next section ===== */
const exploreBtn = document.querySelector('.explorebtn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        const next = document.querySelector('#weight-slide');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
}

/* ===== 3. Navbar disappears after you scroll ===== */
const header = document.querySelector('header');

function handleNavbar() {
    const leftHero = window.scrollY > window.innerHeight * 0.3;
    header.classList.toggle('nav-hidden', leftHero);
}

window.addEventListener('scroll', handleNavbar, { passive: true });
window.addEventListener('resize', handleNavbar);
handleNavbar();

/* ===== 4. Dark / light mode toggle (remembers your choice) ===== */
const themeBtn = document.getElementById('themeToggle');
const root = document.documentElement;

function updateThemeLabel() {
    const isLight = root.classList.contains('light');
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

if (themeBtn) {
    updateThemeLabel();
    themeBtn.addEventListener('click', () => {
        root.classList.toggle('light');
        try {
            localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
        } catch (e) {}
        updateThemeLabel();
    });
}
