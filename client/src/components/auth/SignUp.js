import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { signUpUser } from '../../actions/auth';


const SignUp = ({ isAuthenticated, user: { loading }, auth, signUpUser  }) => {
	
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        password: ''
    });
    
    const {
        name,
        role,
        email,
        password
    } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();

        await signUpUser(formData);

        setFormData({
            name: '',
            role: '',
            email: '',
            password: ''
        })
    }

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const roles = ['Student', 'Employee', 'Personal'];

	return auth.loading ? (
		<Spinner loadFunctions={[]} />
	) : (
		<div id='signup-page' className='page'>
            <form onSubmit={onSubmit}>
                <input type='text' name='name' placeholder='First name' value={name} onChange={onChange} />
                <select name='role' value={role} onChange={onChange}>
                    {roles.map((role, i) => <option key={i} value={role}>{role}</option>)}
                </select>
                <input type='email' name='email' placeholder='Email address' value={email} onChange={onChange} />
                <input type='password' name='password' placeholder='Password' value={password} onChange={onChange} />
                <button type='submit'>Sign Up</button>
                
            </form>
		</div>
	);
};

SignUp.propTypes = {
	signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, {
    signUpUser
})(SignUp);
