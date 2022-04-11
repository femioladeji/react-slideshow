import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const [dropDowns, setDropDowns] = useState(false);

  const setMargin = isOpen ? '0' : '-60%';

  const menuList = [
    {
      title: 'Zoom In Effect',
      path: '/zoom-in'
    },
    {
      title: 'Zoom Out Effect',
      path: '/zoom-out'
    },
    {
      title: 'Fade Effect',
      path: 'fade-effect'
    },
    {
      title: 'Custom Arrow',
      path: '/custom-arrows'
    },
    {
      title: 'Custom Indicators',
      path: '/custom-indicators'
    },
    {
      title: 'Pause on hover',
      path: '/pause-hover'
    },
    {
      title: 'Multiple Slides',
      path: '/multiple-slides'
    },
    {
      title: 'Responsive',
      path: '/responsive'
    },
    {
      title: 'Can swipe',
      path: '/can-swipe'
    },
    {
      title: 'Autoplay toggle',
      path: '/autoplay'
    },
    {
      title: 'Methods',
      path: '/methods'
    },
    {
      title: 'Callback',
      path: '/callback'
    }
  ];

  return (
    <div className="sidebar" style={{ marginLeft: setMargin }}>
      <div className="sidebar-items">
        <NavLink
          className={({ isActive }) => (isActive ? ' is-active' : '')}
          to="/"
        >
          Getting started
        </NavLink>
        <div className="dropdown" onClick={() => setDropDowns(!dropDowns)}>
          Examples
        </div>
        {dropDowns ? (
          <div className="dropdown-container">
            {menuList.map(each => (
              <NavLink
                key={each.path}
                className={({ isActive }) => (isActive ? ' is-active' : '')}
                to={each.path}
              >
                {each.title}
              </NavLink>
            ))}
          </div>
        ) : (
          ''
        )}
        <NavLink
          className={({ isActive }) => (isActive ? ' is-active' : '')}
          to="/api"
        >
          Props &amp; Methods
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? ' is-active' : '')}
          to="/typescript"
        >
          Typescript
        </NavLink>
        {/* <NavLink className={({ isActive }) => isActive ? " is-active" : ""} to="/next">
          Next
        </NavLink> */}
      </div>
    </div>
  );
};

export default Sidebar;
