import { React, useEffect, useRef } from "react";
import "../styles/Title.css";
import * as THREE from "three";

let clock;
let camera, scene, renderer;
const minDist = 10;
const r = 200;
const half = r / 2;
const maxConnections = 40;
const segments = 800;
let particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
const edgeDegrees = new Float32Array(particleCount).fill(0);
const velocities = new Float32Array(particleCount * 3);

const Title = function (animation) {
    const mount = useRef(null);

    init();

    update();

    window.addEventListener("resize", windowAdjust);

    useEffect(() => {
        
        mount.current.appendChild(renderer.domElement);

        const cleanup = mount.current;
        return () => cleanup.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="title">
            <div id="threescene" ref={mount} />
            <header><h1>Alex Odorico</h1></header>
        </div>
    );
};

function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    const helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );
	helper.material.color.setHex( 0x474747 );
	helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
	scene.add( helper );

    const geometry = new THREE.BufferGeometry();

    for(let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * r;
        const y = (Math.random() - 0.5) * r;
        const z = (Math.random() - 0.5) * r;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        velocities[i * 3] = Math.random() - 0.5;
        velocities[i * 3 + 1] = Math.random() - 0.5;
        velocities[i * 3 + 2] = Math.random() - 0.5;
    }

    geometry.setDrawRange( 0, particleCount);
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.computeBoundingBox();

    const pointMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 4,
        blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(geometry, pointMaterial);
    particleSystem.name = "particleSystem";
    scene.add(particleSystem);
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
		blending: THREE.AdditiveBlending,
		transparent: true
    });
    const lineMesh = new THREE.Line(geometry, lineMaterial);
    lineMesh.name = "lineMesh";
    scene.add(lineMesh);

    camera = new THREE.PerspectiveCamera(
        45, //FOV
        document.body.clientWidth / window.innerHeight, //aspect ratio
        1, //near clipping plane
        4000 //far clipping plane
    );
    camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 0;
    
    
    console.log(scene);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(document.body.clientWidth, window.innerHeight);
}

function update() {
    const time = clock.getElapsedTime();
    const delta = clock.getDelta();
    const particleSystem = scene.getObjectByName("particleSystem");
    const lineMesh = scene.getObjectByName("lineMesh");
    let degreeCount = 0;

    for(let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
		positions[i * 3 + 1] += velocities[i * 3 + 1];
		positions[i * 3 + 2] += velocities[i * 3 + 2];
        if(positions[i * 3] > half || positions[i * 3] < -half)
            velocities[i * 3] = -velocities[i * 3]
        if(positions[i * 3 + 1] > half || positions[i * 3 + 1] < -half)
            velocities[i * 3 + 1] = -velocities[i * 3 + 1]
        if(positions[i * 3 + 2] > half || positions[i * 3 + 2] < -half)
            velocities[i * 3 + 2] = -velocities[i * 3 + 2]
        
        for(let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
			const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
			const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if(degreeCount < maxConnections && dist < minDist) {
                degreeCount++;
            }
            
        }
    }

    lineMesh.geometry.setDrawRange(0, degreeCount);

    particleSystem.geometry.attributes.position.needsUpdate = true;
    lineMesh.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}

function windowAdjust() {
    camera.aspect = document.body.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, window.innerHeight);
}

export default Title;