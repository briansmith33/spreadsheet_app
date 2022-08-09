import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { signInUser } from '../../actions/auth';


const SignIn = ({ isAuthenticated, user: { loading }, auth, signInUser  }) => {
	
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const {
        email,
        password
    } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();

        await signInUser(formData);

        setFormData({
            email: '',
            password: ''
        })
    }

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

	return auth.loading ? (
		<Spinner loadFunctions={[]} />
	) : (
		<div id='signin-page' className='page'>
            <form onSubmit={onSubmit}>
                <input type='email' name='email' placeholder='Email address' value={email} onChange={onChange} />
                <input type='password' name='password' placeholder='Password' value={password} onChange={onChange} />
                <button type='submit'>Sign In</button>
            </form>
		</div>
	);
};

SignIn.propTypes = {
	signInUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, {
    signInUser
})(SignIn);
