import { useEffect, useRef } from "react";
import "../styles/Title.css";

const minDist = 175;
const particleCount = 100;
const particles = new Array(particleCount)
let context, mount, canvas;

const Title = function (animation) {
    mount = useRef(null);
    
    useEffect(() => {
        canvas = mount.current;
        context = canvas.getContext("2d");
        windowAdjust();
        window.addEventListener("resize", windowAdjust);
        let frameID;
        init();
        frameID = update();
        return () => cancelAnimationFrame(frameID)
    }, []);

    return (
        <div id="title">
            <canvas id="scene" ref={mount} />
            <header><h1>Alex Odorico</h1></header>
        </div>
    );
};

function init() {
    for(let i = 0; i < particleCount; i++) {
        particles[i] = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            x_velocity: 2 * Math.random() - 1,
            y_velocity: 2 * Math.random() - 1,
        }
    }
}

function update() {
    draw();
    return requestAnimationFrame(update);
}

function windowAdjust() {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(let i = 0; i < particleCount; i++) {
        particles[i].x += particles[i].x_velocity;
        particles[i].y += particles[i].y_velocity;

        if(particles[i].x > window.innerWidth || particles[i].x < 0) 
            particles[i].x_velocity = -particles[i].x_velocity;
        
        if(particles[i].y > window.innerHeight || particles[i].y < 0) 
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
    const ratio = (minDist - dist) / minDist;
    context.strokeStyle = `rgba(255,255,255,${ratio})`;
    context.lineWidth = 1.5
    context.beginPath();
    context.moveTo(Math.floor(p1.x), Math.floor(p1.y));
    context.lineTo(Math.floor(p2.x), Math.floor(p2.y));
    context.stroke();
}

export default Title;