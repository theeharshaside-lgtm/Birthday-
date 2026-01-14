// ------------------------------
// Elements
// ------------------------------
const surpriseBtn = document.getElementById('surprise-btn');
const animatedText = document.getElementById('animated-text');
const balloonsContainer = document.getElementById('balloons-container');
const gallery = document.getElementById('gallery');
const videoSection = document.getElementById('video-section');
const bgMusic = document.getElementById('bg-music');
const confettiCanvas = document.getElementById('confetti');

// ------------------------------
// Click Surprise Button
// ------------------------------
surpriseBtn.addEventListener('click', () => {
    // Show heading
    animatedText.style.opacity = 1;
    animatedText.style.transform = 'scale(1)';

    // Play background music
    bgMusic.play();

    // Show gallery & video
    gallery.classList.remove('hidden');
    videoSection.classList.remove('hidden');

    // Create balloons
    createBalloons(5); // fewer balloons

    // Hide button after click
    surpriseBtn.style.display = 'none';

    // Start confetti animation
    startConfetti();
});

// ------------------------------
// Create Floating Balloons
// ------------------------------
function createBalloons(count) {
    const colors = ['#ffb6c1', '#ffd1dc', '#ff69b4', '#ff8da1', '#ffc0cb'];

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * window.innerWidth + 'px';
        balloon.style.bottom = '-100px';

        // Float animation using CSS
        balloon.style.animation = `float ${20 + Math.random() * 10}s linear infinite`;

        // Pop balloon on click
        balloon.addEventListener('click', () => {
            balloon.remove();
        });

        balloonsContainer.appendChild(balloon);
    }
}

// ------------------------------
// Simple Confetti Effect
// ------------------------------
function startConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const colors = ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b1', '#f9bec7'];
    const confettiCount = 100;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10
        });
    }

    function draw() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.r);
            ctx.stroke();
        });
        update();
    }

    function update() {
        confetti.forEach(c => {
            c.y += Math.cos(c.d) + 1 + c.r / 2;
            c.x += Math.sin(c.d);
            if (c.y > confettiCanvas.height) {
                c.y = -10;
                c.x = Math.random() * confettiCanvas.width;
            }
        });
    }

    setInterval(draw, 20);
}
