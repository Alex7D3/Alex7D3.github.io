const minDist = 200;
const maxParticles = 100;
const positions = new Float32Array(maxParticles * 2);
const velocities = new Float32Array(maxParticles * 2);
const dpr = window.devicePixelRatio || 1;
let particleCount, frameID, WIDTH, HEIGHT, resizeTimer;

const canvas = document.getElementById("scene");
const context = canvas.getContext("2d");

window.addEventListener("load", () => {
    sizeCanvas();
    init();
    frameID = update();
});


window.addEventListener("resize", () => {
    if(resizeTimer) clearTimeout(resizeTimer);
    sizeCanvas();
    resizeTimer = setTimeout(() => {
        init();
        cancelAnimationFrame(frameID);
    }, 400);
    return true;
}, true);

function init() {
    for(let i = 0; i < particleCount; i++) {
        positions[i * 2] = Math.random() * WIDTH;
        positions[i * 2 + 1] = Math.random() * HEIGHT;
        velocities[i * 2] = Math.random() - 0.5;
        velocities[i * 2 + 1] = Math.random() - 0.5;
    }
}

function sizeCanvas() {
    WIDTH = document.body.clientWidth;
    HEIGHT = window.innerHeight;
    canvas.style.height = HEIGHT + "px";
    canvas.style.width = WIDTH  + "px";
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    context.scale(dpr, dpr);
    particleCount = Math.min(Math.floor((WIDTH * HEIGHT) / 10000), maxParticles);
	console.log(particleCount)
}

function update() {
    drawFrame();
    return requestAnimationFrame(update);
}

function drawFrame() {
    let dist, dy, dx;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for(let i = 0; i < particleCount; i++) {
        positions[i * 2] += velocities[i * 2];
        positions[i * 2 + 1] += velocities[i * 2 + 1];

        if(positions[i * 2] > WIDTH || positions[i * 2] < 0) 
            velocities[i * 2] = -velocities[i * 2];
        
        if(positions[i * 2 + 1] > HEIGHT || positions[i * 2 + 1] < 0) 
            velocities[i * 2 + 1] = -velocities[i * 2 + 1];
        
        for(let j = i + 1; j < particleCount; j++) {
            dx = positions[i * 2] - positions[j * 2];
            dy = positions[i * 2 + 1] - positions[j * 2 + 1];

            dist = Math.hypot(dx, dy);
            if(dist < minDist) 
                drawLine(
                    positions[i * 2],
                    positions[i * 2 + 1],
                    positions[j * 2],
                    positions[j * 2 + 1],
                    dist
                );
        }
    }
}

function drawLine(x1, y1, x2, y2, dist) {
    const ratio = Math.floor(minDist - dist) / minDist;
    context.strokeStyle = "rgba(255,255,255,".concat(ratio).concat(")");
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}