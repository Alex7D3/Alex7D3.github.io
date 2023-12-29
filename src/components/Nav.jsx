import { React, useState, useEffect } from "react";
import "../styles/nav.css";


const Nav = function({ intersecting }) {
    const [isChecked, setChecked] = useState(true);
    console.log(intersecting)
    useEffect(() => {
        console.log("button");
    }, [isChecked]);

    return (
        <nav id="nav">
            <ul>
                <li className={intersecting === "home" ? "active" : ""}>
                    <a href="#home">
                        <button><b>Home</b></button>
                    </a>
                </li>
                <li className={intersecting === "about" ? "active" : ""}>
                    <a href="#about">
                        <button><b>About</b></button>
                    </a>
                </li>
                <li className={intersecting === "projects" ? "active" : ""}>
                    <a href="#projects">
                        <button><b>Projects</b></button>
                    </a>
                </li>

                <li><a href="https://github.com/Alex7D3" img=""><button><b>Github</b></button></a></li>
                <li><a href="https://www.linkedin.com/in/alexander-odorico/" img=""><button className="btn"><b>Linkedin</b></button></a></li>
                <li><a href="mailto: ao11@my.yorku.ca"><button><b>Contact</b></button></a></li>
                <li><a href="f" download><button><b>Resume</b></button></a></li>
                <li>
                <label>
                    <input 
                        id="check"
                        type="checkbox"
                        onChange={() => setChecked(!isChecked)}
                        checked={isChecked}
                    />
                <b>Animation: {isChecked ? 'on ' : 'off'}</b></label></li>
            </ul>
        </nav>
    );
};

export default Nav;