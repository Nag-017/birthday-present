/* ==========================================================================
   BornHere — Planetary Positions & Celestial Orrery Engine (October 20, 2006)
   Exact Ephemeris Alignment for Friday, October 20, 2006
   Full Mobile Touch & Responsive Canvas Engine
   ========================================================================== */

(function () {
  'use strict';

  // Exact Astronomical Data for Friday, October 20, 2006
  const PLANETS_DATA = {
    sun: {
      name: 'Sun',
      symbol: '☉',
      sign: '26°57′ Libra',
      constellation: 'Virgo / Libra Border',
      aspect: 'Triple Conjunction with Venus & Mars',
      note: 'The vital heart of the sky. In rare triple harmony with Venus and Mars.',
      dist: '0.0 AU',
      angleDeg: 206.95,
      orbitR: 0,
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.55)',
      size: 13,
      isSun: true
    },
    mercury: {
      name: 'Mercury',
      symbol: '☿',
      sign: '21°18′ Scorpio',
      constellation: 'Libra',
      aspect: 'Exact Conjunction with Jupiter',
      note: 'Within 1° of Jupiter in Scorpio. Bestows intellectual wit and depth.',
      dist: '0.98 AU',
      angleDeg: 231.3,
      orbitR: 44,
      color: '#cbd5e1',
      glow: 'rgba(203, 213, 225, 0.4)',
      size: 4
    },
    venus: {
      name: 'Venus',
      symbol: '♀',
      sign: '25°05′ Libra',
      constellation: 'Virgo',
      aspect: 'Tight Conjunction with Sun (1.8°)',
      note: 'Ruler of Libra in domicile beauty. Harmonious, aesthetic, and radiant.',
      dist: '1.71 AU',
      angleDeg: 205.1,
      orbitR: 72,
      color: '#f8d688',
      glow: 'rgba(248, 214, 136, 0.6)',
      size: 6.5,
      isStellium: true
    },
    earth: {
      name: 'Earth',
      symbol: '♁',
      sign: 'Third Planet from the Sun',
      constellation: 'Day Zero',
      aspect: 'The Moment of Arrival',
      note: 'The blue home where you arrived, facing the evening Libra stellium.',
      dist: '1.00 AU',
      angleDeg: 26.95,
      orbitR: 104,
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.55)',
      size: 6.5,
      isEarth: true
    },
    mars: {
      name: 'Mars',
      symbol: '♂',
      sign: '27°51′ Libra',
      constellation: 'Virgo',
      aspect: 'Direct Solar Conjunction (0.9° from Sun)',
      note: 'Passing directly behind the Sun. Passion, inner vitality, and bold warmth.',
      dist: '2.57 AU',
      angleDeg: 207.85,
      orbitR: 136,
      color: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.5)',
      size: 5,
      isStellium: true
    },
    jupiter: {
      name: 'Jupiter',
      symbol: '♃',
      sign: '22°25′ Scorpio',
      constellation: 'Libra',
      aspect: 'Conjunction with Mercury in Scorpio',
      note: 'The Great Benefic. Generosity, philosophical vision, and joyful spirit.',
      dist: '6.26 AU',
      angleDeg: 232.4,
      orbitR: 172,
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.45)',
      size: 9
    },
    saturn: {
      name: 'Saturn',
      symbol: '♄',
      sign: '23°08′ Leo',
      constellation: 'Leo',
      aspect: 'High Crown near Regulus in Leo',
      note: 'The Ringed Jewel. Dignified endurance, timeless grace, and quiet strength.',
      dist: '9.47 AU',
      angleDeg: 143.1,
      orbitR: 208,
      color: '#fef08a',
      glow: 'rgba(254, 240, 138, 0.45)',
      size: 7.5,
      hasRing: true
    },
    outer: {
      name: 'Uranus & Neptune',
      symbol: '♅ ♆',
      sign: '11° Pisces & 17° Aquarius',
      constellation: 'Aquarius & Capricornus',
      aspect: 'Outer Cosmic Visionaries',
      note: 'Uranus in Pisces brings original creativity; Neptune in Aquarius weaves musical poetry.',
      dist: '19.9 – 29.7 AU',
      angleDeg: 329.0,
      orbitR: 242,
      color: '#67e8f9',
      glow: 'rgba(103, 232, 249, 0.4)',
      size: 5.5
    }
  };

  let canvas, ctx;
  let activePlanetKey = null;
  let hoveredPlanetKey = null;
  let pulseAngle = 0;
  let tooltipElem = null;

  function initOrrery() {
    canvas = document.getElementById('planetary-orrery-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    tooltipElem = document.getElementById('orrery-tooltip');

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Listeners (Desktop)
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    // Touch Listeners (Mobile Phones & Tablets)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    render();
  }

  function handleResize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width || 680;

    // Taller aspect ratio on mobile so circular orbits never clip vertically
    const isMobile = width < 520;
    const height = isMobile
      ? Math.min(Math.max(width * 0.92, 320), 440)
      : Math.min(Math.max(width * 0.68, 380), 480);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const cx = w / 2;
    const cy = h / 2;

    // Strict maximum radius fitting: outer orbit (242) + halo & padding (28) = 270
    const maxExtent = 270;
    const scale = Math.min((w / 2 - 16) / maxExtent, (h / 2 - 18) / maxExtent);

    ctx.clearRect(0, 0, w, h);

    // Deep cosmic background
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) / 1.5);
    bgGrad.addColorStop(0, '#0e1a33');
    bgGrad.addColorStop(0.55, '#070e1e');
    bgGrad.addColorStop(1, '#040712');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    pulseAngle += 0.035;

    drawHeliocentricOrrery(cx, cy, scale, w);

    requestAnimationFrame(render);
  }

  // --------------------------------------------------------------------------
  // HELIOCENTRIC ORBITAL ORRERY DRAWING
  // --------------------------------------------------------------------------
  function drawHeliocentricOrrery(cx, cy, scale, w) {
    const isMobile = w < 440;

    // 1. Draw concentric orbits
    const keys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'outer'];
    keys.forEach(k => {
      const p = PLANETS_DATA[k];
      const r = p.orbitR * scale;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      if (k === activePlanetKey) {
        ctx.strokeStyle = 'rgba(229, 184, 92, 0.85)';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 4]);
      } else if (p.isStellium) {
        ctx.strokeStyle = 'rgba(229, 184, 92, 0.32)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 5]);
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.13)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 2. Highlight Stellium Alignment Sector (Sun, Venus, Mars pointing beam)
    const stelliumRad = (207 * Math.PI) / 180;
    const beamRadius = 255 * scale;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, beamRadius, stelliumRad - 0.12, stelliumRad + 0.12);
    ctx.closePath();
    const stelliumGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, beamRadius);
    stelliumGrad.addColorStop(0, 'rgba(229, 184, 92, 0.22)');
    stelliumGrad.addColorStop(0.7, 'rgba(229, 184, 92, 0.05)');
    stelliumGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = stelliumGrad;
    ctx.fill();
    ctx.restore();

    // Alignment Ray towards Libra
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(stelliumRad) * (beamRadius + 5), cy + Math.sin(stelliumRad) * (beamRadius + 5));
    ctx.strokeStyle = 'rgba(229, 184, 92, 0.45)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.restore();

    // 3. Central Sun
    drawSun(cx, cy, scale);

    // 4. Planets at their October 20, 2006 positions
    keys.forEach(k => {
      drawPlanetBody(cx, cy, k, scale, isMobile);
    });

    // 5. Stellium Label - safely clamped for small screens
    const rawLabelX = cx + Math.cos(stelliumRad) * (beamRadius - 6);
    const labelY = cy + Math.sin(stelliumRad) * (beamRadius - 6);
    ctx.font = isMobile ? '500 8.5px "JetBrains Mono", monospace' : '500 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#e5b85c';
    if (isMobile) {
      ctx.textAlign = 'left';
      ctx.fillText('LIBRA STELLIUM (207°)', 10, labelY + 2);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText('LIBRA STELLIUM (207°)', rawLabelX - 8, labelY + 3);
    }
  }

  function drawSun(cx, cy, scale) {
    const sunData = PLANETS_DATA.sun;
    const r = Math.max(sunData.size * scale, 9);
    const isFocused = activePlanetKey === 'sun' || hoveredPlanetKey === 'sun';

    // Solar Corona Pulse
    const pulse = Math.sin(pulseAngle) * 3;
    const coronaGrad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, (r + 14 + pulse) * (isFocused ? 1.5 : 1));
    coronaGrad.addColorStop(0, 'rgba(251, 191, 36, 0.85)');
    coronaGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.35)');
    coronaGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');

    ctx.beginPath();
    ctx.arc(cx, cy, (r + 16 + pulse) * (isFocused ? 1.4 : 1), 0, Math.PI * 2);
    ctx.fillStyle = coronaGrad;
    ctx.fill();

    // Sun Sphere
    const sunGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 1, cx, cy, r);
    sunGrad.addColorStop(0, '#fffbeb');
    sunGrad.addColorStop(0.4, '#fde68a');
    sunGrad.addColorStop(0.85, '#f59e0b');
    sunGrad.addColorStop(1, '#b45309');

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Symbol & Name
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.fillText('☉ SUN', cx, cy + r + 12);
  }

  function drawPlanetBody(cx, cy, key, scale, isMobile) {
    const p = PLANETS_DATA[key];
    const rad = (p.angleDeg * Math.PI) / 180;
    const dist = p.orbitR * scale;
    const px = cx + Math.cos(rad) * dist;
    const py = cy + Math.sin(rad) * dist;

    // Cache computed position for hit testing
    p._lastX = px;
    p._lastY = py;

    const isFocused = activePlanetKey === key || hoveredPlanetKey === key;
    const baseRadius = Math.max(p.size * scale, 3.5);
    const radius = baseRadius * (isFocused ? 1.35 : 1);

    // Focused Ring / Ripple
    if (isFocused) {
      const ringPulse = (Math.sin(pulseAngle * 1.5) + 1) * 3;
      ctx.beginPath();
      ctx.arc(px, py, radius + 7 + ringPulse, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    // Planetary Glow
    ctx.beginPath();
    ctx.arc(px, py, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = p.glow;
    ctx.fill();

    // Planet Sphere
    const sphereGrad = ctx.createRadialGradient(px - radius * 0.35, py - radius * 0.35, 1, px, py, radius);
    sphereGrad.addColorStop(0, '#ffffff');
    sphereGrad.addColorStop(0.3, p.color);
    sphereGrad.addColorStop(1, '#050c18');

    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    // Saturn Ring
    if (p.hasRing) {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(-0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 2.2, radius * 0.7, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
      ctx.lineWidth = Math.max(1.8 * scale, 1.2);
      ctx.stroke();
      ctx.restore();
    }

    // Earth's Moon representation
    if (p.isEarth) {
      const moonAngle = rad + 0.9;
      const moonDist = Math.max(13 * scale, 8);
      const mx = px + Math.cos(moonAngle) * moonDist;
      const my = py + Math.sin(moonAngle) * moonDist;
      ctx.beginPath();
      ctx.arc(mx, my, Math.max(2.2 * scale, 1.5), 0, Math.PI * 2);
      ctx.fillStyle = '#e2e8f0';
      ctx.shadowColor = '#cbd5e1';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Text Label (Responsive font size)
    const fontSize = isMobile
      ? (isFocused ? '9.5px' : '8px')
      : (isFocused ? '11px' : '9px');
    ctx.font = `${isFocused ? '600' : '400'} ${fontSize} "JetBrains Mono", monospace`;
    ctx.fillStyle = isFocused ? '#e5b85c' : '#94a3b8';
    ctx.textAlign = 'center';
    const labelY = py + (py > cy ? radius + 11 : -(radius + 6));
    ctx.fillText(`${p.symbol} ${p.name}`, px, labelY);
  }

  // --------------------------------------------------------------------------
  // INTERACTIVITY, TOUCH & TOOLTIP HANDLERS
  // --------------------------------------------------------------------------
  function findPlanetNear(mx, my, isTouch) {
    const hitThreshold = isTouch ? 30 : 22; // Generous hit radius for mobile taps

    for (const key in PLANETS_DATA) {
      const p = PLANETS_DATA[key];
      if (typeof p._lastX === 'number' && typeof p._lastY === 'number') {
        const dx = mx - p._lastX;
        const dy = my - p._lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= hitThreshold) {
          return key;
        }
      }
    }
    // Check Sun center
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const dx = mx - w / 2;
      const dy = my - h / 2;
      if (Math.sqrt(dx * dx + dy * dy) <= hitThreshold) {
        return 'sun';
      }
    }
    return null;
  }

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const found = findPlanetNear(mx, my, false);
    if (found !== hoveredPlanetKey) {
      hoveredPlanetKey = found;
      canvas.style.cursor = found ? 'pointer' : 'default';
      updateTooltip(found, mx, my);
    } else if (found && tooltipElem) {
      positionTooltip(mx, my);
    }
  }

  function handleMouseLeave() {
    hoveredPlanetKey = null;
    canvas.style.cursor = 'default';
    if (tooltipElem) {
      tooltipElem.classList.remove('show');
    }
  }

  function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const found = findPlanetNear(mx, my, false);
    if (found) {
      window.highlightPlanet(found);
    }
  }

  // Mobile Touch Support
  function handleTouchStart(e) {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;

    const found = findPlanetNear(tx, ty, true);
    if (found) {
      window.highlightPlanet(found);
    } else {
      // Tap outside clears tooltip
      if (tooltipElem) {
        tooltipElem.classList.remove('show');
      }
    }
  }

  function handleTouchMove(e) {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;

    const found = findPlanetNear(tx, ty, true);
    if (found) {
      window.highlightPlanet(found);
    }
  }

  function handleTouchEnd() {
    // Keep active planet highlighted on tap
  }

  function updateTooltip(key, mx, my) {
    if (!tooltipElem) return;
    if (!key) {
      tooltipElem.classList.remove('show');
      return;
    }

    const p = PLANETS_DATA[key];
    tooltipElem.innerHTML = `
      <div style="font-weight: 600; color: #e5b85c; margin-bottom: 2px; font-size: 11px;">${p.symbol} ${p.name.toUpperCase()}</div>
      <div style="color: #f8fafc; font-size: 11px; font-weight: 500;">${p.sign}</div>
      <div style="color: #94a3b8; font-size: 10px; margin-top: 2px;">Constellation: ${p.constellation}</div>
      <div style="color: #cbd5e1; font-size: 10px; margin-top: 3px; font-style: italic;">${p.aspect}</div>
    `;
    positionTooltip(mx, my);
    tooltipElem.classList.add('show');
  }

  function positionTooltip(mx, my) {
    if (!tooltipElem || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tipWidth = tooltipElem.offsetWidth || 180;
    const tipHeight = tooltipElem.offsetHeight || 65;

    // Horizontal clamp inside canvas
    let x = mx;
    const minX = tipWidth / 2 + 10;
    const maxX = rect.width - tipWidth / 2 - 10;
    x = Math.max(minX, Math.min(x, maxX));

    // Vertical clamp (flip below if too close to top)
    let y = my - 24;
    if (y < tipHeight + 10) {
      y = my + tipHeight + 18;
    }

    tooltipElem.style.left = `${x}px`;
    tooltipElem.style.top = `${y}px`;
  }

  // --------------------------------------------------------------------------
  // GLOBAL PUBLIC CONTROLS
  // --------------------------------------------------------------------------
  window.highlightPlanet = function (key) {
    activePlanetKey = key;

    // Update tooltip
    if (PLANETS_DATA[key]) {
      const p = PLANETS_DATA[key];
      if (typeof p._lastX === 'number' && typeof p._lastY === 'number') {
        updateTooltip(key, p._lastX, p._lastY);
      }
    }
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrrery);
  } else {
    initOrrery();
  }
})();
