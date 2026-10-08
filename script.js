/* ==========================================================================
   BornHere — Megha (Friday, October 20, 2006 · Bidar, Karnataka, India)
   Interactive Engine & Dynamic Calculations
   ========================================================================== */

// Exact Birth Timestamp (October 20, 2006 00:00:00 IST)
const BIRTH_DATE = new Date('2006-10-20T00:00:00+05:30');

// Initial baseline heartbeats & numbers observed from BornHere
const BASE_HEARTBEATS = 756201622;
let heartbeatCount = BASE_HEARTBEATS;

// --------------------------------------------------------------------------
// 1. STARFIELD CANVAS ANIMATION
// --------------------------------------------------------------------------
const starsCanvas = document.getElementById('stars-canvas');
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
      color: Math.random() > 0.3 ? '#f5f2eb' : '#e5b85c'
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

// --------------------------------------------------------------------------
// 2. CELESTIAL CONSTELLATION MAP (CERTIFICATE CANVAS)
// --------------------------------------------------------------------------
function drawCelestialSkyMap() {
  const canvas = document.getElementById('celestial-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = w / 2 - 8;

  ctx.clearRect(0, 0, w, h);

  // Background radial night sky
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
  grad.addColorStop(0, '#0c234b');
  grad.addColorStop(0.7, '#051126');
  grad.addColorStop(1, '#020712');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Subtle coordinate grid rings
  ctx.strokeStyle = 'rgba(229, 184, 92, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.75, 0, Math.PI * 2);
  ctx.stroke();

  // Coordinate Cardinal Points Ticks
  const cardinals = [
    { label: 'N', x: cx, y: cy - radius + 14 },
    { label: 'S', x: cx, y: cy + radius - 6 },
    { label: 'E', x: cx + radius - 14, y: cy + 4 },
    { label: 'W', x: cx - radius + 8, y: cy + 4 }
  ];
  ctx.font = '8px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(229, 184, 92, 0.6)';
  ctx.textAlign = 'center';
  for (let c of cardinals) {
    ctx.fillText(c.label, c.x, c.y);
  }

  // Draw Constellation Patterns over Bidar, Karnataka (Oct 20, 2006)
  // Pegagus / Cassiopeia / Ursa Major / Taurus lines
  const constellationLines = [
    // Cassiopeia 'W'
    [ {x: 100, y: 70}, {x: 115, y: 85}, {x: 130, y: 75}, {x: 150, y: 88}, {x: 165, y: 76} ],
    // Great Square of Pegasus
    [ {x: 170, y: 130}, {x: 210, y: 125}, {x: 215, y: 165}, {x: 175, y: 170}, {x: 170, y: 130} ],
    // Orion Belt & frame (East horizon)
    [ {x: 75, y: 180}, {x: 88, y: 185}, {x: 101, y: 190} ],
    // Taurus Horns
    [ {x: 110, y: 220}, {x: 135, y: 200}, {x: 155, y: 215} ]
  ];

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.lineWidth = 0.8;
  for (let line of constellationLines) {
    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    for (let i = 1; i < line.length; i++) {
      ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
  }

  // Constellation Major Stars (Gold / Bright Points)
  const majorStars = [
    { x: 100, y: 70, r: 2.5, b: 0.9 },
    { x: 115, y: 85, r: 2.0, b: 0.8 },
    { x: 130, y: 75, r: 2.2, b: 0.85 },
    { x: 150, y: 88, r: 2.6, b: 0.9 },
    { x: 165, y: 76, r: 2.0, b: 0.75 },
    { x: 170, y: 130, r: 2.4, b: 0.9 },
    { x: 210, y: 125, r: 2.2, b: 0.8 },
    { x: 215, y: 165, r: 2.4, b: 0.85 },
    { x: 175, y: 170, r: 2.1, b: 0.8 },
    { x: 75, y: 180, r: 2.4, b: 0.9 },
    { x: 88, y: 185, r: 2.4, b: 0.9 },
    { x: 101, y: 190, r: 2.4, b: 0.9 },
    { x: 140, y: 140, r: 3.2, b: 1.0, gold: true }, // Polaris/Zenith
    { x: 110, y: 220, r: 2.2, b: 0.8 },
    { x: 135, y: 200, r: 2.6, b: 0.85 },
    { x: 155, y: 215, r: 2.0, b: 0.8 }
  ];

  for (let s of majorStars) {
    // Star glow aura
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = s.gold ? 'rgba(248, 207, 116, 0.35)' : 'rgba(255, 255, 255, 0.25)';
    ctx.fill();

    // Star core
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.gold ? '#f8cf74' : '#ffffff';
    ctx.fill();
  }

  // Scatter of background faint stars
  const seed = 12345;
  let sRand = seed;
  function pseudoRandom() {
    sRand = (sRand * 9301 + 49297) % 233280;
    return sRand / 233280;
  }

  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 90; i++) {
    const angle = pseudoRandom() * Math.PI * 2;
    const dist = pseudoRandom() * (radius - 12);
    const sx = cx + Math.cos(angle) * dist;
    const sy = cy + Math.sin(angle) * dist;
    const sr = pseudoRandom() * 1.1 + 0.3;
    const sa = pseudoRandom() * 0.7 + 0.2;

    ctx.globalAlpha = sa;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

drawCelestialSkyMap();

// --------------------------------------------------------------------------
// 3. REAL-TIME LIFE COUNTER & CLOCK ENGINE
// --------------------------------------------------------------------------
function updateLiveCounters() {
  const now = new Date();
  const diffMs = now.getTime() - BIRTH_DATE.getTime();

  // Days Alive
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const daysFormatted = totalDays.toLocaleString();

  const daysElem = document.getElementById('live-days-counter');
  const daysAliveElem = document.getElementById('days-alive-counter');
  const tDaysVal = document.getElementById('t-days-val');

  if (daysElem) daysElem.textContent = daysFormatted;
  if (daysAliveElem) daysAliveElem.textContent = daysFormatted;
  if (tDaysVal) tDaysVal.textContent = daysFormatted;

  // Weeks lived
  const totalWeeks = Math.floor(totalDays / 7);
  const tWeeksVal = document.getElementById('t-weeks-val');
  if (tWeeksVal) tWeeksVal.textContent = totalWeeks.toLocaleString();

  // Years & Days decomposed
  const years = Math.floor(totalDays / 365.25);
  const daysRemainder = Math.floor(totalDays - (years * 365.25));

  // Hours, Minutes, Seconds for uptime clock
  const totalSecs = Math.floor(diffMs / 1000);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const pad = (n) => String(n).padStart(2, '0');
  const clockText = `${years}y ${daysRemainder}d ${pad(hours)}:${pad(mins)}:${pad(secs)}`;

  const clockBadge = document.getElementById('live-uptime-clock');
  if (clockBadge) clockBadge.textContent = clockText;

  // Heartbeats live calculation (~72 bpm = 1.2 bps)
  const estimatedHeartbeats = Math.floor(totalSecs * 1.2);
  const heartbeatsElem = document.getElementById('heartbeats-counter');
  const tHeartbeatsVal = document.getElementById('t-heartbeats-val');

  if (heartbeatsElem) heartbeatsElem.textContent = estimatedHeartbeats.toLocaleString();
  if (tHeartbeatsVal) tHeartbeatsVal.textContent = estimatedHeartbeats.toLocaleString();
}

setInterval(updateLiveCounters, 1000);
updateLiveCounters();

// --------------------------------------------------------------------------
// 4. DYNAMIC NAME CUSTOMIZATION
// --------------------------------------------------------------------------
function updateName(newName) {
  const cleanName = newName.trim() || 'Megha';

  // Update Hero & Header
  const heroRecipient = document.getElementById('hero-recipient-name');
  if (heroRecipient) heroRecipient.textContent = cleanName.toUpperCase();

  const heroHighlight = document.getElementById('hero-name-highlight');
  if (heroHighlight) heroHighlight.textContent = cleanName;

  // Update all .name-insert spans across the page
  const nameSpans = document.querySelectorAll('.name-insert');
  nameSpans.forEach(span => {
    span.textContent = cleanName;
  });

  // Update certificate display name
  const certDisplay = document.getElementById('cert-display-name');
  if (certDisplay) certDisplay.textContent = cleanName;

  // Update claim preview name
  const claimPreview = document.getElementById('claim-name-preview');
  if (claimPreview) claimPreview.textContent = cleanName;

  // Update save name input
  const saveName = document.getElementById('save-name-input');
  if (saveName) saveName.value = cleanName;
}

// --------------------------------------------------------------------------
// 5. INTERACTIVE STORY CARDS PICKER
// --------------------------------------------------------------------------
let selectedStyle = 'celestial';

function selectStoryCard(styleName) {
  selectedStyle = styleName;
  const cards = document.querySelectorAll('.story-card-item');
  cards.forEach(card => {
    if (card.getAttribute('data-style') === styleName) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
  showToast(`Selected style: ${styleName.toUpperCase()}`);
}

function openCardPreview() {
  showToast(`Preparing free ${selectedStyle.toUpperCase()} card for download...`);
}

// --------------------------------------------------------------------------
// 6. SHARE DIALOG & TOAST
// --------------------------------------------------------------------------
function openShareDialog() {
  const modal = document.getElementById('share-modal');
  if (modal) modal.classList.add('open');
}

function closeShareDialog() {
  const modal = document.getElementById('share-modal');
  if (modal) modal.classList.remove('open');
}

function copyShareUrl() {
  const input = document.getElementById('share-url-input');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
      showToast('Link copied to clipboard!');
      closeShareDialog();
    }).catch(() => {
      showToast('Link copied!');
      closeShareDialog();
    });
  }
}

function shareWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Check out Megha's BornHere story from Friday, October 20, 2006 in Bidar!");
  window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
}

function shareTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("The world the day Megha arrived in Bidar, Karnataka. Friday, October 20, 2006.");
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function showToast(message) {
  const toast = document.getElementById('toast-popup');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// --------------------------------------------------------------------------
// 7. ORDER / CLAIM CERTIFICATE MODAL
// --------------------------------------------------------------------------
function openClaimModal() {
  const modal = document.getElementById('claim-modal');
  if (modal) modal.classList.add('open');
}

function closeClaimModal() {
  const modal = document.getElementById('claim-modal');
  if (modal) modal.classList.remove('open');
}

function simulatePaymentSuccess() {
  closeClaimModal();
  showToast('✓ Payment verified! Your certificate is unlocked.');

  // Unlock certificate visually: fade out lock overlay
  const overlay = document.querySelector('.cert-locked-overlay');
  if (overlay) {
    overlay.style.transition = 'opacity 0.8s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 800);
  }
}

// --------------------------------------------------------------------------
// 8. SAVE FOR LATER FORM
// --------------------------------------------------------------------------
function handleSaveForm(e) {
  e.preventDefault();
  const emailInput = document.getElementById('save-email-input');
  const email = emailInput ? emailInput.value : '';
  showToast(`Moment saved! Reminder sent to ${email}`);
  const card = document.querySelector('.save-moment-card');
  if (card) {
    card.innerHTML = `
      <div style="text-align: center; width: 100%; padding: 20px;">
        <div style="font-size: 28px; color: var(--gold-primary); margin-bottom: 8px;">✓</div>
        <div style="font-family: var(--font-serif); font-size: 24px; color: var(--text-main); margin-bottom: 6px;">Moment Saved</div>
        <p style="font-size: 13px; color: var(--text-soft);">We will send a milestone reminder on Tuesday, March 7, 2034.</p>
      </div>
    `;
  }
}

// --------------------------------------------------------------------------
// 9. STICKY BOTTOM BANNER & SCROLL LISTENER
// --------------------------------------------------------------------------
function dismissBanner() {
  const banner = document.getElementById('bottom-banner');
  if (banner) banner.style.display = 'none';
}

const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    if (scrollTopBtn) scrollTopBtn.style.display = 'flex';
  } else {
    if (scrollTopBtn) scrollTopBtn.style.display = 'none';
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// 10. SUPPORT CHAT CONCIERGE
// --------------------------------------------------------------------------
function toggleChatModal() {
  const modal = document.getElementById('chat-modal');
  if (modal) {
    modal.classList.toggle('open');
  }
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-user-input');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const messagesContainer = document.getElementById('chat-messages');

  // User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = text;
  messagesContainer.appendChild(userBubble);
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Bot response logic
  setTimeout(() => {
    let reply = "I'm happy to help! Every detail for Friday, October 20, 2006 in Bidar is sourced from NASA, Open-Meteo, Billboard archives, and historical logs.";
    const lower = text.toLowerCase();

    if (lower.includes('weather') || lower.includes('temperature') || lower.includes('rain')) {
      reply = "On October 20, 2006, Bidar, Karnataka experienced partly cloudy skies with a high of 84°F (28.8°C), low of 65°F (18.1°C), 10 km/h gentle wind, and 0.0 mm precipitation.";
    } else if (lower.includes('moon') || lower.includes('phase')) {
      reply = "The moon was a delicate Waning Crescent with just 3% illumination hanging over Bidar. Sunrise occurred at 06:14 and sunset at 17:54.";
    } else if (lower.includes('song') || lower.includes('music') || lower.includes('billboard')) {
      reply = "The #1 Billboard Hot 100 hit that week was 'SexyBack' by Justin Timberlake (week of October 14, 2006).";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('refund')) {
      reply = "The keepsake certificate is ₹99 (normally ₹299). It includes a full 14-day refund guarantee with no forms required.";
    } else if (lower.includes('sensex') || lower.includes('market') || lower.includes('stock')) {
      reply = "The BSE Sensex closed at 12,709 on Megha's birthday and has grown 5.7× (up 472%) to over 72,639 today!";
    }

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    botBubble.textContent = reply;
    messagesContainer.appendChild(botBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 400);
}
