import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import NavBar from '../layout/NavBar';
import { Link } from 'react-router-dom';
import { goTo } from '../../actions/page';

const Home = ({ isAuthenticated, user: { loading }, auth, goTo  }) => {
	

	return auth.loading ? (
		<Spinner loadFunctions={[]} />
	) : (
		<div id='home-page' className='page'>
            <Link to='/signup' onClick={() => goTo('signup')} className='splash-signup-btn'>Get started for free</Link>
		</div>
	);
};

Home.propTypes = {
	goTo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, {
    goTo
})(Home);
