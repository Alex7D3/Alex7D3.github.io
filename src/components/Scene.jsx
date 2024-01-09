import { useEffect, useRef } from "react";

const minDist = 200;
const BASE_COUNT = 200;
let particleCount;
const particles = new Array(BASE_COUNT);
const winRatio = window.devicePixelRatio;
let context, mount, canvas;
let WIDTH, HEIGHT;
let resizeTimer;
function Scene(animation) {
    mount = useRef(null);
    
    useEffect(() => {
        canvas = mount.current;
        context = canvas.getContext("2d");
        context.lineWidth = 2;
        windowAdjust();
        const frameID = update();
        window.addEventListener("resize", windowAdjust);
        return () => cancelAnimationFrame(frameID)
    }, []);

    return (<canvas id="scene" ref={mount} />);
}

function init() {
    for(let i = 0; i < particleCount; i++) {
        particles[i] = {
            x: Math.random() * WIDTH,
            y: Math.random() * HEIGHT,
            x_velocity: Math.random() - 0.5,
            y_velocity: Math.random() - 0.5,
        }
    }
}

function update() {
    draw();
    return requestAnimationFrame(update);
}

function windowAdjust() {
    WIDTH = document.body.clientWidth;
    HEIGHT = document.body.clientHeight;
    canvas.width = WIDTH * winRatio;
    canvas.height = HEIGHT * winRatio;
    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    context.scale(winRatio, winRatio);

    if(resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        particleCount = Math.floor(BASE_COUNT * WIDTH / (window.screen.width));
        init();
    }, 400);
}

function draw() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for(let i = 0; i < particleCount; i++) {
        particles[i].x += particles[i].x_velocity;
        particles[i].y += particles[i].y_velocity;

        if(particles[i].x > WIDTH || particles[i].x < 0) 
            particles[i].x_velocity = -particles[i].x_velocity;
        
        if(particles[i].y > HEIGHT || particles[i].y < 0) 
            particles[i].y_velocity = -particles[i].y_velocity;
        
        for(let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < minDist) 
                drawLine(particles[i], particles[j], dist)
        }
    }
}

function drawLine(p1, p2, dist) {
    const ratio = Math.floor(minDist - dist) / minDist;
    context.strokeStyle = `rgba(255,255,255,${ratio})`;
    context.beginPath();
    context.moveTo(p1.x + 0.5, p1.y + 0.5);
    context.lineTo(p2.x + 0.5, p2.y + 0.5);
    context.stroke();
}

export default Scene; 