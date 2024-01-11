import { React } from "react";
import "../styles/nav.css";


function Nav({ intersecting }) {
    
    return (
        <nav id="nav">
            <ul>
                <li className={intersecting === "home" ? "active" : ""}>
                    <a href="#home">
                        <button><b>[0] home</b></button>
                    </a>
                </li>
                <li className={intersecting === "about" ? "active" : ""}>
                    <a href="#about">
                        <button><b>[1] about</b></button>
                    </a>
                </li>
                <li className={intersecting === "projects" ? "active" : ""}>
                    <a href="#projects">
                        <button><b>[2] projects</b></button>
                    </a>
                </li>
                <li><a href="mailto: ao11@my.yorku.ca"><button><b>contact</b></button></a></li>
                <li><a href="f" download><button><b>resume</b></button></a></li>
                <li><a
                    href="https://github.com/Alex7D3"
                    target="_blank"
                    rel='noreferrer'>
                        <img 
                            src="/github-original.svg" 
                            alt="GitHub new window"
                        />
                    </a>
                </li>
                
                <li><a
                    href="https://www.linkedin.com/in/alexander-odorico/"
                    target="_blank"
                    rel='noreferrer'>
                        <img
                            src="/linkedin-original.svg"
                            alt="LinkedIn new window"
                        />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;