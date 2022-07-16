import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <nav id="nav" role="navigation">
        <ul>
          <li>
            <NavLink to="/">Anlysis</NavLink>
          </li>
          <li>
            <NavLink to="/used_time?page=1&sort=&search=&date=&type=">Used time</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
