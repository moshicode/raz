import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () =>
    <nav>
        <NavLink to="/">
            Home
        </NavLink>
        <NavLink
            to="/clients/add"
            activeClassName="selectedLink"
        >
            Add Client
        </NavLink>
        <NavLink
            to="/manager/export"
            activeClassName="selectedLink">
            Export
        </NavLink>
    </nav>

export default Navbar