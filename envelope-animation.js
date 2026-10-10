/* ==========================================================================
   BornHere — Birthday Letter & Envelope Intro Animation Engine
   Interactive multi-stage opening sequence, smooth physics, & sparkle engine
   ========================================================================== */

let isLetterOpened = false;

function openEnvelope() {
  if (isLetterOpened) return;
  const envWrap = document.getElementById('envelope-wrapper');
  if (!envWrap) return;

  isLetterOpened = true;

  // Phase 1 (0ms): Anticipation — seal shimmers & breaks, hint dissolves, envelope settles
  envWrap.classList.add('is-opening');

  // Phase 2 (500ms): Flap Reveal — triangular flap folds backward smoothly in 3D (1.2s)
  setTimeout(() => {
    envWrap.classList.add('is-flapped', 'is-opened');
  }, 500);

  // Phase 3 (1550ms): Paper Extraction — letter sheet glides upwards out of envelope pocket (1.2s)
  setTimeout(() => {
    envWrap.classList.add('is-rising');
  }, 1550);

  // Phase 4 (2800ms): Grand Unfold — envelope folds melt away, parchment card expands & sparkles burst
  setTimeout(() => {
    envWrap.classList.add('stage-unfolded');
    createLetterSparkles();
  }, 2800);
}

function dismissLetter(e) {
  if (e) e.stopPropagation();
  const overlay = document.getElementById('letter-overlay');
  if (!overlay) return;

  // Fade letter sheet out
  overlay.classList.add('dismissed');

  // Check if Time Warp rewind engine is available
  if (typeof window.startTimeWarp === 'function') {
    // Start the cinematic dates rewind animation (2026 -> 2006)
    window.startTimeWarp(() => {
      overlay.style.display = 'none';
      document.body.classList.remove('letter-locked');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } else {
    // Fallback standard dismissal
    document.body.classList.remove('letter-locked');
    setTimeout(() => {
      overlay.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  }
}

function openBirthdayLetter() {
  const overlay = document.getElementById('letter-overlay');
  const envWrap = document.getElementById('envelope-wrapper');
  if (!overlay || !envWrap) return;

  overlay.style.display = 'flex';
  void overlay.offsetWidth;
  overlay.classList.remove('dismissed');
  document.body.classList.add('letter-locked');

  isLetterOpened = true;
  envWrap.classList.add('is-opening', 'is-flapped', 'is-opened', 'is-rising', 'stage-unfolded');
}

function createLetterSparkles() {
  const stage = document.querySelector('.letter-stage');
  if (!stage) return;

  const particleCount = 38;
  const colors = [
    '#f8d688', // Light Gold
    '#e5b85c', // Primary Gold
    '#ffd700', // Bright Warm Gold
    '#ffffff', // Pure Star White
    '#fed7aa'  // Soft Amber
  ];

  for (let i = 0; i < particleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'letter-sparkle-particle';

    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.45;
    const dist = Math.random() * 210 + 60;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist * 0.85; // slightly elliptical spread
    const size = Math.random() * 3.5 + 2.5; // 2.5px to 6px
    const delay = Math.random() * 0.35;
    const duration = Math.random() * 0.6 + 1.8; // 1.8s to 2.4s float time
    const color = colors[Math.floor(Math.random() * colors.length)];

    sparkle.style.setProperty('--tx', `${tx.toFixed(1)}px`);
    sparkle.style.setProperty('--ty', `${ty.toFixed(1)}px`);
    sparkle.style.setProperty('--size', `${size.toFixed(1)}px`);
    sparkle.style.setProperty('--color', color);
    sparkle.style.left = '50%';
    sparkle.style.top = '48%';
    sparkle.style.animationDelay = `${delay.toFixed(2)}s`;
    sparkle.style.animationDuration = `${duration.toFixed(2)}s`;

    stage.appendChild(sparkle);

    // Clean up after completion
    setTimeout(() => {
      sparkle.remove();
    }, (delay + duration) * 1000 + 100);
  }
}

// Bind globally to window for inline onclick handlers
window.openEnvelope = openEnvelope;
window.dismissLetter = dismissLetter;
window.openBirthdayLetter = openBirthdayLetter;
window.createLetterSparkles = createLetterSparkles;

// Ensure scroll lock on initial load while letter is active
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('letter-overlay');
    if (overlay && !overlay.classList.contains('dismissed')) {
      document.body.classList.add('letter-locked');
    }
  });
} else {
  const overlay = document.getElementById('letter-overlay');
  if (overlay && !overlay.classList.contains('dismissed')) {
    document.body.classList.add('letter-locked');
  }
}
