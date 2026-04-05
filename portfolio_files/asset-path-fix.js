/* Rewrite /assets/* image URLs to ./portfolio_files/* for GitHub Pages (React may still use old paths). */
(function () {
  var RE = /\/assets\/(?:skills|images|projects|blogs)\/([^/?#]+)/;

  function mapFile(name) {
    return name === 'aakash_bnw.png' ? 'my-avatar.png' : name;
  }

  function fixImg(img) {
    if (!img || img.tagName !== 'IMG') return;
    var src = img.getAttribute('src');
    if (!src) return;
    var m = src.match(RE);
    if (!m) return;
    var next = './portfolio_files/' + mapFile(m[1]);
    if (src !== next) img.setAttribute('src', next);
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('img[src]').forEach(fixImg);
  }

  function init() {
    scan(document);
    var obs = new MutationObserver(function (records) {
      records.forEach(function (rec) {
        if (rec.type === 'attributes' && rec.attributeName === 'src' && rec.target.tagName === 'IMG') {
          fixImg(rec.target);
        }
        rec.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.tagName === 'IMG') fixImg(n);
          scan(n);
        });
      });
    });
    obs.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    });
    var passes = 0;
    var iv = setInterval(function () {
      scan(document);
      if (++passes >= 24) clearInterval(iv);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
