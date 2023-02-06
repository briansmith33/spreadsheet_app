import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { goTo } from '../../actions/page';
import { Link, NavLink } from 'react-router-dom';


const Navbar = ({
    isAuthenticated,
    auth,
    user: {user},
    page: {page},
    logout,
    goTo

}) => { 

    useEffect(() => {
        if (!isAuthenticated) {
            const signinLink = document.querySelector('.signin-link');
            const signupLink = document.querySelector('.signup-link');
            if (page === 'signin') {
                signinLink.classList.add('hide');
                signupLink.classList.add('onpage');
                signupLink.textContent = 'Create a free account';
            } else {
                signinLink.classList.remove('hide');
                signupLink.classList.remove('onpage');
                signupLink.textContent = 'Get started for free';
            }
    
            if (page === 'signup') {
                signupLink.classList.add('hide');
                signinLink.classList.add('onpage');
            } else {
                signupLink.classList.remove('hide');
                signinLink.classList.remove('onpage');
            }
        }
        
    }, [page, isAuthenticated])

	return (
		<Fragment>
            <nav>
                <div className='nav-links row'>
                    <NavLink to='/' onClick={() => goTo('home')} className='nav-link'>Home</NavLink>
                    <NavLink to='/editor' onClick={() => goTo('editor')} className='nav-link'>Editor</NavLink>
                </div>
                {isAuthenticated ? (
                    <Fragment>
                        <button className='logout-btn' onClick={() => logout()}>Logout</button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to='/signin' onClick={() => goTo('signin')} className='signin-link'>Sign In</Link>
                        <Link to='/signup' onClick={() => goTo('signup')} className='signup-link'>Get started for free</Link>
                    </Fragment>
                )}
                
            </nav>
		</Fragment>
	);
};

Navbar.propTypes = {
    goTo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
	auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
    page: state.page
});

export default connect(mapStateToProps, {
    logout,
    goTo
})(Navbar);
