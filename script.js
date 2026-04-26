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

// Animated download component
(function () {
  const root = document.getElementById('downloadAnim');
  if (!root) return;

  const textEl = document.getElementById('daText');
  const progressEl = document.getElementById('daProgress');
  const filesEl = document.getElementById('daFiles');
  const timeEl = document.getElementById('daTime');

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const TOTAL_SECONDS = 154;
  const TOTAL_FILES = 1000;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}min ${String(r).padStart(2, '0')}sec`;
  };

  const scrambleText = (target, onDone) => {
    const chars = target.split('');
    if (reduced) { textEl.textContent = target; onDone && onDone(); return; }
    let i = 0;
    const step = 800 / (target.length * 10);
    const tick = () => {
      const out = chars.map((l, idx) => {
        if (l === ' ') return l;
        if (idx <= i) return target[idx];
        return ALPHABET[Math.floor(Math.random() * 26)];
      }).join('');
      textEl.textContent = out;
      i += 1;
      if (i < target.length) {
        setTimeout(tick, step);
      } else {
        textEl.textContent = target;
        onDone && onDone();
      }
    };
    tick();
  };

  let progressTimer = null;
  const startProgress = () => {
    let p = 0;
    progressEl.style.width = '0%';
    filesEl.textContent = '0';
    timeEl.textContent = formatTime(TOTAL_SECONDS);
    clearInterval(progressTimer);
    const interval = reduced ? 60 : 25;
    progressTimer = setInterval(() => {
      p += 1;
      progressEl.style.width = p + '%';
      filesEl.textContent = Math.floor((p / 100) * TOTAL_FILES).toLocaleString();
      timeEl.textContent = formatTime(Math.max(0, TOTAL_SECONDS - Math.floor((p / 100) * TOTAL_SECONDS)));
      if (p >= 100) {
        clearInterval(progressTimer);
        setTimeout(() => {
          root.classList.remove('is-animating');
          scrambleText('READY');
          setTimeout(start, 1800);
        }, 600);
      }
    }, interval);
  };

  const start = () => {
    root.classList.add('is-animating');
    scrambleText('DOWNLOADING', startProgress);
  };

  // Start once visible to avoid running off-screen
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(root);
  } else {
    start();
  }
})();
