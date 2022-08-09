import {
	USER_REGISTERED,
	NOT_REGISTERED,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	USER_LOGGEDIN,
	LOGIN_FAIL,
	LOGOUT,
	ACCOUNT_DELETED,
	LOAD
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
			};
		case NOT_REGISTERED:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
			};
		case USER_REGISTERED:
		case USER_LOGGEDIN:
			return {
				...state,
				token: localStorage.getItem('token'),
				isAuthenticated: true,
				loading: false,
			};
		case LOAD:
			return{
				...state,
				loading: false,
			}
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
}
