import React from 'react';
import { NavLink } from 'react-router-dom';

export const HOME_PAGE_ROUTE = '/';
export const ACTIONS_PAGE_ROUTE = '/actions';
export const DATABASES_PAGE_ROUTE = '/databases';
export const LOGOUT_PAGE_ROUTE = '/logout';

const Nav = () => (
  <nav>
    <ul>
      {[
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: ACTIONS_PAGE_ROUTE, label: 'actions' },
        { route: DATABASES_PAGE_ROUTE, label: 'Databases' },
        { route: LOGOUT_PAGE_ROUTE, label: 'logout' },
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
