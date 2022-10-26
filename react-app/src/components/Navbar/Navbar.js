import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}
