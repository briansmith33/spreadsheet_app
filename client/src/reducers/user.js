import {
	USER_LOADED,
	GET_NOTIFICATIONS,
	USER_ERROR,
	LOGOUT,
	AUTH_ERROR,
	ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
	user: {},
	notifications: [],
	users: [],
	error: {},
	loading: true,
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				user: payload,
				loading: false,
			};
		case GET_NOTIFICATIONS:
			return {
				...state,
				notifications: payload,
				loading: false,
			};	
		case USER_ERROR:
            return {
				...state,
				error: payload,
				loading: false,
			};
		case AUTH_ERROR:
		case LOGOUT:
		case ACCOUNT_DELETED:
			return initialState;
		default:
			return state;
	}
}
