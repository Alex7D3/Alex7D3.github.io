import { useEffect, useRef } from "react";

const minDist = 200;
const BASE_COUNT = 300;
const positions = new Float32Array(BASE_COUNT);
const velocities = new Float32Array(BASE_COUNT);
const winRatio = window.devicePixelRatio;
let particleCount;
let context, mount, canvas;
let WIDTH, HEIGHT;
let resizeTimer;

function Scene(animation) {
    mount = useRef(null);
    
    useEffect(() => {
        canvas = mount.current;
        context = canvas.getContext("2d");
        scaleCanvas();
        init();

        const frameID = update();
        window.addEventListener("resize", windowAdjust);
        return () => cancelAnimationFrame(frameID)
    }, []);

    return (<canvas id="scene" ref={mount} />);
}

function init() {
    for(let i = 0; i < particleCount; i++) {
        positions[i << 1] = Math.random() * WIDTH;
        positions[(i << 1) + 1] = Math.random() * HEIGHT;
        velocities[i << 1] = Math.random() - 0.5;
        velocities[(i << 1) + 1] = Math.random() - 0.5;
    }
}

function update() {
    draw();
    return requestAnimationFrame(update);
}

function scaleCanvas() {
    WIDTH = document.body.clientWidth;
    HEIGHT = document.body.clientHeight;
    canvas.width = WIDTH * winRatio;
    canvas.height = HEIGHT * winRatio;
    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    context.scale(winRatio, winRatio);
    particleCount = Math.floor(BASE_COUNT * WIDTH / (window.screen.width));
}
function windowAdjust() {
    if(resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        scaleCanvas();
        init();
    }, 400);
}
function draw() {
    let dist, dy, dx;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for(let i = 0; i < particleCount; i++) {
        positions[i << 1] += velocities[i << 1];
        positions[(i << 1) + 1] += velocities[(i << 1) + 1];

        if(positions[i << 1] > WIDTH || positions[i << 1] < 0) 
            velocities[i << 1] = -velocities[i << 1];
        
        if(positions[(i << 1) + 1] > HEIGHT || positions[(i << 1) + 1] < 0) 
            velocities[(i << 1) + 1] = -velocities[(i << 1) + 1];
        
        for(let j = i + 1; j < particleCount; j++) {
            dx = positions[i << 1] - positions[j << 1];
            dy = positions[(i << 1) + 1] - positions[(j << 1) + 1];

            dist = Math.hypot(dx, dy);
            if(dist < minDist) 
                drawLine(
                    positions[i << 1],
                    positions[(i << 1) + 1],
                    positions[j << 1],
                    positions[(j << 1) + 1],
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
    context.moveTo(x1 + 0.5, y1 + 0.5);
    context.lineTo(x2 + 0.5, y2 + 0.5);
    context.stroke();
}

export default Scene; 