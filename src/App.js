import logo from './logo.svg';
import './App.css';
import Scene from "./components/Scene";
import Nav from "./components/Nav";

import "./styles/home.css";
import "./styles/about.css";
import "./styles/projects.css"

import React, { useRef, useState, useEffect } from "react";

function App() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);

    const [intersecting, setIntersecting] = useState("title");
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting)
                    setIntersecting(entry.target.id);
                if(entry.isIntersecting)
                    console.log(entry.target.id)
            });
        }, { rootMargin: "-50%" });

        [homeRef, aboutRef, projectsRef].forEach((elem) => {
            observer.observe(elem.current);
        });
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <div className="App">
            <Nav intersecting={intersecting}/>
            <section id="home" ref={homeRef}>
                <header><h1>Alex Odorico</h1></header>
                <Scene />
            </section>
            <section id="about" ref={aboutRef}>
            <h1>About</h1>
            <article className="desc">
                I am a Computer Science major in my 3rd year of studies at York University.
                <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
                    Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum .</p></article>
            </section>
            <section id="projects" ref={projectsRef}>
                <h1>Projects</h1>
                <div>
                    <h2>Sudoku Prime</h2>
                    <p>efefefefefefef</p>
                    <p>fefefef</p>
                </div>

                <div>
                    <h2>MyAniBot</h2>
                    <p>efefef</p>
                    <p>fefefef</p>
                </div>

                <div>
                    <h2>Project3</h2>
                    <p>fefefef</p>
                    <p>fefefef</p>
                </div>
            </section>
        </div>
    );
}

export default App;