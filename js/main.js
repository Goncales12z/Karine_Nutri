/* Karine Herd Nutricionista - animacoes e interacoes */
(function () {
  'use strict';

  var CFG = {
    wa: '5521991336016',
    defaultMsg: 'Olá, Karine! Vim pelo site e gostaria de agendar uma consulta.'
  };

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A = window.anime;
  var canAnim = !!A && !reduce;
  if (!canAnim) root.classList.remove('anim');

  /* ===== Links do WhatsApp ===== */
  function waLink(msg) { return 'https://wa.me/' + CFG.wa + '?text=' + encodeURIComponent(msg || CFG.defaultMsg); }
  [].forEach.call(document.querySelectorAll('[data-wa]'), function (a) {
    a.href = waLink(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ===== Toast + copia (e-mail, se existir) ===== */
  var toastTimer = null;
  function toast(msg) {
    var el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        resolve();
      } catch (err) { reject(err); }
    });
  }
  [].forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (a) {
    a.addEventListener('click', function () {
      var email = decodeURIComponent(a.href.replace(/^mailto:/, '').split('?')[0]);
      copyText(email).then(function () { toast('E-mail copiado: ' + email); }).catch(function () {});
    });
  });

  /* ===== Barra de progresso no topo ===== */
  var hbarFill = document.querySelector('.hbar-fill');
  var hint = document.querySelector('.scroll-hint');
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function update() {
    ticking = false;
    var y = window.pageYOffset || 0;
    var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var gp = Math.max(0, Math.min(1, y / dh));
    if (hbarFill) hbarFill.style.transform = 'translateX(' + (gp * 100 - 100) + '%)';
    if (hint) hint.classList.toggle('gone', y > 60);
  }

  /* ===== Revelacao individual (hero, crn-card) ===== */
  function revealEl(el) {
    if (!canAnim) { el.style.opacity = 1; el.style.transform = 'none'; return; }
    var scale = el.hasAttribute('data-reveal-scale');
    A({
      targets: el,
      opacity: [0, 1],
      translateY: scale ? [10, 0] : [22, 0],
      scale: scale ? [0.94, 1] : 1,
      duration: 750,
      easing: 'easeOutQuad'
    });
  }

  /* ===== Revelacao em grupo: chips, passos e avaliacoes entram juntos,
     sincronizados, para nenhum ficar "atrasado" em relacao aos outros ===== */
  function setupReveal() {
    var reveals = [].slice.call(document.querySelectorAll('[data-reveal],[data-reveal-scale]'));
    var groups = [].slice.call(document.querySelectorAll('[data-reveal-group]'));

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
      groups.forEach(function (g) { [].forEach.call(g.children, function (c) { c.style.opacity = 1; c.style.transform = 'none'; }); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        revealEl(e.target);
      });
    }, { threshold: 0.3 });
    reveals.forEach(function (el) { io.observe(el); });

    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        gio.unobserve(e.target);
        var kids = [].slice.call(e.target.children);
        if (!canAnim) { kids.forEach(function (k) { k.style.opacity = 1; k.style.transform = 'none'; }); return; }
        A({
          targets: kids,
          opacity: [0.001, 1],
          translateY: [20, 0],
          duration: 560,
          delay: A.stagger(80),
          easing: 'easeOutQuad'
        });
      });
    }, { threshold: 0.2 });
    groups.forEach(function (g) { gio.observe(g); });
  }

  /* ===== Abertura do hero ===== */
  function heroIntro() {
    var tl = A.timeline({ easing: 'easeOutExpo' });
    tl.add({ targets: '.hero-line > span', translateY: ['112%', '0%'], duration: 950, delay: A.stagger(120) }, 80)
      .add({ targets: '.hero-sub, .hero-cta > *', opacity: [0, 1], translateY: [16, 0], duration: 750, delay: A.stagger(90) }, 620)
      .add({ targets: '.hero-photo-frame', opacity: [0, 1], translateY: [16, 0], scale: [0.96, 1], duration: 850 }, 380)
      .add({ targets: '.badge-pill', opacity: [0, 1], scale: [0.6, 1], duration: 620, easing: 'easeOutBack' }, 1150)
      .add({ targets: '.badge-crn', opacity: [0, 1], scale: [0.6, 1], duration: 620, easing: 'easeOutBack' }, 1250)
      .add({ targets: '.scroll-hint', opacity: [0, 1], duration: 600 }, 1400);

    A({ targets: '.mouse-wheel', translateY: [0, 13], opacity: [1, 0], duration: 1300, easing: 'easeInOutQuad', loop: true });
    A({ targets: '.ring-1', rotate: [0, 360], duration: 40000, easing: 'linear', loop: true });
    A({ targets: '.fab-ring', scale: [1, 1.7], opacity: [0.5, 0], duration: 1700, easing: 'easeOutQuad', loop: true, delay: 2000 });
  }

  function init() {
    try {
      setupReveal();
      if (canAnim) heroIntro();
      update();
    } catch (err) {
      root.classList.remove('anim');
      if (window.console) console.error(err);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', update);
  init();
})();
