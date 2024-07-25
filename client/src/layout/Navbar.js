import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated}, logout }) => {
    const authLinkes = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className='fas fa-sign-out-alt' />{ ' ' }
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{ ' ' }
                    <span className='hide-sm'>logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>register</Link>
            </li>
            <li>
                <Link to='/login'>login</Link>
            </li>
        </ul>
    )

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                <i className='fas fa-code'></i>
                </Link>
            </h1>
            <Fragment>{isAuthenticated ? authLinkes : guestLinks}</Fragment>
        </nav>
    )
}

Navbar.propTypes = {
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)