import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [dropDowns, setDropDowns] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <NavLink activeClassName="is-active" exact={true} to="/">
          Docs
        </NavLink>
        <NavLink activeClassName="is-active" to="/api">
          API
        </NavLink>
        <div className="dropdown" onClick={() => setDropDowns(!dropDowns)}>
          Examples
        </div>
        {dropDowns ? (
          <div className="dropdown-container">
            <NavLink activeClassName="is-active" to="/slide-effect">
              Slide Effect
            </NavLink>
            <NavLink activeClassName="is-active" to="/zoom-effect">
              Zoom Effect
            </NavLink>
            <NavLink activeClassName="is-active" to="/fade-effect">
              Fade Effect
            </NavLink>
          </div>
        ) : (
          ''
        )}
        <NavLink activeClassName="is-active" to="/typescript">
          For Typescript
        </NavLink>
        <NavLink activeClassName="is-active" to="/next">
          Next
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
