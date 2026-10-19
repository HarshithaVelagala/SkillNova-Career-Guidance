// scroll-to-journey.js
(function() {
  const TARGET_ID = 'journey';
  const CTA_SELECTORS = ['.btn-primary[data-scroll-to="journey"]', '.btn-primary[href="#journey"]'];
  const NAVBAR_SELECTOR = '.navbar'; // change if your navbar class is different
  const DEFAULT_OFFSET = 82;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getOffset() {
    const nav = document.querySelector(NAVBAR_SELECTOR);
    if (nav) return Math.ceil(nav.getBoundingClientRect().height) + 8;
    return DEFAULT_OFFSET;
  }

  function scrollToTarget(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = getOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    if (prefersReducedMotion) {
      window.scrollTo(0, top);
      try { history.replaceState(null, '', '#' + id); } catch(e){}
      el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
      return;
    }

    const startY = window.scrollY;
    const distance = top - startY;
    const duration = Math.min(900, Math.max(450, Math.abs(distance) / 1.5));
    const startTime = performance.now();

    function ease(t){ return t<0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2; }

    function step(now) {
      const time = Math.min(1, (now - startTime) / duration);
      const eased = ease(time);
      window.scrollTo(0, Math.round(startY + distance * eased));
      if (time < 1) requestAnimationFrame(step);
      else {
        try { history.replaceState(null, '', '#' + id); } catch(e){}
        el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
      }
    }
    requestAnimationFrame(step);
  }

  function attachHandlers() {
    CTA_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(btn => {
        btn.addEventListener('click', function(e){
          const href = (btn.getAttribute && btn.getAttribute('href')) || '';
          if (href && href.startsWith('#')) e.preventDefault();
          scrollToTarget(TARGET_ID);
        });
      });
    });

    document.querySelectorAll('a[href="#' + TARGET_ID + '"]').forEach(a => {
      a.addEventListener('click', function(e){ e.preventDefault(); scrollToTarget(TARGET_ID); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachHandlers);
  else attachHandlers();
})();