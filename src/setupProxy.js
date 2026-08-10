const path = require('path');

// Webpack-dev-server skips the SPA fallback for URLs that look like file paths
// (anything with a dot in the last segment: /cv.pdf, /resume.pdf, /contact.me).
// This middleware intercepts those routes and serves index.html instead.
const SPA_ROUTES = ['/cv.pdf', '/resume.pdf', '/contact.me'];

module.exports = function (app) {
  app.use(function (req, res, next) {
    if (SPA_ROUTES.includes(req.path)) {
      return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
    }
    next();
  });
};
