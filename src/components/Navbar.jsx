import { NavLink } from 'react-router-dom';
import logo from '/favicon.svg?url';
import '../css/components/Navbar.css'

export default function Navbar() {
  return (
    <nav>
      <div>
          <NavLink to="/"><img src={logo} alt="Favicon" /></NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/about">about</NavLink>
        </li>
        <li>
          <NavLink to="/projects">projects</NavLink>
        </li>
        <li>
          <a href="https://github.com/dey880" target="_blank" rel="noreferrer">github</a>
        </li>
        <li>
          <a href="mailto:julianpedersen1@proton.me">email</a>
        </li>
      </ul>
    </nav>
  );
}
