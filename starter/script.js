// Set the current year in the footer

// Show/hide the menu on small screens
const navBtn = document.querySelector('.nav-toggle');
const menu = document.getElementById('primary-menu');
if (navBtn && menu) {
  navBtn.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
}

// Simple form check
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // always prevent actual submit in this demo
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const status = document.querySelector('.form-status');

    // basic validation
    if (!name.value || !email.value || !message.value) {
      status.textContent = 'Please fill in all fields.';
      status.classList.remove('sent');
      return;
    }

    // simulate sending
    status.textContent = 'Sending... (demo)';
    status.classList.remove('sent');

    // simulate a network delay then show confirmation and clear inputs
    setTimeout(() => {
      status.textContent = 'Message sent! Thanks — we will reach out soon.';
      status.classList.add('sent');
      // clear inputs for a clean form
      name.value = '';
      email.value = '';
      message.value = '';
    }, 800);
  });
}

// Carousel functionality (adds swipe, buttons, dots, and keyboard support)
(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');

  let index = 0;

  function createDots() {
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'carousel-dot';
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.dataset.index = i;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => { goTo(i); });
      dotsWrap.appendChild(btn);
    });
  }

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    const dots = carousel.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

  createDots();
  update();

  // Pointer (mouse/touch) swipe handling
  let isDown = false;
  let startX = 0;

  track.addEventListener('pointerdown', (e) => {
    isDown = true;
    startX = e.clientX;
    track.setPointerCapture(e.pointerId);
    track.style.transition = 'none';
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const delta = e.clientX - startX;
    track.style.transform = `translateX(calc(-${index * 100}% + ${delta}px))`;
  });

  track.addEventListener('pointerup', (e) => {
    if (!isDown) return;
    isDown = false;
    track.releasePointerCapture(e.pointerId);
    track.style.transition = '';
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goTo(index + 1);
      else goTo(index - 1);
    } else update();
  });

  // Support cancel and leave
  track.addEventListener('pointercancel', () => { isDown = false; update(); });
  track.addEventListener('pointerleave', () => { if (isDown) { isDown = false; update(); } });

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  });

})();
