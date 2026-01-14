const surpriseBtn = document.getElementById('surprise-btn');
const animatedText = document.getElementById('animated-text');
const balloonsContainer = document.getElementById('balloons-container');
const gallery = document.getElementById('gallery');
const videoSection = document.getElementById('video-section');
const bgMusic = document.getElementById('bg-music');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

surpriseBtn.addEventListener('click', async () => {
    animatedText.style.opacity = 1;
    animatedText.style.transform = 'scale(1)';

    try {
        await bgMusic.play();
    } catch (e) {
        console.log("Autoplay blocked");
    }

    gallery.classList.remove('hidden');
    videoSection.classList.remove('hidden');
    surpriseBtn.style.display = 'none';

    createBalloons(5);
    startConfetti();
});

function createBalloons(count) {
    const colors = ['#ffb6c1', '#ffd1dc', '#ff69b4'];

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = colors[Math.random() * colors.length | 0];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.bottom = '-100px';

        balloon.onclick = () => balloon.remove();
        balloonsContainer.appendChild(balloon);
    }
}

/* Confetti */
let confetti = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100,
    color: `hsl(${Math.random() * 360},100%,70%)`
}));

function startConfetti() {
    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confetti.forEach(c => {
            ctx.beginPath();
            ctx.strokeStyle = c.color;
            ctx.lineWidth = c.r;
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(c.x + 5, c.y + 10);
            ctx.stroke();

            c.y += 2;
            if (c.y > confettiCanvas.height) {
                c.y = -10;
                c.x = Math.random() * confettiCanvas.width;
            }
        });

        requestAnimationFrame(animate);
    }
    animate();
}
