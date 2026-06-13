const isTouch = window.matchMedia('(pointer: coarse)').matches;
if (isTouch) {
  document.body.classList.add('touch-device');
}

const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 2400);
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const floatingDecor = () => {
  const layer = document.getElementById('decor-layer');
  const symbols = ['❤', '✿', '❀'];
  for (let i = 0; i < 18; i += 1) {
    const node = document.createElement('span');
    node.className = 'floating-shape';
    node.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    node.style.left = `${Math.random() * 100}%`;
    node.style.fontSize = `${14 + Math.random() * 20}px`;
    node.style.animationDuration = `${8 + Math.random() * 14}s`;
    node.style.animationDelay = `${Math.random() * -12}s`;
    layer.appendChild(node);
  }
};

const heroParticles = () => {
  const container = document.getElementById('hero-particles');
  const icons = ['❤', '❀', '✿', '♡'];
  for (let i = 0; i < 28; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'hero-icon';
    particle.textContent = icons[Math.floor(Math.random() * icons.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.fontSize = `${12 + Math.random() * 24}px`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particle.style.color = `rgba(204, 125, 167, ${0.3 + Math.random() * 0.4})`;
    container.appendChild(particle);
  }
};

floatingDecor();
heroParticles();

if (!isTouch) {
  const cursor = document.getElementById('custom-cursor');
  const glow = document.getElementById('cursor-glow');
  const trailLayer = document.getElementById('trail-layer');

  let lastTrailTime = 0;

  window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
    glow.style.left = `${clientX}px`;
    glow.style.top = `${clientY}px`;

    const now = performance.now();
    if (now - lastTrailTime > 45) {
      lastTrailTime = now;
      const heart = document.createElement('span');
      heart.className = 'trail-heart';
      heart.textContent = Math.random() > 0.5 ? '❤' : '✦';
      heart.style.left = `${clientX}px`;
      heart.style.top = `${clientY}px`;
      trailLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 900);
    }
  });

  const hoverables = document.querySelectorAll('button, a, .magnetic');
  hoverables.forEach((item) => {
    item.addEventListener('mouseenter', () => cursor.classList.add('cursor-expanded'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-expanded'));
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.getElementById('lightbox-close');

document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.image;
    lightboxCaption.textContent = card.dataset.caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const hideLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};

closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) hideLightbox();
});

const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letter-content');
envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
  const isOpen = envelope.classList.contains('open');
  envelope.setAttribute('aria-expanded', String(isOpen));
  letterContent.classList.toggle('show', isOpen);
  letterContent.setAttribute('aria-hidden', String(!isOpen));
});

const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
const confettiParticles = [];

const resizeCanvas = () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const burstConfetti = (x = window.innerWidth / 2, y = window.innerHeight * 0.3) => {
  const icons = ['❤', '❀', '✿', '🎉'];
  for (let i = 0; i < 130; i += 1) {
    confettiParticles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 1.3) * 8,
      size: 12 + Math.random() * 12,
      icon: icons[Math.floor(Math.random() * icons.length)],
      alpha: 1,
      gravity: 0.08 + Math.random() * 0.09
    });
  }
};

const runConfetti = () => {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.alpha -= 0.008;
    confettiCtx.globalAlpha = Math.max(p.alpha, 0);
    confettiCtx.font = `${p.size}px "Noto Sans Tamil"`;
    confettiCtx.fillText(p.icon, p.x, p.y);
  });

  for (let i = confettiParticles.length - 1; i >= 0; i -= 1) {
    if (confettiParticles[i].alpha <= 0) {
      confettiParticles.splice(i, 1);
    }
  }

  confettiCtx.globalAlpha = 1;
  requestAnimationFrame(runConfetti);
};
runConfetti();

const surpriseBtn = document.getElementById('surprise-btn');
const surpriseMessage = document.getElementById('surprise-message');
surpriseBtn.addEventListener('click', () => {
  burstConfetti();
  setTimeout(() => burstConfetti(window.innerWidth * 0.2, window.innerHeight * 0.45), 180);
  setTimeout(() => burstConfetti(window.innerWidth * 0.8, window.innerHeight * 0.45), 280);
  surpriseMessage.textContent = 'உலகிலேயே சிறந்த அம்மா நீங்கள் தான் ❤️';
});

// Real MP3 Music Player

const musicBtn = document.getElementById("music-toggle");
const audio = document.getElementById("birthday-music");

musicBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        musicBtn.textContent = "இசையை நிறுத்தவும்";
        musicBtn.setAttribute("aria-pressed", "true");

    } else {

        audio.pause();

        musicBtn.textContent = "இசையை இயக்கவும்";
        musicBtn.setAttribute("aria-pressed", "false");

    }

});
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fireworksCanvas.getContext('2d');
const fwParticles = [];

const resizeFireworks = () => {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
};
resizeFireworks();
window.addEventListener('resize', resizeFireworks);

const createFirework = () => {
  const x = 80 + Math.random() * (fireworksCanvas.width - 160);
  const y = 80 + Math.random() * (fireworksCanvas.height * 0.45);
  const count = 42;
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 1.6 + Math.random() * 3.3;
    fwParticles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: ['#ffb7d6', '#ffd8a8', '#d7c0ff', '#ffffff'][Math.floor(Math.random() * 4)]
    });
  }
};

const renderFireworks = () => {
  fwCtx.fillStyle = 'rgba(30, 9, 26, 0.12)';
  fwCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  fwParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.02;
    p.life -= 0.013;
    fwCtx.globalAlpha = Math.max(p.life, 0);
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    fwCtx.fillStyle = p.color;
    fwCtx.fill();
  });

  for (let i = fwParticles.length - 1; i >= 0; i -= 1) {
    if (fwParticles[i].life <= 0) {
      fwParticles.splice(i, 1);
    }
  }

  fwCtx.globalAlpha = 1;
  requestAnimationFrame(renderFireworks);
};
renderFireworks();

const finale = document.getElementById('finale');
let fireworksTimer = null;
const finaleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fireworksCanvas.classList.add('active');
        createFirework();
        if (!fireworksTimer) {
          fireworksTimer = setInterval(createFirework, 900);
        }
      } else {
        fireworksCanvas.classList.remove('active');
        if (fireworksTimer) {
          clearInterval(fireworksTimer);
          fireworksTimer = null;
        }
      }
    });
  },
  { threshold: 0.45 }
);

finaleObserver.observe(finale);

const orbitContainer = document.querySelector(".family-orbit");

setInterval(() => {

    const heart = document.createElement("span");

    heart.innerHTML = "❤️";

    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";

    orbitContainer.appendChild(heart);

    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;

    heart.animate([
        {
            transform:"translate(-50%,-50%)",
            opacity:1
        },
        {
            transform:`translate(${x}px,${y}px)`,
            opacity:0
        }
    ],{
        duration:3000
    });

    setTimeout(()=>{
        heart.remove();
    },3000);

},300);
