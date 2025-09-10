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
