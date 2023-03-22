import React from 'react';
import './About.css';
import '../../Containers/Terminal/Terminal.css'

const About = () =>{
    return(
    <section className = "main section">
        <div className="about">
            <div className="text">
                <div  className="header">
                    <h1>About Me</h1>
                </div>
                <p>Hello! I'm Kévin, a System and Network Administrator based in Nantes (FR)<br/>⠀</p>
                <p>Currently I'm a fifth year student at <a className="school"href="https://www.epsi.fr/campus/campus-de-nantes/" target="_blank" rel="noreferrer">EPSI Nantes</a>. 
                    When I'm not coding, administrating or studying you'll find me curled up reading, managing my Plex server or at the GYM (LightWeight).
                <br/>⠀
                </p>
                <p>Here are a few technologies I've worked with recently:<br/>⠀</p>
                {getTechnologies()}
            </div>
            <div className="avatar"></div>
        </div>
    </section>
    );
}

const getTechnologies = () =>{
    return <ol className="technologies">
                <li>Ansible</li>
                <li>PostgreSQL</li>
                <li>Oracle</li>
                <li>Tomcat</li>
                <li>NodeJS</li>
                <li>Python</li>
            </ol>
}
export default About;