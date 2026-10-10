/* ==========================================================================
   BornHere — Time Warp Chronometer Scroll Engine (2026 -> 2006)
   Slow, majestic vertical odometer reel scrolling backwards across 20 years
   ========================================================================== */

const YEARS_DATA = [
  { year: 2026, date: 'OCTOBER 2026', elapsed: 'Present Day · Age 20' },
  { year: 2025, date: 'AUGUST 2025', elapsed: '1 Year Ago · Age 19' },
  { year: 2024, date: 'MAY 2024', elapsed: '2 Years Ago · Age 18' },
  { year: 2023, date: 'NOVEMBER 2023', elapsed: '3 Years Ago · Age 17' },
  { year: 2022, date: 'JULY 2022', elapsed: '4 Years Ago · Age 16' },
  { year: 2021, date: 'MARCH 2021', elapsed: '5 Years Ago · Age 15' },
  { year: 2020, date: 'OCTOBER 2020', elapsed: '6 Years Ago · Age 14' },
  { year: 2019, date: 'JULY 2019', elapsed: '7 Years Ago · Age 13' },
  { year: 2018, date: 'APRIL 2018', elapsed: '8 Years Ago · Age 12' },
  { year: 2017, date: 'DECEMBER 2017', elapsed: '9 Years Ago · Age 11' },
  { year: 2016, date: 'SEPTEMBER 2016', elapsed: '10 Years Ago · A Decade Ago' },
  { year: 2015, date: 'MAY 2015', elapsed: '11 Years Ago · Age 9' },
  { year: 2014, date: 'JANUARY 2014', elapsed: '12 Years Ago · Age 8' },
  { year: 2013, date: 'AUGUST 2013', elapsed: '13 Years Ago · Age 7' },
  { year: 2012, date: 'APRIL 2012', elapsed: '14 Years Ago · Age 6' },
  { year: 2011, date: 'NOVEMBER 2011', elapsed: '15 Years Ago · Age 5' },
  { year: 2010, date: 'JUNE 2010', elapsed: '16 Years Ago · Age 4' },
  { year: 2009, date: 'FEBRUARY 2009', elapsed: '17 Years Ago · Age 3' },
  { year: 2008, date: 'SEPTEMBER 2008', elapsed: '18 Years Ago · Toddler Years' },
  { year: 2007, date: 'MAY 2007', elapsed: '19 Years Ago · First Year on Earth' },
  { year: 2006, date: 'FRIDAY · OCTOBER 20, 2006', elapsed: 'Day Zero · The Arrival in Bidar' }
];

let isWarping = false;
let scrollAnimationFrame = null;

// Initialize track with year DOM elements
function initYearTrack() {
  const track = document.getElementById('timewarp-year-track');
  if (!track) return;

  track.innerHTML = '';
  YEARS_DATA.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = `year-scroll-item ${index === 0 ? 'active' : ''}`;
    el.setAttribute('data-index', index);
    el.innerHTML = `<span class="year-num">${item.year}</span>`;
    track.appendChild(el);
  });
}

// Slower, organic momentum easing curve:
// Starts with gentle roll, maintains smooth cruising, and has long luxurious braking
function timeScrollEase(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  if (t < 0.16) {
    // Gentle rolling ramp-up from standstill
    const p = t / 0.16;
    return p * p * 0.09;
  } else {
    // Smooth steady roll tapering into long, cinematic braking
    const p = (t - 0.16) / 0.84;
    return 0.09 + 0.91 * (1 - Math.pow(1 - p, 3.4));
  }
}

