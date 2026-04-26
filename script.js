// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Quote form: estimate fare based on weight + a route multiplier
const quoteForm = document.getElementById('quote');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const result = document.getElementById('quote-result');
    if (!from || !to || weight <= 0) {
      result.textContent = 'Please fill in all fields to get an estimate.';
      return;
    }
    const sameCity = from.toLowerCase().split(',')[0] === to.toLowerCase().split(',')[0];
    const base = sameCity ? 6 : 19;
    const perKg = sameCity ? 1.2 : 3.5;
    const estimate = Math.round(base + weight * perKg);
    result.textContent = `Estimated $${estimate} for ${weight}kg from ${from} to ${to}. We've sent a copy to your inbox.`;
  });
}

// Track form
const trackForm = document.querySelector('.track-form');
if (trackForm) {
  trackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('tracking').value.trim();
    const status = document.getElementById('track-status');
    status.textContent = id
      ? `Parcel ${id} is in transit. ETA tomorrow 18:00.`
      : 'Enter a tracking number to see live status.';
  });
}

// Reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// Spotlight cursor on feature cards
document.querySelectorAll('.feature').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// Close other FAQ items when one opens (accordion behavior)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => { if (other !== item) other.open = false; });
    }
  });
});
