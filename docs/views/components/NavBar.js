import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar, isOpen }) => {
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
        <a className="menu-bar" onClick={toggleSidebar}>
          {isOpen === false ? (
            <img
              className="menu-img menu"
              src="assets/images/icons/list.svg"
              alt=""
            />
          ) : (
            <img
              className="menu-img cancle"
              src="assets/images/icons/cancel.svg"
              alt=""
            />
          )}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
