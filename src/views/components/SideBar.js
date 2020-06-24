import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <Link to="/">
          <div>Docs</div>
        </Link>
        <Link to="/api">
          <div>Api</div>
        </Link>
        <Link to="/examples">
          <div>Examples</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
