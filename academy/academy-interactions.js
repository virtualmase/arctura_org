/* Extracted interaction module for /academy/index.html. */

// CURSOR
const ring = document.getElementById('cursorRing');
const dot  = document.getElementById('cursorDot');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();

// Cursor glow on cards
document.querySelectorAll('.course-card').forEach(card=>{
  card.addEventListener('mouseenter',()=>{
    const accent=getComputedStyle(card).getPropertyValue('--card-accent').trim()||'var(--signal)';
    ring.style.borderColor='var(--gold)';
    ring.style.width='48px'; ring.style.height='48px';
  });
  card.addEventListener('mouseleave',()=>{
    ring.style.borderColor='var(--signal)';
    ring.style.width='32px'; ring.style.height='32px';
  });
});

// SCROLL BAR
window.addEventListener('scroll',()=>{
  const p=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
  document.getElementById('scrollBar').style.width=p+'%';
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
  });
},{threshold:.12});
reveals.forEach(el=>obs.observe(el));

// STAR CANVAS
const canvas=document.getElementById('star-canvas');
const ctx=canvas.getContext('2d');
let W,H,stars=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
function init(){resize();stars=[];for(let i=0;i<180;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,a:Math.random(),s:Math.random()*.003+.001});}
function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{s.a+=s.s;if(s.a>1||s.a<0)s.s*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(220,227,240,${s.a*.55})`;ctx.fill();});}
function tick(){draw();requestAnimationFrame(tick);}
window.addEventListener('resize',init);
init();tick();
