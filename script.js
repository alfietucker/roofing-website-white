/* Mobile navigation toggle */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
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
  }
})();

/* ------------------------------------------------------------------
   Placeholder imagery.
   These are stand-ins that match the SUBJECT of each section in the
   original (timber ceiling, glass balustrade, interior, modern timber
   home, wood shavings, dark workshop). Swap the URLs below for the real
   PCS photos when available. If an image fails to load, the element
   falls back to a wood-tone gradient so the layout never breaks.
------------------------------------------------------------------ */
var IMAGES = {
  hero: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1900&q=80',
  service: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80'
  ],
  quote: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1900&q=80',
  features: 'https://images.unsplash.com/photo-1572297870735-9a3ca3f1e74e?auto=format&fit=crop&w=1900&q=80'
};

var WOOD_GRADIENT = 'linear-gradient(135deg,#6b5642 0%,#9a7b5b 45%,#c0a079 100%)';

function setBg(el, url, overlayKept) {
  var probe = new Image();
  probe.onload = function () { el.style.backgroundImage = "url('" + url + "')"; };
  probe.onerror = function () { el.style.backgroundImage = WOOD_GRADIENT; };
  probe.src = url;
}

document.addEventListener('DOMContentLoaded', function () {
  var hero = document.querySelector('.hero[data-img]');
  if (hero) setBg(hero, IMAGES.hero);

  document.querySelectorAll('.service-img[data-img]').forEach(function (el, i) {
    setBg(el, IMAGES.service[i % IMAGES.service.length]);
  });

  var quote = document.querySelector('.quote[data-img]');
  if (quote) setBg(quote, IMAGES.quote);

  var features = document.querySelector('.features[data-img]');
  if (features) setBg(features, IMAGES.features);
});
