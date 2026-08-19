/* Extracted interaction module for /academy/arm-framework/index.html. */

// ── CURSOR ──
const ring = document.getElementById('cursorRing');
const dot  = document.getElementById('cursorDot');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx+'px'; dot.style.top = my+'px';
});
(function loop(){
  rx += (mx-rx)*.12; ry += (my-ry)*.12;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(loop);
})();

// expand ring on cards
document.querySelectorAll('.module, .path-card, .test-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width='48px'; ring.style.height='48px'; });
  el.addEventListener('mouseleave', () => { ring.style.width='32px'; ring.style.height='32px'; });
});

// ── SCROLL BAR ──
window.addEventListener('scroll', () => {
  const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollBar').style.width = p + '%';
});

// ── STAR CANVAS ──
const canvas = document.getElementById('star-canvas');
const ctx    = canvas.getContext('2d');
let W, H, stars = [];

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

function init() {
  resize(); stars = [];
  const n = Math.floor((W * H) / 13000);
  for (let i = 0; i < n; i++) {
    stars.push({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.2+.2,
      vx: (Math.random()-.5)*.1, vy: (Math.random()-.5)*.1,
      a: Math.random(), s: Math.random()*.003+.001
    });
  }
}

function draw() {
  ctx.clearRect(0,0,W,H);
  // stars
  stars.forEach(s => {
    s.x += s.vx; s.y += s.vy; s.a += s.s;
    if (s.a > 1 || s.a < 0) s.s *= -1;
    if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
    if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(220,227,240,${s.a*.55})`;
    ctx.fill();
  });
  // connections
  for (let i = 0; i < stars.length; i++) {
    for (let j = i+1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(0,212,200,${(1-d/130)*.12})`;
        ctx.lineWidth = .4;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init(); draw();
