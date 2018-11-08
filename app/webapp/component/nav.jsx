import React from 'react';
import { NavLink } from 'react-router-dom';

export const HOME_PAGE_ROUTE = '/';
export const ACTIONS_PAGE_ROUTE = '/actions';
export const DATABASES_PAGE_ROUTE = '/databases';
export const LOGIN_PAGE_ROUTE = '/login';

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
