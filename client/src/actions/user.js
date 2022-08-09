import axios from 'axios';
import { setAlert } from './alert';
import {
	USER_LOADED,
	REMOVE_FROM_SUGGESTIONS,
	GET_NOTIFICATIONS,
	UPDATE_AVATAR,
    AUTH_ERROR,
	USER_ERROR,
    SAVE_TABLE,
	LOGOUT
} from './types';

// loadUser ...
export const loadUser = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/user`);
		if (res.data === 'AUTH_ERROR') {
			dispatch({type: AUTH_ERROR });
			dispatch({ type: LOGOUT });
		}else
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: USER_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch({type: USER_LOADED,payload: res.data});
		}
		
	} catch (err) {
		dispatch({type: AUTH_ERROR });
		dispatch({ type: LOGOUT });
		
	}
};

// removeFromSuggestions ...
export const removeFromSuggestions = (user_id) => async (dispatch) => {
	try {
		dispatch({type: REMOVE_FROM_SUGGESTIONS, payload: user_id});
	} catch (err) {
		dispatch({type: USER_ERROR, payload: err.message});
	}
};

// markNotificationRead ...
export const markNotificationRead = (notification_id) => async (dispatch) => {
	
	try {
		const res = await axios.put('/api/user/notification-read/' + notification_id);
		if (res.data === 'AUTH_ERROR') {
			dispatch({type: AUTH_ERROR });
			dispatch({ type: LOGOUT });
		}else
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: USER_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch(getNotifications());
		}
		
	} catch (err) {
		dispatch({type: USER_ERROR, payload: err.message});
	}
};

// getNotifications ...
export const getNotifications = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/user/notifications');
		if (res.data === 'AUTH_ERROR') {
			dispatch({type: AUTH_ERROR });
			dispatch({ type: LOGOUT });
		}else
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: USER_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch({type: GET_NOTIFICATIONS, payload: res.data});
		}
		
	} catch (err) {
		dispatch({type: USER_ERROR, payload: err.message});
	}
};

// updateAvatar ...
export const updateAvatar = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
	
		const res = await axios.put('/api/user/update-avatar', formData, config);
		if (res.data === 'AUTH_ERROR') {
			dispatch({type: AUTH_ERROR });
			dispatch({ type: LOGOUT });
		}else
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: USER_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch({type: UPDATE_AVATAR, payload: res.data});
			dispatch(loadUser());
		}
		
	} catch (err) {
		dispatch({type: USER_ERROR, payload: err.message});
	}
};

// changeDisplaySettings ...
export const changeDisplaySettings = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/user/display-settings', formData, config);
		if (res.data === 'AUTH_ERROR') {
			dispatch({type: AUTH_ERROR });
			dispatch({ type: LOGOUT });
		}else
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: USER_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch(loadUser());
		}
	} catch (err) {
		dispatch({type: USER_ERROR, payload: err.message});
	}
};

// saveTable ...
export const saveTable = (table) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
	
		const res = await axios.put('/api/user/save', table, config);
		if (res.data === 'AUTH_ERROR') {
			dispatch({type: AUTH_ERROR });
			dispatch({ type: LOGOUT });
		}else
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: USER_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch({type: SAVE_TABLE, payload: res.data});
			dispatch(loadUser());
		}
		
	} catch (err) {
		dispatch({type: USER_ERROR, payload: err.message});
	}
};
