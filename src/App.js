import logo from './logo.svg';
import './App.css';
import Title from "./components/Title";
import Nav from "./components/Nav";
import About from "./components/About";
import Projects from "./components/Projects";
import React, { useRef, useState, useEffect } from "react";

function App() {
    const titleRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);

    const [intersecting, setIntersecting] = useState("Title");
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting)
                    setIntersecting(entry.target.nodeName);
            });
        }, { rootMargin: "-300px" });

        // [titleRef, aboutRef, projectsRef].forEach((elem) => {
        //     observer.observe(elem.current);
        // });
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <div className="App">
            <Nav intersecting={intersecting}/>
            <Title  animation={true} />
            <About animation={true} />
            <Projects animation={true} />
        </div>
    );
}

export default App;