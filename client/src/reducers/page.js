import {
	PAGE_ERROR,
	GET_ABOUT,
	TOGGLE_LOGIN,
	SET_STEP,
	GO_TO_PAGE,
	SET_DARK_MODE,
	SET_CURSOR_POS,
	MESSAGE_SENT,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
	page: "home",
	step: 0,
	cursorPos: [0, 0],
	about: {},
	location: {},
	showLogin: false,
	darkMode: false,
	error: {},
	loading: true,
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return{
				...state,
				loading: false,
			};
		case GO_TO_PAGE:
			return {
				...state,
				page: payload,
				loading: false,
			};
		case SET_CURSOR_POS:
			return {
				...state,
				cursorPos: payload,
				loading: false,
			};
		case SET_STEP:
			return {
				...state,
				step: payload,
				loading: false,
			};
		case GET_ABOUT:
			return {
				...state,
				about: payload,
				loading: false,
			};
		case SET_DARK_MODE:
			return {
				...state,
				darkMode: payload,
				loading: false,
			};
		case TOGGLE_LOGIN:
			return {
				...state,
				showLogin: payload,
				loading: false,
			};
		case PAGE_ERROR:
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
