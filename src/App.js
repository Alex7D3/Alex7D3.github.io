import Scene from "./components/Scene";
import Nav from "./components/Nav";

import "./styles/home.css";
import "./styles/about.css";
import "./styles/projects.css"

import assets from "./assets.json";
import React, { useRef, useState, useEffect } from "react";
const { icons, projects } = assets;

function App() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);

    const [intersecting, setIntersecting] = useState("home");
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting)
                    setIntersecting(entry.target.id);
            });
        }, { rootMargin: "-50%" });

        [homeRef, aboutRef, projectsRef].forEach((elem) => {
            observer.observe(elem.current);
        });
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <div className="App">
            <Scene/>
            <Nav intersecting={intersecting}/>
            <main>
                <section id="home" ref={homeRef}>
                    <header><h1><div id="caret">~$&nbsp;</div><div id="text">Alex Odorico</div><div id="cursor"/>&nbsp;&nbsp;</h1></header>
                </section>
                <section id="about" ref={aboutRef}>
                    <div className="content">
                        <h2>About</h2>
                        <img id="me" alt="myself" src="\me.jpg"></img>
                        <article className="desc">
                        <p>I am a Computer Science major in my 3rd year of studies at York University.
                        Pleased to meet you.
                        </p>
        
                        <p>
                        Technology has always been a part of my life. As a child, I wondered how the video games I enjoyed looked on the inside
                        or how computers could talk to each other continents apart.
                        This curiosity led me to learn programming in high school, and from that point, I knew the career I wanted to pursue.</p>
                        <p>I am currently looking for opportunities to expand my skills.</p>
                        
                        </article>
                    </div>
                    <div className="content">
                        <h2>Tools and Technologies</h2>
                        <div className="icon-grid">
                            {icons.map(({ path, alt }, idx) => 
                                <img key={idx} src={path} alt={alt} title={alt} width="60px" height="60px" />
                            )}
                        </div>
                    </div>
                </section>
                <section id="projects" ref={projectsRef}>
                    <h2>Projects</h2>
                    <div className="project-grid">
                        {projects.map(({ name, desc, tools, url }, idx) => 
                            <div key={idx} className="content">
                                <h3>{name} {url && <a className="github" href={url} target="_blank" rel="noreferrer" >github</a>}</h3>
                                <article>{desc}</article>
                                <div className="icon-grid">
                                    {tools.map(({ path, alt }, idx) => 
                                        <img key={idx} src={path} alt={alt} title={alt} width="60px" height="60px" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <footer>
                By Alexander Odorico
            </footer>
        </div>
    );
}

export default App;