import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
    return (
        <header className="navbar">
            <img className='nav-logo' src='/logo.PNG' alt='logo' />
            <ul className='nav'>
                <li className='nav-link'>
                    <Link to="/">Home</Link>
                </li>
                <li className='nav-link'>
                    <Link to="/about">About</Link>
                </li>
                <li className='nav-link'>
                    <Link to="/shop">Shop</Link>
                </li>
                <li className='nav-link'>
                    <Link to="/inventory">Inventory</Link>
                </li>
                {/* TODO: add USER authentication */}
                <li className='nav-link sign-in'>
                    <Link to="/">Sign In</Link>
                </li>
            </ul>
        </header>
    )
}

export default Navbar;
