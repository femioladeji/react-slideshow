import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="navbar-div">
        <h1>React Slideshow</h1>
        <div className="nav-item">
          <ul>
            <Link to="/">
              <li>Docs</li>
            </Link>
            <Link to="/api">
              <li>API</li>
            </Link>
            <a
              target="_blank"
              href="https://github.com/femioladeji/react-slideshow"
            >
              <li>Github</li>
            </a>
          </ul>
        </div>
        <div className="menu-bar" onMouseDown={toggleSidebar}>
          <img className="menu-img" src="images/icons/list.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
