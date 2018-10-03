import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HOME_PAGE_ROUTE,
  ACTIONS_PAGE_ROUTE,
  DATABASES_PAGE_ROUTE,
} from '../routes';

const Nav = () => (
  <nav>
    <ul>
      {[
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: ACTIONS_PAGE_ROUTE, label: 'actions' },
        { route: DATABASES_PAGE_ROUTE, label: 'Databases' },
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
