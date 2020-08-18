import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [dropDowns, setDropDowns] = useState(false);

  const setMargin = isOpen ? "0" : "-60%";

  return (
    <div className="sidebar" style={{ marginLeft: setMargin }}>
      <div className="sidebar-items">
        <NavLink activeClassName="is-active" exact={true} to="/">
          Getting started
        </NavLink>
        <div className="dropdown" onClick={() => setDropDowns(!dropDowns)}>
          Examples
        </div>
        {dropDowns ? (
          <div className="dropdown-container">
            <NavLink activeClassName="is-active" to="/zoom-in">
              Zoom In Effect
            </NavLink>
            <NavLink activeClassName="is-active" to="/zoom-out">
              Zoom Out Effect
            </NavLink>
            <NavLink activeClassName="is-active" to="/fade-effect">
              Fade Effect
            </NavLink>
            <NavLink activeClassName="is-active" to="/custom-arrows">
              Custom Arrow
            </NavLink>
            <NavLink activeClassName="is-active" to="/custom-indicators">
              Custom Indicators
            </NavLink>
            <NavLink activeClassName="is-active" to="/pause-hover">
              Pause on hover
            </NavLink>
            <NavLink activeClassName="is-active" to="/autoplay">
              Autoplay toggle
            </NavLink>
            <NavLink activeClassName="is-active" to="/methods">
              Methods
            </NavLink>
            <NavLink activeClassName="is-active" to="/callback">
              Callback
            </NavLink>
          </div>
        ) : (
          ""
        )}
        <NavLink activeClassName="is-active" to="/api">
          Props &amp; Methods
        </NavLink>
        <NavLink activeClassName="is-active" to="/typescript">
          Typescript
        </NavLink>
        {/* <NavLink activeClassName="is-active" to="/next">
          Next
        </NavLink> */}
      </div>
    </div>
  );
};

export default Sidebar;
