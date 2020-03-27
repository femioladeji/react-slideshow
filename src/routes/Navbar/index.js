import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div style={{ width: '100%' }}>
      <div className="navbar-div">
        <h1>React Slideshow</h1>
        <div>
          <ul>
            <Link to="/">
              <li>Docs</li>
            </Link>
            <div
              style={{
                width: '100px',
                padding: '0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <a
                target="_blank"
                href="https://github.com/femioladeji/react-slideshow"
              >
                <li>Star</li>
              </a>
              <img
                style={{ padding: '0 2px 0 0', height: '50px' }}
                alt="github"
                src="../../images/github.png"
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
