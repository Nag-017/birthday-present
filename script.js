/* ==========================================================================
   BornHere — Megha (Friday, October 20, 2006 · Bidar, Karnataka, India)
   Interactive Engine & Dynamic Calculations
   ========================================================================== */

// Exact Birth Timestamp (October 20, 2006 00:00:00 IST)
const BIRTH_DATE = new Date('2006-10-20T00:00:00+05:30');

// Initial baseline heartbeats & numbers observed from BornHere
const BASE_HEARTBEATS = 756201622;
let heartbeatCount = BASE_HEARTBEATS;

// Note: Starfield Canvas Animation moved to starfield-animation.js


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
// 5. SOUNDTRACK CATEGORY FILTER
// --------------------------------------------------------------------------
function filterMusic(category) {
  const buttons = document.querySelectorAll('.music-filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.music-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const isFeatured = card.getAttribute('data-featured') === 'true';

    if (category === 'all') {
      // In Top / All mode, show only the 3 top featured songs (1 Global, 1 Hindi, 1 Kannada)
      if (isFeatured) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    } else {
      // In specific category mode, show all 3 songs of that category
      if (cardCat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });
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
// 7. DIRECT CERTIFICATE ACTIONS (DOWNLOAD & 1-PAGE PRINT)
// --------------------------------------------------------------------------

function drawCanvasRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function downloadCertificate() {
  const nameInput = document.getElementById('certificate-name-input');
  const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Megha';
  const claimBtn = document.getElementById('claim-cert-btn');
  const certElement = document.getElementById('printable-certificate');

  if (!certElement) return;

  if (claimBtn) {
    claimBtn.innerHTML = '<span class="btn-icon">⏳</span> Capturing Certificate...';
    claimBtn.style.pointerEvents = 'none';
  }

  try {
    // Redraw celestial sky map to ensure canvas buffer is fresh
    if (typeof drawCelestialSkyMap === 'function') {
      drawCelestialSkyMap();
    }

    // Wait for web fonts to be completely ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    let canvas;
    if (typeof html2canvas === 'function') {
      canvas = await html2canvas(certElement, {
        scale: 3, // Ultra-sharp 3x retina capture of the exact certificate shown
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#faf7ee',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCert = clonedDoc.getElementById('printable-certificate');
          if (clonedCert) {
            clonedCert.style.width = '480px';
            clonedCert.style.maxWidth = '480px';
            clonedCert.style.boxShadow = 'none';
            clonedCert.style.transform = 'none';
            clonedCert.style.margin = '0 auto';
          }
        }
      });
    } else {
      throw new Error('html2canvas library unavailable');
    }

    const fileName = `${name.replace(/\s+/g, '_')}_Keepsake_Certificate.png`;

    canvas.toBlob((blob) => {
      let downloadUrl;
      if (blob) {
        downloadUrl = URL.createObjectURL(blob);
      } else {
        downloadUrl = canvas.toDataURL('image/png');
      }

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if (blob) {
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 3000);
      }

      if (claimBtn) {
        claimBtn.innerHTML = '<span class="btn-icon">✓</span> Certificate Downloaded!';
        claimBtn.style.pointerEvents = '';
        setTimeout(() => {
          claimBtn.innerHTML = `<span class="btn-icon">↓</span> Download <span class="name-insert">${name}</span>’s Certificate`;
        }, 3000);
      }
    }, 'image/png', 1.0);

  } catch (err) {
    console.error('Error generating certificate image:', err);
    if (claimBtn) {
      claimBtn.innerHTML = '<span class="btn-icon">⚠️</span> Error downloading';
      claimBtn.style.pointerEvents = '';
      setTimeout(() => {
        claimBtn.innerHTML = `<span class="btn-icon">↓</span> Download <span class="name-insert">${name}</span>’s Certificate`;
      }, 2500);
    }
  }
}

function printCertificate() {
  window.print();
}

function openCertificateModal() {
  // Directly trigger certificate download without opening any modal
  downloadCertificate();
}

function closeCertificateModal() {
  // No-op (modal eliminated)
}

function scrollToCertificate() {
  const cert = document.getElementById('certificate-section');
  if (cert) cert.scrollIntoView({ behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// 9. SCROLL TO TOP LISTENER
// --------------------------------------------------------------------------

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
// 10. SECRET MOON WHISPER INTERACTION
// --------------------------------------------------------------------------
const moonShowcaseEl = document.querySelector('.moon-showcase');
if (moonShowcaseEl) {
  moonShowcaseEl.addEventListener('click', () => {
    moonShowcaseEl.classList.toggle('revealed');
  });
}// Note: Birthday Letter & Envelope Intro Animation moved to envelope-animation.js