function startTimeWarp(onComplete) {
  if (isWarping) return;
  isWarping = true;

  const overlay = document.getElementById('timewarp-overlay');
  const track = document.getElementById('timewarp-year-track');
  const lens = document.getElementById('timewarp-lens');
  const dateEl = document.getElementById('timewarp-date');
  const elapsedEl = document.getElementById('timewarp-elapsed');
  const arrivalEl = document.getElementById('timewarp-arrival');
  const shockwaveEl = document.getElementById('timewarp-shockwave');

  if (!overlay || !track) {
    if (onComplete) onComplete();
    isWarping = false;
    return;
  }

  // Populate or reset track elements
  initYearTrack();

  const items = track.querySelectorAll('.year-scroll-item');
  const totalSteps = YEARS_DATA.length - 1; // 20 steps (2026 -> 2006)

  // Measure dynamic item height
  const itemHeight = items.length > 0 ? items[0].offsetHeight || 100 : 100;
  const maxDistance = totalSteps * itemHeight;

  // Reset visual classes
  overlay.classList.remove('exiting');
  lens && lens.classList.remove('landed');
  arrivalEl && arrivalEl.classList.remove('show');
  shockwaveEl && shockwaveEl.classList.remove('trigger');
  track.style.transform = 'translate3d(0, 0px, 0)';

  // Activate Time Warp portal
  overlay.classList.add('active');
  createTimeWarpStreaks();

  // Highlight 2026 initially
  items.forEach((it, i) => {
    it.className = `year-scroll-item ${i === 0 ? 'active' : ''}`;
  });
  if (dateEl) dateEl.textContent = YEARS_DATA[0].date;
  if (elapsedEl) elapsedEl.textContent = YEARS_DATA[0].elapsed;

  // Duration: 6.2 seconds of deliberate, majestic scrolling
  const DURATION = 6200;
  let startTime = null;
  let lastActiveIndex = 0;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    const easedProgress = timeScrollEase(progress);

    // Current scroll offset in pixels
    const currentDistance = easedProgress * maxDistance;
    track.style.transform = `translate3d(0, -${currentDistance.toFixed(2)}px, 0)`;

    // Detect which item is currently closest to the center reticle
    const activeIndex = Math.min(
      Math.max(Math.round(currentDistance / itemHeight), 0),
      totalSteps
    );

    // Update active highlight and date tape when active year changes
    if (activeIndex !== lastActiveIndex) {
      lastActiveIndex = activeIndex;

      items.forEach((it, idx) => {
        const diff = Math.abs(idx - activeIndex);
        it.classList.remove('active', 'near', 'landed');
        if (diff === 0) {
          it.classList.add('active');
        } else if (diff === 1) {
          it.classList.add('near');
        }
      });

      // Update date tape and milestone text
      if (dateEl) dateEl.textContent = YEARS_DATA[activeIndex].date;
      if (elapsedEl) elapsedEl.textContent = YEARS_DATA[activeIndex].elapsed;
    }

    if (progress < 1) {
      scrollAnimationFrame = requestAnimationFrame(step);
    } else {
      // Arrived precisely at 2006!
      onArrival();
    }
  }

  function onArrival() {
    const finalItem = items[totalSteps];
    if (finalItem) {
      finalItem.classList.remove('active', 'near');
      finalItem.classList.add('landed');
    }
    if (lens) lens.classList.add('landed');
    if (shockwaveEl) shockwaveEl.classList.add('trigger');

    if (dateEl) dateEl.textContent = YEARS_DATA[totalSteps].date;
    if (elapsedEl) elapsedEl.textContent = YEARS_DATA[totalSteps].elapsed;

    // Burst golden celestial sparkles around 2006
    createArrivalSparkles();

    // Reveal arrival destination card
    if (arrivalEl) {
      setTimeout(() => {
        arrivalEl.classList.add('show');
      }, 150);
    }

    // Hold destination in glory for 1300ms, then smoothly transition into Hero Page
    setTimeout(() => {
      overlay.classList.add('exiting');

      // Trigger callback to dismiss letter & reveal Hero page
      if (onComplete) onComplete();

      // Complete exit transition
      setTimeout(() => {
        overlay.classList.remove('active', 'exiting');
        isWarping = false;
      }, 900);
    }, 1300);
  }

  // Small atmospheric pause of 350ms before scroll begins
  setTimeout(() => {
    scrollAnimationFrame = requestAnimationFrame(step);
  }, 350);
}

// Background warp speed streaks
function createTimeWarpStreaks() {
  const container = document.getElementById('timewarp-stars');
  if (!container) return;

  container.innerHTML = '';
  const streakCount = 36;

  for (let i = 0; i < streakCount; i++) {
    const streak = document.createElement('div');
    streak.className = 'timewarp-streak';

    const angle = (Math.PI * 2 * i) / streakCount + (Math.random() - 0.5) * 0.25;
    const dist = Math.random() * 280 + 130;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const rot = (angle * 180) / Math.PI + 90;

    streak.style.setProperty('--tx', `${tx.toFixed(1)}px`);
    streak.style.setProperty('--ty', `${ty.toFixed(1)}px`);
    streak.style.setProperty('--rot', `${rot.toFixed(1)}deg`);
    streak.style.animationDelay = `${(Math.random() * 0.9).toFixed(2)}s`;
    streak.style.animationDuration = `${(Math.random() * 0.5 + 0.7).toFixed(2)}s`;

    container.appendChild(streak);
  }
}

// Celebration sparkles upon arriving in 2006
function createArrivalSparkles() {
  const stage = document.querySelector('.timewarp-stage');
  if (!stage) return;

  const count = 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'letter-sparkle-particle';

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 220 + 40;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    p.style.setProperty('--tx', `${tx.toFixed(1)}px`);
    p.style.setProperty('--ty', `${ty.toFixed(1)}px`);
    p.style.setProperty('--size', `${(Math.random() * 3.5 + 2.5).toFixed(1)}px`);
    p.style.setProperty('--color', i % 2 === 0 ? '#f8d688' : '#ffffff');
    p.style.left = '50%';
    p.style.top = '44%';
    p.style.animationDelay = `${(Math.random() * 0.2).toFixed(2)}s`;
    p.style.animationDuration = '2.0s';

    stage.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

// Pre-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initYearTrack);
} else {
  initYearTrack();
}

// Bind globally
window.startTimeWarp = startTimeWarp;
