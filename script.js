const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const dropdown = document.querySelector('[data-nav-dropdown]');
const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
const dropdownMenu = document.querySelector('[data-dropdown-menu]');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const menuLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const reveals = document.querySelectorAll('.reveal');
const year = document.querySelector('[data-year]');

year.textContent = new Date().getFullYear();

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeDropdown = () => {
  dropdownMenu.classList.remove('open');
  dropdownToggle.setAttribute('aria-expanded', 'false');
};

const closeMenu = () => {
  closeDropdown();
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  document.body.classList.remove('menu-open');
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  nav.classList.toggle('open', !isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  document.body.classList.toggle('menu-open', !isOpen);
});

dropdownToggle.addEventListener('click', () => {
  const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';
  dropdownMenu.classList.toggle('open', !isOpen);
  dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) closeDropdown();
});

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const dropdownWasOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';
  closeMenu();
  if (dropdownWasOpen) dropdownToggle.focus();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px' }
);

reveals.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
    dropdownToggle.classList.toggle('active', visible.target.id === 'github');
  },
  { threshold: [0.2, 0.45, 0.7], rootMargin: '-15% 0px -55%' }
);

sections.forEach((section) => sectionObserver.observe(section));
