// Typewriter effect for hero terminal
const lines = [
  'whoami',
  '> Engineer. Builder. Explorer.'
];
const typewriter = document.getElementById('typewriter');
const cursor = document.getElementById('terminal-cursor');
let lineIdx = 0, charIdx = 0;
let typing = true;

function typeLine() {
  if (lineIdx < lines.length) {
    if (charIdx < lines[lineIdx].length) {
      typewriter.innerHTML += lines[lineIdx][charIdx++];
      setTimeout(typeLine, 60);
    } else {
      typewriter.innerHTML += '<br>';
      lineIdx++;
      charIdx = 0;
      setTimeout(typeLine, 500);
    }
  } else {
    typing = false;
    cursor.style.display = 'none';
    document.getElementById('scroll-down').classList.add('pulse');
    // Auto-scroll after 2.5 seconds if user hasn't scrolled or clicked
    setTimeout(() => {
      if (window.scrollY < 50) {
        document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }
}
typeLine();

document.getElementById('scroll-down').addEventListener('click', () => {
  document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('hero').addEventListener('click', () => {
  if (!typing) {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
  }
});

// Typewriter effect for about paragraph
let aboutTypewriterStarted = false;
function typeAboutParagraph() {
  const aboutEl = document.getElementById('about-typewriter');
  const text = 'When I’m not working, you’ll find me traveling, scuba diving, off-roading, or learning something new. Travel keeps me curious and connected.';
  let idx = 0;
  aboutEl.textContent = '';
  function typeChar() {
    if (idx < text.length) {
      aboutEl.textContent += text[idx++];
      setTimeout(typeChar, 32);
    }
  }
  typeChar();
}

// Fade-in on scroll
function revealOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
      // Trigger about typewriter when about section is visible
      if (!aboutTypewriterStarted && el.id === 'about') {
        aboutTypewriterStarted = true;
        typeAboutParagraph();
      }
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Matrix rain background
function startMatrixRain() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  const fontSize = 18;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  function draw() {
    ctx.fillStyle = 'rgba(240,245,255,0.13)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px Fira Mono, monospace';
    ctx.fillStyle = 'rgba(120,140,180,0.45)';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (Math.random() > 0.975 || drops[i] * fontSize > height) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}
window.addEventListener('DOMContentLoaded', startMatrixRain);

// Matrix rain for hero section
function startMatrixHeroRain() {
  const canvas = document.getElementById('matrix-hero-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  const fontSize = 18;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);
  const chars = 'tyler stewart cape town mexico bali thailand argentina';
  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  function draw() {
    ctx.fillStyle = 'rgba(24,28,32,0.13)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px Fira Mono, monospace';
    ctx.fillStyle = 'rgba(80,255,120,0.38)'; // greenish for terminal
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (Math.random() > 0.975 || drops[i] * fontSize > height) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}
window.addEventListener('DOMContentLoaded', startMatrixHeroRain); 