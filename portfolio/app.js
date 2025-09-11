// Small interactivity: year, mobile nav toggle, and simple form handling
document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('primary-menu');
if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.querySelector('ul').classList.toggle('open');
  });
}

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.querySelector('.form-status');
    status.textContent = 'Sending... (demo)';
    setTimeout(() => {
      status.textContent = 'Thanks — I will get back to you soon.';
      form.reset();
    }, 800);
  });
}
