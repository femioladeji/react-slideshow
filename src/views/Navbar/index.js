import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar" style={{ width: '100%' }}>
      <div className="navbar-div">
        <h1>React Slideshow</h1>
        <div>
          <ul>
            <Link to="/">
              <li>Docs</li>
            </Link>
            <Link to="/api">
              <li>Api</li>
            </Link>
            <Link to="/examples">
              <li>Examples</li>
            </Link>
            <a
              target="_blank"
              href="https://github.com/femioladeji/react-slideshow"
            >
              <li>Github</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
