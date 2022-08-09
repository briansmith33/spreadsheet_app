import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import {
	USER_REGISTERED,
	REGISTER_FAIL,
	AUTH_ERROR,
	USER_LOGGEDIN,
	LOGIN_FAIL,
	LOGOUT,
	LOAD
} from './types';
import { loadUser } from './user';
import { useNavigate } from 'react-router-dom';

// Sign in user
export const signInUser = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	
	try {
		const res = await axios.post('/api/auth/signin', formData, config);
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
		}else{
			localStorage.setItem('token', res.data);
			setAuthToken(res.data);
			dispatch({type: USER_LOGGEDIN, payload: res.data});
			dispatch(loadUser());
		}
		
	} catch (err) {
		dispatch({type: LOGIN_FAIL, payload: err.message});
	}
};

// signUpUser ...
export const signUpUser = (formData) => async (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/auth/signup', formData, config);

		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'))
		}else{
			localStorage.setItem('token', res.data);
			setAuthToken(res.data);
			dispatch({type: USER_REGISTERED, payload: res.data});
			dispatch(loadUser());
		}
		
	} catch (err) {
		dispatch({type: REGISTER_FAIL, payload: err.message});
	}
};

// Send phone code
export const sendPhoneCode = (phone_number) => async (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/auth/phone/code', {"phone_number": phone_number}, config);
		return res.data

	} catch (err) {
		dispatch({type: REGISTER_FAIL, payload: err.message});
	}
};

// sendEmailCode ...
export const sendEmailCode = (email_address) => async (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/auth/email/code', {"email_address": email_address}, config);
		return res.data;

	} catch (err) {
		dispatch({type: REGISTER_FAIL, payload: err.message});
	}
};


export const verifyNumber = (verification_data) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	
	try {
		const res = await axios.post('/api/auth/verify_phone', verification_data, config);
		return res.data
	} catch (err) {

		dispatch({type: REGISTER_FAIL, payload: err.message});
	}
};

export const verifyEmail = (verification_data) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/auth/verify_email', verification_data, config);
		return res.data
	} catch (err) {
		dispatch({type: REGISTER_FAIL, payload: err.message});
	}
};


// usernameTaken ...
export const usernameTaken = (username) => async (dispatch) => {
	try {

		const res = await axios.get('/api/auth/username/'+username);
        return res.data;
		
	} catch (err) {
		dispatch({type: AUTH_ERROR, payload: err.message});
	}
};

// loadAuth ...
export const loadAuth = () => async (dispatch) => {
	try {
		dispatch({type: LOAD, payload: null});
	} catch (err) {
		dispatch({type: AUTH_ERROR, payload: err.message});
	}
};

// logout ...
export const logout = () => async (dispatch) => {
	try{

		await axios.put('/api/auth/logout');
		dispatch({ type: LOGOUT });
		const navigate = useNavigate();
		navigate('/');

	}catch(err) {
		dispatch({type: AUTH_ERROR, payload: err.message});
	}
	
};
