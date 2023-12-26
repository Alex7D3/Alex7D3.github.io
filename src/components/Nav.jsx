import { React, useState } from "react";
import "../styles/Nav.css";

const Nav = function() {
    const [isChecked, setChecked] = useState(true);

    return (
        <nav id="nav">
            <ul>
                <li><a href="#title"><button className="btn"><b>Home</b></button></a></li>
                <li><a href="#about"><button className="btn"><b>About</b></button></a></li>
                <li><a href="#projects"><button className="btn"><b>Projects</b></button></a></li>
                <li><a href="https://github.com/Alex7D3" img=""><button class="btn"><b>Github</b></button></a></li>
                <li><a href="https://www.linkedin.com/in/alexander-odorico/" img=""><button class="btn"><b>Linkedin</b></button></a></li>
                <li><a href="mailto: ao11@my.yorku.ca"><button className="btn"><b>Contact</b></button></a></li>
                <li><a href="f" download><button className="btn"><b>Resume</b></button></a></li>
                <li class="check">
                    <input 
                        type="checkbox"
                        onChange={() => setChecked(!isChecked)}
                        checked={isChecked}
                    />
                <label>Animation: {isChecked ? 'on ' : 'off'}</label></li>
            </ul>
        </nav>
    );
};

export default Nav;