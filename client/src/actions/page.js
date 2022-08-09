import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_ABOUT,
	TOGGLE_LOGIN,
	SET_DARK_MODE,
	MESSAGE_SENT,
	SET_CURSOR_POS,
	SET_STEP,
	GO_TO_PAGE,
	TOGGLE_LOADING,
	PAGE_ERROR,
	LOAD,
} from './types';

export const setCursorPos = (x, y) => async (dispatch) => {
	try {
		dispatch({type: SET_CURSOR_POS, payload: [x, y]});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
}

export const setDarkMode = (state) => async (dispatch) => {
	try {
		dispatch({type: SET_DARK_MODE, payload: state});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
};


export const isAllowed = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/page/is-allowed');
		return res.data;
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
};

// Get About
export const getAbout = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/page/about');
		
		dispatch({type: GET_ABOUT, payload: res.data});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
};

// setStep ...
export const setStep = (step) => async (dispatch) => {
	try {
		dispatch({type: SET_STEP, payload: step});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
}

// toggleLogin ...
export const toggleLogin = (state) => async (dispatch) => {
	try {
		dispatch({type: TOGGLE_LOGIN, payload: state});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
};

// toggleLoading ...
export const toggleLoading = () => async (dispatch) => {
	try {
		dispatch({type: TOGGLE_LOADING, payload: null});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
};

// goTo ...
export const goTo = (page) => async (dispatch) => {
	try {
		dispatch({type: GO_TO_PAGE, payload: page});
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
}

export const sendContactMessage = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
	
		const res = await axios.post('/api/contact/message', formData, config);
		if (typeof res.data === 'string' && res.data.startsWith('ERROR:')) {
			dispatch(setAlert(res.data.substring(6), 'failure'));
			dispatch({type: PAGE_ERROR, payload: res.data.substring(6)});
		}else{
			dispatch({type: MESSAGE_SENT, payload: res.data});
		}
		
	} catch (err) {
		dispatch({type: PAGE_ERROR, payload: err.message});
	}
}

export const formatTime = (seconds) => async (dispatch) => {
	var hr, min, sec;
	if(seconds < 10){
		hr = 0;
		min = 0;
		sec = parseInt(seconds);
		return `${min}:0${sec}`;

	}else if(seconds < 60){
		hr = 0;
		min = 0;
		sec = parseInt(seconds);
		return `${min}:${sec}`;
		
	}else if(seconds >= 60 && seconds < 600){
		hr = 0;
		min = parseInt(seconds / 60);
		sec = parseInt(seconds % 60);
		if(sec < 10){
			return `0${min}:0${sec}`;
		}else{
			return `0${min}:${sec}`;
		}
		
	}else if(seconds >= 600 && seconds < 3600){
		hr = 0;
		min = parseInt(seconds / 60);
		sec = parseInt(seconds % 60);
		if(sec < 10){
			return `${min}:0${sec}`;
		}else{
			return `${min}:${sec}`;
		}
	}else if(seconds >= 3600){
		hr = parseInt(seconds / 3600);
		min = parseInt(seconds % 3600);
		sec = parseInt((seconds / 3600) % 60);
		if(sec < 10 && min < 10){
			return `${hr}:0${min}:0${sec}`;
		}else if(sec < 10){
			return `${hr}:${min}:0${sec}`;
		}else if(min < 10){
			return `${hr}:0${min}:${sec}`;
		}else{
			return `${hr}:${min}:${sec}`;
		}
	}
}

