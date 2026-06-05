/* Nikki Lasley Consulting — shared interactions */
(function () {
  // Chip filter groups (visual toggle)
  document.addEventListener('click', function (e) {
    var chip = e.target.closest('.chips button.chip');
    if (!chip) return;
    var group = chip.parentElement;
    group.querySelectorAll('button.chip').forEach(function (c) { c.classList.remove('on'); });
    chip.classList.add('on');
  });

  // Mobile menu toggle
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-menu-toggle]');
    if (t) {
      var m = document.querySelector('.mobile-menu');
      if (m) m.classList.toggle('open');
    }
  });

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el, i) {
      el.style.animationDelay = (Math.min(i % 4, 3) * 0.07) + 's';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
  // Safety net: never leave content hidden if the observer misses.
  setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 1400);

  // Newsletter / form niceties (prevent reload, show a tiny confirmation)
  document.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-demo-form]');
    if (!f) return;
    e.preventDefault();
    var note = f.querySelector('[data-form-note]');
    if (note) { note.textContent = note.getAttribute('data-msg') || 'Thank you — we\u2019ll be in touch shortly.'; note.style.display = 'block'; }
    f.reset();
  });
})();
