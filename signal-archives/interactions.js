/* Extracted interaction module for /signal-archives/index.html. */

// ── STAR FIELD ──
const canvas = document.getElementById('star-field');
const ctx = canvas.getContext('2d');
let W, H, stars = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function init() {
  stars = [];
  const n = Math.floor((W * H) / 12000);
  for (let i = 0; i < n; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.15,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      op: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;
    s.pulse += 0.006;
    if (s.x < 0) s.x = W;
    if (s.x > W) s.x = 0;
    if (s.y < 0) s.y = H;
    if (s.y > H) s.y = 0;
    const op = s.op * (0.7 + 0.3 * Math.sin(s.pulse));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,210,240,${op})`;
    ctx.fill();
  });

  // Connections
  for (let i = 0; i < stars.length; i++) {
    for (let j = i+1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(0,212,200,${(1-d/110)*0.08})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); init(); });
resize(); init(); draw();
