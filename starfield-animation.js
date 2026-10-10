/* ==========================================================================
   BornHere — Starfield Canvas Background Animation
   Procedural twinkling stars and dynamic viewport resizing engine
   ========================================================================== */

(function () {
  const starsCanvas = document.getElementById('stars-canvas');
  if (!starsCanvas) return;

  const ctxStars = starsCanvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 140;

  function resizeStarsCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: Math.random() > 0.3 ? '#f8fafc' : '#e5b85c'
      });
    }
  }

  function renderStars() {
    ctxStars.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

    for (let star of stars) {
      star.alpha += star.twinkleSpeed * star.direction;
      if (star.alpha >= 0.95) {
        star.alpha = 0.95;
        star.direction = -1;
      } else if (star.alpha <= 0.15) {
        star.alpha = 0.15;
        star.direction = 1;
      }

      ctxStars.beginPath();
      ctxStars.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctxStars.fillStyle = star.color;
      ctxStars.globalAlpha = star.alpha;
      ctxStars.fill();
    }

    ctxStars.globalAlpha = 1;
    requestAnimationFrame(renderStars);
  }

  window.addEventListener('resize', resizeStarsCanvas);
  resizeStarsCanvas();
  renderStars();
})();
