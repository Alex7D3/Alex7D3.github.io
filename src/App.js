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
            <Scene/>
            <Nav intersecting={intersecting}/>
            <main>
                <section id="home" ref={homeRef}>
                    <header><h1><div id="caret">~$&nbsp;</div><div id="text">Alex Odorico</div><div id="cursor"/>&nbsp;&nbsp;</h1></header>
                </section>
                <section id="about" ref={aboutRef}>
                    <div>
                        <h2>About</h2>
                        <article className="desc">
                        <p>I am a Computer Science major in my 3rd year of studies at York University.
                        Nice to meet you!</p>
                        
                        <p>
                        I always look forward to opportunities learning new things. I have a particular fondness for
                        Algorithms and Data Structures.
                        </p>
                        </article>
                    </div>
                    <div>
                        <h2>Tools and Technologies</h2>
                        <div>
                            {icons.map(({ path, alt }, idx) => 
                                <img key={idx} src={path} alt={alt} title={alt} width="60px" height="60px" />
                            )}
                        </div>
                    </div>
                </section>
                <section id="projects" ref={projectsRef}>
                    <div>
                        <h2>Projects</h2>
                        {projects.map(({ name, desc, tools, url }, idx) => 
                            <div key={idx}><h3>{name}</h3></div>
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