// AI Boot Sequence & Typing Effect
const terminalBody = document.querySelector('.terminal-body');
const typewriterElement = document.getElementById('typewriter');
const cursorElement = document.getElementById('terminal-cursor');

const bootSequence = [
    { text: 'Initializing Interface...', class: 'system', delay: 400 },
    { text: 'Loading Core Modules...', class: 'system', delay: 500 },
    { text: 'Access Granted.', class: 'success', delay: 1000 },
    { text: '<br>', delay: 1000 } // Spacer
];

const heroLines = [
    'whoami',
    'Engineer. Builder. Explorer.'
];

let lineIndex = 0;
let charIndex = 0;

async function runBootSequence() {
    // Clear initial content (except cursor)
    const terminalContent = document.getElementById('terminal-content');
    terminalContent.innerHTML = '';

    for (const step of bootSequence) {
        await new Promise(resolve => setTimeout(resolve, step.delay - (step.prevDelay || 0)));
        step.prevDelay = step.delay;

        if (step.text === '<br>') {
            const br = document.createElement('br');
            terminalContent.appendChild(br);
        } else {
            const div = document.createElement('div');
            div.className = `log-entry ${step.class || ''}`;
            div.textContent = `> ${step.text}`;
            terminalContent.appendChild(div);
        }
    }

    // Start typing the main content
    addPromptLine();
    setTimeout(typeHeroText, 500);
}

function addPromptLine() {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = `<span class="prompt">tyler@ai:~$</span> <span id="typewriter"></span>`;
    // Move cursor to this new line
    line.appendChild(cursorElement);
    document.getElementById('terminal-content').appendChild(line);
}

function typeHeroText() {
    const currentTypewriter = document.getElementById('typewriter'); // Get the dynamic one

    if (lineIndex < heroLines.length) {
        if (charIndex < heroLines[lineIndex].length) {
            currentTypewriter.innerHTML += heroLines[lineIndex][charIndex];
            charIndex++;
            setTimeout(typeHeroText, lineIndex === 0 ? 80 : 40);
        } else {
            // Line finished
            if (lineIndex === 0) {
                // Prepare for next line (the tagline)
                currentTypewriter.innerHTML += '<br><br>> ';
            }
            lineIndex++;
            charIndex = 0;
            setTimeout(typeHeroText, 400);
        }
    } else {
        // Finished typing
        cursorElement.style.animation = 'blink 1s step-end infinite';

        // Auto-scroll after 0.5 seconds
        setTimeout(() => {
            if (window.scrollY < 50) {
                document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
}

// Start the sequence
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runBootSequence, 500);
});


// Scroll Down Button
document.getElementById('scroll-down').addEventListener('click', () => {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
});


// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger About Me typing effect when section is visible
            if (entry.target.id === 'about') {
                typeAboutText();
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


// About Me Typing Effect
const aboutText = "When I’m not working, I’m traveling, scuba diving, off-roading, or learning something new. I enjoy adventure and long stays in new places. I like working from different cities, exploring for a few months at a time, and building a life that balances good work with good experiences.";
const aboutTypewriterElement = document.getElementById('about-typewriter');
let aboutCharIndex = 0;
let aboutTypingStarted = false;

function typeAboutText() {
    if (aboutTypingStarted) return;
    aboutTypingStarted = true;

    function typeChar() {
        if (aboutCharIndex < aboutText.length) {
            aboutTypewriterElement.textContent += aboutText[aboutCharIndex];
            aboutCharIndex++;
            setTimeout(typeChar, 15);
        }
    }

    typeChar();
}


// Neural Network / Constellation Effect
function initNeuralNetwork(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = `rgba(79, 172, 254, ${Math.random() * 0.5 + 0.2})`; // Light blue
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.6;
                    const directionY = forceDirectionY * force * 0.6;

                    this.vx += directionX;
                    this.vy += directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(79, 172, 254, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    resize();
    animate();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNeuralNetwork('matrix-hero-bg');
});

// Card Hover Effect (Mouse tracking)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
