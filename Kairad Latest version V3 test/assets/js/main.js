/* ==========================================================================
   KAIRAD CONSULTING — site behavior
   Mobile nav, dropdowns, scroll-reveal animations, contact form → mailto,
   case-study video play handling.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var open = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Dropdown menus ---------- */
  document.querySelectorAll('.has-dropdown').forEach(function (li) {
    var toggle = li.querySelector('.dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = li.classList.contains('open');
      document.querySelectorAll('.has-dropdown.open').forEach(function (other) {
        other.classList.remove('open');
        var t = other.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        li.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open').forEach(function (li) {
        li.classList.remove('open');
        var t = li.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-dropdown.open').forEach(function (li) {
        li.classList.remove('open');
      });
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ---------- Scroll-reveal animations ---------- */
  var revealTargets = document.querySelectorAll(
    '.card, .step, .tier, .mvv-tile, .vertical-item, .delivery-step, .contact-card, .case-study, .section-head, .callout, .split-media, .hero-media'
  );
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.location.search.indexOf('noanim') !== -1; /* ?noanim = skip reveal animations (testing) */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      // Stagger siblings inside the same parent grid
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.classList && c.classList.contains('reveal');
      });
      var idx = siblings.indexOf(el);
      el.style.setProperty('--reveal-delay', (Math.min(idx, 7) * 0.08) + 's');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- About page tabs (legacy support) ---------- */
  var tabButtons = document.querySelectorAll('[role="tab"]');
  tabButtons.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var panelId = tab.getAttribute('aria-controls');
      tabButtons.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(panelId);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Contact form → mailto ---------- */
  var quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (name) {
        var f = quoteForm.querySelector('[name="' + name + '"]');
        return f ? f.value.trim() : '';
      };
      var name = get('name'), email = get('email'), message = get('message');
      var status = document.getElementById('form-status');
      if (!name || !email || !message) {
        if (status) status.textContent = 'Please fill in your name, email, and message.';
        return;
      }
      var serviceField = quoteForm.querySelector('[name="service"]');
      var serviceLabel = serviceField ? serviceField.options[serviceField.selectedIndex].text : '';
      var subject = 'Quote request — ' + serviceLabel + ' — ' + name;
      var bodyLines = [
        'Name: ' + name,
        'Company: ' + get('company'),
        'Email: ' + email,
        'Phone: ' + get('phone'),
        'Service: ' + serviceLabel,
        '',
        message
      ];
      window.location.href = 'mailto:dharmesh.patel@kairad.org?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
      if (status) status.textContent = 'Opening your email client…';
    });
  }

  /* ---------- Case-study video: pause others when one plays ---------- */
  var caseVideos = document.querySelectorAll('.case-video video');
  caseVideos.forEach(function (v) {
    v.addEventListener('play', function () {
      caseVideos.forEach(function (other) { if (other !== v) other.pause(); });
    });
  });

  /* ---------- Hero background boxes (kaizen grid) ---------- */
  var heroGrid = document.getElementById('heroBoxesGrid');
  if (heroGrid && !window.matchMedia('(max-width: 720px)').matches) {
    var hbColors = [
      'rgba(57,108,150,0.9)',   /* blue */
      'rgba(31,80,121,0.9)',    /* blue-bright */
      'rgba(61,111,150,0.85)',  /* blue-soft */
      'rgba(168,84,15,0.9)',    /* orange (text-safe) */
      'rgba(238,131,41,0.9)',   /* orange-soft (vivid brand) */
      'rgba(168,80,47,0.9)'     /* terra */
    ];
    var cols = 56, rows = 22;
    var frag = document.createDocumentFragment();
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var cell = document.createElement('div');
        cell.className = 'hero-box';
        if (r % 2 === 0 && c % 2 === 0) cell.className += ' has-plus';
        cell.style.setProperty('--hb-color', hbColors[(r * cols + c) % hbColors.length]);
        frag.appendChild(cell);
      }
    }
    heroGrid.appendChild(frag);
  }

  /* ---------- Hero flip card (hover on desktop, tap on touch) ---------- */
  var heroFlip = document.getElementById('heroFlipCard');
  if (heroFlip) {
    heroFlip.addEventListener('click', function () {
      heroFlip.classList.toggle('is-flipped');
    });
    heroFlip.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        heroFlip.classList.toggle('is-flipped');
      }
    });
  }
})();
