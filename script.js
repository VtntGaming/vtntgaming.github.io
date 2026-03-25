/* ================================
   VtntGaming — script.js
================================ */

// ── Navbar scroll effect ──────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 400);
  animateStats();
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Back to top ───────────────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Animated stat counters ────────────────────────────────────────────────────
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;

  const banner = document.querySelector('.stats-banner');
  if (!banner) return;

  const bannerTop = banner.getBoundingClientRect().top;
  if (bannerTop > window.innerHeight * 0.9) return;

  statsAnimated = true;

  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// Run once on load in case banner is already visible
animateStats();

// ── Scroll-reveal (Intersection Observer) ────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.feature-card, .game-card, .about-card, .stat-item'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Add base styles for reveal animation via JS (keeps CSS clean)
const style = document.createElement('style');
style.textContent = `
  .feature-card, .game-card, .about-card, .stat-item {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .feature-card.revealed, .game-card.revealed,
  .about-card.revealed, .stat-item.revealed {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);

revealElements.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  revealObserver.observe(el);
});

// ── Contact form validation ───────────────────────────────────────────────────
const contactForm   = document.getElementById('contactForm');
const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const messageInput  = document.getElementById('message');
const nameError     = document.getElementById('nameError');
const emailError    = document.getElementById('emailError');
const messageError  = document.getElementById('messageError');
const formSuccess   = document.getElementById('formSuccess');

function validateEmail(value) {
  // Simple RFC-aligned check (no regex injection risk — pure validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showError(input, errorEl, message) {
  input.classList.add('invalid');
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove('invalid');
  errorEl.textContent = '';
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const nameVal    = nameInput.value.trim();
  const emailVal   = emailInput.value.trim();
  const messageVal = messageInput.value.trim();

  // Name
  if (nameVal.length < 2) {
    showError(nameInput, nameError, 'Please enter your name (at least 2 characters).');
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Email
  if (!validateEmail(emailVal)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Message
  if (messageVal.length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters.');
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (valid) {
    // Simulate submission (GitHub Pages is static — no backend)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }, 1200);
  }
});

// Clear errors on input
[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.remove('invalid');
  });
});

// ── Active nav link highlight on scroll ──────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => sectionObserver.observe(s));
