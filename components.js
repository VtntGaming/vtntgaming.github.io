/**
 * Shared Header (Navbar) & Footer component
 * Include this script in every page and add:
 *   <div id="navbar-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 */
(function () {
  // Detect if this is the main page (index.html or directory root)
  var path = window.location.pathname;
  var isMainPage = path.endsWith('/') || path.endsWith('/VtntGames');

  // Build link helper: on main page use anchor only, on sub-pages prepend "index.html"
  function link(hash) {
    if (!hash) return isMainPage ? '#' : 'VtntGames';
    return isMainPage ? '#' + hash : 'VtntGames#' + hash;
  }

  // ── NAVBAR ──
  var navbarHTML =
    '<nav class="navbar" id="navbar">' +
      '<div class="nav-container">' +
        '<a href="' + link('') + '" class="nav-logo"><span class="vtnt">VTNT</span><span class="games">GAMES</span></a>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<ul class="nav-links" id="navLinks">' +
          '<li><a href="' + link('home') + '">Home</a></li>' +
          '<li><a href="' + link('about') + '">About</a></li>' +
          '<li><a href="' + link('features') + '">Features</a></li>' +
          '<li><a href="' + link('games') + '">Games</a></li>' +
          '<li><a href="' + link('contact') + '">Contact</a></li>' +
        '</ul>' +
      '</div>' +
    '</nav>';

  // ── FOOTER ──
  var footerHTML =
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="' + link('') + '" class="nav-logo"><span class="vtnt">VTNT</span><span class="games">GAMES</span></a>' +
            '<p>Level up your gaming experience with the community that cares.</p>' +
          '</div>' +
          '<div class="footer-links">' +
            '<h4>Quick Links</h4>' +
            '<ul>' +
              '<li><a href="' + link('home') + '">Home</a></li>' +
              '<li><a href="' + link('about') + '">About</a></li>' +
              '<li><a href="' + link('features') + '">Features</a></li>' +
              '<li><a href="' + link('games') + '">Games</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-links">' +
            '<h4>Follow</h4>' +
            '<ul>' +
              '<li><a href="https://discord.gg/hKGx3wjv8B" target="_blank" rel="noopener noreferrer">Discord</a></li>' +
              '<li><a href="https://x.com/VtntGaming" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>' +
              '<li><a href="https://www.youtube.com/@vtntgaming" target="_blank" rel="noopener noreferrer">YouTube</a></li>' +
              '<li><a href="https://github.com/VtntGaming" target="_blank" rel="noopener noreferrer">GitHub</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-links">' +
            '<h4>Legal</h4>' +
            '<ul>' +
              '<li><a href="#">Privacy Policy</a></li>' +
              '<li><a href="#">Terms of Service</a></li>' +
              '<li><a href="#">Cookie Policy</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>&copy; 2021 - ' + new Date().getFullYear() + ' VTNTGAMES. All rights reserved.</p>' +
          '<p>Built with \u2764\uFE0F and deployed on GitHub Pages.</p>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // ── BACK TO TOP BUTTON ──
  var backToTopHTML = '<button class="back-to-top" id="backToTop" aria-label="Back to top">\u2191</button>';

  // Inject into placeholders
  var navHolder = document.getElementById('navbar-placeholder');
  if (navHolder) navHolder.innerHTML = navbarHTML;

  var footerHolder = document.getElementById('footer-placeholder');
  if (footerHolder) footerHolder.innerHTML = footerHTML + backToTopHTML;
})();
