import React, {useState, useEffect, Fragment} from 'react';
// Redux
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './scss/App.scss';

import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/user';
import { loadAuth } from './actions/auth';

import Alert from './components/layout/Alert';
import Navbar from './components/layout/NavBar';
import Home from './components/home/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Editor from './components/editor/Editor';
import NotFound from './components/layout/NotFound';


const App = () => {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => setLoaded(true), [])

	if (localStorage.token) {
		setAuthToken(localStorage.token);
		store.dispatch(loadUser());
	}else{
		store.dispatch(loadAuth());
	}

	return loaded && (
		<Provider store={store}>
        <Router>
          <Alert />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/editor' element={<Editor />} />
            <Route element={<NotFound />} />
          </Routes>
        </Router>
		</Provider>
	);
};

export default App;
