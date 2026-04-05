/* Tab navigation for static / GitHub Pages hosting (no dependency on React hydration). */
(function () {
  function init() {
    var navBtns = document.querySelectorAll('.navbar .navbar-link[data-nav-page]');
    if (!navBtns.length) return;
    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var page = btn.getAttribute('data-nav-page');
        if (!page) return;
        document.querySelectorAll('.navbar .navbar-link[data-nav-page]').forEach(function (b) {
          b.classList.remove('active');
        });
        document.querySelectorAll('article[data-page]').forEach(function (a) {
          a.classList.remove('active');
        });
        btn.classList.add('active');
        var art = document.querySelector('article[data-page="' + page + '"]');
        if (art) art.classList.add('active');
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
