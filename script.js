/* ---------------- Mobile navigation ---------------- */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------------- Sticky header shadow ---------------- */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------------- Scroll reveal (fade-up, staggered) ---------------- */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  /* stagger items that share a grid */
  document.querySelectorAll('.service-grid, .process-grid, .review-grid').forEach(function (grid) {
    Array.prototype.forEach.call(grid.children, function (child, i) {
      if (child.classList.contains('reveal')) child.style.setProperty('--d', (i * 90) + 'ms');
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

/* ---------------- Footer year ---------------- */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------------- Contact form validation ---------------- */
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var success = form.querySelector('.form-success');

  function setError(field, msg) {
    var wrap = field.closest('.field');
    var err = wrap.querySelector('.err');
    wrap.classList.toggle('invalid', !!msg);
    if (err) err.textContent = msg || '';
  }

  function validateField(field) {
    var val = field.value.trim();
    if (field.hasAttribute('required') && !val) {
      setError(field, 'This field is required.'); return false;
    }
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError(field, 'Please enter a valid email address.'); return false;
    }
    if (field.type === 'tel' && val && val.replace(/[^0-9]/g, '').length < 8) {
      setError(field, 'Please enter a valid phone number.'); return false;
    }
    setError(field, ''); return true;
  }

  var fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(function (f) {
    f.addEventListener('blur', function () { validateField(f); });
    f.addEventListener('input', function () {
      if (f.closest('.field').classList.contains('invalid')) validateField(f);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    fields.forEach(function (f) { if (!validateField(f)) ok = false; });
    if (!ok) {
      var firstInvalid = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    /* No backend wired — show confirmation. Replace with real submission. */
    form.querySelectorAll('input, select, textarea, button').forEach(function (el) { el.disabled = true; });
    if (success) success.hidden = false;
  });
})();

/* ------------------------------------------------------------------
   Placeholder imagery — subject-matched stand-ins for the real PCS
   photos. Swap these URLs for the actual assets. If an image fails to
   load, the element falls back to a solid timber tone (no gradients).
------------------------------------------------------------------ */
var IMAGES = {
  hero: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1900&q=80',
  service: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80'
  ]
};
var FALLBACK = '#5c6b54';

function setBg(el, url) {
  var probe = new Image();
  probe.onload = function () { el.style.backgroundImage = "url('" + url + "')"; };
  probe.onerror = function () { el.style.backgroundColor = FALLBACK; el.style.backgroundImage = 'none'; };
  probe.src = url;
}

document.addEventListener('DOMContentLoaded', function () {
  var hero = document.querySelector('.hero[data-img]');
  if (hero) setBg(hero, IMAGES.hero);
  document.querySelectorAll('.service-img[data-img]').forEach(function (el, i) {
    setBg(el, IMAGES.service[i % IMAGES.service.length]);
  });
});
