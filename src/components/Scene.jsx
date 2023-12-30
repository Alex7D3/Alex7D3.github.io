import { useEffect, useRef } from "react";

const minDist = 175;
const particleCount = 100;
const particles = new Array(particleCount)
let context, mount, canvas;

const Scene = function (animation) {
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

    return (<canvas id="scene" ref={mount} />);
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
    const width = document.body.clientWidth;
    const height = window.innerHeight;
    const ratio = window.devicePixelRatio;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.scale(ratio, ratio);
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(let i = 0; i < particleCount; i++) {
        particles[i].x += particles[i].x_velocity;
        particles[i].y += particles[i].y_velocity;
        drawParticle(particles[i].x, particles[i].y);

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
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
}

function drawParticle(x, y) {
    context.fillStyle = "#FFFFFF";
    context.beginPath();
    context.arc(x, y, 1, 0, 2 * Math.PI);
    context.fill();
}
export default Scene; 