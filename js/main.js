// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Nav: solid background on scroll =====
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Signature section videos: play when in view =====
const sigVideos = document.querySelectorAll('.sig-video');
const sigObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const v = entry.target;
    if (entry.isIntersecting) v.play().catch(() => {});
    else v.pause();
  });
}, { threshold: 0.4 });
sigVideos.forEach(v => sigObserver.observe(v));

// ===== Reel strip: lazy-load + tap to play =====
document.querySelectorAll('.reel-card').forEach(card => {
  const video = card.querySelector('video');
  const src = video.getAttribute('data-src');

  const loadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !video.src) {
        video.src = src;
      }
    });
  }, { threshold: 0.1 });
  loadObserver.observe(card);

  card.addEventListener('click', () => {
    if (!video.src) video.src = src;
    if (video.paused) {
      video.play();
      card.classList.add('playing');
    } else {
      video.pause();
      card.classList.remove('playing');
    }
  });

  video.addEventListener('ended', () => card.classList.remove('playing'));
});

// ===== Booking form -> WhatsApp handoff =====
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name').trim();
  const phone = data.get('phone').trim();
  const vehicle = data.get('vehicle').trim();
  const service = data.get('service');
  const pkg = data.get('package');
  const date = data.get('date');
  const time = data.get('time');
  const notes = data.get('notes').trim();

  let msg = `Hi Luxi Automotive Care, I'd like to book a slot.\n\n`;
  msg += `Name: ${name}\n`;
  msg += `Phone: ${phone}\n`;
  msg += `Vehicle: ${vehicle}\n`;
  msg += `Service: ${service}\n`;
  if (pkg) msg += `Package: ${pkg}\n`;
  msg += `Preferred date: ${date}\n`;
  msg += `Preferred time: ${time}\n`;
  if (notes) msg += `Notes: ${notes}\n`;

  const url = `https://wa.me/919787979932?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});

