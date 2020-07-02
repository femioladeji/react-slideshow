import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Sidebar = () => {
  const [dropDowns, setDropDowns] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <Link to="/">
          <div className="menu-item">Docs</div>
        </Link>
        <Link to="/api">
          <div className="menu-item">API</div>
        </Link>
        <div className="menu-item" onClick={() => setDropDowns(!dropDowns)}>
          Examples
        </div>
        {dropDowns ? (
          <div className="menu-item dropdown-container">
            <Link to="/slide-effect">
              <div className="d-item menu-item">Slide Effect</div>
            </Link>
            <Link to="/zoom-effect">
              <div className="d-item menu-item">Zoom Effect</div>
            </Link>
            <Link to="/fade-effect">
              <div className="d-item menu-item">Fade Effect</div>
            </Link>
          </div>
        ) : (
          ''
        )}
        <Link to="/typescript">
          <div className="menu-item">For Typescript</div>
        </Link>
        <Link to="/next">
          <div className="d-item menu-item">Next</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
